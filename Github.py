from pymongo import MongoClient
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA
from sklearn.feature_selection import VarianceThreshold

# MongoDB connection setup
username = "VishalVarwani"
password = "Vishal123"
dbname = "FetchedData"
connection_string = f"mongodb+srv://{username}:{password}@vishalvarwanicluster0.jh3ewwl.mongodb.net/"
client = MongoClient(connection_string)
db = client[dbname]
collection = db['Github']

# Data loading and preprocessing
data = list(collection.find({}, {'_id': 0, 'Username': 1, 'Total Pull Requests': 1, 'Total Forks': 1, 'Total Commits': 1, 'Total Issues': 1}))
df = pd.DataFrame(data)
df = df.dropna()

# Store original data
df_original = df.copy()

features = ['Total Pull Requests', 'Total Forks', 'Total Commits', 'Total Issues']

# Outlier detection using IQR method
def remove_outliers(df, columns):
    for col in columns:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        df = df[(df[col] >= lower_bound) & (df[col] <= upper_bound)]
    return df

df = remove_outliers(df, features)
print(f"Shape after outlier removal: {df.shape}")

# Feature scaling
scaler = MinMaxScaler()
df[features] = scaler.fit_transform(df[features])

# Feature selection using variance threshold
selector = VarianceThreshold(threshold=0.01)
X_selected = selector.fit_transform(df[features])
selected_features = [features[i] for i in range(len(features)) if selector.get_support()[i]]
print(f"Selected features: {selected_features}")

# If any features were removed, update the DataFrame
if len(selected_features) < len(features):
    df = df[['Username'] + selected_features]
    features = selected_features

X = df[features].values

# Apply PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# Custom K-means implementation
def random_centroids(data, k):
    return data[np.random.choice(data.shape[0], k, replace=False)]

def get_labels(data, centroids):
    distances = np.sqrt(((data - centroids[:, np.newaxis])**2).sum(axis=2))
    return np.argmin(distances, axis=0)

def new_centroids(data, labels, k):
    return np.array([data[labels == i].mean(axis=0) for i in range(k)])

def plot_clusters(data, labels, centroids, iteration):
    plt.figure(figsize=(10, 6))
    scatter = plt.scatter(data[:, 0], data[:, 1], c=labels, cmap='viridis', s=50)
    plt.scatter(centroids[:, 0], centroids[:, 1], c='red', marker='x', s=200, linewidths=3)
    plt.title(f'K-means Clustering - Iteration {iteration}')
    plt.xlabel('PCA Component 1')
    plt.ylabel('PCA Component 2')
    plt.colorbar(scatter, label='Cluster')
    plt.show()

# K-means clustering
print("Running custom K-means on PCA-transformed data...")
max_iterations = 100
centroid_count = 3

centroids = random_centroids(X_pca, centroid_count)
old_centroids = np.zeros_like(centroids)
iteration = 1

while iteration < max_iterations and not np.all(centroids == old_centroids):
    old_centroids = centroids.copy()
    
    labels = get_labels(X_pca, centroids)
    centroids = new_centroids(X_pca, labels, centroid_count)
    plot_clusters(X_pca, labels, centroids, iteration)
    iteration += 1

print(f"K-means converged after {iteration} iterations")

# Assign labels to clusters
df['Cluster_KMeans'] = labels

# Determine high, moderate, and low clusters
cluster_sum = np.sum(centroids, axis=1)
high_cluster = np.argmax(cluster_sum)
low_cluster = np.argmin(cluster_sum)
moderate_cluster = 3 - high_cluster - low_cluster  # Since we have 3 clusters

# Assign activity levels to clusters
df['Activity_Level'] = df['Cluster_KMeans'].map({
    high_cluster: 'High',
    moderate_cluster: 'Moderate',
    low_cluster: 'Low'
})

# Add Activity_Level to original dataframe
df_original = df_original[df_original['Username'].isin(df['Username'])]
df_original['Activity_Level'] = df['Activity_Level']

# Display user data in tabular form
print("\nUser Data in Tabular Form:")
for level in ['High', 'Moderate', 'Low']:
    level_df = df_original[df_original['Activity_Level'] == level]
    print(f"\n{level} Activity Users:")
    print(level_df[['Username'] + features].to_string(index=False))

# Final visualization
plt.figure(figsize=(10, 6))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=labels, cmap='viridis', s=100)
plt.scatter(centroids[:, 0], centroids[:, 1], c='red', marker='x', s=200, linewidths=3)
plt.xlabel('PCA Component 1')
plt.ylabel('PCA Component 2')
plt.title(f'Final K-means Clustering (k={centroid_count})')
plt.colorbar(scatter, label='Cluster')

# Add labels for high, moderate, and low clusters
for i, txt in enumerate(['High', 'Moderate', 'Low']):
    plt.annotate(txt, (centroids[i, 0], centroids[i, 1]), xytext=(5, 5), 
                 textcoords='offset points', fontweight='bold')

plt.show()

# Save activity levels in the same collection (Github)
# MongoDB collection to store activity levels
github_collection = db['Github']

# Convert the DataFrame into a list of dictionaries to store in MongoDB
user_activity_data = df_original[['Username', 'Activity_Level']].to_dict('records')

# Update each user's activity level in the existing Github collection
for user_data in user_activity_data:
    try:
        # Attempt to update the document in the 'Github' collection
        result = github_collection.update_one(
            {'Username': user_data['Username']},  # Filter by Username
            {'$set': {'Activity_Level': user_data['Activity_Level']}},  # Update the Activity_Level
            upsert=False  # Do not insert a new document, only update existing ones
        )
        # Logging the result of the update
        if result.modified_count > 0:
            print(f"Updated Activity_Level for {user_data['Username']}")
        else:
            print(f"No changes made for {user_data['Username']}, or user not found")
    except Exception as e:
        # Logging in case of an error
        print(f"Error updating {user_data['Username']}: {e}")

print("Activity levels have been successfully updated in the 'Github' collection.")


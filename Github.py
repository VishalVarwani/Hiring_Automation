from pymongo import MongoClient
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA

# MongoDB connection setup
username = "VishalVarwani"
password = "Vishal123"
dbname = "FetchedData"
connection_string = f"mongodb+srv://{username}:{password}@vishalvarwanicluster0.jh3ewwl.mongodb.net/{dbname}"

# Connect to MongoDB
client = MongoClient(connection_string)
db = client[dbname]
collection = db['Stackoverflow']  # Stack Overflow collection

# Step 1: Load data from MongoDB
data = list(collection.find({}, {'_id': 0, 'Total Questions': 1, 'Upvotes': 1, 'Display Name': 1}))
df = pd.DataFrame(data)

# Step 2: Preprocess the data (drop rows with any missing values)
df = df.dropna()

# Step 3: Scale the data using MinMaxScaler
scaler = MinMaxScaler()
df_scaled = scaler.fit_transform(df[['Total Questions', 'Upvotes']])

# Custom K-means++ implementation
def kmeans_plus_plus(data, k):
    centroids = [data[np.random.randint(data.shape[0])]]
    for _ in range(1, k):
        dist_sq = np.array([min([np.inner(c-x,c-x) for c in centroids]) for x in data])
        probs = dist_sq/dist_sq.sum()
        cumprobs = probs.cumsum()
        r = np.random.rand()
        centroids.append(data[np.argmax(cumprobs >= r)])
    return np.array(centroids)

def get_labels(data, centroids):
    return np.argmin(np.sqrt(((data[:, np.newaxis] - centroids) ** 2).sum(axis=2)), axis=1)

def new_centroids(data, labels, k):
    return np.array([data[labels == i].mean(axis=0) for i in range(k)])

# Step 4: Apply custom K-means++ clustering
print("Running K-means++ on scaled data...")
k = 3
max_iterations = 100

centroids = kmeans_plus_plus(df_scaled, k)
old_centroids = np.zeros_like(centroids)
iteration = 1

while iteration < max_iterations and not np.all(centroids == old_centroids):
    old_centroids = centroids.copy()
    
    labels = get_labels(df_scaled, centroids)
    centroids = new_centroids(df_scaled, labels, k)
    iteration += 1

print(f"K-means++ converged after {iteration} iterations")

df['Cluster_KMeans'] = labels

# Step 5: Map clusters to activity levels
activity_labels = {0: 'Low', 1: 'Moderate', 2: 'High'}
df['Activity_Level'] = df['Cluster_KMeans'].map(activity_labels)

# Step 6: Validate with silhouette score
sil_score = silhouette_score(df_scaled, df['Cluster_KMeans'])
print(f'Silhouette Score for k={k}: {sil_score:.3f}')

# Step 7: Apply PCA for dimensionality reduction and visualization
pca = PCA(n_components=2)
df_pca = pca.fit_transform(df_scaled)

# Step 8: Calculate cluster centroids in PCA space
centroids_pca = pca.transform(centroids)

# Plot clusters with centroids
plt.figure(figsize=(10, 6))
scatter = plt.scatter(df_pca[:, 0], df_pca[:, 1], c=df['Cluster_KMeans'], cmap='viridis', s=100)
plt.scatter(centroids_pca[:, 0], centroids_pca[:, 1], c='red', marker='x', s=200, linewidths=3)
plt.xlabel('PCA Component 1')
plt.ylabel('PCA Component 2')
plt.title(f'K-means++ Clustering with PCA (k={k})')
plt.colorbar(scatter, label='Cluster')

# Add labels for centroids
for i, txt in enumerate(activity_labels.values()):
    plt.annotate(f'Centroid: {txt}', (centroids_pca[i, 0], centroids_pca[i, 1]), xytext=(5, 5), 
                 textcoords='offset points', fontweight='bold', color='red')
plt.show()

# Step 9: Display cluster details with 'Display Name', 'Total Questions', 'Upvotes', and 'Activity Level'
print("\nClustered Users and Activity Levels:")
for label in activity_labels.values():
    print(f"\n{label}:")
    cluster_data = df[df['Activity_Level'] == label]
    print(cluster_data[['Display Name', 'Total Questions', 'Upvotes']].to_string(index=False))
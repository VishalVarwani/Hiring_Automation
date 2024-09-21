# import requests
# import csv
# import threading

# GITHUB_TOKEN = 'Access_your_token'
# def get_user_repos(user_login):
#     url = f'https://api.github.com/users/{user_login}/repos'
#     headers = {'Authorization': f'token {GITHUB_TOKEN}'}
#     response = requests.get(url, headers=headers)
#     if response.status_code == 200:
#         repos = response.json()
#         return repos
#     else:
#         print(f"Failed to fetch repositories for user {user_login}: {response.status_code}")
#         return []

# def get_total_pull_requests(user_login):
#     repos = get_user_repos(user_login)
#     total_pull_requests = 0
#     headers = {'Authorization': f'token {GITHUB_TOKEN}'}
    
#     for repo in repos:
#         repo_name = repo['name']
#         repo_owner = repo['owner']['login']
#         url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/pulls?state=merged'
#         response = requests.get(url, headers=headers)
        
#         if response.status_code == 200:
#             pulls = response.json()
#             total_pull_requests += len(pulls)
#         else:
#             print(f"Failed to fetch pull requests for repo {repo_name}: {response.status_code}")
    
#     return total_pull_requests

# def get_total_forks(repos):
#     total_forks = sum(repo['forks_count'] for repo in repos)
#     return total_forks

# def get_total_commits(user_login):
#     repos = get_user_repos(user_login)
#     total_commits = 0
#     headers = {'Authorization': f'token {GITHUB_TOKEN}'}
    
#     for repo in repos:
#         repo_name = repo['name']
#         repo_owner = repo['owner']['login']
#         url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/commits'
#         response = requests.get(url, headers=headers)
        
#         if response.status_code == 200:
#             commits = response.json()
#             total_commits += len(commits)
#         else:
#             print(f"Failed to fetch commits for repo {repo_name}: {response.status_code}")
    
#     return total_commits

# def get_total_issues(user_login):
#     repos = get_user_repos(user_login)
#     total_issues = 0
#     headers = {'Authorization': f'token {GITHUB_TOKEN}'}
    
#     for repo in repos:
#         repo_name = repo['name']
#         repo_owner = repo['owner']['login']
#         url = f'https://api.github.com/repos/{repo_owner}/{repo_name}/issues?state=closed'
#         response = requests.get(url, headers=headers)
        
#         if response.status_code == 200:
#             issues = response.json()
#             total_issues += len(issues)
#         else:
#             print(f"Failed to fetch issues for repo {repo_name}: {response.status_code}")
    
#     return total_issues

# def get_user_email(user_login):
#     url = f'https://api.github.com/users/{user_login}'
#     headers = {'Authorization': f'token {GITHUB_TOKEN}'}
#     response = requests.get(url, headers=headers)
    
#     if response.status_code == 200:
#         user_data = response.json()
#         email = user_data.get('email')
#         if email:
#             return email
#         else:
#             return "No email"
#     else:
#         print(f"Failed to fetch user data for {user_login}: {response.status_code}")
#         return "No email"

# def get_random_users(num_users=500):
#     headers = {'Authorization': f'token {GITHUB_TOKEN}'}
#     users = []
#     page = 1

#     while len(users) < num_users:
#         url = f'https://api.github.com/search/users?q=followers:>0&per_page=100&page={page}'
#         response = requests.get(url, headers=headers)
        
#         if response.status_code == 200:
#             data = response.json()
#             users.extend(data['items'])
#             if len(data['items']) < 100:
#                 break  
#         else:
#             print(f"Failed to fetch users on page {page}: {response.status_code}")
#             break
        
#         page += 1

#     users = users[:num_users] 

#     with open('file2.csv', 'w', newline='') as file:
#         writer = csv.writer(file)
#         writer.writerow(['Username', 'GitHub Account URL', 'Total Stars', 'Total Pull Requests', 'Total Forks', 'Total Commits', 'Total Issues', 'Email', 'Type'])
        
#         for user in users:
#             user_login = user['login']
#             user_type = user.get('type')
            
#             if user_type == 'User':  
#                 repos = get_user_repos(user_login)
#                 total_stars = sum(repo['stargazers_count'] for repo in repos)
#                 total_pull_requests = get_total_pull_requests(user_login)
#                 total_forks = get_total_forks(repos)
#                 total_commits = get_total_commits(user_login)
#                 total_issues = get_total_issues(user_login)
#                 email = get_user_email(user_login)
                
#                 print(f"Username: {user_login}")
#                 print(f"User's GitHub Account URL: {user['html_url']}")
#                 print(f"Total Stars: {total_stars}")
#                 print(f"Total Pull Requests: {total_pull_requests}")
#                 print(f"Total Forks: {total_forks}")
#                 print(f"Total Commits: {total_commits}")
#                 print(f"Total Issues: {total_issues}")
#                 print(f"Email: {email}")
#                 print(f"Type: {user_type}")
#                 print("-" * 40)
                    
#                 writer.writerow([user_login, user['html_url'], total_issues, user_type])

# thread1 = threading.Thread(target=get_random_users, args=(300,))
# thread1.start()
# thread1.join()

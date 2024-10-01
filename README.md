HushHush is a MERN stack-based project that automates the recruitment and hiring process. The platform streamlines candidate evaluation by clustering them based on their activity levels, fetched from GitHub and StackOverflow profiles. It uses advanced machine learning algorithms to group candidates into high, mid, and low activity levels, helping recruiters easily identify top candidates.


Features:
Automated Candidate Evaluation: Fetches candidate data from GitHub and StackOverflow via their APIs.
Clustering Algorithm: Uses Python’s K-means++ algorithm to group candidates into three clusters—High, Mid, and Low activity levels.
Interactive User Interface: Built with React.js for a responsive and user-friendly frontend.
Efficient Backend: Node.js and Express.js power the backend, ensuring smooth data handling and processing.
Data Management: Stores and manages candidate data in MongoDB, offering high scalability.

Technologies Used- 
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Machine Learning: Python (K-means++ clustering algorithm)
APIs: GitHub API, StackOverflow API, axios


Installation
Clone the repository:
git clone https://github.com/VishalVarwani/HushHush.git


Install dependencies for both frontend and backend:
cd HushHush
npm install
cd client
npm install

Run the development servers:
npm run dev
npm start for frontend
nodemon server.js or any backend file for backend

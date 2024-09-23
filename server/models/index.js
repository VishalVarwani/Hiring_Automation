const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require("./Users"); // Github collection model
const StackOverflowModel = require("./Stackoverflow"); // Stackoverflow collection model
const ResultModel = require("./Results"); // Result model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Fetched_Data", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error: ", err);
});

// Helper function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// API to fetch users based on limit, level, and datasource
app.get('/', (req, res) => {
    let limit = parseInt(req.query.limit) || 0;
    let level = req.query.level; // Get the level from the query parameters
    let datasource = req.query.datasource; // Get the datasource from the query parameters

    // Create a filter based on activity level
    let filter = {};
    if (level && level !== 'All') {
        filter.Activity_Level = level; // Add filter only if level is selected
    }

    if (datasource === 'Github') {
        UserModel.find(filter).limit(limit)
            .then(users => res.json(users))
            .catch(err => res.status(500).json({ error: err.message }));
    } else if (datasource === 'Stackoverflow') {
        StackOverflowModel.find(filter).limit(limit)
            .then(users => res.json(users))
            .catch(err => res.status(500).json({ error: err.message }));
    } else {
        // If "All" is selected, fetch from both collections
        Promise.all([
            UserModel.find(filter).limit(limit),
            StackOverflowModel.find(filter).limit(limit)
        ]).then(([githubUsers, stackoverflowUsers]) => {
            let combinedUsers = [...githubUsers, ...stackoverflowUsers]; // Merge both arrays
            combinedUsers = shuffleArray(combinedUsers); // Shuffle the combined array
            res.json(combinedUsers); // Return the shuffled combined array
        }).catch(err => res.status(500).json({ error: err.message }));
    }
});

// POST API to save candidate results
app.post('/api/results', async (req, res) => {
    const { name, email, score, submittedCode } = req.body; // Destructure the fields

    // Create a new result document
    const result = new ResultModel({
        name,
        email,
        score,
        submittedCode,  // Include the submitted code
    });

    try {
        await result.save(); // Save the result to the database
        res.status(201).send('Result saved successfully');
    } catch (error) {
        res.status(400).send('Error saving result: ' + error.message);
    }
});
// GET API to fetch all candidate results
app.get('/api/results', async (req, res) => {
    try {
        const results = await ResultModel.find(); // Fetch all results from the 'results' collection
        res.status(200).json(results); // Return results in JSON format
    } catch (error) {
        res.status(500).send('Error fetching results: ' + error.message);
    }
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

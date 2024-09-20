const mongoose = require('mongoose');

// Define the schema for StackOverflow users
const StackOverflowSchema = new mongoose.Schema({
    Display_Name: String,
    Reputation_Score: Number,
    Reputation_Score: Number,
    Total_Questions: Number,
    Total_Answers: Number,
    Badges_Gold: Number,
    Badges_Silver: Number,
    Badges_Bronze: Number,
    Upvotes: Number,
    Activity_Level: String,
    Type: String
}, { collection: 'Stackoverflow' }); // Specify the collection name

// Create a model for StackOverflow users
const StackOverflowModel = mongoose.model("Stackoverflow", StackOverflowSchema);

module.exports = StackOverflowModel;

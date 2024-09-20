
const mongoose = require('mongoose');

// Define the schema with explicit collection name
const UserSchema = new mongoose.Schema({
    Type: String,
    Username: String,
    Email: String,
    Total_Stars: Number,
    Total_Pull_Requests: Number,
    Total_Forks: Number,
    Total_Commits: Number,
    Total_Issues: Number,
    Type: String,
    Activity_Level: String
}, { collection: 'Github' }); // Specify the collection name here

const UserModel = mongoose.model("Github", UserSchema);

module.exports = UserModel;

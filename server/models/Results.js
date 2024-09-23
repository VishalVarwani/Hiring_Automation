const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    score: { type: Number, required: true },
    submittedCode: [{
        question: { type: String, required: true },
        code: { type: String, required: true }
    }],  // Array of objects to store code for each question
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;

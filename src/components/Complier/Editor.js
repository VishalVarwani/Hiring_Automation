import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './editor.css';
import { useNavigate } from 'react-router-dom';

// Define coding test questions and expected outputs
const questions = [
    {
        title: 'Question 1: Print "Hello, World!"',
        description: 'Write a Python program to print "Hello, World!"',
        initialCode: `print("Hello, World!")`,
        expectedOutput: "Hello, World!\n",
    },
    {
        title: 'Question 2: Add Two Numbers',
        description: 'Write a Python function that adds two numbers and prints the result.',
        initialCode: `
def add(a, b):
    return a + b

print(add(3, 5))
        `,
        expectedOutput: "8\n",
    },
    {
        title: 'Question 3: Reverse a String',
        description: 'Write a Python program to reverse a string.',
        initialCode: `
def reverse_string(s):
    return s[::-1]

print(reverse_string("hello"))
        `,
        expectedOutput: "olleh\n",
    },
];

function CodingTest() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [output, setOutput] = useState('');
    const [code, setCode] = useState(questions[0].initialCode);
    const [results, setResults] = useState(Array(questions.length).fill(false));
    const [score, setScore] = useState(null);
    const [pyodide, setPyodide] = useState(null);

    const navigate = useNavigate();

    // Load Pyodide when the component mounts
    useEffect(() => {
        const loadPyodide = async () => {
            if (pyodide) return; // Prevent loading if already loaded
            const pyodideScript = document.createElement('script');
            pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/pyodide.js';
            pyodideScript.onload = async () => {
                const loadedPyodide = await window.loadPyodide({
                    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
                });
                setPyodide(loadedPyodide);
            };
            document.body.appendChild(pyodideScript);
        };
    
        loadPyodide();
    }, [pyodide]);

    const executeCode = async () => {
        if (!pyodide) {
            setOutput("Pyodide is still loading, please wait...");
            return;
        }

        try {
            const captureOutputCode = `
import sys
from io import StringIO

output = StringIO()
sys.stdout = output

${code}

sys.stdout = sys.__stdout__
output.getvalue()
            `;

            const result = await pyodide.runPythonAsync(captureOutputCode);
            setOutput(result);

            const isCorrect = result === questions[currentQuestion].expectedOutput;
            const newResults = [...results];
            newResults[currentQuestion] = isCorrect;
            setResults(newResults);
        } catch (err) {
            console.error("Execution Error:", err);
            setOutput(`Execution Error: ${err.message}`);
        }
    };

    const handleQuestionChange = (index) => {
        setCurrentQuestion(index);
        setCode(questions[index].initialCode);
        setOutput('');
    };

    const handleSubmit = async () => {
        const totalCorrect = results.filter((isCorrect) => isCorrect).length;
        setScore(totalCorrect);
    
        const candidateName = localStorage.getItem('candidateName');
        const candidateEmail = localStorage.getItem('candidateEmail');
    
        // Create an object to store the submitted code for all questions
        const submittedCode = questions.map((question, index) => ({
            question: `Question ${index + 1}`,
            code: question.initialCode // Assuming this is the code entered for each question
        }));
        
        try {
            const response = await fetch('http://localhost:3001/api/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: candidateName,
                    email: candidateEmail,
                    score: totalCorrect,
                    submittedCode,  // This will be an array of objects now
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to save result');
            }
    
            alert("Thank you for submitting your test! It has been sent for review.");
            navigate('/thankyou');
        } catch (error) {
            console.error("Error saving result:", error);
            alert("There was an error saving your result. Please try again.");
        }
    };
    

    return (
        <div className="containerR">
            {/* Question List */}
            <div className="question-list">
                {questions.map((question, index) => (
                    <div key={index} className="question-block">
                        <h2>{question.title}</h2>
                        <p>{question.description}</p>
                        <button
                            className="solve-button"
                            onClick={() => handleQuestionChange(index)}
                        >
                            Solve this Question
                        </button>
                    </div>
                ))}
            </div>

            {/* Editor Section */}
            <div className="editor-output-section">
                <div className="editor-section">
                    <Editor
                        height="80vh"
                        theme="vs-dark"
                        defaultLanguage="python"
                        value={code}
                        onChange={(value) => setCode(value)}
                    />
                    <button className="run-button" onClick={executeCode}>Run</button>
                </div>
            </div>

            {/* Submit and Show Score */}
            <div className="submit-section">
                <button className="submit-button" onClick={handleSubmit}>Submit Test</button>
                {score !== null && (
                    <div className="score-section">
                        <h3>Your Score: {score} / {questions.length}</h3>
                    </div>
                )}
                <div className="output-section">
                    <h3>Output:</h3>
                    <pre className="output">{output}</pre>
                </div>
            </div>
        </div>
    );
}

export default CodingTest;

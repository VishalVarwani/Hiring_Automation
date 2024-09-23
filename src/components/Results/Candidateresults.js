import React, { useEffect, useState } from 'react';
import Header from '../Headerpage/headercommon';
import "../Results/candidateresults.css";

function CandidateResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCode, setExpandedCode] = useState({});

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/results');
                if (!response.ok) {
                    throw new Error('Failed to fetch results');
                }
                const data = await response.json();
                setResults(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    const toggleCode = (id) => {
        setExpandedCode((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="containerresults">
            <Header />
            <h1 className="title">Participants and Results</h1>
            <div className="results-container">
                {/* Participant details */}
                <div className="participants">
                    <h2 className="section-title">Participants</h2>
                    <ul className="result-list">
                        {results.map((result) => (
                            <li key={result._id} className="result-item">
                                <strong>{result.name}</strong> ({result.email})
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Scores */}
                <div className="scores">
                    <h2 className="section-title">Scores</h2>
                    <ul className="result-list">
                        {results.map((result) => (
                            <li key={result._id} className="result-item">
                                {result.score}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Submitted Code */}
                <div className="submitted-code">
                    <h2 className="section-title">Submitted Code</h2>
                    <ul className="result-list">
                        {results.map((result) => (
                            <li key={result._id} className="result-item">
                                <strong>{result.name}'s Submitted Code:</strong>
                                {result.submittedCode.length > 0 ? (
                                    result.submittedCode.map((submission) => (
                                        <div key={submission._id} className="code-block">
                                            <button onClick={() => toggleCode(submission._id)}>
                                                {expandedCode[submission._id] ? 'Show Less' : 'Show More'}
                                            </button>
                                            {expandedCode[submission._id] && (
                                                <div>
                                                    {Object.entries(submission).map(([question, code]) => (
                                                        question !== '_id' && (
                                                            <div key={question}>
                                                                <h4>{question}</h4>
                                                                <pre>{code}</pre>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div>No code submitted</div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CandidateResults;

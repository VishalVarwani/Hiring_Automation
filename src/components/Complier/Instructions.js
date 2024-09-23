import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Instructions() {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleContinue = () => {
        if (isChecked) {
            navigate("/candidateform");
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '600px',
                width: '100%',
                backgroundColor: '#fff',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                textAlign: 'left',
                lineHeight: '1.6'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}>
                    Welcome to DOODLE'S Coding Test
                </h2>

                <h2 style={{
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    marginBottom: '15px'
                }}>
                    Exam Instructions
                </h2>

                <span style={{
                    display: 'block',
                    margin: '0 0 20px 25px',
                    fontWeight: 'bold',
                    color: '#555'
                }}>
                    Please read the following instructions carefully before starting the exam:
                </span>

                <h3 style={{
                    marginLeft: '25px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                    Test Details
                </h3>
                <ul style={{
                    marginLeft: '45px',
                    fontSize: '16px',
                    color: '#555',
                    listStyleType: 'disc'
                }}>
                    <li><strong>Duration:</strong> 60 minutes</li>
                    <li><strong>Challenges:</strong> 3 coding questions</li>
                    <li><strong>Evaluation:</strong> Correctness</li>
                </ul>

                <h3 style={{
                    marginLeft: '25px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333',
                    marginTop: '20px'
                }}>
                    Instructions
                </h3>
                <ul style={{
                    marginLeft: '45px',
                    fontSize: '16px',
                    color: '#555',
                    listStyleType: 'disc'
                }}>
                    <li>Once the test starts, you will have <strong>60 minutes</strong> to complete the questions.</li>
                    <li>Do not refresh or navigate away from the test page.</li>
                    <li>Submit your code for each question when you're done.</li>
                    <li>Please make sure you have a stable internet connection to avoid any disruptions.</li>
                </ul>

                <div style={{
                    textAlign: 'center',
                    marginTop: '30px'
                }}>
                    <label style={{ fontSize: '16px', color: '#555' }}>
                        <input
                            type="checkbox"
                            id='acceptTerms'
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            style={{ marginRight: '8px' }}
                        />
                        Accept the Terms and Conditions
                    </label>

                    <div style={{ marginTop: '30px' }}>
                        <button onClick={handleContinue} disabled={!isChecked} style={{
                            backgroundColor: isChecked ? '#4CAF50' : '#ddd',
                            color: isChecked ? '#fff' : '#888',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: isChecked ? 'pointer' : 'not-allowed',
                            fontSize: '16px'
                        }}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructions;

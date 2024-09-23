import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forms.css'; // Make sure to import your CSS file

function CandidateForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save candidate's information in local storage
        localStorage.setItem('candidateName', name);
        localStorage.setItem('candidateEmail', email);
        navigate('/coding-test'); // Navigate to the coding test page
    };

    return (
        <div className="formstart">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nameInput">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-control"
                        id="nameInput"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emailInput">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                        id="emailInput"
                        placeholder="Enter your Email"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Start Test</button>
            </form>
        </div>
    );
}

export default CandidateForm;

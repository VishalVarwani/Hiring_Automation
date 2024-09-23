// ThankYou.js
import React from 'react';

const ThankYou = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        textAlign: 'center',
    };

    const headingStyle = {
        fontSize: '24px',
        color: '#333',
    };

    const paragraphStyle = {
        fontSize: '16px',
        color: '#666',
        margin: '10px 0',
    };

    const buttonStyle = {
        backgroundColor: '#2196f3',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#1976d2',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Thank You!</h1>
            <p style={paragraphStyle}>Your submission has been received.</p>
            <p style={paragraphStyle}>It will be sent for review shortly.</p>
          
        </div>
    );
};

export default ThankYou;

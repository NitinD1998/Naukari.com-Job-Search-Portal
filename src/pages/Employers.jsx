import React from 'react';
import { Link } from 'react-router-dom';

const Employers = () => {
    return (
        <div style={{ padding: '80px 20px', textAlign: 'center', minHeight: '60vh' }}>
            <h2>Employer Portal</h2>
            <p style={{ marginTop: '20px', color: '#666' }}>Welcome to the employer portal. Here you can post jobs and find top talent.</p>
            <div style={{ marginTop: '30px' }}>
                <Link to="/post-job" className="btn-login-submit" style={{ display: 'inline-block', maxWidth: '200px', textDecoration: 'none', lineHeight: '24px' }}>Post a Job</Link>
            </div>
        </div>
    );
};

export default Employers;

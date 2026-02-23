import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <h2>New to Naukri?</h2>
                    <ul className="benefits-list">
                        <li>✓ One click apply using naukri profile.</li>
                        <li>✓ Get relevant job recommendations.</li>
                        <li>✓ Showcase profile to top companies and consultants.</li>
                        <li>✓ Know application status on applied jobs.</li>
                    </ul>
                    <Link to="/register" className="btn-register-outline" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>Register for free</Link>
                </div>

                <div className="login-right">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: '10px' }}>{error}</div>}
                        <div className="form-group">
                            <label>Email ID / Username</label>
                            <input
                                type="text"
                                placeholder="Enter your active Email ID / Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-options">
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>
                        <button type="submit" className="btn-login-submit">Login</button>
                        <div className="login-divider">
                            <span>Or log in with</span>
                        </div>
                        <button type="button" className="btn-google-login">
                            Sign in with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

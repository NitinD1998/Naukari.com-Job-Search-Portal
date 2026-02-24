import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: ''
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await register(formData);
        if (result.success) {
            navigate('/candidate-join');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-left">
                    <div className="register-info">
                        <div className="info-image-placeholder">
                            <svg xmlns="http://www.w3.org/w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        <h2>On registering, you can</h2>
                        <ul className="register-benefits">
                            <li>Build your profile and let recruiters find you</li>
                            <li>Get job postings delivered right to your email</li>
                            <li>Find a job and grow your career</li>
                        </ul>
                    </div>
                </div>

                <div className="register-right">
                    <h2>Find a job & grow your career</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        {error && <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: '10px' }}>{error}</div>}
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="What is your name?"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email ID</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Tell us your Email ID"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <span className="helper-text">We'll send you relevant jobs in your mail</span>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password for your account"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="6"
                                required
                            />
                            <span className="helper-text">Minimum 6 characters required</span>
                        </div>

                        <div className="form-group">
                            <label>Mobile Number</label>
                            <div className="phone-input">
                                <span className="country-code">+91</span>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <span className="helper-text">Recruiters will call you on this number</span>
                        </div>

                        <div className="terms-checkbox">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">
                                By clicking Register, you agree to the Terms and Conditions & Privacy Policy of Ardhnarishwar
                            </label>
                        </div>

                        <button type="submit" className="btn-register-submit">Register now</button>

                        <div className="login-prompt">
                            Already registered? <Link to="/login" className="login-link">Login here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

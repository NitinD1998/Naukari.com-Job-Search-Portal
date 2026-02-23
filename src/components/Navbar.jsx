import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div className="nav-left">
                    <Link to="/" className="logo">
                        <span className="logo-text">naukri</span>
                        <span className="logo-dot">.com</span>
                    </Link>

                    <ul className="nav-links desktop-only">
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/companies">Companies</Link></li>
                        <li><Link to="/candidate-join">For Candidates</Link></li>
                        <li><Link to="/cv-generator">CV Builder</Link></li>
                        <li><Link to="/client-inquiry">Client Inquiry</Link></li>
                        <li><Link to="/feedback">Feedback</Link></li>
                    </ul>
                </div>

                <div className="nav-right desktop-only">
                    {user ? (
                        <>
                            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                                <User size={20} />
                                <span>{user.name}</span>
                            </div>
                            <button onClick={logout} className="btn-login outline" style={{ marginLeft: '16px' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-login">Login</Link>
                            <Link to="/register" className="btn-register">Register</Link>
                        </>
                    )}
                    <div className="nav-divider"></div>
                    <Link to="/employers" className="icon-btn" style={{ textDecoration: 'none' }}><span className="employer-badge">For employers</span></Link>
                </div>

                <button
                    className="mobile-menu-btn mobile-only"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <ul className="mobile-nav-links">
                        <li><Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs</Link></li>
                        <li><Link to="/companies" onClick={() => setIsMobileMenuOpen(false)}>Companies</Link></li>
                        <li><Link to="/candidate-join" onClick={() => setIsMobileMenuOpen(false)}>For Candidates</Link></li>
                        <li><Link to="/cv-generator" onClick={() => setIsMobileMenuOpen(false)}>CV Builder</Link></li>
                        <li><Link to="/client-inquiry" onClick={() => setIsMobileMenuOpen(false)}>Client Inquiry</Link></li>
                        <li><Link to="/feedback" onClick={() => setIsMobileMenuOpen(false)}>Feedback</Link></li>
                        <li className="mobile-auth-buttons">
                            {user ? (
                                <>
                                    <div style={{ padding: '8px 0', fontWeight: '500' }}>Welcome, {user.name}</div>
                                    <button onClick={logout} className="btn-login outline" style={{ width: '100%', marginTop: '8px' }}>Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn-login outline">Login</Link>
                                    <Link to="/register" className="btn-register">Register</Link>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

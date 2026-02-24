import React from 'react';
import './Footer.css';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-grid">
                    <div className="footer-col brand-col">
                        <div className="footer-logo">
                            <img src={logo} alt="Ardhnarishwar Logo" className="footer-logo-img" />
                            <span className="logo-text">Ardhnarishwar</span>
                        </div>
                        <p className="footer-tagline">Connect with us</p>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">About Us</h4>
                        <ul className="footer-links">
                            <li><a href="#">About Ardhnarishwar</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Employer Home</a></li>
                            <li><a href="#">Sitemap</a></li>
                            <li><a href="#">Credits</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Help Center</h4>
                        <ul className="footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Summons/Notices</a></li>
                            <li><a href="#">Grievances</a></li>
                            <li><a href="#">Report Issue</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Legal</h4>
                        <ul className="footer-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Fraud Alert</a></li>
                            <li><a href="#">Trust & Safety</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>All rights reserved © 2026 Info Edge (India) Ltd.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

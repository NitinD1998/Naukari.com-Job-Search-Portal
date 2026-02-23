import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const CandidateForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        currentRole: '',
        skills: '',
        resumeLink: '',
        expectedSalary: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission logic
        console.log('Candidate Data Submitted:', formData);
        setSubmitted(true);
        setTimeout(() => navigate('/'), 2500);
    };

    if (submitted) {
        return (
            <div className="form-page-layout">
                <div className="form-success-message">
                    <h2>Application Submitted Successfully! 🎉</h2>
                    <p>Thank you for submitting your candidate profile. We will review your details and get back to you soon.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="form-page-layout">
            <div className="form-container">
                <h2>Candidate / New Joiner Form</h2>
                <p className="form-subtitle">Join our talent network and let top companies discover you.</p>

                <form className="custom-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" />
                    </div>

                    <div className="form-groups-row">
                        <div className="form-group half-width">
                            <label>Email ID *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
                        </div>
                        <div className="form-group half-width">
                            <label>Phone Number *</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit mobile number" />
                        </div>
                    </div>

                    <div className="form-groups-row">
                        <div className="form-group half-width">
                            <label>Total Experience *</label>
                            <select name="experience" value={formData.experience} onChange={handleChange} required>
                                <option value="">Select Experience</option>
                                <option value="Fresher">Fresher</option>
                                <option value="1-3 Years">1-3 Years</option>
                                <option value="3-5 Years">3-5 Years</option>
                                <option value="5-10 Years">5-10 Years</option>
                                <option value="10+ Years">10+ Years</option>
                            </select>
                        </div>
                        <div className="form-group half-width">
                            <label>Expected Salary</label>
                            <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} placeholder="e.g. 15 LPA" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Current Role / Designation</label>
                        <input type="text" name="currentRole" value={formData.currentRole} onChange={handleChange} placeholder="e.g. Software Engineer" />
                    </div>

                    <div className="form-group">
                        <label>Key Skills *</label>
                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} required placeholder="Regex, React, Node.js, Python (comma separated)" />
                    </div>

                    <div className="form-group">
                        <label>Portfolio / Resume Link</label>
                        <input type="url" name="resumeLink" value={formData.resumeLink} onChange={handleChange} placeholder="https://github.com/..." />
                    </div>

                    <button type="submit" className="btn-login-submit">Submit Profile</button>
                </form>
            </div>
        </div>
    );
};

export default CandidateForm;

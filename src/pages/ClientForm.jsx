import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css';

const ClientForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        hiringNeeds: '',
        message: ''
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
        console.log('Client Inquiry Submitted:', formData);
        setSubmitted(true);
        setTimeout(() => navigate('/'), 2500);
    };

    if (submitted) {
        return (
            <div className="form-page-layout">
                <div className="form-success-message">
                    <h2>Inquiry Received successfully! 🏢</h2>
                    <p>Thank you for reaching out. Our enterprise team will contact you shortly to discuss your hiring needs.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="form-page-layout">
            <div className="form-container">
                <h2>Hire Top Talent (Client Form)</h2>
                <p className="form-subtitle">Partner with us to scale your teams with the industry's best professionals.</p>

                <form className="custom-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Name *</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="e.g. Acme Corp" />
                    </div>

                    <div className="form-group">
                        <label>Contact Person Full Name *</label>
                        <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required placeholder="John Doe" />
                    </div>

                    <div className="form-groups-row">
                        <div className="form-group half-width">
                            <label>Work Email *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@acmecorp.com" />
                        </div>
                        <div className="form-group half-width">
                            <label>Phone Number *</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit mobile number" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Estimated Hiring Needs (Next 6 months)</label>
                        <select name="hiringNeeds" value={formData.hiringNeeds} onChange={handleChange}>
                            <option value="">Select an option</option>
                            <option value="1-5 Hires">1-5 Hires</option>
                            <option value="5-20 Hires">5-20 Hires</option>
                            <option value="20-50 Hires">20-50 Hires</option>
                            <option value="50+ Hires">50+ Hires</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Additional Message / Requirements</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us more about the roles you are looking to fill..."></textarea>
                    </div>

                    <button type="submit" className="btn-login-submit">Submit Inquiry</button>
                </form>
            </div>
        </div>
    );
};

export default ClientForm;

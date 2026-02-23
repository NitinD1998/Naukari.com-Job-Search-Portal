import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import './FormStyles.css'; // Reusing the clean styles from previous forms

const FeedbackForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interviewExperience: '',
        rating: 0,
        feedbackMessage: '',
        recommend: 'yes'
    });
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRatingClick = (ratingValue) => {
        setFormData({ ...formData, rating: ratingValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission logic
        console.log('Feedback Submitted:', formData);
        setSubmitted(true);
        setTimeout(() => navigate('/'), 2500);
    };

    if (submitted) {
        return (
            <div className="form-page-layout">
                <div className="form-success-message">
                    <h2>Feedback Received! ⭐</h2>
                    <p>Thank you for taking the time to share your experience. Your insights help us improve the platform for everyone.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="form-page-layout">
            <div className="form-container">
                <h2>Candidate Interview Feedback</h2>
                <p className="form-subtitle">Help us understand your interview experience to improve our platform's quality.</p>

                <form className="custom-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Your Name (Optional)</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                    </div>

                    <div className="form-group">
                        <label>Email Address (Optional)</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                    </div>

                    <div className="form-group">
                        <label>Select Interview Stage / Experience *</label>
                        <select name="interviewExperience" value={formData.interviewExperience} onChange={handleChange} required>
                            <option value="">Select your experience...</option>
                            <option value="Applied, but rejected">Applied, but rejected</option>
                            <option value="Phone Screening">Phone Screening</option>
                            <option value="Technical Assessment">Technical Assessment</option>
                            <option value="Final Interview">Final Interview</option>
                            <option value="Offered Role">Offered Role</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Overall Experience Rating *</label>
                        <div style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={32}
                                    onClick={() => handleRatingClick(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    fill={(hoverRating || formData.rating) >= star ? "#fbbf24" : "none"}
                                    color={(hoverRating || formData.rating) >= star ? "#fbbf24" : "#cbd5e1"}
                                    style={{ transition: 'all 0.2s ease' }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Would you recommend this company/platform to a friend? *</label>
                        <select name="recommend" value={formData.recommend} onChange={handleChange} required>
                            <option value="yes">Yes, definitely</option>
                            <option value="no">No, I wouldn't</option>
                            <option value="maybe">Maybe / Unsure</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Detailed Feedback / Suggestions *</label>
                        <textarea
                            name="feedbackMessage"
                            value={formData.feedbackMessage}
                            onChange={handleChange}
                            rows="5"
                            required
                            placeholder="Please share what went well and what could be improved..."
                        ></textarea>
                    </div>

                    <button type="submit" className="btn-login-submit" disabled={formData.rating === 0}>
                        Submit Feedback
                    </button>
                    {formData.rating === 0 && (
                        <small style={{ color: '#ef4444', marginTop: '-15px' }}>* Please provide a star rating above before submitting.</small>
                    )}
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;

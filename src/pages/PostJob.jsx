import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostJob.css';

const PostJob = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        experience: '',
        salary: '',
        location: '',
        desc: '',
        tags: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => navigate('/'), 2000);
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to post job');
            }
        } catch (error) {
            setError('Server error while posting job');
        }
    };

    if (success) {
        return (
            <div className="post-job-page" style={{ textAlign: 'center', paddingTop: '100px', minHeight: '60vh' }}>
                <h2 style={{ color: '#4caf50' }}>Job Posted Successfully!</h2>
                <p>Redirecting to homepage...</p>
            </div>
        );
    }

    return (
        <div className="post-job-page">
            <div className="post-job-container">
                <h2>Post a New Job</h2>
                <form className="post-job-form" onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Senior Software Engineer" />
                    </div>

                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} required placeholder="e.g. Google" />
                    </div>

                    <div className="form-groups-row">
                        <div className="form-group half-width">
                            <label>Experience Required</label>
                            <input type="text" name="experience" value={formData.experience} onChange={handleChange} required placeholder="e.g. 3-5 Yrs" />
                        </div>
                        <div className="form-group half-width">
                            <label>Salary Package</label>
                            <input type="text" name="salary" value={formData.salary} onChange={handleChange} required placeholder="e.g. 20-30 Lacs PA" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Bangalore" />
                    </div>

                    <div className="form-group">
                        <label>Job Description</label>
                        <textarea name="desc" value={formData.desc} onChange={handleChange} required rows="4" placeholder="Describe the role..."></textarea>
                    </div>

                    <div className="form-group">
                        <label>Skills / Tags (Comma separated)</label>
                        <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. React.js, Node.js, Next.js" />
                    </div>

                    <button type="submit" className="btn-login-submit">Post Job</button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;

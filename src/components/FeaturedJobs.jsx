import React, { useState, useEffect } from 'react';
import './FeaturedJobs.css';
import { MapPin, Briefcase, IndianRupee, FileText } from 'lucide-react';

const FeaturedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/jobs');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
            setLoading(false);
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading jobs...</div>;
    }

    return (
        <div className="featured-jobs">
            <div className="jobs-list">
                {jobs.map((job) => (
                    <div key={job._id || job.id} className="job-card">
                        <div className="job-header">
                            <div>
                                <h3 className="job-title">{job.title}</h3>
                                <div className="job-company">
                                    <span>{job.company}</span>
                                    <span className="job-rating">★ {job.rating}</span>
                                </div>
                            </div>
                            <div className="job-logo-placeholder">{job.company[0]}</div>
                        </div>

                        <div className="job-details">
                            <div className="detail-item">
                                <Briefcase size={16} />
                                <span>{job.experience}</span>
                            </div>
                            <div className="detail-separator">|</div>
                            <div className="detail-item">
                                <IndianRupee size={16} />
                                <span>{job.salary}</span>
                            </div>
                            <div className="detail-separator">|</div>
                            <div className="detail-item">
                                <MapPin size={16} />
                                <span>{job.location}</span>
                            </div>
                        </div>

                        <div className="job-description">
                            <FileText size={16} className="desc-icon" />
                            <p>{job.desc}</p>
                        </div>

                        <div className="job-skills">
                            {job.tags && job.tags.map(tag => (
                                <span key={tag} className="skill-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="jobs-footer">
                <button className="btn-view-all">View all jobs</button>
            </div>
        </div>
    );
};

export default FeaturedJobs;

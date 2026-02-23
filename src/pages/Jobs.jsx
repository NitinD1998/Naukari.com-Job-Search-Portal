import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/jobs');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();
                setJobs(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: 'var(--background-gray)', minHeight: 'calc(100vh - 70px)' }}>

            {/* Search Header */}
            <div style={{ backgroundColor: 'var(--white)', padding: '40px 20px', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '20px' }}>Find Your Dream Job</h1>

                <div style={{
                    display: 'flex',
                    maxWidth: '600px',
                    margin: '0 auto',
                    position: 'relative',
                    alignItems: 'center',
                    background: 'white',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-color)',
                    padding: '5px 5px 5px 20px',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <Search size={20} color="var(--text-light)" />
                    <input
                        type="text"
                        placeholder="Search by job title, company, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            padding: '12px 15px',
                            flex: 1,
                            fontSize: '1rem',
                            background: 'transparent'
                        }}
                    />
                    <button className="btn-login-submit" style={{ padding: '10px 25px', width: 'auto' }}>Search</button>
                </div>
            </div>

            {/* Job Listings */}
            <div className="container" style={{ padding: '40px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)' }}>
                        All Jobs <span style={{ color: 'var(--text-light)', fontSize: '1rem', fontWeight: 'normal' }}>({filteredJobs.length} results)</span>
                    </h2>
                    <Link to="/post-job" className="btn-login outline" style={{ textDecoration: 'none' }}>Post a Job</Link>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-light)' }}>Loading jobs...</div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#ef4444' }}>{error}</div>
                ) : filteredJobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <Briefcase size={48} color="var(--text-light)" style={{ marginBottom: '15px' }} />
                        <h3 style={{ color: 'var(--text-dark)', marginBottom: '10px' }}>No jobs found</h3>
                        <p style={{ color: 'var(--text-light)' }}>We couldn't find any jobs matching your search criteria.</p>
                        <button onClick={() => setSearchTerm('')} className="btn-login outline" style={{ marginTop: '20px' }}>Clear Search</button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                        {filteredJobs.map((job) => (
                            <div key={job._id || job.id} style={{
                                backgroundColor: 'var(--white)',
                                padding: '24px',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-sm)',
                                border: '1px solid var(--border-color)',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', margin: 0 }}>{job.title}</h3>
                                    <span style={{
                                        backgroundColor: '#f1f5f9',
                                        color: '#475569',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600'
                                    }}>
                                        New
                                    </span>
                                </div>

                                <div style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '16px', fontWeight: '500' }}>
                                    {job.company}
                                    {job.rating > 0 && <span style={{ marginLeft: '8px', color: '#fbbf24' }}>★ {job.rating}</span>}
                                </div>

                                <div style={{ display: 'flex', gap: '16px', color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '16px', flexWrap: 'wrap' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Briefcase size={14} /> {job.experience}</span>
                                    <span>₹ {job.salary}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> {job.location}</span>
                                </div>

                                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {job.desc || job.description}
                                </p>

                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {job.tags && job.tags.map((tag, i) => (
                                        <span key={i} style={{
                                            backgroundColor: '#f1f5f9',
                                            color: '#64748b',
                                            padding: '4px 10px',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;

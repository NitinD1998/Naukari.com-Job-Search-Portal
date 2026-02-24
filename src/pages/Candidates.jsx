import React from 'react';
import { Link } from 'react-router-dom';
import {
    Briefcase,
    FileText,
    TrendingUp,
    Bell,
    ShieldCheck,
    Zap,
    Users,
    ChevronRight,
    Search
} from 'lucide-react';
import './Candidates.css';

const Candidates = () => {
    return (
        <div className="candidates-page">
            {/* Hero Section */}
            <section className="hero-candidates">
                <div className="container">
                    <div className="candidates-hero-content">
                        <h1 className="candidates-hero-title">
                            Your Career Journey <br /> Accelerated by AI
                        </h1>
                        <p className="candidates-hero-subtitle">
                            Connect with top recruiters, build a premium CV in minutes, and let our AI match you with the perfect opportunities.
                        </p>
                        <div className="hero-cta">
                            <Link to="/candidate-join" className="btn-primary-large">Get Started Now</Link>
                            <Link to="/cv-generator" className="btn-secondary-large">Build My CV</Link>
                        </div>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FileText size={28} />
                            </div>
                            <h3 className="feature-title">Smart CV Builder</h3>
                            <p className="feature-description">
                                Create an ATS-friendly resume that stands out to recruiters with our intuitive builder.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Zap size={28} />
                            </div>
                            <h3 className="feature-title">AI Matchmaking</h3>
                            <p className="feature-description">
                                Our intelligent algorithms match your skills with the most relevant job openings instantly.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Bell size={28} />
                            </div>
                            <h3 className="feature-title">Personalized Alerts</h3>
                            <p className="feature-description">
                                Never miss an opportunity. Get instant notifications for jobs that match your preferences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portal Features: The 11 Sections */}
            <section className="section-portal-format">
                <div className="container">
                    <h2 className="section-title">Standard Portal Format</h2>
                    <p className="section-subtitle">Our candidate profile is built on industry-standard sections to ensure maximum visibility to top recruiters.</p>

                    <div className="portal-sections-grid">
                        <Link to="/candidate-join#section-1" className="portal-section-card clickable-card">
                            <div className="section-number">01</div>
                            <h4>Section 1: Basic Details</h4>
                            <p>Full Name, Applied Job, City, Profile Photo Upload.</p>
                        </Link>
                        <Link to="/candidate-join#section-2" className="portal-section-card clickable-card">
                            <div className="section-number">02</div>
                            <h4>Section 2: Contact Info</h4>
                            <p>Email ID, Personal Contact, Emergency Contact.</p>
                        </Link>
                        <Link to="/candidate-join#section-3" className="portal-section-card clickable-card">
                            <div className="section-number">03</div>
                            <h4>Section 3: Address Details</h4>
                            <p>Current Address, Permanent Address (Same/Different).</p>
                        </Link>
                        <Link to="/candidate-join#section-4" className="portal-section-card clickable-card">
                            <div className="section-number">04</div>
                            <h4>Section 4: Exp & Status</h4>
                            <p>Fresher/Exp, Total Experience, Salary History/Exp, Notice Period.</p>
                        </Link>
                        <Link to="/candidate-join#section-5" className="portal-section-card clickable-card">
                            <div className="section-number">05</div>
                            <h4>Section 5: Past Employment</h4>
                            <p>Company Details, Duration, Reason for Leaving, Auth Person Info.</p>
                        </Link>
                        <Link to="/candidate-join#section-6" className="portal-section-card clickable-card">
                            <div className="section-number">06</div>
                            <h4>Section 6: Past Documents</h4>
                            <p>Salary Slips, Bank Statements, Exp Letters, Relieving Letters.</p>
                        </Link>
                        <Link to="/candidate-join#section-7" className="portal-section-card clickable-card">
                            <div className="section-number">07</div>
                            <h4>Section 7: Personal Docs</h4>
                            <p>Aadhaar, PAN, Highest Qual Cert, Education Details.</p>
                        </Link>
                        <Link to="/candidate-join#section-8" className="portal-section-card clickable-card">
                            <div className="section-number">08</div>
                            <h4>Section 8: Skills & Comm</h4>
                            <p>Technical/Non-Technical Skills, English Communication Level.</p>
                        </Link>
                        <Link to="/candidate-join#section-9" className="portal-section-card clickable-card">
                            <div className="section-number">09</div>
                            <h4>Section 9: Interview Pref</h4>
                            <p>Telephonic Availability, Preferred Slots, Days, CV Upload.</p>
                        </Link>
                        <Link to="/candidate-join#section-10" className="portal-section-card clickable-card">
                            <div className="section-number">10</div>
                            <h4>Section 10: Compliance</h4>
                            <p>Marital Status, Govt Job Prep, Optional Religion/Caste (Hidden).</p>
                        </Link>
                        <Link to="/candidate-join#section-11" className="portal-section-card clickable-card">
                            <div className="section-number">11</div>
                            <h4>Section 11: Expectations</h4>
                            <p>Future Career Goals, Final Declarations & Site Terms.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works (Simplified for Portal) */}
            <section className="section section-how-it-works bg-light">
                <div className="container">
                    <h2 className="section-title">Get Started in 3 Steps</h2>
                    <div className="steps-container-simple">
                        <div className="step-mini">
                            <div className="step-count">1</div>
                            <h5>Complete Comprehensive Profile</h5>
                            <p>Fill out our 11-section <Link to="/candidate-join" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>standard application</Link> in 6 easy steps.</p>
                        </div>
                        <div className="step-mini">
                            <div className="step-count">2</div>
                            <h5>AI Scoring & Matching</h5>
                            <p>Get a profile completeness score and instant matches.</p>
                        </div>
                        <div className="step-mini">
                            <div className="step-count">3</div>
                            <h5>Direct Recruiter Access</h5>
                            <p>Apply with one click and chat with hiring managers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Benefits */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ textAlign: 'left', marginBottom: '24px' }} className="section-title">Advanced Job Search Experience</h2>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <li style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ color: 'var(--primary-color)' }}><ShieldCheck size={24} /></div>
                                    <div>
                                        <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>Verified Employers</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>We vet every company to ensure you only see genuine opportunities.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ color: 'var(--primary-color)' }}><TrendingUp size={24} /></div>
                                    <div>
                                        <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>Career Insights</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>Get data on salary trends and in-demand skills for your role.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ color: 'var(--primary-color)' }}><Users size={24} /></div>
                                    <div>
                                        <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>Recruiter Direct</h4>
                                        <p style={{ color: 'var(--text-muted)' }}>Chat directly with hiring managers once your profile is shortlisted.</p>
                                    </div>
                                </li>
                            </ul>
                            <div style={{ marginTop: '40px' }}>
                                <Link to="/jobs" className="view-all-btn" style={{ fontSize: '1.1rem' }}>
                                    Explore All Jobs <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                                borderRadius: '24px',
                                padding: '40px',
                                boxShadow: 'var(--shadow-lg)'
                            }}>
                                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '50%' }}></div>
                                        <div>
                                            <div style={{ fontWeight: '700' }}>Software Engineer</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Google • Hyderabad</div>
                                        </div>
                                    </div>
                                    <div style={{ height: '8px', width: '100%', background: '#f1f5f9', borderRadius: '4px', marginBottom: '8px' }}></div>
                                    <div style={{ height: '8px', width: '80%', background: '#f1f5f9', borderRadius: '4px' }}></div>
                                </div>
                                <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginLeft: '40px' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '50%' }}></div>
                                        <div>
                                            <div style={{ fontWeight: '700' }}>Product Designer</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Meta • Remote</div>
                                        </div>
                                    </div>
                                    <div style={{ height: '8px', width: '100%', background: '#f1f5f9', borderRadius: '4px', marginBottom: '8px' }}></div>
                                    <div style={{ height: '8px', width: '60%', background: '#f1f5f9', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <div className="container">
                <div className="cta-banner">
                    <h2>Ready to take the next step?</h2>
                    <p>Join 10 million+ professionals who have found their dream careers with us.</p>
                    <Link to="/register" className="btn-white">Create Your Free Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Candidates;

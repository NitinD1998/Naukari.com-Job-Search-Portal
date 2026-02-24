import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Briefcase,
    User,
    FileText,
    Bell,
    Heart,
    TrendingUp,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowRight,
    Star,
    Building,
    MapPin,
    IndianRupee,
    ChevronRight
} from 'lucide-react';
import './CandidateDashboard.css';

const CandidateDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        location: 'Bangalore, India',
        experience: '2 Years',
        skills: ['React', 'Node.js', 'JavaScript', 'TypeScript'],
        profilePhoto: null,
        resumeUploaded: true,
        educationAdded: true,
        skillsAdded: true,
        projectsAdded: false
    });

    const [applications, setApplications] = useState([
        { id: 1, jobTitle: 'Frontend Developer', company: 'Tech Solutions Inc.', location: 'Bangalore', salary: '₹8-12 LPA', appliedDate: '2024-01-15', status: 'under_review' },
        { id: 2, jobTitle: 'React Developer', company: 'StartupX', location: 'Remote', salary: '₹10-15 LPA', appliedDate: '2024-01-10', status: 'interview_scheduled' },
        { id: 3, jobTitle: 'Full Stack Developer', company: 'Global Tech', location: 'Hyderabad', salary: '₹12-18 LPA', appliedDate: '2024-01-05', status: 'rejected' }
    ]);

    const [savedJobs, setSavedJobs] = useState([
        { id: 101, jobTitle: 'Senior React Developer', company: 'Innovate Tech', location: 'Bangalore', salary: '₹15-22 LPA', postedDate: '2 days ago', tags: ['React', 'TypeScript'] },
        { id: 102, jobTitle: 'UI/UX Developer', company: 'Design Studio', location: 'Mumbai', salary: '₹8-12 LPA', postedDate: '5 days ago', tags: ['UI', 'Figma'] }
    ]);

    const calculateProfileCompletion = () => {
        const fields = [profileData.name, profileData.email, profileData.phone, profileData.location, profileData.experience, profileData.skills.length > 0, profileData.resumeUploaded, profileData.educationAdded, profileData.projectsAdded];
        const completed = fields.filter(f => f).length;
        return Math.round((completed / fields.length) * 100);
    };

    const profileCompletion = calculateProfileCompletion();

    const getStatusColor = (status) => {
        switch (status) {
            case 'under_review': return '#f59e0b';
            case 'interview_scheduled': return '#10b981';
            case 'rejected': return '#ef4444';
            default: return '#3b82f6';
        }
    };

    const renderOverview = () => (
        <div className="dashboard-overview">
            <div className="welcome-banner">
                <div className="welcome-content">
                    <h2>Hello, {profileData.name.split(' ')[0]}! ✨</h2>
                    <p>You have 2 new job matches today based on your profile.</p>
                </div>
                <div className="welcome-stats">
                    <div className="stat-item">
                        <span className="stat-number">{applications.length}</span>
                        <span className="stat-label">Applications</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{applications.filter(a => a.status === 'interview_scheduled').length}</span>
                        <span className="stat-label">Interviews</span>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h3 className="section-title-sm">Quick Actions</h3>
                <div className="actions-grid">
                    <Link to="/jobs" className="action-card"><Briefcase size={28} /> <span>Find Jobs</span></Link>
                    <Link to="/cv-generator" className="action-card"><FileText size={28} /> <span>CV Builder</span></Link>
                    <Link to="/candidate-join" className="action-card"><User size={28} /> <span>Edit Profile</span></Link>
                    <button className="action-card" onClick={() => setActiveTab('alerts')}><Bell size={28} /> <span>Alerts</span></button>
                </div>
            </div>

            <div className="profile-completion-card">
                <div className="completion-header">
                    <h3>Profile Strength</h3>
                    <span className="completion-percentage">{profileCompletion}%</span>
                </div>
                <div className="completion-bar">
                    <div className="completion-progress" style={{ width: `${profileCompletion}%` }}></div>
                </div>
                <Link to="/candidate-join" className="btn-complete-profile">Complete Profile <ArrowRight size={16} /></Link>
            </div>

            <div className="recent-applications">
                <div className="section-header">
                    <h3>Recent Applications</h3>
                    <button className="view-all-btn" onClick={() => setActiveTab('applications')}>View All <ChevronRight size={16} /></button>
                </div>
                <div className="applications-list">
                    {applications.slice(0, 2).map(app => (
                        <div key={app.id} className="application-item">
                            <div className="application-info">
                                <h4>{app.jobTitle}</h4>
                                <p className="company-name"><Building size={14} /> {app.company}</p>
                            </div>
                            <div className="application-status">
                                <span className="status-badge" style={{ backgroundColor: `${getStatusColor(app.status)}20`, color: getStatusColor(app.status) }}>
                                    {app.status.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="profile-details-full">
            <div className="profile-section-group">
                <div className="section-card-modern">
                    <h3>Section 1 & 2: Basic & Contact</h3>
                    <div className="profile-grid-display">
                        <div className="display-item"><label>Full Name</label><span>{profileData.name}</span></div>
                        <div className="display-item"><label>Applied Job</label><span>Full Stack Developer</span></div>
                        <div className="display-item"><label>Location</label><span>{profileData.location}</span></div>
                        <div className="display-item"><label>Email</label><span>{profileData.email}</span></div>
                        <div className="display-item"><label>Phone</label><span>{profileData.phone}</span></div>
                    </div>
                </div>

                <div className="section-card-modern">
                    <h3>Section 3 & 4: Address & Experience</h3>
                    <div className="profile-grid-display">
                        <div className="display-item full-width"><label>Current Address</label><span>123, Tech Park, Bangalore, KA, 560001</span></div>
                        <div className="display-item"><label>Experience Level</label><span>Experienced</span></div>
                        <div className="display-item"><label>Total Experience</label><span>{profileData.experience}</span></div>
                        <div className="display-item"><label>Current Salary</label><span>₹12,00,000 / Annual</span></div>
                        <div className="display-item"><label>Expected Salary</label><span>₹15 - 20 LPA</span></div>
                        <div className="display-item"><label>Joining Status</label><span>Immediate Joiner</span></div>
                    </div>
                </div>

                <div className="section-card-modern">
                    <h3>Section 5 & 6: Employment History</h3>
                    <div className="history-display">
                        <div className="history-item">
                            <h4>Tech Solutions Inc.</h4>
                            <p>Senior Developer • Jan 2022 - Present</p>
                            <p className="docs-available">Docs: Salary Slips, Experience Letter</p>
                        </div>
                    </div>
                </div>

                <div className="section-card-modern">
                    <h3>Section 7: Documents & Education</h3>
                    <div className="docs-grid">
                        <div className="doc-badge"><CheckCircle size={16} /> Aadhaar Card</div>
                        <div className="doc-badge"><CheckCircle size={16} /> PAN Card</div>
                        <div className="doc-badge"><CheckCircle size={16} /> B.Tech Certificate</div>
                    </div>
                    <div className="display-item" style={{ marginTop: '16px' }}><label>Highest Qualification</label><span>Graduation (B.Tech)</span></div>
                </div>

                <div className="section-card-modern">
                    <h3>Section 8 & 9: Skills & Interview</h3>
                    <div className="skills-cloud">
                        {profileData.skills.map(skill => <span key={skill} className="skill-pill">{skill}</span>)}
                    </div>
                    <div className="profile-grid-display" style={{ marginTop: '20px' }}>
                        <div className="display-item"><label>English Level</label><span>Fluent</span></div>
                        <div className="display-item"><label>Interview Availability</label><span>Telephonic (Mon-Fri)</span></div>
                    </div>
                </div>

                <div className="section-card-modern restricted">
                    <h3>Section 10: Personal Information (Restricted)</h3>
                    <p className="restricted-note"><AlertCircle size={14} /> Compliance Field: Only visible to verified admin.</p>
                    <div className="profile-grid-display">
                        <div className="display-item"><label>Marital Status</label><span>{profileData.maritalStatus || 'Unmarried'}</span></div>
                        <div className="display-item"><label>Religion</label><span>{profileData.religion ? '*****' : 'Not Provided'}</span></div>
                        <div className="display-item"><label>Caste</label><span>{profileData.caste ? '*****' : 'Not Provided'}</span></div>
                        <div className="display-item"><label>Govt Job Prep</label><span>No</span></div>
                    </div>
                </div>

                <div className="section-card-modern">
                    <h3>Section 11: Career Expectations</h3>
                    <div className="display-item full-width">
                        <label>Future Goals</label>
                        <p>Seeking a role that offers growth in System Design and team leadership opportunities with a focus on cutting-edge technologies.</p>
                    </div>
                </div>
            </div>
            <Link to="/candidate-join" className="btn-edit-profile-floating">Update Profile</Link>
        </div>
    );


    return (
        <div className="candidate-dashboard">
            <div className="dashboard-container">
                <aside className="dashboard-sidebar">
                    <div className="sidebar-header">
                        <div className="user-mini-profile">
                            <div className="avatar">{profileData.name.charAt(0)}</div>
                            <div className="user-info">
                                <h4>{profileData.name}</h4>
                                <p>{profileData.email}</p>
                            </div>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><TrendingUp size={20} /> Overview</button>
                        <button className={`nav-item ${activeTab === 'applications' ? 'active' : ''}`} onClick={() => setActiveTab('applications')}><Briefcase size={20} /> Applications</button>
                        <button className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}><Heart size={20} /> Saved</button>
                        <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}><User size={20} /> Profile</button>
                    </nav>
                </aside>

                <main className="dashboard-main">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'applications' && <div className="step-content-fade-in"><h2>My Applications</h2>{/* Application list content */}</div>}
                    {activeTab === 'saved' && <div className="step-content-fade-in"><h2>Saved Jobs</h2>{/* Saved jobs content */}</div>}
                    {activeTab === 'profile' && renderProfile()}
                </main>
            </div>
        </div>
    );
};

export default CandidateDashboard;

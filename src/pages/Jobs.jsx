import React, { useState, useEffect } from 'react';
import { 
    Briefcase, 
    MapPin, 
    Search, 
    Filter, 
    Heart, 
    Clock,
    IndianRupee,
    Building,
    X,
    ChevronDown,
    BookmarkPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [savedJobs, setSavedJobs] = useState([]);
    const [expandedJob, setExpandedJob] = useState(null);

    // Filter states
    const [filters, setFilters] = useState({
        experience: '',
        salaryMin: '',
        salaryMax: '',
        jobType: [],
        location: '',
        remote: false,
        postedWithin: ''
    });

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

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleJobTypeToggle = (type) => {
        setFilters(prev => ({
            ...prev,
            jobType: prev.jobType.includes(type)
                ? prev.jobType.filter(t => t !== type)
                : [...prev.jobType, type]
        }));
    };

    const clearFilters = () => {
        setFilters({
            experience: '',
            salaryMin: '',
            salaryMax: '',
            jobType: [],
            location: '',
            remote: false,
            postedWithin: ''
        });
    };

    const toggleSaveJob = (jobId) => {
        setSavedJobs(prev => 
            prev.includes(jobId)
                ? prev.filter(id => id !== jobId)
                : [...prev, jobId]
        );
    };

    const filteredJobs = jobs.filter(job => {
        // Search filter
        const matchesSearch = 
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

        // Experience filter
        const matchesExperience = !filters.experience || 
            (job.experience && job.experience.toLowerCase().includes(filters.experience.toLowerCase()));

        // Location filter
        const matchesLocation = !filters.location || 
            job.location.toLowerCase().includes(filters.location.toLowerCase());

        // Remote filter
        const matchesRemote = !filters.remote || 
            (job.remote === true || job.location.toLowerCase().includes('remote'));

        // Job type filter
        const matchesJobType = filters.jobType.length === 0 || 
            (job.jobType && filters.jobType.some(t => job.jobType.toLowerCase().includes(t.toLowerCase())));

        // Posted within filter
        let matchesPosted = true;
        if (filters.postedWithin) {
            const jobDate = new Date(job.postedDate || Date.now());
            const now = new Date();
            const daysDiff = (now - jobDate) / (1000 * 60 * 60 * 24);
            
            switch(filters.postedWithin) {
                case '1': matchesPosted = daysDiff <= 1; break;
                case '3': matchesPosted = daysDiff <= 3; break;
                case '7': matchesPosted = daysDiff <= 7; break;
                case '14': matchesPosted = daysDiff <= 14; break;
                case '30': matchesPosted = daysDiff <= 30; break;
                default: matchesPosted = true;
            }
        }

        return matchesSearch && matchesExperience && matchesLocation && matchesRemote && matchesJobType && matchesPosted;
    });

    const getJobAge = (postedDate) => {
        if (!postedDate) return 'Recently posted';
        const days = Math.floor((new Date() - new Date(postedDate)) / (1000 * 60 * 60 * 24));
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return `${Math.floor(days / 30)} months ago`;
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'interview_scheduled': return '#10b981';
            case 'under_review': return '#f59e0b';
            case 'rejected': return '#ef4444';
            default: return '#6b7280';
        }
    };

    return (
        <div className="jobs-page">
            {/* Search Header */}
            <div className="jobs-header">
                <div className="header-content">
                    <h1>Find Your Dream Job</h1>
                    <p>{filteredJobs.length} jobs available</p>

                    <div className="search-container">
                        <div className="search-box main-search">
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by job title, skills, or company..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter size={18} /> Filters
                        </button>
                    </div>
                </div>
            </div>

            <div className="jobs-content">
                {/* Filters Sidebar */}
                <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
                    <div className="filters-header">
                        <h3>Filters</h3>
                        <button className="clear-filters" onClick={clearFilters}>Clear All</button>
                    </div>

                    <div className="filter-section">
                        <h4>Experience</h4>
                        <select 
                            value={filters.experience} 
                            onChange={(e) => handleFilterChange('experience', e.target.value)}
                        >
                            <option value="">Any Experience</option>
                            <option value="0">Fresher</option>
                            <option value="1">1 Year</option>
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                            <option value="5">5 Years</option>
                            <option value="7">7+ Years</option>
                            <option value="10">10+ Years</option>
                        </select>
                    </div>

                    <div className="filter-section">
                        <h4>Salary Range (LPA)</h4>
                        <div className="salary-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.salaryMin}
                                onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                            />
                            <span>to</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.salaryMax}
                                onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>Job Type</h4>
                        <div className="checkbox-group">
                            {['Full Time', 'Part Time', 'Contract', 'Internship', 'Freelance'].map(type => (
                                <label key={type} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={filters.jobType.includes(type)}
                                        onChange={() => handleJobTypeToggle(type)}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>Location</h4>
                        <input
                            type="text"
                            placeholder="Enter city"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                        />
                    </div>

                    <div className="filter-section">
                        <h4>Work Type</h4>
                        <label className="checkbox-label remote-toggle">
                            <input
                                type="checkbox"
                                checked={filters.remote}
                                onChange={(e) => handleFilterChange('remote', e.target.checked)}
                            />
                            <span>Remote Only 🌐</span>
                        </label>
                    </div>

                    <div className="filter-section">
                        <h4>Posted Within</h4>
                        <select
                            value={filters.postedWithin}
                            onChange={(e) => handleFilterChange('postedWithin', e.target.value)}
                        >
                            <option value="">Anytime</option>
                            <option value="1">Last 24 hours</option>
                            <option value="3">Last 3 days</option>
                            <option value="7">Last 7 days</option>
                            <option value="14">Last 14 days</option>
                            <option value="30">Last 30 days</option>
                        </select>
                    </div>
                </div>

                {/* Job Listings */}
                <div className="jobs-listings">
                    <div className="listings-header">
                        <span className="results-count">{filteredJobs.length} jobs found</span>
                        <select className="sort-select">
                            <option>Most Recent</option>
                            <option>Relevance</option>
                            <option>Highest Salary</option>
                            <option>Company Name A-Z</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading jobs...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <p>{error}</p>
                            <button onClick={() => window.location.reload()}>Retry</button>
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="empty-state">
                            <Briefcase size={60} />
                            <h3>No jobs found</h3>
                            <p>Try adjusting your filters or search terms</p>
                            <button onClick={() => { setSearchTerm(''); clearFilters(); }} className="btn-clear">
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="jobs-grid">
                            {filteredJobs.map((job) => (
                                <div key={job._id || job.id} className={`job-card ${expandedJob === job._id ? 'expanded' : ''}`}>
                                    <div className="job-card-header">
                                        <div className="company-logo">
                                            <Building size={24} />
                                        </div>
                                        <div className="job-title-section">
                                            <h3>{job.title}</h3>
                                            <p className="company-name">{job.company}</p>
                                            <div className="job-meta-row">
                                                <span><MapPin size={14} /> {job.location}</span>
                                                <span><Briefcase size={14} /> {job.experience || '0-2 Years'}</span>
                                            </div>
                                        </div>
                                        <button 
                                            className={`save-job-btn ${savedJobs.includes(job._id) ? 'saved' : ''}`}
                                            onClick={() => toggleSaveJob(job._id)}
                                            title="Save job"
                                        >
                                            {savedJobs.includes(job._id) ? <Heart size={20} fill="#ef4444" /> : <BookmarkPlus size={20} />}
                                        </button>
                                    </div>

                                    <div className="job-card-body">
                                        <div className="job-highlights">
                                            <div className="highlight-item">
                                                <IndianRupee size={16} />
                                                <span>{job.salary || '3-6 LPA'}</span>
                                            </div>
                                            <div className="highlight-item">
                                                <Briefcase size={16} />
                                                <span>{job.jobType || 'Full Time'}</span>
                                            </div>
                                            {job.remote && (
                                                <div className="highlight-item remote">
                                                    🌐 Remote
                                                </div>
                                            )}
                                        </div>

                                        <p className="job-description">
                                            {job.desc || job.description || 'Join our team and work on exciting projects...'}
                                        </p>

                                        <div className="job-tags">
                                            {job.tags && job.tags.slice(0, 4).map((tag, i) => (
                                                <span key={i} className="tag">{tag}</span>
                                            ))}
                                            {job.tags && job.tags.length > 4 && (
                                                <span className="tag more">+{job.tags.length - 4}</span>
                                            )}
                                        </div>

                                        <div className="job-card-footer">
                                            <span className="posted-date">
                                                <Clock size={14} /> {getJobAge(job.postedDate)}
                                            </span>
                                            <Link to={`/candidate-join?job=${job._id}`} className="btn-apply">
                                                Apply Now
                                            </Link>
                                        </div>

                                        {expandedJob === job._id && (
                                            <div className="job-expanded-details">
                                                <h4>Job Details</h4>
                                                <p>{job.description || 'Detailed job description will be provided by the employer.'}</p>
                                                <div className="expanded-skills">
                                                    <strong>Required Skills:</strong>
                                                    <div className="skills-list">
                                                        {job.tags || ['JavaScript', 'React', 'Node.js', 'MongoDB'].map((skill, i) => (
                                                            <span key={i} className="skill-tag">{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="expanded-actions">
                                                    <button className="btn-view-company">View Company</button>
                                                    <Link to={`/candidate-join?job=${job._id}`} className="btn-full-apply">
                                                        Full Application
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button 
                                        className="expand-btn"
                                        onClick={() => setExpandedJob(expandedJob === job._id ? null : job._id)}
                                    >
                                        {expandedJob === job._id ? 'Show Less' : 'View Details'}
                                        <ChevronDown size={16} className={expandedJob === job._id ? 'rotated' : ''} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;

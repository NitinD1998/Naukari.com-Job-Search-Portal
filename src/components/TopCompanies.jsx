import React, { useState, useEffect } from 'react';
import './TopCompanies.css';
import { Star } from 'lucide-react';

const TopCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('/api/companies');
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
            setLoading(false);
        };

        fetchCompanies();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading companies...</div>;
    }

    return (
        <div className="top-companies">
            <div className="companies-container">
                {companies.map((company) => (
                    <div key={company._id || company.id} className="company-card">
                        <div className="company-logo-placeholder">
                            {company.icon || company.name[0]}
                        </div>
                        <div className="company-info">
                            <h4 className="company-name">{company.name}</h4>
                            <div className="company-rating">
                                <Star size={14} className="star-icon" fill="#f59e0b" color="#f59e0b" />
                                <span>{company.rating}</span>
                                <span className="company-reviews">| {company.reviews} reviews</span>
                            </div>
                        </div>
                        <div className="company-tags">
                            <span className="tag">{company.type}</span>
                            <span className="tag">MNC</span>
                        </div>
                        <button className="btn-view-jobs">View jobs</button>
                    </div>
                ))}
            </div>
            <div className="companies-footer">
                <button className="btn-view-all outline">View all companies</button>
            </div>
        </div>
    );
};

export default TopCompanies;

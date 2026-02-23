import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('/api/companies');
                if (!response.ok) {
                    throw new Error('Failed to fetch companies');
                }
                const data = await response.json();
                setCompanies(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: 'var(--background-gray)', minHeight: 'calc(100vh - 70px)' }}>

            {/* Search Header */}
            <div style={{ backgroundColor: 'var(--white)', padding: '50px 20px', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '15px', fontWeight: '700' }}>Explore Top Companies</h1>
                <p style={{ color: 'var(--text-light)', marginBottom: '30px', fontSize: '1.1rem' }}>Discover the best places to work and accelerate your career.</p>

                <div style={{
                    display: 'flex',
                    maxWidth: '650px',
                    margin: '0 auto',
                    position: 'relative',
                    alignItems: 'center',
                    background: 'white',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-color)',
                    padding: '6px 6px 6px 24px',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    <Search size={22} color="var(--text-light)" />
                    <input
                        type="text"
                        placeholder="Search by company name or industry (e.g., Product, Service)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            padding: '12px 18px',
                            flex: 1,
                            fontSize: '1.05rem',
                            background: 'transparent'
                        }}
                    />
                    <button className="btn-login-submit" style={{ padding: '12px 30px', width: 'auto' }}>Find Companies</button>
                </div>
            </div>

            {/* Company Listings */}
            <div className="container" style={{ padding: '50px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                        All Companies <span style={{ color: 'var(--text-light)', fontSize: '1.1rem', fontWeight: 'normal', marginLeft: '8px' }}>({filteredCompanies.length} registered)</span>
                    </h2>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-light)' }}>
                        <div className="spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid var(--primary-blue)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
                        <p>Loading the best companies for you...</p>
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '80px', color: '#ef4444' }}>
                        <h3>Oops! Something went wrong</h3>
                        <p>{error}</p>
                    </div>
                ) : filteredCompanies.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px', backgroundColor: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
                        <Building2 size={64} color="var(--text-light)" style={{ marginBottom: '20px', opacity: 0.5 }} />
                        <h3 style={{ color: 'var(--text-dark)', marginBottom: '12px', fontSize: '1.4rem' }}>No companies found</h3>
                        <p style={{ color: 'var(--text-light)', maxWidth: '400px', margin: '0 auto' }}>We couldn't find any companies matching your search. Try different keywords or clear the search.</p>
                        <button onClick={() => setSearchTerm('')} className="btn-login outline" style={{ marginTop: '25px' }}>Clear Selection</button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {filteredCompanies.map((company) => (
                            <div key={company._id || company.id} style={{
                                backgroundColor: 'var(--white)',
                                padding: '30px',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-sm)',
                                border: '1px solid var(--border-color)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    e.currentTarget.style.borderColor = 'var(--primary-blue)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    backgroundColor: '#eff6ff',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '20px',
                                    color: 'var(--primary-blue)',
                                    fontSize: '1.8rem',
                                    fontWeight: 'bold',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                                }}>
                                    {company.icon || company.name[0]}
                                </div>

                                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)', margin: '0 0 8px 0', fontWeight: '600' }}>{company.name}</h3>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '12px' }}>
                                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                                    <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{company.rating}</span>
                                    <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>| {company.reviews} reviews</span>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                    <span style={{
                                        backgroundColor: '#f1f5f9',
                                        color: '#475569',
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}>
                                        {company.type}
                                    </span>
                                </div>

                                <Link to={`/jobs?company=${encodeURIComponent(company.name)}`} className="btn-login-submit" style={{
                                    marginTop: 'auto',
                                    width: '100%',
                                    textDecoration: 'none',
                                    padding: '10px 0',
                                    fontSize: '0.95rem'
                                }}>
                                    View Jobs
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Companies;

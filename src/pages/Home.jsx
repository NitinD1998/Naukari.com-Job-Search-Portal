import React from 'react';
import JobCategories from '../components/JobCategories';
import TopCompanies from '../components/TopCompanies';
import FeaturedJobs from '../components/FeaturedJobs';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <h1 className="hero-title">Find your dream job now</h1>
                    <p className="hero-subtitle">5 lakh+ jobs for you to explore</p>
                    <div className="hero-search-box">
                        <div className="search-input-group">
                            <input type="text" placeholder="Enter skills / designations / companies" />
                        </div>
                        <div className="search-divider"></div>
                        <div className="search-input-group">
                            <input type="text" placeholder="Select experience" />
                        </div>
                        <div className="search-divider"></div>
                        <div className="search-input-group">
                            <input type="text" placeholder="Enter location" />
                        </div>
                        <button className="btn-search">Search</button>
                    </div>
                </div>
            </section>

            {/* Top Companies Section */}
            <section className="section bg-light">
                <div className="container">
                    <h2 className="section-title">Top companies hiring now</h2>
                    <TopCompanies />
                </div>
            </section>

            {/* Featured Jobs Section */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Featured jobs</h2>
                    <FeaturedJobs />
                </div>
            </section>

            {/* Categories Section */}
            <section className="section bg-light">
                <div className="container">
                    <h2 className="section-title">Explore by category</h2>
                    <JobCategories />
                </div>
            </section>
        </div>
    );
};

export default Home;

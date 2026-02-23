import React from 'react';
import './JobCategories.css';
import { Briefcase, Code, Database, LineChart, Megaphone, Monitor, PenTool, Smartphone } from 'lucide-react';

const categories = [
    { id: 1, name: 'Software Development', jobs: '25.4K+', icon: <Code size={24} /> },
    { id: 2, name: 'Data Science', jobs: '10.2K+', icon: <Database size={24} /> },
    { id: 3, name: 'Design & UX', jobs: '8.5K+', icon: <PenTool size={24} /> },
    { id: 4, name: 'Marketing', jobs: '12.1K+', icon: <Megaphone size={24} /> },
    { id: 5, name: 'Sales & Business', jobs: '30.8K+', icon: <LineChart size={24} /> },
    { id: 6, name: 'IT Infrastructure', jobs: '15.6K+', icon: <Monitor size={24} /> },
    { id: 7, name: 'Mobile App Dev', jobs: '9.3K+', icon: <Smartphone size={24} /> },
    { id: 8, name: 'HR & Operations', jobs: '18.2K+', icon: <Briefcase size={24} /> },
];

const JobCategories = () => {
    return (
        <div className="job-categories">
            <div className="categories-grid">
                {categories.map((category) => (
                    <div key={category.id} className="category-card">
                        <div className="category-icon-wrapper">
                            {category.icon}
                        </div>
                        <h3 className="category-title">{category.name}</h3>
                        <p className="category-jobs">{category.jobs} Jobs</p>
                    </div>
                ))}
            </div>
            <div className="categories-footer">
                <button className="btn-view-all">View all categories</button>
            </div>
        </div>
    );
};

export default JobCategories;

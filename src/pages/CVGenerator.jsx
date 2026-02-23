import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';
import './CVGenerator.css';

const CVGenerator = () => {
    const [cvData, setCvData] = useState({
        personal: {
            fullName: 'John Doe',
            jobTitle: 'Frontend Developer',
            email: 'john.doe@example.com',
            phone: '+91 9876543210',
            location: 'Bangalore, India',
            linkedin: 'linkedin.com/in/johndoe',
            portfolio: 'johndoe.dev'
        },
        summary: 'Passionate and detail-oriented Frontend Developer with 3+ years of experience building responsive, user-centric web applications using React, JavaScript, and modern CSS.',
        experience: [
            {
                id: 1,
                company: 'Tech Solutions Inc.',
                role: 'Software Engineer',
                duration: 'Jan 2021 - Present',
                description: 'Developed and maintained core features of the enterprise dashboard. Improved frontend performance by 30% through code splitting and lazy loading.'
            },
            {
                id: 2,
                company: 'StartupX',
                role: 'Web Developer Intern',
                duration: 'Jun 2020 - Dec 2020',
                description: 'Collaborated with the design team to implement responsive landing pages. Built reusable UI components.'
            }
        ],
        education: [
            {
                id: 1,
                institution: 'University of Technology',
                degree: 'B.Tech in Computer Science',
                year: '2016 - 2020',
                score: 'CGPA: 8.5'
            }
        ],
        skills: 'React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Git, Node.js basics, REST APIs'
    });

    const handlePersonalChange = (e) => {
        setCvData({
            ...cvData,
            personal: { ...cvData.personal, [e.target.name]: e.target.value }
        });
    };

    const handleSummaryChange = (e) => {
        setCvData({ ...cvData, summary: e.target.value });
    };

    const handleSkillsChange = (e) => {
        setCvData({ ...cvData, skills: e.target.value });
    };

    // Experience Handlers
    const addExperience = () => {
        setCvData({
            ...cvData,
            experience: [...cvData.experience, { id: Date.now(), company: '', role: '', duration: '', description: '' }]
        });
    };

    const updateExperience = (id, field, value) => {
        const updatedExp = cvData.experience.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        );
        setCvData({ ...cvData, experience: updatedExp });
    };

    const removeExperience = (id) => {
        setCvData({
            ...cvData,
            experience: cvData.experience.filter(exp => exp.id !== id)
        });
    };

    // Education Handlers
    const addEducation = () => {
        setCvData({
            ...cvData,
            education: [...cvData.education, { id: Date.now(), institution: '', degree: '', year: '', score: '' }]
        });
    };

    const updateEducation = (id, field, value) => {
        const updatedEdu = cvData.education.map(edu =>
            edu.id === id ? { ...edu, [field]: value } : edu
        );
        setCvData({ ...cvData, education: updatedEdu });
    };

    const removeEducation = (id) => {
        setCvData({
            ...cvData,
            education: cvData.education.filter(edu => edu.id !== id)
        });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="cv-generator-layout">

            {/* Left Side: Editor Form */}
            <div className="cv-editor no-print">
                <div className="editor-header">
                    <h2>CV Builder</h2>
                    <p>Fill in your details to generate a professional CV.</p>
                </div>

                <div className="editor-section">
                    <h3>Personal Information</h3>
                    <div className="form-grid">
                        <input type="text" name="fullName" value={cvData.personal.fullName} onChange={handlePersonalChange} placeholder="Full Name" />
                        <input type="text" name="jobTitle" value={cvData.personal.jobTitle} onChange={handlePersonalChange} placeholder="Job Title (e.g. Software Engineer)" />
                        <input type="email" name="email" value={cvData.personal.email} onChange={handlePersonalChange} placeholder="Email Address" />
                        <input type="tel" name="phone" value={cvData.personal.phone} onChange={handlePersonalChange} placeholder="Phone Number" />
                        <input type="text" name="location" value={cvData.personal.location} onChange={handlePersonalChange} placeholder="Location (City, Country)" />
                        <input type="text" name="linkedin" value={cvData.personal.linkedin} onChange={handlePersonalChange} placeholder="LinkedIn URL" />
                        <input type="text" name="portfolio" value={cvData.personal.portfolio} onChange={handlePersonalChange} placeholder="Portfolio/Website URL" className="full-width" />
                    </div>
                </div>

                <div className="editor-section">
                    <h3>Professional Summary</h3>
                    <textarea value={cvData.summary} onChange={handleSummaryChange} placeholder="Write a short summary about your professional background..." rows="4" className="full-width" />
                </div>

                <div className="editor-section">
                    <h3>Work Experience</h3>
                    {cvData.experience.map((exp, index) => (
                        <div key={exp.id} className="dynamic-field-group">
                            <div className="group-header">
                                <h4>Experience #{index + 1}</h4>
                                <button onClick={() => removeExperience(exp.id)} className="btn-remove">Remove</button>
                            </div>
                            <div className="form-grid">
                                <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company Name" />
                                <input type="text" value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} placeholder="Job Role" />
                                <input type="text" value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} placeholder="Duration (e.g. Jan 2021 - Present)" className="full-width" />
                                <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} placeholder="Job Description / Responsibilities" rows="3" className="full-width" />
                            </div>
                        </div>
                    ))}
                    <button onClick={addExperience} className="btn-add">+ Add Experience</button>
                </div>

                <div className="editor-section">
                    <h3>Education</h3>
                    {cvData.education.map((edu, index) => (
                        <div key={edu.id} className="dynamic-field-group">
                            <div className="group-header">
                                <h4>Education #{index + 1}</h4>
                                <button onClick={() => removeEducation(edu.id)} className="btn-remove">Remove</button>
                            </div>
                            <div className="form-grid">
                                <input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} placeholder="Institution Name" />
                                <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Degree" />
                                <input type="text" value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} placeholder="Year (e.g. 2016 - 2020)" />
                                <input type="text" value={edu.score} onChange={(e) => updateEducation(edu.id, 'score', e.target.value)} placeholder="Score / CGPA" />
                            </div>
                        </div>
                    ))}
                    <button onClick={addEducation} className="btn-add">+ Add Education</button>
                </div>

                <div className="editor-section">
                    <h3>Skills</h3>
                    <textarea value={cvData.skills} onChange={handleSkillsChange} placeholder="e.g. React.js, Python, Project Management (comma separated)" rows="3" className="full-width" />
                </div>

            </div>

            {/* Right Side: Live Preview */}
            <div className="cv-preview-container">
                <div className="preview-header no-print">
                    <h3>Live Preview</h3>
                    <button onClick={handlePrint} className="btn-download">Download / Print CV</button>
                </div>

                <div className="cv-document" id="cv-document-print">

                    {/* CV Header */}
                    <div className="cv-header">
                        <h1 className="cv-name">{cvData.personal.fullName || 'Your Name'}</h1>
                        <h2 className="cv-title">{cvData.personal.jobTitle || 'Job Title'}</h2>

                        <div className="cv-contact-info">
                            {cvData.personal.email && (
                                <span className="contact-item"><Mail size={12} /> {cvData.personal.email}</span>
                            )}
                            {cvData.personal.phone && (
                                <span className="contact-item"><Phone size={12} /> {cvData.personal.phone}</span>
                            )}
                            {cvData.personal.location && (
                                <span className="contact-item"><MapPin size={12} /> {cvData.personal.location}</span>
                            )}
                            {cvData.personal.linkedin && (
                                <span className="contact-item"><Linkedin size={12} /> {cvData.personal.linkedin}</span>
                            )}
                            {cvData.personal.portfolio && (
                                <span className="contact-item"><LinkIcon size={12} /> {cvData.personal.portfolio}</span>
                            )}
                        </div>
                    </div>

                    {/* CV Summary */}
                    {cvData.summary && (
                        <div className="cv-section">
                            <h3 className="section-title">Professional Summary</h3>
                            <p className="cv-summary-text">{cvData.summary}</p>
                        </div>
                    )}

                    {/* CV Experience */}
                    {cvData.experience.length > 0 && (
                        <div className="cv-section">
                            <h3 className="section-title">Work Experience</h3>
                            <div className="experience-list">
                                {cvData.experience.map(exp => (
                                    <div key={exp.id} className="experience-item">
                                        <div className="item-header">
                                            <h4 className="item-title">{exp.role}</h4>
                                            <span className="item-date">{exp.duration}</span>
                                        </div>
                                        <div className="item-subtitle">{exp.company}</div>
                                        {exp.description && <p className="item-desc">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CV Education */}
                    {cvData.education.length > 0 && (
                        <div className="cv-section">
                            <h3 className="section-title">Education</h3>
                            <div className="education-list">
                                {cvData.education.map(edu => (
                                    <div key={edu.id} className="education-item">
                                        <div className="item-header">
                                            <h4 className="item-title">{edu.degree}</h4>
                                            <span className="item-date">{edu.year}</span>
                                        </div>
                                        <div className="item-subtitle">
                                            {edu.institution} {edu.score ? `| ${edu.score}` : ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CV Skills */}
                    {cvData.skills && (
                        <div className="cv-section">
                            <h3 className="section-title">Core Skills</h3>
                            <div className="cv-skills-list">
                                {cvData.skills.split(',').map((skill, index) => {
                                    const trimmed = skill.trim();
                                    return trimmed ? <span key={index} className="cv-skill-tag">{trimmed}</span> : null;
                                })}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CVGenerator;

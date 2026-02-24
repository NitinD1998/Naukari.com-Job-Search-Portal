import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostJob.css';

const PostJob = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        // Section 1: Overview
        companyName: 'Default Corp (Linked)', // Mocked auto-link
        jobTitle: '',
        openings: '',
        city: '',
        area1: '',
        area2: '',
        workMode: 'Work From Office',

        // Section 2: Eligibility
        experience: 'Fresher',
        minSalary: '',
        maxSalary: '',
        salaryType: 'Monthly',
        minAge: '',
        maxAge: '',
        benefits: [],

        // Section 3: Details
        description: '',
        skills: '',
        shiftType: 'Full-Time',
        shiftStart: '',
        shiftEnd: '',
        shiftMode: 'Day Shift',

        // Section 4: Communication
        callingTimeline: 'Monday–Saturday | 10:00 AM – 6:00 PM',
        englishLevel: 'Not Required',

        // Section 5: Interview
        interview1Date: '',
        interview1Time: '',
        interview1Mode: 'Face-to-Face',
        interview2Date: '',
        interview2Time: '',
        interview2Mode: 'Face-to-Face',
        locationLink: '',

        // Section 6: HR Details
        contactPerson: '',
        hrName: '',
        officialEmail: '',
        contactNumber: '',

        // Section 7: Urgency
        employeeStrength: '1–10',
        urgency: 'Immediate',

        // Section 8: Address
        jobAddress: '',
        locationPreference: 'Within City',

        // Section 9: Legal (Restricted)
        religion: 'Any',
        caste: '',

        // Declarations
        policyAgreement: false,
        termsAgreement: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'benefits') {
                const updatedBenefits = [...formData.benefits];
                if (checked) updatedBenefits.push(value);
                else {
                    const index = updatedBenefits.indexOf(value);
                    if (index > -1) updatedBenefits.splice(index, 1);
                }
                setFormData(prev => ({ ...prev, benefits: updatedBenefits }));
            } else {
                setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Job Posted Data:', formData);
        setSuccess(true);
        setTimeout(() => navigate('/'), 3000);
    };

    if (success) {
        return (
            <div className="post-job-page">
                <div className="post-job-container success-message-v2">
                    <div style={{ fontSize: '5rem', color: '#2e7d32' }}>✓</div>
                    <h2>Job Posted Successfully!</h2>
                    <p>Your job description is now live and candidates can start applying.</p>
                    <p>Redirecting to homepage...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="post-job-page">
            <div className="post-job-container">
                <h2>Post a New Job</h2>

                <form onSubmit={handleSubmit}>
                    {/* Section 1: Overview */}
                    <div className="job-section">
                        <h3>Section 1: Company & Job Overview</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Company Name (Linked)</label>
                                <input type="text" name="companyName" value={formData.companyName} readOnly style={{ background: '#f1f3f5', cursor: 'not-allowed' }} />
                            </div>
                            <div className="form-field">
                                <label>Job Title / Designation *</label>
                                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required placeholder="e.g. Sales Executive" />
                            </div>
                            <div className="form-field">
                                <label>Number of Openings *</label>
                                <input type="number" name="openings" value={formData.openings} onChange={handleChange} required placeholder="e.g. 5" />
                            </div>
                            <div className="form-field">
                                <label>Job Location City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Mumbai" />
                            </div>
                            <div className="form-field">
                                <label>Sector / Area 1</label>
                                <input type="text" name="area1" value={formData.area1} onChange={handleChange} placeholder="e.g. Andheri East" />
                            </div>
                            <div className="form-field">
                                <label>Work Mode</label>
                                <div className="radio-group">
                                    {['Work From Office', 'Work From Home', 'Hybrid'].map(mode => (
                                        <label key={mode} className="option-item">
                                            <input type="radio" name="workMode" value={mode} checked={formData.workMode === mode} onChange={handleChange} />
                                            {mode}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Eligibility */}
                    <div className="job-section">
                        <h3>Section 2: Candidate Eligibility</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Experience Requirement</label>
                                <div className="radio-group">
                                    {['Fresher', 'Experienced', 'Both'].map(exp => (
                                        <label key={exp} className="option-item">
                                            <input type="radio" name="experience" value={exp} checked={formData.experience === exp} onChange={handleChange} />
                                            {exp}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Salary Range (₹)</label>
                                <div className="salary-group">
                                    <input type="number" name="minSalary" value={formData.minSalary} onChange={handleChange} placeholder="Min" />
                                    <span>-</span>
                                    <input type="number" name="maxSalary" value={formData.maxSalary} onChange={handleChange} placeholder="Max" />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Salary Type</label>
                                <div className="radio-group">
                                    {['Monthly', 'Annual (CTC)'].map(type => (
                                        <label key={type} className="option-item">
                                            <input type="radio" name="salaryType" value={type} checked={formData.salaryType === type} onChange={handleChange} />
                                            {type}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Age Criteria</label>
                                <div className="salary-group">
                                    <input type="number" name="minAge" value={formData.minAge} onChange={handleChange} placeholder="Min Age" />
                                    <input type="number" name="maxAge" value={formData.maxAge} onChange={handleChange} placeholder="Max Age" />
                                </div>
                            </div>
                            <div className="form-field full-width">
                                <label>Additional Benefits (Optional)</label>
                                <div className="checkbox-group">
                                    {['Bonus', 'Incentives', 'Travel Allowance', 'Mobile Allowance'].map(benefit => (
                                        <label key={benefit} className="option-item">
                                            <input type="checkbox" name="benefits" value={benefit} checked={formData.benefits.includes(benefit)} onChange={handleChange} />
                                            {benefit}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Details */}
                    <div className="job-section">
                        <h3>Section 3: Job Details</h3>
                        <div className="form-grid">
                            <div className="form-field full-width">
                                <label>Job Description *</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" placeholder="Describe roles, responsibilities, targets..."></textarea>
                            </div>
                            <div className="form-field">
                                <label>Required Skills (Optional)</label>
                                <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Communication, Sales, Java" />
                            </div>
                            <div className="form-field">
                                <label>Shift Timing</label>
                                <div className="timing-row">
                                    <input type="time" name="shiftStart" value={formData.shiftStart} onChange={handleChange} />
                                    <span>To</span>
                                    <input type="time" name="shiftEnd" value={formData.shiftEnd} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Shift Mode</label>
                                <div className="radio-group">
                                    {['Day Shift', 'Night Shift', 'Rotational'].map(shift => (
                                        <label key={shift} className="option-item">
                                            <input type="radio" name="shiftMode" value={shift} checked={formData.shiftMode === shift} onChange={handleChange} />
                                            {shift}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Communication */}
                    <div className="job-section">
                        <h3>Section 4: Communication & Calling Details</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Candidate Calling Timeline</label>
                                <input type="text" name="callingTimeline" value={formData.callingTimeline} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>English Requirement</label>
                                <select name="englishLevel" value={formData.englishLevel} onChange={handleChange}>
                                    <option value="Not Required">Not Required</option>
                                    <option value="Thoda English">Thoda English</option>
                                    <option value="Good English Only">Good English Only</option>
                                    <option value="Fluent English">Fluent English</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Interview */}
                    <div className="job-section">
                        <h3>Section 5: Interview Information</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Interview Schedule – Option 1</label>
                                <div className="salary-group">
                                    <input type="date" name="interview1Date" value={formData.interview1Date} onChange={handleChange} />
                                    <input type="time" name="interview1Time" value={formData.interview1Time} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Interview Mode</label>
                                <select name="interview1Mode" value={formData.interview1Mode} onChange={handleChange}>
                                    <option value="Face-to-Face">Face-to-Face</option>
                                    <option value="Telephonic">Telephonic</option>
                                    <option value="Video">Video</option>
                                </select>
                            </div>
                            <div className="form-field full-width">
                                <label>Interview Location / Link</label>
                                <input type="text" name="locationLink" value={formData.locationLink} onChange={handleChange} placeholder="Office Address or Online Meeting Link" />
                            </div>
                        </div>
                    </div>

                    {/* Section 6: Contact */}
                    <div className="job-section">
                        <h3>Section 6: Contact & HR Details</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Contact Person / Interviewer *</label>
                                <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
                            </div>
                            <div className="form-field">
                                <label>Official Email ID *</label>
                                <input type="email" name="officialEmail" value={formData.officialEmail} onChange={handleChange} required />
                            </div>
                            <div className="form-field">
                                <label>Contact Number *</label>
                                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required placeholder="Masked via portal" />
                            </div>
                        </div>
                    </div>

                    {/* Section 7: Organization */}
                    <div className="job-section">
                        <h3>Section 7: Company Size & Hiring Urgency</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Employee Strength</label>
                                <select name="employeeStrength" value={formData.employeeStrength} onChange={handleChange}>
                                    <option value="1–10">1–10</option>
                                    <option value="11–50">11–50</option>
                                    <option value="51–200">51–200</option>
                                    <option value="201–500">201–500</option>
                                    <option value="500+">500+</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Hiring Urgency</label>
                                <div className="radio-group">
                                    {['Immediate', 'Within 7 Days', 'Within 15 Days', 'Flexible'].map(urgency => (
                                        <label key={urgency} className="option-item">
                                            <input type="radio" name="urgency" value={urgency} checked={formData.urgency === urgency} onChange={handleChange} />
                                            {urgency}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 8: Address */}
                    <div className="job-section">
                        <h3>Section 8: Job Address & Location Filter</h3>
                        <div className="form-grid">
                            <div className="form-field full-width">
                                <label>Detailed Job Address *</label>
                                <textarea name="jobAddress" value={formData.jobAddress} onChange={handleChange} required placeholder="Complete address with landmark & PIN code"></textarea>
                            </div>
                            <div className="form-field full-width">
                                <label>Candidate Location Preference</label>
                                <div className="radio-group">
                                    {['Within 10 KM radius', 'Within City', 'Any Location'].map(pref => (
                                        <label key={pref} className="option-item">
                                            <input type="radio" name="locationPreference" value={pref} checked={formData.locationPreference === pref} onChange={handleChange} />
                                            {pref}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 9: Legal & Compliance */}
                    <div className="job-section">
                        <h3>Section 9: Legal & Compliance Section</h3>
                        <div className="compliance-box">
                            <h4>⚠️ Compliance Note:</h4>
                            <p>“Our platform follows equal employment opportunity policies. Job postings based on religion, caste, gender, or personal belief are restricted unless legally justified.”</p>
                        </div>

                        <div className="form-grid" style={{ marginTop: '20px' }}>
                            <div className="form-field restricted-field">
                                <label>Religion Preference (Strongly Discouraged)</label>
                                <select name="religion" value={formData.religion} disabled>
                                    <option value="Any">Any (Restricted)</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Muslim">Muslim</option>
                                    <option value="Christian">Christian</option>
                                </select>
                            </div>
                            <div className="form-field restricted-field">
                                <label>Caste Preference (Restricted)</label>
                                <input type="text" name="caste" value={formData.caste} readOnly placeholder="Admin only / Disabled" />
                            </div>
                        </div>
                    </div>

                    {/* Final Declaration */}
                    <div className="job-section">
                        <h3>Final Declaration</h3>
                        <div className="checkbox-group" style={{ flexDirection: 'column' }}>
                            <label className="option-item">
                                <input type="checkbox" name="policyAgreement" checked={formData.policyAgreement} onChange={handleChange} required />
                                I confirm that this job posting follows company policy and applicable labor laws.
                            </label>
                            <label className="option-item">
                                <input type="checkbox" name="termsAgreement" checked={formData.termsAgreement} onChange={handleChange} required />
                                I agree to the portal’s Terms & Conditions.
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="btn-post-job">Publish Job</button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Upload, Briefcase, User, MapPin, GraduationCap, Award, FileText, AlertCircle, ShieldCheck } from 'lucide-react';
import './CandidateApplication.css';

const CandidateApplication = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [submitted, setSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Section 1: Basic Details
        fullName: '',
        appliedJob: 'Full Stack Developer',
        cityName: '',
        profilePhoto: null,
        // Section 2: Contact Information
        email: '',
        phone: '',
        emergencyPhone: '',
        // Section 3: Address Details
        currentAddress: '',
        permanentAddress: '',
        sameAsCurrent: false,
        // Section 4: Experience & Status
        experienceLevel: 'Fresher',
        totalExpMin: '',
        totalExpMax: '',
        lastSalary: '',
        expectedSalaryMin: '',
        expectedSalaryMax: '',
        joinStatus: 'Immediate Joiner',
        noticePeriod: '',
        // Section 5: Previous Employment
        pastJobs: [
            { company: '', title: '', durationFrom: '', durationTo: '', reason: '', authName: '', authDesignation: '', authContact: '' }
        ],
        // Section 6: Doc Availability
        docsAvailable: [],
        docsUnavailableReason: '',
        // Section 7: Personal Documents & Education
        aadhaarCard: null,
        panCard: null,
        qualificationCert: null,
        otherCertificates: [], // New field
        highestQualification: '',
        qualificationDetails: '',
        // Section 8: Skills & Communication
        skills: [], // Changed to array
        skillInput: '', // Temporary for tag input
        englishLevel: 'Speak Good English',
        // Section 9: Interview & Availability
        telephonicAvailability: 'Yes', // New field
        preferredTimeSlot: '',
        preferredDays: '',
        resumeCv: null,
        // Section 10: Personal Information (Optional)
        maritalStatus: 'Unmarried',
        fatherProfession: '',
        govtJobPrep: 'No',
        religion: '',
        caste: '',
        // Section 11: Career Expectations
        nextCompanyExpectations: '',
        // Final Declaration
        declarationConfirmed: false,
        dataConsent: false,
        termsAgreement: false
    });

    const steps = [
        { id: 1, title: 'Basic & Contact', icon: <User size={20} /> },
        { id: 2, title: 'Address & Status', icon: <MapPin size={20} /> },
        { id: 3, title: 'Experience & History', icon: <Briefcase size={20} /> },
        { id: 4, title: 'Documents & Edu', icon: <FileText size={20} /> },
        { id: 5, title: 'Skills & Interview', icon: <Award size={20} /> },
        { id: 6, title: 'Expectations & Review', icon: <ShieldCheck size={20} /> }
    ];

    useEffect(() => {
        if (formData.sameAsCurrent) {
            setFormData(prev => ({ ...prev, permanentAddress: prev.currentAddress }));
        }
    }, [formData.currentAddress, formData.sameAsCurrent]);

    // Handle hash navigation from Candidates page
    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const sectionId = hash.replace('#section-', '');
            const sectionNum = parseInt(sectionId, 10);
            if (sectionNum >= 1 && sectionNum <= 11) {
                // Map sections to steps
                // Sections 1-2 -> Step 1
                // Section 3 -> Step 2
                // Sections 4-5 -> Step 3
                // Sections 6-7 -> Step 4
                // Sections 8-9 -> Step 5
                // Sections 10-11 -> Step 6
                let step = 1;
                if (sectionNum <= 2) step = 1;
                else if (sectionNum === 3) step = 2;
                else if (sectionNum <= 5) step = 3;
                else if (sectionNum <= 7) step = 4;
                else if (sectionNum <= 9) step = 5;
                else step = 6;
                
                setCurrentStep(step);
                
                // Scroll to the form section after a short delay
                setTimeout(() => {
                    const element = document.getElementById('candidate-form-section');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'docsAvailable') {
                let updatedDocs = [...formData.docsAvailable];
                if (checked) {
                    // If checking a real doc, remove "Not Available" if it was there
                    updatedDocs = updatedDocs.filter(d => d !== 'Not Available');
                    updatedDocs.push(value);
                } else {
                    const index = updatedDocs.indexOf(value);
                    if (index > -1) updatedDocs.splice(index, 1);
                }
                setFormData(prev => ({ ...prev, docsAvailable: updatedDocs, docsUnavailableReason: '' }));
            } else {
                setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleJobChange = (index, field, value) => {
        const updatedJobs = [...formData.pastJobs];
        updatedJobs[index][field] = value;
        setFormData(prev => ({ ...prev, pastJobs: updatedJobs }));
    };

    const addMoreJob = () => {
        setFormData(prev => ({
            ...prev,
            pastJobs: [...prev.pastJobs, { company: '', title: '', durationFrom: '', durationTo: '', reason: '', authName: '', authDesignation: '', authContact: '' }]
        }));
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            if (field === 'otherCertificates') {
                setFormData(prev => ({ ...prev, otherCertificates: [...prev.otherCertificates, file] }));
            } else {
                setFormData(prev => ({ ...prev, [field]: file }));
            }
        }
    };

    const addSkill = (e) => {
        if (e.key === 'Enter' && formData.skillInput.trim()) {
            e.preventDefault();
            if (!formData.skills.includes(formData.skillInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills, formData.skillInput.trim()],
                    skillInput: ''
                }));
            }
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skillToRemove)
        }));
    };

    const removeOtherCert = (index) => {
        setFormData(prev => ({
            ...prev,
            otherCertificates: prev.otherCertificates.filter((_, i) => i !== index)
        }));
    };

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => navigate('/dashboard'), 5000);
    };

    if (submitted) {
        return (
            <div className="success-overlay-candidate">
                <div className="success-card">
                    <div className="success-icon-wrapper">
                        <Check size={48} color="white" />
                    </div>
                    <h2>Application Submitted!</h2>
                    <p>Your portal profile is now complete. Our AI is matching you with the best opportunities based on your skills and expectations.</p>
                    <div className="success-score">
                        <span>Profile Completeness</span>
                        <div className="score-bar"><div className="score-progress" style={{ width: '100%' }}></div></div>
                        <strong>100%</strong>
                    </div>
                    <button onClick={() => navigate('/dashboard')} className="btn-primary-large" style={{ width: '100%', marginTop: '20px' }}>Go to Dashboard</button>
                </div>
            </div>
        );
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: // Basic & Contact
                return (
                    <div className="step-content-fade-in">
                        <h3 className="step-title">Section 1 & 2: Basic Details & Contact</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Candidate Full Name *</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter full name" />
                            </div>
                            <div className="form-field">
                                <label>Applied Job (Auto-mapped)</label>
                                <input type="text" value={formData.appliedJob} readOnly className="readonly-input" />
                            </div>
                            <div className="form-field">
                                <label>City Name *</label>
                                <input type="text" name="cityName" value={formData.cityName} onChange={handleChange} required placeholder="Current city" />
                            </div>
                            <div className="form-field">
                                <label>Profile Photo (Passport size)</label>
                                <div className="file-upload-wrapper">
                                    <input type="file" accept="image/*" id="profilePhoto" onChange={(e) => handleFileChange(e, 'profilePhoto')} hidden />
                                    <label htmlFor="profilePhoto" className="file-upload-label">
                                        <Upload size={18} /> <span>{formData.profilePhoto ? formData.profilePhoto.name : 'Choose JPG/PNG'}</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Email ID *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" />
                            </div>
                            <div className="form-field">
                                <label>Personal Contact Number *</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" />
                            </div>
                            <div className="form-field">
                                <label>Emergency Contact Number *</label>
                                <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} required placeholder="Father/Mother/Guardian" />
                            </div>
                        </div>
                    </div>
                );
            case 2: // Address & Status
                return (
                    <div className="step-content-fade-in">
                        <h3 className="step-title">Section 3 & 4: Address & Experience Status</h3>
                        <div className="form-grid">
                            <div className="form-field full-width">
                                <label>Current Address *</label>
                                <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} required placeholder="House No., Area, City, State, PIN" />
                            </div>
                            <div className="form-field full-width">
                                <label>Permanent Address *</label>
                                <div className="radio-group-simple" style={{ marginBottom: '12px' }}>
                                    <label>
                                        <input type="radio" name="sameAsCurrent" checked={formData.sameAsCurrent === true} onChange={() => setFormData(prev => ({ ...prev, sameAsCurrent: true }))} />
                                        <span>Same as Current</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="sameAsCurrent" checked={formData.sameAsCurrent === false} onChange={() => setFormData(prev => ({ ...prev, sameAsCurrent: false }))} />
                                        <span>Different (Enter details)</span>
                                    </label>
                                </div>
                                {!formData.sameAsCurrent && (
                                    <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="House No., Area, City, State, PIN" />
                                )}
                            </div>
                            <div className="form-field full-width">
                                <label>Experience Level</label>
                                <div className="radio-group-modern">
                                    <label className={formData.experienceLevel === 'Fresher' ? 'active' : ''}>
                                        <input type="radio" name="experienceLevel" value="Fresher" checked={formData.experienceLevel === 'Fresher'} onChange={handleChange} />
                                        <span>Fresher</span>
                                    </label>
                                    <label className={formData.experienceLevel === 'Experienced' ? 'active' : ''}>
                                        <input type="radio" name="experienceLevel" value="Experienced" checked={formData.experienceLevel === 'Experienced'} onChange={handleChange} />
                                        <span>Experienced</span>
                                    </label>
                                </div>
                            </div>
                            {formData.experienceLevel === 'Experienced' && (
                                <div className="form-field">
                                    <label>Total Experience (If Experienced)</label>
                                    <div className="dual-input">
                                        <div className="input-with-label">
                                            <span>Minimum Years</span>
                                            <input type="number" placeholder="Min" value={formData.totalExpMin} name="totalExpMin" onChange={handleChange} />
                                        </div>
                                        <div className="input-with-label">
                                            <span>Maximum Years</span>
                                            <input type="number" placeholder="Max" value={formData.totalExpMax} name="totalExpMax" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="form-field">
                                <label>Joining Status</label>
                                <select name="joinStatus" value={formData.joinStatus} onChange={handleChange}>
                                    <option value="Immediate Joiner">Immediate Joiner</option>
                                    <option value="Notice Period">Notice Period</option>
                                </select>
                            </div>
                            {formData.joinStatus === 'Notice Period' && (
                                <div className="form-field">
                                    <label>Notice Period (Days)</label>
                                    <input type="number" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} placeholder="e.g. 30" />
                                </div>
                            )}
                            <div className="form-field">
                                <label>Last Drawn Salary (₹ Monthly/Annual)</label>
                                <input type="text" name="lastSalary" value={formData.lastSalary} onChange={handleChange} placeholder="e.g. 50,000 per month" />
                            </div>
                            <div className="form-field">
                                <label>Salary Expectation (₹ Min - Max)</label>
                                <div className="dual-input">
                                    <input type="text" placeholder="Min" value={formData.expectedSalaryMin} name="expectedSalaryMin" onChange={handleChange} />
                                    <input type="text" placeholder="Max" value={formData.expectedSalaryMax} name="expectedSalaryMax" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 3: // Experience Details & Docs
                return (
                    <div className="step-content-fade-in">
                        <h3 className="step-title">Section 5 & 6: Employment History & Documents</h3>
                        {formData.experienceLevel === 'Experienced' ? (
                            <div className="employment-history-section">
                                {formData.pastJobs.map((job, index) => (
                                    <div key={index} className="job-card-expanded">
                                        <div className="card-header">
                                            <h4>Company {index + 1}</h4>
                                            {index > 0 && <button type="button" className="btn-remove" onClick={() => {
                                                const updated = [...formData.pastJobs];
                                                updated.splice(index, 1);
                                                setFormData(prev => ({ ...prev, pastJobs: updated }));
                                            }}>Remove</button>}
                                        </div>
                                        <div className="form-grid">
                                            <div className="form-field"><label>Company Name</label><input type="text" value={job.company} onChange={(e) => handleJobChange(index, 'company', e.target.value)} /></div>
                                            <div className="form-field"><label>Job Title</label><input type="text" value={job.title} onChange={(e) => handleJobChange(index, 'title', e.target.value)} /></div>
                                            <div className="form-field"><label>From</label><input type="date" value={job.durationFrom} onChange={(e) => handleJobChange(index, 'durationFrom', e.target.value)} /></div>
                                            <div className="form-field"><label>To</label><input type="date" value={job.durationTo} onChange={(e) => handleJobChange(index, 'durationTo', e.target.value)} /></div>
                                            <div className="form-field full-width"><label>Reason for Leaving</label><input type="text" value={job.reason} onChange={(e) => handleJobChange(index, 'reason', e.target.value)} /></div>
                                            <div className="form-field"><label>Auth Person Name</label><input type="text" value={job.authName} onChange={(e) => handleJobChange(index, 'authName', e.target.value)} /></div>
                                            <div className="form-field"><label>Designation</label><input type="text" value={job.authDesignation} onChange={(e) => handleJobChange(index, 'authDesignation', e.target.value)} /></div>
                                            <div className="form-field"><label>Contact Number</label><input type="tel" value={job.authContact} onChange={(e) => handleJobChange(index, 'authContact', e.target.value)} /></div>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="btn-add-modern" onClick={addMoreJob}>+ Add Previous Company</button>

                                <div className="docs-availability-box" style={{ marginTop: '32px' }}>
                                    <h4>Section 6: Previous Company Documents</h4>
                                    <div className="checkbox-grid">
                                        {['Salary Slips', 'Bank Account Statement', 'Experience Letter', 'Relieving Letter'].map(doc => (
                                            <label key={doc} className={`checkbox-modern ${formData.docsAvailable.includes('Not Available') ? 'disabled' : ''}`}>
                                                <input
                                                    type="checkbox"
                                                    name="docsAvailable"
                                                    value={doc}
                                                    checked={formData.docsAvailable.includes(doc)}
                                                    onChange={handleChange}
                                                    disabled={formData.docsAvailable.includes('Not Available')}
                                                />
                                                <span>{doc}</span>
                                            </label>
                                        ))}
                                        <label className="checkbox-modern">
                                            <input
                                                type="checkbox"
                                                name="docsAvailable"
                                                value="Not Available"
                                                checked={formData.docsAvailable.includes('Not Available')}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFormData(prev => ({ ...prev, docsAvailable: ['Not Available'] }));
                                                    } else {
                                                        setFormData(prev => ({ ...prev, docsAvailable: [] }));
                                                    }
                                                }}
                                            />
                                            <span>Not Available (Specify Reason)</span>
                                        </label>
                                    </div>
                                    {formData.docsAvailable.includes('Not Available') && (
                                        <div className="form-field" style={{ marginTop: '15px' }}>
                                            <label>Reason for Unavailability *</label>
                                            <input
                                                type="text"
                                                name="docsUnavailableReason"
                                                value={formData.docsUnavailableReason}
                                                onChange={handleChange}
                                                placeholder="e.g. Lost documents, Digital copies only, etc."
                                                required
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="empty-state-card">
                                <AlertCircle size={40} />
                                <p>You have selected "Fresher". No previous employment details required. Please proceed to the next step.</p>
                            </div>
                        )}
                    </div>
                );
            case 4: // Documents & Education
                return (
                    <div className="step-content-fade-in">
                        <h3 className="step-title">Section 7: Personal Documents & Education</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Aadhaar Card (Upload)</label>
                                <input type="file" onChange={(e) => handleFileChange(e, 'aadhaarCard')} />
                            </div>
                            <div className="form-field">
                                <label>PAN Card (Upload)</label>
                                <input type="file" onChange={(e) => handleFileChange(e, 'panCard')} />
                            </div>
                            <div className="form-field">
                                <label>Highest Qualification Certificate</label>
                                <input type="file" onChange={(e) => handleFileChange(e, 'qualificationCert')} />
                            </div>
                            <div className="form-field">
                                <label>Highest Qualification *</label>
                                <select name="highestQualification" value={formData.highestQualification} onChange={handleChange} required>
                                    <option value="">Select Level</option>
                                    {['10th', '12th', 'Diploma', 'Graduation', 'Post-Graduation'].map(q => <option key={q} value={q}>{q}</option>)}
                                </select>
                            </div>
                            <div className="form-field full-width">
                                <label>Qualification Details (College, Year, Percentage)</label>
                                <textarea name="qualificationDetails" value={formData.qualificationDetails} onChange={handleChange} placeholder="e.g. IIT Delhi, 2022, 8.5 CGPA" />
                            </div>
                            <div className="form-field full-width">
                                <label>Other Certificates (Optional)</label>
                                <div className="multi-file-upload">
                                    <input type="file" id="otherCerts" onChange={(e) => handleFileChange(e, 'otherCertificates')} hidden />
                                    <label htmlFor="otherCerts" className="btn-add-file">
                                        <Upload size={16} /> <span>Upload Certificate</span>
                                    </label>
                                    <div className="file-preview-list">
                                        {formData.otherCertificates.map((file, idx) => (
                                            <div key={idx} className="file-tag">
                                                <span>{file.name}</span>
                                                <button type="button" onClick={() => removeOtherCert(idx)}>×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 5: // Skills & Interview
                return (
                    <div className="step-content-fade-in">
                        <h3 className="step-title">Section 8 & 9: Skills & Interview Availability</h3>
                        <div className="form-grid">
                            <div className="form-field full-width">
                                <label>Skills (Technical / Non-Technical) *</label>
                                <div className="skills-tag-input">
                                    <div className="tags-container">
                                        {formData.skills.map(skill => (
                                            <span key={skill} className="skill-tag">
                                                {skill}
                                                <button type="button" onClick={() => removeSkill(skill)}>×</button>
                                            </span>
                                        ))}
                                        <input
                                            type="text"
                                            name="skillInput"
                                            value={formData.skillInput}
                                            onChange={handleChange}
                                            onKeyDown={addSkill}
                                            placeholder="Type skill and press Enter"
                                        />
                                    </div>
                                </div>
                                <p className="field-hint">Press Enter to add multiple skills</p>
                            </div>
                            <div className="form-field">
                                <label>English Communication Level</label>
                                <select name="englishLevel" value={formData.englishLevel} onChange={handleChange}>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Speak Good English">Speak Good English</option>
                                    <option value="Speak Thoda English">Speak Thoda English</option>
                                    <option value="Not Good English">Not Good English</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Telephonic Interview Availability</label>
                                <select name="telephonicAvailability" value={formData.telephonicAvailability} onChange={handleChange}>
                                    <option value="Yes">Available</option>
                                    <option value="No">Not Available</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Preferred Time Slot (Interview)</label>
                                <input type="text" name="preferredTimeSlot" value={formData.preferredTimeSlot} onChange={handleChange} placeholder="e.g. 10 AM - 1 PM" />
                            </div>
                            <div className="form-field">
                                <label>Preferred Days</label>
                                <input type="text" name="preferredDays" value={formData.preferredDays} onChange={handleChange} placeholder="e.g. Mon-Fri" />
                            </div>
                            <div className="form-field full-width">
                                <label>CV / Resume Upload (PDF/DOC) *</label>
                                <div className="cv-upload-modern">
                                    <Upload size={24} />
                                    <span>{formData.resumeCv ? formData.resumeCv.name : 'Click to upload Resume'}</span>
                                    <input type="file" onChange={(e) => handleFileChange(e, 'resumeCv')} accept=".pdf,.doc,.docx" hidden id="resumeUpload" />
                                    <label htmlFor="resumeUpload" className="btn-browse">Browse</label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 6: // Expectations, Personal & Review
                return (
                    <div className="step-content-fade-in">
                        <h3 className="step-title">Section 10 & 11: Personal, Career & Review</h3>
                        <div className="compliance-notice-box">
                            <ShieldCheck size={20} />
                            <p>We follow Equal Employment Opportunity (EEO) policies. Personal beliefs, religion, caste, or marital status do not affect hiring decisions.</p>
                        </div>
                        <div className="form-grid" style={{ marginTop: '20px' }}>
                            <div className="form-field">
                                <label>Marital Status</label>
                                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                                    <option value="Unmarried">Unmarried</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Father's Profession (Optional)</label>
                                <input type="text" name="fatherProfession" value={formData.fatherProfession} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Preparing for Govt Job?</label>
                                <select name="govtJobPrep" value={formData.govtJobPrep} onChange={handleChange}>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Religion (Optional)</label>
                                <select name="religion" value={formData.religion} onChange={handleChange}>
                                    <option value="">Select Religion</option>
                                    {['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Any'].map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Caste (Optional / Discouraged)</label>
                                <input type="text" name="caste" value={formData.caste} onChange={handleChange} placeholder="Caste (Admin restricted)" />
                            </div>
                            <div className="form-field full-width">
                                <label>Future Company Expectations</label>
                                <textarea name="nextCompanyExpectations" value={formData.nextCompanyExpectations} onChange={handleChange} placeholder="What do you expect from your next company? (Role, salary growth, culture, learning, etc.)" />
                            </div>
                        </div>

                        <div className="final-declarations-box">
                            <h4>Final Declaration</h4>
                            <label className="checkbox-modern">
                                <input type="checkbox" name="declarationConfirmed" checked={formData.declarationConfirmed} onChange={handleChange} required />
                                <span>I confirm that all information provided is true and correct.</span>
                            </label>
                            <label className="checkbox-modern">
                                <input type="checkbox" name="dataConsent" checked={formData.dataConsent} onChange={handleChange} required />
                                <span>I consent to the use of my data for recruitment and verification purposes.</span>
                            </label>
                            <label className="checkbox-modern">
                                <input type="checkbox" name="termsAgreement" checked={formData.termsAgreement} onChange={handleChange} required />
                                <span>I agree to the portal’s Privacy Policy & Terms of Use.</span>
                            </label>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="candidate-app-page-modern">
            <div className="candidate-app-wrapper" id="candidate-form-section">
                <div className="app-stepper">
                    {steps.map((step) => (
                        <div key={step.id} className={`step-node ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
                            <div className="step-circle">
                                {currentStep > step.id ? <Check size={16} /> : step.icon}
                            </div>
                            <span className="step-label">{step.title}</span>
                            {step.id !== steps.length && <div className="step-line"></div>}
                        </div>
                    ))}
                </div>

                <div className="app-form-container">
                    <div className="form-header-modern">
                        <h2>Job Application</h2>
                        <p>Step {currentStep} of {steps.length}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-body">
                            {renderStepContent()}
                        </div>

                        <div className="form-footer-modern">
                            <button type="button" onClick={prevStep} className={`btn-back-modern ${currentStep === 1 ? 'hidden' : ''}`}>
                                <ChevronLeft size={20} /> Back
                            </button>
                            {currentStep < steps.length ? (
                                <button type="button" onClick={nextStep} className="btn-next-modern">
                                    Continue <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button type="submit" className="btn-submit-modern">
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="portal-badges">
                    <div className="badge-item"><ShieldCheck size={16} /> Aadhaar & PAN Encrypted</div>
                    <div className="badge-item"><AlertCircle size={16} /> Equal Opportunity Employer</div>
                </div>
            </div>
        </div>
    );
};

export default CandidateApplication;

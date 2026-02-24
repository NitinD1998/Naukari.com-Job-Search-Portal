import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EmployerRegister.css';

const EmployerRegister = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        // Section 1: Basic Info
        companyLegalName: '',
        companyTradeName: '',
        companyCategory: '',
        natureOfBusiness: '',

        // Section 2: Legal Details
        panNumber: '',
        gstNumber: '',
        incorporationNumber: '',
        msmeNumber: '',
        startupRecognition: '',

        // Section 3: Establishment Details
        establishmentDate: '',
        companyAge: '',
        companyStatus: '',

        // Section 4: Address
        registeredAddress: '',
        operationalAddress: '',
        city: '',
        state: '',
        country: 'India',

        // Section 5: Authorized Person
        authorizedName: '',
        designation: '',
        officialEmail: '',
        contactNumber: '',
        alternateContact: '',

        // Section 6: Workforce
        employeeStrength: '',
        hiringFrequency: '',

        // Section 7: Portal Usage
        purpose: [],
        declaration1: false,
        declaration2: false
    });

    // Auto-calculate company age when establishment date changes
    useEffect(() => {
        if (formData.establishmentDate) {
            const birthDate = new Date(formData.establishmentDate);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            let status = '';
            if (age <= 2) status = 'New Company (0–2 Years)';
            else if (age <= 5) status = 'Growing Company (2–5 Years)';
            else status = 'Established Company (5+ Years)';

            setFormData(prev => ({
                ...prev,
                companyAge: age >= 0 ? `${age} Years` : '0 Years',
                companyStatus: status
            }));
        }
    }, [formData.establishmentDate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'purpose') {
                const updatedPurpose = [...formData.purpose];
                if (checked) updatedPurpose.push(value);
                else {
                    const index = updatedPurpose.indexOf(value);
                    if (index > -1) updatedPurpose.splice(index, 1);
                }
                setFormData(prev => ({ ...prev, purpose: updatedPurpose }));
            } else {
                setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation logic can be added here
        console.log('Employer Registration Data:', formData);
        setSubmitted(true);
        // After success, redirect to home or dashboard after delay
        setTimeout(() => {
            navigate('/');
        }, 5000);
    };

    if (submitted) {
        return (
            <div className="success-overlay">
                <div className="success-icon">✓</div>
                <div className="success-message">
                    <h2>Registration Successful!</h2>
                    <p>Your company profile has been submitted for verification. <br />
                        Our relationship manager will contact you within 24-48 hours.</p>
                    <p><strong>Employer ID:</strong> EMP-{Math.floor(100000 + Math.random() * 900000)} (Auto Generated)</p>
                    <Link to="/" className="return-btn">Return to Homepage</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="employer-register-page">
            <div className="employer-register-container">
                <div className="employer-register-header">
                    <h1>Employer Registration</h1>
                    <p>Fill in the details below to register your company on our portal.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Section 1 */}
                    <div className="form-section">
                        <h3>Section 1: Company Basic Information</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Company Legal Name *</label>
                                <input type="text" name="companyLegalName" value={formData.companyLegalName} onChange={handleChange} required placeholder="As per Certificate of Incorporation" />
                            </div>
                            <div className="form-field">
                                <label>Company Trade Name (If Any)</label>
                                <input type="text" name="companyTradeName" value={formData.companyTradeName} onChange={handleChange} placeholder="Brand name used publicly" />
                            </div>
                            <div className="form-field">
                                <label>Company Category / Profile *</label>
                                <select name="companyCategory" value={formData.companyCategory} onChange={handleChange} required>
                                    <option value="">Select Category</option>
                                    <option value="IT">IT</option>
                                    <option value="BPO">BPO</option>
                                    <option value="Manufacturing">Manufacturing</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Education">Education</option>
                                    <option value="E-commerce">E-commerce</option>
                                    <option value="Startup">Startup</option>
                                    <option value="MNC">MNC</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Nature of Business *</label>
                                <select name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleChange} required>
                                    <option value="">Select Nature</option>
                                    <option value="Product-based">Product-based</option>
                                    <option value="Service-based">Service-based</option>
                                    <option value="Consultancy">Consultancy</option>
                                    <option value="Staffing">Staffing</option>
                                    <option value="Outsourcing">Outsourcing</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="form-section">
                        <h3>Section 2: Legal & Compliance Details</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>PAN Number *</label>
                                <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} required placeholder="Mandatory for verification" />
                            </div>
                            <div className="form-field">
                                <label>GST Number (If applicable)</label>
                                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="GSTIN" />
                            </div>
                            <div className="form-field">
                                <label>Incorporation Certificate Number *</label>
                                <input type="text" name="incorporationNumber" value={formData.incorporationNumber} onChange={handleChange} required placeholder="Private Ltd / LLP / Partnership etc." />
                            </div>
                            <div className="form-field">
                                <label>MSME / UDYAM Number (Optional)</label>
                                <input type="text" name="msmeNumber" value={formData.msmeNumber} onChange={handleChange} placeholder="Registration Number" />
                            </div>
                            <div className="form-field full-width">
                                <label>Startup Recognition</label>
                                <div className="radio-group">
                                    <label className="radio-option">
                                        <input type="radio" name="startupRecognition" value="Startup India Registered" checked={formData.startupRecognition === 'Startup India Registered'} onChange={handleChange} />
                                        Startup India Registered
                                    </label>
                                    <label className="radio-option">
                                        <input type="radio" name="startupRecognition" value="Non-Startup / Established Company" checked={formData.startupRecognition === 'Non-Startup / Established Company'} onChange={handleChange} />
                                        Non-Startup / Established Company
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="form-section">
                        <h3>Section 3: Company Establishment Details</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Company Establishment Date *</label>
                                <input type="date" name="establishmentDate" value={formData.establishmentDate} onChange={handleChange} required />
                            </div>
                            <div className="form-field">
                                <label>Company Age (Auto-calculated)</label>
                                <input type="text" name="companyAge" value={formData.companyAge} readOnly placeholder="0 Years" />
                                <span className="auto-calc-info">Based on establishment date</span>
                            </div>
                            <div className="form-field full-width">
                                <label>Company Status (Based on Age)</label>
                                <input type="text" name="companyStatus" value={formData.companyStatus} readOnly placeholder="Status will appear here" />
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="form-section">
                        <h3>Section 4: Company Address Details</h3>
                        <div className="form-grid">
                            <div className="form-field full-width">
                                <label>Registered Office Address *</label>
                                <textarea name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} required placeholder="Full Address with PIN Code"></textarea>
                            </div>
                            <div className="form-field full-width">
                                <label>Operational / Branch Address (If different)</label>
                                <textarea name="operationalAddress" value={formData.operationalAddress} onChange={handleChange} placeholder="Full Address with PIN Code"></textarea>
                            </div>
                            <div className="form-field">
                                <label>City / State / Country *</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="City" style={{ flex: 1 }} />
                                    <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="State" style={{ flex: 1 }} />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>&nbsp;</label>
                                <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="Country" />
                            </div>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="form-section">
                        <h3>Section 5: Authorized Person Details</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Authorized Person Name *</label>
                                <input type="text" name="authorizedName" value={formData.authorizedName} onChange={handleChange} required placeholder="Owner / Director / HR Head" />
                            </div>
                            <div className="form-field">
                                <label>Designation *</label>
                                <input type="text" name="designation" value={formData.designation} onChange={handleChange} required placeholder="e.g. HR Manager" />
                            </div>
                            <div className="form-field">
                                <label>Official Email ID *</label>
                                <input type="email" name="officialEmail" value={formData.officialEmail} onChange={handleChange} required placeholder="Company domain preferred" />
                            </div>
                            <div className="form-field">
                                <label>Contact Number *</label>
                                <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required placeholder="Mobile / Landline" />
                            </div>
                            <div className="form-field full-width">
                                <label>Alternate Contact Number (Optional)</label>
                                <input type="tel" name="alternateContact" value={formData.alternateContact} onChange={handleChange} placeholder="Secondary Number" />
                            </div>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="form-section">
                        <h3>Section 6: Company Workforce Details</h3>
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Total Employee Strength *</label>
                                <select name="employeeStrength" value={formData.employeeStrength} onChange={handleChange} required>
                                    <option value="">Select Range</option>
                                    <option value="1–10">1–10</option>
                                    <option value="11–50">11–50</option>
                                    <option value="51–200">51–200</option>
                                    <option value="201–500">201–500</option>
                                    <option value="500+">500+</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label>Hiring Frequency *</label>
                                <select name="hiringFrequency" value={formData.hiringFrequency} onChange={handleChange} required>
                                    <option value="">Select Frequency</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Occasional">Occasional</option>
                                    <option value="Bulk Hiring">Bulk Hiring</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 7 */}
                    <div className="form-section">
                        <h3>Section 7: Portal Usage & Declaration</h3>
                        <div className="form-field full-width">
                            <label>Purpose of Registration *</label>
                            <div className="checkbox-group">
                                <label className="checkbox-option">
                                    <input type="checkbox" name="purpose" value="Hiring / Recruitment" checked={formData.purpose.includes('Hiring / Recruitment')} onChange={handleChange} />
                                    Hiring / Recruitment
                                </label>
                                <label className="checkbox-option">
                                    <input type="checkbox" name="purpose" value="HRMS / Payroll" checked={formData.purpose.includes('HRMS / Payroll')} onChange={handleChange} />
                                    HRMS / Payroll
                                </label>
                                <label className="checkbox-option">
                                    <input type="checkbox" name="purpose" value="Staffing / Outsourcing" checked={formData.purpose.includes('Staffing / Outsourcing')} onChange={handleChange} />
                                    Staffing / Outsourcing
                                </label>
                                <label className="checkbox-option">
                                    <input type="checkbox" name="purpose" value="Complete HR Solution" checked={formData.purpose.includes('Complete HR Solution')} onChange={handleChange} />
                                    Complete HR Solution
                                </label>
                            </div>
                        </div>
                        <div className="declaration-box">
                            <label className="declaration-item">
                                <input type="checkbox" name="declaration1" checked={formData.declaration1} onChange={handleChange} required />
                                I confirm that all provided details are true and accurate.
                            </label>
                            <label className="declaration-item">
                                <input type="checkbox" name="declaration2" checked={formData.declaration2} onChange={handleChange} required />
                                I agree to the portal’s Terms & Conditions and Privacy Policy.
                            </label>
                        </div>
                    </div>

                    {/* Section 8 */}
                    <div className="form-section">
                        <h3>Section 8: Upload Documents</h3>
                        <div className="file-upload-container">
                            {[
                                { id: 'pan', label: 'PAN Card *' },
                                { id: 'gst', label: 'GST Certificate' },
                                { id: 'inc', label: 'Incorporation Certificate *' },
                                { id: 'msme', label: 'MSME Certificate' },
                                { id: 'logo', label: 'Company Logo *' },
                                { id: 'auth', label: 'Authorization Letter' }
                            ].map(file => (
                                <div key={file.id} className="file-upload-box">
                                    <label className="file-upload-label">
                                        <i>📁</i>
                                        <span>{file.label}</span>
                                        <input type="file" />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Register Company</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployerRegister;

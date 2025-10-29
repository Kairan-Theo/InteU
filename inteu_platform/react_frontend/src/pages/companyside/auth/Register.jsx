import React, { useState, useEffect } from "react";
import "../../../css/styles.css";

const Register = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    companyDescription: "",
    businessEmail: "",
    phoneNumber: "",
    website: "",
    linkedin: "",
    address: "",
    managerName: "",
    managerTitle: "",
    password: "",
    confirmPassword: "",
    referralSource: "",
    expectedInterns: "",
    internshipAreas: [],
    agreeTerms: false,
    agreeMarketing: false,
  });

  const [requirements, setRequirements] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
  });

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Toast helper ---
  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Handle input change ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "internshipAreas") {
      setFormData((prev) => {
        const updatedAreas = checked
          ? [...prev.internshipAreas, value]
          : prev.internshipAreas.filter((area) => area !== value);
        return { ...prev, internshipAreas: updatedAreas };
      });
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- Validate password strength ---
  useEffect(() => {
    const pwd = formData.password;
    setRequirements({
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
    });
  }, [formData.password]);

  // --- Form submit ---
  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "companyName",
      "industry",
      "companySize",
      "companyDescription",
      "businessEmail",
      "phoneNumber",
      "address",
      "managerName",
      "password",
      "confirmPassword",
    ];

    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        showToast(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field`, "error");
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    if (!formData.agreeTerms) {
      showToast("Please agree to the terms and conditions", "error");
      return;
    }

    // Simulate registration process
    showToast("Creating your company account...", "info");
    setLoading(true);

    setTimeout(() => {
      showToast("Company account created successfully! Welcome to InteU!", "success");
      setTimeout(() => {
        window.location.href = "../dashboard.html";
      }, 2000);
    }, 2000);
  };

  return (
    <div data-page="company-register">
      <a href="../index.html" className="back-link">
        ← Back to Company Portal
      </a>

      <main className="container">
        <div className="registration-container">
          <div className="registration-header">
            <div className="company-icon">🏢</div>
            <h1 className="registration-title">Join InteU as a Company</h1>
            <p className="registration-subtitle">
              Connect with talented students and find the perfect interns for your organization. Start posting internship opportunities today.
            </p>
          </div>

          {/* Benefits */}
          <div className="benefits-grid">
            {[
              { icon: "🎯", title: "Targeted Reach", desc: "Connect with qualified students from top universities across Thailand" },
              { icon: "⚡", title: "Easy Management", desc: "Streamlined application process and comprehensive candidate management tools" },
              { icon: "✅", title: "Verified Platform", desc: "Trusted by students and companies with verified profiles and secure communication" },
            ].map((b, i) => (
              <div className="benefit-card" key={i}>
                <span className="benefit-icon">{b.icon}</span>
                <h4 className="benefit-title">{b.title}</h4>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {/* Company Info */}
              <div className="form-section">
                <h3>Company Information</h3>
                <label>
                  <span>Company Name *</span>
                  <input name="companyName" value={formData.companyName} onChange={handleChange} required />
                </label>

                <label>
                  <span>Industry *</span>
                  <select name="industry" value={formData.industry} onChange={handleChange} required>
                    <option value="">Select Industry</option>
                    {["technology", "finance", "healthcare", "education", "retail", "manufacturing", "consulting", "media", "nonprofit", "other"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Company Size *</span>
                  <select name="companySize" value={formData.companySize} onChange={handleChange} required>
                    <option value="">Select Size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </label>

                <label>
                  <span>Founded Year</span>
                  <input type="number" name="foundedYear" value={formData.foundedYear} onChange={handleChange} placeholder="e.g., 2015" />
                </label>

                <label>
                  <span>Company Description *</span>
                  <textarea name="companyDescription" rows="4" value={formData.companyDescription} onChange={handleChange} required />
                </label>
              </div>

              {/* Contact Info */}
              <div className="form-section">
                <h3>Contact Information</h3>
                <label>
                  <span>Business Email *</span>
                  <input type="email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} required />
                </label>

                <label>
                  <span>Phone Number *</span>
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </label>

                <label>
                  <span>Website</span>
                  <input type="url" name="website" value={formData.website} onChange={handleChange} />
                </label>

                <label>
                  <span>LinkedIn Company Page</span>
                  <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                </label>

                <label>
                  <span>Address *</span>
                  <textarea name="address" rows="3" value={formData.address} onChange={handleChange} required />
                </label>
              </div>

              {/* Account Security */}
              <div className="form-section">
                <h3>Account Security</h3>
                <label>
                  <span>Account Manager Name *</span>
                  <input name="managerName" value={formData.managerName} onChange={handleChange} required />
                </label>

                <label>
                  <span>Manager Title</span>
                  <input name="managerTitle" value={formData.managerTitle} onChange={handleChange} />
                </label>

                <label>
                  <span>Password *</span>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>

                <label>
                  <span>Confirm Password *</span>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </label>

                <div className="password-requirements">
                  {Object.entries(requirements).map(([key, valid]) => (
                    <div key={key} className={`requirement ${valid ? "valid" : "invalid"}`}>
                      <span>{valid ? "✓" : "✗"}</span>{" "}
                      {key === "length"
                        ? "At least 8 characters"
                        : key === "upper"
                        ? "One uppercase letter"
                        : key === "lower"
                        ? "One lowercase letter"
                        : "One number"}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="form-section">
                <h3>Additional Information</h3>
                <label>
                  <span>How did you hear about InteU?</span>
                  <select name="referralSource" value={formData.referralSource} onChange={handleChange}>
                    <option value="">Select source</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral from another company</option>
                    <option value="university">University partnership</option>
                    <option value="event">Event or conference</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label>
                  <span>Expected number of interns per year</span>
                  <select name="expectedInterns" value={formData.expectedInterns} onChange={handleChange}>
                    <option value="">Select range</option>
                    <option value="1-5">1-5 interns</option>
                    <option value="6-15">6-15 interns</option>
                    <option value="16-30">16-30 interns</option>
                    <option value="31-50">31-50 interns</option>
                    <option value="50+">50+ interns</option>
                  </select>
                </label>

                <label>
                  <span>Primary internship areas (select multiple)</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
                    {["technology", "marketing", "finance", "design", "operations", "research"].map((area) => (
                      <label key={area} className="checkbox">
                        <input
                          type="checkbox"
                          name="internshipAreas"
                          value={area}
                          checked={formData.internshipAreas.includes(area)}
                          onChange={handleChange}
                        />
                        <span>{area.charAt(0).toUpperCase() + area.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </label>
              </div>
            </div>

            {/* Terms */}
            <div className="form-section full-width">
              <label className="checkbox">
                <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
                <span>
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a> *
                </span>
              </label>

              <label className="checkbox">
                <input type="checkbox" name="agreeMarketing" checked={formData.agreeMarketing} onChange={handleChange} />
                <span>I would like to receive updates about new features and internship best practices</span>
              </label>

              <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "24px" }}>
                <button type="button" className="btn secondary" onClick={() => (window.location.href = "login.html")}>
                  Back to Login
                </button>
                <button type="submit" className="btn primary" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Company Account"}
                </button>
              </div>
            </div>
          </form>

          {/* Already have account */}
          <div
            style={{
              textAlign: "center",
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <p className="muted">Already have a company account?</p>
            <a href="login.html" className="btn secondary">
              Login to Your Account
            </a>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div
          className={`toast ${toast.type}`}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background:
              toast.type === "success"
                ? "#4caf50"
                : toast.type === "error"
                ? "#f44336"
                : "#2196f3",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Register;

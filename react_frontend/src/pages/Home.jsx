import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "/public/css/styles.css"; // existing CSS

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showPDPA, setShowPDPA] = useState(false);

  // Demo internship data
  const recommendedInternships = [
    { title: "UX Designer Intern", company: "TechCorp", location: "Bangkok" },
    { title: "Marketing Intern", company: "CreativeAds", location: "Chiang Mai" },
  ];

  const internshipListings = [
    {
      title: "Data Analyst Intern",
      company: "DataWorks",
      location: "Phuket",
      duration: "3 months",
      industry: "Technology",
      language: "English",
    },
    {
      title: "Graphic Design Intern",
      company: "DesignLab",
      location: "Bangkok",
      duration: "6 months",
      industry: "Design",
      language: "Thai",
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero" role="banner">
        <div className="container">
          <h1 className="hero-title">
            Find Verified Internships That Match Your Future.
          </h1>
          <p className="hero-sub">
            Trusted opportunities from verified companies in Thailand.
          </p>

          {/* Search Bar */}
          <div className="search-bar" role="search" aria-label="Search internships">
            <input type="text" placeholder="Keyword (e.g., UX, Data)" aria-label="Keyword" />
            <select aria-label="Location">
              <option value="">All Locations</option>
              <option value="Bangkok">Bangkok</option>
              <option value="Chiang Mai">Chiang Mai</option>
              <option value="Phuket">Phuket</option>
            </select>
            <select aria-label="Industry">
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
            </select>
            <select aria-label="Language">
              <option value="">Any Language</option>
              <option value="English">English</option>
              <option value="Thai">Thai</option>
            </select>
            <select aria-label="Nationality Requirement">
              <option value="">Any Nationality</option>
              <option value="Thai">Thai</option>
              <option value="International">International</option>
            </select>
            <label className="checkbox">
              <input type="checkbox" defaultChecked /> <span>Verified only</span>
            </label>
            <button className="btn primary">
              <i className="fa fa-search"></i> Search
            </button>
          </div>

          <div className="recent-searches" aria-live="polite">
            <h3>Recent searches</h3>
            <div id="recentSearches" className="chips">
              <span className="chip">UX</span>
              <span className="chip">Marketing</span>
              <span className="chip">Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        <section aria-labelledby="recommendedTitle">
          <h2 id="recommendedTitle">Recommended Internships</h2>
          <div className="cards-grid">
            {recommendedInternships.map((item, index) => (
              <div className="card" key={index}>
                <h4>{item.title}</h4>
                <p>{item.company}</p>
                <p>{item.location}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="resultsTitle">
          <div className="section-header">
            <h2 id="resultsTitle">Internship Listings</h2>
            <span className="muted">{internshipListings.length} results</span>
          </div>
          <div className="cards-grid">
            {internshipListings.map((item, index) => (
              <div className="card" key={index}>
                <h4>{item.title}</h4>
                <p>{item.company}</p>
                <p>{item.location}</p>
                <p>Duration: {item.duration}</p>
                <p>Industry: {item.industry}</p>
                <p>Language: {item.language}</p>
                <button className="btn primary" onClick={() => alert(`Apply for ${item.title}`)}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* ======= MODALS WITH DEMO CONTENT ======= */}

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Login</h3>
            <p>Welcome back! Sign in to access your account.</p>
            <label>
              <span>Email</span>
              <input type="email" defaultValue="demo@user.com" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" defaultValue="123456" />
            </label>
            <div className="modal-actions">
              <button className="btn primary">Login</button>
              <button className="btn" onClick={() => setShowRegister(true)}>
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal-overlay" onClick={() => setShowRegister(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Register</h3>
            <label>
              <span>Full Name</span>
              <input type="text" defaultValue="Demo User" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" defaultValue="demo@user.com" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" defaultValue="123456" />
            </label>
            <div className="modal-actions">
              <button className="btn primary">Create Account</button>
              <button className="btn" onClick={() => setShowLogin(true)}>
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Contact Us</h3>
            <label>
              <span>Name</span>
              <input type="text" defaultValue="Demo User" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" defaultValue="demo@user.com" />
            </label>
            <label>
              <span>Message</span>
              <textarea rows="4">I have a question about internships.</textarea>
            </label>
            <div className="modal-actions">
              <button className="btn primary">Send</button>
              <button className="btn" onClick={() => setShowContact(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="modal-overlay" onClick={() => setShowFAQ(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>FAQ</h3>
            <div>
              <h5>How do I apply for an internship?</h5>
              <p>Click "Apply Now" on a listing and submit your application.</p>
              <h5>Are these internships paid?</h5>
              <p>Depends on the company, usually 1-3 months stipend.</p>
            </div>
            <button className="btn primary" onClick={() => setShowFAQ(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="modal-overlay" onClick={() => setShowPrivacy(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Privacy Policy</h3>
            <p>We collect and process your data responsibly according to PDPA standards.</p>
            <button className="btn primary" onClick={() => setShowPrivacy(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* PDPA Modal */}
      {showPDPA && (
        <div className="modal-overlay" onClick={() => setShowPDPA(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>PDPA Notice</h3>
            <p>Your data is protected under Thailand's Personal Data Protection Act.</p>
            <button className="btn primary" onClick={() => setShowPDPA(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Optional: later you can import separate modal components
// import CompanyModal from "../components/Modal/CompanyModal";

const Companies = () => {
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <>
      <Header />

      {/* Sub-Hero Section */}
      <section className="sub-hero">
        <div className="container">
          <h1>Search Companies</h1>

          <div className="search-bar">
            <input
              id="companyKeyword"
              type="text"
              placeholder="Search company name or industry"
              aria-label="Search Companies"
            />
            <button id="companySearchBtn" className="btn primary">
              <i className="fa fa-search"></i> Search
            </button>
          </div>

          <div className="recent-searches">
            <h3>Recent searches</h3>
            <div id="companyRecentSearches" className="chips"></div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="container">
        <section aria-labelledby="companiesListTitle">
          <div className="section-header">
            <h2 id="companiesListTitle">Companies</h2>
            <span id="companiesCount" className="muted">
              0 results
            </span>
          </div>
          <div id="companyList" className="cards-grid"></div>
        </section>
      </main>

      {/* Company Modal */}
      {showCompanyModal && (
        <dialog open className="modal">
          <div className="modal-content">
            <header className="modal-header">
              <h3 id="companyModalTitle">Company</h3>
              <button
                className="icon-btn"
                onClick={() => setShowCompanyModal(false)}
                aria-label="Close"
              >
                <i className="fa fa-times"></i>
              </button>
            </header>
            <div id="companyModalBody"></div>
          </div>
        </dialog>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Apply for Internship</h3>
              <button
                className="icon-btn"
                onClick={() => setShowApplyModal(false)}
                aria-label="Close"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="job-header">
                <h4>Job Title</h4>
                <p>Company Name</p>
                <div className="application-status">
                  <span className="status-badge verified">✓ Verified Company</span>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn"
                  onClick={() => setShowApplyModal(false)}
                >
                  Cancel
                </button>
                <button
                  id="applyConfirmBtn"
                  className="btn primary"
                  onClick={() => setShowSubmissionModal(true)}
                >
                  Confirm Application
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {/* Submission Form Modal */}
      {showSubmissionModal && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Application Form</h3>
              <button
                className="icon-btn"
                onClick={() => setShowSubmissionModal(false)}
                aria-label="Close"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <form id="submissionForm">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input type="text" id="fullName" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="coverLetter">Cover Letter *</label>
                  <textarea
                    id="coverLetter"
                    rows="4"
                    required
                    placeholder="Tell us why you're interested..."
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="modal-actions">
              <button
                className="btn"
                onClick={() => setShowSubmissionModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  setShowSubmissionModal(false);
                  setShowConfirmationModal(true);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="confirmation-content">
              <div className="success-icon">✓</div>
              <h3>Application Submitted!</h3>
              <p>Your application has been successfully submitted.</p>
              <button
                className="btn primary"
                onClick={() => setShowConfirmationModal(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </dialog>
      )}

      <Footer />
    </>
  );
};

export default Companies;

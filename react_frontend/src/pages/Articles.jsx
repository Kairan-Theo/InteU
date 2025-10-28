import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Articles = () => {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showPDPA, setShowPDPA] = useState(false);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="sub-hero">
        <div className="container">
          <h1>Articles & Short Courses</h1>
          <div className="search-bar">
            <input
              id="articleKeyword"
              type="text"
              placeholder="Search articles or courses"
              aria-label="Search Articles"
            />
            <button id="articleSearchBtn" className="btn primary">
              <i className="fa fa-search"></i> Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container">
        <section aria-labelledby="articlesListTitle">
          <div className="section-header">
            <h2 id="articlesListTitle">Learn & Grow</h2>
            <span id="articlesCount" className="muted">
              0 items
            </span>
          </div>
          <div id="articlesList" className="cards-grid">
            {/* You’ll later map dynamic articles here */}
            <div className="card" onClick={() => setShowCourseModal(true)}>
              <img src="/images/image1.jpg" alt="Course thumbnail" />
              <h3>Intro to Web Design</h3>
              <p>Learn the basics of HTML, CSS, and UX fundamentals.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer
        onContact={() => setShowContact(true)}
        onFAQ={() => setShowFAQ(true)}
        onPrivacy={() => setShowPrivacy(true)}
        onPDPA={() => setShowPDPA(true)}
      />

      {/* ===================== Modals ===================== */}

      {/* Course Details Modal */}
      {showCourseModal && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Course Details</h3>
              <button
                className="modal-close"
                onClick={() => setShowCourseModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Category:</strong> Design</p>
              <p><strong>Duration:</strong> 2 weeks</p>
              <p>
                Learn practical design skills and UX concepts with real-world
                projects.
              </p>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={() => setShowCourseModal(false)}>
                Cancel
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  setShowCourseModal(false);
                  setShowEnrollModal(true);
                }}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Enrollment Form Modal */}
      {showEnrollModal && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Course Enrollment</h3>
              <button
                className="modal-close"
                onClick={() => setShowEnrollModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" />
                </div>
                <div className="form-group">
                  <label>Why are you interested in this course?</label>
                  <textarea rows="3" placeholder="Tell us about your goals..." />
                </div>
              </form>
            </div>
            <div className="modal-actions">
              <button
                className="btn"
                onClick={() => setShowEnrollModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  setShowEnrollModal(false);
                  setShowConfirmModal(true);
                }}
              >
                Submit Enrollment
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Enrollment Confirmation Modal */}
      {showConfirmModal && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Enrollment Successful!</h3>
            </div>
            <div className="modal-body">
              <div className="success-icon">🎓</div>
              <p>
                You have successfully enrolled in the course. Check your email
                for further instructions.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn primary"
                onClick={() => setShowConfirmModal(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Footer Modals (Contact / FAQ / Privacy / PDPA) */}
      {showContact && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Contact Us</h2>
              <button className="modal-close" onClick={() => setShowContact(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="4" required />
                </div>
              </form>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={() => setShowContact(false)}>
                Cancel
              </button>
              <button className="btn primary">Send Message</button>
            </div>
          </div>
        </dialog>
      )}

      {showFAQ && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Frequently Asked Questions</h2>
              <button className="modal-close" onClick={() => setShowFAQ(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <h3>How do I apply for an internship?</h3>
              <p>Go to the Companies page and click “Apply Now”.</p>
              <h3>Are these internships paid?</h3>
              <p>Compensation varies per company — details in each listing.</p>
            </div>
            <div className="modal-actions">
              <button className="btn primary" onClick={() => setShowFAQ(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {showPrivacy && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Privacy Policy</h2>
              <button
                className="modal-close"
                onClick={() => setShowPrivacy(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                We collect and process your data to provide internship and course
                services. Your information is never sold to third parties.
              </p>
            </div>
            <div className="modal-actions">
              <button className="btn primary" onClick={() => setShowPrivacy(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {showPDPA && (
        <dialog open className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>PDPA Notice</h2>
              <button
                className="modal-close"
                onClick={() => setShowPDPA(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                We comply with Thailand’s Personal Data Protection Act (PDPA) to
                safeguard your personal data.
              </p>
            </div>
            <div className="modal-actions">
              <button className="btn primary" onClick={() => setShowPDPA(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Articles;

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Sections = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [showAppModal, setShowAppModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  return (
    <>
      <Header />

      {/* Sub Hero */}
      <section className="sub-hero">
        <div className="container">
          <h1>Dashboard</h1>
          <p>Manage applications and course enrollments</p>
        </div>
      </section>

      <main className="container">
        {/* Dashboard Stats */}
        <section className="dashboard-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>0</h3>
                <p>Total Applications</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <div className="stat-content">
                <h3>0</h3>
                <p>Course Enrollments</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3>0</h3>
                <p>Pending Applications</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>0</h3>
                <p>Active Enrollments</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="admin-tabs">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${activeTab === "applications" ? "active" : ""}`}
              onClick={() => setActiveTab("applications")}
            >
              My Applications
            </button>
            <button
              className={`tab-btn ${activeTab === "enrollments" ? "active" : ""}`}
              onClick={() => setActiveTab("enrollments")}
            >
              My Enrollments
            </button>
          </div>
        </section>

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <section className="tab-content active">
            <div className="section-header">
              <h2>My Internship Applications</h2>
              <div className="filters">
                <select>
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <input type="text" placeholder="Search my applications..." />
              </div>
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Row */}
                  <tr>
                    <td>Intern Developer</td>
                    <td>ABC Tech</td>
                    <td>2025-10-10</td>
                    <td>Pending</td>
                    <td>
                      <button
                        className="btn small"
                        onClick={() => setShowAppModal(true)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Enrollments Tab */}
        {activeTab === "enrollments" && (
          <section className="tab-content active">
            <div className="section-header">
              <h2>My Course Enrollments</h2>
              <div className="filters">
                <select>
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="dropped">Dropped</option>
                </select>
                <input type="text" placeholder="Search my enrollments..." />
              </div>
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Category</th>
                    <th>Enrolled Date</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Row */}
                  <tr>
                    <td>UI/UX Design</td>
                    <td>Design</td>
                    <td>2025-10-10</td>
                    <td>60%</td>
                    <td>Active</td>
                    <td>
                      <button
                        className="btn small"
                        onClick={() => setShowEnrollModal(true)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Application Modal */}
        {showAppModal && (
          <dialog open className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Application Details</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowAppModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Company:</strong> ABC Tech</p>
                <p><strong>Status:</strong> Pending</p>
              </div>
              <div className="modal-actions">
                <button className="btn" onClick={() => setShowAppModal(false)}>
                  Close
                </button>
                <button className="btn primary">Update Status</button>
              </div>
            </div>
          </dialog>
        )}

        {/* Enrollment Modal */}
        {showEnrollModal && (
          <dialog open className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Enrollment Details</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowEnrollModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Student:</strong> Jane Smith</p>
                <p><strong>Course:</strong> UI/UX Design</p>
                <p><strong>Status:</strong> Active</p>
              </div>
              <div className="modal-actions">
                <button className="btn" onClick={() => setShowEnrollModal(false)}>
                  Close
                </button>
                <button className="btn primary">Update Status</button>
              </div>
            </div>
          </dialog>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Sections;

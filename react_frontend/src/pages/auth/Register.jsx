import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Link } from "react-router-dom";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register form submitted");
  };

  return (
    <div data-page="register">
      <Header />
      <main className="container narrow">
        <section className="card">
          <h1 className="card-title">Register</h1>
          <form id="registerPageForm" onSubmit={handleSubmit} noValidate>
            <label>
              <span>Role</span>
              <select id="registerPageRole" required>
                <option value="student">Student</option>
                <option value="employer">Employer</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <label>
              <span>Full Name</span>
              <input type="text" id="registerPageName" required />
            </label>

            <label>
              <span>Email</span>
              <input type="email" id="registerPageEmail" required />
            </label>

            <label>
              <span>Password</span>
              <input type="password" id="registerPagePassword" required />
            </label>

            <div className="row">
              <label className="half">
                <span>Resume (simulated)</span>
                <input type="file" id="registerPageResume" accept=".pdf,.doc,.docx" />
              </label>
              <label className="half">
                <span>Transcript (simulated)</span>
                <input type="file" id="registerPageTranscript" accept=".pdf,.doc,.docx" />
              </label>
            </div>

            <div className="row space-between">
              <button type="submit" className="btn primary">Create Account</button>
              <span className="muted"><Link to="/login">Login</Link></span>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

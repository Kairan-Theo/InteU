import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Link } from "react-router-dom";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  return (
    <div data-page="login">
      <Header />
      <main className="container narrow">
        <section className="card">
          <h1 className="card-title">Login</h1>
          <form id="loginPageForm" onSubmit={handleSubmit} noValidate>
            <label>
              <span>Email</span>
              <input type="email" id="loginPageEmail" required />
            </label>
            <label>
              <span>Password</span>
              <input type="password" id="loginPagePassword" required />
            </label>
            <div className="row space-between">
              <button type="submit" className="btn primary">Login</button>
              <a href="#" className="btn link">Forgot Password?</a>
            </div>
            <p className="muted">
              No account? <Link to="/register">Register</Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import React, { useState } from "react";
import "../../../css/styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // --- Toast helper ---
  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Autofill demo credentials ---
  const fillDemoCredentials = () => {
    setEmail("demo@company.com");
    setPassword("CompanyDemo123");
  };

  // --- Handle login submit ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (email === "demo@company.com" && password === "CompanyDemo123") {
        showToast("Login successful! Redirecting to dashboard...", "success");
        setTimeout(() => {
          window.location.href = "../dashboard.html";
        }, 1500);
      } else if (email.includes("@") && password.length >= 6) {
        showToast("Login successful! Welcome to InteU Companies!", "success");
        setTimeout(() => {
          window.location.href = "../dashboard.html";
        }, 1500);
      } else {
        showToast("Invalid email or password. Please try again.", "error");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="login-container" data-page="company-login">
      <a href="../" className="back-link">
        ← Back to Company Portal
      </a>

      <div className="login-card">
        <div className="company-logo">🏢</div>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Sign in to your company account to manage internships and connect with talented students.
        </p>

        {/* Demo Notice */}
        <div className="demo-notice" onClick={fillDemoCredentials}>
          <h4>🚀 Demo Account Available</h4>
          <p>
            <strong>Email:</strong> demo@company.com
          </p>
          <p>
            <strong>Password:</strong> CompanyDemo123
          </p>
          <p>Click to autofill demo credentials</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Company Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your-company@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            <a href="#" style={{ color: "var(--primary)", textDecoration: "none" }}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="divider">
          <span>New to InteU?</span>
        </div>

        <div className="register-link">
          Don't have a company account?{" "}
          <a href="register.html">Create one now</a>
        </div>

        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid #e1e5e9",
          }}
        >
          <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}>
            Looking for the student portal?{" "}
            <a href="../../index.html" style={{ color: "var(--primary)" }}>
              Go to Student Login
            </a>
          </p>
        </div>
      </div>

      {/* Toast Notification */}
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

export default Login;

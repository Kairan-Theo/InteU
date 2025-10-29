import React from "react";
import "../../css/styles.css";


const Footer = () => {
  return (
    <footer className="site-footer" style={{ background: "#2d3436", color: "white" }}>
      <div className="container footer-grid">
        <div>
          <h4>Company Portal</h4>
          <ul>
            <li><a href="/company/register" style={{ color: "#ddd" }}>Get Started</a></li>
            <li><a href="/company/login" style={{ color: "#ddd" }}>Login</a></li>
            <li><a href="#pricing" style={{ color: "#ddd" }}>Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#" style={{ color: "#ddd" }}>Help Center</a></li>
            <li><a href="#" style={{ color: "#ddd" }}>Contact Support</a></li>
            <li><a href="#" style={{ color: "#ddd" }}>API Documentation</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#" style={{ color: "#ddd" }}>Terms of Service</a></li>
            <li><a href="#" style={{ color: "#ddd" }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: "#ddd" }}>GDPR Compliance</a></li>
          </ul>
        </div>
        <div>
          <h4>InteU Companies</h4>
          <p style={{ color: "#ddd", margin: 0 }}>
            Connecting great companies with exceptional student talent.
          </p>
          <div style={{ marginTop: "16px" }}>
            <a href="/" style={{ color: "#74b9ff" }}>← Back to Student Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import "../../css/styles.css";

const Header = () => {
  return (
    <header className="site-header" aria-label="Company Portal Navigation">
      <div className="container header-inner">
        <a className="logo" href="/company">
          <span className="logo-mark">🏢</span>
          InteU <span style={{ color: "var(--primary)", fontWeight: 600 }}>Companies</span>
        </a>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#support">Support</a>
          <a href="/">Student Portal</a>
        </nav>
        <div className="actions">
          <input type="checkbox" id="dark-mode" aria-label="Toggle theme" hidden />
          <label htmlFor="dark-mode" className="theme-switch" aria-label="Toggle theme"></label>
          <a href="/company/login" className="btn small">Login</a>
          <a href="/company/register" className="btn small primary">Get Started</a>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header" aria-label="Main Navigation">
      <div className="container header-inner">
        <Link className="logo" to="/">
          <span className="logo-mark">
            <img src="/images/image1.jpg" alt="Logo" />
          </span>{" "}
          InteU
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/sections">Sections</Link>
        </nav>

        <div className="actions">
          <input type="checkbox" id="dark-mode" aria-label="Toggle theme" hidden />
          <label htmlFor="dark-mode" className="theme-switch" aria-label="Toggle theme"></label>
          <button id="toggleLang" className="btn small" aria-label="Toggle language">
            ไทย / EN
          </button>
          <Link to="/login" className="btn small primary">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

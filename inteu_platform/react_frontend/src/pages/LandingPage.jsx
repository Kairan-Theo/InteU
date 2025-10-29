import React, { useEffect } from "react";
import "../../src/css/styles.css";
import Header from "../components/companyside/Header";
import Footer from "../components/companyside/Footer";

const LandingPage = () => {
    useEffect(() => {
        const handleSmoothScroll = (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        };
        document.addEventListener("click", handleSmoothScroll);

        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            }
        });
        }, observerOptions);

        document.querySelectorAll(".feature-card, .stat-card").forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(card);
        });

        return () => {
        document.removeEventListener("click", handleSmoothScroll);
        observer.disconnect();
        };
    }, []);

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section className="company-hero">
                    <div className="container">
                        <h1>Find Your Next Great Intern</h1>
                        <p>
                        Connect with talented students from top universities across Thailand.
                        Post internships, manage applications, and build your future team.
                        </p>
                        <div className="hero-actions">
                        <a href="/company/register" className="btn large primary" style={{ background: "white", color: "var(--primary)" }}>
                            Start Hiring Today
                        </a>
                        <a href="/company/login" className="btn large secondary" style={{ borderColor: "white", color: "white" }}>
                            Company Login
                        </a>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section" id="features">
                <div className="container" style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>
                    Everything You Need to Hire Great Interns
                    </h2>
                    <p
                    style={{
                        fontSize: "18px",
                        color: "var(--muted)",
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                    >
                    Streamline your internship program with our comprehensive platform designed specifically for companies.
                    </p>

                    <div className="features-grid">
                    {[
                        { icon: "📝", title: "Easy Job Posting", desc: "Create detailed internship listings..." },
                        { icon: "👥", title: "Applicant Management", desc: "Review applications, filter candidates..." },
                        { icon: "💬", title: "Direct Communication", desc: "Message candidates directly through our platform..." },
                        { icon: "📊", title: "Analytics Dashboard", desc: "Track your posting performance and metrics..." },
                        { icon: "🎯", title: "Targeted Reach", desc: "Your postings reach qualified students..." },
                        { icon: "🔒", title: "Secure Platform", desc: "Enterprise-grade security protects your data..." },
                    ].map((feature, index) => (
                        <div key={index} className="feature-card">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-desc">{feature.desc}</p>
                        </div>
                    ))}
                    </div>
                </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section">
                <div className="container" style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: "36px", marginBottom: "16px" }}>Trusted by Leading Companies</h2>
                    <p style={{ fontSize: "18px", color: "var(--muted)" }}>
                    Join hundreds of companies already using InteU to find exceptional interns
                    </p>

                    <div className="stats-grid">
                    {[
                        { number: "500+", label: "Active Companies" },
                        { number: "10K+", label: "Student Applications" },
                        { number: "2K+", label: "Successful Placements" },
                        { number: "95%", label: "Satisfaction Rate" },
                    ].map((stat, i) => (
                        <div key={i} className="stat-card">
                        <div className="stat-number">{stat.number}</div>
                        <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                    </div>
                </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                <div className="container">
                    <h2>Ready to Find Your Next Intern?</h2>
                    <p>
                    Join InteU today and start connecting with talented students from top universities across Thailand.
                    </p>
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                    <a href="/company/register" className="btn large primary" style={{ background: "white", color: "var(--text)" }}>
                        Create Company Account
                    </a>
                    <a href="/company/login" className="btn large secondary" style={{ borderColor: "white", color: "white" }}>
                        Login to Existing Account
                    </a>
                    </div>
                </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default LandingPage;

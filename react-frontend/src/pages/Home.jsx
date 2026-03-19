import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"

export default function Home() {
  const navigate = useNavigate()
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue-900: #0f2057;
          --blue-800: #1a3a8f;
          --blue-600: #1d4ed8;
          --blue-400: #60a5fa;
          --blue-100: #dbeafe;
          --gold: #f59e0b;
          --white: #ffffff;
          --off-white: #f8faff;
          --text-dark: #0f172a;
          --text-muted: #64748b;
        }

        .lp-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--off-white);
          color: var(--text-dark);
          overflow-x: hidden;
        }

        /* ── NAVBAR ── */
        .lp-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 48px;
          background: rgba(15, 32, 87, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .lp-nav-brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          color: var(--white);
          letter-spacing: -0.5px;
        }
        .lp-nav-brand span { color: var(--gold); }
        .lp-nav-btn {
          background: var(--gold);
          color: var(--blue-900);
          border: none;
          padding: 10px 28px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lp-nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,158,11,0.4);
        }

        /* ── HERO ── */
        .lp-hero {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--blue-900) 0%, var(--blue-800) 50%, #1e40af 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }
        .lp-hero::before {
          content: '';
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%);
          top: -200px; right: -200px;
          pointer-events: none;
        }
        .lp-hero::after {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%);
          bottom: -100px; left: -100px;
          pointer-events: none;
        }
        .lp-hero-inner { position: relative; z-index: 1; max-width: 760px; }
        .lp-hero-badge {
          display: inline-block;
          background: rgba(96,165,250,0.2);
          border: 1px solid rgba(96,165,250,0.4);
          color: var(--blue-400);
          padding: 6px 18px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 28px;
          animation: fadeDown 0.8s ease both;
        }
        .lp-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 900;
          color: var(--white);
          line-height: 1.1;
          margin-bottom: 24px;
          animation: fadeDown 0.8s 0.1s ease both;
        }
        .lp-hero h1 em {
          font-style: normal;
          color: var(--gold);
        }
        .lp-hero p {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 40px;
          font-weight: 300;
          animation: fadeDown 0.8s 0.2s ease both;
        }
        .lp-hero-cta {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeDown 0.8s 0.3s ease both;
        }
        .btn-primary {
          background: var(--gold);
          color: var(--blue-900);
          border: none;
          padding: 16px 40px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(245,158,11,0.45);
        }
        .btn-ghost {
          background: transparent;
          color: var(--white);
          border: 1px solid rgba(255,255,255,0.3);
          padding: 16px 40px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.6);
        }
        .lp-scroll-hint {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.4);
          font-size: 0.75rem;
          animation: bounce 2s infinite;
        }
        .lp-scroll-hint svg { opacity: 0.5; }

        /* ── STATS STRIP ── */
        .lp-stats {
          background: var(--blue-600);
          padding: 32px 48px;
          display: flex;
          justify-content: center;
          gap: 64px;
          flex-wrap: wrap;
        }
        .lp-stat {
          text-align: center;
          color: white;
        }
        .lp-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--gold);
        }
        .lp-stat-label {
          font-size: 0.8rem;
          opacity: 0.75;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── SECTIONS ── */
        .lp-section {
          padding: 100px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .lp-section-label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--blue-600);
          margin-bottom: 12px;
        }
        .lp-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--blue-900);
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .lp-section-sub {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 540px;
          margin-bottom: 60px;
          font-weight: 300;
        }

        /* ── HOW IT WORKS ── */
        .lp-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }
        .lp-step {
          background: white;
          border-radius: 20px;
          padding: 36px 32px;
          border: 1px solid #e8f0fe;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .lp-step:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(29,78,216,0.12);
        }
        .lp-step::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--blue-600), var(--blue-400));
        }
        .lp-step-num {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          font-weight: 900;
          color: var(--blue-100);
          line-height: 1;
          margin-bottom: 16px;
        }
        .lp-step h3 {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--blue-900);
          margin-bottom: 10px;
        }
        .lp-step p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          font-weight: 300;
        }
        .lp-step-icon {
          font-size: 2rem;
          margin-bottom: 16px;
        }

        /* ── PATHWAYS ── */
        .lp-pathways-bg {
          background: linear-gradient(180deg, var(--off-white) 0%, #eef2ff 100%);
          padding: 100px 24px;
        }
        .lp-pathways {
          max-width: 1100px;
          margin: 0 auto;
        }
        .lp-pathway-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
        }
        .lp-pathway-card {
          border-radius: 24px;
          padding: 44px 36px;
          color: white;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: default;
        }
        .lp-pathway-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 56px rgba(0,0,0,0.2);
        }
        .lp-pathway-card::after {
          content: '';
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,0.07);
          bottom: -60px; right: -60px;
        }
        .card-stem { background: linear-gradient(135deg, #1d4ed8, #1e40af); }
        .card-social { background: linear-gradient(135deg, #0f766e, #065f46); }
        .card-arts { background: linear-gradient(135deg, #9333ea, #6b21a8); }
        .lp-pathway-emoji { font-size: 2.8rem; margin-bottom: 20px; }
        .lp-pathway-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .lp-pathway-card p {
          font-size: 0.9rem;
          opacity: 0.85;
          line-height: 1.6;
          font-weight: 300;
        }
        .lp-pathway-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .lp-pathway-tag {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 400;
        }

        /* ── CTA SECTION ── */
        .lp-cta-section {
          background: linear-gradient(135deg, var(--blue-900), var(--blue-800));
          padding: 100px 24px;
          text-align: center;
        }
        .lp-cta-inner { max-width: 600px; margin: 0 auto; }
        .lp-cta-section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: white;
          margin-bottom: 16px;
        }
        .lp-cta-section p {
          color: rgba(255,255,255,0.7);
          font-size: 1.05rem;
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 40px;
        }

        /* ── FOOTER ── */
        .lp-footer {
          background: var(--blue-900);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 32px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .lp-footer-brand {
          font-family: 'Playfair Display', serif;
          color: white;
          font-size: 1.1rem;
        }
        .lp-footer-brand span { color: var(--gold); }
        .lp-footer p {
          color: rgba(255,255,255,0.4);
          font-size: 0.8rem;
        }

        /* ── REVEAL ANIMATIONS ── */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        @media (max-width: 640px) {
          .lp-nav { padding: 16px 20px; }
          .lp-stats { gap: 32px; padding: 28px 24px; }
          .lp-footer { flex-direction: column; text-align: center; }
        }
      `}</style>

      <div className="lp-root">

        {/* NAV */}
        <nav className="lp-nav">
          <div className="lp-nav-brand">Pathway<span>Guide</span></div>
          <button className="lp-nav-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </nav>

        {/* HERO */}
        <section className="lp-hero" ref={heroRef}>
          <div className="lp-hero-inner">
            <div className="lp-hero-badge">Grade 9 Transition System</div>
            <h1>Discover Your <em>Academic</em> Pathway</h1>
            <p>
              A smart guidance system that combines your academic performance
              and personal interests to recommend the right senior secondary
              pathway for you.
            </p>
            <div className="lp-hero-cta">
              <button className="btn-primary" onClick={() => navigate("/login")}>
                Get Started →
              </button>
              <button className="btn-ghost" onClick={() => {
                document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })
              }}>
                Learn More
              </button>
            </div>
          </div>
          <div className="lp-scroll-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
            scroll
          </div>
        </section>

        {/* STATS */}
        <div className="lp-stats">
          <div className="lp-stat">
            <div className="lp-stat-num">3</div>
            <div className="lp-stat-label">Career Pathways</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-num">2-in-1</div>
            <div className="lp-stat-label">Academic + Interest Analysis</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-num">Grade 9</div>
            <div className="lp-stat-label">Transition Support</div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <section className="lp-section" id="how-it-works">
          <div className="reveal">
            <p className="lp-section-label">The Process</p>
            <h2>How PathwayGuide Works</h2>
            <p className="lp-section-sub">
              Three simple steps combine your academic strengths with your
              personal interests to guide your pathway choice.
            </p>
          </div>
          <div className="lp-steps">
            <div className="lp-step reveal reveal-delay-1">
              <div className="lp-step-num">01</div>
              <div className="lp-step-icon">📚</div>
              <h3>Enter Academic Results</h3>
              <p>Input your Grade 7, 8, and 9 subject scores. The system calculates your averages and identifies your strongest academic areas.</p>
            </div>
            <div className="lp-step reveal reveal-delay-2">
              <div className="lp-step-num">02</div>
              <div className="lp-step-icon">🎯</div>
              <h3>Take the Assessment</h3>
              <p>Answer a short interest assessment. Each answer maps to a pathway, helping the system understand what drives and excites you.</p>
            </div>
            <div className="lp-step reveal reveal-delay-3">
              <div className="lp-step-num">03</div>
              <div className="lp-step-icon">✨</div>
              <h3>Get Your Recommendation</h3>
              <p>Receive a personalised pathway recommendation based on the combination of your academic performance and interest profile.</p>
            </div>
          </div>
        </section>

        {/* PATHWAYS */}
        <div className="lp-pathways-bg">
          <div className="lp-pathways">
            <div className="reveal">
              <p className="lp-section-label">Your Options</p>
              <h2>The Three Pathways</h2>
              <p className="lp-section-sub">
                Each pathway opens a unique set of opportunities for your
                senior secondary years and beyond.
              </p>
            </div>
            <div className="lp-pathway-cards">
              <div className="lp-pathway-card card-stem reveal reveal-delay-1">
                <div className="lp-pathway-emoji">🔬</div>
                <h3>STEM</h3>
                <p>Science, Technology, Engineering & Mathematics. For students with strong analytical minds and a curiosity for how things work.</p>
                <div className="lp-pathway-tags">
                  <span className="lp-pathway-tag">Mathematics</span>
                  <span className="lp-pathway-tag">Physics</span>
                  <span className="lp-pathway-tag">Computer Science</span>
                  <span className="lp-pathway-tag">Biology</span>
                </div>
              </div>
              <div className="lp-pathway-card card-social reveal reveal-delay-2">
                <div className="lp-pathway-emoji">🌍</div>
                <h3>Social Sciences</h3>
                <p>History, Geography, Economics & Civics. For students who want to understand society, people and the world around them.</p>
                <div className="lp-pathway-tags">
                  <span className="lp-pathway-tag">History</span>
                  <span className="lp-pathway-tag">Geography</span>
                  <span className="lp-pathway-tag">Economics</span>
                  <span className="lp-pathway-tag">Civics</span>
                </div>
              </div>
              <div className="lp-pathway-card card-arts reveal reveal-delay-3">
                <div className="lp-pathway-emoji">🎨</div>
                <h3>Arts & Sports</h3>
                <p>Creative Arts, Music, Physical Education & Performance. For students who express themselves through creativity and physical excellence.</p>
                <div className="lp-pathway-tags">
                  <span className="lp-pathway-tag">Visual Arts</span>
                  <span className="lp-pathway-tag">Music</span>
                  <span className="lp-pathway-tag">PE</span>
                  <span className="lp-pathway-tag">Drama</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="lp-cta-section">
          <div className="lp-cta-inner reveal">
            <h2>Ready to Find Your Path?</h2>
            <p>
              Join thousands of Grade 9 students who have used PathwayGuide
              to make a confident, informed decision about their future.
            </p>
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Get Started — It's Free →
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <div className="lp-footer-brand">Pathway<span>Guide</span></div>
          <p>Grade 9 Pathway Guidance System</p>
          <p>© {new Date().getFullYear()} PathwayGuide</p>
        </footer>

      </div>
    </>
  )
}

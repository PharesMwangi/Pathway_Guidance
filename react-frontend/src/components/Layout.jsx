import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Layout({ children }) {
  const { role, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate("/login")
  }

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <h1 style={styles.brandTitle}>🎓 PathwayGuide</h1>
          <p style={styles.brandSub}>Grade 9 Pathway Guidance System</p>
        </div>

        {/* Nav links */}
        <nav style={styles.nav}>
          {role === "admin" && (
            <>
              <Link to="/admin/subjects" style={styles.link}>Subjects</Link>
              <Link to="/admin/questions" style={styles.link}>Questions</Link>
            </>
          )}

          {role === "student" && (
            <>
              <Link to="/student/academic" style={styles.link}>Academic Results</Link>
              <Link to="/student/assessment" style={styles.link}>Assessment</Link>
              <Link to="/student/results" style={styles.link}>Recommendation</Link>
            </>
          )}
        </nav>

        {/* Logout */}
        <button onClick={handleSignOut} style={styles.logoutBtn}>
          Logout
        </button>
      </header>

      {/* Page content */}
      <main style={styles.main}>
        {children}
      </main>
    </div>
  )
}

const styles = {
  wrapper:{
    minHeight: "100vh",
    minWidth: "100vw"
    // backgroundColor: "#1e1e1f"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 32px",
    backgroundColor: "#1d4ed8",
    color: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    position: "sticky",
    top:0,
    zIndex: 100,
    width: "100%",
    boxSizing: "border-box"
  },
  brand: {
    display: "flex",
    flexDirection: "column",
  },
  brandTitle: {
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: "bold",
  },
  brandSub: {
    margin: 0,
    fontSize: "0.75rem",
    opacity: 0.8
  },
  nav: {
    display: "flex",
    gap: "24px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "background 0.2s",
  },
  logoutBtn: {
    backgroundColor: "white",
    color: "#1d4ed8",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer"
  },
  main: {
    maxWidth: "860px",
    margin: "40px auto",
    padding: "0 24px"
  }
}
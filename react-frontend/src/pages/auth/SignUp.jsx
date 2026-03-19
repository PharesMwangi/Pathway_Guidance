import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: import.meta.env.VITE_REDIRECT_URL,
          data: { role: "student", full_name: fullName }
        }
      })

      if (error) throw error

      // trigger handles profiles + students insert automatically ✅

      alert("Signup successful! Please check your email to confirm.")
      navigate("/login")

    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="text-4xl font-bold text-blue-700">Create Account</h1>
        <p className="description">Use your email to create an account</p>
        <form onSubmit={handleSignup}>
          <h2>Signup</h2>

          <label>Full Name: </label>
          <input
            type="text"
            placeholder="John Doe"
            onChange={(e) => setFullName(e.target.value)}
          />

          <br />

          <label>Email: </label>
          <input
            type="email"
            placeholder="john@school.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />

          <label>Password: </label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  )
}
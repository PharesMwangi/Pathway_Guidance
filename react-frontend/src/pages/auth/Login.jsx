import { useState } from "react";
import { signIn } from "../../lib/auth";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Sign in
      const data = await signIn(email, password);
      console.log("1. Login data:", data)        // check user exists

      const userId = data.user.id;
      console.log("2. User ID:", userId)          // check ID is there

      // 👇 wait 500ms for auth lock to release
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("2.5 - about to fetch profile") // 👈 add this

      // 2. Fetch role from profiles table
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

        console.log("3. Profile:", profile)         // is this null?
        console.log("4. Profile error:", error)     // any error here?

      if (error) throw error;

      // 3. Redirect based on role
      if (profile.role === "admin") {
        navigate("/admin/subjects");
      } else {
        navigate("/student/academic");
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p>Sign in with your email</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="john@school.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          No account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
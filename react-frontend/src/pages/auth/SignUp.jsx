import { useState } from "react"
import { signUp } from "../../lib/auth"
import { supabase } from "../../lib/supabaseClient"

export default function Signup() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSignup(e) {
  e.preventDefault()

  try {
    const data = await signUp(email, password)

    const userId = data.user.id

    await supabase.from("students").insert([
      {
        user_id: userId
      }
    ])

    alert("Signup successful")

  } catch (error) {
    alert(error.message)
  }
}

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="text-4xl font-bold text-blue-700">Create Account</h1>
        <p className="description">Use your email to create an account</p>
        <form onSubmit={handleSignup}>
          <h2>Signup</h2>

          <label htmlFor="">Email: </label>

          <input
            type="email"
            placeholder="john@school.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />

          <label htmlFor="">Password: </label>

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /> <br />

          <button type="submit">Sign Up</button>
      </form>
      </div>
    </div>
  )
}
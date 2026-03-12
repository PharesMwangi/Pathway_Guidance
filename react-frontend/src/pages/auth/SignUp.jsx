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
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>

      <input
        type="email"
        placeholder="john@school.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign Up</button>
    </form>
  )
}
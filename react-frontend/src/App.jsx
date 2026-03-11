import { Routes, Route, Link } from "react-router-dom"
import Signup from "./pages/SignUp"
import Login from "./pages/Login"

export default function App() {
  return (
    <div>

      <nav>
        <Link to="/signup">Signup</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  )
}
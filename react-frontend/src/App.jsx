import { Routes, Route, Link } from "react-router-dom"
import Signup from "./pages/auth/SignUp"
import Login from "./pages/auth/Login"
import Subjects from "./pages/admin/Subjects"
import AcademicResults from "./pages/student/AcademicResults"

export default function App() {
  return (
    <div>

      <nav>
        <Link to="/signup">Signup</Link> |{" "}
        <Link to="/login">Login</Link> | {" "}
        <Link to="/admin/subjects">Subjects</Link> |  {" "}
        <Link to="/academic/academic_scores">Academic </Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/subjects" element={<Subjects />} />
        <Route path="/academic/academic_scores" element={<AcademicResults />} />
      </Routes>

    </div>
  )
}
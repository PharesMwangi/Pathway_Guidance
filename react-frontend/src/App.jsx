import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

//auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";

//admin
import Subjects from "./pages/admin/Subjects"
import Questions from "./pages/admin/Questions"

//student
import AcademicResults from "./pages/student/AcademicResults";
import Assessment from "./pages/student/Assessment";
import Results from "./pages/student/Results";

//shared
import Unauthorized from "./pages/Unauthorized";

export default function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*public*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* admin */}
          <Route
            path="/admin/subjects"
            element ={
              <ProtectedRoute allowedRole="admin">
                <Subjects />
              </ProtectedRoute>
            }
            />

          <Route
            path="/admin/questions"
            element ={
              <ProtectedRoute allowedRole="admin">
                <Questions />
              </ProtectedRoute>
            }
            />
          
          {/* students */}
          <Route
            path="/student/academic"
            element ={
              <ProtectedRoute allowedRole="student">
                <AcademicResults />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/assessment"
            element ={
              <ProtectedRoute allowedRole="student">
                <Assessment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/results"
            element ={
              <ProtectedRoute allowedRole="student">
                <Results />
              </ProtectedRoute>
            }
          />

          {/* catch-all: redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
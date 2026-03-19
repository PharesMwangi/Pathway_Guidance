import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

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
import Home from "./pages/Home"

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
          <Route path="/" element={<Home />} />

          {/* admin */}
          <Route
            path="/admin/subjects"
            element ={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Subjects />
                </Layout>
                
              </ProtectedRoute>
            }
            />

          <Route
            path="/admin/questions"
            element ={
              <ProtectedRoute allowedRole="admin">
                <Layout>
                  <Questions />
                </Layout>
                
              </ProtectedRoute>
            }
            />
          
          {/* students */}
          <Route
            path="/student/academic"
            element ={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <AcademicResults />
                </Layout>
                
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/assessment"
            element ={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Assessment />
                </Layout>
                
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/results"
            element ={
              <ProtectedRoute allowedRole="student">
                <Layout>
                  <Results />
                </Layout>
                
              </ProtectedRoute>
            }
          />

          {/* catch-all: redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
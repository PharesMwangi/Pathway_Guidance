import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { Children } from "react";

export default function ProtectedRoute({ children, allowedRole }){
    const{ user, role, loading } = useAuth();

    if(loading){
        return(
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }
    if(!user) return <Navigate to="/login" replace />

    if(allowedRole && role !== allowedRole){
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
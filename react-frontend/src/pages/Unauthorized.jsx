import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
      <p className="text-gray-600">You don't have permission to view this page.</p>
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to Login
      </button>
    </div>
  );
}
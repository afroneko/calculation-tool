import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

// ----> FUNCTION TO PREVENT UNAUTHORIZED ACCESS TO PROTECTED ROUTES <----

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm.jsx";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Prevent showing form if already logged in or still loading
  if (loading) return null;
  if (isAuthenticated) return null;

  return (
    <div>
      <AuthForm mode="login" />
    </div>
  );
}

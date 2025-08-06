import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm.jsx";
// import { useAuth } from "../context/AuthContext";

export default function Signup() {
  //   const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  //   useEffect(
  //     () => {
  //       // if (isAuthenticated) {
  //       navigate("/");
  //     },
  //     //   }, [isAuthenticated, navigate]);
  //     []
  //   );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AuthForm mode="signup" />
    </div>
  );
}

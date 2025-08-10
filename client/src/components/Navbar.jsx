import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth(); // ✅ get current user

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl relative">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-15 shadow-blue-300">
          <Link
            to="/"
            className="text-3xl font-bold hover:text-purple-100 transition-colors duration-300 flex items-center"
          >
            <span className=" bg-opacity-20 px-3 py-1 rounded-lg">
              Resume Rush
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                location.pathname === "/"
                  ? " text-white shadow-blue-700 shadow-lg transform scale-105"
                  : " text-white bg-opacity-10 hover:bg-opacity-20 hover:shadow-md"
              }`}
            >
              Home
            </Link>
            <Link
              to="/resume-add"
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                location.pathname === "/resume-add"
                  ? "text-white shadow-blue-700 shadow-lg transform scale-105"
                  : "text-white bg-opacity-10 hover:bg-opacity-20 hover:shadow-md"
              }`}
            >
              Create
            </Link>
            <button className="px-6 py-3 rounded-lg font-medium text-white bg-opacity-10 hover:bg-opacity-20 hover:shadow-md transition-all duration-300">
              Contact
            </button>

            {/* ✅ Show profile icon if logged in, else Sign Up */}
            {/* {user ? ( */}
            <Link to="/profile">
              <User
                size={24}
                className=" rounded-full border-2 border-white hover:scale-105 transition-transform"
              />
            </Link>
            {/* ) : (
              <Link
                to="/login"
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === "/login"
                    ? "text-blue-600 bg-white shadow-blue-700 shadow-lg transform scale-105"
                    : "text-blue-700 bg-white hover:bg-opacity-20 hover:shadow-md"
                }`}
              >
                Login
              </Link>
            )} */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-opacity-10 hover:bg-opacity-20 transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg z-50 md:hidden">
              <div className="container mx-auto px-6 py-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === "/"
                      ? "bg-white bg-opacity-20 text-purple-600 shadow-lg"
                      : "text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/resume-add"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === "/resume-add"
                      ? "bg-white bg-opacity-20 text-purple-600 shadow-lg"
                      : "text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                >
                  Create Resume
                </Link>

                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === "/"
                      ? "bg-white bg-opacity-20 text-purple-600 shadow-lg"
                      : "text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                >
                  Contact
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-3 rounded-lg font-medium text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

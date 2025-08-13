import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, FileText, User, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [savedResumes, setSavedResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  //logout
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call to fetch user's saved resumes
    const fetchResumes = async () => {
      try {
        // Replace this with your actual API call
        const mockResumes = [
          {
            id: 1,
            title: "Software Developer Resume",
            lastModified: "2024-01-15",
            createdAt: "2024-01-10",
          },
          {
            id: 2,
            title: "Frontend Developer Resume",
            lastModified: "2024-01-20",
            createdAt: "2024-01-18",
          },
          {
            id: 3,
            title: "Full Stack Developer Resume",
            lastModified: "2024-01-25",
            createdAt: "2024-01-22",
          },
        ];

        setTimeout(() => {
          setSavedResumes(mockResumes);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching resumes:", error);
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleEditResume = (resumeId) => {
    // Navigate to resume-add page with the resume ID to pre-fill data
    navigate(`/resume-add?edit=${resumeId}`);
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        // Replace with actual API call to delete resume
        // await deleteResume(resumeId);

        // Update local state
        setSavedResumes(
          savedResumes.filter((resume) => resume.id !== resumeId)
        );
        toast.success("Resume deleted successfully!");
      } catch (error) {
        console.error("Error deleting resume:", error);
        toast.error("Failed to delete resume. Please try again.");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full">
                <User size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user?.username || "John Doe"}
                </h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <Mail size={16} className="mr-2" />
                  <span>{user?.email || "john.doe@example.com"}</span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Saved Resumes Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Saved Resumes</h2>
            <button
              onClick={() => navigate("/resume-add")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              Create New Resume
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : savedResumes.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No resumes found
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first resume to get started!
              </p>
              <button
                onClick={() => navigate("/resume-add")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Create Resume
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <FileText size={20} className="text-purple-600 mr-2" />
                      <h3 className="font-medium text-gray-800 truncate">
                        {resume.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p>Created: {formatDate(resume.createdAt)}</p>
                    <p>Modified: {formatDate(resume.lastModified)}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditResume(resume.id)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteResume(resume.id)}
                      className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

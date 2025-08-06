import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import ResumeForm from "./pages/ResumeForm";
import ResumePreview from "./pages/ResumePreview";
import LoadingSpinner from "./components/LoadingSpinner";
import { generateResumeContent } from "./utils/geminiApi";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import toast, { Toaster } from "react-hot-toast";

// Create context for sharing resume data across components
export const ResumeContext = createContext();

// Wrapper component for LandingPage to access navigation
const LandingPageWrapper = () => {
  const navigate = useNavigate();

  const handleCreateResume = () => {
    navigate("/resume-add");
  };

  return <LandingPage onCreateResume={handleCreateResume} />;
};

// Wrapper component for ResumeForm to handle form submission and navigation
const ResumeFormWrapper = () => {
  const navigate = useNavigate();
  const { setResumeData, setIsLoading } = React.useContext(ResumeContext);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Generate AI content using API key from environment
      const aiContent = await generateResumeContent(formData);

      // Combine form data with AI-generated content
      const enhancedResumeData = {
        ...formData,
        ...aiContent,
      };

      setResumeData(enhancedResumeData);
      navigate("/preview");
    } catch (error) {
      console.error("Error generating resume:", error);
      toast.error(
        "Failed to generate AI content. Please check your connection and try again."
      );

      // Fallback: use original data without AI enhancement
      // setResumeData(formData);
      navigate("/preview");
    } finally {
      setIsLoading(false);
    }
  };

  return <ResumeForm onSubmit={handleFormSubmit} />;
};

// Wrapper component for ResumePreview to handle editing
const ResumePreviewWrapper = () => {
  const navigate = useNavigate();
  const { resumeData } = React.useContext(ResumeContext);

  const handleEditResume = () => {
    navigate("/resume-add");
  };

  // Redirect to landing page if no resume data
  React.useEffect(() => {
    if (!resumeData) {
      navigate("/");
    }
  }, [resumeData, navigate]);

  if (!resumeData) {
    return null;
  }

  return <ResumePreview resumeData={resumeData} onEdit={handleEditResume} />;
};

const App = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Toaster />
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          isLoading,
          setIsLoading,
        }}
      >
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Routes without Navbar */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Routes with Navbar */}
              <Route
                path="/*"
                element={
                  <>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<LandingPageWrapper />} />
                      <Route
                        path="/resume-add"
                        element={<ResumeFormWrapper />}
                      />
                      <Route
                        path="/preview"
                        element={<ResumePreviewWrapper />}
                      />
                    </Routes>
                  </>
                }
              />
            </Routes>

            {isLoading && (
              <LoadingSpinner message="Generating your AI-powered resume..." />
            )}
          </div>
        </Router>
      </ResumeContext.Provider>
    </div>
  );
};

export default App;

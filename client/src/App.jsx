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
import { useAuth , AuthProvider } from "./context/AuthContext.jsx";
import Profile from "./pages/Profile.jsx";

// Create context for sharing resume data across components
export const ResumeContext = createContext();

// Function to generate basic resume without AI
const generateBasicResume = (formData) => {
  return {
    // Enhanced job description (basic formatting)
    enhancedJobDescription: formData.jobDescription,

    // Basic professional summary
    professionalSummary: `Experienced ${formData.jobTitle.toLowerCase()} with a ${
      formData.degree
    } from ${formData.university}. Skilled in ${formData.technicalSkills
      .slice(0, 3)
      .join(", ")} and passionate about delivering high-quality solutions.`,

    // Enhanced project descriptions (keep original)
    enhancedProjects: formData.projects.map((project) => ({
      ...project,
      enhancedDescription: project.projectDescription,
    })),

    // Formatted skills
    formattedTechnicalSkills: formData.technicalSkills,
    formattedSoftSkills: formData.softSkills
      .split(",")
      .map((skill) => skill.trim()),

    // Additional sections
    achievements: [
      `Graduated with ${
        formData.gpa ? `GPA: ${formData.gpa}` : "academic excellence"
      } from ${formData.university}`,
      `Successfully worked as ${formData.jobTitle} at ${formData.company}`,
      `Completed ${formData.projects.length} professional project${
        formData.projects.length > 1 ? "s" : ""
      }`,
    ],

    // Basic recommendations for improvement
    recommendations: [
      "Consider adding quantified achievements to your work experience",
      "Include any certifications or additional courses you've completed",
      "Add links to your project repositories or live demos",
    ],
  };
};

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

  const handleFormSubmit = async (formData, useAI) => {
    setIsLoading(true);

    try {
      let enhancedResumeData;

      if (useAI) {
        // Generate AI content using API key from environment
        const aiContent = await generateResumeContent(formData);

        // Combine form data with AI-generated content
        enhancedResumeData = {
          ...formData,
          ...aiContent,
          isAIGenerated: true,
        };
      } else {
        // Generate basic resume without AI
        const basicContent = generateBasicResume(formData);

        // Combine form data with basic content
        enhancedResumeData = {
          ...formData,
          ...basicContent,
          isAIGenerated: false,
        };
      }

      setResumeData(enhancedResumeData);
      navigate("/preview");
    } catch (error) {
      console.error("Error generating resume:", error);

      if (useAI) {
        toast.error(
          "Failed to generate AI content. Creating basic resume instead."
        );

        // Fallback: use basic generation when AI fails
        const basicContent = generateBasicResume(formData);
        const fallbackResumeData = {
          ...formData,
          ...basicContent,
          isAIGenerated: false,
        };

        setResumeData(fallbackResumeData);
      } else {
        toast.error("Failed to generate resume. Please try again.");
        setResumeData(formData);
      }

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

//loading spinner component
const AppContent = () => {
  const {loading, isAuthenticated} = useAuth();

  //showing loading spinner while checking auth status
  if (loading) {
    return <LoadingSpinner message="Loading..." />;
  }

  return (
    <Routes>
      {/* Routes without Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<LandingPageWrapper />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/resume-add" element={<ResumeFormWrapper />} />
      <Route path="/preview" element={<ResumePreviewWrapper />} />
    </Routes>
  );
}

const App = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <AuthProvider>
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
              <AppContent />  {/* Replace Routes with AppContent */}

              {isLoading && (
                <LoadingSpinner message="Generating your resume..." />
              )}
            </div>
          </Router>
        </ResumeContext.Provider>
      </AuthProvider>
    </div>
  );
};
export default App;

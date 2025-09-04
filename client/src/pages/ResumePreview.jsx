
import React from "react";
import { Download, Mail, Phone, MapPin, Globe } from "lucide-react";

const ResumePreview = ({ resumeData, onSave }) => {
  const handleDownload = () => {
    window.print();
  };

  const handleSave = () => {
    if (typeof onSave === "function") {
      onSave(resumeData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Action Buttons */}

        {/* Resume Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 print:shadow-none print:rounded-none">
          {/* Header */}
          <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {resumeData.name}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {resumeData.email}
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {resumeData.phone}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {resumeData.location}
              </div>
            </div>
          </header>

          {/* Professional Summary */}
          {(resumeData.professionalSummary || resumeData.aiSummary) && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resumeData.professionalSummary || resumeData.aiSummary}
              </p>
            </section>
          )}

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Education
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {resumeData.degree}
                    </h3>
                    <p className="text-lg text-blue-600">
                      {resumeData.university}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 font-medium">
                      {resumeData.graduationYear}
                    </p>
                    {resumeData.gpa && (
                      <p className="text-gray-600">GPA: {resumeData.gpa}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Work Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Work Experience
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {resumeData.jobTitle}
                    </h3>
                    <p className="text-lg text-blue-600">
                      {resumeData.company}
                    </p>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {resumeData.workDuration}
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {resumeData.enhancedJobDescription ||
                    resumeData.jobDescription}
                </p>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Projects
            </h2>
            <div className="space-y-6">
              {/* Handle multiple projects */}
              {resumeData.projects ? (
                // New format with multiple projects
                resumeData.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {project.projectName}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {resumeData.enhancedProjects &&
                      resumeData.enhancedProjects[index]
                        ? resumeData.enhancedProjects[index].enhancedDescription
                        : project.projectDescription}
                    </p>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Technologies:{" "}
                      </span>
                      <span className="text-blue-600">
                        {project.technologies}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                // Old format - single project (backward compatibility)
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {resumeData.projectName}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {resumeData.aiProjectDescription ||
                      resumeData.projectDescription}
                  </p>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Technologies:{" "}
                    </span>
                    <span className="text-blue-600">
                      {resumeData.technologies}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {/* Handle both array and string formats */}
                  {Array.isArray(resumeData.technicalSkills)
                    ? resumeData.technicalSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill.trim()}
                        </span>
                      ))
                    : resumeData.technicalSkills
                        .split(",")
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {/* Handle both array and string formats */}
                  {Array.isArray(resumeData.formattedSoftSkills)
                    ? resumeData.formattedSoftSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          {skill.trim()}
                        </span>
                      ))
                    : resumeData.softSkills.split(",").map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                </div>
              </div>
            </div>
          </section>

          {/* Achievements Section (for non-AI generated resumes) */}
          {resumeData.achievements && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Key Achievements
              </h2>
              <ul className="space-y-2">
                {resumeData.achievements.map((achievement, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* AI Generation Badge */}
          <div className="text-center mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                resumeData.isAIGenerated
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {resumeData.isAIGenerated
                ? "🤖 AI Enhanced"
                : "📝 Standard Format"}
            </span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Your resume is ready! What would you like to do next?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSave}
              className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Save Resume
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx="true">{`
        @media print {
          body {
            print-color-adjust: exact;
          }
          .bg-gray-50 {
            background: white !important;
          }
          .shadow-xl {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;

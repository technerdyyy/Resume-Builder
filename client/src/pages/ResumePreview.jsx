import React from "react";
import { Download, Edit, Mail, Phone, MapPin, Globe } from "lucide-react";

const ResumePreview = ({ resumeData, onEdit }) => {
  const handleDownload = () => {
    // Create a printable version
    window.print();
  };

  const handleEdit = () => {
    onEdit();
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
          {resumeData.aiSummary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resumeData.aiSummary}
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
                  {resumeData.jobDescription}
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
                  {resumeData.technicalSkills.split(",").map((skill, index) => (
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
                  {resumeData.softSkills.split(",").map((skill, index) => (
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
        </div>

        {/* Bottom Actions */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Your resume is ready! What would you like to do next?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleEdit}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Make Changes
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

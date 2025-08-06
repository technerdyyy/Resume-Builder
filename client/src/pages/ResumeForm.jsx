import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  Award,
} from "lucide-react";

const ResumeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    location: "",

    // Education
    degree: "",
    university: "",
    graduationYear: "",
    gpa: "",

    // Experience
    jobTitle: "",
    company: "",
    workDuration: "",
    jobDescription: "",

    // Projects
    projectName: "",
    projectDescription: "",
    technologies: "",

    // Skills
    technicalSkills: "",
    softSkills: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "email",
      "phone",
      "location",
      "degree",
      "university",
      "graduationYear",
      "jobTitle",
      "company",
      "workDuration",
      "jobDescription",
      "projectName",
      "projectDescription",
      "technologies",
      "technicalSkills",
      "softSkills",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Build Your Resume
            </h1>
            <p className="text-gray-600">
              Fill in your details and let AI enhance your profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    Full Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, NY"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Education
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Degree */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Degree <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="Bachelor of Science in Computer Science"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.degree ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.degree && (
                    <p className="text-red-500 text-sm mt-1">{errors.degree}</p>
                  )}
                </div>

                {/* University */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    University <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="Stanford University"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.university ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.university && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.university}
                    </p>
                  )}
                </div>

                {/* Graduation Year */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Graduation Year <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    placeholder="2023"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.graduationYear
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.graduationYear && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.graduationYear}
                    </p>
                  )}
                </div>

                {/* GPA */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Award className="w-4 h-4 mr-2" />
                    GPA
                  </label>
                  <input
                    type="text"
                    name="gpa"
                    value={formData.gpa}
                    onChange={handleChange}
                    placeholder="3.8/4.0"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.gpa ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.gpa && (
                    <p className="text-red-500 text-sm mt-1">{errors.gpa}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Work Experience
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Job Title <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Software Engineer"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.jobTitle ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.jobTitle}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Company <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Google Inc."
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.company ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Duration <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="workDuration"
                    value={formData.workDuration}
                    onChange={handleChange}
                    placeholder="June 2023 - Present"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.workDuration ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.workDuration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.workDuration}
                    </p>
                  )}
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Job Description <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  placeholder="Describe your key responsibilities and achievements..."
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                    errors.jobDescription ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.jobDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.jobDescription}
                  </p>
                )}
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Projects
              </h2>
              <div className="space-y-6">
                {/* Project Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Code className="w-4 h-4 mr-2" />
                    Project Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="E-commerce Platform"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.projectName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.projectName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.projectName}
                    </p>
                  )}
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Code className="w-4 h-4 mr-2" />
                    Project Description{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Brief description of your project..."
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                      errors.projectDescription
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.projectDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.projectDescription}
                    </p>
                  )}
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Code className="w-4 h-4 mr-2" />
                    Technologies Used{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB, AWS"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.technologies ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.technologies && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.technologies}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Skills
              </h2>
              <div className="space-y-6">
                {/* Technical Skills */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Code className="w-4 h-4 mr-2" />
                    Technical Skills{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="technicalSkills"
                    value={formData.technicalSkills}
                    onChange={handleChange}
                    placeholder="JavaScript, Python, React, Node.js, AWS, Docker..."
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                      errors.technicalSkills
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.technicalSkills && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.technicalSkills}
                    </p>
                  )}
                </div>

                {/* Soft Skills */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Award className="w-4 h-4 mr-2" />
                    Soft Skills <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="softSkills"
                    value={formData.softSkills}
                    onChange={handleChange}
                    placeholder="Leadership, Communication, Problem-solving, Team collaboration..."
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                      errors.softSkills ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.softSkills && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.softSkills}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Generate Resume with AI
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;

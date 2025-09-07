import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Plus,
  Trash2,
  X,
  ChevronDown,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { technicalSkills as availableSkills } from "../utils/skills"; // Import from data file

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

    // Projects (now array)
    projects: [
      {
        projectName: "",
        projectDescription: "",
        technologies: "",
      },
    ],

    // Skills (now arrays)
    technicalSkills: [],

    softSkills: "",
  });

  const [errors, setErrors] = useState({});
  const [useAI, setUseAI] = useState(true);
  const [skillsSearch, setSkillsSearch] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  // Fetch resume data for editing
  useEffect(() => {
    const fetchResumeData = async (resumeId) => {
      try {
        const { getResumeById, getProjectsByResume } = await import(
          "../utils/api"
        );

        // Fetch resume data
        const resume = await getResumeById(resumeId);

        // Fetch projects for this resume
        const projectsResponse = await getProjectsByResume(resumeId);
        const projects = projectsResponse.projects || [];

        // Pre-fill form data
        setFormData({
          name: resume.name || "",
          email: resume.email || "",
          phone: resume.phone || "",
          location: resume.location || "",
          degree: resume.degree || "",
          university: resume.university || "",
          graduationYear: resume.graduation_year || "",
          gpa: resume.gpa || "",
          jobTitle: resume.job_title || "",
          company: resume.company || "",
          workDuration: resume.work_duration || "",
          jobDescription: resume.job_description || "",
          projects:
            projects.length > 0
              ? projects.map((p) => ({
                  projectName: p.project_name || "",
                  projectDescription: p.project_description || "",
                  technologies: p.technologies || "",
                }))
              : [
                  {
                    projectName: "",
                    projectDescription: "",
                    technologies: "",
                  },
                ],
          technicalSkills: resume.technical_skills
            ? Array.isArray(resume.technical_skills)
              ? resume.technical_skills
              : typeof resume.technical_skills === "string"
              ? resume.technical_skills.split(",").map((s) => s.trim())
              : []
            : [],
          softSkills: resume.soft_skills || "",
        });
      } catch (error) {
        console.error("Error fetching resume data:", error);
        toast.error("Failed to load resume data for editing");
      }
    };

    if (editId) {
      fetchResumeData(editId);
    }
  }, [editId]);

  // Handle skills input change and generate suggestions
  const handleSkillsInputChange = (e) => {
    const value = e.target.value;
    setSkillsSearch(value);

    if (value.trim()) {
      const filtered = availableSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(value.toLowerCase()) &&
          !formData.technicalSkills.includes(skill)
      );
      setSkillSuggestions(filtered.slice(0, 8)); // Show max 8 suggestions
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1);
    } else {
      setSkillSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle keyboard navigation for suggestions
  const handleSkillsKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (skillsSearch.trim()) {
          addSkill(skillsSearch.trim());
        }
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestionIndex((prev) =>
          prev < skillSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          addSkill(skillSuggestions[activeSuggestionIndex]);
        } else if (skillsSearch.trim()) {
          addSkill(skillsSearch.trim());
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
      case "Tab":
        if (activeSuggestionIndex >= 0) {
          e.preventDefault();
          addSkill(skillSuggestions[activeSuggestionIndex]);
        }
        break;
    }
  };

  // Add skill function
  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !formData.technicalSkills.includes(trimmedSkill)) {
      setFormData((prev) => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, trimmedSkill],
      }));
      setSkillsSearch("");
      setShowSuggestions(false);
      setSkillSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (skill) => {
    addSkill(skill);
  };

  // Hide suggestions when clicking outside
  const handleSkillsInputBlur = (e) => {
    // Small delay to allow suggestion clicks to register
    setTimeout(() => {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }, 200);
  };

  // Handle focus to show suggestions again
  const handleSkillsInputFocus = () => {
    if (skillsSearch.trim() && skillSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

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

  // Handle project changes
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = formData.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));

    // Clear errors
    const errorKey = `projects.${index}.${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: "",
      }));
    }
  };

  // Add new project
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          projectName: "",
          projectDescription: "",
          technologies: "",
        },
      ],
    }));
  };

  // Remove project
  const removeProject = (index) => {
    if (formData.projects.length > 1) {
      const updatedProjects = formData.projects.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        projects: updatedProjects,
      }));
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
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
      "softSkills",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // Validate projects only if any project has data
    const hasAnyProjectData = formData.projects.some(
      (project) =>
        project.projectName.trim() ||
        project.projectDescription.trim() ||
        project.technologies.trim()
    );

    if (hasAnyProjectData) {
      formData.projects.forEach((project, index) => {
        // Only validate projects that have at least one field filled
        const hasProjectData =
          project.projectName.trim() ||
          project.projectDescription.trim() ||
          project.technologies.trim();

        if (hasProjectData) {
          if (!project.projectName.trim()) {
            newErrors[`projects.${index}.projectName`] =
              "Project name is required";
          }
          if (!project.projectDescription.trim()) {
            newErrors[`projects.${index}.projectDescription`] =
              "Project description is required";
          }
          if (!project.technologies.trim()) {
            newErrors[`projects.${index}.technologies`] =
              "Technologies are required";
          }
        }
      });
    }

    // Validate technical skills
    if (formData.technicalSkills.length === 0) {
      newErrors.technicalSkills = "At least one technical skill is required";
    }

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
      onSubmit(formData, useAI, editId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {editId ? "Edit Your Resume" : "Build Your Resume"}
            </h1>
            <p className="text-gray-600">
              {editId
                ? "Update your details and enhance your profile"
                : "Fill in your details and let AI enhance your profile"}
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
                  Projects{" "}
                  <span className="text-sm font-normal text-gray-500">
                    (Optional)
                  </span>
                </h2>
                <button
                  type="button"
                  onClick={addProject}
                  className="flex items-center px-4 py-2 text-black rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                </button>
              </div>

              {formData.projects.map((project, index) => (
                <div
                  key={index}
                  className="mb-8 p-6 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-700">
                      Project {index + 1}
                    </h3>
                    {formData.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        className="flex items-center px-3 py-1 text-black rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Project Name */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Code className="w-4 h-4 mr-2" />
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={project.projectName}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "projectName",
                            e.target.value
                          )
                        }
                        placeholder="E-commerce Platform"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors[`projects.${index}.projectName`]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors[`projects.${index}.projectName`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`projects.${index}.projectName`]}
                        </p>
                      )}
                    </div>

                    {/* Project Description */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Code className="w-4 h-4 mr-2" />
                        Project Description
                      </label>
                      <textarea
                        value={project.projectDescription}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "projectDescription",
                            e.target.value
                          )
                        }
                        placeholder="Brief description of your project..."
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
                          errors[`projects.${index}.projectDescription`]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors[`projects.${index}.projectDescription`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`projects.${index}.projectDescription`]}
                        </p>
                      )}
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Code className="w-4 h-4 mr-2" />
                        Technologies Used
                      </label>
                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "technologies",
                            e.target.value
                          )
                        }
                        placeholder="React, Node.js, MongoDB, AWS"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors[`projects.${index}.technologies`]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors[`projects.${index}.technologies`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`projects.${index}.technologies`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Skills - Updated Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Skills
              </h2>
              <div className="space-y-6">
                {/* Technical Skills with Suggestions */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Code className="w-4 h-4 mr-2" />
                    Technical Skills{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  {/* Skills Input with Suggestions */}
                  <div className="relative">
                    <input
                      type="text"
                      value={skillsSearch}
                      onChange={handleSkillsInputChange}
                      onKeyDown={handleSkillsKeyDown}
                      onFocus={handleSkillsInputFocus}
                      onBlur={handleSkillsInputBlur}
                      placeholder="Start typing to see suggestions (press Enter to add)..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />

                    {/* Suggestions List */}
                    {showSuggestions && skillSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {skillSuggestions.map((skill, index) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleSuggestionClick(skill)}
                            className={`w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${
                              index === activeSuggestionIndex
                                ? "bg-blue-100"
                                : ""
                            }`}
                          >
                            <span className="text-gray-800">{skill}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* No suggestions found */}
                    {showSuggestions &&
                      skillsSearch.trim() &&
                      skillSuggestions.length === 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                          <div className="px-4 py-2 text-gray-500 text-sm">
                            No suggestions found. Press Enter to add "
                            {skillsSearch}" as a custom skill.
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Selected Skills Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.technicalSkills.map((skill, index) => {
                      const isCustomSkill = !availableSkills.includes(skill);
                      return (
                        <span
                          key={`${skill}-${index}`}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                            isCustomSkill
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className={`ml-2 ${
                              isCustomSkill
                                ? "hover:text-green-600"
                                : "hover:text-blue-600"
                            }`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>

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

            {/* AI Toggle */}
            <section>
              <div className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="useAI"
                  checked={useAI}
                  onChange={(e) => setUseAI(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <label
                  htmlFor="useAI"
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Generate with AI
                </label>
              </div>
            </section>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 cursor-pointer"
              >
                {editId
                  ? useAI
                    ? "Update Resume with AI"
                    : "Update Resume"
                  : useAI
                  ? "Generate Resume with AI"
                  : "Generate Resume"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;

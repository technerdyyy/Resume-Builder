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
// import { useSearchParams } from "react-router-dom";

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
  const [skillsDropdownOpen, setSkillsDropdownOpen] = useState(false);
  const [skillsSearch, setSkillsSearch] = useState("");

  // Predefined skills list
  const availableSkills = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Azure",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Git",
    "HTML",
    "CSS",
    "Sass",
    "Tailwind CSS",
    "Bootstrap",
    "TypeScript",
    "GraphQL",
    "REST API",
    "Machine Learning",
    "TensorFlow",
    "PyTorch",
    "Data Analysis",
    "Pandas",
    "NumPy",
  ];

  //   const [searchParams] = useSearchParams();
  // const editId = searchParams.get('edit');

  // for fetching pre-filled data to edit
  // useEffect(() => {
  // if (editId) {
  //   // Fetch and pre-fill resume data
  //   fetchResumeData(editId);
  // }
  // }, [editId]);

  // Add this useEffect after your state declarations:
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".skills-dropdown")) {
        setSkillsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Handle skill selection
  const addSkill = (skill) => {
    if (!formData.technicalSkills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, skill],
      }));
    }
    setSkillsDropdownOpen(false);
    setSkillsSearch(""); // Add this line
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

    // Validate projects
    formData.projects.forEach((project, index) => {
      if (!project.projectName.trim()) {
        newErrors[`projects.${index}.projectName`] = "Project name is required";
      }
      if (!project.projectDescription.trim()) {
        newErrors[`projects.${index}.projectDescription`] =
          "Project description is required";
      }
      if (!project.technologies.trim()) {
        newErrors[`projects.${index}.technologies`] =
          "Technologies are required";
      }
    });

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
      onSubmit(formData, useAI);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-6">
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">
                  Projects
                </h2>
                <button
                  type="button"
                  onClick={addProject}
                  className="flex items-center px-4 py-2  text-black rounded-lg  transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {/* Add Project */}
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
                        className="flex items-center px-3 py-1  text-black rounded  transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 mr-1 " />
                        {/* Remove */}
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Project Name */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Code className="w-4 h-4 mr-2" />
                        Project Name{" "}
                        <span className="text-red-500 ml-1">*</span>
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
                        Project Description{" "}
                        <span className="text-red-500 ml-1">*</span>
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
                        Technologies Used{" "}
                        <span className="text-red-500 ml-1">*</span>
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

                  {/* Skills Dropdown */}
                  <div className="relative skills-dropdown">
                    <input
                      type="text"
                      value={skillsSearch}
                      onChange={(e) => setSkillsSearch(e.target.value)}
                      onFocus={() => setSkillsDropdownOpen(true)}
                      placeholder="Search and select skills..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />

                    {skillsDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {availableSkills
                          .filter(
                            (skill) =>
                              !formData.technicalSkills.includes(skill) &&
                              skill
                                .toLowerCase()
                                .includes(skillsSearch.toLowerCase())
                          )
                          .map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => addSkill(skill)}
                              className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                            >
                              {skill}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Skills Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.technicalSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-blue-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
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
                {useAI ? "Generate Resume with AI" : "Generate Resume"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;

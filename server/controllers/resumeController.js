const resumeModel = require("../models/ResumeModel");

exports.createResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resume = await resumeModel.createResume(req.body, userId);
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserResumes = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumes = await resumeModel.getResumesByUser(userId);
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resume = await resumeModel.getResumeById(req.params.id, userId);
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resume = await resumeModel.updateResume(
      req.params.id,
      userId,
      req.body
    );
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resume = await resumeModel.deleteResume(req.params.id, userId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

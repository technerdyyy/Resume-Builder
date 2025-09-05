const resumeModel = require('../Models/ResumeModel');

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
    const resume = await resumeModel.updateResume(req.params.id, userId, req.body);
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
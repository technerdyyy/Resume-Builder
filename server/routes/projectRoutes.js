const express = require('express');
const { addProjectsToResume, getProjects, updateProjectsForResume } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Add projects to a resume
router.post('/add', protect, addProjectsToResume);

// Update projects for a resume
router.put('/update', protect, updateProjectsForResume);

// Get projects for a resume
router.get('/:resumeId', protect, getProjects);

module.exports = router;

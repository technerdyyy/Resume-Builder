const { addProjects, getProjectsByResume, deleteProjectsByResume } = require('../models/projectModel');

// Controller to add projects to a resume
const addProjectsToResume = async (req, res) => {
	try {
		const { projects, resumeId } = req.body;
		if (!projects || !resumeId) {
			return res.status(400).json({ error: 'Projects and resumeId are required.' });
		}
		const insertedProjects = await addProjects(projects, resumeId);
		res.status(201).json({ projects: insertedProjects });
	} catch (error) {
		res.status(500).json({ error: 'Failed to add projects.', details: error.message });
	}
};

// Controller to get projects for a resume
const getProjects = async (req, res) => {
	try {
		const { resumeId } = req.params;
		if (!resumeId) {
			return res.status(400).json({ error: 'resumeId is required.' });
		}
		const projects = await getProjectsByResume(resumeId);
		res.status(200).json({ projects });
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch projects.', details: error.message });
	}
};

// Controller to update projects for a resume (delete old ones and add new ones)
const updateProjectsForResume = async (req, res) => {
	try {
		const { projects, resumeId } = req.body;
		if (!projects || !resumeId) {
			return res.status(400).json({ error: 'Projects and resumeId are required.' });
		}
		
		// Delete existing projects
		await deleteProjectsByResume(resumeId);
		
		// Add new projects
		const insertedProjects = await addProjects(projects, resumeId);
		res.status(200).json({ projects: insertedProjects });
	} catch (error) {
		res.status(500).json({ error: 'Failed to update projects.', details: error.message });
	}
};

module.exports = { addProjectsToResume, getProjects, updateProjectsForResume };

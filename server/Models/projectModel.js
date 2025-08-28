const pool = require("../config/db");

// Add projects for a resume
const addProjects = async (projects, resumeId) => {
    const insertedProjects = [];

    for (const p of projects) {
        const result = await pool.query(
            `INSERT INTO projects (resume_id, project_name, project_description, technologies) 
             VALUES ($1,$2,$3,$4) RETURNING *`,
            [resumeId, p.projectName, p.projectDescription, p.technologies]
        );
        insertedProjects.push(result.rows[0]);
    }

    return insertedProjects;
};

// Get projects for a resume
const getProjectsByResume = async (resumeId) => {
    const result = await pool.query(
        "SELECT * FROM projects WHERE resume_id = $1 ORDER BY created_at DESC",
        [resumeId]
    );
    return result.rows;
};

module.exports = { addProjects, getProjectsByResume };

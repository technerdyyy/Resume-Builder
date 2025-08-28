const pool = require("../config/db");

// Create Resume
const createResume = async (resumeData, userId) => {
    const {
        name, email, phone, location,
        degree, university, graduationYear, gpa,
        jobTitle, company, workDuration, jobDescription,
        technicalSkills, softSkills
    } = resumeData;

    const result = await pool.query(
        `INSERT INTO resumes 
        (user_id, name, email, phone, location, degree, university, graduation_year, gpa, job_title, company, work_duration, job_description, technical_skills, soft_skills) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) 
        RETURNING *`,
        [userId, name, email, phone, location, degree, university, graduationYear, gpa, jobTitle, company, workDuration, jobDescription, technicalSkills, softSkills]
    );

    return result.rows[0];
};

// Get all resumes of a user
const getResumesByUser = async (userId) => {
    const result = await pool.query(
        "SELECT * FROM resumes WHERE user_id = $1 ORDER BY created_at DESC",
        [userId]
    );
    return result.rows;
};

// Get single resume
const getResumeById = async (resumeId, userId) => {
    const result = await pool.query(
        "SELECT * FROM resumes WHERE id = $1 AND user_id = $2",
        [resumeId, userId]
    );
    return result.rows[0];
};

// Update resume
const updateResume = async (resumeId, userId, updates) => {
    const {
        name, email, phone, location,
        degree, university, graduationYear, gpa,
        jobTitle, company, workDuration, jobDescription,
        technicalSkills, softSkills
    } = updates;

    const result = await pool.query(
        `UPDATE resumes SET 
            name=$1, email=$2, phone=$3, location=$4, 
            degree=$5, university=$6, graduation_year=$7, gpa=$8,
            job_title=$9, company=$10, work_duration=$11, job_description=$12,
            technical_skills=$13, soft_skills=$14,
            updated_at=NOW()
         WHERE id=$15 AND user_id=$16 RETURNING *`,
        [name, email, phone, location, degree, university, graduationYear, gpa,
         jobTitle, company, workDuration, jobDescription, technicalSkills, softSkills,
         resumeId, userId]
    );

    return result.rows[0];
};

module.exports = {
    createResume,
    getResumesByUser,
    getResumeById,
    updateResume
};

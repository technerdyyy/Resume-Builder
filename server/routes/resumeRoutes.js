const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const resumeController = require("../controllers/resumeController");

const router = express.Router();

router.post("/", protect, resumeController.createResume);
router.get("/", protect, resumeController.getUserResumes);
router.get("/:id", protect, resumeController.getResume);
router.put("/:id", protect, resumeController.updateResume);
router.delete("/:id", protect, resumeController.deleteResume); // Add this line

module.exports = router;

const express = require("express");
const { signup, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/protected", protect, (req, res) => {
    res.json({ message: "This is protected data", user: req.user });
});

router.post("/logout", (req, res) => {
    res.clearCookie("token"); // or whatever cookie name you use for JWT
    res.json({ message: "Logged out successfully" });
});

module.exports = router;

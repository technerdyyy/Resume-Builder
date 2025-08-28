const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
    const token = req.cookies?.token; // ✅ Only check cookies

    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { protect };

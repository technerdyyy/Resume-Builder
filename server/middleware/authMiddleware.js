const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
    let token;

    // 1️⃣ Check cookie
    if (req.cookies?.token) {
        token = req.cookies.token;
    }

    // 2️⃣ Check Authorization header
    else if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

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

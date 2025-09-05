const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const resumeRoutes = require('./routes/resumeRoutes');

dotenv.config();
const app = express();
// Middleware
app.use(cookieParser()); // Move cookieParser before routes
app.use(express.json());
app.use(cors({
    // origin: 'http://localhost:5173', // your frontend URL
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api/auth", authRoutes);

app.use('/api/resumes', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

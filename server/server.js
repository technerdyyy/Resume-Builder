const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors")

dotenv.config();
const app = express();
// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../Models/userModel");

require("dotenv").config();

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(name, email, hashedPassword);

        res.status(201).json({ message: "User created", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } // Use JWT_EXPIRES_IN from .env or default to 24h    
        );

        // Send token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // set to true in production
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            path: '/'
        });

        res.json({ 
            message: "Login successful",
                user: {
                id: user.id,
                name: user.name,
                email: user.email
                // other user fields you need
            }
});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { signup, login };
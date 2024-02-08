// routes/userRouter.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const userRouter = express.Router();

// Signup route
userRouter.post("/signup", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      firstname,
      lastname,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create a JWT token for session management
    const token = jwt.sign({ username: user.username }, JWT_SECRET_KEY);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Protected route example - require authentication using middleware
userRouter.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });

    req.user = user;
    next();
  });
}

module.exports = userRouter;

const express = require("express");
const User = require("../models/User"); // Importing the User model
const { body, validationResult } = require("express-validator"); // Importing express-validator for input validation
const router = express.Router(); // Creating an Express router
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser"); // Importing custom middleware for fetching user details

JWT_SECRET = "HelloIAmHarshShahandIamAStudentAtVITVellore";

router.post(
  "/createuser",
  [
    // Validation middleware for name, email, and password
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Must be a valid email").isEmail(),
    body("password", "Must be at least 5 Characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // Validate input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors exist, return a 400 Bad Request response with the error details
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if a user with the provided email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // If user exists, return a 400 Bad Request response
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }

      // Generate a salt and hash the password for security
      let salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user using the User model
      user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Generate JWT token for authentication
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      // Handle any other errors and return a 500 Internal Server Error response
      console.log(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

router.post(
  "/login",
  [
    // Validation middleware for name, email, and password
    body("email", "Must be a valid email").isEmail(),
    body("password", "Cannot be Blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation errors exist, return a 400 Bad Request response with the error details
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Check if a user with the provided email exists
      let user = await User.findOne({ email });
      if (!user) {
        // If user doesn't exist, return a 400 Bad Request response
        return res
          .status(400)
          .json({ error: "Please try to login with the correct credentials" });
      }

      // Compare the provided password with the stored hashed password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        // If passwords don't match, return a 400 Bad Request response
        return res
          .status(400)
          .json({ error: "Please try to login with the correct credentials" });
      }

      // Generate JWT token for authentication
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      // Handle any other errors and return a 500 Internal Server Error response
      console.log(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userid = await req.user.id;
    // Fetch user details by user ID, excluding the password field
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    // Handle any other errors and return a 500 Internal Server Error response
    console.log(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

module.exports = router; // Export the router for use in other files
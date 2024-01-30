const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes"); // Importing the Notes model
const { body, validationResult } = require("express-validator"); // Importing express-validator for input validation
const fetchuser = require("../middleware/fetchuser"); // Importing custom middleware for fetching user details
const { default: mongoose } = require("mongoose");

router.post(
  "/addnote",
  fetchuser,
  [
    // Validation middleware for title, description, and tag
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Must be a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Validate input using express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If validation errors exist, return a 400 Bad Request response with the error details
        return res.status(400).json({ errors: errors.array() });
      }

      const user = req.user.id;
      // Create a new note using the Notes model
      const note = new Notes({ title, description, tag, user });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occurred");
    }
  }
);

router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    user = req.user.id;
    // Fetch notes belonging to the authenticated user
    savedNotes = await Notes.find({ user });
    res.json(savedNotes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    const note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    if (req.user.id !== note.user.toString()) {
      return res.status(401).send("Not Allowed");
    }

    // Update the note with new values
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ updatedNote });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }
    if (req.user.id !== note.user.toString()) {
      return res.status(401).send("Not Allowed");
    }
    // Delete the note by ID
    const deletedNote = await Notes.findByIdAndDelete(req.params.id);
    res.json({
      Success: "Note has been deleted successfully",
      note: deletedNote,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

router.get("/getnote/:id", fetchuser, async (req, res) => {
  try {
    const note = await Notes.find({id: req.params.id});
    if (!note) {
      res.status(404).send("Not Found");
    }
    for (let index = 0; index < note.length; index++) {
      const element = note[index];
      if (req.user.id !== element.user.toString()) {
        return res.status(401).send("Not Allowed");
      }
    }
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

router.get("/sort/:tag", fetchuser, async (req, res) => {
  try {
    const note = await Notes.find({ tag: req.params.tag });
    if (!note) {
      res.status(404).send("Not Found");
    }
    for (let index = 0; index < note.length; index++) {
      const element = note[index];
      if (req.user.id !== element.user.toString()) {
        return res.status(401).send("Not Allowed");
      }
    }
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Error Occurred");
  }
});

module.exports = router; // Export the router for use in other files

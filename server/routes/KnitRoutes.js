const express = require("express");
const router = express.Router();
const Project = require("../models/KnitModels");
const protect = require("../middleware/authMiddleware"); 

// GET all projects - Protected
router.get("/", protect, async (req, res) => {
    try {
        const projects = await Project.find().sort({ created_at: -1 });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch projects", details: err.message });
    }
});

// GET single project by ID - Protected
router.get("/:id", protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
        return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch project", details: err.message });
    }
});

// POST new project - Protected
router.post("/", protect, async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: "Failed to create project", details: err.message });
    }
});

// PUT update project by ID - Protected
router.put("/:id", protect, async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        });
        if (!updated) {
        return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: "Failed to update project", details: err.message });
    }
});

// DELETE project by ID - Protected
router.delete("/:id", protect, async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);
        if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete project", details: err.message });
    }
});

module.exports = router;

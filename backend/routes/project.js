// server/routes/project.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save user info in request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// 🔹 Add new project
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, department } = req.body;

  try {
    const project = await Project.create({
      user: req.user.userId,
      title,
      description,
      department
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('user', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Delete own project
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await project.remove();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

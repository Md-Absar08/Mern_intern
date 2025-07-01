// server/routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
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

// 🔹 Add Feedback
router.post('/', authMiddleware, async (req, res) => {
  const { projectId, comment, rating } = req.body;

  try {
    const feedback = await Feedback.create({
      projectId,
      userId: req.user.userId,
      comment,
      rating
    });

    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Get Feedback for a project
router.get('/:projectId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ projectId: req.params.projectId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

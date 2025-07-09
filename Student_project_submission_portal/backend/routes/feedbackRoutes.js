const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');

router
  .route('/:id/feedback')
  .get(feedbackController.getFeedback)
  .post(protect, feedbackController.addFeedback);

module.exports = router;
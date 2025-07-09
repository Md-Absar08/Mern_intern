const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(projectController.getProjects)
  .post(protect, projectController.createProject);

router.route('/:id')
  .get(projectController.getProject)
  .put(protect, projectController.updateProject)
  .delete(protect, projectController.deleteProject);

module.exports = router;
const Feedback = require('../models/Feedback');
const Project = require('../models/Project');

 
 
 
exports.addFeedback = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const feedback = await Feedback.create({
      project: req.params.id,
      author: req.user._id,
      comment: req.body.comment,
      rating: req.body.rating,
    });

    res.status(201).json(feedback);
  } catch (err) {
    next(err);
  }
};

 
 
 
exports.getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ project: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(feedback);
  } catch (err) {
    next(err);
  }
};
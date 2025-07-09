const Project = require('../models/Project');

 
 
 
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('author', 'username');
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

 
 
 
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      'author',
      'username'
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

 
 
 
exports.createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      author: req.user._id,
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

 
 
 
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

 
    if (project.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description },
      { new: true, runValidators: true }
    );

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

 
 
 
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

 
    if (project.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await project.remove();

    res.status(200).json({ message: 'Project removed' });
  } catch (err) {
    next(err);
  }
};
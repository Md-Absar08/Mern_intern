const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authController = require('../controllers/authController');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

 
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

 
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

 
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
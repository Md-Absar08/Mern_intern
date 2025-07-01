// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const projectRoutes = require('./routes/project');
app.use('/api/projects', projectRoutes);

const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedback', feedbackRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('API is working!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/mern-app')
.then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection failed:', err.message);
});

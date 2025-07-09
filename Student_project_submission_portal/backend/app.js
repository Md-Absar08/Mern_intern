const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
app.set('trust proxy', 1); // trust first proxy


 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

 
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);

 
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', feedbackRoutes);

 
app.use(errorHandler);

module.exports = app;
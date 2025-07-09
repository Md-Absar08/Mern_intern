require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

 
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

 
  process.on('unhandledRejection', (err, promise) => {
    console.error(`Error: ${err.message}`);
 
    server.close(() => process.exit(1));
  });
});
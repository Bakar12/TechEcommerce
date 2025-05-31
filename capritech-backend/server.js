const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const contentRoutes = require('./routes/contentRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/content', contentRoutes);

// Simple API Test
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect Database and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.error('MongoDB Connection Failed:', error.message));

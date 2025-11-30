const express = require('express');
const cors = require('cors');
require('dotenv').config();

const loginRoutes = require('./routes/login');
const chartRoutes = require('./routes/charts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', loginRoutes);
app.use('/api/charts', chartRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Y15 Clean Energy API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Y15 Clean Energy API',
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Backend is running on port: ${PORT}`);
});

module.exports = app;
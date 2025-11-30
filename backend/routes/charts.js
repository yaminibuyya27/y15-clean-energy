const express = require('express');
const router = express.Router();
const db = require('../config/database');
const authenticateToken = require('../middleware/auth');

router.get('/investments', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT year, technology, investment_billions, color FROM energy_investments ORDER BY year, technology'
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching investment data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching investment data',
      error: error.message
    });
  }
});

router.get('/regional', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT region, year, capacity_mw, color FROM regional_capacity ORDER BY year, region'
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching regional data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching regional data',
      error: error.message
    });
  }
});

module.exports = router;
// filepath: 
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error('Appointment creation error:', err.message, req.body);
    res.status(400).json({ message: 'Failed to create appointment', error: err.message });
  }
});

// Get appointments (optionally filter by email)
router.get('/', async (req, res) => {
  const { email } = req.query;
  try {
    const query = email ? { email } : {};
    const appointments = await Appointment.find(query);
    res.json(appointments);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
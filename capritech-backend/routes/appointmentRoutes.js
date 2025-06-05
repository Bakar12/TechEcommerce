const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Create appointment with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
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
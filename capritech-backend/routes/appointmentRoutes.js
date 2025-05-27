const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

// POST /api/appointments
router.post('/', async (req, res) => {
  const { name, email, phone, service, date, time, notes } = req.body;

  try {
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      service,
      date,
      time,
      notes,
    });

    await newAppointment.save();

    // Send confirmation email (optional)
    // Configure your email transporter and send email here

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;

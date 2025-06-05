import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const services = [
    'Screen Repair',
    'Battery Replacement',
    'Software Installation',
    'Virus Removal',
    'Hardware Upgrade',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append('image', image);

      await axios.post('/api/appointments', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Appointment booked successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: '',
      });
      setImage(null);
    } catch (error) {
      setMessage('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book a Repair Appointment</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a Service</option>
          {services.map((service, idx) => (
            <option key={idx} value={service}>
              {service}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="notes"
          placeholder="Additional Notes (Optional)"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
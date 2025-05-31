import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CustomerAppointmentsPage.css';

const CustomerAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ service: '', date: '', time: '', notes: '' });
  const [message, setMessage] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userInfo) return;
      const { data } = await axios.get(`http://localhost:5000/api/appointments?email=${userInfo.email}`);
      setAppointments(data);
    };
    fetchAppointments();
  }, [userInfo, message]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/appointments', {
        ...formData,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
      });
      setMessage('Appointment booked!');
      setFormData({ service: '', date: '', time: '', notes: '' });
    } catch {
      setMessage('Booking failed.');
    }
  };

  return (
    <div className="appointments-container">
      <div className="appointments-form-card">
        <h2>Book a New Appointment</h2>
        {message && <div className="appointments-message">{message}</div>}
        <form className="appointments-form" onSubmit={handleSubmit}>
          <div className="appointments-field">
            <label>Service</label>
            <input name="service" placeholder="Service" value={formData.service} onChange={handleChange} required />
          </div>
          <div className="appointments-field">
            <label>Date</label>
            <input name="date" type="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="appointments-field">
            <label>Time</label>
            <input name="time" type="time" value={formData.time} onChange={handleChange} required />
          </div>
          <div className="appointments-field">
            <label>Notes</label>
            <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
          </div>
          <button className="appointments-btn" type="submit">Book Appointment</button>
        </form>
      </div>
      <div className="appointments-list-card">
        <h3>My Appointments</h3>
        <ul className="appointments-list">
          {appointments.length === 0 && <li className="appointments-empty">No appointments yet.</li>}
          {appointments.map((a) => (
            <li key={a._id} className="appointments-item">
              <div>
                <span className="appointments-service">{a.service}</span>
                <span className="appointments-date">{a.date} at {a.time}</span>
              </div>
              {a.notes && <div className="appointments-notes">Notes: {a.notes}</div>}
              <div className="appointments-meta">
                <span>Status: <b>Booked</b></span>
                <span>Booked on: {new Date(a.createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerAppointmentsPage;
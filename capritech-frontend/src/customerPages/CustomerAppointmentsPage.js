import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CustomerAppointmentsPage.css';

const CustomerAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ service: '', date: '', time: '', notes: '' });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // --- Date Range Logic ---
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 30);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userInfo) return;
      const { data } = await axios.get(`http://localhost:5000/api/appointments`);
      setAppointments(data);
    };
    fetchAppointments();
  }, [userInfo, message]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };
  const handleImageChange = (e) => setImage(e.target.files[0]);

  // --- Check for double-booking ---
  const isSlotTaken = appointments.some(
    (a) => a.date === formData.date && a.time === formData.time && a.status !== 'Cancelled'
  );

  // --- Appointment Cancellation ---
  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      setLoading(true);
      await axios.patch(`http://localhost:5000/api/appointments/${id}/status`, { status: 'Cancelled' });
      setMessage('Appointment cancelled.');
    } catch {
      setError('Failed to cancel appointment.');
    } finally {
      setLoading(false);
    }
  };

  // --- Form Validation ---
  const isFormValid =
    userInfo &&
    userInfo.phone &&
    formData.service &&
    formData.date &&
    formData.time &&
    !isSlotTaken &&
    formData.date >= minDate &&
    formData.date <= maxDate;

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!isFormValid) {
      setError(
        isSlotTaken
          ? 'This date and time is already booked. Please choose another slot.'
          : 'Please fill in all required fields including your phone number.'
      );
      return;
    }
    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', userInfo.name);
      data.append('email', userInfo.email);
      data.append('phone', userInfo.phone);
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append('image', image);

      await axios.post('http://localhost:5000/api/appointments', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Appointment booked!');
      setFormData({ service: '', date: '', time: '', notes: '' });
      setImage(null);
    } catch {
      setError('Booking failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointments-container">
      <div className="appointments-form-card">
        <h2>Book a New Appointment</h2>
        {error && <div className="appointments-message" style={{ color: 'red' }}>{error}</div>}
        {message && <div className="appointments-message">{message}</div>}
        <form className="appointments-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="appointments-field">
            <label>Your Phone Number</label>
            <input value={userInfo?.phone || ''} disabled />
            {!userInfo?.phone && (
              <div style={{ color: 'red' }}>
                Please update your phone number in <a href="/customer/dashboard">My Account</a> before booking.
              </div>
            )}
          </div>
          <div className="appointments-field">
            <label>Service</label>
            <input name="service" placeholder="Service" value={formData.service} onChange={handleChange} required />
          </div>
          <div className="appointments-field">
            <label>Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={minDate}
              max={maxDate}
            />
          </div>
          <div className="appointments-field">
            <label>Time</label>
            <input name="time" type="time" value={formData.time} onChange={handleChange} required />
          </div>
          <div className="appointments-field">
            <label>Notes</label>
            <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
          </div>
          <div className="appointments-field">
            <label>Upload Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {isSlotTaken && (
            <div style={{ color: 'red' }}>
              This date and time is already booked. Please choose another slot.
            </div>
          )}
          <button className="appointments-btn" type="submit" disabled={!isFormValid || loading}>
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
      <div className="appointments-list-card">
        <h3>My Appointments</h3>
        <ul className="appointments-list">
          {appointments.length === 0 && <li className="appointments-empty">No appointments yet.</li>}
          {appointments
            .filter((a) => a.email === userInfo.email && a.status !== 'Cancelled') // <-- filter out cancelled
            .map((a) => (
              <li key={a._id} className="appointments-item">
                <div>
                  <span className="appointments-service">{a.service}</span>
                  <span className="appointments-date">{a.date} at {a.time}</span>
                </div>
                {a.notes && <div className="appointments-notes">Notes: {a.notes}</div>}
                <div className="appointments-meta">
                  <span>Status: <b>{a.status || 'Booked'}</b></span>
                  <span>Booked on: {new Date(a.createdAt).toLocaleString()}</span>
                </div>
                {a.image && (
                  <div>
                    <img src={`http://localhost:5000${a.image}`} alt="Problem" style={{ maxWidth: 200, marginTop: 8 }} />
                  </div>
                )}
                {(!a.status || a.status === 'Booked' || a.status === 'Pending') && (
                  <button
                    className="appointments-btn"
                    style={{ background: '#e60023', marginTop: 8 }}
                    onClick={() => handleCancelAppointment(a._id)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerAppointmentsPage;
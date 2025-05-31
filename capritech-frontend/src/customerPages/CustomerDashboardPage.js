import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CustomerDashboardPage.css';

const CustomerDashboardPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (userInfo) {
      setFormData({ name: userInfo.name, email: userInfo.email, phone: userInfo.phone });
    }
  }, [userInfo]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = userInfo.token;
      await axios.put(
        `http://localhost:5000/api/users/${userInfo._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Profile updated!');
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...formData }));
    } catch {
      setMessage('Update failed.');
    }
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <div className="account-avatar">
          <span>{formData.name.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className="account-title">My Account</h2>
        <form className="account-form" onSubmit={handleSubmit}>
          <div className="account-field">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="account-field">
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="account-field">
            <label>Phone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <button className="account-btn" type="submit">Update</button>
        </form>
        {message && <div className="account-message">{message}</div>}
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CustomerDashboardPage.css';

const CustomerDashboardPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || ''
      });
    }
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      name: userInfo.name || '',
      email: userInfo.email || '',
      phone: userInfo.phone || ''
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to update your account details?')) return;
    try {
      const token = userInfo.token;
      const { data } = await axios.put(
        `http://localhost:5000/api/users/${userInfo._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Profile updated!');
      // Update localStorage with new info (including phone)
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...formData }));
      setEditing(false);
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
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={!editing}
            />
          </div>
          <div className="account-field">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={!editing}
            />
          </div>
          <div className="account-field">
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={!editing}
            />
          </div>
          {!editing ? (
            <button className="account-btn" type="button" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <>
              <button className="account-btn" type="submit">Save</button>
              <button className="account-btn" type="button" onClick={handleCancel} style={{ background: '#ccc', color: '#222', marginLeft: 8 }}>
                Cancel
              </button>
            </>
          )}
        </form>
        {message && <div className="account-message">{message}</div>}
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  // Removed unused message state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.includes('@')) {
      setError('Invalid email format.');
      return;
    }

    if (!/^\d{10,15}$/.test(formData.phone)) {
      setError('Phone number must be 10–15 digits.');
      return;
    }

    if (!notRobot) {
      setError('Please confirm you are not a robot.');
      return;
    }

    if (!agreed) {
      setError('You must agree to terms & conditions.');
      return;
    }

    try {
      const res = await register(formData);
      localStorage.setItem('userInfo', JSON.stringify(res));
      navigate(res.isAdmin ? '/admin/dashboard' : '/customer/dashboard');
    } catch (err) {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>
        {error && <p className="error">{error}</p>}
        {/* Removed unused message display */}

        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <div className={`password-strength ${passwordStrength}`}>
          Strength: {passwordStrength.toUpperCase()}
        </div>

        <label>
          <input type="checkbox" checked={notRobot} onChange={() => setNotRobot(!notRobot)} />
          I'm not a robot
        </label>

        <label>
          <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
          I agree to the terms and conditions
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

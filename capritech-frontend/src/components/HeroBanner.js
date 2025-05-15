import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroBanner.css';
const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h1>Welcome to CapriTech</h1>
        <p>Your one-stop shop for performance parts & repairs.</p>
        <Link to="/customer/dashboard">
          <button className="hero-button">Shop Now</button>
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;

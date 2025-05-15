import React from 'react';
import '../styles/PromotionsSection.css'; 
import { Link } from 'react-router-dom';

const PromotionsSection = () => {
  return (
    <section className="promo-section">
      <h2>Current Promotions</h2>
      <div className="promo-cards">
        <div className="promo-card">
          <h3>🎯 GPU Upgrade Bundle</h3>
          <p>Boost your rig with 10% off GPUs + install service!</p>
          <Link to="/customer/dashboard">
            <button>Shop Now</button>
          </Link>
        </div>
        <div className="promo-card">
          <h3>🛠 Free Diagnostics</h3>
          <p>Bring your PC in for a free checkup — limited time only.</p>
          <Link to="/customer/dashboard">
            <button>Book Service</button>
          </Link>
        </div>
        <div className="promo-card">
          <h3>🔥 Summer Cooling Deals</h3>
          <p>Up to 15% off CPU coolers and case fans!</p>
          <Link to="/customer/dashboard">
            <button>View Products</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;

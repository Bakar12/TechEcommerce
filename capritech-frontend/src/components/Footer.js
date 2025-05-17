import React from 'react';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>CapriTech</h2>
          <p>Building performance, powering innovation.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/customer/dashboard">My Account</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@capritech.com</p>
          <p>Phone: +44 20 1234 5678</p>
          <p>London, UK</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CapriTech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

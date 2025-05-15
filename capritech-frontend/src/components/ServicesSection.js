import React from 'react';
import '../styles/ServicesSection.css';

const services = [
  {
    icon: '🧰',
    title: 'Tech Repair',
    description: 'We fix PCs, laptops, and gaming systems quickly and professionally.',
  },
  {
    icon: '⚙️',
    title: 'Custom Builds',
    description: 'Build your dream gaming or work PC with expert guidance.',
  },
  {
    icon: '🔍',
    title: 'Free Diagnostics',
    description: 'Not sure what’s wrong? We’ll check your system — no charge.',
  },
  {
    icon: '💡',
    title: 'Upgrade Advice',
    description: 'Need better performance? We’ll help you choose the right parts.',
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services">
      <h2>Our Services</h2>
      <p>
        We offer a wide range of services, catering not only to cars but also to other vehicles. Our dedicated team is committed to providing the best service for all your vehicle needs.
      </p>
      
      <div className="service-item">
        <i className="fas fa-car"></i>
        <h3>Car Services</h3>
        <p>
          From routine maintenance to major repairs, we've got your car covered. Our experienced technicians ensure your car runs smoothly.
        </p>
      </div>

      <div className="service-item">
        <i className="fas fa-bicycle"></i>
        <h3>Bicycle Services</h3>
        <p>
          We don't just stop at cars; we also offer expert services for bicycles. Keep your bike in top condition for your adventures.
        </p>
      </div>

      <div className="service-item">
        <i className="fas fa-motorcycle"></i>
        <h3>Motorcycle Services</h3>
        <p>
          Motorcycle enthusiasts, rejoice! We provide comprehensive services to keep your ride safe and enjoyable.
        </p>
      </div>

      <div className="service-item">
        <i className="fas fa-truck"></i>
        <h3>Truck Services</h3>
        <p>
          Need servicing for your trucks? We offer professional services to keep your fleet on the road and in top shape.
        </p>
      </div>
    </div>
  );
};

export default Services;

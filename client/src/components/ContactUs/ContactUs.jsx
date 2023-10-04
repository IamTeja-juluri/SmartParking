import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <p>
        We'd love to hear from you! Feel free to reach out to us through any of the following methods:
      </p>

      <div className="social-links">
        <a href="mailto:info@example.com" target="_blank" rel="noopener noreferrer">
          <i className="far fa-envelope"></i> Email
        </a>
        <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i> Twitter
        </a>
        <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i> Facebook
        </a>
        <a href="https://www.linkedin.com/in/example" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i> Instagram
        </a>
      </div>

      <p>
        Whether you have questions, feedback, or just want to say hello, we're here to listen. Connect with us on
        social media or drop us an email. We'll get back to you as soon as possible.
      </p>

      <p>
        Don't forget to follow us on social media to stay updated with our latest news, events, and promotions.
      </p>
    </div>
  );
};

export default ContactUs;

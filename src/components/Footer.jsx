
import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import './Header.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
        </div>
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>&copy;RK2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";

import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>Drink<span>It</span></h2>
          <p>
            Fast delivery of your favorite beverages with a smooth
            shopping experience.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/home">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>📍 Visakhapatnam</p>
          <p>📞 +91 98765 43210</p>
          <p>✉ support@drinkit.com</p>
        </div>

        <div className="footer-social">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <FaFacebook />

            <FaInstagram />

            <FaTwitter />

            <FaLinkedin />

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 DrinkIt. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="movie-footer">
        <div className="container">
          {/* Main Footer Content */}
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-section">
              <h3 className="footer-brand">TaluxMax</h3>
              <p className="footer-description">
                Your ultimate destination for movies, TV shows, and exclusive
                content. Stream anytime, anywhere on all your devices.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Browse</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Movies</a>
                </li>
                <li>
                  <a href="#">TV Shows</a>
                </li>
                <li>
                  <a href="#">New Releases</a>
                </li>
                <li>
                  <a href="#">Trending</a>
                </li>
                <li>
                  <a href="#">Coming Soon</a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h4>Genres</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Action</a>
                </li>
                <li>
                  <a href="#">Comedy</a>
                </li>
                <li>
                  <a href="#">Drama</a>
                </li>
                <li>
                  <a href="#">Horror</a>
                </li>
                <li>
                  <a href="#">Sci-Fi</a>
                </li>
                <li>
                  <a href="#">Documentary</a>
                </li>
              </ul>
            </div>

            {/* Support & Legal */}
            <div className="footer-section">
              <h4>Support</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Device Support</a>
                </li>
              </ul>
            </div>

            {/* App Download */}
            <div className="footer-section">
              <h4>Get the App</h4>
              <div className="app-download">
                <a href="#" className="app-store">
                  <FaApple />
                  <div>
                    <span>Download on the</span>
                    <strong>App Store</strong>
                  </div>
                </a>
                <a href="#" className="google-play">
                  <FaGooglePlay />
                  <div>
                    <span>Get it on</span>
                    <strong>Google Play</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="newsletter-section">
            <div className="newsletter-content">
              <h4>Stay Updated</h4>
              <p>Get the latest movie news and exclusive offers</p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright">
                &copy; 2024 TaluxMax. All rights reserved.
              </div>
              <div className="legal-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
                <a href="#">Do Not Sell My Info</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

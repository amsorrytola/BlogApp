import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <Logo width="100px" />
                </div>
                <div>
                  <p>&copy; Copyright 2023. All Rights Reserved by DevUI.</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3>Company</h3>
                <ul>
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Affiliate Program</li>
                  <li>Press Kit</li>
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h3>Support</h3>
                <ul>
                  <li>Account</li>
                  <li>Help</li>
                  <li>Contact Us</li>
                  <li>Customer Support</li>
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h3>Legals</h3>
                <ul>
                  <li>Terms &amp; Conditions</li>
                  <li>Privacy Policy</li>
                  <li>Licensing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;

import React from "react";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Logo width="100px" />
          <p className="mt-4">&copy; 2023 DevUI. All Rights Reserved.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>Features</li>
            <li>Pricing</li>
            <li>Affiliate Program</li>
            <li>Press Kit</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li>Account</li>
            <li>Help</li>
            <li>Contact Us</li>
            <li>Customer Support</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Legals</h3>
          <ul className="space-y-2">
            <li>Terms &amp; Conditions</li>
            <li>Privacy Policy</li>
            <li>Licensing</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

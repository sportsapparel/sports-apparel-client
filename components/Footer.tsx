"use client";
import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#FCF6F2]">
      <div className="container-c">
        <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8  sm-to-xs:grid-cols-1 sm-to-xs:px-20 py-10">
          {/* Customer Care Section */}
          <div>
            <h4 className="text-textColor mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  Store Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-textColor mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* The Company Section */}
          <div>
            <h4 className="text-textColor mb-4">The Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="text-textColor hover:text-btnHoverColor">
                  Store Locator
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup Section */}
          <div>
            <h4 className="text-textColor mb-4">Sign up for special offers</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-textColor text-sm mb-2"
                >
                  Enter your email here *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-btnColor"
                />
              </div>
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="subscribe"
                  required
                  className="mt-1"
                />
                <label htmlFor="subscribe" className="text-sm text-textColor">
                  Yes, subscribe me to your newsletter *
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-btnColor text-white py-2 px-4 rounded hover:bg-btnHoverColor transition-colors duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
      </div>
      <div className=" bg-[#5D6956] text-center text-sm text-white p-3 ">
        <p>© 2035 by ETHKL. Powered and secured by Wix</p>
      </div>
    </footer>
  );
};

export default Footer;

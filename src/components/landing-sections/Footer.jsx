import React from 'react';
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <div className="text-2xl font-bold">
                Anga<span className="text-emerald-400">Grow</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering farmers with smart technology for sustainable agriculture and maximum yields.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Testimonials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Products</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Smart Monitoring</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Precision Irrigation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Market Insights</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Financial Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Crop Advisory</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition">Mobile App</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-emerald-400" />
                <span className="text-gray-400">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-emerald-400" />
                <span className="text-gray-400">+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-emerald-400" />
                <span className="text-gray-400">hello@agnagrow.com</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="font-bold mb-3">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white outline-none"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AngaGrow. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
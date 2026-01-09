import React, { useState } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <FaLeaf className="text-white text-2xl" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                Agna<span className="text-emerald-600">Grow</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 font-medium">
              Home
            </Link>
            <a href="#features" className="text-gray-700 hover:text-emerald-600 font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-emerald-600 font-medium">
              Pricing
            </a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-emerald-600 font-medium py-2 px-4"
            >
              Log In
            </Link>
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                Home
              </Link>
              <a 
                href="#features" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                Pricing
              </a>
              <a 
                href="#about" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                About
              </a>
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-emerald-600 font-medium py-3 text-center"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl text-center"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
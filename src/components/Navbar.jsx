import React, { useState } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <FaLeaf className="text-white text-2xl" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              Agna<span className="text-emerald-600">Grow</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium">Features</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium">How It Works</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium">About</a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-700 hover:text-emerald-600 font-medium py-2 px-4">
              Log In
            </button>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
              Start Free Trial
            </button>
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
              <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium py-2">Home</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium py-2">Features</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium py-2">How It Works</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium py-2">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium py-2">About</a>
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
                <button className="text-gray-700 hover:text-emerald-600 font-medium py-3">
                  Log In
                </button>
                <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
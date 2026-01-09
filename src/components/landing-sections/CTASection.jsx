import React from 'react';
import { FiCheckCircle, FiArrowRight, FiMail, FiPhone } from 'react-icons/fi';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

const CTASection = () => {
  const benefits = [
    "30-day free trial with full access",
    "No credit card required to start",
    "Dedicated onboarding specialist",
    "24/7 customer support",
    "Mobile app included",
    "Cancel anytime"
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 opacity-95"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 bottom-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Your 
                <span className="text-amber-300"> Smart Farming</span> 
                Journey Today
              </h2>
              
              <p className="text-xl text-emerald-100 mb-8">
                Join thousands of successful farmers who have already transformed 
                their operations with AgnaGrow. It's time to grow smarter.
              </p>
              
              {/* Benefits List */}
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-white">
                    <FiCheckCircle className="text-emerald-300" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FiPhone className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-emerald-200">Call Us</div>
                    <div className="font-semibold">+254 700 123 456</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FiMail className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-emerald-200">Email Us</div>
                    <div className="font-semibold">hello@agnagrow.com</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Signup Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Start Your Free Trial
              </h3>
              
              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="John Kamau"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+254 712 345 678"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Farm Size (Acres)
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition">
                    <option>Select farm size</option>
                    <option>1-10 Acres</option>
                    <option>11-50 Acres</option>
                    <option>51-100 Acres</option>
                    <option>100+ Acres</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="ml-2 text-gray-700 text-sm">
                      I agree to receive updates and marketing communications
                    </span>
                  </label>
                </div>
                
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                  Start Free 30-Day Trial
                  <FiArrowRight className="text-xl" />
                </button>
                
                <div className="text-center text-gray-600 text-sm">
                  No credit card required • Cancel anytime
                </div>
              </div>
              
              {/* Social Proof */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">1,234</span> farmers signed up this week
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FaWhatsapp className="text-emerald-600" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaTelegram className="text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-emerald-100 mb-6">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl border border-white/30 transition-all duration-300">
                Schedule a Demo
              </button>
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                Download Brochure
              </button>
              <button className="bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-xl border border-white transition-all duration-300">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
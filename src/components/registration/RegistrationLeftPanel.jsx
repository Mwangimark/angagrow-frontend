import React from "react";

const RegistrationLeftPanel = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center p-10 bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-600 text-white">
      {/* Brand Logo */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-emerald-700">AG</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-center mb-2">AngaGrow</h1>
        <p className="text-emerald-100 text-center opacity-90">Smart Farming Solutions</p>
      </div>

      {/* Catchy Tagline */}
      <div className="mb-10 max-w-lg">
        <h2 className="text-5xl font-bold text-center mb-6 leading-tight">
          Grow Smarter,
          <span className="block text-emerald-100">Harvest Better</span>
        </h2>
        <p className="text-lg text-center text-emerald-100 opacity-90 mb-8">
          Join thousands of farmers who are transforming agriculture with AI-driven insights and data analytics.
        </p>
      </div>

      {/* Features List */}
      <div className="space-y-6 max-w-md">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1">AI-Powered Insights</h4>
            <p className="text-emerald-100 opacity-90">Get real-time crop health analysis and predictions</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1">Drone Analytics</h4>
            <p className="text-emerald-100 opacity-90">High-resolution field mapping and monitoring</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1">Global Community</h4>
            <p className="text-emerald-100 opacity-90">Connect with farmers, buyers, and experts worldwide</p>
          </div>
        </div>
      </div>


      {/* Stats */}
      <div className="mt-8 flex justify-center space-x-8">
        <div className="text-center">
          <div className="text-2xl font-bold">10,000+</div>
          <div className="text-sm text-emerald-200">Active Farmers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">40%</div>
          <div className="text-sm text-emerald-200">Avg. Yield Increase</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">24/7</div>
          <div className="text-sm text-emerald-200">Support</div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationLeftPanel;
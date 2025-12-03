import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/profile", label: "Profile", icon: "👤" },
    { path: "/crop-analysis", label: "Crop Analysis", icon: "🌱" },
    { path: "/orders", label: "Orders", icon: "📦" },
    { path: "/reports", label: "Reports", icon: "📋" },
    { path: "/drone-sprays", label: "Drone Sprays", icon: "🚁" },
    { path: "/community", label: "Community", icon: "👥" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-gradient-to-b from-green-800 to-emerald-900 h-screen text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} relative`}>
      
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white text-emerald-700 p-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Header */}
      <div className="p-6 border-b border-emerald-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-lg font-bold text-emerald-700">AG</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">AngaGrow</h1>
              <p className="text-emerald-200 text-sm">Smart Farming</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive(item.path)
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-emerald-100 hover:bg-emerald-700 hover:text-white hover:shadow-md"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {!isCollapsed && (
              <span className="font-medium transition-opacity duration-200">
                {item.label}
              </span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="bg-emerald-700/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">User Farmer</p>
                <p className="text-emerald-200 text-xs truncate">Premium Plan</p>
              </div>
            </div>
            <button className="w-full mt-3 bg-white/20 hover:bg-white/30 text-white text-sm py-2 rounded-lg transition-colors duration-200">
              Account Settings
            </button>
          </div>
        </div>
      )}

      {/* Collapsed User Icon */}
      {isCollapsed && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center cursor-pointer group relative">
            <span className="text-white font-semibold">U</span>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              User Profile
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
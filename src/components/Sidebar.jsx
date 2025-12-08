import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout, getUser } from "../utils/auth";

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = getUser();
  const selectedRole = user?.login_selected_role || user?.role || 'farmer';

  // Binary check: Is the user a farmer?
  const isFarmer = selectedRole === 'farmer';

  // Two menu sets: Farmer vs Non-Farmer (financier/buyer)
  const menuItems = isFarmer ? [
    // Farmer Menu
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/profile", label: "Profile", icon: "👤" },
    { path: "/crop-analysis", label: "Crop Analysis", icon: "🌱" },
    { path: "/field-mapping", label: "Field Mapping", icon: "🗺️" },
    { path: "/dronesprays", label: "Drone Sprays", icon: "🚁" },
    { path: "/community", label: "Community", icon: "👥" },
  ] : [
    // Non-Farmer Menu (Financier/Buyer)
    { path: "/home", label: "Home", icon: "🏠" },
    { path: "/dashboard", label: "Farm & Projects", icon: "🌱" },
    { path: "/market-analysis", label: "Recommender", icon: "🤖" },
    { path: "/transactions", label: "Financing Requests", icon: "💰" },
    { path: "/reports", label: "Performance", icon: "📈" },
    { path: "/documents", label: "Community", icon: "👥" },
    { path: "/portfolio", label: "Reports", icon: "📋" },
    { path: "/contracts", label: "User Settings", icon: "⚙️" },
  ];

  // Two color schemes
  const colors = isFarmer ? {
    // Farmer: Green theme
    bgFrom: "from-green-800",
    bgTo: "to-emerald-900",
    activeBg: "bg-emerald-600",
    hoverBg: "hover:bg-emerald-700",
    textLight: "text-emerald-100",
    textDark: "text-emerald-200",
    border: "border-emerald-700",
    accent: "bg-emerald-500",
    iconColor: "text-emerald-700",
  } : {
    // Non-Farmer: Blue theme (for both financier and buyer)
    bgFrom: "from-blue-800",
    bgTo: "to-indigo-900",
    activeBg: "bg-blue-600",
    hoverBg: "hover:bg-blue-700",
    textLight: "text-blue-100",
    textDark: "text-blue-200",
    border: "border-blue-700",
    accent: "bg-blue-500",
    iconColor: "text-blue-700",
  };

  // Two dashboard titles
  const dashboardTitle = isFarmer
    ? "🌾 Farm Dashboard"
    : selectedRole === 'financier'
      ? "💰 Investment Dashboard"
      : "🛒 Purchase Dashboard";

  // Role avatar
  const roleAvatar = isFarmer
    ? "👨‍🌾"
    : selectedRole === 'financier'
      ? "💼"
      : "🛒";

  // Role description
  const roleDescription = isFarmer
    ? "Manage your farm, analyze crops, and schedule activities"
    : selectedRole === 'financier'
      ? "Monitor investments and market opportunities"
      : "Browse crops, manage orders, and track quality";

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      className={`bg-gradient-to-b ${colors.bgFrom} ${colors.bgTo} h-screen text-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        } relative flex flex-col`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-6 bg-white ${colors.iconColor} p-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10`}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Header */}
      <div className={`p-6 border-b ${colors.border}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${colors.accent} rounded-lg flex items-center justify-center shadow-lg`}>
            <span className="text-lg font-bold text-white">{roleAvatar}</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">AngaGrow</h1>
              <p className={`${colors.textDark} text-sm`}>
                {dashboardTitle}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
              ? `${colors.activeBg} text-white shadow-lg`
              : `${colors.textLight} ${colors.hoverBg} hover:text-white hover:shadow-md`
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
        <div className="px-4 pb-4">
          <div className={`${colors.activeBg}/20 backdrop-blur-sm rounded-xl p-4 border ${colors.border}`}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${colors.accent} rounded-full flex items-center justify-center`}>
                <span className="text-white text-lg">
                  {roleAvatar}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                </p>
                <p className={`${colors.textDark} text-xs truncate`}>
                  {roleDescription}
                </p>
              </div>
            </div>
            <button
              className={`w-full mt-3 bg-white/20 hover:bg-white/30 text-white text-sm py-2 rounded-lg transition-colors duration-200`}
              onClick={() => window.location.href = '/login?switch=true'}
            >
              Switch Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Collapsed User Icon */}
      {isCollapsed && (
        <div className="px-4 pb-4 flex justify-center">
          <div className={`w-10 h-10 ${colors.accent} rounded-full flex items-center justify-center cursor-pointer group relative`}>
            <span className="text-white text-lg">
              {roleAvatar}
            </span>
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className={`mt-auto border-t ${colors.border} p-4`}>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${isLoggingOut
            ? "bg-red-700/50 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 hover:shadow-lg"
            }`}
        >
          {isLoggingOut ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {!isCollapsed && <span>Logging out...</span>}
            </>
          ) : (
            <>
              <span className="text-lg">🚪</span>
              {!isCollapsed && <span>Logout</span>}
            </>
          )}

          {/* Tooltip for collapsed state */}
          {isCollapsed && !isLoggingOut && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
import React from "react";

const LoginRoleOption = ({ title, icon, description, color, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl p-4 cursor-pointer transition-all duration-200 border-2 ${
        isSelected 
          ? `border-emerald-500 bg-gradient-to-br ${color} text-white transform scale-105 shadow-lg`
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
      
      <div className="flex flex-col items-center text-center">
        <div className={`text-3xl mb-2 ${isSelected ? 'text-white' : 'text-gray-700'}`}>
          {icon}
        </div>
        <h3 className={`font-semibold text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className={`text-xs ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>
      
      {/* Selection indicator */}
      <div className={`mt-3 h-1 rounded-full transition-all duration-200 ${
        isSelected ? 'bg-white' : 'bg-transparent'
      }`}></div>
    </div>
  );
};

export default LoginRoleOption;
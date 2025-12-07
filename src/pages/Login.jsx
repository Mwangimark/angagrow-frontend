import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginRoleSelector from "../components/login/LoginRoleSelector";
import LoginForm from "../components/login/LoginForm";
import { isAuthenticated, getUser } from "../utils/auth";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("farmer");
  const navigate = useNavigate();

  // Redirect if already logged in - BASED ON USER ROLE
  useEffect(() => {
    if (isAuthenticated()) {
        navigate("/dashboard"); // ✅ Always /dashboard
    }
}, [navigate]);

  const handleLogin = (data) => {
    console.log("Login successful:", data);
    // LoginForm already handles the API call and redirection
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 w-full"></div>
          
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to access your farming dashboard</p>
            </div>

            {/* Role selector */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Select Your Role</h3>
              <LoginRoleSelector
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
              />
            </div>

            {/* Login form */}
            <LoginForm selectedRole={selectedRole} onSubmit={handleLogin} />

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">or continue with</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-xl py-2.5 hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-xl py-2.5 hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>

            {/* Footer links */}
            <div className="text-center">
              <a href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200">
                Forgot password?
              </a>
              <p className="text-gray-600 text-sm mt-4">
                Don't have an account?{' '}
                <a href="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Stats footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 text-gray-500 text-sm">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>24/7 Support</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>99.9% Uptime</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Secure Login</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
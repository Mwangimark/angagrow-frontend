import React, { useState } from "react";

const LoginForm = ({ selectedRole, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      try {
        // Call the login API
        const response = await fetch('http://localhost:8000/accounts/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.errors) {
            setErrors(data.errors);
          } else if (data.message) {
            setErrors({ general: data.message });
          } else {
            setErrors({ general: 'Login failed. Please try again.' });
          }
          setIsLoading(false);
          return;
        }

        // ✅ CRITICAL: Save tokens to localStorage
        if (data.success && data.tokens && data.user) {
          console.log('💾 Saving tokens and selected role...');

          localStorage.setItem('access_token', data.tokens.access);
          localStorage.setItem('refresh_token', data.tokens.refresh);

          // ✅ Save user data WITH selected role
          const userWithSelectedRole = {
            ...data.user,
            login_selected_role: selectedRole // ✅ Store selected role
          };
          localStorage.setItem('user', JSON.stringify(userWithSelectedRole));

          // Call parent onSubmit
          if (onSubmit) {
            onSubmit(data);
          }

          // ✅ Use window.location.href for immediate redirect
          // ✅ Redirect based on SELECTED role at login time
          setTimeout(() => {
            console.log('🔀 Redirecting to unified dashboard for role:', selectedRole);
            window.location.href = '/dashboard'; // ✅ Always /dashboard
          }, 100);
        } else {
          setErrors({ general: 'Invalid response from server' });
        }

      } catch (error) {
        console.error('Login error:', error);
        setErrors({ general: 'Network error. Please check your connection.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Role indicator */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">You're signing in as</p>
            <p className="text-lg font-semibold text-emerald-700 capitalize">
              {selectedRole}
            </p>
          </div>
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-600 text-sm font-bold">
              {selectedRole?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            name="email"
            type="email"
            className={`pl-10 w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.email
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-300'
              }`}
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            name="password"
            type="password"
            className={`pl-10 w-full border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.password
              ? 'border-red-300 focus:ring-red-500'
              : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-300'
              }`}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Remember me & Forgot password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <a href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          Forgot password?
        </a>
      </div>

      {/* General Error Message */}
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-600 text-center">{errors.general}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3.5 px-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:-translate-y-0.5 ${isLoading
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing In...
          </div>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
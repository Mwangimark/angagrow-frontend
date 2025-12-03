import React, { useState } from "react";


const RegistrationForm = () => {
    const [selectedRole, setSelectedRole] = useState("farmer");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);
    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength += 1;
        if (/[A-Z]/.test(pass)) strength += 1;
        if (/[0-9]/.test(pass)) strength += 1;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
        setPasswordStrength(strength);
    };

    const handleRegister = (data) => {
        console.log("Registration Data:", data);
        setIsSubmitted(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }

        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength === 0) return "bg-gray-200";
        if (passwordStrength === 1) return "bg-red-500";
        if (passwordStrength === 2) return "bg-yellow-500";
        if (passwordStrength === 3) return "bg-blue-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (passwordStrength === 0) return "Very weak";
        if (passwordStrength === 1) return "Weak";
        if (passwordStrength === 2) return "Fair";
        if (passwordStrength === 3) return "Good";
        return "Strong";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));

            const submissionData = {
                ...formData,
                role: selectedRole
            };

            handleRegister(submissionData);
            setIsLoading(false);
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[1-9][\d]{0,14}$/;

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (passwordStrength < 3) {
            newErrors.password = 'Password is too weak';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to AngaGrow!</h3>
                    <p className="text-gray-600 mb-6">
                        Your account as a <span className="font-semibold capitalize">{selectedRole}</span> has been created.
                    </p>
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 mb-3"
                    >
                        Go to Dashboard
                    </button>
                    <button
                        onClick={() => {
                            setFormData({
                                firstName: '',
                                lastName: '',
                                email: '',
                                phone: '',
                                password: '',
                                confirmPassword: '',
                            });
                            setErrors({});
                            setIsSubmitted(false);
                        }}
                        className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200"
                    >
                        Create Another Account
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name *
                        </label>
                        <input
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full border rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.firstName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'
                                }`}
                            placeholder="John"
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name *
                        </label>
                        <input
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full border rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.lastName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'
                                }`}
                            placeholder="Doe"
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full border rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'
                            }`}
                        placeholder="you@example.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (Optional)
                    </label>
                    <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full border rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'
                            }`}
                        placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full border rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'
                            }`}
                        placeholder="••••••••"
                    />

                    {/* Password Strength */}
                    {formData.password && (
                        <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Password strength</span>
                                <span className="font-medium">{getStrengthText()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                                    style={{ width: `${passwordStrength * 25}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {errors.password && (
                        <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password *
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full border rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${errors.confirmPassword
                            ? 'border-red-300 focus:ring-red-500'
                            : formData.confirmPassword && formData.password === formData.confirmPassword
                                ? 'border-green-300 focus:ring-green-500'
                                : 'border-gray-300 focus:ring-emerald-500'
                            }`}
                        placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                    )}
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <p className="mt-1 text-xs text-green-600">✓ Passwords match</p>
                    )}
                </div>

                {/* Terms */}
                <div className="flex items-start pt-2">
                    <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded mt-1"
                        required
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                        I agree to the{' '}
                        <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                            Privacy Policy
                        </a>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 mt-4 ${isLoading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg'
                        }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                        </div>
                    ) : (
                        'Create Account'
                    )}
                </button>
            </form>
            {/* Login Link */}
            <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <a href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200">
                        Sign in here
                    </a>
                </p>
            </div>
        </>
    )
}

export default RegistrationForm
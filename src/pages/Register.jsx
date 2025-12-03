import React, { useState } from "react";
import LoginRoleSelector from "../components/login/LoginRoleSelector";
import RegistrationLeftPanel from "../components/registration/RegistrationLeftPanel";
import RegisterationForm from "../components/registration/RegistrationForm";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("farmer");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="flex-1 overflow-auto">
          <RegistrationLeftPanel />
        </div>

        {/* Right Side */}
        <div className="flex-1 p-6 flex flex-col justify-center overflow-auto">
          {/* Role Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              I am a
            </h3>
            <LoginRoleSelector selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
          </div>

          {/* Role Indicator */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Registering as</p>
                <p className="text-lg font-semibold text-emerald-700 capitalize">
                  {selectedRole}
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-bold">
                  {selectedRole?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <RegisterationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;

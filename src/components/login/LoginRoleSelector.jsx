import React from "react";
import LoginRoleOption from "./LoginRoleOption";

const LoginRoleSelector = ({ selectedRole, setSelectedRole }) => {
  const roles = [
    { 
      id: "farmer", 
      title: "Farmer", 
      icon: "👨‍🌾",
      description: "Manage crops & analytics",
      color: "from-green-500 to-emerald-600"
    },
    { 
      id: "financier", 
      title: "Financier", 
      icon: "💼",
      description: "Financial services",
      color: "from-blue-500 to-cyan-600"
    },
    { 
      id: "buyer", 
      title: "Buyer/Exporter", 
      icon: "🚢",
      description: "Purchase & export crops",
      color: "from-purple-500 to-pink-600"
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {roles.map((r) => (
        <LoginRoleOption
          key={r.id}
          title={r.title}
          icon={r.icon}
          description={r.description}
          color={r.color}
          isSelected={selectedRole === r.id}
          onClick={() => setSelectedRole(r.id)}
        />
      ))}
    </div>
  );
};

export default LoginRoleSelector;
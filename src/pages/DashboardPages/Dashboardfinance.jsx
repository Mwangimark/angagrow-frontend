import React from "react";
import Chatbot from "../../components/ChatbotFloating";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStatistics from "../../components/dashboard/DashboardStatistics";

function Dashboard() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader/>
      <DashboardStatistics />
      
      {/* Main Content */}
      <DashboardStats />

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}

export default Dashboard;
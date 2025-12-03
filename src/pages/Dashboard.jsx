import React from "react";
import MetricCard from "../components/MetricCard";
import MapView from "../components/MapView";
import YieldChart from "../components/YieldChart";
import DroneImageTable from "../components/DroneImageTable";
import Chatbot from "../components/ChatbotFloating";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function Dashboard() {
  const metrics = [
    { title: "Total Images", value: 120, trend: "up", change: 12 },
    { title: "Area Covered (HA)", value: 5.2, trend: "up", change: 2.1 },
    { title: "Avg Vegetation Score", value: 72.5, trend: "up", change: 5.2 },
    { title: "Stress %", value: 26.5, trend: "down", change: 8.3 },
    { title: "Canopy %", value: 73.5, trend: "up", change: 3.7 },
    { title: "Yield Estimate", value: 3.8, trend: "up", change: 0.4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader/>
      
      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Good morning, Farmer!</h2>
              <p className="opacity-90">Your farm is performing well. Vegetation health has improved by 5.2% this week.</p>
            </div>
            <button className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-md">
              View Full Report
            </button>
          </div>
        </div>
        <DashboardStats />
        {/* Metric Cards Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Key Metrics</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {metrics.map((metric, idx) => (
              <MetricCard
                key={idx}
                title={metric.title}
                value={metric.value}
                trend={metric.trend}
                change={metric.change}
              />
            ))}
          </div>
        </div>

        {/* Maps & Charts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Spatial Analysis</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Vegetation Heatmap</h3>
                  <MapView title="Vegetation Heatmap" />
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Yield Estimate per Zone</h3>
                  <YieldChart title="Yield Estimate per Zone" />
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Stress Map</h3>
                  <MapView title="Stress Map" />
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200 border border-blue-200">
                    <div className="text-blue-600 font-semibold">Schedule Flight</div>
                    <div className="text-sm text-blue-500 mt-1">Plan new drone mission</div>
                  </button>
                  <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-200 border border-green-200">
                    <div className="text-green-600 font-semibold">Generate Report</div>
                    <div className="text-sm text-green-500 mt-1">Create PDF summary</div>
                  </button>
                  <button className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-200 border border-orange-200">
                    <div className="text-orange-600 font-semibold">Alert Settings</div>
                    <div className="text-sm text-orange-500 mt-1">Configure notifications</div>
                  </button>
                  <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-200 border border-purple-200">
                    <div className="text-purple-600 font-semibold">Data Export</div>
                    <div className="text-sm text-purple-500 mt-1">Download farm data</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drone Images Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Drone Images</h2>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200">
                View All Images →
              </button>
            </div>
            <DroneImageTable />
          </div>
        </div>
      </main>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}

export default Dashboard;
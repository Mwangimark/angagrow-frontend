import React from "react";
import { Outlet } from "react-router-dom"; // This import is crucial
import Sidebar from "./Sidebar";
import ChatbotFloating from "./ChatbotFloating";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 h-screen fixed left-0 top-0 bg-white shadow-lg">
        <Sidebar />
      </div>
      <main className="flex-1 bg-gray-100 ml-64">
        {children || <Outlet />} {/* This renders nested routes */}
      </main>
      <ChatbotFloating />
    </div>
  );
}

export default Layout;
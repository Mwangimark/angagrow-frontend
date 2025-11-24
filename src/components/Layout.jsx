import React from "react";
import Sidebar from "./Sidebar";
import ChatbotFloating from "./ChatbotFloating";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        {children}
      </main>
       <ChatbotFloating />
    </div>
  );
}

export default Layout;

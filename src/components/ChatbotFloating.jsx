import React, { useState, useRef, useEffect } from "react";
import { getUser } from "../utils/auth";
import { fetchWithAuth } from "../utils/apis";

function ChatbotFloating() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: "Hello! I'm your farming assistant. Ask me about crop health, yield estimates, or drone image analysis.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true); // NEW: Control visibility
  const messagesEndRef = useRef(null);
  
  // Get user role for personalized questions
  const user = getUser();
  const userRole = user?.login_selected_role || user?.role || 'farmer';

  // Role-based quick questions
  const quickQuestions = {
    farmer: [
      "What does my canopy cover mean?",
      "How to reduce crop stress?",
      "Is my yield estimate good?",
      "When should I harvest?",
      "What fertilizer should I use?",
      "How to count plants from drone images?",
      "Interpret my NDVI map",
      "Best practices for irrigation"
    ],
    financier: [
      "ROI on this crop?",
      "Market price trends?",
      "Investment risk assessment",
      "Yield vs profit analysis",
      "Seasonal crop recommendations",
      "Insurance considerations"
    ],
    buyer: [
      "Crop quality assessment",
      "Harvest timeline estimate",
      "Batch consistency check",
      "Export readiness analysis",
      "Storage recommendations",
      "Quality grading standards"
    ]
  };

  // Get questions based on user role
  const currentQuickQuestions = quickQuestions[userRole] || quickQuestions.farmer;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessageToBackend = async (messageText) => {
    setIsTyping(true);
    // NEW: Hide quick questions after sending
    if (showQuickQuestions) {
      setShowQuickQuestions(false);
    }
    
    try {
      const response = await fetchWithAuth("http://127.0.0.1:8000/api/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });
      
      console.log("Backend response:", response);
      
      const botMessage = {
        id: Date.now(),
        text: response.response || response.message || "I received your message but didn't get a proper response.",
        sender: "bot",
        timestamp: new Date(),
        data: response.data || null
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const botMessage = {
        id: Date.now(),
        text: error.message || "Sorry, I couldn't process your request. Please try again.",
        sender: "bot",
        timestamp: new Date(),
        isError: true
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    sendMessageToBackend(inputMessage);
    setInputMessage("");
  };

  const handleQuickQuestion = (question) => {
    const userMessage = {
      id: Date.now(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    sendMessageToBackend(question);
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Clear chat history
  const clearChat = async () => {
    try {
      await fetchWithAuth("/chatbot/clear/", {
        method: "DELETE",
      });
      setMessages([
        {
          id: Date.now(),
          text: "Chat cleared! How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      // NEW: Show quick questions again when clearing chat
      setShowQuickQuestions(true);
    } catch (error) {
      console.error("Failed to clear chat:", error);
      // Still show cleared message locally even if API fails
      setMessages([
        {
          id: Date.now(),
          text: "Chat cleared! How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setShowQuickQuestions(true);
    }
  };

  // Load chat history on open
  useEffect(() => {
    if (open) {
      loadChatHistory();
      // NEW: Show quick questions when opening chat (only if no recent history)
      setShowQuickQuestions(true);
    }
  }, [open]);

  const loadChatHistory = async () => {
    try {
      const history = await fetchWithAuth("/chatbot/history/");
      if (history?.length > 0) {
        setMessages(history);
        // NEW: Hide quick questions if there's existing conversation
        if (history.length > 1) {
          setShowQuickQuestions(false);
        }
      }
    } catch (error) {
      console.log("No chat history found or error loading history:", error);
    }
  };

  // NEW: Toggle quick questions visibility
  const toggleQuickQuestions = () => {
    setShowQuickQuestions(!showQuickQuestions);
  };

  return (
    <>
      {/* Chat button */}
      <button
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110 hover:shadow-xl group ${
          open ? "rotate-45" : "rotate-0"
        }`}
        onClick={() => setOpen(!open)}
        title="Chat with Farm Assistant"
      >
        <div className="flex items-center justify-center w-full h-full">
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </div>
        {!open && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
        
        {/* Tooltip */}
        <div className="absolute -top-12 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Ask AI Farming Assistant
        </div>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col z-50 border border-gray-200 overflow-hidden transform transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">AngaGrow AI</h3>
                <p className="text-sm text-green-100">{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={clearChat}
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
                title="Clear chat history"
              >
                Clear
              </button>
              <button 
                onClick={() => setOpen(false)} 
                className="text-white/80 hover:text-white"
                title="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    msg.sender === "user"
                      ? "bg-emerald-500 text-white rounded-br-none"
                      : msg.isError
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : "bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-emerald-100" : msg.isError ? "text-red-600" : "text-gray-500"}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex mb-4 justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none p-3 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-xs text-gray-600">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions - Collapsible section */}
          {showQuickQuestions && (
            <div className="border-t border-gray-200 bg-white">
              <div className="px-4 py-2 flex justify-between items-center bg-gray-50">
                <p className="text-xs font-medium text-gray-600">Quick questions for {userRole}:</p>
                <button 
                  onClick={toggleQuickQuestions}
                  className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                  title="Hide suggestions"
                >
                  Hide
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
              <div className="px-4 py-3 max-h-40 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {currentQuickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q)}
                      className="px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200 hover:scale-105"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input with quick questions toggle */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask about ${userRole === 'farmer' ? 'crops' : userRole === 'financier' ? 'investments' : 'purchases'}...`}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputMessage.trim()) {
                      handleSendMessage(e);
                    }
                  }
                }}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className={`bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2.5 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 ${
                  !inputMessage.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                title="Send message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            {/* Quick questions toggle button (when hidden) */}
            {!showQuickQuestions && (
              <div className="flex justify-between items-center mt-2">
                <button
                  type="button"
                  onClick={toggleQuickQuestions}
                  className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                  title="Show quick questions"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Show quick questions
                </button>
                <p className="text-xs text-gray-500">
                  Press Enter to send
                </p>
              </div>
            )}
            
            {/* Regular hint (when quick questions are shown) */}
            {showQuickQuestions && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send, Shift+Enter for new line
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default ChatbotFloating;
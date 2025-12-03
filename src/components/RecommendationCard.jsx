import React from "react";

const severityConfig = {
  success: {
    bg: "bg-gradient-to-r from-green-50 to-emerald-50",
    border: "border-green-200",
    text: "text-emerald-900",
    icon: (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    ),
    iconBg: "bg-green-500",
    accent: "from-green-500 to-emerald-600",
    button: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
  },
  warning: {
    bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
    border: "border-amber-200",
    text: "text-amber-900",
    icon: (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5" />
        </svg>
      </div>
    ),
    accent: "from-amber-500 to-yellow-600",
    button: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white"
  },
  danger: {
    bg: "bg-gradient-to-r from-red-50 to-rose-50",
    border: "border-red-200",
    text: "text-red-900",
    icon: (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
    accent: "from-red-500 to-rose-600",
    button: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
  },
  info: {
    bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
    border: "border-blue-200",
    text: "text-blue-900",
    icon: (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
    accent: "from-blue-500 to-cyan-600",
    button: "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
  }
};

function RecommendationCard({ recommendation, onAction }) {
  const { title, message, actions, severity = "info", timestamp, priority, actionLabel = "Apply Recommendation" } = recommendation;
  const config = severityConfig[severity] || severityConfig.info;

  return (
    <div className={`relative rounded-2xl p-6 mb-6 border ${config.border} ${config.bg} shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}>
      
      {/* Accent Bar */}
      <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${config.accent}`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start space-x-4">
          {/* Icon */}
          {config.icon}
          
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className={`text-xl font-bold ${config.text} mb-1`}>{title}</h3>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${config.border} ${config.text} bg-white/50`}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </span>
                  {priority && (
                    <span className="text-sm text-gray-600 font-medium">
                      Priority: <span className="font-bold">{priority}/10</span>
                    </span>
                  )}
                  {timestamp && (
                    <span className="text-sm text-gray-500">
                      {new Date(timestamp).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className={`w-3 h-3 rounded-full animate-pulse ${config.iconBg}`}></div>
            </div>

            {/* Message */}
            <p className={`text-lg ${config.text} mb-4 leading-relaxed`}>{message}</p>

            {/* Actions */}
            {actions && actions.length > 0 && (
              <div className="bg-white/70 rounded-xl p-4 mb-4 border border-gray-200">
                <h4 className={`font-semibold mb-3 ${config.text} flex items-center space-x-2`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Recommended Actions</span>
                </h4>
                <ul className="space-y-2">
                  {actions.map((action, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${config.iconBg}`}></div>
                      <span className={`text-sm ${config.text} flex-1`}>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={() => onAction && onAction(recommendation)}
              className={`${config.button} px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-2`}
            >
              <span>{actionLabel}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${config.accent} blur-2xl`}></div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;
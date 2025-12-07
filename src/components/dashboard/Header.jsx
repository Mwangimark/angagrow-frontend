import React from 'react'
import { FiCalendar, FiArrowRight, FiBell } from "react-icons/fi";
import { getUser } from "../../utils/auth";


const Header = () => {
  const user = getUser(); 


  return (
    <>
    <div className="w-full flex items-start justify-between mb-4 mt-3 px-3 py-2">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <span>Home</span>
              <span className="text-gray-400">›</span>
              <span className="text-primary font-medium">CB Projects EQ</span>
            </div>
    
            {/* User area */}
            <div className="flex items-center space-x-4">
              {/* Notification bell */}
              <button
                aria-label="Notifications"
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
              >
                <FiBell className="text-gray-600" size={18} />
                {/* Badge */}
                <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white bg-red-500 rounded-full">
                  2
                </span>
              </button>
    
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                {/* Avatar: replace src with user's image if available */}
                <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-sm font-medium text-gray-700">
                  {/* image fallback: initials */}
                  <img
                    src="" /* put avatar url here if available */
                    alt="Profile"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="w-full h-full object-cover"
                  />
                  {/* <span className="select-none">EB</span> */}
                </div>
    
                <div className="hidden sm:flex sm:flex-col sm:items-start">
                  <span className="text-sm font-medium text-gray-800">{user?.first_name || ""}</span>

                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default Header
// pages/Profile.js
import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit2, FiSave, FiUpload } from 'react-icons/fi';
import { FaTractor, FaSeedling, FaUserTie } from 'react-icons/fa';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    // Dummy user data
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    farmSize: '5 acres',
    cropTypes: ['Maize', 'Beans', 'Coffee'],
    experience: '8 years',
    role: 'farmer',
    registrationDate: '2023-05-15',
    profileCompletion: 85,
  });

  // Dummy stats
  const userStats = {
    totalAnalyses: 24,
    successfulCrops: 18,
    avgYield: 4.2,
    communityRank: 'Gold',
  };

  // Dummy recent activities
  const recentActivities = [
    { id: 1, action: 'Uploaded drone images', date: '2 hours ago', icon: '🚁' },
    { id: 2, action: 'Received crop analysis report', date: 'Yesterday', icon: '📊' },
    { id: 3, action: 'Joined maize farming community', date: '2 days ago', icon: '👥' },
    { id: 4, action: 'Scheduled drone spray', date: '3 days ago', icon: '💧' },
    { id: 5, action: 'Purchased fertilizer', date: '1 week ago', icon: '🌱' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to backend here
    console.log('Saving profile data:', userData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'farmer': return <FaTractor className="text-green-500" />;
      case 'financier': return <FaUserTie className="text-blue-500" />;
      case 'buyer': return <FaSeedling className="text-purple-500" />;
      default: return <FiUser />;
    }
  };

  // Get role display name
  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'farmer': return 'Farmer';
      case 'financier': return 'Financier';
      case 'buyer': return 'Buyer';
      default: return 'User';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isEditing 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {isEditing ? (
            <>
              <FiSave /> Save Changes
            </>
          ) : (
            <>
              <FiEdit2 /> Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-4xl font-bold">
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                </div>
                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                  <FiUpload className="text-gray-700" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleInputChange}
                          className="border rounded px-3 py-1 w-32"
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleInputChange}
                          className="border rounded px-3 py-1 w-32"
                        />
                      </div>
                    ) : (
                      `${userData.firstName} ${userData.lastName}`
                    )}
                  </h2>
                  <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
                    {getRoleIcon(userData.role)}
                    <span className="text-sm font-medium ml-1">
                      {getRoleDisplayName(userData.role)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <FiMail className="text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="border rounded px-3 py-1 flex-1"
                    />
                  ) : (
                    <span>{userData.email}</span>
                  )}
                </div>

                {/* Profile Completion */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Profile Completion</span>
                    <span className="font-medium">{userData.profileCompletion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${userData.profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FiPhone className="text-gray-400 text-lg" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="border rounded px-3 py-1 w-full"
                    />
                  ) : (
                    <p className="font-medium">{userData.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FiMapPin className="text-gray-400 text-lg" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={userData.location}
                      onChange={handleInputChange}
                      className="border rounded px-3 py-1 w-full"
                    />
                  ) : (
                    <p className="font-medium">{userData.location}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaTractor className="text-gray-400 text-lg" />
                <div>
                  <p className="text-sm text-gray-500">Farm Size</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="farmSize"
                      value={userData.farmSize}
                      onChange={handleInputChange}
                      className="border rounded px-3 py-1 w-full"
                    />
                  ) : (
                    <p className="font-medium">{userData.farmSize}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FiCalendar className="text-gray-400 text-lg" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{userData.registrationDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Your Farming Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.totalAnalyses}</div>
                <p className="text-sm text-gray-600">Total Analyses</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.successfulCrops}</div>
                <p className="text-sm text-gray-600">Successful Crops</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.avgYield} t/ha</div>
                <p className="text-sm text-gray-600">Average Yield</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.communityRank}</div>
                <p className="text-sm text-gray-600">Community Rank</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Side Info */}
        <div className="space-y-6">
          {/* Crops Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Crops</h3>
            <div className="space-y-3">
              {userData.cropTypes.map((crop, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FaSeedling className="text-green-600" />
                    </div>
                    <span className="font-medium">{crop}</span>
                  </div>
                  <span className="text-sm text-gray-500">Active</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors">
              + Add New Crop
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-center text-blue-600 hover:text-blue-800 font-medium">
              View All Activity →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors">
                Upload Drone Images
              </button>
              <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors">
                Schedule Analysis
              </button>
              <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors">
                View Reports
              </button>
              <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
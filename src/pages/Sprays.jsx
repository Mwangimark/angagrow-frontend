// src/pages/Sprays.jsx (or src/pages/DroneSprays.jsx)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SprayCalendar from '../components/sprays/SprayCalendar'; // Your existing component
import { getAccessToken, isTokenExpired } from '../utils/auth';

const SpraysPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = getAccessToken();
      
      if (!token || isTokenExpired()) {
        console.log('❌ Token invalid, redirecting to login');
        localStorage.clear();
        navigate('/login');
        return;
      }
      
      setLoading(false);
    };
    
    validateToken();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading spray scheduler...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Drone Spray Schedule</h1>
          <p className="text-gray-600">Schedule and track drone spray operations for your blocks</p>
        </div>
        <SprayCalendar />
      </div>
    </>
  );
};

export default SpraysPage;
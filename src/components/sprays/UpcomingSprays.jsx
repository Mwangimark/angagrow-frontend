// src/components/sprays/UpcomingSprays.jsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/apis';

const UpcomingSprays = ({ onSelectSpray }) => {
  const [sprays, setSprays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingSprays();
  }, []);

  const fetchUpcomingSprays = async () => {
    try {
      const response = await api.get('/dronespray/sprays/upcoming/?days=14');
      setSprays(response.data);
    } catch (error) {
      console.error('Error fetching upcoming sprays:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'overdue':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'completed':
        return 'border-l-4 border-green-500 bg-green-50';
      default:
        return 'border-l-4 border-blue-500 bg-white';
    }
  };

  const getDaysRemaining = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sprayDate = new Date(date);
    sprayDate.setHours(0, 0, 0, 0);
    const diffTime = sprayDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Today';
    return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-100 rounded"></div>
            <div className="h-16 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Sprays</h3>
            <p className="text-sm text-gray-500 mt-1">Scheduled for the next 14 days</p>
          </div>
          <span className="text-2xl">🚁</span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {sprays.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No upcoming sprays scheduled
          </div>
        ) : (
          sprays.map((spray) => (
            <div
              key={spray.id}
              onClick={() => onSelectSpray && onSelectSpray(spray)}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${getStatusStyles(spray.status)}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {spray.spray_type_display || spray.spray_type}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{spray.block_name}</span>
                  </div>
                  <p className="text-sm text-gray-500">{spray.product_name}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    spray.status === 'overdue' 
                      ? 'text-red-600' 
                      : spray.status === 'completed'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`}>
                    {getDaysRemaining(spray.scheduled_date)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(spray.scheduled_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {sprays.length > 0 && (
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <button
            onClick={() => window.location.href = '/sprays'}
            className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View Full Schedule →
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingSprays;
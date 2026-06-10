// src/components/sprays/SprayList.jsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/apis';

const SprayList = ({ sprays, onSelectSpray, onRefresh }) => {
  const [localSprays, setLocalSprays] = useState(sprays || []);
  const [filter, setFilter] = useState('all'); // all, scheduled, completed, overdue
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sprays) {
      setLocalSprays(sprays);
    }
  }, [sprays]);

  const fetchSprays = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/dronespray/sprays/?status=${filter !== 'all' ? filter : ''}`);
      setLocalSprays(response.data);
    } catch (error) {
      console.error('Error fetching sprays:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sprays) {
      fetchSprays();
    }
  }, [filter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'overdue': return '⚠️';
      case 'cancelled': return '❌';
      default: return '📅';
    }
  };

  const getSprayTypeIcon = (type) => {
    switch (type) {
      case 'pesticide': return '🐛';
      case 'fungicide': return '🍄';
      case 'herbicide': return '🌿';
      case 'fertilizer': return '💪';
      default: return '💊';
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this spray?')) {
      try {
        await api.delete(`/dronespray/sprays/${id}/`);
        fetchSprays();
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error('Error deleting spray:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">All Spray Schedules</h3>
            <p className="text-sm text-gray-500 mt-1">Manage all your drone spray operations</p>
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Sprays</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {localSprays.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No spray schedules found
          </div>
        ) : (
          localSprays.map((spray) => (
            <div
              key={spray.id}
              onClick={() => onSelectSpray && onSelectSpray(spray)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{getSprayTypeIcon(spray.spray_type)}</span>
                    <span className="font-medium text-gray-900">
                      {spray.spray_type_display || spray.spray_type}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(spray.status)}`}>
                      {getStatusIcon(spray.status)} {spray.status_display || spray.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Block:</span>
                      <span className="ml-2 text-gray-700">{spray.block_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Product:</span>
                      <span className="ml-2 text-gray-700">{spray.product_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Scheduled:</span>
                      <span className="ml-2 text-gray-700">
                        {new Date(spray.scheduled_date).toLocaleDateString()}
                      </span>
                    </div>
                    {spray.completion_date && (
                      <div>
                        <span className="text-gray-500">Completed:</span>
                        <span className="ml-2 text-green-600">
                          {new Date(spray.completion_date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {spray.dosage && (
                    <div className="text-sm text-gray-500 mt-2">
                      Dosage: {spray.dosage}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(spray.id);
                  }}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SprayList;
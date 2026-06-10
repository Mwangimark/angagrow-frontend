// src/components/sprays/SprayDetail.jsx
import React, { useState } from 'react';
import api from '../../utils/apis';

const SprayDetail = ({ spray, onClose, onEdit, onComplete }) => {
  const [completing, setCompleting] = useState(false);
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const [completionData, setCompletionData] = useState({
    completion_date: new Date().toISOString().split('T')[0],
    notes: '',
    weather_notes: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
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

  const handleCompleteSubmit = async (e) => {
    e.preventDefault();
    setCompleting(true);
    
    try {
      await api.post(`/dronespray/sprays/${spray.id}/complete/`, completionData);
      onComplete(spray.id, completionData);
    } catch (error) {
      console.error('Error completing spray:', error);
    } finally {
      setCompleting(false);
    }
  };

  const isEditable = spray.status !== 'completed' && spray.status !== 'cancelled';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Spray Details</h2>
              <p className="text-gray-600 mt-1">{spray.block_name}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(spray.status)}`}>
              {spray.status_display || spray.status}
            </span>
          </div>
        </div>

        {!showCompleteForm ? (
          <>
            <div className="p-6 space-y-4">
              {/* Spray Type */}
              <div className="flex items-center gap-3 pb-3 border-b">
                <span className="text-3xl">{getSprayTypeIcon(spray.spray_type)}</span>
                <div>
                  <p className="text-sm text-gray-500">Spray Type</p>
                  <p className="font-medium capitalize">{spray.spray_type}</p>
                </div>
              </div>

              {/* Product */}
              <div>
                <p className="text-sm text-gray-500">Product</p>
                <p className="font-medium">{spray.product_name}</p>
              </div>

              {/* Dosage */}
              {spray.dosage && (
                <div>
                  <p className="text-sm text-gray-500">Dosage</p>
                  <p className="font-medium">{spray.dosage}</p>
                </div>
              )}

              {/* Schedule */}
              <div>
                <p className="text-sm text-gray-500">Scheduled Date</p>
                <p className="font-medium">
                  {new Date(spray.scheduled_date).toLocaleDateString()}
                </p>
              </div>

              {/* Completion Date */}
              {spray.completion_date && (
                <div>
                  <p className="text-sm text-gray-500">Completed Date</p>
                  <p className="font-medium text-green-600">
                    {new Date(spray.completion_date).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Notes */}
              {spray.notes && (
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-gray-700">{spray.notes}</p>
                </div>
              )}

              {/* Weather Notes */}
              {spray.weather_notes && (
                <div>
                  <p className="text-sm text-gray-500">Weather Conditions</p>
                  <p className="text-gray-700">{spray.weather_notes}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              
              {isEditable && (
                <>
                  <button
                    onClick={() => onEdit(spray)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowCompleteForm(true)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Complete
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleCompleteSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Completion Date
              </label>
              <input
                type="date"
                value={completionData.completion_date}
                onChange={(e) => setCompletionData({...completionData, completion_date: e.target.value})}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={completionData.notes}
                onChange={(e) => setCompletionData({...completionData, notes: e.target.value})}
                rows="3"
                placeholder="Spray completion notes, effectiveness, issues..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weather Conditions
              </label>
              <input
                type="text"
                value={completionData.weather_notes}
                onChange={(e) => setCompletionData({...completionData, weather_notes: e.target.value})}
                placeholder="e.g., Sunny, 25°C, light wind"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCompleteForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={completing}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {completing ? 'Saving...' : 'Confirm Complete'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SprayDetail;
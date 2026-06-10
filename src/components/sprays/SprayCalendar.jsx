// src/components/sprays/SprayCalendar.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../../utils/apis';
import SprayForm from './SprayForm';
import SprayDetail from './SprayDetail';

// ✅ DateSpraysModal Component - Add this before SprayCalendar
const DateSpraysModal = ({ date, sprays, onClose, onSelectSpray }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            Sprays for {date?.toDateString()}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{sprays?.length || 0} schedule(s)</p>
        </div>
        
        <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
          {sprays?.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No sprays scheduled for this date
            </div>
          ) : (
            sprays?.map((spray) => (
              <div
                key={spray.id}
                onClick={() => {
                  onSelectSpray(spray);
                  onClose();
                }}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {spray.spray_type === 'pesticide' && '🐛'}
                        {spray.spray_type === 'fungicide' && '🍄'}
                        {spray.spray_type === 'herbicide' && '🌿'}
                        {spray.spray_type === 'fertilizer' && '💪'}
                        {!['pesticide', 'fungicide', 'herbicide', 'fertilizer'].includes(spray.spray_type) && '💊'}
                      </span>
                      <span className="font-medium capitalize text-gray-900">{spray.spray_type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        spray.status === 'completed' ? 'bg-green-100 text-green-800' :
                        spray.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        spray.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {spray.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {spray.product_name} - {spray.block_name || spray.title?.split(' - ')[1] || 'Block'}
                    </div>
                    {spray.dosage && (
                      <div className="text-xs text-gray-400 mt-0.5">
                        Dosage: {spray.dosage}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    {!spray.completion_date && spray.status !== 'completed' && spray.status !== 'cancelled' && (
                      <span className="text-xs text-amber-600">Pending</span>
                    )}
                    {spray.status === 'completed' && (
                      <span className="text-xs text-green-600">✅ Completed</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const SprayCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSpray, setSelectedSpray] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // ✅ State for date sprays modal
  const [showDateSprays, setShowDateSprays] = useState(false);
  const [selectedDateSprays, setSelectedDateSprays] = useState([]);
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Get events for current month and next 2 months
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 2);

      const response = await api.get(`/dronespray/sprays/calendar/?start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if a date has sprays
  const getSpraysForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.start.split('T')[0] === dateStr);
  };

  // Custom tile styling for calendar
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const sprays = getSpraysForDate(date);
      if (sprays.length > 0) {
        const hasOverdue = sprays.some(s => s.status === 'overdue');
        const hasCompleted = sprays.some(s => s.status === 'completed');
        const hasScheduled = sprays.some(s => s.status === 'scheduled');

        if (hasOverdue) return 'spray-day-overdue';
        if (hasCompleted && hasScheduled) return 'spray-day-mixed';
        if (hasCompleted) return 'spray-day-completed';
        if (hasScheduled) return 'spray-day-scheduled';
      }
    }
    return null;
  };

  // Tile content to show indicators
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const sprays = getSpraysForDate(date);
      if (sprays.length > 0) {
        return (
          <div className="spray-indicators">
            {sprays.slice(0, 3).map((spray, idx) => (
              <div
                key={idx}
                className={`spray-dot spray-dot-${spray.status}`}
                title={`${spray.title} - ${spray.status}`}
              />
            ))}
            {sprays.length > 3 && (
              <div className="spray-more">+{sprays.length - 3}</div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  // ✅ Updated handleDateClick - shows modal instead of alert
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const sprays = getSpraysForDate(date);
    if (sprays.length > 0) {
      setSelectedDateForModal(date);
      setSelectedDateSprays(sprays);
      setShowDateSprays(true);
    }
  };

  const handleAddSpray = () => {
    setSelectedSpray(null);
    setShowForm(true);
  };

  const handleEditSpray = (spray) => {
    setSelectedSpray(spray);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedSpray(null);
    fetchEvents(); // Refresh calendar
  };

  const handleDetailClose = () => {
    setShowDetail(false);
    setSelectedSpray(null);
    fetchEvents(); // Refresh calendar
  };

  const handleComplete = async (sprayId, completionData) => {
    try {
      await api.post(`/dronespray/sprays/${sprayId}/complete/`, completionData);
      fetchEvents(); // Refresh calendar
      setShowDetail(false);
      setSelectedSpray(null);
    } catch (error) {
      console.error('Error completing spray:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
          <p className="text-gray-500 text-sm">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="spray-calendar-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Spray Schedule</h2>
        <button
          onClick={handleAddSpray}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          + Schedule Spray
        </button>
      </div>

      <div className="calendar-wrapper">
        <style>{`
          .spray-calendar-container .spray-day-scheduled {
            background-color: rgba(59, 130, 246, 0.1) !important;
          }
          .spray-calendar-container .spray-day-completed {
            background-color: rgba(16, 185, 129, 0.1) !important;
          }
          .spray-calendar-container .spray-day-overdue {
            background-color: rgba(239, 68, 68, 0.15) !important;
          }
          .spray-calendar-container .spray-day-mixed {
            background: linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 100%) !important;
          }
          .spray-indicators {
            display: flex;
            gap: 3px;
            justify-content: center;
            margin-top: 4px;
          }
          .spray-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }
          .spray-dot-scheduled {
            background-color: #3b82f6;
          }
          .spray-dot-completed {
            background-color: #10b981;
          }
          .spray-dot-overdue {
            background-color: #ef4444;
          }
          .spray-dot-cancelled {
            background-color: #6b7280;
          }
          .spray-more {
            font-size: 8px;
            color: #6b7280;
          }
        `}</style>

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={tileClassName}
          tileContent={tileContent}
          onClickDay={handleDateClick}
          className="rounded-lg border shadow-sm"
        />
      </div>

      {/* Legend */}
      <div className="legend mt-6 flex gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Overdue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span>Cancelled</span>
        </div>
      </div>

      {/* ✅ Date Sprays Modal */}
      {showDateSprays && (
        <DateSpraysModal
          date={selectedDateForModal}
          sprays={selectedDateSprays}
          onClose={() => setShowDateSprays(false)}
          onSelectSpray={(spray) => {
            setSelectedSpray(spray);
            setShowDetail(true);
          }}
        />
      )}

      {/* Spray Form Modal */}
      {showForm && (
        <SprayForm
          spray={selectedSpray}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}

      {/* Spray Detail Modal */}
      {showDetail && selectedSpray && (
        <SprayDetail
          spray={selectedSpray}
          onClose={handleDetailClose}
          onEdit={handleEditSpray}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};

export default SprayCalendar;
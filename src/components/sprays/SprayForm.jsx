// src/components/sprays/SprayForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../../utils/apis';

const SprayForm = ({ spray, onClose, onSuccess }) => {
  const [farms, setFarms] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState('');
  const [loadingBlocks, setLoadingBlocks] = useState(false);

  const [formData, setFormData] = useState({
    block: '',
    spray_type: 'pesticide',
    product_name: '',
    dosage: '',
    scheduled_date: '',
    notes: '',
    weather_notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch farms on component mount
  useEffect(() => {
    fetchFarms();
  }, []);

  // Fetch blocks when farm is selected
  useEffect(() => {
    if (selectedFarmId) {
      fetchBlocksByFarm(selectedFarmId);
    } else {
      setBlocks([]);
    }
  }, [selectedFarmId]);

  // Populate form if editing
  useEffect(() => {
    if (spray) {
      setFormData({
        block: spray.block,
        spray_type: spray.spray_type,
        product_name: spray.product_name,
        dosage: spray.dosage || '',
        scheduled_date: spray.scheduled_date?.split('T')[0] || '',
        notes: spray.notes || '',
        weather_notes: spray.weather_notes || ''
      });

      // If editing, find and set the farm for this block
      if (spray.block_name && farms.length > 0) {
        // You might need to store farm_id in the spray object
        // For now, we'll need to fetch farm info from block
      }
    }
  }, [spray, farms]);

  const fetchFarms = async () => {
    try {
      const response = await api.get('/farming/farms/');
      setFarms(response.data);
    } catch (error) {
      console.error('Error fetching farms:', error);
    }
  };


  const fetchBlocksByFarm = async (farmId) => {
    setLoadingBlocks(true);
    try {
      // Use query parameter instead of URL parameter
      const response = await api.get(`/farming/farms/${farmId}/blocks/`);
      setBlocks(response.data);
    } catch (error) {
      console.error('Error fetching blocks:', error);
      setBlocks([]);
    } finally {
      setLoadingBlocks(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFarmChange = (e) => {
    const farmId = e.target.value;
    setSelectedFarmId(farmId);
    setFormData(prev => ({ ...prev, block: '' })); // Reset block selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (spray) {
        await api.put(`/dronespray/sprays/${spray.id}/`, formData);
      } else {
        await api.post('/dronespray/sprays/', formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save spray schedule');
      console.error('Error saving spray:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {spray ? 'Edit Spray Schedule' : 'Schedule New Spray'}
          </h2>
          <p className="text-gray-600 mt-1">
            Schedule drone spray operations for your blocks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Farm Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Farm *
            </label>
            <select
              value={selectedFarmId}
              onChange={handleFarmChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Choose a farm</option>
              {farms.map((farm) => (
                <option key={farm.id} value={farm.id}>
                  {farm.name}
                </option>
              ))}
            </select>
          </div>

          {/* Block Selection - Disabled until farm selected */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Block *
            </label>
            <select
              name="block"
              value={formData.block}
              onChange={handleChange}
              required
              disabled={!selectedFarmId || loadingBlocks}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {!selectedFarmId
                  ? 'First select a farm'
                  : loadingBlocks
                    ? 'Loading blocks...'
                    : blocks.length === 0
                      ? 'No blocks found'
                      : 'Choose a block'}
              </option>
              {blocks.map((block) => (
                <option key={block.id} value={block.id}>
                  {block.name} {block.area_hectares ? `(${block.area_hectares} ha)` : ''}
                </option>
              ))}
            </select>
            {selectedFarmId && blocks.length === 0 && !loadingBlocks && (
              <p className="text-xs text-amber-600 mt-1">
                No blocks found for this farm. Please add blocks first.
              </p>
            )}
          </div>

          {/* Spray Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spray Type *
            </label>
            <select
              name="spray_type"
              value={formData.spray_type}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="pesticide">Pesticide</option>
              <option value="fungicide">Fungicide</option>
              <option value="herbicide">Herbicide</option>
              <option value="fertilizer">Fertilizer</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              required
              placeholder="e.g., Roundup, Mancozeb"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Dosage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dosage
            </label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="e.g., 2L per hectare"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Scheduled Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scheduled Date *
            </label>
            <input
              type="date"
              name="scheduled_date"
              value={formData.scheduled_date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Additional instructions or notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedFarmId || !formData.block}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (spray ? 'Update' : 'Schedule')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SprayForm;
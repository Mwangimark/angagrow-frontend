import { useState, useEffect } from "react";
import api from "../../utils/apis";

const CreateBlock = ({ farmId, onBlockCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    crop_type: "", // Will be crop_type ID - REQUIRED!
  });
  
  const [cropTypes, setCropTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch crop types on mount
  useEffect(() => {
    fetchCropTypes();
  }, []);

  const fetchCropTypes = async () => {
    try {
      const res = await api.get("/farming/crop-types/");
      console.log("Crop types fetched:", res.data);
      
      if (res.data.length > 0) {
        setCropTypes(res.data);
        // Auto-select first crop type
        setFormData(prev => ({
          ...prev,
          crop_type: res.data[0].id.toString()
        }));
      } else {
        setError("No crop types available. Please add crops first.");
      }
    } catch (err) {
      console.error("Error fetching crop types:", err);
      setError("Failed to load crop types");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate
      if (!formData.name.trim()) throw new Error("Block name is required");
      if (!formData.area || parseFloat(formData.area) <= 0) throw new Error("Valid area is required");
      if (!formData.crop_type) throw new Error("Crop type is required");

      const payload = {
        name: formData.name.trim(),
        area: parseFloat(formData.area),
        crop_type: parseInt(formData.crop_type), // Convert to int
      };

      console.log("Sending payload:", payload);

      // Make API call
      const response = await api.post(`farming/farms/${farmId}/blocks/`, payload);
      console.log("Success:", response.data);

      // Reset form
      if (cropTypes.length > 0) {
        setFormData({
          name: "",
          area: "",
          crop_type: cropTypes[0].id.toString(),
        });
      }

      // Notify parent
      onBlockCreated?.();
    } catch (err) {
      console.error("Full error:", err);
      
      let errorMessage = "Failed to create block";
      
      if (err.response?.data) {
        // Django validation errors
        const errors = [];
        
        if (typeof err.response.data === 'string') {
          errors.push(err.response.data);
        } else if (err.response.data.detail) {
          errors.push(err.response.data.detail);
        } else {
          // Handle field errors
          Object.entries(err.response.data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              errors.push(`${field}: ${messages.join(', ')}`);
            } else if (typeof messages === 'string') {
              errors.push(`${field}: ${messages}`);
            } else if (typeof messages === 'object') {
              // Nested errors
              Object.entries(messages).forEach(([nestedField, nestedMsg]) => {
                errors.push(`${field}.${nestedField}: ${nestedMsg}`);
              });
            }
          });
        }
        
        errorMessage = errors.join('. ');
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (cropTypes.length === 0 && !error) {
    return (
      <div className="bg-white rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Add a Block</h3>
        <p className="text-gray-600">Loading crop types...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Add a Block</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {cropTypes.length === 0 ? (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700">No crop types available in the system.</p>
          <p className="text-yellow-600 text-sm mt-1">
            Please add crop types through the admin panel first.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Block Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., North Field, Maize Section"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Area (hectares) *
            </label>
            <input
              type="number"
              name="area"
              placeholder="e.g., 2.5"
              value={formData.area}
              onChange={handleChange}
              required
              min="0.1"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Crop Type *
            </label>
            <select
              name="crop_type"
              value={formData.crop_type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {cropTypes.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.name} {crop.scientific_name ? `(${crop.scientific_name})` : ''}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-medium disabled:opacity-50"
          >
            {loading ? "Adding Block..." : "Add Block & Continue"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateBlock;
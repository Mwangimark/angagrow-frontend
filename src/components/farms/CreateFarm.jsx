import { useState } from "react";
import api from "../../utils/apis";

const CreateFarm = ({ onFarmCreated, onFarmCreatedWithId, showTitle = true, isFirstFarm = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    total_area: "",
    length: "",
    width: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const payload = {
        name: formData.name,
        total_area: formData.total_area,
        length: formData.length || null,
        width: formData.width || null,
        latitude: formData.latitude || null,
        longitude: formData.longitude || null,
      };

      // Create the farm
      const response = await api.post("/farming/farms/", payload);
      const createdFarm = response.data;

      // Reset form
      setFormData({
        name: "",
        total_area: "",
        length: "",
        width: "",
        latitude: "",
        longitude: "",
      });

      // Call appropriate callback
      if (onFarmCreatedWithId) {
        onFarmCreatedWithId(createdFarm.id, createdFarm.name);
      } else {
        onFarmCreated?.();
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Failed to create farm"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      {showTitle && (
        <h2 className="text-xl font-semibold mb-4">
          {isFirstFarm ? "Create Your First Farm" : "Create Farm"}
        </h2>
      )}

      {error && (
        <p className="text-red-600 text-sm mb-3">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Farm name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />

        <input
          type="number"
          name="total_area"
          placeholder="Total area (hectares)"
          value={formData.total_area}
          onChange={handleChange}
          required
          min="0.1"
          step="0.1"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="length"
            placeholder="Length (optional)"
            value={formData.length}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <input
            type="number"
            name="width"
            placeholder="Width (optional)"
            value={formData.width}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            step="any"
            name="latitude"
            placeholder="Latitude (optional)"
            value={formData.latitude}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <input
            type="number"
            step="any"
            name="longitude"
            placeholder="Longitude (optional)"
            value={formData.longitude}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-medium disabled:opacity-50"
        >
          {loading ? "Creating..." : (isFirstFarm ? "Next: Add Blocks" : "Create Farm")}
        </button>
        
        {isFirstFarm && (
          <p className="text-sm text-gray-500 text-center">
            You'll add blocks to your farm in the next step
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateFarm;
import { useState, useEffect } from "react";
import api from "../../utils/apis";

const FarmBlockSelector = ({ 
  onFarmSelect, 
  onBlockSelect,
  selectedFarmId = null,
  selectedBlockId = null 
}) => {
  const [farms, setFarms] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Selected items state
  const [selectedFarm, setSelectedFarm] = useState(selectedFarmId);
  const [selectedBlock, setSelectedBlock] = useState(selectedBlockId);
  
  // Fetch user's farms on component mount
  useEffect(() => {
    fetchFarms();
  }, []);
  
  // Fetch blocks when farm is selected
  useEffect(() => {
    if (selectedFarm) {
      fetchBlocks(selectedFarm);
    } else {
      setBlocks([]); // Clear blocks if no farm selected
      setSelectedBlock(null);
    }
  }, [selectedFarm]);
  
  // Notify parent when selection changes
  useEffect(() => {
    if (onFarmSelect && selectedFarm) {
      const farm = farms.find(f => f.id === selectedFarm);
      onFarmSelect(farm);
    }
  }, [selectedFarm, farms, onFarmSelect]);
  
  useEffect(() => {
    if (onBlockSelect && selectedBlock) {
      const block = blocks.find(b => b.id === selectedBlock);
      onBlockSelect(block);
    }
  }, [selectedBlock, blocks, onBlockSelect]);
  
  const fetchFarms = async () => {
    try {
      setLoading(true);
      const response = await api.get("/farming/farms");
      setFarms(response.data);
      
      // Auto-select if only 1 farm exists
      if (response.data.length === 1) {
        setSelectedFarm(response.data[0].id);
      }
    } catch (err) {
      console.error("Error fetching farms:", err);
      setError("Failed to load farms");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchBlocks = async (farmId) => {
    try {
      const response = await api.get(`/farming/farms/${farmId}/blocks/`);
      setBlocks(response.data);
      
      // Auto-select if only 1 block exists
      if (response.data.length === 1) {
        setSelectedBlock(response.data[0].id);
      }
    } catch (err) {
      console.error(`Error fetching blocks for farm ${farmId}:`, err);
      setBlocks([]); // Clear blocks on error
    }
  };
  
  const handleFarmChange = (e) => {
    const farmId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedFarm(farmId);
    setSelectedBlock(null); // Reset block when farm changes
  };
  
  const handleBlockChange = (e) => {
    const blockId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedBlock(blockId);
  };
  
  const getSelectedFarm = () => {
    return farms.find(f => f.id === selectedFarm);
  };
  
  const getSelectedBlock = () => {
    return blocks.find(b => b.id === selectedBlock);
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchFarms}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
        >
          Retry
        </button>
      </div>
    );
  }
  
  if (farms.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-center">
          <div className="text-yellow-600 mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-800">No Farms Found</h3>
            <p className="text-yellow-700 text-sm mt-1">
              You need to create a farm first before analyzing crops.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">📍</span>
          Select Farm & Block
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Choose the location for crop analysis. This helps track results over time.
        </p>
      </div>
      
      {/* Farm Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Farm
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={selectedFarm || ""}
          onChange={handleFarmChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          required
        >
          <option value="">Choose a farm</option>
          {farms.map((farm) => (
            <option key={farm.id} value={farm.id}>
              {farm.name} - {farm.total_area} hectares
            </option>
          ))}
        </select>
        
        {/* Selected Farm Info */}
        {selectedFarm && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-emerald-800">
                  {getSelectedFarm()?.name}
                </p>
                <p className="text-sm text-emerald-600">
                  {getSelectedFarm()?.total_area} hectares
                </p>
              </div>
              <span className="text-emerald-500">✓</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Block Selection */}
      {selectedFarm && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Block (Optional)
            <span className="text-gray-400 ml-1">- For precise tracking</span>
          </label>
          
          {blocks.length === 0 ? (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-600 text-center">
                No blocks found in this farm. 
                <br />
                <span className="text-sm">You can still analyze at farm level.</span>
              </p>
            </div>
          ) : (
            <>
              <select
                value={selectedBlock || ""}
                onChange={handleBlockChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              >
                <option value="">Choose a block (optional)</option>
                {blocks.map((block) => (
                  <option key={block.id} value={block.id}>
                    {block.name} - {block.area} hectares • {block.crop_type?.name || "No crop"}
                  </option>
                ))}
              </select>
              
              {/* Selected Block Info */}
              {selectedBlock && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-800">
                        {getSelectedBlock()?.name}
                      </p>
                      <p className="text-sm text-blue-600">
                        {getSelectedBlock()?.area} hectares • {getSelectedBlock()?.crop_type?.name || "No crop specified"}
                      </p>
                    </div>
                    <span className="text-blue-500">✓</span>
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* Add Block Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                // This could open a modal to add a block
                console.log("Add block clicked for farm:", selectedFarm);
              }}
              className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center justify-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Block to This Farm
            </button>
          </div>
        </div>
      )}
      
      {/* Selection Summary */}
      {(selectedFarm || selectedBlock) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Analysis Location</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-gray-500 text-sm w-24">Farm:</span>
                <span className="font-medium">
                  {getSelectedFarm()?.name || "Not selected"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm w-24">Block:</span>
                <span className="font-medium">
                  {getSelectedBlock()?.name || "Farm-wide analysis"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm w-24">Area:</span>
                <span className="font-medium">
                  {getSelectedBlock()?.area 
                    ? `${getSelectedBlock().area} hectares`
                    : `${getSelectedFarm()?.total_area || 0} hectares (entire farm)`
                  }
                </span>
              </div>
              {getSelectedBlock()?.crop_type && (
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm w-24">Current Crop:</span>
                  <span className="font-medium">
                    {getSelectedBlock().crop_type.name}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Analysis results will be saved to this location for historical tracking.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmBlockSelector;
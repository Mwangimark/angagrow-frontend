import { useEffect, useState } from "react";
import api from "../../utils/apis";

const FarmList = ({ farms, onAddBlock, refreshFarms }) => {
  const [blocks, setBlocks] = useState({}); // Store blocks by farm ID: {farmId: [blocks]}
  const [expandedFarm, setExpandedFarm] = useState(null); // Track which farm is expanded



  const fetchBlocks = async (farmId) => {
    try {
      const res = await api.get(`/farms/${farmId}/blocks/`);
      setBlocks(prev => ({
        ...prev,
        [farmId]: res.data
      }));

    } catch (error) {
      console.error(`Error fetching blocks for farm ${farmId}:`, error);
    }
  };


  const handleFarmClick = (farmId) => {
    if (expandedFarm === farmId) {
      setExpandedFarm(null); // Collapse if already expanded
    } else {
      setExpandedFarm(farmId); // Expand this farm
      // Fetch blocks if not already loaded
      if (!blocks[farmId]) {
        fetchBlocks(farmId);
      }
    }
  };

  const handleAddBlockClick = (farmId, farmName, farmTotalArea) => {
    if (onAddBlock) {
      onAddBlock(farmId, farmName, farmTotalArea);
      if (refreshFarms) {
        setTimeout(() => {
          refreshFarms();
        }, 1000);
      }
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Farms ({farms.length})</h2>

      {farms.length === 0 && (
        <p className="text-gray-500">No farms created yet.</p>
      )}

      <div className="grid gap-6">
        {farms.map((farm) => (
          <div
            key={farm.id}
            className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Farm Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div
                  onClick={() => handleFarmClick(farm.id)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <h3 className="font-bold text-xl text-gray-900">{farm.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a
                      href={`/crop-analysis?farm=${farm.id}&farm_name=${encodeURIComponent(farm.name)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-green-600 transition-all shadow-sm hover:shadow"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Analyze Farm
                    </a>

                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm hover:shadow">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Yield Estimate
                    </button>

                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm hover:shadow">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Grading
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">
                    Total Area: {farm.total_area} hectares
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Created: {new Date(farm.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Add Block Button */}
              <button
                onClick={() => handleAddBlockClick(farm.id, farm.name, farm.total_area)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ml-4"
              >
                + Add Block
              </button>
            </div>

            {/* Expanded Section for Blocks */}
            {expandedFarm === farm.id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">Blocks</h4>
                  <button
                    onClick={() => handleAddBlockClick(farm.id, farm.name, farm.total_area)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Add Another Block
                  </button>
                </div>

                {/* Show blocks if loaded */}
                {blocks[farm.id] ? (
                  blocks[farm.id].length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {blocks[farm.id].map((block) => (
                        <div key={block.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{block.name}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                {block.area} hectares • {block.crop_type?.name || "No crop"}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Created: {new Date(block.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${block.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                              }`}>
                              {block.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No blocks added yet</p>
                      <button
                        onClick={() => handleAddBlockClick(farm.id, farm.name, farm.total_area)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Add First Block
                      </button>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading blocks...</p>
                  </div>
                )}
              </div>
            )}

            {/* Expand/Collapse Indicator */}
            <div className="mt-4 text-center">
              <button
                onClick={() => handleFarmClick(farm.id)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto"
              >
                {expandedFarm === farm.id ? (
                  <>
                    <span>Show Less</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Show Blocks</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default FarmList;



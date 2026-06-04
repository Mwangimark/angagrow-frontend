import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // ✅ ADD THIS
import FarmerSummary from '../../components/dashboard/Farmerdb/FarmerSummary'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import CreateFarm from '../../components/farms/CreateFarm'
import CreateBlock from '../../components/farms/CreateBlock'
import FarmList from '../../components/farms/FarmList'
import api from '../../utils/apis'
import { getAccessToken, isTokenExpired } from '../../utils/auth' // ✅ ADD THIS

const Dashboardfarmer = () => {
  const navigate = useNavigate() // ✅ ADD THIS
  const [showCreateFarm, setShowCreateFarm] = useState(false)
  const [showCreateBlock, setShowCreateBlock] = useState(false)
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentFarmId, setCurrentFarmId] = useState(null)
  const [currentFarmName, setCurrentFarmName] = useState("")
  const [currentFarmTotalArea, setCurrentFarmTotalArea] = useState(0)

  const refreshFarmsData = async () => {
    await checkUserFarms();
  };

  // ✅ UPDATE THIS useEffect - Check token FIRST
  useEffect(() => {
    const validateAndFetch = async () => {
      const token = getAccessToken();
      
      console.log('🔍 Checking token...');
      console.log('Token exists:', !!token);
      
      if (!token) {
        console.log('❌ No token found, redirecting to login');
        navigate('/login');
        return;
      }
      
      if (isTokenExpired()) {
        console.log('❌ Token expired, clearing and redirecting to login');
        localStorage.clear();
        navigate('/login');
        return;
      }
      
      console.log('✅ Token valid, fetching farms...');
      await checkUserFarms();
    };
    
    validateAndFetch();
  }, []); // ✅ Empty dependency array - runs once on mount

  // ✅ UPDATE checkUserFarms with better error handling
  const checkUserFarms = async () => {
    try {
      console.log('📡 Fetching farms from /farming/farms');
      const response = await api.get("/farming/farms")
      console.log('✅ Farms fetched:', response.data);
      setFarms(response.data)

      if (response.data.length === 0) {
        startFarmCreationFlow()
      }
    } catch (error) {
      console.error('Error fetching farms:', error)

      if (error.response?.status === 401) {
        console.log('🔐 401 Unauthorized - Token invalid, redirecting to login');
        localStorage.clear();
        navigate('/login');
      } else {
        console.error('Failed to load farms:', error.message);
      }
    } finally {
      setLoading(false)
    }
  }

  // Rest of your functions remain exactly the same...
  const startFarmCreationFlow = () => {
    setShowCreateFarm(true)
    setShowCreateBlock(false)
    setCurrentFarmId(null)
    setCurrentFarmName("")
    setCurrentFarmTotalArea(0)
  }

  const handleFarmCreated = (farmId, farmName, farmTotalArea) => {
    setCurrentFarmId(farmId)
    setCurrentFarmName(farmName)
    setCurrentFarmTotalArea(farmTotalArea)
    setShowCreateFarm(false)
    setShowCreateBlock(true)
  }

  const handleBlockCreated = () => {
    setTimeout(async () => {
      await checkUserFarms();
    }, 500);
  }

  const handleSkipBlocks = () => {
    setShowCreateBlock(false)
    checkUserFarms()
    console.log(`Farm ${currentFarmName} created without blocks`)
  }

  const handleAddBlockToFarm = (farmId, farmName, farmTotalArea) => {
    setCurrentFarmId(farmId)
    setCurrentFarmName(farmName)
    setCurrentFarmTotalArea(farmTotalArea)
    setShowCreateBlock(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <DashboardHeader />

      <div className={`transition-all duration-300 ${showCreateFarm || showCreateBlock ? 'opacity-30 blur-sm pointer-events-none' : 'opacity-100'
        }`}>
        <FarmerSummary />

        {farms.length > 0 && (
          <div className="container mx-auto px-4 mt-8">
            <FarmList farms={farms} onAddBlock={handleAddBlockToFarm} refreshFarms={refreshFarmsData} />
          </div>
        )}

        {!showCreateFarm && !showCreateBlock && (
          <div className="container mx-auto px-4 mt-8">
            <button
              onClick={startFarmCreationFlow}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span>+ Add New Farm</span>
            </button>
            <p className="text-gray-500 text-sm mt-2">
              Create a new farm and add blocks for different crops
            </p>
          </div>
        )}
      </div>

      {showCreateFarm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-2xl">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {farms.length === 0 ? 'Create Your First Farm' : 'Add New Farm'}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    You'll be able to add blocks for different crops after creating the farm
                  </p>
                </div>
                {farms.length > 0 && (
                  <button
                    onClick={() => setShowCreateFarm(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                )}
              </div>
              <CreateFarm
                onFarmCreatedWithId={handleFarmCreated}
                isFirstFarm={farms.length === 0}
                showTitle={false}
              />
            </div>
          </div>
        </div>
      )}

      {showCreateBlock && currentFarmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-2xl">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Add Blocks to {currentFarmName}
                  </h2>
                  <p className="text-gray-600">
                    {currentFarmTotalArea > 0
                      ? `Farm area: ${currentFarmTotalArea} hectares. Add blocks for different crops.`
                      : 'Add blocks for different crops within your farm.'
                    }
                  </p>
                </div>
                <button
                  onClick={handleSkipBlocks}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <CreateBlock
                farmId={currentFarmId}
                farmTotalArea={currentFarmTotalArea}
                onBlockCreated={handleBlockCreated}
              />
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSkipBlocks}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium mt-2"
                >
                  Done, Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboardfarmer
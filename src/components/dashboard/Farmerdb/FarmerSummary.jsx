// FarmerSummary.jsx
import React from 'react';
import { 
  FaChartLine, 
  FaMoneyBillWave, 
  FaShoppingCart, 
  FaSeedling, 
  FaChartPie, 
  FaCheckCircle,
  FaLeaf,
  FaTractor,
  FaCalendarCheck,
  FaBoxOpen,
  FaUsers,
  FaSprayCan,
  FaClipboardCheck,
  FaPercent
} from 'react-icons/fa';
import { GiFruitTree, GiWheat } from 'react-icons/gi';
import { MdTrendingUp, MdLocalOffer } from 'react-icons/md';

const FarmerSummary = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl shadow-2xl font-sans">

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        {/* Total Est. Yield (Active Green Card) */}
        <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 text-white p-6 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
          <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-lg"></div>
          
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <GiWheat className="text-2xl" />
              </div>
              <h3 className="font-bold text-xl">Total Est. Yield</h3>
            </div>
            <div className="p-2 bg-gradient-to-br from-white/30 to-transparent rounded-full">
              <MdTrendingUp className="text-2xl" />
            </div>
          </div>

          <div className="text-5xl font-black relative z-10 mb-2 tracking-tight">33,000T</div>
          <div className="flex items-center gap-2 text-green-100 font-medium">
            <FaChartLine className="text-sm" />
            <span>Year-to-date performance • All crops</span>
          </div>
        </div>

        {/* Total Est. Value of Yield (Grey Inactive Card) */}
        <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6 text-gray-800 rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-xl"></div>
          
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
                <FaMoneyBillWave className="text-2xl text-emerald-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-800">Total Est. Value</h3>
            </div>
            <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
              <FaPercent className="text-xl text-emerald-600" />
            </div>
          </div>

          <div className="text-5xl font-black relative z-10 text-gray-900 mb-2">KES. 200 M</div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 rounded-full shadow-md">
              ↑ 15% from Last Month
            </div>
            <span className="text-sm text-gray-600 font-medium">+KES 25M growth</span>
          </div>
        </div>

      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Harvest Highlights */}
          <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-6 rounded-3xl shadow-lg border border-amber-200/60 transform transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full -mr-6 -mt-6 blur-md"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl shadow-md">
                <FaShoppingCart className="text-2xl text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-xl">Harvest Highlights</h3>
            </div>
            
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                <FaUsers className="text-amber-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">20 interested buyers</span>
                  <span className="text-gray-600"> actively engaged this season</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                <FaChartLine className="text-emerald-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">7% YTD growth</span>
                  <span className="text-gray-600"> representing </span>
                  <span className="font-bold text-emerald-600">KES 100M</span>
                  <span className="text-gray-600"> increase</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                <MdTrendingUp className="text-green-500 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">12% projected growth rate</span>
                  <span className="text-gray-600"> for next quarter</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Status Summary */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-md">
                <FaChartPie className="text-2xl text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-xl">Status Summary</h3>
            </div>

            <div className="grid grid-cols-2 gap-5">

              {/* Cycle Yield */}
              <div className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-5 rounded-2xl border border-blue-200 shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group">
                <div className="absolute top-4 right-4 p-3 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full">
                  <GiFruitTree className="text-blue-600 text-xl" />
                </div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaSeedling className="text-blue-500" />
                  Cycle Yield
                </h4>
                <div className="text-3xl font-black text-gray-900 mb-2">20,000 T</div>
                <div className="text-lg font-bold text-blue-700 flex items-center gap-2">
                  <FaMoneyBillWave />
                  KES. 177M
                </div>
                <div className="mt-3 text-xs text-blue-600 font-medium bg-blue-100/50 px-3 py-1 rounded-full">
                  Active harvesting
                </div>
              </div>

              {/* Buyer Pending Sales */}
              <div className="relative bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 p-5 rounded-2xl border border-purple-200 shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group">
                <div className="absolute top-4 right-4 p-3 bg-gradient-to-br from-purple-200 to-violet-200 rounded-full">
                  <MdLocalOffer className="text-purple-600 text-xl" />
                </div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaCalendarCheck className="text-purple-500" />
                  Pending Sales
                </h4>
                <div className="text-3xl font-black text-gray-900 mb-2">7,000T</div>
                <div className="text-lg font-bold text-purple-700 flex items-center gap-2">
                  <FaMoneyBillWave />
                  KES. 50M
                </div>
                <div className="mt-3 text-xs text-purple-600 font-medium bg-purple-100/50 px-3 py-1 rounded-full">
                  15 buyers waiting
                </div>
              </div>

              {/* Completed Sales */}
              <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-5 rounded-2xl border border-green-200 shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group">
                <div className="absolute top-4 right-4 p-3 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaBoxOpen className="text-green-500" />
                  Completed Sales
                </h4>
                <div className="text-3xl font-black text-gray-900 mb-2">10,000T</div>
                <div className="text-lg font-bold text-green-700 flex items-center gap-2">
                  <FaMoneyBillWave />
                  KES. 120M
                </div>
                <div className="mt-3 text-xs text-green-600 font-medium bg-green-100/50 px-3 py-1 rounded-full">
                  Delivered ✓
                </div>
              </div>

              {/* Number of Orders */}
              <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-5 rounded-2xl border border-amber-200 shadow-lg transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group">
                <div className="absolute top-4 right-4 p-3 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full">
                  <FaClipboardCheck className="text-amber-600 text-xl" />
                </div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaShoppingCart className="text-amber-500" />
                  Active Orders
                </h4>
                <div className="text-3xl font-black text-gray-900 mb-2">3,000T</div>
                <div className="text-lg font-bold text-amber-700 flex items-center gap-2">
                  <FaMoneyBillWave />
                  KES. 7M
                </div>
                <div className="mt-3 text-xs text-amber-600 font-medium bg-amber-100/50 px-3 py-1 rounded-full">
                  8 orders in process
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Current Cycle Highlights */}
          <div className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6 rounded-3xl border border-indigo-200/60 shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full -mr-6 -mt-6 blur-md"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-md">
                <FaLeaf className="text-2xl text-white" />
              </div>
              <h3 className="font-bold text-gray-800 text-xl">Current Cycle</h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FaUsers className="text-indigo-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">102M buyer commitments</div>
                  <div className="text-sm text-gray-600">Total secured contracts</div>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FaChartLine className="text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">6.8% YTD growth</div>
                  <div className="text-sm text-gray-600">From 100M base value</div>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MdTrendingUp className="text-green-600 text-xl" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">12% projected growth</div>
                  <div className="text-sm text-gray-600">Next quarter forecast</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Crops Analysis Done */}
          <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 text-white p-6 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
            <div className="absolute top-4 right-4 w-24 h-24 bg-white/15 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/10 rounded-full blur-lg"></div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="p-3 bg-white/25 rounded-2xl backdrop-blur-sm">
                <FaTractor className="text-2xl" />
              </div>
              <h3 className="font-bold text-xl">Crops Analysis</h3>
            </div>
            
            <div className="text-4xl font-black relative z-10 mb-2 tracking-tight">60 HA</div>
            <div className="text-xl font-bold text-emerald-100 relative z-10 mb-4 flex items-center gap-2">
              <FaMoneyBillWave />
              KES. 5.7B
            </div>
            <div className="flex items-center gap-2 text-emerald-200 font-medium bg-white/10 px-4 py-2 rounded-full inline-block">
              <FaClipboardCheck />
              <span>Analysis completed</span>
            </div>
          </div>

          {/* Sprays Done */}
          <div className="relative bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 p-6 rounded-3xl border border-teal-200/60 shadow-lg transform transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-4 right-4 p-3 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full">
              <FaSprayCan className="text-teal-600 text-xl" />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl">
                <FaSprayCan className="text-white text-xl" />
              </div>
              <h3 className="font-bold text-gray-800 text-xl">Sprays Done</h3>
            </div>
            
            <div className="text-4xl font-black text-gray-900 mb-2">20 Sprays</div>
            <div className="text-xl font-bold text-teal-700 mb-4 flex items-center gap-2">
              <FaMoneyBillWave />
              KES. 800K
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 rounded-full shadow-md">
                On schedule ✓
              </div>
              <span className="text-sm text-gray-600 font-medium">Next: 3 days</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FarmerSummary;
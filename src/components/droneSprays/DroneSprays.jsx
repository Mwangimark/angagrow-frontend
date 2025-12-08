// // pages/DroneSprays.js
// import React, { useState } from 'react';
// import { 
//   FiCalendar, 
//   FiMapPin, 
//   FiClock, 
//   FiDollarSign, 
//   FiCheckCircle, 
//   FiAlertTriangle,
//   FiPlay,
//   FiWind,
//   FiThermometer,
//   FiDroplet,
//   FiBarChart2
// } from 'react-icons/fi';
// import { droneSpraysData } from '../../data/droneSpraysData';

// const DroneSprays = () => {
//   const [activeTab, setActiveTab] = useState('scheduled');
//   const [selectedSpray, setSelectedSpray] = useState(null);

//   const statusConfig = {
//     completed: { color: 'bg-green-500', icon: <FiCheckCircle />, text: 'Completed' },
//     scheduled: { color: 'bg-blue-500', icon: <FiPlay />, text: 'Scheduled' },
//     pending: { color: 'bg-yellow-500', icon: <FiClock />, text: 'Pending' },
//     cancelled: { color: 'bg-red-500', icon: <FiAlertTriangle />, text: 'Cancelled' }
//   };

//   const priorityConfig = {
//     high: { color: 'bg-red-100 text-red-800 border-red-200', text: 'High Priority' },
//     medium: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Medium Priority' },
//     low: { color: 'bg-green-100 text-green-800 border-green-200', text: 'Low Priority' }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Drone Spray Management</h1>
//         <p className="text-gray-600">Schedule, monitor, and analyze drone spray operations</p>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl p-5 border border-green-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Sprays</p>
//               <p className="text-3xl font-bold text-gray-800">{droneSpraysData.statistics.totalSprays}</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
//               <FiBarChart2 className="w-6 h-6 text-green-600" />
//             </div>
//           </div>
//           <p className="text-sm text-green-700 mt-2">↑ 12% from last month</p>
//         </div>

//         <div className="bg-gradient-to-r from-blue-50 to-cyan-100 rounded-xl p-5 border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Success Rate</p>
//               <p className="text-3xl font-bold text-gray-800">{droneSpraysData.statistics.averageEfficiency}%</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
//               <FiCheckCircle className="w-6 h-6 text-blue-600" />
//             </div>
//           </div>
//           <p className="text-sm text-blue-700 mt-2">21 successful sprays</p>
//         </div>

//         <div className="bg-gradient-to-r from-amber-50 to-yellow-100 rounded-xl p-5 border border-amber-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Area</p>
//               <p className="text-3xl font-bold text-gray-800">{droneSpraysData.statistics.totalArea}</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
//               <FiMapPin className="w-6 h-6 text-amber-600" />
//             </div>
//           </div>
//           <p className="text-sm text-amber-700 mt-2">42.7 acres covered</p>
//         </div>

//         <div className="bg-gradient-to-r from-purple-50 to-pink-100 rounded-xl p-5 border border-purple-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Cost</p>
//               <p className="text-3xl font-bold text-gray-800">{droneSpraysData.statistics.totalCost}</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
//               <FiDollarSign className="w-6 h-6 text-purple-600" />
//             </div>
//           </div>
//           <p className="text-sm text-purple-700 mt-2">Average KES 7,800 per spray</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-2 mb-6 border-b border-gray-200">
//         <button
//           onClick={() => setActiveTab('scheduled')}
//           className={`px-4 py-2 font-medium ${activeTab === 'scheduled' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
//         >
//           Scheduled Sprays ({droneSpraysData.scheduledSprays.length})
//         </button>
//         <button
//           onClick={() => setActiveTab('past')}
//           className={`px-4 py-2 font-medium ${activeTab === 'past' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
//         >
//           Past Sprays ({droneSpraysData.pastSprays.length})
//         </button>
//         <button
//           onClick={() => setActiveTab('pilots')}
//           className={`px-4 py-2 font-medium ${activeTab === 'pilots' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
//         >
//           Available Pilots ({droneSpraysData.pilots.filter(p => p.availability === 'available').length})
//         </button>
//         <button
//           onClick={() => setActiveTab('chemicals')}
//           className={`px-4 py-2 font-medium ${activeTab === 'chemicals' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
//         >
//           Chemicals ({droneSpraysData.chemicals.length})
//         </button>
//       </div>

//       {/* Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Content */}
//         <div className="lg:col-span-2">
//           {activeTab === 'scheduled' && (
//             <div className="space-y-4">
//               {droneSpraysData.scheduledSprays.map((spray) => (
//                 <div key={spray.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//                   <div className="flex items-start justify-between mb-4">
//                     <div>
//                       <div className="flex items-center gap-3 mb-2">
//                         <h3 className="text-xl font-bold text-gray-800">{spray.fieldName}</h3>
//                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityConfig[spray.priority].color} border`}>
//                           {priorityConfig[spray.priority].text}
//                         </span>
//                       </div>
//                       <p className="text-gray-600">{spray.area} • {spray.cropType}</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusConfig[spray.status].color.replace('bg-', 'bg-')} text-white`}>
//                         {statusConfig[spray.status].icon}
//                         {statusConfig[spray.status].text}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                     <div className="flex items-center gap-2">
//                       <FiCalendar className="text-gray-400" />
//                       <div>
//                         <p className="text-sm text-gray-500">Date</p>
//                         <p className="font-medium">{spray.scheduledDate}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FiClock className="text-gray-400" />
//                       <div>
//                         <p className="text-sm text-gray-500">Time</p>
//                         <p className="font-medium">{spray.scheduledTime}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FiDollarSign className="text-gray-400" />
//                       <div>
//                         <p className="text-sm text-gray-500">Cost</p>
//                         <p className="font-medium">{spray.estimatedCost}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FiWind className="text-gray-400" />
//                       <div>
//                         <p className="text-sm text-gray-500">Duration</p>
//                         <p className="font-medium">{spray.duration}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Reason: {spray.reason}</p>
//                       <p className="text-sm text-gray-600">Pilot: {spray.pilot}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//                         Start Spray
//                       </button>
//                       <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                         Reschedule
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Similar blocks for other tabs */}
//           {activeTab === 'past' && (
//             <div className="space-y-4">
//               {droneSpraysData.pastSprays.map((spray) => (
//                 <div key={spray.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
//                   {/* Past spray card similar to above */}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Quick Schedule Card */}
//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
//             <h3 className="text-xl font-bold mb-4">Schedule New Spray</h3>
//             <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors mb-3">
//               Select Field
//             </button>
//             <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors mb-3">
//               Choose Chemical
//             </button>
//             <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors mb-3">
//               Pick Pilot
//             </button>
//             <button className="w-full py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50">
//               Schedule Now
//             </button>
//           </div>

//           {/* Weather Conditions */}
//           <div className="bg-white rounded-xl border border-gray-200 p-5">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Optimal Spray Conditions</h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <FiWind className="text-blue-500" />
//                   <span className="text-gray-600">Wind Speed</span>
//                 </div>
//                 <span className="font-medium text-green-600">{droneSpraysData.sprayConditions.optimal.windSpeed}</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <FiThermometer className="text-red-500" />
//                   <span className="text-gray-600">Temperature</span>
//                 </div>
//                 <span className="font-medium text-green-600">{droneSpraysData.sprayConditions.optimal.temperature}</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <FiDroplet className="text-blue-400" />
//                   <span className="text-gray-600">Humidity</span>
//                 </div>
//                 <span className="font-medium text-green-600">{droneSpraysData.sprayConditions.optimal.humidity}</span>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Weather */}
//           <div className="bg-white rounded-xl border border-gray-200 p-5">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Weather Forecast</h3>
//             <div className="space-y-3">
//               {droneSpraysData.scheduledSprays.map((spray) => (
//                 <div key={spray.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   <div>
//                     <p className="font-medium">{spray.scheduledDate}</p>
//                     <p className="text-sm text-gray-600">{spray.fieldName}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-medium text-green-600">{spray.weatherForecast.temperature}</p>
//                     <p className="text-sm text-gray-600">{spray.weatherForecast.windSpeed} wind</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DroneSprays;
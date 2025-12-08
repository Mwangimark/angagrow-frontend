// // pages/DroneSpray.js
// import React, { useState } from 'react';
// import { 
//   FiCalendar, 
//   FiMapPin, 
//   FiDroplet, 
//   FiClock, 
//   FiCheckCircle, 
//   FiAlertCircle,
//   FiPlay,
//   FiPause,
//   FiDownload,
//   FiFilter,
//   FiPlus,
//   FiEye,
//   FiEdit,
//   FiTrash2
// } from 'react-icons/fi';
// import { 
//   FaDrone, 
//   FaLeaf, 
//   FaWater, 
//   FaChartLine,
//   FaTractor
// } from 'react-icons/fa';

// const DroneSpray = () => {
//   const [activeTab, setActiveTab] = useState('scheduled');

//   // Dummy spray sessions
//   const spraySessions = {
//     scheduled: [
//       {
//         id: 1,
//         fieldName: 'Maize Field A',
//         location: 'Nairobi West',
//         date: '2024-01-20',
//         time: '09:00 AM',
//         area: '5 acres',
//         pesticide: 'Herbicide A',
//         quantity: '10L',
//         droneModel: 'DJI Agras T40',
//         pilot: 'John Kamau',
//         status: 'scheduled',
//         priority: 'high',
//       },
//       {
//         id: 2,
//         fieldName: 'Coffee Plantation',
//         location: 'Kiambu',
//         date: '2024-01-21',
//         time: '11:00 AM',
//         area: '8 acres',
//         pesticide: 'Fungicide B',
//         quantity: '15L',
//         droneModel: 'DJI Agras T30',
//         pilot: 'Sarah Wanjiku',
//         status: 'scheduled',
//         priority: 'medium',
//       },
//       {
//         id: 3,
//         fieldName: 'Wheat Field',
//         location: 'Nakuru',
//         date: '2024-01-22',
//         time: '02:00 PM',
//         area: '12 acres',
//         pesticide: 'Insecticide C',
//         quantity: '20L',
//         droneModel: 'DJI Agras T20',
//         pilot: 'Peter Ochieng',
//         status: 'scheduled',
//         priority: 'low',
//       },
//     ],
//     inProgress: [
//       {
//         id: 4,
//         fieldName: 'Tomato Greenhouse',
//         location: 'Thika',
//         date: '2024-01-19',
//         time: '10:30 AM',
//         area: '3 acres',
//         pesticide: 'Herbicide D',
//         quantity: '8L',
//         droneModel: 'DJI Agras T40',
//         pilot: 'Mike Otieno',
//         status: 'in-progress',
//         progress: 65,
//         estimatedCompletion: '45 mins',
//       },
//     ],
//     completed: [
//       {
//         id: 5,
//         fieldName: 'Sugarcane Field',
//         location: 'Kisumu',
//         date: '2024-01-18',
//         time: '08:00 AM',
//         area: '15 acres',
//         pesticide: 'Herbicide E',
//         quantity: '25L',
//         droneModel: 'DJI Agras T30',
//         pilot: 'Jane Akinyi',
//         status: 'completed',
//         completionTime: '2 hours',
//         efficiency: '92%',
//         coverage: '98%',
//       },
//       {
//         id: 6,
//         fieldName: 'Rice Paddy',
//         location: 'Mwea',
//         date: '2024-01-17',
//         time: '07:30 AM',
//         area: '20 acres',
//         pesticide: 'Fungicide F',
//         quantity: '30L',
//         droneModel: 'DJI Agras T40',
//         pilot: 'David Njoroge',
//         status: 'completed',
//         completionTime: '3.5 hours',
//         efficiency: '88%',
//         coverage: '95%',
//       },
//     ],
//   };

//   // Dummy drone fleet
//   const droneFleet = [
//     {
//       id: 1,
//       model: 'DJI Agras T40',
//       status: 'available',
//       battery: 85,
//       capacity: '40L',
//       lastService: '2024-01-10',
//       nextService: '2024-02-10',
//       totalSprays: 45,
//       efficiency: '94%',
//     },
//     {
//       id: 2,
//       model: 'DJI Agras T30',
//       status: 'in-use',
//       battery: 42,
//       capacity: '30L',
//       lastService: '2024-01-12',
//       nextService: '2024-02-12',
//       totalSprays: 32,
//       efficiency: '91%',
//     },
//     {
//       id: 3,
//       model: 'DJI Agras T20',
//       status: 'maintenance',
//       battery: 0,
//       capacity: '20L',
//       lastService: '2024-01-15',
//       nextService: '2024-01-25',
//       totalSprays: 28,
//       efficiency: '89%',
//     },
//   ];

//   // Dummy statistics
//   const stats = {
//     totalSprays: 24,
//     areaCovered: '156 acres',
//     avgEfficiency: '91%',
//     pesticidesUsed: '320L',
//     costSaved: '$4,800',
//     timeSaved: '48 hours',
//   };

//   // Dummy weather data
//   const weather = {
//     temperature: '24°C',
//     humidity: '65%',
//     windSpeed: '12 km/h',
//     windDirection: 'NE',
//     forecast: 'Clear',
//     suitableForSpray: true,
//   };

//   const [newSpray, setNewSpray] = useState({
//     fieldName: '',
//     location: '',
//     date: '',
//     time: '',
//     area: '',
//     pesticide: '',
//     quantity: '',
//     notes: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewSpray(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleScheduleSpray = () => {
//     alert('Spray scheduled successfully!');
//     setNewSpray({
//       fieldName: '',
//       location: '',
//       date: '',
//       time: '',
//       area: '',
//       pesticide: '',
//       quantity: '',
//       notes: '',
//     });
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'scheduled': return 'bg-blue-100 text-blue-800';
//       case 'in-progress': return 'bg-yellow-100 text-yellow-800';
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority) {
//       case 'high': return 'bg-red-100 text-red-800';
//       case 'medium': return 'bg-yellow-100 text-yellow-800';
//       case 'low': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getDroneStatusColor = (status) => {
//     switch(status) {
//       case 'available': return 'bg-green-100 text-green-800';
//       case 'in-use': return 'bg-blue-100 text-blue-800';
//       case 'maintenance': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Drone Spray Management</h1>
//           <p className="text-gray-600">Schedule, track, and manage drone spraying operations</p>
//         </div>
        
//         <button className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
//           <FiPlus /> Schedule New Spray
//         </button>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
//         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <FaDrone className="text-green-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-800">{stats.totalSprays}</p>
//               <p className="text-sm text-gray-600">Total Sprays</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <FaLeaf className="text-blue-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-800">{stats.areaCovered}</p>
//               <p className="text-sm text-gray-600">Area Covered</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-yellow-100 rounded-lg">
//               <FaChartLine className="text-yellow-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-800">{stats.avgEfficiency}</p>
//               <p className="text-sm text-gray-600">Avg Efficiency</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-purple-100 rounded-lg">
//               <FaWater className="text-purple-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-800">{stats.pesticidesUsed}</p>
//               <p className="text-sm text-gray-600">Pesticides Used</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <FaTractor className="text-red-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-800">{stats.costSaved}</p>
//               <p className="text-sm text-gray-600">Cost Saved</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-indigo-100 rounded-lg">
//               <FiClock className="text-indigo-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-800">{stats.timeSaved}</p>
//               <p className="text-sm text-gray-600">Time Saved</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Spray Sessions */}
//         <div className="lg:col-span-2">
//           {/* Tabs */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
//             <div className="flex border-b border-gray-200">
//               {['scheduled', 'in-progress', 'completed'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`flex-1 py-4 text-center font-medium transition-colors ${
//                     activeTab === tab
//                       ? 'text-green-600 border-b-2 border-green-600'
//                       : 'text-gray-600 hover:text-gray-800'
//                   }`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)} ({spraySessions[tab].length})
//                 </button>
//               ))}
//             </div>

//             {/* Spray Sessions List */}
//             <div className="p-4">
//               {spraySessions[activeTab].map((session) => (
//                 <div key={session.id} className="mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h3 className="font-bold text-gray-800">{session.fieldName}</h3>
//                       <div className="flex items-center gap-2 mt-1">
//                         <FiMapPin className="text-gray-400" />
//                         <span className="text-sm text-gray-600">{session.location}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
//                         {session.status}
//                       </span>
//                       {session.priority && (
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(session.priority)}`}>
//                           {session.priority}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
//                     <div className="flex items-center gap-2">
//                       <FiCalendar className="text-gray-400" />
//                       <div>
//                         <p className="text-xs text-gray-500">Date</p>
//                         <p className="text-sm font-medium">{session.date} {session.time}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FiDroplet className="text-gray-400" />
//                       <div>
//                         <p className="text-xs text-gray-500">Pesticide</p>
//                         <p className="text-sm font-medium">{session.pesticide} ({session.quantity})</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FaDrone className="text-gray-400" />
//                       <div>
//                         <p className="text-xs text-gray-500">Drone</p>
//                         <p className="text-sm font-medium">{session.droneModel}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <FiClock className="text-gray-400" />
//                       <div>
//                         <p className="text-xs text-gray-500">Area</p>
//                         <p className="text-sm font-medium">{session.area}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Progress bar for in-progress sessions */}
//                   {session.progress && (
//                     <div className="mb-3">
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="text-gray-600">Progress</span>
//                         <span className="font-medium">{session.progress}%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div 
//                           className="bg-green-500 h-2 rounded-full" 
//                           style={{ width: `${session.progress}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Actions */}
//                   <div className="flex justify-between items-center">
//                     <div className="text-sm text-gray-600">
//                       Pilot: <span className="font-medium">{session.pilot}</span>
//                     </div>
//                     <div className="flex gap-2">
//                       <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
//                         <FiEye />
//                       </button>
//                       <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
//                         <FiEdit />
//                       </button>
//                       <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//                         <FiTrash2 />
//                       </button>
//                       {session.status === 'scheduled' && (
//                         <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
//                           Start Spray
//                         </button>
//                       )}
//                       {session.status === 'in-progress' && (
//                         <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors">
//                           Pause
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Schedule New Spray Form */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-6">Schedule New Spray</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Field Name</label>
//                 <input
//                   type="text"
//                   name="fieldName"
//                   value={newSpray.fieldName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Enter field name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={newSpray.location}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Enter location"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={newSpray.date}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
//                 <input
//                   type="time"
//                   name="time"
//                   value={newSpray.time}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Area (acres)</label>
//                 <input
//                   type="text"
//                   name="area"
//                   value={newSpray.area}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="e.g., 5 acres"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Pesticide Type</label>
//                 <select
//                   name="pesticide"
//                   value={newSpray.pesticide}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   <option value="">Select pesticide</option>
//                   <option value="Herbicide">Herbicide</option>
//                   <option value="Insecticide">Insecticide</option>
//                   <option value="Fungicide">Fungicide</option>
//                   <option value="Fertilizer">Fertilizer</option>
//                 </select>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
//                 <textarea
//                   name="notes"
//                   value={newSpray.notes}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Additional instructions or notes..."
//                 ></textarea>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3 mt-6">
//               <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleScheduleSpray}
//                 className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//               >
//                 Schedule Spray
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Drone Fleet */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-bold text-gray-800">Drone Fleet</h3>
//               <button className="text-sm text-green-600 hover:text-green-700 font-medium">
//                 View All →
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {droneFleet.map((drone) => (
//                 <div key={drone.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h4 className="font-bold text-gray-800">{drone.model}</h4>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDroneStatusColor(drone.status)}`}>
//                           {drone.status}
//                         </span>
//                         <span className="text-xs text-gray-500">Capacity: {drone.capacity}</span>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold text-gray-800">{drone.battery}%</div>
//                       <div className="text-xs text-gray-500">Battery</div>
//                     </div>
//                   </div>
                  
//                   <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
//                     <div 
//                       className={`h-2 rounded-full ${
//                         drone.battery > 70 ? 'bg-green-500' :
//                         drone.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'
//                       }`}
//                       style={{ width: `${drone.battery}%` }}
//                     ></div>
//                   </div>
                  
//                   <div className="grid grid-cols-2 gap-2 text-sm">
//                     <div className="text-gray-600">Efficiency</div>
//                     <div className="text-right font-medium">{drone.efficiency}</div>
//                     <div className="text-gray-600">Total Sprays</div>
//                     <div className="text-right font-medium">{drone.totalSprays}</div>
//                     <div className="text-gray-600">Next Service</div>
//                     <div className="text-right font-medium">{drone.nextService}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Weather Conditions */}
//           <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
//             <h3 className="text-xl font-bold mb-4">Weather Conditions</h3>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <div className="text-3xl font-bold">{weather.temperature}</div>
//                 <div className="text-blue-100">Current Temperature</div>
//               </div>
//               <div className="text-5xl">☀️</div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <div className="text-sm text-blue-200">Humidity</div>
//                 <div className="font-medium">{weather.humidity}</div>
//               </div>
//               <div>
//                 <div className="text-sm text-blue-200">Wind Speed</div>
//                 <div className="font-medium">{weather.windSpeed}</div>
//               </div>
//               <div>
//                 <div className="text-sm text-blue-200">Forecast</div>
//                 <div className="font-medium">{weather.forecast}</div>
//               </div>
//               <div>
//                 <div className="text-sm text-blue-200">Spray Suitable</div>
//                 <div className={`font-medium ${weather.suitableForSpray ? 'text-green-300' : 'text-red-300'}`}>
//                   {weather.suitableForSpray ? 'Yes ✓' : 'No ✗'}
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6 pt-4 border-t border-blue-400">
//               <p className="text-sm text-blue-200">
//                 {weather.suitableForSpray 
//                   ? 'Perfect conditions for drone spraying today!' 
//                   : 'Weather conditions not ideal for spraying.'}
//               </p>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
//             <div className="space-y-3">
//               <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-100 rounded-lg">
//                     <FiDownload className="text-blue-600" />
//                   </div>
//                   <span className="font-medium">Download Reports</span>
//                 </div>
//                 <span className="text-gray-400">→</span>
//               </button>
              
//               <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-green-100 rounded-lg">
//                     <FiFilter className="text-green-600" />
//                   </div>
//                   <span className="font-medium">View Analytics</span>
//                 </div>
//                 <span className="text-gray-400">→</span>
//               </button>
              
//               <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-purple-100 rounded-lg">
//                     <FiCheckCircle className="text-purple-600" />
//                   </div>
//                   <span className="font-medium">Check Compliance</span>
//                 </div>
//                 <span className="text-gray-400">→</span>
//               </button>
              
//               <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-red-100 rounded-lg">
//                     <FiAlertCircle className="text-red-600" />
//                   </div>
//                   <span className="font-medium">Emergency Stop</span>
//                 </div>
//                 <span className="text-gray-400">→</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DroneSpray;
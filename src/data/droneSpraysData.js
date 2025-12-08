// data/droneSprays.js
export const droneSpraysData = {
  // Past Spray Sessions
  pastSprays: [
    {
      id: 1,
      fieldName: "North Maize Field",
      area: "5.2 acres",
      cropType: "Maize",
      status: "completed",
      date: "2025-12-05",
      duration: "45 min",
      droneModel: "DJI Agras T40",
      pilot: "John Kamau",
      chemicalUsed: "Herbicide",
      chemicalAmount: "2.5L",
      cost: "KES 8,500",
      windSpeed: "3.2 km/h",
      temperature: "24°C",
      coverageRate: "98%",
      efficiencyScore: 92,
      notes: "Applied evenly, minimal drift",
      beforeImage: "/dummy/spray-before-1.jpg",
      afterImage: "/dummy/spray-after-1.jpg",
      coordinates: [
        { lat: -1.2921, lng: 36.8219 },
        { lat: -1.2915, lng: 36.8225 },
        { lat: -1.2908, lng: 36.8212 },
        { lat: -1.2918, lng: 36.8208 }
      ]
    },
    {
      id: 2,
      fieldName: "Coffee Plantation A",
      area: "3.8 acres",
      cropType: "Coffee",
      status: "completed",
      date: "2025-12-03",
      duration: "32 min",
      droneModel: "DJI Agras T30",
      pilot: "Sarah Wanjiku",
      chemicalUsed: "Fungicide",
      chemicalAmount: "1.8L",
      cost: "KES 12,300",
      windSpeed: "2.1 km/h",
      temperature: "22°C",
      coverageRate: "95%",
      efficiencyScore: 88,
      notes: "Targeted rust-infected areas",
      coordinates: [
        { lat: -1.2850, lng: 36.8180 },
        { lat: -1.2845, lng: 36.8190 },
        { lat: -1.2838, lng: 36.8175 }
      ]
    },
    {
      id: 3,
      fieldName: "Wheat Field East",
      area: "7.1 acres",
      cropType: "Wheat",
      status: "cancelled",
      date: "2025-11-28",
      duration: "N/A",
      droneModel: "DJI Agras T20",
      pilot: "Michael Otieno",
      chemicalUsed: "Pesticide",
      chemicalAmount: "3.2L",
      cost: "KES 0",
      windSpeed: "8.5 km/h",
      temperature: "26°C",
      coverageRate: "0%",
      efficiencyScore: 0,
      notes: "Cancelled due to high winds",
      coordinates: []
    }
  ],

  // Upcoming/Scheduled Sprays
  scheduledSprays: [
    {
      id: 4,
      fieldName: "Tomato Greenhouse",
      area: "2.5 acres",
      cropType: "Tomatoes",
      status: "scheduled",
      scheduledDate: "2025-12-10",
      scheduledTime: "10:00 AM",
      duration: "25 min",
      droneModel: "DJI Agras T10",
      pilot: "David Mwangi",
      chemicalUsed: "Organic Pesticide",
      chemicalAmount: "1.2L",
      estimatedCost: "KES 6,800",
      priority: "high",
      reason: "Aphid infestation detected",
      coordinates: [
        { lat: -1.2930, lng: 36.8230 },
        { lat: -1.2925, lng: 36.8240 }
      ],
      weatherForecast: {
        temperature: "23°C",
        windSpeed: "2.5 km/h",
        humidity: "65%",
        precipitation: "10%"
      }
    },
    {
      id: 5,
      fieldName: "Soybean Field",
      area: "4.3 acres",
      cropType: "Soybeans",
      status: "pending",
      scheduledDate: "2025-12-12",
      scheduledTime: "2:00 PM",
      duration: "35 min",
      droneModel: "DJI Agras T40",
      pilot: "Jane Akinyi",
      chemicalUsed: "Herbicide",
      chemicalAmount: "2.0L",
      estimatedCost: "KES 7,200",
      priority: "medium",
      reason: "Preventive weed control",
      coordinates: [
        { lat: -1.2950, lng: 36.8250 },
        { lat: -1.2945, lng: 36.8260 }
      ]
    },
    {
      id: 6,
      fieldName: "Avocado Orchard",
      area: "6.7 acres",
      cropType: "Avocado",
      status: "pending",
      scheduledDate: "2025-12-15",
      scheduledTime: "9:00 AM",
      duration: "50 min",
      droneModel: "DJI Agras T30",
      pilot: "Peter Kariuki",
      chemicalUsed: "Fungicide",
      chemicalAmount: "3.5L",
      estimatedCost: "KES 15,400",
      priority: "low",
      reason: "Seasonal fungal prevention",
      coordinates: [
        { lat: -1.2980, lng: 36.8280 },
        { lat: -1.2975, lng: 36.8290 }
      ]
    }
  ],

  // Available Drone Pilots
  pilots: [
    {
      id: 1,
      name: "John Kamau",
      experience: "5 years",
      rating: 4.8,
      completedJobs: 142,
      specializations: ["Maize", "Wheat", "Rice"],
      droneModels: ["DJI Agras T40", "DJI Agras T30"],
      availability: "available",
      nextAvailable: "2025-12-08",
      contact: "+254 712 345 678"
    },
    {
      id: 2,
      name: "Sarah Wanjiku",
      experience: "3 years",
      rating: 4.9,
      completedJobs: 98,
      specializations: ["Coffee", "Tea", "Fruits"],
      droneModels: ["DJI Agras T30", "DJI Agras T20"],
      availability: "available",
      nextAvailable: "2025-12-09",
      contact: "+254 723 456 789"
    },
    {
      id: 3,
      name: "Michael Otieno",
      experience: "7 years",
      rating: 4.7,
      completedJobs: 210,
      specializations: ["Large Fields", "Emergency Sprays"],
      droneModels: ["DJI Agras T40", "DJI Agras T20"],
      availability: "on-leave",
      nextAvailable: "2025-12-20",
      contact: "+254 734 567 890"
    }
  ],

  // Available Chemicals
  chemicals: [
    {
      id: 1,
      name: "Glyphosate 360",
      type: "Herbicide",
      coverage: "2 acres/L",
      safetyLevel: "Caution",
      price: "KES 2,500/L",
      waitingPeriod: "7 days",
      compatibleCrops: ["Maize", "Wheat", "Soybeans"],
      incompatibleCrops: ["Fruits", "Vegetables"]
    },
    {
      id: 2,
      name: "Copper Fungicide",
      type: "Fungicide",
      coverage: "1.5 acres/L",
      safetyLevel: "Safe",
      price: "KES 3,800/L",
      waitingPeriod: "3 days",
      compatibleCrops: ["Coffee", "Tomatoes", "Avocado"],
      incompatibleCrops: []
    },
    {
      id: 3,
      name: "Neem Oil Extract",
      type: "Organic Pesticide",
      coverage: "0.8 acres/L",
      safetyLevel: "Organic",
      price: "KES 4,200/L",
      waitingPeriod: "1 day",
      compatibleCrops: ["All crops"],
      incompatibleCrops: []
    },
    {
      id: 4,
      name: "Insecticide X",
      type: "Pesticide",
      coverage: "1.2 acres/L",
      safetyLevel: "Warning",
      price: "KES 2,900/L",
      waitingPeriod: "14 days",
      compatibleCrops: ["Cereals", "Pulses"],
      incompatibleCrops: ["Fruits", "Vegetables"]
    }
  ],

  // Spray Statistics
  statistics: {
    totalSprays: 24,
    successfulSprays: 21,
    cancelledSprays: 3,
    totalArea: "42.7 acres",
    totalCost: "KES 186,400",
    averageEfficiency: 89,
    chemicalUsage: {
      herbicide: "12.5L",
      fungicide: "8.2L",
      pesticide: "6.8L",
      organic: "3.1L"
    },
    monthlyTrend: [
      { month: "Aug", sprays: 3, efficiency: 85 },
      { month: "Sep", sprays: 4, efficiency: 87 },
      { month: "Oct", sprays: 6, efficiency: 89 },
      { month: "Nov", sprays: 5, efficiency: 91 },
      { month: "Dec", sprays: 6, efficiency: 92 }
    ]
  },

  // Weather Conditions for Spraying
  sprayConditions: {
    optimal: {
      windSpeed: "0-10 km/h",
      temperature: "15-30°C",
      humidity: "40-80%",
      precipitation: "0%"
    },
    acceptable: {
      windSpeed: "10-15 km/h",
      temperature: "10-35°C",
      humidity: "30-90%",
      precipitation: "<20%"
    },
    avoid: {
      windSpeed: ">15 km/h",
      temperature: "<10°C or >35°C",
      humidity: "<30% or >90%",
      precipitation: ">20%"
    }
  }
};
import React, { useState } from "react";
import RecommendationCard from "../components/RecommendationCard";
import { fetchWithAuth } from "../utils/apis";

function CropAnalysis() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loadingStage, setLoadingStage] = useState(""); // NEW: Track loading stages
  const [loadingProgress, setLoadingProgress] = useState(0); // NEW: Progress percentage

  // Loading stages with messages and estimated times
  const loadingStages = {
    uploading: {
      message: "Uploading images to server...",
      subtext: "Preparing files for analysis",
      icon: "📤",
      duration: 1000,
      progress: 25
    },
    processing: {
      message: "Processing images...",
      subtext: "Extracting vegetation indices",
      icon: "🔍",
      duration: 1500,
      progress: 50
    },
    analyzing: {
      message: "Analyzing crop health...",
      subtext: "Calculating metrics and predictions",
      icon: "🌱",
      duration: 1200,
      progress: 75
    },
    generating: {
      message: "Generating recommendations...",
      subtext: "Creating personalized insights",
      icon: "💡",
      duration: 800,
      progress: 95
    },
    finalizing: {
      message: "Finalizing results...",
      subtext: "Almost there!",
      icon: "✨",
      duration: 500,
      progress: 100
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setPreviews(files.map(file => URL.createObjectURL(file)));
      setMetrics(null);
      setAnalysisResults(null);
      setLoadingStage("");
      setLoadingProgress(0);
    }
  };

  // Simulate progressive loading with stages
  const simulateLoadingProgression = () => {
    const stages = Object.keys(loadingStages);
    let currentStageIndex = 0;
    
    const nextStage = () => {
      if (currentStageIndex < stages.length) {
        const stage = stages[currentStageIndex];
        setLoadingStage(stage);
        setLoadingProgress(loadingStages[stage].progress);
        
        currentStageIndex++;
        
        if (currentStageIndex < stages.length) {
          setTimeout(nextStage, loadingStages[stage].duration);
        }
      }
    };
    
    nextStage();
  };

  // Handle upload/predict
  const handleUpload = async () => {
    if (!selectedFiles.length) {
      alert("Please select images first.");
      return;
    }

    setIsLoading(true);
    setLoadingStage("uploading");
    setLoadingProgress(0);

    // Start the progressive loading simulation
    simulateLoadingProgression();

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append("images", file));

    try {
      const data = await fetchWithAuth("http://127.0.0.1:8000/api/crop-analysis/", {
        method: "POST",
        body: formData,
      });

      console.log("Response Data: ", data);

      // Update metrics with actual data
      setMetrics({
        vari: data.vari ?? 0,
        gli: data.gli ?? 0,
        exg: data.exg ?? 0,
        canopy_cover: data.canopy_cover ?? 0,
        stress_percentage: data.stress_percentage ?? 0,
        yield_estimate: data.yield_estimate ?? 0,
        num_images_processed: data.num_images_processed ?? 0
      });

      setAnalysisResults({
        session_id: data.session_id,
        recommendations: data.recommendations || []
      });

    } catch (error) {
      console.error("UPLOAD ERROR: ", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
      setLoadingStage("");
      setLoadingProgress(100);
      
      // Brief pause to show completion before hiding loader
      setTimeout(() => {
        setLoadingProgress(0);
      }, 800);
    }
  };

  // Helper functions for metrics display
  const getMetricRange = (key) => {
    const ranges = {
      'canopy_cover': { min: '0%', max: '100%', optimalMin: 40, optimalMax: 70 },
      'astress_percentage': { min: '0%', max: '100%', optimalMin: 0, optimalMax: 15 },
      'yield_estimate': { min: '0', max: '10+', optimalMin: 2.5, optimalMax: 5 },
      'vari': { min: '-1.0', max: '1.0', optimalMin: 0, optimalMax: 0.1 },
      'gli': { min: '-1.0', max: '1.0', optimalMin: -0.5, optimalMax: 0.1 },
      'exg': { min: '0', max: '255', optimalMin: 20, optimalMax: 50 },
      'num_images_processed': { min: '0', max: '100+', optimalMin: 1, optimalMax: 100 }
    };
    return ranges[key] || { min: '0', max: '100', optimalMin: 0, optimalMax: 100 };
  };

  const getMetricPercentage = (key, value) => {
    const range = getMetricRange(key);
    if (key.includes('vari') || key.includes('gli')) {
      return ((value + 1) / 2) * 100;
    }
    if (key.includes('canopy_cover') || key.includes('stress_percentage')) {
      return value;
    }
    if (key.includes('exg')) {
      return (value / 255) * 100;
    }
    if (key.includes('yield_estimate')) {
      return Math.min((value / 10) * 100, 100);
    }
    return Math.min(value, 100);
  };

  const getMetricRangeColor = (key, value) => {
    const range = getMetricRange(key);

    if (value < range.optimalMin) return 'bg-red-500';
    if (value < range.optimalMax) {
      if (key.includes('stress')) return 'bg-red-500';
      return 'bg-yellow-500';
    }
    return 'bg-green-500';
  };

  const formatMetricValue = (key, value) => {
    if (key.includes('canopy_cover') || key.includes('stress_percentage')) {
      return `${value.toFixed(1)}%`;
    }
    if (key.includes('yield_estimate')) {
      return `${value.toFixed(1)} tons/ha`;
    }
    if (key.includes('vari') || key.includes('gli')) {
      return value.toFixed(3);
    }
    if (key.includes('exg')) {
      return value.toFixed(1);
    }
    return value;
  };

  const formatMetricName = (key) => {
    const names = {
      'canopy_cover': 'Canopy Coverage',
      'stress_percentage': 'Stress Level',
      'yield_estimate': 'Yield Estimate',
      'vari': 'Vegetation Index (VARI)',
      'gli': 'Green Leaf Index (GLI)',
      'exg': 'Excess Green Index (EXG)',
      'num_images_processed': 'Images Processed'
    };
    return names[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getMetricIcon = (key) => {
    const icons = {
      'canopy_cover': '🌳',
      'stress_percentage': '⚠️',
      'yield_estimate': '📈',
      'vari': '🌱',
      'gli': '🍃',
      'exg': '📊',
      'num_images_processed': '📷'
    };
    return icons[key] || "📋";
  };

  const getMetricColor = (key, value) => {
    const range = getMetricRange(key);

    if (key.includes('stress_percentage')) {
      if (value > 15) return 'text-red-600';
      if (value > 5) return 'text-yellow-600';
      return 'text-green-600';
    }

    if (key.includes('canopy_cover')) {
      if (value < 40) return 'text-red-600';
      if (value > 70) return 'text-green-600';
      return 'text-yellow-600';
    }

    if (key.includes('yield_estimate')) {
      if (value < 2.5) return 'text-red-600';
      if (value < 5.0) return 'text-yellow-600';
      return 'text-green-600';
    }

    if (key.includes('vari')) {
      if (value < 0) return 'text-red-600';
      if (value < 0.1) return 'text-yellow-600';
      return 'text-green-600';
    }

    if (key.includes('gli')) {
      if (value < -0.5) return 'text-red-600';
      if (value < 0.1) return 'text-yellow-600';
      return 'text-green-600';
    }

    if (key.includes('exg')) {
      if (value < 20) return 'text-red-600';
      if (value > 50) return 'text-green-600';
      return 'text-yellow-600';
    }

    return 'text-blue-600';
  };

  const getMetricDescription = (key, value) => {
    if (key === 'stress_percentage') {
      if (value > 15) return 'High stress level. Immediate action needed.';
      if (value > 5) return 'Moderate stress. Monitor conditions closely.';
      return 'Low stress level. Good crop health.';
    }

    if (key === 'canopy_cover') {
      if (value < 40) return 'Low canopy coverage. Consider improving density.';
      if (value > 70) return 'Healthy canopy coverage. Good growth.';
      return 'Moderate canopy coverage. Within expected range.';
    }

    if (key === 'yield_estimate') {
      if (value < 2) return 'Low yield projection. Review farming practices.';
      if (value < 5) return 'Moderate yield projection. Room for improvement.';
      return 'High yield projection. Excellent performance!';
    }

    if (key === 'vari') {
      if (value < 0.1) return 'Low vegetation index. Growth may be limited.';
      return 'Good vegetation health. Healthy crop growth.';
    }

    if (key === 'gli') {
      if (value < 0.1) return 'Weak leaf vigor. Growth may be slowed.';
      return 'Strong leaf vigor. Active plant growth.';
    }

    if (key === 'exg') {
      if (value < 20) return 'Low greenness. Chlorophyll content may be low.';
      if (value > 50) return 'High greenness. Good chlorophyll levels.';
      return 'Moderate greenness. Within normal range.';
    }

    return 'Within expected range';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Crop Health Analysis</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload drone imagery to get detailed vegetation analysis and yield predictions
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Drone Images</h2>
              <p className="text-gray-600">Supported formats: JPG, PNG, TIFF. You can upload multiple images.</p>
            </div>

            {/* File Input */}
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center mb-6 transition-colors duration-200 hover:border-green-400">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg text-gray-700 mb-2">
                  {selectedFiles.length ? `${selectedFiles.length} file(s) selected` : "Click to browse or drag and drop"}
                </p>
                <p className="text-sm text-gray-500">Max file size: 10MB each</p>
              </label>
            </div>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Previews ({previews.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {previews.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${idx}`}
                        className="rounded-lg shadow-md w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {selectedFiles[idx]?.name.split('.')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Analyze Button with Loading Stages */}
            <button
              onClick={handleUpload}
              disabled={!selectedFiles.length || isLoading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 relative overflow-hidden ${!selectedFiles.length || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center">
                  {/* Loading Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 ease-out"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  
                  {/* Stage Display */}
                  <div className="flex items-center justify-center w-full">
                    <span className="text-2xl mr-3 animate-pulse">
                      {loadingStage && loadingStages[loadingStage]?.icon || "⏳"}
                    </span>
                    <div className="text-left">
                      <div className="font-semibold">
                        {loadingStage && loadingStages[loadingStage]?.message || "Starting analysis..."}
                      </div>
                      <div className="text-sm opacity-80 font-normal">
                        {loadingStage && loadingStages[loadingStage]?.subtext || "Preparing your crop health report"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated Dots */}
                  <div className="flex mt-2 space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Analyze Crop Health
                </div>
              )}
            </button>

            {/* Loading Tips - Only shows during analysis */}
            {isLoading && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-start">
                  <div className="text-emerald-600 mr-3 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Analysis in Progress</p>
                    <p className="text-xs text-gray-600">
                      Your drone images are being analyzed. This typically takes 30-60 seconds. 
                      We're calculating vegetation indices, canopy coverage, stress levels, and yield predictions.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* Results Section */}
        {metrics && !isLoading && (
          <div className="max-w-7xl mx-auto">
            {/* Results Header with Animation */}
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">Analysis Complete!</h2>
                  <p className="text-gray-600">Your crop health report is ready</p>
                </div>
              </div>
              <p className="text-gray-600">Metrics averaged from {metrics.num_images_processed || selectedFiles.length} uploaded images</p>
              {analysisResults?.session_id && (
                <p className="text-sm text-gray-500 mt-2">Session ID: {analysisResults.session_id}</p>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Object.entries(metrics).map(([key, value], index) => {
                // Skip non-numeric metrics for the grid
                if (key === 'num_images_processed' || typeof value !== 'number') return null;

                return (
                  <div 
                    key={key} 
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-green-200 animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-2xl">{getMetricIcon(key)}</div>
                      <div className={`text-lg font-bold ${getMetricColor(key, value)}`}>
                        {formatMetricValue(key, value)}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{formatMetricName(key)}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {getMetricDescription(key, value)}
                    </p>

                    {/* Value Range Indicator */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Low</span>
                        <span>Optimal</span>
                        <span>High</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getMetricRangeColor(key, value)} transition-all duration-300`}
                          style={{ width: `${getMetricPercentage(key, value)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">{getMetricRange(key).min}</span>
                        <span className="text-xs text-gray-500">{getMetricRange(key).max}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Images Processed Card */}
            {metrics.num_images_processed && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-lg border border-blue-200 mb-8 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Images Processed</h3>
                    <p className="text-gray-600">Total images analyzed in this session</p>
                  </div>
                  <div className="text-4xl font-bold text-blue-600">
                    {metrics.num_images_processed}
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations Section */}
            {analysisResults?.recommendations && analysisResults.recommendations.length > 0 && (
              <div className="mt-12 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Crop Analysis Recommendations</h2>
                  <p className="text-gray-600">Personalized suggestions based on your crop analysis</p>
                </div>

                <div className="space-y-6">
                  {analysisResults.recommendations.map((rec, index) => (
                    <div 
                      key={index} 
                      className="animate-fade-up"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <RecommendationCard recommendation={rec} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropAnalysis;
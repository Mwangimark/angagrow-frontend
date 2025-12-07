import React, { useState } from "react";
import RecommendationCard from "../components/RecommendationCard";
import { fetchWithAuth } from "../utils/apis";

function CropAnalysis() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setPreviews(files.map(file => URL.createObjectURL(file)));
      setMetrics(null);
      setAnalysisResults(null);
    }
  };

  // Handle upload/predict
  const handleUpload = async () => {
    if (!selectedFiles.length) {
      alert("Please select images first.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append("images", file));

    try {
      const data = await fetchWithAuth("http://127.0.0.1:8000/api/crop-analysis/", {
        method: "POST",
        body: formData,
      });

      console.log("Response Data: ", data);

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
    }

    setIsLoading(false);
  };

  // Helper functions for metrics display
  const getMetricRange = (key) => {
    const ranges = {
      'canopy_cover': { min: '0%', max: '100%', optimalMin: 40, optimalMax: 70 },
      'astress_percentage': { min: '0%', max: '100%', optimalMin: 0, optimalMax: 15 },
      'yield_estimate': { min: '0', max: '10+', optimalMin: 20, optimalMax: 50 },
      'vari': { min: '-1.0', max: '1.0', optimalMin: 0.2, optimalMax: 1.0 },
      'gli': { min: '-1.0', max: '1.0', optimalMin: 0.1, optimalMax: 1.0 },
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
    if (value > range.optimalMax) {
      if (key.includes('stress')) return 'bg-red-500';
      if (key.includes('yield')) return 'bg-green-500';
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
      if (value < 20) return 'text-red-600';
      if (value < 50) return 'text-yellow-600';
      return 'text-green-600';
    }

    if (key.includes('vari')) {
      if (value < 0.2) return 'text-red-600';
      return 'text-green-600';
    }

    if (key.includes('gli')) {
      if (value < 0.1) return 'text-red-600';
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
      if (value < 0.2) return 'Low vegetation index. Growth may be limited.';
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

            {/* Analyze Button */}
            <button
              onClick={handleUpload}
              disabled={!selectedFiles.length || isLoading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${!selectedFiles.length || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Images...
                </div>
              ) : (
                'Analyze Crop Health'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {metrics && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Aggregated Results</h2>
              <p className="text-gray-600">Metrics averaged from {metrics.num_images_processed || selectedFiles.length} uploaded images</p>
              {analysisResults?.session_id && (
                <p className="text-sm text-gray-500 mt-2">Session ID: {analysisResults.session_id}</p>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Object.entries(metrics).map(([key, value]) => {
                // Skip non-numeric metrics for the grid
                if (key === 'num_images_processed' || typeof value !== 'number') return null;

                return (
                  <div key={key} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-green-200">
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
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-lg border border-blue-200 mb-8">
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
              <div className="mt-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">AI Recommendations</h2>
                  <p className="text-gray-600">Personalized suggestions based on your crop analysis</p>
                </div>

                <div className="space-y-6">
                  {analysisResults.recommendations.map((rec, index) => (
                    <RecommendationCard key={index} recommendation={rec} />
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
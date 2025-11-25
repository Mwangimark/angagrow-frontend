import React, { useState } from "react";

function CropAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMetrics(null); // Reset metrics when new file is selected
    }
  };

  // Handle upload/predict (currently simulating)
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/crop-analysis/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the image");
      }

      const data = await response.json();
      console.log("Response Data: ", data);

      // Update metrics from backend response
      setMetrics({
        vari: data.results.vari ?? 0,
        gli: data.results.gli ?? 0,
        exg: data.results.exg ?? 0,
        canopy: data.results.canopy_pct ?? 0,
        stress: data.results.stress_pct ?? 0,
        yieldEstimate: data.yield_estimate ?? 0,
      });

    } catch (error) {
      console.error("UPLOAD ERROR: ", error);
      alert("Error processing the image. Check the server.");
    }

    setIsLoading(false);
  };


  const formatMetricName = (key) => {
    const names = {
      vari: "Vegetation Index",
      gli: "Green Leaf Index",
      exg: "Excess Green Index",
      canopy: "Canopy Coverage",
      stress: "Stress Level",
      yieldEstimate: "Yield Estimate"
    };
    return names[key] || key.replace(/([A-Z])/g, ' $1');
  };

  const getMetricColor = (key, value) => {
    if (key === 'stress') {
      return value > 50 ? 'text-red-600' : 'text-green-600';
    }
    if (key === 'canopy' || key === 'yieldEstimate') {
      return 'text-green-600';
    }
    return 'text-blue-600';
  };

  const getMetricIcon = (key) => {
    const icons = {
      vari: "🌱",
      gli: "🍃",
      exg: "📊",
      canopy: "🌳",
      stress: "⚠️",
      yieldEstimate: "📈"
    };
    return icons[key] || "📋";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Drone Image</h2>
              <p className="text-gray-600">Supported formats: JPG, PNG, TIFF</p>
            </div>

            {/* Drag & Drop Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center mb-6 transition-colors duration-200 hover:border-green-400">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer block"
              >
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg text-gray-700 mb-2">
                  {selectedFile ? selectedFile.name : "Click to browse or drag and drop"}
                </p>
                <p className="text-sm text-gray-500">Max file size: 10MB</p>
              </label>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Preview</h3>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded-lg shadow-md max-h-80 mx-auto object-contain"
                  />
                </div>
              </div>
            )}

            {/* Predict Button */}
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${!selectedFile || isLoading
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
                  Analyzing Image...
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
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Analysis Results</h2>
              <p className="text-gray-600">Detailed vegetation metrics and health indicators</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Object.entries(metrics).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-green-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-2xl">{getMetricIcon(key)}</div>
                    <div className={`text-lg font-bold ${getMetricColor(key, value)}`}>
                      {value}
                      {key === 'yieldEstimate' && ' tons/ha'}
                      {(key === 'canopy' || key === 'stress') && '%'}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {formatMetricName(key)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {key === 'stress' && value > 50
                      ? 'High stress level detected. Consider irrigation review.'
                      : key === 'canopy' && value > 60
                        ? 'Healthy canopy coverage'
                        : 'Within expected range'
                    }
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white border border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors duration-200">
                  Download Full Report
                </button>
                <button className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200">
                  Compare with Previous Analysis
                </button>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200">
                  Schedule Next Flight
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropAnalysis;
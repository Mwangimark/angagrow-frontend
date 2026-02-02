// components/farms/CreateFarmFlow.jsx
import { useState } from "react";
import CreateFarm from "./CreateFarm";
import CreateBlock from "./CreateBlock";
import api from "../../utils/apis";

const CreateFarmFlow = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: Farm, 2: Blocks, 3: Complete
  const [farmId, setFarmId] = useState(null);
  const [farmName, setFarmName] = useState("");
  const [createdBlocks, setCreatedBlocks] = useState(0);

  // Handle farm creation success
  const handleFarmCreated = async (farmData) => {
    try {
      const response = await api.post("/farming/farms", farmData);
      const createdFarm = response.data;
      setFarmId(createdFarm.id);
      setFarmName(createdFarm.name);
      setStep(2); // Move to block creation
    } catch (error) {
      console.error("Farm creation error:", error);
    }
  };

  // Handle block creation success
  const handleBlockCreated = () => {
    setCreatedBlocks(prev => prev + 1);
    
    // Optional: Ask if user wants to add more blocks
    // For MVP, let's auto-proceed after first block
    setTimeout(() => {
      setStep(3); // Move to completion
      setTimeout(() => {
        onComplete?.(); // Go to dashboard
      }, 2000);
    }, 1000);
  };

  // Render based on step
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= stepNum 
                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-20 h-1 ${
                  step > stepNum ? 'bg-emerald-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span className={step >= 1 ? 'text-emerald-600 font-medium' : ''}>
            Farm Details
          </span>
          <span className={step >= 2 ? 'text-emerald-600 font-medium' : ''}>
            Add Blocks
          </span>
          <span className={step >= 3 ? 'text-emerald-600 font-medium' : ''}>
            Complete
          </span>
        </div>
      </div>

      {/* Step 1: Create Farm */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Create Your Farm</h2>
          <p className="text-gray-600 mb-6">Start by adding your farm details</p>
          <CreateFarm 
            onFarmCreated={handleFarmCreated}
            showTitle={false}
          />
        </div>
      )}

      {/* Step 2: Add Blocks */}
      {step === 2 && farmId && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Add Blocks to {farmName}</h2>
          <p className="text-gray-600 mb-6">
            Divide your farm into blocks for different crops
          </p>
          
          <CreateBlock 
            farmId={farmId}
            onBlockCreated={handleBlockCreated}
          />
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Tip: You can add more blocks later from your dashboard</p>
          </div>
        </div>
      )}

      {/* Step 3: Completion */}
      {step === 3 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Farm Created Successfully!</h3>
          <p className="text-gray-600 mb-4">
            Your farm <span className="font-semibold">{farmName}</span> has been created with {createdBlocks} block{createdBlocks !== 1 ? 's' : ''}.
          </p>
          <p className="text-gray-500">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default CreateFarmFlow;
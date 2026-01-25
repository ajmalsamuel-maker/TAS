import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function ProgressWithTime({ currentStep, totalSteps, steps }) {
  // Time estimates in minutes for each step
  const timeEstimates = {
    1: 5,
    2: 8,
    3: 10,
    4: 15,
    5: 5
  };

  // Calculate total time remaining
  const totalTimeRemaining = Object.keys(timeEstimates)
    .filter(step => parseInt(step) >= currentStep)
    .reduce((sum, step) => sum + timeEstimates[step], 0);

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-6">
      {/* Main Progress */}
      <div className="bg-white rounded-lg border border-blue-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(progress)}% Complete
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-[#0044CC] font-semibold">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{totalTimeRemaining} min</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Estimated remaining</p>
          </div>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Step-by-step Timeline */}
      <div className="bg-white rounded-lg border border-blue-100 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Progress Timeline</h3>
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const stepNum = step.number;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            const stepTime = timeEstimates[stepNum] || 0;

            return (
              <div key={stepNum} className="flex items-center gap-3">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                      ? 'bg-[#0044CC] text-white ring-2 ring-blue-300' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      stepNum
                    )}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-0.5 h-8 mt-1 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  )}
                </div>

                {/* Step info */}
                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <p className={`text-sm font-semibold ${isCompleted ? 'text-green-600' : isCurrent ? 'text-[#0044CC]' : 'text-gray-600'}`}>
                      {step.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {stepTime} min
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Tip */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-xs text-amber-900">
          <strong>⏱️ Tip:</strong> Times are estimates based on average completion rates. Your actual time may vary depending on data availability.
        </p>
      </div>
    </div>
  );
}
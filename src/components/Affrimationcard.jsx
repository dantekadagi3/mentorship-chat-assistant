import React from "react";

const steps = [
  { icon: "🌱", label: "Started" },
  { icon: "🌿", label: "Growing" },
  { icon: "🌸", label: "Blooming" },
];

const StoryRecallCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-200 to-blue-200 rounded-t-2xl" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h3 className="font-poppins text-xl font-semibold text-gray-800 flex items-center">
          Story Recall
          <span className="ml-2 text-2xl animate-bounce">📘</span>
        </h3>
      </div>

      {/* Description */}
      <p className="mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-500 font-medium">
        Your learning journey as a visual story
      </p>

      {/* Memory Trail */}
      <div className="flex items-center justify-between mt-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl animate-pulse">{step.icon}</span>
              <span className="text-sm text-gray-600 text-center">
                {step.label}
              </span>
            </div>

            {/* Connector (skip after last step) */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 bg-gradient-to-r from-green-300 to-sky-300 rounded-full" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StoryRecallCard;

// src/components/FeatureCard.jsx
import React from "react";

const FeatureCard = ({ title, icon, description, topics }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/90 p-8 shadow-xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-sky-300 rounded-t-2xl" />

      {/* Header with Title + Icon */}
      <div className="flex items-center gap-2 mb-6">
        <h3 className="font-poppins text-xl font-semibold text-gray-800 flex items-center">
          {title}
          <span className="ml-2 text-2xl animate-bounce">{icon}</span>
        </h3>
      </div>

      {/* Description with Gradient */}
      <p className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-medium">
        {description}
      </p>

      {/* Knowledge Tags  whith selective application of gradients
      index % 3: Cycles through 3 gradient combinations.

      bg-gradient-to-r from-* to-*: Applies horizontal gradient coloring.

       text-white, rounded-full, and px/py: Ensure visual polish and spacing.
      */}
     <div className="flex flex-wrap gap-2 mb-4">
  {topics.map((topic, index) => (
    <span
      key={index}
      className={`text-white text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${
        index % 3 === 0
          ? 'from-pink-400 to-red-400'
          : index % 3 === 1
          ? 'from-blue-400 to-indigo-500'
          : 'from-green-400 to-teal-500'
      }`}
    >
      {topic}
    </span>
  ))}
</div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div className="h-full w-3/4 bg-gradient-to-r from-yellow-400 via-pink-400 to-green-300 rounded-full" />
      </div>
    </div>
  );
};

export default FeatureCard;

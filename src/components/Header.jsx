import React from 'react';

const WelcomeHeader = () => {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-b-3xl shadow-lg px-6 py-4 mb-8">
      <div className="flex items-center justify-center gap-4 text-pink-400 text-lg font-medium font-[Poppins]">
        <span className="text-2xl animate-spin-slow">🌞</span>
        <span>Welcome back, Dante! Let&apos;s blossom together today</span>
        <span className="text-xl">🌻</span>
      </div>
    </div>
  );
};

export default WelcomeHeader;

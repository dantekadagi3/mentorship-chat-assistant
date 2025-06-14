import React from 'react';
import FeatureCard from './components/FeatureCard';
import StoryRecallCard from './components/Affrimationcard';
import WelcomeHeader from './components/Header';

import ChatAssistant from './components/ChatAssistant';

const App = () => {
  const learnedTopics = [
    'React Basics',
    'Component Lifecycle',
    'State Management',
    'Hooks',
    'Context API',
    'Routing with React Router',
    'Styling Components',
    'Performance Optimization'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c9e4ff] via-[#eaf6ff] to-[#d8fcf2]">
      {/* Header */}
      <WelcomeHeader />

      {/* Decorative Floating Blobs */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/2 left-2/3 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Main Content */}
        <div className="relative z-10 px-4 md:px-10 py-6 md:py-10">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-8">
              <FeatureCard
                title="What You Learned"
                icon="✨"
                description="Your latest concepts, beautifully organized"
                topics={learnedTopics}
              />
              <StoryRecallCard />
            </div>

            {/* Right Column (Chat Placeholder) */}
           <ChatAssistant/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

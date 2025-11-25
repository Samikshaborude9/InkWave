// components/BackgroundWrapper.tsx
import React from 'react';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center p-4 rounded-lg">
      {/* This div will act as the white background container */}
      <div className="relative bg-white shadow-lg rounded-3xl flex max-w-4xl w-full h-[600px] overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;

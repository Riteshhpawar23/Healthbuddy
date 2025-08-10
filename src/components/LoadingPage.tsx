import React, { useEffect } from "react";

const LoadingPage = ({ onFinish }: { onFinish: () => void }) => {
  // Remove timer, use click to continue

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/final.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <h1
          className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg cursor-pointer"
          style={{
            textShadow: '0 2px 16px rgba(0,0,0,0.7)',
          }}
          onClick={onFinish}
          title="Click to continue"
        >
          It All Starts With Sharing
          <span className="block text-base mt-4 text-blue-200">Click to continue</span>
        </h1>
      </div>
  <div className="absolute inset-0 bg-black bg-opacity-10 z-5" />
    </div>
  );
};

export default LoadingPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#4285f4] flex flex-col items-center justify-center relative p-4">
      {/* Halo Ellipse with Attractive Text */}
      <div className="absolute top-20">
        <div className="w-72 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
          <p className="text-[#4285f4] font-semibold text-lg animate-pulse">
            Ready to spark a conversation?
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-3xl flex flex-col items-center justify-center p-6 mt-32">
        <p className="text-center text-gray-700 mb-4 text-lg font-medium">
          Tap the icon below to begin your journey.
        </p>
        <div 
          className="w-48 h-48 bg-[#4285f4] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate('/intro')}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-32 h-32 text-white"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6c.78 0 1.41-.63 1.41-1.41S7.78 11.18 7 11.18s-1.41.63-1.41 1.41.63 1.41 1.41 1.41zm10 0c.78 0 1.41-.63 1.41-1.41s-.63-1.41-1.41-1.41-1.41.63-1.41 1.41.63 1.41 1.41 1.41zm-5 3c2.01 0 3.74-1.23 4.5-3h-9c.76 1.77 2.49 3 4.5 3z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;

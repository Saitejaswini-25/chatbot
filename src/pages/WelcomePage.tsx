import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-b from-[#4285f4] to-[#6ea8fe] flex flex-col items-center justify-center relative p-4">
      
      {/* Halo Ellipse with Glow */}
      <div className="absolute top-16 animate-pulse">
        <div className="w-80 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border border-blue-200">
          <p className="text-[#4285f4] font-semibold text-lg sm:text-xl tracking-wide">
            👋 Let’s ignite your curiosity!
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-3xl flex flex-col items-center justify-center p-8 mt-36 shadow-2xl border border-gray-100">
        <p className="text-center text-gray-600 mb-6 text-lg sm:text-xl font-medium">
          Tap the icon below to begin your journey.
        </p>
        <div 
          className="w-48 h-48 bg-[#4285f4] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl"
          onClick={() => navigate('/intro')}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-28 h-28 text-white"
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

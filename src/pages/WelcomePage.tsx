import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#4285f4] flex items-center justify-center p-4">
      <div className="w-full max-w-md aspect-square bg-white rounded-3xl flex items-center justify-center">
        <div 
          className="w-48 h-48 bg-[#4285f4] rounded-full flex items-center justify-center cursor-pointer"
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
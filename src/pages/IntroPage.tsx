import React from 'react';
import { useNavigate } from 'react-router-dom';
import aiimg from '../image/ai.png'; // ✅ Correct path to your image

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-between p-8">
      {/* Title and Description */}
      <div className="w-full max-w-md text-center space-y-4">
        <h1 className="text-3xl font-bold text-[#4285f4]">Your AI Assistant</h1>
        <p className="text-gray-600">
          Using this software, you can ask your queries and get answers to your questions from artificial intelligence.
        </p>
      </div>

      {/* Image */}
      <div className="w-full max-w-md">
        <img
          src={aiimg} // ✅ use variable without quotes
          alt="AI Assistant"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
         
          marginTop: '32px', // margin top to give space between image and buttons
        }}
        className="w-full max-w-md"
      >
        {/* ← Back */}
        <button
          onClick={() => navigate('/')}
          className="bg-[#4285f4] text-white py-4 px-6 text-xl rounded-l-full"
        >
          ←
        </button>

        {/* Continue */}
        <button
          onClick={() => navigate('/menu')}
          className="bg-[#4285f4] text-white py-4 px-6 text-xl rounded-none"
        >
          Continue
        </button>

        {/* → Forward */}
        <button
          onClick={() => navigate('/menu')}
          className="bg-[#4285f4] text-white py-4 px-6 text-xl rounded-r-full"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default IntroPage;

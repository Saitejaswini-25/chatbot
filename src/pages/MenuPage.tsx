import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Volume2, Share2, ArrowLeft, Mic } from 'lucide-react';

function MenuPage() {
  const navigate = useNavigate();
  const menuItems = [
    "Explain Quantum Physics",
    "What are Wormholes Explain like i am 5",
    "Write a tweet about global warming",
    "Write a poem about love"
  ];

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => navigate('/intro')}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#4285f4]">ChatBot</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-600 text-sm">online</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Volume2 className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Explain</h2>
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full text-left bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition-colors"
                onClick={() => navigate('/chat')}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Write & Edit</h2>
          <div className="space-y-3">
            {menuItems.slice(-2).map((item, index) => (
              <button
                key={index}
                className="w-full text-left bg-gray-100 p-4 rounded-xl hover:bg-gray-200 transition-colors"
                onClick={() => navigate('/chat')}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-2">
          <input
            type="text"
            placeholder="Hello ChatBot,How are you today?"
            className="flex-1 bg-transparent outline-none px-2"
          />
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="p-2 text-[#4285f4] hover:bg-blue-50 rounded-full"
          >
            <Share2 className="w-5 h-5 transform rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
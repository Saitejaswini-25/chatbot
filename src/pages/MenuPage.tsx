import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Volume2, Share2, ArrowLeft, Mic, MessageSquare } from 'lucide-react';

function MenuPage() {
  const navigate = useNavigate();
  const [customPrompt, setCustomPrompt] = useState('');

  const menuItems = [
    { text: "Explain Quantum Physics", prompt: "Explain Quantum Physics" },
    { text: "What are Wormholes? Explain like I am 5.", prompt: "What are Wormholes? Explain like I am 5." },
    { text: "Write a tweet about global warming", prompt: "Write a tweet about global warming" },
    { text: "Write a poem about love", prompt: "Write a poem about love" }
  ];

  const handleSpeak = () => {
    const message = "Welcome! Choose a topic below or type your own question to start chatting.";
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setCustomPrompt(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      alert("Speech recognition error: " + event.error);
    };
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b shadow-sm">
        <div className="flex items-center gap-3">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => navigate('/intro')}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-[#4285f4]" />
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
          <button onClick={handleSpeak} className="p-2 hover:bg-gray-100 rounded-full">
            <Volume2 className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Menu Options */}
      <div className="flex-1 p-6 space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Explore Topics</h2>
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full text-left bg-white p-4 rounded-xl shadow hover:bg-blue-50 transition"
                onClick={() => navigate('/chat', { state: { prompt: item.prompt } })}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Chat Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/chat')}
            className="inline-flex items-center gap-2 bg-[#4285f4] text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition"
          >
            <MessageSquare className="w-5 h-5" />
            Go directly to Chat
          </button>
        </div>
      </div>

      {/* Custom Prompt Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-2 shadow-inner">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Ask your own question..."
            className="flex-1 bg-transparent outline-none px-2 text-gray-800"
          />
          <button type="button" onClick={handleVoiceInput} className="p-2 hover:bg-gray-200 rounded-full">
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => {
              if (customPrompt.trim()) {
                navigate('/chat', { state: { prompt: customPrompt } });
              } else {
                navigate('/chat');
              }
            }}
            className="p-2 text-[#4285f4] hover:bg-blue-100 rounded-full transform rotate-90"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot, Mic, Share2, ArrowLeft, Volume2, Trash2 } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prompt } = location.state || { prompt: '' };

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // Greetings
    if (
      lowerQuestion.includes('hello') ||
      lowerQuestion.includes('hi') ||
      lowerQuestion.includes('hey') ||
      lowerQuestion.includes('hai')
    ) {
      return "Hello! How can I assist you today?";
    }

    if (lowerQuestion.includes('how are you')) {
      return "I'm doing well, thank you for asking! How can I help you?";
    }

    // Personal & general questions
    if (lowerQuestion.includes('your name')) {
      return "I'm ChatBot, your AI assistant. Nice to meet you!";
    }

    if (lowerQuestion.includes('weather')) {
      return "I'm sorry, I don't have access to real-time weather data. You might want to check a weather service for that information.";
    }

    if (lowerQuestion.includes('programming language')) {
      return "The best programming language depends on your goals. Python is great for beginners and AI/ML, JavaScript for web development, Java for enterprise apps, and Swift for iOS. What's your goal?";
    }

    if (lowerQuestion.includes('thank')) {
      return "You're welcome! Let me know if you need anything else.";
    }

    if (lowerQuestion.includes('bye') || lowerQuestion.includes('goodbye')) {
      return "Goodbye! Have a great day!";
    }

    // Menu page related responses
    if (lowerQuestion.includes('quantum physics')) {
      return "Quantum physics explains how very tiny particles behave — like atoms and electrons. It’s a bit weird, but super important in modern science!";
    }

    if (lowerQuestion.includes('wormholes')) {
      return "Wormholes are like tunnels in space and time. Imagine a shortcut between two faraway places in the universe. Scientists aren’t sure if they really exist though!";
    }

    if (lowerQuestion.includes('tweet') && lowerQuestion.includes('global warming')) {
      return "🌍 Global warming is real. Small changes = big impact. Act now, save the planet! #ClimateAction #Sustainability";
    }

    if (lowerQuestion.includes('poem') && lowerQuestion.includes('love')) {
      return "Love is a whisper, soft and true,\nA gentle breeze that carries you.\nIn every heartbeat, every sigh,\nLove lifts our spirits to the sky.";
    }

    return "I understand your question. While I'm a basic chatbot, I'm learning to provide better responses. Could you try rephrasing your question or asking something else?";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = { text: getBotResponse(inputText), isBot: true };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([]);
    setInputText('');
  };

  useEffect(() => {
    if (prompt) {
      const botResponse = { text: getBotResponse(prompt), isBot: true };
      setMessages([{ text: prompt, isBot: false }, botResponse]);
    } else {
      setTimeout(() => {
        setMessages([{ text: "Hello! How can I assist you today?", isBot: true }]);
      }, 500);
    }
  }, [prompt]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => navigate('/menu')}
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
          <button className="p-2 hover:bg-gray-100 rounded-full" onClick={clearChat}>
            <Trash2 className="w-6 h-6 text-red-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Volume2 className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <div className="w-8 h-8 mr-2 flex-shrink-0">
                <Bot className="w-full h-full" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isBot
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-[#4285f4] text-white'
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 mr-2 flex-shrink-0">
              <Bot className="w-full h-full" />
            </div>
            <div className="bg-gray-200 text-gray-800 p-3 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write your message"
            className="flex-1 bg-transparent outline-none px-2"
          />
          <button type="button" className="p-2 hover:bg-gray-200 rounded-full">
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
          <button
            type="submit"
            className={`p-2 ${
              inputText.trim()
                ? 'text-[#4285f4] hover:bg-blue-50'
                : 'text-gray-400'
            } rounded-full transform rotate-90`}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatPage;

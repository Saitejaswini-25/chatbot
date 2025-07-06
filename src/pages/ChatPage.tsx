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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            { role: "system", content: "You are a warm, clear, direct, helpful assistant." },
            { role: "user", content: inputText }
          ]
        }),
      });

      const data = await response.json();
      const botText = data.choices?.[0]?.message?.content || "Sorry, I could not generate a response.";
      const botResponse = { text: botText, isBot: true };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error(error);
      const botResponse = { text: "Error fetching response. Please try again.", isBot: true };
      setMessages(prev => [...prev, botResponse]);
    }

    setIsTyping(false);
  };

  const clearChat = () => {
    setMessages([]);
    setInputText('');
  };

  const handleSpeak = () => {
    const lastBotMessage = [...messages].reverse().find(msg => msg.isBot);
    if (lastBotMessage) {
      const utterance = new SpeechSynthesisUtterance(lastBotMessage.text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleShare = async () => {
    const conversationText = messages.map(msg => (msg.isBot ? "Bot: " : "You: ") + msg.text).join('\n');
    try {
      await navigator.clipboard.writeText(conversationText);
      alert("Conversation copied to clipboard!");
    } catch {
      alert("Failed to copy conversation.");
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      alert("Speech recognition error: " + event.error);
    };
  };

  useEffect(() => {
    if (prompt) {
      const userMessage = { text: prompt, isBot: false };
      setMessages([userMessage]);
      setIsTyping(true);

      const fetchBotResponse = async () => {
        try {
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
              model: "mistralai/mistral-7b-instruct",
              messages: [
                { role: "system", content: "You are a warm, clear, direct, helpful assistant." },
                { role: "user", content: prompt }
              ]
            }),
          });

          const data = await response.json();
          const botReply = data.choices?.[0]?.message?.content || "Sorry, I could not generate a response.";
          setMessages([
            userMessage,
            { text: botReply, isBot: true }
          ]);
        } catch (error) {
          console.error(error);
          setMessages([
            userMessage,
            { text: "Error fetching response. Please try again.", isBot: true }
          ]);
        }
        setIsTyping(false);
      };

      fetchBotResponse();
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
                <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                <span className={`text-sm ${isTyping ? 'text-yellow-600' : 'text-green-600'}`}>
                  {isTyping ? 'typing...' : 'online'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full" onClick={clearChat}>
            <Trash2 className="w-6 h-6 text-red-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handleSpeak}>
            <Volume2 className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handleShare}>
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
          <button type="button" className="p-2 hover:bg-gray-200 rounded-full" onClick={handleVoiceInput}>
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

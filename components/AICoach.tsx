import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, Bot, User, Loader2 } from 'lucide-react';

const AICoach: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'I am your LA Marathon training coach. Ask me about your 10-week plan, nutrition, or race strategy.' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key missing");
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = 'gemini-2.5-flash';
      
      const systemInstruction = `You are an elite marathon running coach specializing in the LA Marathon. 
      You are guiding a user through a specific 10-week training plan.
      The plan has 3 phases: Build Base (Weeks 1-2), Endurance/Speed (Weeks 3-6), Peak (Week 7), Recovery/Taper (Weeks 8-10).
      Key principles: Conversational pace for most runs, strict rest days, nutrition practice.
      Keep answers concise, motivating, and focused on running science. Use a professional but encouraging tone.`;

      const chat = ai.chats.create({
        model,
        config: { systemInstruction }
      });

      // Pass history (simplified)
      // Note: In a real app, we'd map 'messages' to the Chat history format correctly.
      // For this stateless demo, we just send the new message with context implied by system instruction.
      
      const result = await chat.sendMessageStream({ message: userMsg });
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of result) {
        const text = chunk.text;
        if (text) {
          fullResponse += text;
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1].text = fullResponse;
            return newArr;
          });
        }
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to the coaching server right now. Check your API key." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[600px] flex flex-col border border-zinc-800 bg-black">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-950">
        <Bot className="w-6 h-6 text-white" />
        <div>
            <h2 className="font-bold text-white uppercase tracking-wider">AI Coach</h2>
            <p className="text-xs text-zinc-500">Powered by Gemini 2.5</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 text-sm ${
                msg.role === 'user' 
                ? 'bg-white text-black' 
                : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
            }`}>
                {msg.text}
            </div>
          </div>
        ))}
        {loading && (
             <div className="flex justify-start">
                 <div className="bg-zinc-900 p-4 border border-zinc-800">
                    <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
                 </div>
             </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800 bg-zinc-950 flex gap-2">
        <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your training..."
            className="flex-1 bg-black border border-zinc-800 text-white p-3 focus:border-white focus:outline-none transition-colors font-mono text-sm"
        />
        <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="bg-white text-black p-3 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default AICoach;

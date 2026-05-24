import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Loader2, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: 'Oi! Eu sou a Meli ✨! Como posso ajudar você a explorar nosso mundo mágico hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'bot', 
        text: data.reply || 'Ops, não consegui pensar numa resposta agora! 🐝' 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'bot', 
        text: 'Desculpe, parece que a mágica falhou um pouquinho. Tente de novo! ✨' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFB347] to-[#FF6B8A] text-white shadow-[0_10px_25px_rgba(255,107,138,0.5)] z-50 flex items-center justify-center border-4 border-white"
            aria-label="Abrir assistente mágica"
          >
            <Sparkles size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 w-[calc(100vw-48px)] sm:w-[380px] h-[550px] max-h-[80vh] bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl border-2 border-white z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#FFB347]/10 to-[#FF6B8A]/10 border-b border-white/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FFB347] to-[#FF6B8A] flex items-center justify-center text-white font-black text-xl shadow-sm">
                  M
                </div>
                <div>
                  <h3 className="font-black text-[DE6B8A] text-[#FF6B8A] leading-tight">Meli AI</h3>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Ajudante Mágica</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={cn(
                    "max-w-[85%] p-4 rounded-2xl font-bold text-sm shadow-sm",
                    msg.role === 'bot' 
                      ? "bg-white border text-gray-700 rounded-tl-none border-gray-100 self-start" 
                      : "bg-gradient-to-r from-[#FFB347] to-[#FF6B8A] text-white rounded-tr-none self-end"
                  )}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isLoading && (
                <div className="bg-white border text-gray-400 rounded-2xl rounded-tl-none border-gray-100 self-start p-4 flex gap-2 items-center">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-[#FF6B8A] rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-[#FF6B8A] rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-[#FF6B8A] rounded-full" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-50">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte algo..."
                  className="flex-1 bg-gray-50 border-transparent focus:bg-white focus:border-[#FFB347] focus:ring-2 focus:ring-[#FFB347]/20 rounded-full px-4 py-3 font-bold text-sm outline-none transition-all placeholder:text-gray-400"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 rounded-full bg-[#FFB347] text-white flex items-center justify-center hover:bg-[#ff9d1a] transition-colors disabled:opacity-50 disabled:hover:bg-[#FFB347] shadow-md border-b-4 border-orange-500 active:border-b-0 active:translate-y-1"
                >
                  <Send size={18} className="-ml-1 pl-1" />
                </button>
              </form>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

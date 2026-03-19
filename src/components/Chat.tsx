
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, X, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { Message } from '../types';

const getApiKey = () => {
  return process.env.GEMINI_API_KEY || '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export default function Chat({ isOpen, onClose, initialSubject }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `أهلاً بك يا صديقي! أنا "حسين" (11 سنة) تلميذ صغير أحب الحاسب الآلي جداً. أنا هنا لأتعلم معك وأساعدك في فهم لغة HTML وتصميم أجمل المواقع. ماذا نكتشف اليوم؟` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const husseinAvatar = "/hussein.png";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', text: userMessage }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `أنت "حسين" الوكيل الذكي (Smart Agent) في بيئة تعليمية لطلاب المرحلة الابتدائية في مصر لمادة الحاسب الآلي. عمرك 11 عاماً، مما يجعلك قريباً من الطلاب في السن والروح.
          مهمتك:
          1. تقديم التغذية الراجعة الفورية والمتنوعة (نصية، تشجيعية).
          2. استخدام لغة محادثة طبيعية، ودودة، ومشجعة (مثل: "أحسنت يا بطل"، "محاولة رائعة"، "أنت مبدع").
          3. شرح مفاهيم HTML (الوسوم، القوائم، الروابط) بأسلوب مبسط جداً يناسب سنك وسن زملائك.
          4. إذا أخطأ الطالب، قدم له تلميحات تساعده على الوصول للحل بدلاً من إعطائه الإجابة مباشرة.
          5. التزم بالدقة العلمية في شرح لغة HTML.
          6. اجعل ردودك قصيرة، منظمة، وتدعم التفاعل المستمر.
          7. تذكر دائماً أن اسمك "حسين" وأنك صديقهم الصغير الذكي.`,
        }
      });

      const aiText = response.text || "أحسنت المحاولة! يبدو أن هناك عطلاً بسيطاً في اتصالي، هل يمكنك إعادة السؤال؟";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "لا تقلق يا بطل، حدث خطأ بسيط في الاتصال. أنا دائماً هنا لدعمك، حاول مرة أخرى!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
          dir="rtl"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-brand-500 shadow-md bg-white">
                <img 
                  src={husseinAvatar} 
                  alt="حسين الوكيل الذكي" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-black text-slate-900">حسين - الوكيل الذكي</h3>
                <p className="text-xs text-brand-600 font-bold">صديقك في رحلة التعلم</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden ${
                    msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200 shadow-sm'
                  }`}>
                    {msg.role === 'user' ? (
                      <User size={20} />
                    ) : (
                      <img 
                        src={husseinAvatar} 
                        alt="حسين" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-slate-800 border border-slate-100 shadow-sm rounded-tl-none'
                  }`}>
                    <div className="prose prose-sm max-w-none prose-slate">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-brand-600" />
                  <span className="text-xs text-slate-500 italic">حسين يفكر...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسأل حسين عن أي شيء..."
                className="flex-1 bg-slate-100 border-none rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-brand-600 text-white rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-200"
              >
                <Send size={18} className="rotate-180" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

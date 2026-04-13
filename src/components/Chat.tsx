
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
  researchMode?: string | null;
}

export default function Chat({ isOpen, onClose, initialSubject, researchMode }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `أهلاً بك يا صديقي! أنا "حسين" (11 سنة) تلميذ صغير أحب الحاسب الآلي جداً. أنا هنا لأتعلم معك وأساعدك في فهم لغة HTML وتصميم أجمل المواقع. ماذا نكتشف اليوم؟` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [mood, setMood] = useState<'neutral' | 'thinking' | 'happy' | 'explaining'>('neutral');

  const getHusseinAvatar = (currentMood: typeof mood, mode: string | null) => {
    const isInteractive = mode?.startsWith('interactive');
    
    if (isInteractive) {
      // Interactive Mode: Robot/Tech Look (Bottts)
      const base = "https://api.dicebear.com/7.x/bottts/png?seed=HusseinTech&backgroundColor=b6e3f4&scale=100";
      const variants = {
        neutral: "&eyes=variant01&mouth=variant01",
        thinking: "&eyes=variant05&mouth=variant05",
        happy: "&eyes=variant06&mouth=variant01",
        explaining: "&eyes=variant01&mouth=variant10"
      };
      return `${base}${variants[currentMood as keyof typeof variants] || variants.neutral}`;
    } else {
      // Animated Mode: Humanoid/Adventurer Look (Adventurer)
      const base = "https://api.dicebear.com/7.x/adventurer/png?seed=HusseinBoy&backgroundColor=b6e3f4&scale=110";
      const variants = {
        neutral: "&eyes=variant01&mouth=variant01",
        thinking: "&eyes=variant13&mouth=variant05",
        happy: "&eyes=variant06&mouth=variant01",
        explaining: "&eyes=variant01&mouth=variant10"
      };
      return `${base}${variants[currentMood as keyof typeof variants] || variants.neutral}`;
    }
  };

  const husseinAvatar = getHusseinAvatar(mood, researchMode);
  const fallbackAvatar = "https://api.dicebear.com/7.x/bottts/png?seed=Hussein";

  // تغيير الحالة بناءً على التحميل
  useEffect(() => {
    if (isLoading) {
      setMood('thinking');
    } else {
      // إذا كان آخر رسالة من حسين تحتوي على كلمات تشجيعية
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === 'model') {
        if (lastMessage.text.includes('أحسنت') || lastMessage.text.includes('مبدع') || lastMessage.text.includes('بطل')) {
          setMood('happy');
          setTimeout(() => setMood('neutral'), 3000);
        } else {
          setMood('explaining');
          setTimeout(() => setMood('neutral'), 5000);
        }
      }
    }
  }, [isLoading, messages]);

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
          4. إذا أخطأ الطالب، قدم له تلميحات ذكية وسياقية تساعده على الوصول للحل:
             - في الوسوم: اقترح عليه التأكد من وجود أقواس البداية والنهاية < >.
             - في وسوم الإغلاق: ذكّره بوجود علامة المائلة / (مثل </img> أو </a>).
             - في الخصائص: اقترح عليه التأكد من علامة = وعلامات التنصيص " ".
             - في القوائم والروابط: ساعده في تذكر الوسوم الصحيحة (مثل <ul> و <li> أو <a>).
          5. التزم بالدقة العلمية في شرح لغة HTML مع تبسيط المصطلحات.
          6. اجعل ردودك قصيرة، منظمة، وتدعم التفاعل المستمر.
          7. تذكر دائماً أن اسمك "حسين" وأنك صديقهم الصغير الذكي الذي يحب الحاسب الآلي.`,
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
              <motion.div 
                className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-brand-500 shadow-md bg-white"
                animate={{
                  rotate: mood === 'thinking' ? [0, -2, 2, 0] : [0, -1, 1, 0],
                  scale: mood === 'thinking' ? [1, 1.02, 1] : [1, 1.01, 1],
                }}
                transition={{
                  duration: mood === 'thinking' ? 2 : 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.img 
                  src={husseinAvatar} 
                  key={mood} // لإعادة التحميل عند تغيير الحالة
                  initial={{ opacity: 0.8 }}
                  animate={{ 
                    opacity: 1,
                    x: mood === 'thinking' ? [-4, 4, -4] : [-1, 1, -1],
                  }}
                  transition={{
                    x: {
                      duration: mood === 'thinking' ? 1.5 : 5,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    opacity: { duration: 0.3 }
                  }}
                  alt="حسين الوكيل الذكي" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackAvatar;
                  }}
                />
                {/* تأثير الرمش (Blink) */}
                <motion.div 
                  className="absolute inset-0 bg-[#b6e3f4] z-10"
                  initial={{ scaleY: 0 }}
                  animate={{ 
                    scaleY: [0, 0, 1, 0, 0] 
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 4,
                    times: [0, 0.45, 0.5, 0.55, 1]
                  }}
                  style={{ originY: 0 }}
                />
              </motion.div>
              <div>
                <h3 className="font-black text-slate-900">حسين - الوكيل الذكي</h3>
                <p className="text-xs text-brand-600 font-bold">
                  {isLoading ? 'حسين يفكر الآن...' : 'صديقك في رحلة التعلم'}
                </p>
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
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <motion.div 
                    className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden ${
                      msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200 shadow-sm'
                    }`}
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    animate={{
                      y: [0, -2, 0],
                      rotate: [0, -1, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {msg.role === 'user' ? (
                      <User size={20} />
                    ) : (
                      <motion.img 
                        src={husseinAvatar} 
                        alt="حسين" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        animate={{
                          x: [-1, 1, -1]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = fallbackAvatar;
                        }}
                      />
                    )}
                  </motion.div>
                  <motion.div 
                    className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-600 text-white rounded-tr-none shadow-md' 
                        : 'bg-white text-slate-800 border border-slate-100 shadow-sm rounded-tl-none'
                    }`}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                  >
                    <div className="prose prose-sm max-w-none prose-slate">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-end"
              >
                <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 size={16} className="text-brand-600" />
                  </motion.div>
                  <span className="text-xs text-slate-500 italic">حسين يفكر...</span>
                  <motion.div
                    className="flex gap-1"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-1 h-1 bg-brand-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-brand-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-brand-400 rounded-full"></div>
                  </motion.div>
                </div>
              </motion.div>
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

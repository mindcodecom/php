
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Award, Clock } from 'lucide-react';
import { Question } from '../constants';

interface QuizProps {
  questions: Question[];
  title: string;
  onComplete: (score: number) => void;
  onClose: () => void;
  timeLimit?: number; // in minutes
}

export const Quiz: React.FC<QuizProps> = ({ questions, title, onComplete, onClose, timeLimit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(timeLimit ? timeLimit * 60 : null);

  useEffect(() => {
    if (timeLeft === null || showResult) return;

    if (timeLeft <= 0) {
      handleFinishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    // Update userAnswers immediately so we don't lose the selection on auto-submit
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = index;
    setUserAnswers(newUserAnswers);
  };

  const handleFinishQuiz = () => {
    const finalScore = userAnswers.reduce((acc, ans, idx) => {
      return acc + (ans === questions[idx].correctAnswer ? 1 : 0);
    }, 0);
    setShowResult(true);
    onComplete(finalScore);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null && userAnswers[currentQuestionIndex] === null) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(userAnswers[currentQuestionIndex + 1]);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(userAnswers[currentQuestionIndex - 1]);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setUserAnswers(new Array(questions.length).fill(null));
    setShowResult(false);
    if (timeLimit) setTimeLeft(timeLimit * 60);
  };

  if (showResult) {
    const finalScore = userAnswers.reduce((acc, ans, idx) => {
      return acc + (ans === questions[idx].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-[3rem] shadow-2xl max-w-4xl w-full mx-auto overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">نتائج الاختبار</h2>
            <p className="text-slate-600 mb-8 font-bold">{title}</p>
            
            <div className="bg-slate-50 p-8 rounded-[2rem] mb-10 inline-block min-w-[240px]">
              <div className="text-6xl font-black text-brand-600 mb-2">{percentage}%</div>
              <p className="text-slate-500 font-bold text-lg">درجتك: {finalScore} من {questions.length}</p>
            </div>
          </div>

          <div className="space-y-8 mb-10 text-right">
            <h3 className="text-xl font-black text-slate-900 border-r-4 border-brand-500 pr-4">مراجعة الإجابات والتغذية الراجعة:</h3>
            {questions.map((q, idx) => (
              <div key={q.id} className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-start gap-4 mb-4">
                  <span className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-black shrink-0 text-sm">
                    {idx + 1}
                  </span>
                  <p className="font-bold text-slate-800 text-lg leading-relaxed">{q.text}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctAnswer;
                    const isUserChoice = optIdx === userAnswers[idx];
                    
                    let cardClass = "bg-white border-slate-100 text-slate-400";
                    if (isCorrect) cardClass = "bg-emerald-50 border-emerald-200 text-emerald-700 ring-2 ring-emerald-500/20";
                    if (isUserChoice && !isCorrect) cardClass = "bg-rose-50 border-rose-200 text-rose-700 ring-2 ring-rose-500/20";

                    return (
                      <div key={optIdx} className={`p-4 rounded-2xl border-2 font-bold text-sm flex items-center justify-between ${cardClass}`}>
                        <span>{opt}</span>
                        {isCorrect && <CheckCircle2 size={18} />}
                        {isUserChoice && !isCorrect && <XCircle size={18} />}
                      </div>
                    );
                  })}
                </div>

                <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  userAnswers[idx] === q.correctAnswer ? 'bg-emerald-100/50 text-emerald-800' : 'bg-blue-100/50 text-blue-800'
                }`}>
                  <span className="font-black block mb-1">التغذية الراجعة:</span>
                  {q.feedback}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-slate-100 mt-auto">
          <button 
            onClick={resetQuiz}
            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            إعادة الاختبار
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-brand-600 text-white rounded-2xl font-black hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20"
          >
            إغلاق
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div className="text-right">
          <h2 className="text-2xl font-black text-slate-900">{title}</h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-slate-500 font-bold">السؤال {currentQuestionIndex + 1} من {questions.length}</p>
            {timeLeft !== null && (
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-black text-sm ${timeLeft < 60 ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                <Clock size={16} />
                <span dir="ltr">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-rose-500"
        >
          <XCircle size={28} />
        </button>
      </div>

      <div className="w-full bg-slate-100 h-3 rounded-full mb-10 overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          className="h-full bg-gradient-to-r from-brand-500 to-indigo-600"
        />
      </div>

      <motion.div 
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        
        <h3 className="text-2xl font-black text-slate-800 mb-10 leading-relaxed relative z-10">
          {currentQuestion.text}
        </h3>

        <div className="space-y-4 mb-12 relative z-10">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full p-6 rounded-[1.5rem] border-2 text-right font-bold transition-all flex items-center justify-between group ${
                  isSelected 
                    ? 'border-brand-500 bg-brand-50 text-brand-700 ring-4 ring-brand-500/10' 
                    : 'border-slate-100 hover:border-brand-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span className="text-lg">{option}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'border-brand-500 bg-brand-500' : 'border-slate-200 group-hover:border-brand-300'
                }`}>
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between relative z-10">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-8 py-4 text-slate-400 font-black hover:text-brand-600 transition-all disabled:opacity-0 flex items-center gap-2"
          >
            <ArrowRight size={20} />
            السابق
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null && userAnswers[currentQuestionIndex] === null}
            className="px-12 py-4 bg-brand-600 text-white rounded-2xl font-black hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            <span>{currentQuestionIndex === questions.length - 1 ? 'إنهاء الاختبار' : 'السؤال التالي'}</span>
            <ArrowLeft size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

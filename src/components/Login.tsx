import React, { useState } from 'react';
import { signInWithGoogle, checkIfEmailAllowed, createUserProfile, auth, db, handleFirestoreError, OperationType } from '../firebase';
import { signInAnonymously } from 'firebase/auth';
import { motion } from 'motion/react';
import { LogIn, ShieldAlert, CheckCircle2, GraduationCap, Mail } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      if (user && user.email) {
        const allowedData = await checkIfEmailAllowed(user.email);
        const isAdminEmail = user.email === "mind.code.com@gmail.com";
        
        if (allowedData || isAdminEmail) {
          const role = isAdminEmail ? 'admin' : (allowedData?.role || 'student');
          const name = allowedData?.name || user.displayName;
          await createUserProfile(user, role, name);
          onLoginSuccess();
        } else {
          setError(`عذراً، الإيميل (${user.email}) غير مسجل في قائمة الطلاب المسموح لهم بالدخول. يرجى التواصل مع الإدارة.`);
        }
      }
    } catch (err: any) {
      setError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const allowedData = await checkIfEmailAllowed(emailInput.trim().toLowerCase());
      const isAdminEmail = emailInput.trim().toLowerCase() === "mind.code.com@gmail.com";

      if (allowedData || isAdminEmail) {
        // For non-google emails, we use anonymous auth to get a session
        // and link it to the email in our users collection
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        
        const role = isAdminEmail ? 'admin' : (allowedData?.role || 'student');
        const name = allowedData?.name || 'مستخدم جديد';
        
        await createUserProfile({
          uid: user.uid,
          email: emailInput.trim().toLowerCase(),
          displayName: name,
          photoURL: null
        }, role, name);
        
        onLoginSuccess();
      } else {
        setError(`عذراً، الإيميل (${emailInput}) غير مسجل في قائمة المسموح لهم بالدخول.`);
      }
    } catch (err: any) {
      setError("حدث خطأ أثناء التحقق من الإيميل.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-brand-500/10 p-8 md:p-12 border border-slate-100"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-full max-w-[200px] h-24 bg-white rounded-3xl flex items-center justify-center mb-6 overflow-hidden p-2">
            <img 
              src="/logo.png" 
              alt="وزارة التربية والتعليم" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/edu/200/100";
              }}
            />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">تسجيل الدخول</h1>
          <p className="text-slate-500 font-medium">عبر الإيميل الرسمي لوزارة التربية والتعليم</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 text-sm leading-relaxed"
          >
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="space-y-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="relative group">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
              <input 
                type="email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني المسجل" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pr-12 pl-4 py-4 text-sm focus:bg-white focus:border-brand-500/20 focus:ring-4 focus:ring-brand-500/5 outline-none transition-all placeholder:text-slate-400 font-medium"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !emailInput}
              className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-6 h-6" />
                  دخول بالبريد الإلكتروني
                </>
              )}
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-bold">أو عبر</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-4 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-100 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
            الإيميل الرسمي لوزارة التربية والتعليم
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">
            جميع الحقوق محفوظة © 2026 المنصة الإبداعية للتعلم الذكي
          </p>
        </div>
      </motion.div>
    </div>
  );
}

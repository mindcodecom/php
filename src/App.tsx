
import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Terminal, 
  Layout, 
  Globe, 
  GraduationCap, 
  Bell, 
  Menu, 
  LayoutDashboard, 
  BookMarked, 
  Trophy, 
  Settings,
  ChevronRight,
  Sparkles,
  PlayCircle,
  FileText,
  CheckCircle2,
  Map as MapIcon,
  HelpCircle,
  ArrowLeft,
  Cpu,
  BookOpen,
  Home,
  Video,
  LogOut,
  RefreshCw,
  Users,
  Download,
  BarChart3,
  ClipboardCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';
import { 
  MODULES, 
  LESSONS, 
  CURRICULUM_FINAL_ASSESSMENT, 
  DIAGNOSTIC_QUESTIONS, 
  FINAL_QUESTIONS 
} from './constants';
import { Quiz } from './components/Quiz';
import Chat from './components/Chat';
import Login from './components/Login';
import { Lesson, UserProgress } from './types';
import { auth, logout, syncAllowedUsersFromSheet, getUserProfile, db, recordProgress, getAllUsersProgress } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1CzOX9M3BprtyY2frPIrUmotaZcSOWxj94LkmUyJAa5s/export?format=csv";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMap, setShowMap] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [allUsersProgress, setAllUsersProgress] = useState<UserProgress[]>([]);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<'diagnostic' | 'final' | string | null>(null);

  const isAdmin = userProfile?.role === 'admin';
  const isTeacher = userProfile?.role === 'teacher';
  const roleLabel = userProfile?.role === 'admin' ? 'إدارة' : userProfile?.role === 'teacher' ? 'معلم' : 'طالب';
  const displayName = userProfile?.displayName || user?.displayName || 'طالب مبدع';

  const fetchAdminData = async () => {
    if (!isAdmin) return;
    setIsAdminLoading(true);
    try {
      const progress = await getAllUsersProgress();
      setAllUsersProgress(progress as UserProgress[]);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setIsAdminLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'admin' && isAdmin) {
      fetchAdminData();
    }
  }, [activeTab, isAdmin]);

  const exportToExcel = () => {
    const data = allUsersProgress.map(student => ({
      'الاسم': student.name,
      'البريد الإلكتروني': student.email,
      'الدور': student.role === 'admin' ? 'إدارة' : student.role === 'teacher' ? 'معلم' : 'طالب',
      'الدروس المكتملة': student.completedLessons?.length || 0,
      'الوحدات المكتملة': student.completedModules?.length || 0,
      'الأنشطة المكتملة': student.activitiesCompleted?.length || 0,
      'الاختبار التشخيصي': student.diagnosticScore !== undefined ? `${student.diagnosticScore} من ${DIAGNOSTIC_QUESTIONS.length}` : 'لم يختبر',
      'الاختبار النهائي': student.finalAssessmentScore !== undefined ? `${student.finalAssessmentScore} من ${FINAL_QUESTIONS.length}` : 'لم يختبر',
      'آخر ظهور': student.lastActive ? new Date(student.lastActive.seconds * 1000).toLocaleString('ar-EG') : 'غير متوفر'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "تقرير الطلاب");
    XLSX.writeFile(wb, "تقرير_منصة_حاسوبي.xlsx");
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const count = await syncAllowedUsersFromSheet(SHEET_CSV_URL);
      setSyncMessage(`تمت المزامنة بنجاح! تم تحديث ${count} مستخدم.`);
    } catch (error) {
      setSyncMessage("فشلت المزامنة. تأكد من أن الملف متاح للجميع.");
      console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile);
        
        // If admin, fetch teachers
        if (profile?.role === 'admin') {
          const q = query(collection(db, 'allowed_emails'), where('role', '==', 'teacher'));
          const querySnapshot = await getDocs(q);
          const teachersList = querySnapshot.docs.map(doc => doc.data());
          setTeachers(teachersList);
        }
      } else {
        setUserProfile(null);
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setSelectedModule(null);
      setSelectedLesson(null);
      setActiveTab('dashboard');
      setUserProfile(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login onLoginSuccess={() => {}} />;
  }

  const currentModule = MODULES.find(m => m.id === selectedModule);
  const moduleLessons = LESSONS.filter(l => l.moduleId === selectedModule);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 selection:bg-brand-100 selection:text-brand-900" dir="rtl">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand-200/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-200/20 rounded-full blur-[120px] animate-blob [animation-delay:2s]"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-emerald-200/20 rounded-full blur-[120px] animate-blob [animation-delay:4s]"></div>
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white/80 backdrop-blur-xl border-l border-slate-200/60 p-8 sticky top-0 h-screen z-50">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/10 overflow-hidden p-1 border border-slate-100">
            <img 
              src="/logo.png" 
              alt="وزارة التربية والتعليم" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-brand-600 font-black text-xl">CP</div>';
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none">كود بريب</h1>
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-[0.2em]">المنصة الإبداعية</span>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          <NavItem 
            icon={<Home size={20} />} 
            label="الرئيسية" 
            active={activeTab === 'dashboard'} 
            onClick={() => { setActiveTab('dashboard'); setSelectedModule(null); setSelectedLesson(null); }}
          />
          {isAdmin && (
            <NavItem 
              icon={<BarChart3 size={20} />} 
              label="لوحة الإدارة" 
              active={activeTab === 'admin'} 
              onClick={() => setActiveTab('admin')} 
            />
          )}
          {isAdmin && (
            <NavItem 
              icon={<GraduationCap size={20} />} 
              label="المعلمون" 
              active={activeTab === 'teachers'} 
              onClick={() => setActiveTab('teachers')} 
            />
          )}
          <NavItem icon={<MapIcon size={20} />} label="خريطة المنهج" active={showMap} onClick={() => setShowMap(!showMap)} />
          <NavItem icon={<Trophy size={20} />} label="إنجازاتي" active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} />
          <NavItem icon={<Settings size={20} />} label="الإعدادات" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group text-slate-400 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={20} />
              <span className="font-black text-sm tracking-tight">تسجيل الخروج</span>
            </button>
          </div>
        </nav>

        <div className="mt-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-indigo-600 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative p-4 bg-white border border-brand-100 rounded-[2rem] shadow-sm overflow-hidden">
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-brand-500 shadow-md bg-white">
                <img 
                  src="/hussein.png" 
                  alt="حسين الوكيل الذكي" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Hussein&backgroundColor=b6e3f4&top=shortHair&hairColor=2c1b18&clothing=graphicShirt&clothingColor=2563eb";
                  }}
                />
              </div>
              <div className="text-center">
                <span className="text-lg font-black text-brand-600 uppercase tracking-wider block">حسين</span>
                <span className="text-xs font-bold text-slate-400">الوكيل الذكي</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mb-4 text-center leading-relaxed font-medium">أنا رفيقك "حسين" (11 سنة)، خبيرك التقني الذي يساعدك في تعلم البرمجة عبر جهازي اللوحي!</p>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-full py-3 bg-brand-600 text-white rounded-2xl text-xs font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 active:scale-95"
            >
              تحدث مع حسين
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-md border-b border-slate-200/50 px-8 py-5 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            <div className="lg:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
              <Menu size={22} className="text-slate-600" />
            </div>
          </div>

          <div className="flex items-center gap-5 mr-6">
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-brand-600 rounded-xl transition-all relative group">
              <Bell size={22} />
              <span className="absolute top-2.5 left-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
            </button>
            
            <div className="h-10 w-[1px] bg-slate-200 mx-1"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{displayName}</p>
                <p className="text-[10px] font-bold text-brand-600 uppercase tracking-tighter">{roleLabel}</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 border-2 border-white shadow-sm overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                <img src={user.photoURL || "https://picsum.photos/seed/student/100/100"} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 lg:p-10 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && !selectedModule && !selectedLesson ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16 pb-20"
              >
                <section className="relative">
                  <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="w-full md:w-64 aspect-square rounded-[2rem] overflow-hidden border-4 border-brand-200 shadow-2xl bg-white">
                        <img 
                          src="/hussein.png" 
                          alt="حسين" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Hussein&backgroundColor=b6e3f4&top=shortHair&hairColor=2c1b18&clothing=graphicShirt&clothingColor=2563eb";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white px-8 py-4 rounded-3xl rounded-tr-none shadow-xl border border-brand-100 mb-4 inline-block">
                          <p className="text-lg font-bold text-brand-600">مرحباً بك! أنا حسين، رفيقك في رحلة الإبداع.</p>
                        </div>
                        <motion.h2 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="heading-xl"
                        >
                          أهلاً بك في رحلة <span className="text-gradient">الإبداع الرقمي</span>
                        </motion.h2>
                        <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed mt-4">
                          تطوير مهارات البرمجية فى مقرر تصميم صفحات الويب الديناميكية
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="btn-primary flex items-center gap-2 px-8 py-4">
                        <Sparkles size={20} />
                        <span>ابدأ التعلم الآن</span>
                      </button>
                    </div>
                  </div>

                  {/* Assessments Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <motion.button
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveQuiz('diagnostic')}
                      className="p-8 bg-white rounded-[2.5rem] border-2 border-brand-100 shadow-xl hover:border-brand-500 transition-all text-right group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-50 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="relative z-10 flex items-center gap-6">
                        <div className="p-5 bg-brand-100 text-brand-600 rounded-3xl group-hover:bg-brand-600 group-hover:text-white transition-colors">
                          <ClipboardCheck size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 mb-2">الاختبار التشخيصي</h3>
                          <p className="text-slate-500 font-bold">قيم مستواك قبل البدء في الرحلة التعليمية</p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveQuiz('final')}
                      className="p-8 bg-white rounded-[2.5rem] border-2 border-indigo-100 shadow-xl hover:border-indigo-500 transition-all text-right group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-50 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="relative z-10 flex items-center gap-6">
                        <div className="p-5 bg-indigo-100 text-indigo-600 rounded-3xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Award size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 mb-2">الاختبار النهائي</h3>
                          <p className="text-slate-500 font-bold">اختبر مهاراتك الشاملة بعد إتمام الوحدات</p>
                        </div>
                      </div>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {MODULES.map((module) => (
                      <ModuleCard 
                        key={module.id} 
                        module={module} 
                        onClick={() => {
                          setSelectedModule(module.id);
                          if (user) recordProgress(user.uid, 'module', module.id);
                        }}
                      />
                    ))}
                  </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-brand-50/50 rounded-full -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-1000"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                          <div className="p-3 bg-brand-100 text-brand-600 rounded-2xl">
                            <PlayCircle size={28} />
                          </div>
                          تابع من حيث توقفت
                        </h3>
                        <button className="text-brand-600 font-black text-sm hover:underline tracking-tight">عرض السجل الكامل</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <RecentLesson title="إنشاء القوائم النقطية" module="عناصر HTML" progress={75} />
                        <RecentLesson title="مفهوم الوسوم" module="مقدمة HTML" progress={30} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-brand-600 to-indigo-700 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-brand-500/20 group">
                    <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                        <Cpu size={32} />
                      </div>
                      <h3 className="text-3xl font-black mb-4 leading-tight">تحدي الأسبوع: مبرمج المستقبل</h3>
                      <p className="text-brand-50/80 font-medium mb-10 leading-relaxed">استخدم وسم القائمة المرتبة لترتيب خطوات تشغيل الحاسب الآلي باحترافية.</p>
                      <button className="mt-auto w-full py-5 bg-white text-brand-700 rounded-2xl font-black text-lg hover:bg-brand-50 transition-colors shadow-xl shadow-black/10 active:scale-95">
                        ابدأ التحدي
                      </button>
                    </div>
                  </div>
                </section>

                {/* Curriculum Final Assessment Section */}
                <section className="glass-card p-12 rounded-[3rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-50/50 to-transparent"></div>
                  <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-right">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 font-black text-xs uppercase tracking-widest mb-6">
                        <CheckCircle2 size={14} />
                        <span>التقييم النهائي</span>
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 mb-6 leading-tight">اختبار <span className="text-gradient">نهاية المقرر</span></h3>
                      <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10 max-w-xl">
                        هل أنت مستعد لاختبار مهاراتك؟ خض التقييم النهائي الشامل لجميع وحدات المقرر واحصل على شهادة الإنجاز الخاصة بك.
                      </p>
                      <div className="flex flex-wrap gap-8">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                            <Settings size={28} />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">عدد الأسئلة</p>
                            <p className="font-black text-slate-900 text-lg">40 سؤال</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                            <Sparkles size={28} />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">الزمن المتاح</p>
                            <p className="font-black text-slate-900 text-lg">90 دقيقة</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-auto">
                      <button 
                        onClick={() => setActiveQuiz('final')}
                        className="btn-primary px-12 py-6 text-xl shadow-2xl shadow-brand-500/30 group-hover:scale-105 transition-transform"
                      >
                        ابدأ الاختبار الشامل
                      </button>
                    </div>
                  </div>
                </section>
              </motion.div>
            ) : selectedModule && !selectedLesson ? (
              <motion.div
                key="module"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12 pb-20"
              >
                <div className="flex items-center gap-4 text-sm font-black text-slate-400 uppercase tracking-widest">
                  <button onClick={() => setSelectedModule(null)} className="hover:text-brand-600 transition-colors">الرئيسية</button>
                  <ChevronRight size={14} className="rotate-180" />
                  <span className="text-brand-600">{currentModule?.title}</span>
                </div>

                <div className="glass-card p-12 rounded-[3rem] relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${currentModule?.color} opacity-10 rounded-full -mr-16 -mt-16`}></div>
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="text-right">
                      <div className={`w-20 h-20 ${currentModule?.color} rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl shadow-brand-500/20`}>
                        {getIcon(currentModule?.icon)}
                      </div>
                      <h2 className="text-4xl font-black text-slate-900 mb-4">{currentModule?.title}</h2>
                      <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">{currentModule?.description}</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
                      <div className="text-center">
                        <p className="text-3xl font-black text-brand-600 mb-1">{moduleLessons.length}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">درس متاح</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {moduleLessons.map((lesson) => (
                    <motion.button
                      key={lesson.id}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedLesson(lesson)}
                      className="glass-card p-8 rounded-[2.5rem] text-right group hover:border-brand-300 transition-all"
                    >
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all duration-300">
                          {lesson.videoUrl ? <Video size={28} /> : <FileText size={28} />}
                        </div>
                        <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">متاح</div>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{lesson.title}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2">{lesson.objectives[0]}</p>
                      <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase tracking-widest">
                        <span>ابدأ الدرس</span>
                        <ChevronRight size={16} className="rotate-180 group-hover:translate-x-[-4px] transition-transform" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : selectedLesson ? (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-10 pb-20"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-sm font-black text-slate-400 uppercase tracking-widest">
                    <button onClick={() => setSelectedModule(null)} className="hover:text-brand-600 transition-colors">الرئيسية</button>
                    <ChevronRight size={14} className="rotate-180" />
                    <button onClick={() => setSelectedLesson(null)} className="hover:text-brand-600 transition-colors">{currentModule?.title}</button>
                    <ChevronRight size={14} className="rotate-180" />
                    <span className="text-brand-600">{selectedLesson.title}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedLesson(null)}
                    className="flex items-center gap-2 text-slate-500 hover:text-brand-600 font-black text-sm transition-colors group"
                  >
                    <ArrowLeft size={18} className="group-hover:translate-x-1 transition-transform" />
                    <span>العودة للوحدة</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-10">
                    <div className="glass-card p-10 rounded-[3rem] overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-500 to-indigo-600"></div>
                      <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">{selectedLesson.title}</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 bg-brand-50/50 rounded-[2rem] border border-brand-100">
                          <h4 className="font-black text-brand-700 mb-4 flex items-center gap-2">
                            <Sparkles size={18} />
                            أهداف الدرس
                          </h4>
                          <ul className="space-y-3">
                            {selectedLesson.objectives.map((obj, i) => (
                              <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-bold leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0"></div>
                                {obj}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-8 bg-emerald-50/50 rounded-[2rem] border border-emerald-100">
                          <h4 className="font-black text-emerald-700 mb-4 flex items-center gap-2">
                            <CheckCircle2 size={18} />
                            التقييم القبلي
                          </h4>
                          <p className="text-slate-600 text-sm font-bold leading-relaxed mb-6">{selectedLesson.initialAssessment}</p>
                      <button 
                        onClick={() => {
                          if (user) recordProgress(user.uid, 'activity', `initial_assessment_${selectedLesson.id}`);
                          alert('تم بدء التقييم القبلي!');
                        }}
                        className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                      >
                        ابدأ التقييم
                      </button>
                        </div>
                      </div>

                      {selectedLesson.videoUrl && (
                        <div className="mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl bg-black aspect-video relative group">
                          <iframe 
                            src={selectedLesson.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}

                      <div className="prose prose-slate max-w-none mb-12">
                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                          <p className="text-slate-700 text-lg leading-relaxed font-medium text-right whitespace-pre-wrap">
                            {selectedLesson.content}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-2xl font-black text-slate-900 mb-6">خطوات التنفيذ</h4>
                        <div className="grid grid-cols-1 gap-4">
                          {selectedLesson.steps.map((step, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl hover:border-brand-200 transition-all group">
                              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-lg group-hover:bg-brand-600 group-hover:text-white transition-all">
                                {i + 1}
                              </div>
                              <p className="font-bold text-slate-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>


                      {selectedLesson.quiz && (
                        <div className="mt-12 p-10 bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-[3rem] text-white">
                          <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <ClipboardCheck size={28} className="text-indigo-400" />
                            اختبر معلوماتك (نشاط الدرس)
                          </h4>
                          <p className="text-indigo-100 font-medium leading-relaxed mb-8 text-lg">أجب على الأسئلة التالية لتثبيت معلوماتك في هذا الدرس.</p>
                          <button 
                            onClick={() => setActiveQuiz(selectedLesson.id)}
                            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                          >
                            ابدأ النشاط التفاعلي
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="glass-card p-8 rounded-[2.5rem] border border-white/40 shadow-xl">
                      <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                        <div className="p-2 bg-brand-100 text-brand-600 rounded-xl">
                          <BookOpen size={20} />
                        </div>
                        الأنشطة التدريبية
                      </h4>
                      <div className="space-y-4">
                        {selectedLesson.trainingActivities.map((activity, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ x: -5 }}
                            className="p-5 bg-white/50 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all cursor-pointer group flex items-center gap-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-brand-400"></div>
                            <p className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{activity}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-brand-600 to-indigo-700 p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-brand-500/20">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="relative z-10">
                        <div className="flex flex-col gap-6 mb-8">
                          <div className="w-full aspect-square rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-white">
                            <img 
                              src="/hussein.png" 
                              alt="حسين" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Hussein&backgroundColor=b6e3f4&top=shortHair&hairColor=2c1b18&clothing=graphicShirt&clothingColor=2563eb";
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="text-3xl font-black">أنا حسين</h4>
                            <p className="text-brand-100 text-lg font-bold uppercase tracking-widest">صديقك الذكي</p>
                          </div>
                        </div>
                        <p className="text-brand-100 text-lg font-medium mb-8 leading-relaxed">هل لديك سؤال؟ أنا مستعد دائماً لمساعدتك في فهم أي نقطة غامضة في الدرس.</p>
                        <button 
                          onClick={() => setIsChatOpen(true)}
                          className="w-full py-5 bg-white text-brand-600 rounded-2xl font-black text-lg hover:bg-brand-50 transition-all shadow-xl active:scale-95"
                        >
                          اسأل حسين الآن
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'admin' && isAdmin ? (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 pb-20"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900">لوحة الإدارة والمتابعة</h2>
                    <p className="text-slate-500 font-medium mt-2">متابعة أداء الطلاب ومسار تعلمهم في المنصة</p>
                  </div>
                  <button 
                    onClick={exportToExcel}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                  >
                    <Download size={20} />
                    <span>تصدير إلى Excel</span>
                  </button>
                </div>

                <div className="glass-card overflow-hidden rounded-[2.5rem] border border-slate-100">
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-6 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">الطالب</th>
                          <th className="px-6 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">الدروس</th>
                          <th className="px-6 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">الوحدات</th>
                          <th className="px-6 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">الأنشطة</th>
                          <th className="px-6 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">التشخيصي</th>
                          <th className="px-6 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">النهائي</th>
                          <th className="px-6 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">آخر ظهور</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {isAdminLoading ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-20 text-center">
                              <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto" />
                              <p className="text-slate-400 mt-4 font-bold">جاري تحميل البيانات...</p>
                            </td>
                          </tr>
                        ) : allUsersProgress.length > 0 ? (
                          allUsersProgress.map((student) => (
                            <tr key={student.uid} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 font-bold">
                                    {student.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-900">{student.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{student.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-slate-700">{student.completedLessons?.length || 0}</span>
                                  <span className="text-[10px] text-slate-400 font-bold">/ {LESSONS.length}</span>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-slate-700">{student.completedModules?.length || 0}</span>
                                  <span className="text-[10px] text-slate-400 font-bold">/ {MODULES.length}</span>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black">
                                  {student.activitiesCompleted?.length || 0} نشاط
                                </span>
                              </td>
                              <td className="px-6 py-5">
                                {student.diagnosticScore !== undefined ? (
                                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black">
                                    {student.diagnosticScore} / {DIAGNOSTIC_QUESTIONS.length}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-300 font-bold italic">---</span>
                                )}
                              </td>
                              <td className="px-6 py-5">
                                {student.finalAssessmentScore !== undefined ? (
                                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black">
                                    {student.finalAssessmentScore} / {FINAL_QUESTIONS.length}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-300 font-bold italic">---</span>
                                )}
                              </td>
                              <td className="px-6 py-5">
                                <p className="text-xs text-slate-500 font-medium">
                                  {student.lastActive ? new Date(student.lastActive.seconds * 1000).toLocaleDateString('ar-EG') : '---'}
                                </p>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-bold">لا توجد بيانات متاحة حالياً.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'teachers' ? (
              <motion.div
                key="teachers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="glass-card p-10 rounded-[3rem]">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">المعلمون</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teachers.length > 0 ? (
                      teachers.map((teacher, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                          <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center">
                            <GraduationCap size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{teacher.name}</p>
                            <p className="text-xs text-slate-400">{teacher.email}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-center col-span-2 py-10">لا يوجد معلمون مسجلون حالياً.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'settings' ? (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                <div className="glass-card p-10 rounded-[3rem]">
                  <h2 className="text-3xl font-black text-slate-900 mb-8">الإعدادات</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">الملف الشخصي</h3>
                      <p className="text-slate-500 text-sm mb-4">إدارة معلوماتك الشخصية وصورة الحساب.</p>
                      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                        <img src={user.photoURL || "https://picsum.photos/seed/user/100/100"} className="w-12 h-12 rounded-xl" alt="" />
                        <div>
                          <p className="font-bold text-slate-900">{displayName}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-slate-400">{user.email}</p>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isAdmin ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'}`}>
                              {roleLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="p-6 bg-brand-50 rounded-3xl border border-brand-100">
                        <h3 className="text-lg font-bold text-brand-900 mb-2">إدارة المنصة (Admin)</h3>
                        <p className="text-brand-600 text-sm mb-6">مزامنة قائمة الطلاب المسموح لهم بالدخول من ملف Google Sheets.</p>
                        
                        <button
                          onClick={handleSync}
                          disabled={isSyncing}
                          className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {isSyncing ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <RefreshCw size={20} />
                              مزامنة الطلاب من Google Sheets
                            </>
                          )}
                        </button>

                        {syncMessage && (
                          <p className="mt-4 text-center text-sm font-bold text-brand-700">{syncMessage}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'achievements' ? (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-yellow-500/10 rotate-3">
                  <Trophy size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">إنجازاتك البرمجية</h2>
                <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">ستظهر هنا الأوسمة والشهادات التي تحصل عليها عند إتمام الدروس بنجاح.</p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-10 px-10 py-4 bg-brand-600 text-white rounded-2xl font-black hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 active:scale-95"
                >
                  العودة للتعلم
                </button>
              </motion.div>
            ) : activeTab === 'help' ? (
              <motion.div
                key="help"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <div className="w-full max-w-[15cm] aspect-square rounded-[3rem] overflow-hidden mx-auto mb-10 shadow-2xl shadow-brand-500/30 border-8 border-white bg-white">
                  <img 
                    src="/hussein.png" 
                    alt="حسين" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Hussein&backgroundColor=b6e3f4&top=shortHair&hairColor=2c1b18&clothing=graphicShirt&clothingColor=2563eb";
                    }}
                  />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">مركز المساعدة</h2>
                <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">أنا "حسين" صديقك الذكي، هل تواجه صعوبة؟ يمكنك طرح سؤالك عليّ مباشرة أو تصفح الأسئلة الشائعة.</p>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="mt-10 px-10 py-4 bg-brand-600 text-white rounded-2xl font-black hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 active:scale-95"
                >
                  اسأل حسين الآن
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* AI Tutor Chat */}
        <Chat 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          initialSubject={selectedLesson?.title || currentModule?.title}
        />

        {/* Curriculum Map Modal */}
        {/* Mobile Chat Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 w-16 h-16 bg-brand-600 text-white rounded-full shadow-2xl shadow-brand-500/40 flex items-center justify-center z-50 active:scale-90 transition-transform"
      >
        <div className="relative">
          <img 
            src="/hussein.png" 
            alt="حسين" 
            className="w-12 h-12 rounded-full border-2 border-white/50"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Hussein&backgroundColor=b6e3f4&top=shortHair&hairColor=2c1b18&clothing=graphicShirt&clothingColor=2563eb";
            }}
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
        </div>
      </button>

      <AnimatePresence>
          {showMap && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden"
              >
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-2xl font-black text-slate-900">خريطة المنهج الدراسي</h3>
                  <button onClick={() => setShowMap(false)} className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all text-slate-400 hover:text-brand-600">
                    <ArrowLeft className="rotate-180" size={24} />
                  </button>
                </div>
                <div className="p-10 overflow-y-auto max-h-[70vh] custom-scrollbar">
                  <div className="relative space-y-12">
                    <div className="absolute top-0 bottom-0 right-6 w-1 bg-gradient-to-b from-brand-100 via-brand-200 to-brand-100 rounded-full"></div>
                    {MODULES.map((module, i) => (
                      <div key={module.id} className="relative flex items-start gap-10 group">
                        <div className={`w-14 h-14 rounded-2xl ${module.color} text-white flex items-center justify-center shadow-xl z-10 shrink-0 group-hover:scale-110 transition-transform`}>
                          {getIcon(module.icon)}
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-black text-xl text-slate-900 mb-6">{module.title}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {LESSONS.filter(l => l.moduleId === module.id).map(lesson => (
                              <div 
                                key={lesson.id} 
                                onClick={() => {
                                  setSelectedLesson(lesson);
                                  setShowMap(false);
                                  if (user) recordProgress(user.uid, 'lesson', lesson.id);
                                }}
                                className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-slate-600 hover:border-brand-200 hover:bg-white hover:shadow-sm transition-all cursor-pointer"
                              >
                                {lesson.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz Modal Overlay */}
        <AnimatePresence>
          {activeQuiz && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/90 backdrop-blur-2xl z-[110] flex items-center justify-center p-6"
            >
              <div className="w-full max-w-4xl">
                {activeQuiz === 'diagnostic' ? (
                  <Quiz 
                    title="الاختبار التشخيصي"
                    questions={DIAGNOSTIC_QUESTIONS}
                    onComplete={(score) => {
                      if (user) recordProgress(user.uid, 'assessment', 'diagnostic', score);
                    }}
                    onClose={() => setActiveQuiz(null)}
                  />
                ) : activeQuiz === 'final' ? (
                  <Quiz 
                    title="الاختبار النهائي"
                    questions={FINAL_QUESTIONS}
                    timeLimit={90}
                    onComplete={(score) => {
                      if (user) recordProgress(user.uid, 'assessment', 'final', score);
                    }}
                    onClose={() => setActiveQuiz(null)}
                  />
                ) : (
                  // Lesson Quiz
                  (() => {
                    const lesson = LESSONS.find(l => l.id === activeQuiz);
                    if (lesson && lesson.quiz) {
                      return (
                        <Quiz 
                          title={`نشاط: ${lesson.title}`}
                          questions={lesson.quiz}
                          onComplete={(score) => {
                            if (user) recordProgress(user.uid, 'activity', `quiz_${lesson.id}`, score);
                          }}
                          onClose={() => setActiveQuiz(null)}
                        />
                      );
                    }
                    return null;
                  })()
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
        active 
          ? 'nav-item-active' 
          : 'nav-item-inactive'
      }`}
    >
      <div className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-brand-600'} transition-colors`}>
        {icon}
      </div>
      <span className="font-black text-sm tracking-tight">{label}</span>
      {active && (
        <motion.div 
          layoutId="activeNav"
          className="mr-auto w-1.5 h-1.5 rounded-full bg-white"
        />
      )}
    </button>
  );
}

function ModuleCard({ module, onClick }: { module: any, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card p-8 rounded-[2.5rem] hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-500/10 transition-all text-right group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className={`w-16 h-16 ${module.color} rounded-[1.5rem] flex items-center justify-center text-white mb-8 shadow-2xl group-hover:rotate-6 transition-transform duration-500`}>
        {getIcon(module.icon)}
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{module.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium line-clamp-2">{module.description}</p>
      <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase tracking-widest">
        <span>استكشف الوحدة</span>
        <ChevronRight size={16} className="rotate-180 group-hover:translate-x-[-4px] transition-transform" />
      </div>
    </motion.button>
  );
}

function RecentLesson({ title, module, progress }: { title: string, module: string, progress: number }) {
  return (
    <div className="flex items-center gap-5 p-4 hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 rounded-[2rem] transition-all duration-300 cursor-pointer group border border-transparent hover:border-brand-100">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all duration-300">
        <PlayCircle size={28} />
      </div>
      <div className="flex-1 text-right">
        <h4 className="font-black text-base text-slate-900 group-hover:text-brand-600 transition-colors">{title}</h4>
        <p className="text-xs text-slate-400 font-bold mt-0.5">{module}</p>
      </div>
      <div className="w-28">
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 rounded-full"
          />
        </div>
        <p className="text-[10px] text-slate-500 mt-2 font-black text-left">{progress}% مكتمل</p>
      </div>
    </div>
  );
}

function getIcon(name: string | undefined) {
  switch (name) {
    case 'Layout': return <Layout size={28} />;
    case 'Code': return <Code size={28} />;
    case 'Terminal': return <Terminal size={28} />;
    case 'Cpu': return <Cpu size={28} />;
    case 'Globe': return <Globe size={28} />;
    case 'BookOpen': return <BookOpen size={28} />;
    default: return <BookOpen size={28} />;
  }
}

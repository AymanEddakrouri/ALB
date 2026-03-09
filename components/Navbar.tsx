import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  PenTool, 
  Wand2, 
  Scale, 
  Sparkles, 
  Info, 
  Languages, 
  Bell, 
  BookCheck, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  GraduationCap, 
  Menu, 
  X 
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'library' | 'writing-bank' | 'system';
  isRead: boolean;
}

export const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => (
  <div className="flex items-center gap-3">
    <div className={`${size === "sm" ? "w-10 h-10" : size === "md" ? "w-14 h-14" : "w-16 h-16"} flex items-center justify-center`}>
       <img 
          src="https://raw.githubusercontent.com/Anas-A-Q/img-host/main/arabic_bank_logo.png" 
          alt="شعار بنك اللغة العربية" 
          className="w-full h-full object-contain scale-110 drop-shadow-sm"
          onError={(e) => {
            e.currentTarget.src = "https://img.icons8.com/fluency/96/language.png";
          }}
       />
    </div>
    <div className="flex flex-col -space-y-1 text-right">
      <span className={`${size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"} font-black tracking-tighter text-blue-900 hidden sm:block title-h1`}>بنك اللغة العربية</span>
      <span className={`${size === "sm" ? "text-[8px]" : "text-[10px]"} font-bold text-emerald-600 hidden sm:block uppercase tracking-widest trendy-font`}>منصة علمية معرفية لخدمة الطلاب والباحثين</span>
    </div>
  </div>
);

const Navbar: React.FC<{ lang: 'ar' | 'en'; toggleLang: () => void }> = ({ lang, toggleLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'إصدار جديد في المكتبة',
      description: 'تمت إضافة الجزء الأول من كتاب "القراءة والكتابة لطلاب الجامعات" لرفوف المكتبة.',
      time: 'منذ ساعتين',
      type: 'library',
      isRead: false
    },
    {
      id: '2',
      title: 'تحديث في بنك الكتابة',
      description: 'تم إضافة 30 عبارة أكاديمية جديدة لقسم "النتائج والمناقشة" لتعزيز رصانة البحث.',
      time: 'منذ 5 ساعات',
      type: 'writing-bank',
      isRead: false
    },
    {
      id: '3',
      title: 'ميزة جديدة: المدقق الأسلوبي',
      description: 'يمكنك الآن استخدام ميزان الصياغة لتقييم موضوعية ورسمية نصوصك البحثية.',
      time: 'يوم أمس',
      type: 'system',
      isRead: true
    }
  ]);
  
  const location = useLocation();
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navLinks = [
    { name: 'الرئيسة', path: '/', icon: Home },
    { name: 'المكتبة اللسانية', path: '/library', icon: BookOpen },
    { name: 'بنك الكتابة العلمية', path: '/writing-bank', icon: PenTool },
    { name: 'مساعد الصياغة الذكي', path: '/paraphraser', icon: Wand2 },
    { name: 'ميزان الصياغة الأكاديمية', path: '/stylistic-auditor', icon: Scale },
    { name: 'المحلل اللساني المعمق', path: '/nlp-tool', icon: Sparkles },
    { name: 'عن المبادرة', path: '/about', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden xl:flex items-center space-x-2 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 text-[15px] ${
                  isActive(link.path) 
                  ? 'text-blue-700 font-bold bg-blue-50 shadow-sm' 
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <link.icon size={18} className={isActive(link.path) ? 'text-blue-600' : 'text-slate-400'} />
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2.5 rounded-full transition-all relative ${isNotificationsOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute top-14 left-0 md:left-auto md:right-0 w-80 md:w-96 bg-white border border-slate-100 shadow-2xl rounded-[2rem] overflow-hidden z-[60] animate-in slide-in-from-top-4 duration-300">
                  <div className="p-6 bg-blue-600 text-white flex justify-between items-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                     <h3 className="text-[15px] font-black academic-font relative z-10">مستجدات البنك والمكتبة</h3>
                     {unreadCount > 0 && (
                       <button onClick={markAllAsRead} className="text-[11px] font-black text-blue-100 hover:text-white transition-colors relative z-10 trendy-font">تحديد الكل كمقروء</button>
                     )}
                  </div>
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-slate-50/30">
                     {notifications.length > 0 ? (
                       notifications.map((notif) => (
                         <div key={notif.id} className={`p-5 border-b border-slate-100 flex gap-4 transition-all hover:bg-white cursor-pointer group ${!notif.isRead ? 'bg-blue-50/40' : ''}`}>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all group-hover:scale-110 ${
                              notif.type === 'library' ? 'bg-emerald-100 text-emerald-600' : 
                              notif.type === 'writing-bank' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                            }`}>
                               {notif.type === 'library' ? <BookCheck size={20} /> : 
                                notif.type === 'writing-bank' ? <PenTool size={20} /> : <ShieldCheck size={20} />}
                            </div>
                            <div className="flex-grow text-right">
                               <div className="flex justify-between items-start mb-1">
                                  <h4 className="text-[14px] font-black text-slate-900 trendy-font">{notif.title}</h4>
                                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 trendy-font"><Clock size={10} /> {notif.time}</span>
                               </div>
                               <p className="text-[12px] text-slate-500 leading-relaxed academic-font">{notif.description}</p>
                               {!notif.isRead && <div className="mt-2 w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                            </div>
                         </div>
                       ))
                     ) : (
                       <div className="p-16 text-right">
                          <CheckCircle2 size={40} className="text-slate-200 ml-auto mb-4" />
                          <p className="text-slate-400 text-sm font-bold trendy-font">لا توجد تنبيهات جديدة</p>
                       </div>
                     )}
                  </div>
                  <div className="p-4 bg-white border-t border-slate-100 text-right">
                     <Link to="/faq" className="text-[11px] font-black text-blue-600 hover:underline uppercase tracking-widest trendy-font">المزيد عن المبادرة</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative group">
              <Link to="/login" className="flex items-center gap-2 bg-slate-50 text-slate-500 border border-slate-100 px-5 md:px-6 py-2.5 rounded-full hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/50 transition-all font-bold text-[13px]">
                <User size={16} />
                <span className="hidden sm:inline">بوابة الباحثين</span>
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[70]">
                <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">دخول سريع عبر</p>
                <Link to="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" /> جوجل
                </Link>
                <Link to="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  <GraduationCap size={16} className="text-blue-600" /> جوجل سكولار
                </Link>
                <Link to="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  <span className="font-bold text-[10px] text-blue-800">RG</span> ريسيرش جيت
                </Link>
                <Link to="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                  <span className="font-bold text-[10px] text-slate-900">A</span> أكاديميا
                </Link>
              </div>
            </div>
            <button className="xl:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 p-4 shadow-xl absolute w-full animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-2xl ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
                }`}
              >
                <link.icon size={20} />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

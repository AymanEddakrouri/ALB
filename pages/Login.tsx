import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, GraduationCap, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      alert('حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 text-right relative overflow-hidden">
         <div className="floating-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 mb-8 ml-auto">
            <ShieldCheck size={14} className="text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-800 trendy-font">بوابة الدخول الموحد</span>
         </div>
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
         <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mr-auto mb-10 shadow-sm">
            <User size={40} />
         </div>
         <h1 className="text-3xl font-black mb-4 academic-font">بوابة الباحثين</h1>
         <p className="text-slate-500 mb-12 academic-font">سجل دخولك للوصول إلى أدواتك البحثية المحفوظة ومتابعة مسيرتك العلمية.</p>
         
         <div className="space-y-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-5 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-4 hover:border-blue-500/30 hover:bg-blue-50/30 transition-all font-bold text-slate-600 disabled:opacity-50"
            >
               {isLoading ? <Loader2 className="animate-spin" size={20} /> : <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="" />} 
               الدخول عبر جوجل
            </button>
            <button 
              disabled={isLoading}
              className="w-full py-5 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-4 hover:border-blue-500/30 hover:bg-blue-50/30 transition-all font-bold text-slate-600 disabled:opacity-50"
            >
               <GraduationCap size={20} className="text-blue-600" /> جوجل سكولار
            </button>
         </div>
         
         <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-end gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={16} /> بيئة بحثية آمنة وموثوقة
         </div>
      </div>
    </div>
  );
};

export default Login;

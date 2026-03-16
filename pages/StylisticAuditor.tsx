import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, RotateCcw, Brain, FileText, Search } from 'lucide-react';

const StylisticAuditor: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [audit, setAudit] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAudit = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setAudit(null);

    try {
      // الاتصال بالخادم (Netlify Function) بدلاً من الاتصال المباشر بـ Google API
      // هذا المسار النسبي يعمل تلقائياً عند رفع الموقع
      const response = await fetch("/.netlify/functions/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `قم بإجراء تدقيق لغوي وأسلوبي للنص العربي التالي، مع توضيح مواطن القوة والضعف ومقترحات للتحسين:\n\n${inputText}`
        })
      });

      const data = await response.json();

      if (data.text) {
        setAudit(data.text);
      } else if (data.error) {
        setAudit(`تنبيه من النظام: ${data.error}`);
      } else {
        setAudit("حدث خطأ غير متوقع أثناء التدقيق الأسلوبي.");
      }
    } catch (error) {
      console.error("Auditor Error:", error);
      setAudit("فشل الاتصال بالمحرك السحابي. يرجى مراجعة حالة النشر على Netlify.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      <section className="relative pt-20 pb-32 overflow-hidden bg-indigo-50/30">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black mb-6 border border-indigo-100">
            <Sparkles size={14} />
            <span>المدقق الأسلوبي (Stylistic Auditor)</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-indigo-950">التدقيق الأسلوبي والبلاغي</h1>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3"><FileText size={18} /> النص للفحص</h3>
            <textarea
              className="w-full h-[400px] p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] text-xl focus:border-indigo-300 outline-none resize-none shadow-inner"
              placeholder="أدخل النص هنا للفحص الأسلوبي..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleAudit}
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl flex items-center justify-center gap-4 shadow-lg transition-all"
            >
              {isProcessing ? <><RotateCcw className="animate-spin" size={24} /> جاري التدقيق...</> : <><ShieldCheck size={24} /> ابدأ الفحص الأسلوبي</>}
            </button>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3"><Search size={18} className="text-indigo-600" /> التقرير النقدي</h3>
            <div className="w-full h-[400px] p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] text-lg overflow-y-auto shadow-sm">
              {audit ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-relaxed text-slate-700 whitespace-pre-wrap">{audit}</motion.div> : <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-6"><Brain size={60} /><p className="text-lg font-bold">بانتظار النص...</p></div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StylisticAuditor;
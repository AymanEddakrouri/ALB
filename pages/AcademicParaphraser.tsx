import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PenTool, RotateCcw, Brain, FileText, CheckCircle2 } from 'lucide-react';

const AcademicParaphraser: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleParaphrase = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setResult(null);

    try {
      // نداء الوظيفة البرمجية على نيتليفاي (المسار النسبي)
      // تم إلغاء نداء جوجل المباشر هنا لأن ملف gemini.ts هو من سيقوم بذلك بأمان
      const response = await fetch("/.netlify/functions/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `قم بإعادة صياغة النص التالي بأسلوب أكاديمي عربي رصين ومحكم، مع المحافظة على الدقة المعرفية:\n\n${inputText}`
        })
      });

      const data = await response.json();
      
      // استقبال النص من الوظيفة البرمجية
      if (data.text) {
        setResult(data.text);
      } else if (data.error) {
        setResult(`خطأ من الخادم: ${data.error}`);
      } else {
        setResult("حدث خطأ غير متوقع في إعادة الصياغة.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResult("فشل الاتصال بالمحرك السحابي. تأكد من إتمام عملية الـ Deploy بنجاح.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      <section className="relative pt-20 pb-32 overflow-hidden bg-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black mb-6 border border-emerald-100">
            <Sparkles size={14} />
            <span>المعيد الصياغة الأكاديمي (Academic Rewriter)</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-emerald-950">إعادة الصياغة الأكاديمية</h1>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3"><FileText size={18} /> النص الأصلي</h3>
            <textarea
              className="w-full h-[400px] p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] text-xl focus:border-emerald-300 outline-none resize-none shadow-inner"
              placeholder="أدخل النص هنا..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleParaphrase}
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl flex items-center justify-center gap-4 shadow-lg shadow-emerald-100 transition-all"
            >
              {isProcessing ? <><RotateCcw className="animate-spin" size={24} /> جاري المعالجة...</> : <><PenTool size={24} /> صياغة أكاديمية</>}
            </button>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-600" /> النص الأكاديمي المُصاغ</h3>
            <div className="w-full h-[400px] p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] text-lg overflow-y-auto shadow-sm">
              {result ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-relaxed text-slate-700 whitespace-pre-wrap">{result}</motion.div> : <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-6"><Brain size={60} /><p className="text-lg font-bold">بانتظار النص...</p></div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicParaphraser;
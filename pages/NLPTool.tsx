import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Microscope, RotateCcw, Brain, FileText, Languages } from 'lucide-react';

const NLPTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setAnalysis(null);

    try {
      // نداء الوظيفة البرمجية على نيتليفاي بدلاً من نداء جوجل مباشرة
      // تم تبسيط الكود ليرسل النص فقط والوظيفة الخلفية تتولى الباقي
      const response = await fetch("/.netlify/functions/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `بصفتك خبيراً لسانياً، قدم تحليلاً لسانياً (صرفياً، وتركيبياً، ودلالياً) للنص العربي التالي:\n\n${inputText}`
        })
      });

      const data = await response.json();

      if (data.text) {
        setAnalysis(data.text);
      } else if (data.error) {
        setAnalysis(`حدث خطأ في التحليل: ${data.error}`);
      } else {
        setAnalysis("المحرك فشل في معالجة النص، يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error("NLP Error:", error);
      setAnalysis("خطأ في الاتصال بالخادم. يرجى التأكد من رفع التعديلات (Deploy) بنجاح.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      {/* الجزء العلوي (التصميم الشيك) */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-black mb-6">
            <Sparkles size={14} />
            <span>المختبر اللساني الذكي - نسخة العرض النهائية</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-blue-950">المحلل اللساني</h1>
        </div>
      </section>

      {/* منطقة العمل */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3"><FileText size={18} /> النص للتحليل</h3>
            <textarea
              className="w-full h-[400px] p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] text-xl focus:border-blue-300 outline-none resize-none"
              placeholder="ضع النص هنا..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl flex items-center justify-center gap-4 transition-all"
            >
              {isProcessing ? <><RotateCcw className="animate-spin" size={24} /> جاري الفحص والتحليل...</> : <><Microscope size={24} /> ابدأ التحليل اللساني</>}
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3"><Languages size={18} className="text-blue-600" /> النتائج</h3>
            <div className="w-full h-[400px] p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-y-auto shadow-sm">
              {analysis ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-relaxed text-slate-700 whitespace-pre-wrap">
                  {analysis}
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <Brain size={50} />
                  <p className="mt-4 font-bold">بانتظار التحليل...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NLPTool;
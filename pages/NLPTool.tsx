import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Microscope, RotateCcw, ShieldCheck, Brain, FileText, Languages } from 'lucide-react';

const NLPTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);

    try {
      // اتصال مباشر بجوجل
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `قم بإجراء تحليل لساني معمق للنص التالي (صرفي، تركيبي، دلالي): ${inputText}` }] }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setAnalysis(data.candidates[0].content.parts[0].text);
      } else {
        setAnalysis("لم يتمكن المحلل اللساني من معالجة النص.");
      }
    } catch (error) {
      console.error(error);
      setAnalysis("حدث خطأ في الاتصال المباشر بالمحرك.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
      {/* الـ Header وباقي الـ JSX يظل كما هو دون تغيير */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black mb-6 border border-blue-100">
            <Sparkles size={14} />
            <span>المختبر اللساني الذكي (NLP Engine)</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-blue-950">المحلل اللساني المعمق</h1>
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed">أداة أكاديمية للتحليل الصرفي والتركيبي للنصوص العربية.</p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3"><FileText size={18} /> النص المراد تحليله</h3>
            <textarea
              className="w-full h-[450px] p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem] text-xl focus:outline-none resize-none"
              placeholder="أدخل النص للتحليل اللساني..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {isProcessing ? <><RotateCcw className="animate-spin" size={24} /> جاري التحليل...</> : <><Microscope size={24} /> بدء التحليل</>}
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3"><Languages size={18} className="text-blue-600" /> نتائج التحليل</h3>
            <div className="w-full h-[450px] p-10 bg-white border-2 border-slate-100 rounded-[3rem] text-lg overflow-y-auto">
              {analysis ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="leading-relaxed text-slate-700 whitespace-pre-wrap">{analysis}</motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-6">
                  <Brain size={60} />
                  <p className="text-lg font-bold">بانتظار النص للتحليل...</p>
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
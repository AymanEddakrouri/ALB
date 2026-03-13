import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Copy, Check, RotateCcw, Brain, Zap } from 'lucide-react';

const AcademicParaphraser: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleParaphrase = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `قم بإعادة صياغة النص التالي بأسلوب أكاديمي رصين مناسب للنشر العلمي: ${inputText}` }] }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setOutputText(data.candidates[0].content.parts[0].text);
      } else {
        setOutputText("لم نتمكن من إعادة صياغة النص حاليًا.");
      }
    } catch (error) {
      console.error(error);
      setOutputText("حدث خطأ في الاتصال المباشر.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-right" dir="rtl">
       {/* الـ Header والـ JSX يظل كما هو */}
       <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black mb-6 border border-emerald-100">
            <Sparkles size={14} />
            <span>مختبر الصياغة الأكاديمية</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-emerald-950">مساعد الصياغة الذكي</h1>
          <p className="text-slate-500 max-w-2xl text-lg">حول نصوصك إلى صياغة أكاديمية مناسبة للنشر العلمي.</p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <textarea
              className="w-full h-[400px] p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem] text-xl resize-none"
              placeholder="اكتب النص هنا..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleParaphrase}
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-3xl flex items-center justify-center gap-4"
            >
              {isProcessing ? <><RotateCcw className="animate-spin" size={24} /> جاري الصياغة...</> : <><Wand2 size={24} /> صياغة أكاديمية</>}
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black flex items-center gap-3"><Zap size={18} className="text-emerald-600" /> النص المصاغ</h3>
              <button onClick={handleCopy} className="flex items-center gap-2 text-xs font-black text-emerald-600">
                {copied ? <Check size={14} /> : <Copy size={14} />} نسخ
              </button>
            </div>
            <div className="w-full h-[400px] p-10 bg-emerald-900 text-white rounded-[3rem] text-xl overflow-y-auto">
              {outputText ? (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{outputText}</motion.p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-emerald-100/40 gap-6">
                  <Brain size={60} /> بانتظار النص...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AcademicParaphraser;
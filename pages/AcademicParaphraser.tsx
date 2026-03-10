import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wand2, Copy, Check, RotateCcw, Send, ShieldCheck, Zap, Brain } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AcademicParaphraser: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleParaphrase = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    
    try {
      const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API Key is missing");
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `أعد صياغة النص التالي بأسلوب أكاديمي رصين وموضوعي باللغة العربية، مع الحفاظ على المعنى الأصلي وتجنب الذاتية: "${inputText}"`,
        config: {
          systemInstruction: "أنت خبير في الكتابة الأكاديمية العربية واللسانيات. مهمتك هي تحويل النصوص العادية إلى نصوص أكاديمية محكمة تتبع معايير النشر العلمي.",
        }
      });
      
      setOutputText(response.text || "عذراً، لم نتمكن من معالجة النص حالياً.");
    } catch (error) {
      console.error("AI Error:", error);
      setOutputText("حدث خطأ أثناء الاتصال بالمختبر الذكي. يرجى المحاولة لاحقاً.");
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
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/50 to-white"></div>
           <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-right relative z-10">
          <div className="floating-badge inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black mb-6 uppercase tracking-widest border border-emerald-100 ml-auto">
            <Sparkles size={14} /> 
            <span>مختبر الصياغة الأكاديمية (AI-Driven)</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black academic-font mb-6 leading-tight text-emerald-950">مساعد الصياغة الذكي</h1>
          <p className="text-slate-500 max-w-2xl ml-auto text-lg leading-relaxed trendy-font">
            حول مسوداتك الأولية إلى نصوص أكاديمية محكمة تتناسب مع معايير المجلات العلمية والرسائل الجامعية المرموقة.
          </p>
        </div>
      </section>

      {/* Paraphraser Tool */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Area */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-6">
               <h3 className="text-xl font-black academic-font flex items-center gap-3">
                  <RotateCcw size={18} className="text-slate-400" /> النص الأصلي
               </h3>
               <span className="text-xs font-bold text-slate-400">{inputText.length} حرف</span>
            </div>
            <textarea 
              className="w-full h-[400px] p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem] text-xl focus:outline-none focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 transition-all text-right academic-font resize-none"
              placeholder="اكتب أو الصق نصك هنا..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button 
              onClick={handleParaphrase}
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-3xl transition-all shadow-xl flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              {isProcessing ? (
                <>
                  <RotateCcw className="animate-spin" size={24} /> جاري المعالجة...
                </>
              ) : (
                <>
                  <Wand2 size={24} /> صياغة أكاديمية
                </>
              )}
            </button>
          </div>

          {/* Output Area (The requested change: "النص المصاغ أكاديمياً" card color) */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-6">
               <h3 className="text-xl font-black academic-font flex items-center gap-3">
                  <Zap size={18} className="text-emerald-600" /> النص المصاغ أكاديمياً
               </h3>
               <button 
                 onClick={handleCopy}
                 className="flex items-center gap-2 text-xs font-black text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest"
               >
                 {copied ? <Check size={14} /> : <Copy size={14} />} نسخ النص
               </button>
            </div>
            {/* Using bg-emerald-900 instead of black */}
            <div className="w-full h-[400px] p-10 bg-emerald-900 text-white border-2 border-emerald-800 rounded-[3rem] text-xl text-right academic-font relative overflow-hidden shadow-2xl">
               {outputText ? (
                 <motion.p 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="leading-relaxed relative z-10"
                 >
                   {outputText}
                 </motion.p>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-emerald-100/30 gap-6">
                    <Brain size={60} className="opacity-20" />
                    <p className="text-lg font-bold trendy-font">بانتظار النص للمعالجة...</p>
                 </div>
               )}
               <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                  <div className="academic-font text-[300px] absolute -bottom-20 -left-20 rotate-12">ض</div>
               </div>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-start gap-6">
               <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <h4 className="text-lg font-black academic-font mb-1">الالتزام بالمعايير</h4>
                  <p className="text-sm text-slate-500 leading-relaxed academic-font">تتم الصياغة وفق أحدث معايير الكتابة العلمية الدولية، مع الحفاظ التام على المعنى الأصلي والموضوعية البحثية.</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicParaphraser;

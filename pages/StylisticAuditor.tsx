import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Sparkles, Search, RotateCcw, Copy, Check, Info, ShieldCheck, Zap, Brain, AlertTriangle, FileText } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const StylisticAuditor: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAudit = async () => {
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
        contents: `قم بتحليل النص التالي من الناحية الأسلوبية والأكاديمية. حدد مواطن الضعف، الذاتية، الأخطاء الشائعة، ومدى ملاءمته للنشر العلمي. قدم نصائح للتحسين: "${inputText}"`,
        config: {
          systemInstruction: "أنت مدقق أسلوبي وخبير في نقد النصوص الأكاديمية العربية. قدم تحليلاً نقدياً بناءً يركز على الموضوعية، الرسمية، والترابط المنهجي.",
        }
      });
      
      setAnalysis(response.text || "عذراً، لم نتمكن من تحليل النص حالياً.");
    } catch (error) {
      console.error("AI Error:", error);
      setAnalysis("حدث خطأ أثناء الاتصال بميزان الصياغة. يرجى المحاولة لاحقاً.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-white"></div>
           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-right relative z-10">
          <div className="floating-badge inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black mb-6 uppercase tracking-widest border border-blue-100 ml-auto">
            <Scale size={14} /> 
            <span>مختبر المعايير الأسلوبية (AI-Auditor)</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black academic-font mb-6 leading-tight text-blue-950">ميزان الصياغة الأكاديمية</h1>
          <p className="text-slate-500 max-w-2xl ml-auto text-lg leading-relaxed trendy-font">
            حلل نصك بحثياً لاكتشاف مواطن الضعف اللغوي، والذاتية المفرطة، وفقدان الترابط المنهجي.
          </p>
        </div>
      </section>

      {/* Auditor Tool */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Area */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-6">
               <h3 className="text-xl font-black academic-font flex items-center gap-3">
                  <FileText size={18} className="text-slate-400" /> النص المراد تحليله
               </h3>
            </div>
            <textarea 
              className="w-full h-[450px] p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem] text-xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all text-right academic-font resize-none"
              placeholder="اكتب أو الصق نصك هنا للتحليل..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button 
              onClick={handleAudit}
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-6 bg-blue-900 hover:bg-slate-800 text-white font-black rounded-3xl transition-all shadow-xl flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              {isProcessing ? (
                <>
                  <RotateCcw className="animate-spin" size={24} /> جاري التحليل...
                </>
              ) : (
                <>
                  <Scale size={24} /> بدء التحليل الأسلوبي
                </>
              )}
            </button>
          </div>

          {/* Analysis Area */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-6">
               <h3 className="text-xl font-black academic-font flex items-center gap-3">
                  <AlertTriangle size={18} className="text-blue-600" /> تقرير الميزان الأكاديمي
               </h3>
            </div>
            <div className="w-full h-[450px] p-10 bg-white border-2 border-slate-100 rounded-[3rem] text-lg text-right academic-font relative overflow-y-auto custom-scrollbar shadow-sm">
               {analysis ? (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="leading-relaxed text-slate-700 whitespace-pre-wrap"
                 >
                   {analysis}
                 </motion.div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-6">
                    <Brain size={60} className="opacity-20" />
                    <p className="text-lg font-bold trendy-font">بانتظار النص للتحليل...</p>
                 </div>
               )}
            </div>
            <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-start gap-6">
               <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <h4 className="text-lg font-black academic-font mb-1">دقة المعايرة</h4>
                  <p className="text-sm text-slate-500 leading-relaxed academic-font">يعتمد الميزان على خوارزميات متقدمة مدربة على آلاف الأبحاث المحكمة لضمان دقة الملاحظات الأسلوبية.</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StylisticAuditor;

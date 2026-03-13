import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, RotateCcw, ShieldCheck, Brain, AlertTriangle } from 'lucide-react';

const StylisticAuditor: React.FC = () => {

  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleAudit = async () => {

    if (!inputText.trim()) return;

    setIsProcessing(true);

    try {

      const response = await fetch("/.netlify/functions/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode: "audit",
          text: inputText
        })
      });

      const data = await response.json();

      if (data.text) {
        setAnalysis(data.text);
      } else {
        setAnalysis("تعذر تحليل النص حاليًا.");
      }

    } catch (error) {

      console.error(error);
      setAnalysis("حدث خطأ أثناء الاتصال بمحرك التحليل.");

    } finally {

      setIsProcessing(false);

    }

  };


  return (

    <div className="min-h-screen bg-white">


      {/* HEADER */}

      <section className="relative pt-20 pb-32">

        <div className="max-w-7xl mx-auto px-4 text-right">

          <h1 className="text-5xl md:text-7xl font-black mb-6 text-blue-950">
            ميزان الصياغة الأكاديمية
          </h1>

          <p className="text-slate-500 max-w-2xl ml-auto text-lg">
            تحليل الأسلوب الأكاديمي واكتشاف نقاط الضعف.
          </p>

        </div>

      </section>



      {/* TOOL */}

      <section className="py-20 max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">


          {/* INPUT */}

          <div className="space-y-6">

            <textarea
              className="w-full h-[450px] p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem] text-xl text-right resize-none"
              placeholder="أدخل النص للتحليل..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <button
              onClick={handleAudit}
              disabled={isProcessing || !inputText.trim()}
              className="w-full py-6 bg-blue-900 text-white font-black rounded-3xl flex items-center justify-center gap-4"
            >

              {isProcessing ? (
                <>
                  <RotateCcw className="animate-spin" size={24} />
                  جاري التحليل...
                </>
              ) : (
                <>
                  <Scale size={24} />
                  تحليل الأسلوب
                </>
              )}

            </button>

          </div>



          {/* OUTPUT */}

          <div className="space-y-6">

            <h3 className="text-xl font-black flex items-center gap-3">
              <AlertTriangle size={18} />
              تقرير التحليل
            </h3>

            <div className="w-full h-[450px] p-10 bg-white border-2 border-slate-100 rounded-[3rem] text-lg text-right overflow-y-auto">

              {analysis ? (

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre-wrap"
                >
                  {analysis}
                </motion.div>

              ) : (

                <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-6">
                  <Brain size={60} />
                  بانتظار النص...
                </div>

              )}

            </div>

          </div>

        </div>

      </section>

    </div>

  );

};

export default StylisticAuditor;
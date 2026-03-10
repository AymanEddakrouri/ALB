import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleQuestion, Sparkles, ChevronLeft, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-white"></div>
           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-right relative z-10">
          <div className="floating-badge inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-black mb-6 uppercase tracking-widest border border-blue-100 ml-auto">
            <MessageCircleQuestion size={14} />
            <span>مركز المساعدة والدعم الأكاديمي</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 academic-font mb-6 leading-tight">الأسئلة الشائعة</h1>
          <p className="text-slate-500 max-w-2xl ml-auto text-lg leading-relaxed trendy-font">
            كل ما تود معرفته عن منصة بنك اللغة العربية، خدماتها، سياساتها، وكيفية الاستفادة القصوى من أدواتها البحثية.
          </p>
        </div>
      </section>
      <section className="py-20 max-w-4xl ml-auto px-4 text-right">
         <div className="space-y-8">
            {[
               { q: 'ما هو بنك اللغة العربية؟', a: 'هو منصة أكاديمية متكاملة توفر أدوات لسانية وتراكيب بحثية لدعم الطلاب والباحثين في كتابة أبحاثهم باللغة العربية.' },
               { q: 'هل الخدمات المقدمة مجانية؟', a: 'نعم، جميع الخدمات الأساسية في المنصة مجانية تماماً، حيث تهدف المبادرة لخدمة المجتمع العلمي.' },
               { q: 'كيف يمكنني المساهمة في المنصة؟', a: 'يمكنك المساهمة عبر اقتراح تراكيب أكاديمية جديدة أو ترشيح كتب للمكتبة اللسانية عبر نموذج التواصل.' },
            ].map((item, i) => (
               <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                  <h3 className="text-xl font-black mb-4 academic-font flex items-center gap-4">
                     <HelpCircle size={24} className="text-blue-600" /> {item.q}
                  </h3>
                  <p className="text-slate-500 text-lg leading-relaxed academic-font">{item.a}</p>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default FAQ;

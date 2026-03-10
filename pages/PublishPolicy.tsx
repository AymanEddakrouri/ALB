import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Users,
  ClipboardCheck,
  Lock,
  X,
  Download,
  FileCheck,
  ChevronLeft
} from 'lucide-react';

const PublishPolicy: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('openModal') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const evaluationCriteria = [
    { title: 'الأصالة والجدة', desc: 'مدى ابتكار العمل وتقديمه لإضافة حقيقية للمكتبة اللسانية.' },
    { title: 'المنهجية العلمية', desc: 'وضوح المنهج المتبع ودقة الأدوات المستخدمة في الدراسة.' },
    { title: 'سلامة اللغة والأسلوب', desc: 'خلو العمل من الأخطاء اللغوية والتزام الرصانة الأكاديمية.' },
    { title: 'التوثيق والمصادر', desc: 'الالتزام بمعايير التوثيق المعتمدة وحداثة المراجع المستخدمة.' },
    { title: 'الإخراج الفني', desc: 'تنسيق العمل وفق الدليل المعتمد للمكتبة اللسانية.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Evaluation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 bg-amber-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ClipboardCheck size={24} />
                <h3 className="text-2xl font-black academic-font">نموذج معايير التقييم للنشر</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-10 text-right">
              <p className="text-slate-500 mb-8 academic-font leading-relaxed">
                يخضع كل عمل مقدم للنشر في المكتبة اللسانية لعملية تقييم دقيقة من قبل المجلس العلمي بناءً على المعايير التالية:
              </p>
              <div className="space-y-6">
                {evaluationCriteria.map((item, idx) => (
                  <div key={idx} className="flex flex-row-reverse items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 bg-white text-amber-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 academic-font mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 academic-font">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row-reverse gap-4">
                <button 
                  onClick={() => alert('سيتم تحميل الدليل الكامل قريباً..')}
                  className="flex-grow py-4 bg-amber-600 text-white font-black rounded-2xl hover:bg-amber-700 transition-all flex items-center justify-center gap-2 academic-font shadow-lg"
                >
                  <Download size={20} /> تحميل الدليل الكامل (PDF)
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all academic-font"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-white"></div>
           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <div className="floating-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
            <ShieldCheck size={16} className="text-blue-600" />
            <span className="text-xs font-black text-blue-800 trendy-font uppercase tracking-widest">سياسة النشر الأكاديمي</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black academic-font text-blue-950 mb-6">النشر العلمي في المكتبة اللسانية</h1>
          <p className="text-blue-900/60 text-xl font-bold academic-font max-w-3xl mx-auto">
            سياسة نشر أكاديمي غير ربحية في إطار مبادرة علمية غير ربحية
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Intro Box */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -mr-10 -mt-10" />
          <div className="relative z-10 flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shrink-0">
              <BookOpen size={48} />
            </div>
            <div className="flex-grow">
              <p className="text-xl font-black text-slate-900 leading-relaxed academic-font">
                المكتبة اللسانية مبادرة علمية غير ربحية تهدف إلى إثراء المكتبة اللسانية وفق آليات ومعايير أكاديمية واضحة، وتوفير المحتوى العلمي المتخصص للباحثين في اللسانيات وعلوم اللغة.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Accepted Works */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right">
            <div className="flex items-center justify-end gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-900 academic-font">أنواع الأعمال المقبولة للنشر</h2>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <FileText size={24} />
              </div>
            </div>
            <ul className="space-y-4">
              {[
                'كتب علمية أصلية',
                'كتب مطبوعة بإذن',
                'رسائل علمية غير منشورة',
                'دراسات معاد تصميمها في صورة كتب',
                'إصدارات علمية منشورة رقميًا'
              ].map((item, i) => (
                <li key={i} className="flex flex-row-reverse items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-1" />
                  <span className="text-slate-700 font-bold academic-font leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Standards */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right">
            <div className="flex items-center justify-end gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-900 academic-font">معايير النشر العلمي والأكاديمي</h2>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>
            <ul className="space-y-4">
              {[
                'كتب علمية أصيلة في اللسانيات وفروعها.',
                'كتب سبق نشرها ورغب مؤلفوها في إتاحتها إلكترونياً بعد موافقة الناشر الأصلي.',
                'دراسات أعيد تصميمها وصياغتها في صورة كتب.',
                'أعمال علمية مجازة من المجلس العلمي للمبادرة.'
              ].map((item, i) => (
                <li key={i} className="flex flex-row-reverse items-start gap-3">
                  <CheckCircle2 size={20} className="text-blue-500 shrink-0 mt-1" />
                  <span className="text-slate-700 font-bold academic-font leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Evaluation Guide */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right flex flex-col">
            <div className="flex items-center justify-end gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-900 academic-font">دليل التقييم للنشر</h2>
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <ClipboardCheck size={24} />
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                'المؤلف ينسق العمل وتوثيقه.',
                'يتاح دليل التنسيق والتوثيق وفق الدليل المعتمد بالمكتبة.',
                'اتباع الدليل المعتمد قبل تقديم العمل للنشر.'
              ].map((item, i) => (
                <li key={i} className="flex flex-row-reverse items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0" />
                  <span className="text-slate-700 font-bold academic-font leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-amber-600 text-white font-black rounded-2xl hover:bg-amber-700 transition-all shadow-lg academic-font"
            >
              نموذج التقييم للنشر
            </button>
          </div>

          {/* Peer Review Mechanism */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right">
            <div className="flex items-center justify-end gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-900 academic-font">آلية التحكيم العلمي</h2>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Lock size={24} />
              </div>
            </div>
            <ul className="space-y-4">
              {[
                'تحكيم سرية الوصول.',
                'عدم إتاحة التعديل أو النسخ الكامل.',
                'يهدف إلى التصحيح الإلكتروني.',
                'الحفاظ الكامل على الحقوق.',
                'اتباع دليل نموذج التنسيق المعتمد مبدئياً.'
              ].map((item, i) => (
                <li key={i} className="flex flex-row-reverse items-start gap-3">
                  <CheckCircle2 size={20} className="text-indigo-500 shrink-0 mt-1" />
                  <span className="text-slate-700 font-bold academic-font leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link to="/request-publication" className="inline-flex flex-row-reverse items-center gap-4 px-12 py-6 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-2xl academic-font text-xl">
            تقديم طلب نشر <ArrowRight size={24} className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublishPolicy;

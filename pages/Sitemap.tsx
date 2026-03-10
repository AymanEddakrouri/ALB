import React from 'react';
import { Link } from 'react-router-dom';
import { Map, ChevronLeft } from 'lucide-react';

const Sitemap: React.FC = () => {
  const links = [
    { title: 'الرئيسية', path: '/' },
    { title: 'المكتبة اللسانية', path: '/library' },
    { title: 'بنك الكتابة العلمية', path: '/writing-bank' },
    { title: 'مساعد الصياغة الذكي', path: '/paraphraser' },
    { title: 'ميزان الصياغة الأكاديمية', path: '/stylistic-auditor' },
    { title: 'المحلل اللساني المعمق', path: '/nlp-tool' },
    { title: 'مهندس الاستشهادات المرجعية', path: '/citations' },
    { title: 'عن المبادرة', path: '/about' },
    { title: 'الأسئلة الشائعة', path: '/faq' },
    { title: 'ميثاق الأمانة', path: '/privacy' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-white"></div>
           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl ml-auto px-4 relative z-10 text-right">
          <div className="floating-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 mb-8">
             <Map size={16} className="text-blue-600" />
             <span className="text-xs font-black text-blue-800 trendy-font uppercase tracking-widest">خريطة الموقع</span>
          </div>
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mr-auto mb-8 shadow-sm">
             <Map size={40} />
          </div>
          <h1 className="text-5xl font-black academic-font mb-6">خريطة الموقع</h1>
          <p className="text-slate-500 text-lg academic-font">دليل سريع لجميع أقسام وأدوات منصة بنك اللغة العربية.</p>
        </div>
      </section>

      <div className="max-w-4xl ml-auto px-4 py-12">
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link, i) => (
               <Link key={i} to={link.path} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all flex justify-between items-center group">
                  <span className="text-xl font-black academic-font text-slate-900">{link.title}</span>
                  <ChevronLeft size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
               </Link>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Sitemap;

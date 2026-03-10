import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/50 to-white"></div>
           <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl ml-auto px-4 relative z-10 text-right">
          <div className="floating-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600/10 border border-emerald-600/20 mb-8">
             <ShieldCheck size={16} className="text-emerald-600" />
             <span className="text-xs font-black text-emerald-800 trendy-font uppercase tracking-widest">ميثاق الخصوصية</span>
          </div>
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mr-auto mb-8 shadow-sm">
             <ShieldCheck size={40} />
          </div>
          <h1 className="text-5xl font-black academic-font mb-6">ميثاق الأمانة والخصوصية</h1>
          <p className="text-slate-500 text-lg academic-font">نلتزم بأعلى معايير الخصوصية والأمانة العلمية في التعامل مع بياناتك وأبحاثك.</p>
        </div>
      </section>

      <div className="max-w-4xl ml-auto px-4 py-12">
                  <div className="space-y-16">
            <div className="flex flex-row-reverse gap-8">
               <div className="w-12 h-12 bg-slate-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <Lock size={24} />
               </div>
               <div className="text-right">
                  <h3 className="text-2xl font-black mb-4 academic-font">حماية البيانات</h3>
                  <p className="text-slate-500 text-lg leading-relaxed academic-font">لا نقوم بمشاركة بياناتك الشخصية مع أي طرف ثالث، ونستخدم تقنيات تشفير متقدمة لحماية حسابك.</p>
               </div>
            </div>
            <div className="flex flex-row-reverse gap-8">
               <div className="w-12 h-12 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <Eye size={24} />
               </div>
               <div className="text-right">
                  <h3 className="text-2xl font-black mb-4 academic-font">الأمانة العلمية</h3>
                  <p className="text-slate-500 text-lg leading-relaxed academic-font">نحترم الملكية الفكرية ونشجع على التوثيق الصحيح للمراجع، ولا نتحمل مسؤولية سوء استخدام الأدوات في الانتحال العلمي.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

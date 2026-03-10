import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles, ShieldCheck, Heart, Globe, Users, Target, BookOpen, PenTool, Search, FileCheck, Shield, Award, Send, ChevronLeft, MessageSquare, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/50 to-white"></div>
           <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-right">
          <div className="floating-badge inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 mb-8 backdrop-blur-md ml-auto">
             <GraduationCap size={16} className="text-emerald-600" />
             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 trendy-font">هوية المبادرة ورسالتها</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black academic-font mb-6 leading-tight text-slate-900">بنك اللغة العربية:<br/><span className="text-emerald-600">مختبر الباحث العربي الأول</span></h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto academic-font leading-relaxed opacity-90">
            مبادرة أكاديمية رائدة تهدف إلى تمكين الباحث العربي بأدوات لسانية ذكية وبيئة معرفية آمنة، تجمع بين أصالة التراث وتقنيات المستقبل.
          </p>
        </div>
      </section>

      {/* Core Message Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side Visual */}
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden shadow-2xl flex items-center justify-center p-12 relative">
               <div className="absolute top-12 right-12 opacity-10 academic-font text-2xl">Logo BG</div>
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 className="bg-white p-12 rounded-[3rem] shadow-xl text-right relative z-10 border border-slate-50"
               >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mr-auto mb-8">
                     <Sparkles size={32} />
                  </div>
                  <p className="text-2xl font-black text-slate-900 academic-font leading-relaxed">
                    "نحن لا نصنع البحث، بل نصقل لغته ونؤمن مراجعة رفوفه."
                  </p>
               </motion.div>
               
               {/* 100% Badge */}
               <div className="absolute -bottom-6 right-12 bg-emerald-600 text-white p-8 rounded-[2.5rem] shadow-2xl border-4 border-white text-right min-w-[140px]">
                  <div className="text-3xl font-black mb-1">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">مجاني وتطوعي</div>
               </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-4 mb-8">
               <h2 className="text-4xl font-black text-slate-900 academic-font">رسالتنا الجوهرية</h2>
               <div className="w-1.5 h-12 bg-emerald-600 rounded-full" />
            </div>
            <p className="text-xl text-slate-600 leading-[2] academic-font mb-12">
              في عالم متسارع، يحتاج الباحث العربي إلى ما هو أكثر من مجرد "محرك بحث". نحن هنا لنكون **بوصلة إجرائية**؛ نوفر له الرف العلمي الرصين عبر مكتبتنا، ونمنحه الريشة الأكاديمية البليغة عبر بنك الكتابة، مدعوماً بذكاء اصطناعي يفهم خصوصية لغتنا العربية.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-right group hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-white text-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     <Target size={24} />
                  </div>
                  <h4 className="text-xl font-black mb-3 academic-font">الرؤية</h4>
                  <p className="text-slate-500 text-sm leading-relaxed academic-font">أن نصبح المرجع الرقمي الأول لكل طالب علم وباحث في اللسانيات والعلوم الإنسانية في الوطن العربي.</p>
               </div>
               <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-right group hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     <Users size={24} />
                  </div>
                  <h4 className="text-xl font-black mb-3 academic-font">المجتمع</h4>
                  <p className="text-slate-500 text-sm leading-relaxed academic-font">بناء مجتمع أكاديمي تفاعلي يتبادل الخبرات والمصادر تحت ميثاق الأمانة العلمية والتعاون المعرفي.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Philosophy Section */}
      <section className="py-24 bg-emerald-950 text-white overflow-hidden relative">
         <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
         </div>
         
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-right mb-20">
               <h2 className="text-4xl md:text-5xl font-black mb-6 academic-font">فلسفة المنصة: دورة حياة المعرفة</h2>
               <p className="text-emerald-100/60 text-xl academic-font">نقوم بهيكلة أدواتنا بناءً على الرحلة المنطقية للباحث، من الاستهلاك المعرفي إلى الإنتاج العلمي.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {/* Phase 1 */}
               <div className="bg-white/5 backdrop-blur-md rounded-[3.5rem] p-12 border border-white/10 text-right relative group hover:bg-white/10 transition-all">
                  <div className="flex items-start justify-between mb-10">
                     <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <BookOpen size={32} />
                     </div>
                     <h3 className="text-3xl font-black academic-font">أولاً: بوابة الاستقبال المعرفي</h3>
                  </div>
                  <p className="text-emerald-100/70 text-lg leading-relaxed academic-font mb-10">
                    تبدأ رحلة الباحث بالقراءة والتحليل. هنا تبرز **المكتبة اللسانية** كحجر أساس، تدعمها أدوات **المحلل اللساني** و **مهندس الاستشهادات** لضمان استيعاب رصين وتوثيق أمين.
                  </p>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 justify-end text-emerald-400 font-bold academic-font">
                        <span>فحص النصوص لسانياً</span>
                        <FileCheck size={18} />
                     </div>
                     <div className="flex items-center gap-3 justify-end text-emerald-400 font-bold academic-font">
                        <span>مطالعة الرفوف الآمنة</span>
                        <BookOpen size={18} />
                     </div>
                  </div>
               </div>

               {/* Phase 2 */}
               <div className="bg-white/5 backdrop-blur-md rounded-[3.5rem] p-12 border border-white/10 text-right relative group hover:bg-white/10 transition-all">
                  <div className="flex items-start justify-between mb-10">
                     <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <PenTool size={32} />
                     </div>
                     <h3 className="text-3xl font-black academic-font">ثانياً: بوابة الإنتاج الأكاديمي</h3>
                  </div>
                  <p className="text-emerald-100/70 text-lg leading-relaxed academic-font mb-10">
                    بعد النضج المعرفي تأتي مرحلة الكتابة. يتصدر **بنك الكتابة العلمية** هذه المرحلة؛ وهو دليل لغوي بحثي يقدم نماذج واقعية للكتابة الأكاديمية العربية، مستخلصة من مدونات لغوية (Corpus Linguistics) ومبنية على ما يكتبه الباحثون فعليًا، لا نصوص مولّدة اصطناعيًا.
                  </p>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 justify-end text-blue-400 font-bold academic-font">
                        <span>وزن الصياغة موضوعياً</span>
                        <Target size={18} />
                     </div>
                     <div className="flex items-center gap-3 justify-end text-blue-400 font-bold academic-font">
                        <span>تتبع مسارات البحث</span>
                        <Search size={18} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Principles Section */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-right mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 academic-font">ثوابتنا العلمية والمهنية</h2>
               <p className="text-slate-500 text-xl academic-font">مبادئ لا نحيد عنها في تطوير وتشغيل المنصة.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { title: 'الوصول المفتوح (Open Access)', desc: 'نؤمن بأن العلم حق مشاع، لذا نوفر كافة أدواتنا ومصادرنا مجاناً للباحث العربي دون أي قيود مادية.', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { title: 'الأمانة الرقمية', desc: 'نطبق أعلى معايير الحماية للملكية الفكرية من خلال بيئة القراءة الآمنة التي تمنع القرصنة وتضمن حق المؤلف.', icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { title: 'الرصانة الأكاديمية', desc: 'كل حرف في بنك الكتابة وكل كتاب في المكتبة يخضع لمراجعة دقيقة من قبل مجلسنا العلمي لضمان الجودة.', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { title: 'مبادرة تطوعية', desc: 'المشروع وقف معرفي غير ربحي، يقوم عليه أكاديميون متطوعون وهبوا وقتهم لخدمة لغة الضاد.', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' }
               ].map((item, idx) => (
                  <div key={idx} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-right group hover:shadow-xl transition-all">
                     <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mr-auto mb-8 group-hover:scale-110 transition-transform`}>
                        <item.icon size={32} />
                     </div>
                     <h4 className="text-xl font-black mb-4 academic-font">{item.title}</h4>
                     <p className="text-slate-500 text-sm leading-relaxed academic-font">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Team & Advisory Board Section */}
      <section id="team" className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-right mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 academic-font">القائمون على المنصة</h2>
               <p className="text-slate-500 text-xl academic-font">نخبة من الأكاديميين والخبراء الساعين لخدمة البحث العلمي العربي.</p>
            </div>

            {/* Core Team */}
            <div className="mb-24">
               <div className="flex items-center justify-end gap-4 mb-12">
                  <h3 className="text-3xl font-black text-slate-800 academic-font">فريق العمل</h3>
                  <div className="w-1.5 h-10 bg-blue-600 rounded-full" />
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Dr. Ayman */}
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right group hover:shadow-xl transition-all flex flex-col h-full">
                     <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mr-auto mb-8 group-hover:scale-110 transition-transform shadow-inner">
                        <Users size={40} />
                     </div>
                     <h4 className="text-2xl font-black mb-4 academic-font text-slate-900">د. أيمن الدكروري</h4>
                     <div className="space-y-2 mb-8 flex-grow">
                        <p className="text-blue-600 font-bold academic-font text-sm">مدير مكتبة عفت والمتحف الثقافي</p>
                        <p className="text-slate-600 academic-font text-sm">أستاذ اللسانيات التطبيقية</p>
                        <p className="text-slate-500 academic-font text-sm">جامعة عفت</p>
                     </div>
                     <div className="pt-6 border-t border-slate-50 space-y-2">
                        <a href="mailto:a.eldakroury@aucegypt.edu" className="block text-xs text-slate-400 hover:text-blue-600 transition-colors academic-font ltr-text">a.eldakroury@aucegypt.edu</a>
                        <a href="mailto:ayman@arabicbank.info" className="block text-xs text-slate-400 hover:text-blue-600 transition-colors academic-font ltr-text">ayman@arabicbank.info</a>
                     </div>
                  </div>

                  {/* Dr. Amani */}
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right group hover:shadow-xl transition-all flex flex-col h-full">
                     <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mr-auto mb-8 group-hover:scale-110 transition-transform shadow-inner">
                        <Users size={40} />
                     </div>
                     <h4 className="text-2xl font-black mb-4 academic-font text-slate-900">د. أماني رمضان</h4>
                     <div className="space-y-2 mb-8 flex-grow">
                        <p className="text-emerald-600 font-bold academic-font text-sm">أستاذ علم المعلومات المساعد</p>
                        <p className="text-slate-600 academic-font text-sm">كلية الآداب، جامعة القاهرة</p>
                     </div>
                     <div className="pt-6 border-t border-slate-50">
                        <a href="mailto:amani@cu.edu.eg" className="block text-xs text-slate-400 hover:text-emerald-600 transition-colors academic-font ltr-text">amani@cu.edu.eg</a>
                     </div>
                  </div>

                  {/* Dr. Adnan */}
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right group hover:shadow-xl transition-all flex flex-col h-full">
                     <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mr-auto mb-8 group-hover:scale-110 transition-transform shadow-inner">
                        <Users size={40} />
                     </div>
                     <h4 className="text-2xl font-black mb-4 academic-font text-slate-900">د. عدنان الخطيب</h4>
                     <div className="space-y-2 mb-8 flex-grow">
                        <p className="text-amber-600 font-bold academic-font text-sm">أستاذ الأدب العربي</p>
                        <p className="text-slate-600 academic-font text-sm">كلية العلوم الإنسانية، جامعة عفت</p>
                     </div>
                     <div className="pt-6 border-t border-slate-50">
                        <a href="mailto:akhatib@effatuniversity.edu.sa" className="block text-xs text-slate-400 hover:text-amber-600 transition-colors academic-font ltr-text">akhatib@effatuniversity.edu.sa</a>
                     </div>
                  </div>
               </div>
            </div>

            {/* Advisory Board */}
            <div>
               <div className="flex items-center justify-end gap-4 mb-12">
                  <h3 className="text-3xl font-black text-slate-800 academic-font">الهيئة الاستشارية</h3>
                  <div className="w-1.5 h-10 bg-emerald-600 rounded-full" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl ml-auto">
                  {/* Dr. Madi */}
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right group hover:shadow-xl transition-all flex flex-col h-full">
                     <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mr-auto mb-8 group-hover:scale-110 transition-transform shadow-inner">
                        <ShieldCheck size={32} />
                     </div>
                     <h4 className="text-xl font-black mb-4 academic-font text-slate-900">د. ماضي محمد</h4>
                     <div className="space-y-2 mb-8 flex-grow">
                        <p className="text-emerald-600 font-bold academic-font text-sm">أستاذ وعميد الدراسات العليا والبحث العلمي</p>
                        <p className="text-slate-500 academic-font text-sm">جامعة عفت</p>
                     </div>
                     <div className="pt-6 border-t border-slate-50">
                        <a href="mailto:momohamed@effatuniversity.edu.sa" className="block text-xs text-slate-400 hover:text-emerald-600 transition-colors academic-font ltr-text">momohamed@effatuniversity.edu.sa</a>
                     </div>
                  </div>

                  {/* Dr. Basant */}
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-right group hover:shadow-xl transition-all flex flex-col h-full">
                     <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mr-auto mb-8 group-hover:scale-110 transition-transform shadow-inner">
                        <ShieldCheck size={32} />
                     </div>
                     <h4 className="text-xl font-black mb-4 academic-font text-slate-900">د. بسنت الكفراوي</h4>
                     <div className="space-y-2 mb-8 flex-grow">
                        <p className="text-emerald-600 font-bold academic-font text-sm">أستاذ علوم الحاسب</p>
                        <p className="text-slate-500 academic-font text-sm">جامعة عفت</p>
                     </div>
                     <div className="pt-6 border-t border-slate-50">
                        <a href="mailto:pelkafrawy@effatuniversity.edu.sa" className="block text-xs text-slate-400 hover:text-emerald-600 transition-colors academic-font ltr-text">pelkafrawy@effatuniversity.edu.sa</a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
         <div className="bg-emerald-950 rounded-[4rem] p-12 md:p-24 text-white text-right relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
            
            <div className="relative z-10">
               <h2 className="text-4xl md:text-6xl font-black mb-8 academic-font">ساهم في إثراء المحتوى اللساني العربي</h2>
               <p className="text-emerald-100/60 text-xl md:text-2xl max-w-4xl ml-auto academic-font leading-relaxed mb-16">
                  سواء كنت مؤلفاً تود إتاحة كتابك، أو باحثاً تود مشاركة خبراتك، أبواب المنصة مفتوحة لكل المخلصين للغة العربية والبحث العلمي.
               </p>

               <div className="flex flex-col md:flex-row items-center justify-end gap-6">
                  <Link 
                    to="/library#publishing-section"
                    className="w-full md:w-auto px-12 py-6 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-lg"
                  >
                     انشر كتابك معنا <ChevronLeft size={24} />
                  </Link>
                  <button 
                    onClick={() => window.location.href = 'mailto:council@arabicbank.info'}
                    className="w-full md:w-auto px-12 py-6 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl transition-all backdrop-blur-md flex items-center justify-center gap-3 text-lg border border-white/10"
                  >
                     تواصل مع المجلس العلمي <MessageSquare size={24} />
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;

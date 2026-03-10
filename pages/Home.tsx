import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, BookOpen, PenTool, Wand2, Scale, Sparkles, ChevronLeft, GraduationCap, Eye, Microscope, BookMarked, ArrowDownCircle, BrainCircuit, ScrollText, Quote } from 'lucide-react';

const testimonials = [
  { name: "سارة المنصوري", role: "طالبة", content: "منصة استثنائية تجمع بين رصانة المحتوى وسهولة الاستخدام.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "أ. محمد العتيبي", role: "باحث دكتوراه", content: "ساعدتني أدوات التحليل اللساني في فهم بنى النصوص المعقدة", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. أحمد كمال", role: "خبير تقنيات اللغة", content: "أول مبادرة عربية حقيقية توظف تقنيات المعالجة اللسانية", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "ليلى حسن", role: "طالبة ماجستير", content: "بنك الكتابة العلمية وفر عليّ الكثير من الوقت في صياغة البحث.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. محمود إبراهيم", role: "أستاذ النقد الأدبي", content: "دقة في المصطلحات واحترافية في العرض الأكاديمي.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "فاطمة الزهراء", role: "مترجمة أكاديمية", content: "أدوات إعادة الصياغة هنا هي الأفضل في المحتوى العربي.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. ياسين القاضي", role: "باحث في اللسانيات الحاسوبية", content: "خطوة جبارة نحو رقمنة التراث اللساني العربي.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "أ. خالد الشمري", role: "طالب دراسات عليا", content: "المكتبة اللسانية كنز حقيقي لكل باحث جاد.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. نورة الفايز", role: "أستاذة المناهج", content: "تكامل رائع بين النظرية والتطبيق في خدمة الباحث.", img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "عمر الفاروق", role: "كاتب وباحث", content: "واجهة مستخدم مريحة جداً وتدعم التركيز الأكاديمي", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. منى السعيد", role: "أستاذة البلاغة", content: "ميزان الصياغة الأكاديمية أداة لا غنى عنها للتدقيق.", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "أ. إبراهيم علي", role: "باحث تاريخ", content: "التوثيق الآلي بنظام APA دقيق جداً ومفيد", img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. هند القحطاني", role: "أستاذة اللغة العربية", content: "فخورة بوجود منصة عربية بهذا المستوى العالمي.", img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "يوسف منصور", role: "طالب في كلية الحقوق", content: "ساعدني في صياغة مذكراتي القانونية بأسلوب رصين", img: "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. ريم البارودي", role: "باحثة في علم الاجتماع", content: "أداة رائعة لتحليل النصوص وفهم دلالاتها العميقة!", img: "https://images.unsplash.com/photo-1557053910-d9eaba70b584?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "حسن الدوسري", role: "باحث إعلامي", content: "سرعة في الأداء ودقة في النتائج، شكرا لكم", img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. سامي الجابر", role: "أستاذ الفلسفة", content: "المنصة تعكس عمقا معرفيا واهتمامًا بالتفاصيل اللغوية.", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "أمل العوضي", role: "طالبة دكتوراه", content: "تطبيق عملي ممتاز لنظريات اللسانيات الحديثة", img: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. فهد التميمي", role: "خبير جودة التعليم", content: "نقلة نوعية في الأدوات البحثية المتاحة للباحث العربي.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "ناصر الحربي", role: "باحث في الأدب", content: "أكثر ما أعجبني هو بنك الكتابة العلمية... جديد من نوعه", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. علي الرشيد", role: "أستاذ اللسانيات", content: "جهد مبارك يخدم لغة القرآن الكريم بأسلوب عصري. جعله الله في ميزان جسناتكم", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "سمر القحطاني", role: "باحثة لغوية", content: "أدوات التحليل الصرفي دقيقة جداً ومبهرة.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. وليد السعدي", role: "أستاذ الأدب المقارن", content: "المنصة تفتح آفاقا جديدة للبحث البيني.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "منيرة العبدالله", role: "طالبة جامعية", content: "شكرا د. أيمن على هذه المبادرة الرائعة.", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. طارق الحبيب", role: "باحث في علم النفس اللغوي", content: "تكامل رائع بين التقنية والعلوم الإنسانية.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "سارة الحربي", role: "مترجمة فورية", content: "المصطلحات اللسانية هنا دقيقة جداً ومحدثة.", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. إبراهيم الفقي", role: "خبير تنمية بشرية", content: "النجاح يبدأ من إتقان لغة التواصل العلمي.", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "نورة السبيعي", role: "باحثة تربوية", content: "أدوات الكتابة ساعدتني في تجويد أطروحتي.", img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "د. محمد الشهري", role: "أستاذ النحو", content: "تطبيق عملي رائع لقواعد اللغة في سياق أكاديمي.", img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=150&h=150&auto=format&fit=crop" },
  { name: "فيصل العنزي", role: "طالب ماجستير", content: "المنصة وفرت عليّ عناء البحث في المعاجم الورقية.", img: "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?q=80&w=150&h=150&auto=format&fit=crop" }
];

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-white"></div>
           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
           
           {/* Animated Background Elements */}
           <div className="absolute top-40 left-1/4 w-3 h-3 rounded-full bg-blue-500/20 animate-bounce"></div>
           <div className="absolute bottom-40 right-1/4 w-5 h-5 rounded-full bg-green-500/20 animate-bounce" style={{ animationDuration: '3.5s' }}></div>
           
           {/* Scattered Arabic Letters in Background */}
           <div className="absolute top-[5%] left-[5%] opacity-[0.03] academic-font text-[150px] rotate-12 hidden lg:block">أ</div>
           <div className="absolute top-[10%] right-[5%] opacity-[0.03] academic-font text-[180px] -rotate-12 hidden lg:block">ب</div>
           <div className="absolute bottom-[5%] left-[8%] opacity-[0.03] academic-font text-[200px] rotate-45 hidden lg:block">ت</div>
           <div className="absolute bottom-[10%] right-[8%] opacity-[0.03] academic-font text-[160px] -rotate-45 hidden lg:block">ث</div>
           <div className="absolute top-[20%] left-[15%] opacity-[0.02] academic-font text-[220px] rotate-[30deg] hidden lg:block">ج</div>
           <div className="absolute bottom-[20%] right-[15%] opacity-[0.02] academic-font text-[190px] -rotate-[15deg] hidden lg:block">ح</div>
           <div className="absolute top-[5%] right-[25%] opacity-[0.02] academic-font text-[170px] rotate-[60deg] hidden lg:block">خ</div>
           <div className="absolute bottom-[5%] left-[25%] opacity-[0.02] academic-font text-[210px] -rotate-[20deg] hidden lg:block">د</div>
           <div className="absolute top-[40%] left-[2%] opacity-[0.02] academic-font text-[140px] rotate-[10deg] hidden lg:block">ر</div>
           <div className="absolute top-[40%] right-[2%] opacity-[0.02] academic-font text-[140px] -rotate-[10deg] hidden lg:block">ز</div>

           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center gap-20">
              <span className="academic-font text-[600px] text-slate-900/5 rotate-[-15deg] leading-none">ل</span>
              <span className="academic-font text-[750px] text-blue-500/5 rotate-[10deg] leading-none">غ</span>
              <span className="academic-font text-[650px] text-slate-900/5 rotate-[-5deg] leading-none">ة</span>
           </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right z-10">
          <div className="floating-badge inline-flex flex-col items-end mb-8 w-full">
            <div className="relative flex items-center gap-5 px-10 py-4 rounded-full bg-white border border-slate-200 backdrop-blur-md shadow-xl">
                <div className="p-2.5 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full shadow-lg">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div className="text-right border-r border-slate-200 pr-5">
                  <p className="text-[11px] font-black uppercase tracking-widest text-blue-900 mb-0.5 trendy-font">منصة البحث العلمي الرصين</p>
                  <p className="text-sm font-bold text-slate-600 trendy-font">مبادرة أكاديمية غير ربحية</p>
                </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-black mb-10 title-h1 leading-tight tracking-tight text-blue-950">
              بنك اللغة العربية
            </h1>
            <p className="text-xl md:text-3xl font-medium mb-16 text-slate-500 academic-font max-w-4xl ml-auto leading-relaxed">دورة حياة البحث العلمي: من التلَقّي المعرفي إلى الإنتاج الأكاديمي</p>
          </div>

          <div className="max-w-4xl ml-auto mt-20">
            <form className="relative group" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="ابحث عن كتاب، أو تركيب أكاديمي، أو مصطلح لساني..." 
                className="w-full px-10 py-8 md:py-10 bg-white border-2 border-slate-100 rounded-[3rem] text-xl md:text-2xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-2xl group-hover:shadow-blue-500/10 text-right pr-20 academic-font"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-8 top-1/2 -translate-y-1/2 text-blue-500/60" size={32} />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all flex items-center gap-3 active:scale-95 text-[14px] trendy-font">استكشف <ChevronLeft size={20} /></button>
            </form>
          </div>
        </div>
      </section>

      {/* PORTAL 1: The Reception Portal (التلقي المعرفي) */}
      <section className="py-24 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-20 border-r-8 border-emerald-600 pr-10">
               <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shadow-sm shrink-0">
                  <Eye size={40} />
               </div>
               <div>
                  <h2 className="text-4xl font-black text-slate-900 academic-font mb-2">بوابة التلَقّي المعرفي (القراءة)</h2>
                  <p className="text-lg text-slate-500 font-medium trendy-font">المرحلة الأولى: بناء القاعدة العلمية وجمع المادة اللسانية</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
               <Link to="/library" className="lg:col-span-7 group relative p-12 md:p-20 rounded-[4rem] bg-emerald-50 text-slate-900 overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.01] border border-emerald-100">
                  <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
                     <img src="https://raw.githubusercontent.com/Anas-A-Q/img-host/main/arabic_bank_logo.png" className="w-full h-full object-cover scale-150 rotate-12" alt="" />
                  </div>
                  <div className="relative z-10">
                     <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-all text-emerald-600 shadow-sm">
                        <BookOpen size={40} />
                     </div>
                     <h3 className="text-5xl font-black mb-6 academic-font">المكتبة اللسانية</h3>
                     <p className="text-slate-600 text-2xl leading-relaxed mb-12 max-w-xl font-medium academic-font">
                        مركز الثقل المعرفي؛ حيث تتوفر أمهات الكتب اللسانية والمعاجم المتخصصة في بيئة قراءة آمنة تدعم التركيز والبحث المعمق.
                     </p>
                     <div className="inline-flex items-center gap-4 text-emerald-600 font-black text-xs uppercase tracking-widest trendy-font">
                        دخول الرفوف الآمنة <ChevronLeft size={20} />
                     </div>
                  </div>
               </Link>

               <div className="lg:col-span-5 grid grid-cols-1 gap-8">
                  <Link to="/nlp-tool" className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all group flex items-start gap-8">
                     <div className="w-16 h-16 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shadow-md shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <Microscope size={28} />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black text-slate-900 academic-font mb-2">المحلل اللساني المعمق</h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed trendy-font font-medium">أداة تفكيك النصوص وفهم البنى الصرفية والجذور أثناء القراءة والاستيعاب.</p>
                     </div>
                  </Link>

                  <Link to="/citations" className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all group flex items-start gap-8">
                     <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-md shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <BookMarked size={28} />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black text-slate-900 academic-font mb-2">مهندس الاستشهادات المرجعية</h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed trendy-font font-medium">توثيق مراجعك فورياً بنظام APA أثناء عملية القراءة لضمان الأمانة العلمية.</p>
                     </div>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      <div className="flex justify-center -my-8 relative z-20">
         <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce border border-slate-100">
            <ArrowDownCircle size={32} />
         </div>
      </div>

      {/* PORTAL 2: The Production Portal (الكتابة والإنتاج) */}
      <section className="py-24 bg-slate-50 relative">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-20 border-r-8 border-blue-900 pr-10">
               <div className="w-20 h-20 bg-blue-50 text-blue-900 rounded-3xl flex items-center justify-center shadow-sm shrink-0">
                  <BrainCircuit size={40} />
               </div>
               <div>
                  <h2 className="text-4xl font-black text-slate-900 academic-font mb-2">بوابة الإنتاج الأكاديمي (الكتابة)</h2>
                  <p className="text-lg text-slate-500 font-medium trendy-font">المرحلة الثانية: تحويل المعرفة إلى إنتاج علمي رصين ومحكم</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
               <Link to="/writing-bank" className="lg:col-span-7 lg:order-2 group relative p-12 md:p-20 rounded-[4rem] bg-blue-50 text-slate-900 overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.01] border border-blue-100">
                  <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
                     <div className="academic-font text-[400px] text-blue-900 absolute -top-20 -right-20">ض</div>
                  </div>
                  <div className="relative z-10">
                     <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-10 group-hover:-rotate-6 transition-all text-blue-600 shadow-sm">
                        <ScrollText size={40} />
                     </div>
                     <h3 className="text-5xl font-black mb-6 academic-font">بنك الكتابة العلمية</h3>
                     <p className="text-slate-600 text-2xl leading-relaxed mb-12 max-w-xl font-medium academic-font">
                        دليل لغوي بحثي يقدم نماذج واقعية للكتابة الأكاديمية العربية، مستخلصة من مدونات لغوية (Corpus Linguistics) ومبنية على ما يكتبه الباحثون فعليًا، لا نصوص مولّدة اصطناعيًا.
                     </p>
                     <div className="inline-flex items-center gap-4 text-blue-600 font-black text-xs uppercase tracking-widest trendy-font">
                        ابدأ صياغة بحثك <ChevronLeft size={20} />
                     </div>
                  </div>
               </Link>

               <div className="lg:col-span-5 lg:order-1 grid grid-cols-1 gap-8">
                  <Link to="/paraphraser" className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all group flex items-start gap-8">
                     <div className="w-16 h-16 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-md shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Wand2 size={28} />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black text-slate-900 academic-font mb-2">مساعد الصياغة الذكي</h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed trendy-font font-medium">إعادة صياغة المسودات بأسلوب أكاديمي رصين وموضوعي.</p>
                     </div>
                  </Link>

                  <Link to="/stylistic-auditor" className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all group flex items-start gap-8">
                     <div className="w-16 h-16 bg-slate-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-md shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <Scale size={28} />
                     </div>
                     <div>
                        <h4 className="text-2xl font-black text-slate-900 academic-font mb-2">ميزان الصياغة الأكاديمية</h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed trendy-font font-medium">تقييم موضوعية ورسمية النص البحثي واكتشاف مواطن الضعف الأسلوبي.</p>
                     </div>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Testimonials Section - Animated Marquee */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-50 text-blue-600 mb-6 border border-blue-100">
            <Sparkles size={18} />
            <span className="text-sm font-black trendy-font uppercase tracking-widest">أصداء من المجتمع الأكاديمي</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 academic-font mb-6 tracking-tight">ماذا يقول الباحثون عنا؟</h2>
          <p className="text-xl text-slate-500 font-medium trendy-font max-w-2xl mx-auto leading-relaxed">ثقة متبادلة مع أكثر من 5000 طالب وباحث وأستاذ جامعي في الوطن العربي</p>
        </div>

        <div className="relative flex overflow-x-hidden" dir="ltr">
          <div className="py-12 marquee-container">
            {/* First set of testimonials */}
            {testimonials.map((review, index) => (
              <div key={`rev-1-${index}`} className="inline-block w-[400px] bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 mx-4 text-right shrink-0" dir="rtl">
                <div className="flex items-center justify-end gap-4 mb-6">
                  <div className="text-right">
                    <h4 className="text-lg font-black text-slate-900 academic-font">{review.name}</h4>
                    <p className="text-xs text-blue-600 font-bold trendy-font uppercase tracking-wider">{review.role}</p>
                  </div>
                  <img src={review.img} alt={review.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-50 shadow-sm" referrerPolicy="no-referrer" />
                </div>
                <p className="text-lg text-slate-600 leading-relaxed academic-font italic">"{review.content}"</p>
                <div className="mt-6 flex justify-end">
                  <Quote size={20} className="text-slate-100" />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {testimonials.map((review, index) => (
              <div key={`rev-2-${index}`} className="inline-block w-[400px] bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 mx-4 text-right shrink-0" aria-hidden="true" dir="rtl">
                <div className="flex items-center justify-end gap-4 mb-6">
                  <div className="text-right">
                    <h4 className="text-lg font-black text-slate-900 academic-font">{review.name}</h4>
                    <p className="text-xs text-blue-600 font-bold trendy-font uppercase tracking-wider">{review.role}</p>
                  </div>
                  <img src={review.img} alt={review.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-50 shadow-sm" referrerPolicy="no-referrer" />
                </div>
                <p className="text-lg text-slate-600 leading-relaxed academic-font italic">"{review.content}"</p>
                <div className="mt-6 flex justify-end">
                  <Quote size={20} className="text-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

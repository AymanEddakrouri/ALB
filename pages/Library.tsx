import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Filter, Download, ExternalLink, Sparkles, ChevronLeft, Info, ShieldCheck, Heart, X, Eye, Lock, Printer, Share2, User, ChevronRight, Maximize2, Minimize2, Globe, RotateCcw, ArrowUpDown, FileText, Send, CheckCircle2, ChevronDown, ClipboardCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  year: string;
  cover: string;
  description?: string;
  pages?: number;
  content?: {
    title: string;
    pages: string[];
  };
}

const Library: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);

  const normalizeArabic = (text: string) => {
    return text
      .replace(/[أإآا]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[\u064B-\u0652]/g, ''); // Remove Tashkeel
  };

  const [isPublishingOpen, setIsPublishingOpen] = useState(false);

  const initialBooks: Book[] = [
    { 
      id: 1, 
      title: 'القراءة والكتابة لطلاب الجامعات', 
      author: 'د. أيمن الدكروري، د. أماني رمضان، د. ليزا موريسن', 
      category: 'مهارات أكاديمية', 
      year: '2026', 
      cover: 'https://picsum.photos/seed/academic-reading/600/900',
      description: 'الجزء الأول (من الأدبية إلى العلمية). كتاب منهجي شامل يهدف إلى تطوير مهارات القراءة الاستيعابية والكتابة الأكاديمية الرصينة لطلاب المرحلة الجامعية، مع التركيز على البنى اللغوية السليمة.',
      pages: 146,
      content: {
        title: 'القراءة والكتابة لطلاب الجامعات',
        pages: [
          'الوحدة الأولى: لُغَتي هُوِيَّتي',
          'الفصحى والعامية بين الفكرة والأسلوب - بقلم: خالص عزمي',
          'طريقة الإجابة عن أسئلة الفهم: حدد وظيفة أداة الاستفهام المستخدمة في السؤال...',
          'قواعد الكتابة السليمة: الهمزة (أولية، متوسطة، متطرفة)',
          'النحو: أنواع الكلمة (اسم، فعل، حرف)',
          'الوحدة الثانية: أُحِبُّ مَدْرَسَتي أُحِبُّ جامِعَتي',
          'أولى المدارس الإسلامية - ميرنا قره / سورية',
          'المعنى اللغوي: معنى سياقي ومعنى معجمي',
          'قواعد الكتابة السليمة: التاء المربوطة والهاء المربوطة والتاء المفتوحة',
          'الوحدة الثالثة: التكنولوجيا المستقبل',
          'تكنولوجيا ثقافية - إعداد: تسنيم ذيب / الأردن',
          'قواعد الكتابة السليمة: علامات الترقيم (النقطة، الفاصلة، المنقوطة، الرأسيان...)',
        ]
      }
    },
    { 
      id: 4, 
      title: 'تلاقي الأدب العربي والذكاء الاصطناعي في عالم الكلمة', 
      author: 'د. أيمن الدكروري', 
      category: 'لسانيات حاسوبية', 
      year: '2025', 
      cover: 'https://picsum.photos/seed/ai-literature/600/900',
      description: 'دراسة رائدة تستكشف آفاق التفاعل بين المنجز الأدبي العربي وتقنيات الذكاء الاصطناعي، وكيف يمكن للآلة أن تساهم في تحليل ونقد وإنتاج النص الأدبي.',
      pages: 280,
      content: {
        title: 'تلاقي الأدب العربي والذكاء الاصطناعي',
        pages: [
          'مقدمة: عصر الكلمة الرقمية',
          'الفصل الأول: الذكاء الاصطناعي وفلسفة اللغة',
          'الفصل الثاني: تحليل النصوص الأدبية آلياً',
          'الفصل الثالث: مستقبل الإبداع البشري في ظل الخوارزميات',
          'خاتمة: نحو أدب رقمي عربي رصين',
        ]
      }
    },
    { 
      id: 2, 
      title: 'المعجم الوجيز في المصطلحات اللسانية', 
      author: 'د. محمد رشاد الحمزاوي', 
      category: 'معاجم', 
      year: '2018', 
      cover: 'https://picsum.photos/seed/dictionary-cover/600/900',
      description: 'معجم متخصص يجمع أهم المصطلحات اللسانية الحديثة مع شرح دقيق لمفاهيمها وتطورها في الفكر اللساني المعاصر، ويعد مرجعاً أساسياً للباحثين في علوم اللغة.',
      pages: 215,
      content: {
        title: 'المعجم الوجيز في المصطلحات اللسانية',
        pages: [
          'مقدمة المعجم: أهمية المصطلح في الدراسات اللسانية الحديثة',
          'حرف الألف: إبستيمولوجيا، إحالة، إدراك، استبدال...',
          'حرف الباء: بنية، بنيوية، بلاغة، بيان...',
          'حرف التاء: توليد، تحويل، تركيب، تواصل...',
          'حرف الجيم: جملة، جرس، جذر، جينولوجيا اللسان...',
          'خاتمة المعجم: نحو توحيد المصطلح اللساني العربي',
        ]
      }
    },
    { 
      id: 3, 
      title: 'اللسانيات واللغة العربية', 
      author: 'د. عبد القادر الفاسي الفهري', 
      category: 'لسانيات', 
      year: '2019', 
      cover: 'https://picsum.photos/seed/arabic-ling/600/900',
      description: 'دراسة لسانية معمقة تتناول خصائص اللغة العربية في ضوء النظريات اللسانية الحديثة، مع التركيز على البنى التركيبية والصرفية.',
      pages: 450
    },
    { 
      id: 5, 
      title: 'لسانيات النص: مدخل إلى انسجام الخطاب', 
      author: 'د. محمد خطابي', 
      category: 'لسانيات', 
      year: '2020', 
      cover: 'https://picsum.photos/seed/text-ling/600/900',
      description: 'كتاب يتناول آليات اتساق وانسجام النص العربي، وكيفية تحليل الخطاب من منظور لساني حديث.',
      pages: 320
    },
    { 
      id: 6, 
      title: 'في اللسانيات العربية المعاصرة', 
      author: 'د. مازن الوعر', 
      category: 'لسانيات', 
      year: '2017', 
      cover: 'https://picsum.photos/seed/modern-arabic/600/900',
      description: 'دراسات في الفكر اللساني العربي المعاصر ومحاولات التوفيق بين التراث اللغوي والنظريات الحديثة.',
      pages: 290
    },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoadingBooks(true);
      try {
        const { data, error } = await supabase
          .from('books')
          .select('*');
        
        if (error) throw error;
        if (data && data.length > 0) {
          setBooks(data);
        } else {
          setBooks(initialBooks);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks(initialBooks);
      } finally {
        setIsLoadingBooks(false);
      }
    };

    fetchBooks();
  }, []);

  // Protection logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isReading) {
        // Disable Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+U, Ctrl+Shift+I
        if (e.ctrlKey && (['c', 'p', 's', 'u'].includes(e.key.toLowerCase()))) {
          e.preventDefault();
        }
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
          e.preventDefault();
        }
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (isReading) e.preventDefault();
    };

    if (isReading) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('contextmenu', handleContextMenu);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.body.style.overflow = 'auto';
    };
  }, [isReading]);

  return (
    <div className="min-h-screen bg-white">
      {/* Anti-Print CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { display: none !important; }
        }
        .no-select {
          user-select: none;
          -webkit-user-select: none;
        }
      `}} />

      {/* Hero Banner */}
      <section className="relative pt-20 pb-32 overflow-hidden">
         <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/50 to-white"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/10 rounded-full blur-3xl"></div>
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
               <div className="max-w-2xl text-right">
                  <div className="floating-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600/10 border border-emerald-600/20 mb-6 backdrop-blur-md">
                     <Sparkles size={14} className="text-emerald-600" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 trendy-font">مستودع المعرفة اللسانية المفتوح</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black academic-font mb-6 leading-tight text-emerald-950">المكتبة اللسانية</h1>
                  <p className="text-emerald-900/70 text-lg leading-relaxed academic-font italic">
                    بوابة رقمية مخصصة لأمهات الكتب والدراسات اللسانية المعاصرة، تهدف لتمكين الباحث العربي من الوصول إلى أدوات المعرفة الرصينة.
                  </p>
               </div>
               <div className="w-full max-w-md">
                  <div className="relative">
                     <input 
                        type="text" 
                        placeholder="ابحث في رفوف المكتبة..." 
                        className="w-full px-8 py-6 bg-white border-2 border-emerald-100 rounded-3xl text-lg focus:outline-none focus:border-emerald-500 transition-all shadow-xl text-right pr-16 academic-font"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                     />
                     <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-600/40" size={24} />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-7xl mx-auto px-4">
         {/* Horizontal Filter Bar */}
         <div className="mb-12 bg-white rounded-[2rem] shadow-sm border border-slate-100 p-4 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-grow">
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-500 text-sm font-bold academic-font shrink-0">
                  <Filter size={16} /> تصفية حسب:
               </div>
               <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:outline-none focus:border-emerald-500 academic-font">
                  <option>جميع التخصصات</option>
                  <option>لسانيات</option>
                  <option>معاجم</option>
                  <option>لسانيات حاسوبية</option>
               </select>
               <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 focus:outline-none focus:border-emerald-500 academic-font">
                  <option>كافة الأعوام</option>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2019</option>
                  <option>2018</option>
               </select>
            </div>

            <div className="flex items-center gap-4">
               <div className="h-8 w-px bg-slate-100 hidden md:block" />
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-500 text-sm font-bold academic-font shrink-0">
                  <ArrowUpDown size={16} /> ترتيب حسب:
               </div>
               <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button className="px-4 py-1.5 rounded-lg text-xs font-black bg-emerald-600 text-white shadow-sm transition-all">الأحدث</button>
                  <button className="px-4 py-1.5 rounded-lg text-xs font-black text-slate-500 hover:text-emerald-600 transition-all">العنوان</button>
                  <button className="px-4 py-1.5 rounded-lg text-xs font-black text-slate-500 hover:text-emerald-600 transition-all">المؤلف</button>
               </div>
               <button className="p-2 text-slate-400 hover:text-emerald-600 transition-all">
                  <RotateCcw size={20} />
               </button>
            </div>
         </div>

         <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters (Hidden on large screens if horizontal bar is preferred, but keeping for layout) */}
            <aside className="w-full lg:w-72 shrink-0 hidden lg:block">
               <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 sticky top-24">
                  <h3 className="text-xl font-black mb-8 flex items-center gap-3 academic-font">
                     <Filter size={20} className="text-emerald-600" /> تصنيف الكتب
                  </h3>
                  <div className="space-y-4">
                     {['الكل', 'لسانيات', 'معاجم', 'مهارات أكاديمية', 'أدب ونقد'].map((cat) => (
                        <button 
                           key={cat} 
                           onClick={() => setActiveCategory(cat)}
                           className={`w-full text-right px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                              activeCategory === cat 
                              ? 'bg-white shadow-sm text-emerald-600' 
                              : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-emerald-600'
                           }`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>
               </div>
            </aside>

            {/* Book Grid */}
            <div className="flex-grow">
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                  {books.filter(book => {
                     const normalizedQuery = normalizeArabic(searchQuery.toLowerCase());
                     const matchesSearch = normalizeArabic(book.title.toLowerCase()).includes(normalizedQuery) || 
                                         normalizeArabic(book.author.toLowerCase()).includes(normalizedQuery);
                     const matchesCategory = activeCategory === 'الكل' || book.category === activeCategory;
                     return matchesSearch && matchesCategory;
                  }).map((book) => (
                     <motion.div 
                        key={book.id}
                        whileHover={{ y: -12 }}
                        onClick={() => setSelectedBook(book)}
                        className="group relative aspect-[3/4.5] rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500 cursor-pointer border-4 border-white"
                     >
                        {/* Background Cover */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                          style={{ backgroundImage: `url(${book.cover})` }}
                        />
                        
                        {/* Darker Gradient for Text Visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        
                        {/* Card Content */}
                        <div className="absolute inset-0 p-10 flex flex-col justify-end text-right">
                           <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-[9px] font-black rounded-full mb-4 uppercase tracking-widest">{book.category}</span>
                              <h4 className="text-2xl font-black text-white mb-3 academic-font leading-tight drop-shadow-2xl">{book.title}</h4>
                              <p className="text-emerald-100/70 text-sm mb-6 font-medium academic-font line-clamp-1">{book.author}</p>
                           </div>
                           
                           <div className="flex justify-between items-center pt-6 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                              <div className="flex items-center gap-2 text-emerald-400 text-xs font-black trendy-font">
                                 <Eye size={14} />
                                 <span>عرض التفاصيل</span>
                              </div>
                              <span className="text-xs font-bold text-white/40 trendy-font">{book.year}</span>
                           </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 backdrop-blur-md rounded-bl-[4rem] flex items-center justify-center translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-0 transition-all duration-500">
                           <BookOpen size={24} className="text-white/50" />
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Book Details Modal */}
      <AnimatePresence>
        {selectedBook && !isReading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-emerald-950/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-white rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedBook(null)}
                className="absolute top-8 left-8 z-10 p-4 bg-slate-100 text-slate-500 rounded-full hover:bg-emerald-600 hover:text-white transition-all shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-2/5 bg-slate-50 p-12 flex flex-col items-center justify-center border-l border-slate-100">
                 <div className="relative group mb-10">
                    <img src={selectedBook.cover} alt={selectedBook.title} className="w-64 md:w-80 aspect-[3/4] object-cover rounded-3xl shadow-2xl" />
                 </div>
                 <div className="space-y-6 w-full max-w-xs text-right">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-right">
                       <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                          <Lock size={18} />
                       </div>
                       <p className="text-[11px] font-bold text-slate-500 academic-font leading-relaxed">هذا المحتوى محمي؛ النسخ والطباعة والمشاركة غير متاحة.</p>
                    </div>
                 </div>
              </div>

              <div className="flex-grow p-12 md:p-20 overflow-y-auto custom-scrollbar text-right">
                 <div className="mb-12">
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 block trendy-font">{selectedBook.category}</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 academic-font leading-tight">{selectedBook.title}</h2>
                    <div className="flex items-center gap-6 text-slate-500 font-bold academic-font">
                       <span className="flex items-center gap-2"><User size={16} className="text-emerald-600" /> {selectedBook.author}</span>
                       <span className="flex items-center gap-2"><BookOpen size={16} className="text-emerald-600" /> {selectedBook.pages} صفحة</span>
                    </div>
                 </div>

                 <div className="prose prose-lg max-w-none text-slate-600 academic-font leading-loose mb-16">
                    <h3 className="text-2xl font-black text-slate-900 mb-6">نبذة عن الكتاب</h3>
                    <p className="text-xl mb-10">{selectedBook.description}</p>
                    
                    <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 relative overflow-hidden">
                       <h4 className="text-xl font-black text-emerald-900 mb-6 flex items-center gap-3">
                          <Eye size={20} /> معاينة المحتوى البحثي
                       </h4>
                       <p className="text-emerald-800/70 leading-relaxed italic mb-8">
                          "إن عملية القراءة الأكاديمية لا تقتصر على فك الرموز، بل هي عملية تفاعلية تهدف إلى استخلاص المعاني وبناء المعرفة..."
                       </p>
                       <button 
                         onClick={() => setIsReading(true)}
                         className="px-10 py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl flex items-center gap-3 mr-auto"
                       >
                          بدء القراءة الآمنة <ChevronLeft size={20} />
                       </button>
                    </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Protected Reader View */}
      <AnimatePresence>
        {isReading && selectedBook && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200] bg-slate-100 flex flex-col no-select"
          >
            {/* Reader Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
               <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setIsReading(false)}
                    className="p-3 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-emerald-600"
                  >
                    <X size={24} />
                  </button>
                  <div className="h-8 w-px bg-slate-200" />
                  <div className="text-right">
                     <h3 className="text-sm font-black text-slate-900 academic-font">{selectedBook.title}</h3>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Safe Reading Mode</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                     <ShieldCheck size={14} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Protected</span>
                  </div>
               </div>
            </header>

            {/* Reader Content */}
            <main className="flex-grow overflow-y-auto p-8 md:p-20 flex justify-center bg-slate-200/50 custom-scrollbar">
               <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-12 md:p-24 min-h-[1200px] relative">
                  <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none flex items-center justify-center">
                     <span className="academic-font text-[400px] rotate-12">بنك اللغة</span>
                  </div>
                  
                  <div className="relative z-10 text-right">
                     <div className="mb-20 pb-10 border-b border-slate-100 flex justify-between items-end">
                        <span className="text-slate-300 font-bold academic-font">صفحة {currentPage + 1}</span>
                        <div className="text-emerald-600/20"><BookOpen size={40} /></div>
                     </div>

                     <div className="prose prose-2xl max-w-none text-slate-800 academic-font leading-[2.5]">
                        {selectedBook.content ? (
                          <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                          >
                            <h2 className="text-4xl font-black text-emerald-900 mb-12">{selectedBook.content.pages[currentPage] || 'نهاية العرض المتاح'}</h2>
                            <div className="space-y-8 text-xl text-slate-600 leading-relaxed">
                               <p>تعد مهارات القراءة والكتابة حجر الزاوية في التكوين المعرفي للطالب الجامعي، حيث تمثل الأدوات الأساسية التي تمكنه من استيعاب المادة العلمية والتعبير عن أفكاره بوضوح ومنهجية.</p>
                               <p>في هذا الجزء، نركز على الانتقال من الأسلوب الأدبي الإنشائي إلى الأسلوب العلمي الرصين الذي يتسم بالموضوعية والدقة والبعد عن العواطف الذاتية.</p>
                               <div className="p-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-right italic text-slate-400">
                                  يتم هنا عرض محتوى الصفحة الفعلي من الكتاب المرفق...
                               </div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="text-right py-40 text-slate-300">
                             <Lock size={80} className="mr-auto mb-8 opacity-20" />
                             <p className="text-2xl font-black">المحتوى قيد المعايرة الأمنية</p>
                          </div>
                        )}
                     </div>
                  </div>
               </div>
            </main>

            {/* Reader Footer Controls */}
            <footer className="bg-white border-t border-slate-200 px-8 py-6 flex justify-between items-center">
               <div className="flex gap-4">
                  <button 
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-30 flex items-center gap-2"
                  >
                    <ChevronRight size={20} /> الصفحة السابقة
                  </button>
                  <button 
                    disabled={!selectedBook.content || currentPage === selectedBook.content.pages.length - 1}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all disabled:opacity-30 flex items-center gap-2"
                  >
                    الصفحة التالية <ChevronLeft size={20} />
                  </button>
               </div>
               
               <div className="hidden md:flex items-center gap-6 text-slate-400 text-xs font-bold academic-font">
                  <span className="flex items-center gap-2"><Lock size={14} /> النسخ والطباعة معطلة</span>
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                  <span>جميع الحقوق محفوظة © {selectedBook.year}</span>
               </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Cards Section */}
      <section className="py-20 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-end text-right group hover:shadow-xl transition-all">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe size={32} />
               </div>
               <h3 className="text-2xl font-black mb-4 academic-font">الوصول المفتوح (Open Access)</h3>
               <p className="text-slate-500 leading-relaxed academic-font text-sm">نؤمن بحق كل باحث في الوصول للمعرفة اللسانية دون عوائق مادية، ملتزمين بتوفير المحتوى العلمي مجاناً لدعم حركة البحث العربي.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-end text-right group hover:shadow-xl transition-all">
               <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
               </div>
               <h3 className="text-2xl font-black mb-4 academic-font">بيئة قراءة آمنة</h3>
               <p className="text-slate-500 leading-relaxed academic-font text-sm">نضمن لك تجربة قراءة خالية من الإعلانات المزعجة أو الروابط الضارة، مع التركيز الكامل على المادة العلمية.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <Info size={40} className="mb-6 text-emerald-600" />
               <h3 className="text-2xl font-black mb-4 academic-font">حقوق الملكية</h3>
               <p className="text-slate-500 leading-relaxed academic-font text-sm">نلتزم تماماً بحقوق الملكية الفكرية؛ جميع الكتب المتاحة إما برخصة المشاع الإبداعي أو بإذن خاص من المؤلفين.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <Heart size={40} className="mb-6 text-emerald-600" />
               <h3 className="text-2xl font-black mb-4 academic-font">مبادرة تطوعية</h3>
               <p className="text-slate-500 leading-relaxed academic-font text-sm">هذا المشروع جهد تطوعي خالص لخدمة لغة الضاد والباحثين العرب، ولا يهدف لأي ربح مادي.</p>
            </div>
         </div>
      </section>

      {/* Scientific Publishing Section */}
      <section id="publishing-section" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-right mb-16">
               <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mr-auto mb-6">
                  <CheckCircle2 size={32} />
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 academic-font">النشر العلمي في المكتبة اللسانية</h2>
               <p className="max-w-3xl ml-auto text-slate-500 text-lg leading-relaxed academic-font">
                  المكتبة اللسانية مبادرة علمية غير ربحية تهدف إلى دعم البحث العلمي العربي، من خلال نشر الدراسات والكتب اللسانية وفق أسس علمية ومعايير أكاديمية واضحة.
               </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
               {/* Accordion Item */}
               <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setIsPublishingOpen(!isPublishingOpen)}
                    className="w-full px-10 py-8 flex items-center justify-between text-right group hover:bg-slate-50 transition-all"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                           <FileText size={20} />
                        </div>
                        <span className="text-xl font-black text-slate-900 academic-font">أنواع الأعمال المقبولة للنشر</span>
                     </div>
                     <ChevronDown size={24} className={`text-slate-300 group-hover:text-emerald-600 transition-all ${isPublishingOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                     {isPublishingOpen && (
                       <motion.div 
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="px-10 pb-8 border-t border-slate-50"
                       >
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
                             {[
                               'كتب علمية أصلية',
                               'كتب مطبوعة بإذن',
                               'رسائل علمية غير منشورة',
                               'دراسات معاد تصميمها في صورة كتب',
                               'إصدارات علمية منشورة رقميًا'
                             ].map((item, i) => (
                               <li key={i} className="flex flex-row-reverse items-center gap-3 text-right">
                                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                  <span className="text-slate-700 font-bold academic-font">{item}</span>
                                </li>
                             ))}
                          </ul>
                          <div className="mt-8 pt-8 border-t border-slate-50 flex justify-end">
                             <Link to="/publish-with-us" className="text-emerald-600 font-black text-sm hover:underline flex items-center gap-2">
                                عرض سياسة النشر كاملة <ChevronLeft size={16} />
                             </Link>
                          </div>
                       </motion.div>
                     )}
                  </AnimatePresence>
               </div>

               {/* Dark Info Card */}
               <div className="bg-emerald-950 rounded-[3.5rem] p-12 md:p-16 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                     <div className="text-right">
                        <h3 className="text-2xl font-black mb-8 flex items-center gap-3 justify-end">
                           الحقوق والملكية الفكرية <ShieldCheck className="text-emerald-400" />
                        </h3>
                        <ul className="space-y-4 text-emerald-100/70 font-bold academic-font">
                           <li className="flex items-center gap-3 justify-end">إتاحة مفتوحة للوصول العلمي <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /></li>
                           <li className="flex items-center gap-3 justify-end">عدم إتاحة التحميل أو النسخ الكامل <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /></li>
                           <li className="flex items-center gap-3 justify-end">الحفاظ الكامل على حقوق المؤلف والناشر <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /></li>
                           <li className="flex items-center gap-3 justify-end">توثيق ببليوجرافي دقيق <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /></li>
                        </ul>
                     </div>

                     <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10 text-right">
                        <h3 className="text-2xl font-black mb-6 flex items-center gap-3 justify-end">
                           آلية التقديم للنشر <RotateCcw className="text-emerald-400" />
                        </h3>
                        <p className="text-emerald-100/60 mb-10 leading-relaxed font-bold academic-font">
                           يتم التقديم من خلال نموذج علمي منظم يشمل بيانات الكتاب والمؤلف، وإقرار الأصالة، والموافقة على سياسة النشر.
                        </p>
                        <Link to="/request-publication" className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3">
                           طلب نشر عمل علمي <Send size={20} />
                        </Link>
                        <Link to="/publish-policy?openModal=true" className="w-full mt-4 py-4 bg-white text-emerald-600 border-2 border-emerald-100 font-black rounded-2xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-3 academic-font">
                           نموذج التقييم للنشر <ClipboardCheck size={20} />
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Library;

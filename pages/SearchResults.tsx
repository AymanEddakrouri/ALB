import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, BookOpen, PenTool, ChevronLeft, Sparkles, Wand2, Scale, Info } from 'lucide-react';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState<any[]>([]);

  const normalizeArabic = (text: string) => {
    return text
      .replace(/[أإآا]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[\u064B-\u0652]/g, ''); // Remove Tashkeel
  };

  const siteContent = [
    { title: 'المكتبة اللسانية', path: '/library', icon: BookOpen, tags: ['كتب', 'معاجم', 'لسانيات', 'قراءة', 'أيمن الدكروري', 'أماني رمضان', 'ليزا موريسن', 'محمد رشاد الحمزاوي', 'عبد القادر الفاسي الفهري'] },
    { title: 'بنك الكتابة العلمية', path: '/writing-bank', icon: PenTool, tags: ['كتابة', 'تراكيب', 'أبحاث', 'صياغة', 'أكاديمي', 'بحث علمي', 'عبارات'] },
    { title: 'مساعد الصياغة الذكي', path: '/paraphraser', icon: Wand2, tags: ['ذكاء اصطناعي', 'صياغة', 'أكاديمي', 'إعادة كتابة', 'تحسين النص'] },
    { title: 'ميزان الصياغة الأكاديمية', path: '/stylistic-auditor', icon: Scale, tags: ['تدقيق', 'أسلوب', 'موضوعية', 'مراجعة', 'نقد'] },
    { title: 'المحلل اللساني المعمق', path: '/nlp-tool', icon: Sparkles, tags: ['تحليل', 'صرف', 'نحو', 'لسانيات', 'معالجة اللغات الطبيعية'] },
    { title: 'مهندس الاستشهادات المرجعية', path: '/citations', icon: Search, tags: ['توثيق', 'مراجع', 'APA', 'MLA', 'اقتباس'] },
    { title: 'عن المبادرة', path: '/about', icon: Info, tags: ['من نحن', 'أهداف', 'فريق العمل', 'تواصل'] },
  ];

  useEffect(() => {
    if (query) {
      const normalizedQuery = normalizeArabic(query.toLowerCase());
      const filtered = siteContent.filter(item => 
        normalizeArabic(item.title.toLowerCase()).includes(normalizedQuery) || 
        item.tags.some(tag => normalizeArabic(tag.toLowerCase()).includes(normalizedQuery))
      );
      setResults(filtered);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-4xl ml-auto px-4 text-right">
         <div className="mb-16">
            <div className="floating-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 mb-8">
               <Search size={16} className="text-blue-600" />
               <span className="text-xs font-black text-blue-800 trendy-font uppercase tracking-widest">نتائج البحث</span>
            </div>
            <h1 className="text-4xl font-black academic-font mb-4">نتائج البحث عن: <span className="text-blue-600">"{query}"</span></h1>
            <p className="text-slate-500 font-medium trendy-font">تم العثور على {results.length} نتيجة تطابق بحثك.</p>
         </div>
         
         {results.length > 0 ? (
           <div className="grid grid-cols-1 gap-6">
             {results.map((result, i) => (
               <Link key={i} to={result.path} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all flex items-center gap-8 group">
                 <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                   <result.icon size={28} />
                 </div>
                 <div className="flex-grow text-right">
                   <h3 className="text-2xl font-black academic-font text-slate-900 mb-2">{result.title}</h3>
                   <div className="flex gap-2">
                     {result.tags.map((tag: string, j: number) => (
                       <span key={j} className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{tag}</span>
                     ))}
                   </div>
                 </div>
                 <ChevronLeft size={24} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
               </Link>
             ))}
           </div>
         ) : (
           <div className="p-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-right">
              <Search size={80} className="mr-auto mb-8 text-slate-200" />
              <h2 className="text-2xl font-black academic-font mb-4 text-slate-400">لا توجد نتائج</h2>
              <p className="text-slate-400 academic-font">حاول البحث بكلمات مفتاحية أخرى مثل "كتب"، "صياغة"، أو "تحليل".</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default SearchResults;

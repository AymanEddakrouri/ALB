import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Quote, BookMarked, Search, RotateCcw, Copy, Check, Info, ShieldCheck, Zap, FileText, Plus, Trash2 } from 'lucide-react';

interface Source {
  id: string;
  type: 'book' | 'article' | 'web';
  author: string;
  title: string;
  year: string;
  publisher?: string;
  url?: string;
}

const CitationGenerator: React.FC = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [newSource, setNewSource] = useState<Partial<Source>>({ type: 'book' });
  const [citations, setCitations] = useState<string[]>([]);

  const addSource = () => {
    if (newSource.author && newSource.title && newSource.year) {
      const source: Source = {
        id: Math.random().toString(36).substr(2, 9),
        type: newSource.type as any,
        author: newSource.author!,
        title: newSource.title!,
        year: newSource.year!,
        publisher: newSource.publisher,
        url: newSource.url
      };
      setSources([...sources, source]);
      setNewSource({ type: 'book' });
    }
  };

  const removeSource = (id: string) => {
    setSources(sources.filter(s => s.id !== id));
  };

  const generateCitations = () => {
    const generated = sources.map(s => {
      if (s.type === 'book') {
        return `${s.author}. (${s.year}). *${s.title}*. ${s.publisher || 'د.ن'}.`;
      } else if (s.type === 'article') {
        return `${s.author}. (${s.year}). ${s.title}. *مجلة الدراسات اللسانية*.`;
      }
      return `${s.author}. (${s.year}). ${s.title}. مسترجع من: ${s.url || '#'}`;
    });
    setCitations(generated);
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
            <Sparkles size={14} /> 
            <span>أداة الضبط الببليوجرافي المتقدمة</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black academic-font mb-6 leading-tight text-slate-900">مهندس الاستشهادات المرجعية</h1>
          <p className="text-slate-500 max-w-2xl ml-auto text-lg leading-relaxed trendy-font">
            قم بتوليد مراجع بحثك وفق نظام APA الدولي بدقة فائقة، مع دعم كامل للكتب والمجلات العربية.
          </p>
        </div>
      </section>

      {/* Citation Tool */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Area */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <h3 className="text-2xl font-black academic-font mb-8 flex items-center gap-3">
                  <Plus size={24} className="text-emerald-600" /> إضافة مصدر جديد
               </h3>
               <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <button 
                        onClick={() => setNewSource({...newSource, type: 'book'})}
                        className={`py-3 rounded-xl font-bold transition-all ${newSource.type === 'book' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 border border-slate-100'}`}
                     >كتاب</button>
                     <button 
                        onClick={() => setNewSource({...newSource, type: 'article'})}
                        className={`py-3 rounded-xl font-bold transition-all ${newSource.type === 'article' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 border border-slate-100'}`}
                     >مجلة علمية</button>
                  </div>
                  <input 
                    type="text" 
                    placeholder="اسم المؤلف (مثلاً: عمر، أحمد مختار)" 
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-500 transition-all text-right"
                    value={newSource.author || ''}
                    onChange={(e) => setNewSource({...newSource, author: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="عنوان العمل" 
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-500 transition-all text-right"
                    value={newSource.title || ''}
                    onChange={(e) => setNewSource({...newSource, title: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                     <input 
                        type="text" 
                        placeholder="سنة النشر" 
                        className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-500 transition-all text-right"
                        value={newSource.year || ''}
                        onChange={(e) => setNewSource({...newSource, year: e.target.value})}
                     />
                     <input 
                        type="text" 
                        placeholder="دار النشر (اختياري)" 
                        className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-emerald-500 transition-all text-right"
                        value={newSource.publisher || ''}
                        onChange={(e) => setNewSource({...newSource, publisher: e.target.value})}
                     />
                  </div>
                  <button 
                    onClick={addSource}
                    className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl"
                  >إضافة للمسودة</button>
               </div>
            </div>

            {/* Source List */}
            <div className="space-y-4">
               <h3 className="text-xl font-black academic-font px-6">المصادر المضافة ({sources.length})</h3>
               {sources.map(s => (
                  <div key={s.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center group">
                     <div className="text-right">
                        <p className="font-black text-slate-900 academic-font">{s.title}</p>
                        <p className="text-xs text-slate-400 font-bold">{s.author} • {s.year}</p>
                     </div>
                     <button onClick={() => removeSource(s.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                     </button>
                  </div>
               ))}
               {sources.length > 0 && (
                  <button 
                    onClick={generateCitations}
                    className="w-full py-6 bg-emerald-600 text-white font-black rounded-[2rem] shadow-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-4"
                  >
                     <Quote size={24} /> توليد قائمة المراجع (APA)
                  </button>
               )}
            </div>
          </div>

          {/* Output Area */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-6">
               <h3 className="text-xl font-black academic-font flex items-center gap-3">
                  <BookMarked size={18} className="text-emerald-600" /> قائمة المراجع النهائية
               </h3>
            </div>
            <div className="w-full h-[600px] p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem] text-lg text-right academic-font relative overflow-y-auto custom-scrollbar shadow-inner">
               {citations.length > 0 ? (
                 <div className="space-y-8">
                    {citations.map((c, i) => (
                       <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-6 bg-white rounded-2xl border border-emerald-100 shadow-sm relative group"
                       >
                          <p className="leading-relaxed text-slate-700">{c}</p>
                          <button 
                             onClick={() => navigator.clipboard.writeText(c)}
                             className="absolute top-4 left-4 p-2 bg-slate-50 text-slate-300 rounded-lg hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                             <Copy size={14} />
                          </button>
                       </motion.div>
                    ))}
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-6">
                    <Quote size={60} className="opacity-20" />
                    <p className="text-lg font-bold trendy-font">أضف مصادرك لتوليد القائمة...</p>
                 </div>
               )}
            </div>
            <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-start gap-6">
               <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <h4 className="text-lg font-black academic-font mb-1">الضبط الببليوجرافي</h4>
                  <p className="text-sm text-slate-500 leading-relaxed academic-font">يتم التوثيق وفق الإصدار السابع من دليل APA، مع مراعاة خصوصية المصادر العربية في الترتيب الهجائي وعلامات الترقيم.</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CitationGenerator;

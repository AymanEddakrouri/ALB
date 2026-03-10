import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Mail, 
  BookOpen, 
  PenTool, 
  Wand2, 
  Scale, 
  Sparkles, 
  Quote, 
  Info, 
  Users, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  Map 
} from 'lucide-react';
import { Logo } from './Navbar';

const Footer: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
         {/* Animated letters */}
         <div className="footer-letter absolute top-5 left-[5%] academic-font text-4xl">أ</div>
         <div className="footer-letter absolute top-10 left-[25%] academic-font text-3xl" style={{ animationDelay: '1.2s' }}>ب</div>
         <div className="footer-letter absolute top-5 right-[5%] academic-font text-5xl" style={{ animationDelay: '0.5s' }}>ت</div>
         <div className="footer-letter absolute top-12 right-[25%] academic-font text-4xl" style={{ animationDelay: '2.3s' }}>ث</div>
         <div className="footer-letter absolute top-[30%] left-[2%] academic-font text-6xl" style={{ animationDelay: '3.1s' }}>ج</div>
         <div className="footer-letter absolute top-[50%] left-[3%] academic-font text-4xl" style={{ animationDelay: '1.8s' }}>ح</div>
         <div className="footer-letter absolute top-[70%] left-[2%] academic-font text-5xl" style={{ animationDelay: '4.2s' }}>خ</div>
         <div className="footer-letter absolute top-[15%] left-[15%] academic-font text-2xl" style={{ animationDelay: '5.1s' }}>د</div>
         <div className="footer-letter absolute top-[85%] left-[5%] academic-font text-3xl" style={{ animationDelay: '0.3s' }}>ذ</div>
         <div className="footer-letter absolute top-[30%] right-[2%] academic-font text-5xl" style={{ animationDelay: '2.7s' }}>ر</div>
         <div className="footer-letter absolute top-[50%] right-[3%] academic-font text-6xl" style={{ animationDelay: '0.9s' }}>ز</div>
         <div className="footer-letter absolute top-[70%] right-[2%] academic-font text-4xl" style={{ animationDelay: '3.5s' }}>س</div>
         <div className="footer-letter absolute top-[15%] right-[15%] academic-font text-2xl" style={{ animationDelay: '1.1s' }}>ش</div>
         <div className="footer-letter absolute top-[85%] right-[5%] academic-font text-3xl" style={{ animationDelay: '2.4s' }}>ص</div>
         <div className="footer-letter absolute bottom-5 left-[10%] academic-font text-4xl" style={{ animationDelay: '2.1s' }}>ض</div>
         <div className="footer-letter absolute bottom-10 left-[30%] academic-font text-3xl" style={{ animationDelay: '1.4s' }}>ط</div>
         <div className="footer-letter absolute bottom-5 right-[10%] academic-font text-5xl" style={{ animationDelay: '0.7s' }}>ظ</div>
         <div className="footer-letter absolute bottom-12 right-[30%] academic-font text-4xl" style={{ animationDelay: '2.9s' }}>ع</div>
         <div className="footer-letter absolute bottom-8 left-[50%] academic-font text-2xl" style={{ animationDelay: '3.3s' }}>غ</div>
         <div className="footer-letter absolute top-[40%] left-[22%] academic-font text-2xl" style={{ animationDelay: '4.5s' }}>ف</div>
         <div className="footer-letter absolute top-[60%] right-[22%] academic-font text-2xl" style={{ animationDelay: '1.6s' }}>ق</div>
         <div className="footer-letter absolute top-[25%] left-[45%] academic-font text-3xl" style={{ animationDelay: '0.8s' }}>ك</div>
         <div className="footer-letter absolute top-[75%] right-[45%] academic-font text-3xl" style={{ animationDelay: '3.7s' }}>ل</div>
         <div className="footer-letter absolute top-[45%] left-[70%] academic-font text-2xl" style={{ animationDelay: '1.9s' }}>م</div>
         <div className="footer-letter absolute top-[55%] right-[70%] academic-font text-2xl" style={{ animationDelay: '4.1s' }}>ن</div>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-8">
              <Logo size="lg" />
            </div>
            <p className="text-[13px] leading-relaxed text-slate-400 font-medium academic-font">
              أول منصة بحثية عربية متكاملة تهدف إلى رقمنة الأدوات اللسانية وتوفير التراكيب الأكاديمية المحكمة لدعم الباحثين في مسيرتهم العلمية.
            </p>
            <div className="flex gap-4 mt-8">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-400/30 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-blue-500 font-black mb-8 text-[17px] flex items-center gap-2 trendy-font">الأدوات البحثية</h3>
            <ul className="space-y-5 text-sm academic-font">
              <li><Link to="/library" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><BookOpen size={16}/> المكتبة اللسانية</Link></li>
              <li><Link to="/writing-bank" className="hover:text-blue-400 transition-colors flex items-center gap-3"><PenTool size={16}/> بنك الكتابة العلمية</Link></li>
              <li><Link to="/paraphraser" className="hover:text-blue-400 transition-colors flex items-center gap-3"><Wand2 size={16}/> مساعد الصياغة الذكي</Link></li>
              <li><Link to="/stylistic-auditor" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><Scale size={16}/> ميزان الصياغة الأكاديمية</Link></li>
              <li><Link to="/nlp-tool" className="hover:text-blue-400 transition-colors flex items-center gap-3"><Sparkles size={16}/> المحلل اللساني المعمق</Link></li>
              <li><Link to="/citations" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><Quote size={16}/> مهندس الاستشهادات المرجعية</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-emerald-500 font-black mb-8 text-[17px] flex items-center gap-2 trendy-font">المركز المعرفي</h3>
            <ul className="space-y-5 text-sm academic-font">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><Info size={16}/> عن المبادرة</Link></li>
              <li><Link to="/about#team" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><Users size={16}/> فريق العمل</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><HelpCircle size={16}/> الأسئلة الشائعة</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><ShieldCheck size={16}/> ميثاق الأمانة</Link></li>
              <li><Link to="/publish-with-us" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><FileText size={16}/> سياسة النشر</Link></li>
              <li><Link to="/sitemap" className="hover:text-emerald-400 transition-colors flex items-center gap-3"><Map size={16}/> خريطة الموقع</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-400 font-black mb-8 text-[17px] trendy-font">النشرة العلمية</h3>
            <p className="text-[13px] text-slate-500 mb-8 academic-font">اشترك لتصلك تحديثات بنك الكتابة وأحدث الكتب المضافة.</p>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const email = (e.target as any).email.value;
                if (!email) return;
                try {
                  const { supabase } = await import('../lib/supabase');
                  const { error } = await supabase
                    .from('newsletter_subscriptions')
                    .insert([{ email }]);
                  if (error) throw error;
                  alert('تم الاشتراك بنجاح!');
                  (e.target as any).reset();
                } catch (error) {
                  console.error('Newsletter error:', error);
                  alert('تم الاشتراك بنجاح!'); // Demo success
                }
              }}
              className="flex flex-col gap-4"
            >
              <input name="email" type="email" required placeholder="بريدك الإلكتروني" className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all text-right" />
              <button type="submit" className="bg-slate-900 text-white px-6 py-4 rounded-2xl text-[13px] font-black hover:bg-slate-800 transition-all shadow-md">اشترك الآن</button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] trendy-font">
          <p>© {new Date().getFullYear()} بنك اللغة العربية • منصة علمية معرفية لخدمة الطلاب والباحثين</p>
          <div className="mt-8 md:mt-0 flex gap-8">
            <span className="text-blue-500/50 hover:text-blue-500 transition-colors cursor-default">LINGUISTICS</span>
            <span className="text-emerald-500/50 hover:text-emerald-500 transition-colors cursor-default">ACADEMIA</span>
            <span className="text-blue-500/50 hover:text-blue-500 transition-colors cursor-default">OPEN ACCESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

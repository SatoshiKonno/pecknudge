"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, Play, X, Send, CheckCircle2 } from 'lucide-react';

// --- Components ---

const Navbar = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="flex items-center gap-2">
        <div className="h-8 md:h-10 flex items-center">
          <img src="/textlogo_pinkandwhite.png" alt="Pecknudge" className="h-full w-auto object-contain" />
        </div>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
        <a href="#about" className="text-white/70 hover:text-[#ff007a] transition-colors uppercase tracking-widest">About</a>
        <a href="/tool" className="text-white/70 hover:text-[#ff007a] transition-colors uppercase tracking-widest">Workshop</a>
        <a href="#cases" className="text-white/70 hover:text-[#ff007a] transition-colors uppercase tracking-widest">Cases</a>
        <button 
          onClick={onContactClick}
          className="bg-[#ff007a] px-6 py-2 rounded-full text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,0,122,0.3)]"
        >
          CONTACT
        </button>
      </div>
      <div className="md:hidden text-white">
        <Menu size={24} />
      </div>
    </nav>
  );
};

const ContactModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/meejjdbw", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const inputStyles = "w-full border border-pink-100/50 rounded-2xl px-6 py-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#ff007a] transition-colors shadow-sm bg-[#fff9fb]";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => status !== 'sending' && onClose()}
      />
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#ff007a]/10 mb-6 text-[#ff007a]">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-rounded">送信完了</h3>
              <p className="text-gray-400 mb-8">
                お問い合わせありがとうございます。<br />
                内容を確認次第、担当者よりご連絡いたします。
              </p>
              <button 
                onClick={onClose}
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[#ff007a] hover:text-white transition-all"
              >
                閉じる
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white font-rounded mb-2 tracking-tight">CONTACT</h3>
                <p className="text-gray-400 text-sm">プロジェクトのご相談、ワークショップのご依頼などお気軽にお送りください。</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/50 text-[10px] uppercase tracking-widest font-bold mb-2 ml-1">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="お名前"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-[10px] uppercase tracking-widest font-bold mb-2 ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="メールアドレス"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-[10px] uppercase tracking-widest font-bold mb-2 ml-1">Message</label>
                  <textarea 
                    name="message" 
                    required 
                    rows="4"
                    placeholder="お問い合わせ内容をご入力ください"
                    className={`${inputStyles} resize-none`}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-xs text-center">エラーが発生しました。時間を置いて再度お試しください。</p>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-[#ff007a] text-white py-5 rounded-full font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#ff007a]/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span className="animate-pulse">送信中...</span>
                  ) : (
                    <>
                      <span>送信する</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onContactClick }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#2e1065_0%,#0a0a0c_100%)] pt-20">
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ff007a]/10 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

    <div className="container mx-auto px-6 text-center z-10">
      <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight text-white font-rounded">
        心を動かす、<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#ff007a] animate-gradient-x">
          非合理のロジック。
        </span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
        行動経済学 × マーケティング。人間の意思決定を科学し、<br className="hidden md:block" />
        ビジネスに圧倒的なインパクトをもたらす。
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <a 
          href="/tool" 
          className="group relative bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-[#ff007a] hover:text-white transition-all duration-300 shadow-2xl flex items-center gap-2 overflow-hidden"
        >
          <span className="relative z-10">アイディア出しツールを試す</span>
          <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </a>
        <button 
          onClick={onContactClick}
          className="px-10 py-5 rounded-full font-bold text-lg text-white border border-white/20 hover:border-[#ff007a] hover:text-[#ff007a] transition-all duration-300 backdrop-blur-sm"
        >
          ペックナッジについて
        </button>
      </div>
    </div>
    
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
      <span className="text-[10px] text-white uppercase tracking-[0.3em]">Scroll</span>
      <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
    </div>
  </section>
);

const About = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-32 bg-[#0a0a0c] relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-sm font-bold text-[#ff007a] tracking-[0.4em] uppercase mb-4">Who we are</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white font-rounded">REPRESENTATIVE</h3>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-16 justify-center max-w-6xl mx-auto">
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#a855f7] to-[#ff007a] rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            {/* プロフィール背景色を #fff9fb に変更 */}
            <div className="relative w-72 h-96 md:w-80 md:h-[480px] bg-[#fff9fb] rounded-[2rem] border border-white/10 overflow-hidden flex items-center justify-center">
               {!imgError ? (
                 <img 
                   src="/satoshi_konno.png" 
                   alt="紺野 賢" 
                   className="w-full h-full object-cover transition-all duration-500"
                   onError={() => setImgError(true)}
                 />
               ) : (
                 <div className="flex items-center justify-center text-zinc-900/20 text-xl font-bold italic">PORTRAIT</div>
               )}
            </div>
          </div>
          
          <div className="flex-1 text-left">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="px-4 py-1 rounded-full bg-[#ff007a]/10 border border-[#ff007a]/20 text-[#ff007a] text-xs font-bold uppercase tracking-wider">
                CEO / Behavioral Technologist
              </div>
              <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-bold">
                Braze Principal CSM
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-3xl md:text-5xl font-bold text-white mb-2 font-rounded">紺野 賢</h4>
              <span className="text-white/40 text-lg font-light tracking-widest">Satoshi Konno</span>
            </div>

            <div className="space-y-6 text-gray-400 leading-relaxed text-base md:text-lg mb-10">
              <p className="font-medium text-white/90">
                Braze株式会社 プリンシパルカスタマーサクセスマネージャー<br />
                行動経済テクノロジスト（兼 行動経済学検定1級）・行動心理士
              </p>
              <p>
                富士通、SAS、Salesforceなどを経て、デジタルマーケティングに関する施策立案・開発・運用・データ分析まで広範囲な業務を経験。Salesforceではデジタルマーケティング部 部長として組織オペレーション改善などにも注力。
              </p>
              <p>
                Brazeでは、約30社の活用支援、カスタマーマーケティング、早稲田大学 消費者行動研究所との共同研究を担当。
              </p>
              <p>
                現職の傍らで、行動経済テクノロジストとしても活動しており、書籍の出版や、小規模事業者に対するマーケティング戦略立案と実践の支援も行っている。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-[#ff007a] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">専門領域</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• 行動経済学 / 心理学</li>
                  <li>• デジタルマーケティング戦略</li>
                  <li>• データ分析・オペレーション改善</li>
                </ul>
              </div>
              <div>
                <p className="text-[#ff007a] text-[10px] uppercase tracking-[0.3em] font-bold mb-2">活動内容</p>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• 学術研究</li>
                  <li>• マーケティング戦略コンサルティング</li>
                  <li>• 執筆・出版活動</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Cases = () => {
  const videoData = [
    {
      id: "96rt6mD-JKM",
      title: "行動経済学・心理学で紐解くBraze事例 10選",
      description: "実際のビジネスシーンでどのように行動経済学が応用されているのか、具体的な10の事例をもとに解説します。",
      tag: "CASE STUDY"
    },
    {
      id: "7drWXDI9Qqk",
      title: "学術論文から厳選！マーケですぐに応用できる研究結果 21選",
      description: "膨大な学術研究の中から、実務のデジタルマーケティングに即効性のある21の知見をピックアップ。",
      tag: "RESEARCH"
    }
  ];

  return (
    <section id="cases" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-sm font-bold text-[#ff007a] tracking-[0.4em] uppercase mb-4">Latest Insights</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white font-rounded uppercase">Case Study</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {videoData.map((video, idx) => (
            <div key={idx} className="group">
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="px-2">
                <span className="text-[#ff007a] text-[10px] font-bold tracking-widest uppercase mb-3 block">
                  {video.tag}
                </span>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#ff007a] transition-colors leading-snug">
                  {video.title}
                </h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <a 
            href="https://www.youtube.com/@SatoshiKonno_Pecknudge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ff007a] group-hover:bg-[#ff007a]/10 transition-all">
               <Play size={16} fill="currentColor" className="ml-0.5" />
            </div>
            <span className="font-bold tracking-widest text-sm">VIEW ALL ON YOUTUBE</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onContactClick }) => (
  <footer className="py-16 bg-black border-t border-white/5 relative overflow-hidden">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
      <div className="h-8 md:h-10">
        <img src="/textlogo_pinkandwhite.png" alt="Pecknudge" className="h-full w-auto object-contain" />
      </div>
      <div className="text-gray-500 text-xs tracking-widest">
        &copy; 2025 Pecknudge LLC. ALL RIGHTS RESERVED.
      </div>
      <div className="flex space-x-6 text-gray-400">
        <button onClick={onContactClick} className="hover:text-white transition-colors">Contact</button>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="bg-[#0a0a0c] min-h-screen selection:bg-[#ff007a] selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700&display=swap');
        .font-rounded { font-family: 'M PLUS Rounded 1c', sans-serif; }
        html { scroll-behavior: smooth; }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-gradient-x {
          animation: gradient-x 5s ease infinite;
        }
      `}} />
      <Navbar onContactClick={() => setIsContactOpen(true)} />
      <Hero onContactClick={() => setIsContactOpen(true)} />
      <About />
      <Cases />
      <Footer onContactClick={() => setIsContactOpen(true)} />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}
'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Menu } from 'lucide-react';

// --- Components ---

const Navbar = () => {
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
          <span className="text-white font-bold text-2xl tracking-tighter font-rounded">
            Peck<span className="text-[#ff007a]">nudge</span>
          </span>
        </div>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
        <a href="#about" className="text-white/70 hover:text-[#ff007a] transition-colors uppercase tracking-widest">About</a>
        <a href="#diagram" className="text-white/70 hover:text-[#ff007a] transition-colors uppercase tracking-widest">Diagram</a>
        <a href="#cases" className="text-white/70 hover:text-[#ff007a] transition-colors uppercase tracking-widest">Cases</a>
        <button className="bg-[#ff007a] px-6 py-2 rounded-full text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,0,122,0.3)]">
          CONTACT
        </button>
      </div>
      <div className="md:hidden text-white">
        <Menu size={24} />
      </div>
    </nav>
  );
};

const Hero = () => (
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
        <Link 
          href="/tool" 
          className="group relative bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-[#ff007a] hover:text-white transition-all duration-300 shadow-2xl flex items-center gap-2 overflow-hidden"
        >
          <span className="relative z-10">アイディア出しツールを試す</span>
          <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </Link>
        <a 
          href="#about" 
          className="px-10 py-5 rounded-full font-bold text-lg text-white border border-white/20 hover:border-[#ff007a] hover:text-[#ff007a] transition-all duration-300 backdrop-blur-sm"
        >
          ペックナッジについて
        </a>
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
            <div className="relative w-72 h-96 md:w-80 md:h-[480px] bg-zinc-900 rounded-[2rem] border border-white/10 overflow-hidden flex items-center justify-center">
               {!imgError ? (
                 <img 
                   src="/satoshi_konno.png" 
                   alt="紺野 賢" 
                   className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                   onError={() => setImgError(true)}
                 />
               ) : (
                 <div className="flex items-center justify-center text-white/10 text-xl font-bold italic">PORTRAIT</div>
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
              <p className="font-medium text-white/90 text-left">
                Braze株式会社 プリンシパルカスタマーサクセスマネージャー<br />
                行動経済テクノロジスト（兼 行動経済学検定1級）・行動心理士
              </p>
              <p className="text-left">
                富士通、SAS、Salesforceなどを経て、デジタルマーケティングに関する施策立案・開発・運用・データ分析まで広範囲な業務を経験。
              </p>
              <p className="text-left">
                Brazeでは、約30社の活用支援、カスタマーマーケティング、早稲田大学 消費者行動研究所との共同研究を担当。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer
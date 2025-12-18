'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
    {/* 修正ポイント：画像ロゴへの差し替え */}
    <div className="h-8 md:h-10">
      <img 
        src="/textlogo_pinkandwhite.png" 
        alt="BIAS & LOGIC" 
        className="h-full w-auto object-contain"
      />
    </div>
    <div className="hidden md:flex space-x-8 text-sm font-medium">
      <a href="#about" className="text-white hover:text-[#ff007a] transition-colors">ABOUT</a>
      <a href="#biases" className="text-white hover:text-[#ff007a] transition-colors">DIAGRAM</a>
      <a href="#cases" className="text-white hover:text-[#ff007a] transition-colors">CASES</a>
      <button className="bg-[#ff007a] px-6 py-2 rounded-full text-white font-bold hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(255,0,122,0.4)]">
        CONTACT
      </button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#2e1065_0%,#0a0a0c_100%)] pt-20">
    <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
    <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
    
    <div className="container mx-auto px-6 text-center z-10">
      <h1 className="text-5xl md:text-8xl font-bold mb-6 font-rounded leading-tight text-white">
        心を動かす、<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#ff007a]">非合理のロジック。</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        行動経済学 × マーケティング。<br />
        人間の意思決定を科学し、ブランドと顧客の間に<span className="text-[#ff007a]">「魔法」</span>のような繋がりを。
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        {/* ツールへのリンクを追加 */}
        <Link href="/tool" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ff007a] hover:text-white transition-all shadow-xl text-center">
          アイディア出しツールを試す
        </Link>
        <a href="#about" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:border-[#ff007a] hover:text-[#ff007a] transition-all text-center">
          私たちについて
        </a>
      </div>
    </div>
  </section>
);

// --- 他のパーツ (About, Biases, Cases, Footer) はご提示のコードをそのまま継承 ---
// ※ 文字数制限のため、ここではAbout以下の構造は省略しますが、
// お手元のコードに Navbar と Hero の修正を反映させてください。

const About = () => (
  <section id="about" className="py-24 bg-black overflow-hidden">
    {/* ... 既存のAboutコード ... */}
    <div className="container mx-auto px-6">
      <div className="mb-16 scroll-reveal">
        <h2 className="text-3xl md:text-5xl font-bold font-rounded mb-4 text-white uppercase">Representative</h2>
        <p className="text-gray-500 italic">科学と直感の交差点に立つ</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="w-full md:w-2/5 scroll-reveal">
          <div className="relative profile-glow">
            <div className="aspect-[4/5] bg-zinc-900 rounded-[2rem] overflow-hidden relative border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-purple-900/20 group-hover:bg-purple-900/10 transition-colors text-center text-white/20 font-bold text-4xl font-rounded">
                REPRESENTATIVE<br />IMAGE
              </div>
              <div className="absolute bottom-8 left-8 z-20 text-left">
                <p className="text-[#ff007a] font-bold text-sm tracking-widest mb-1 uppercase text-left">CEO / Behavioral Economist</p>
                <h3 className="text-3xl font-bold font-rounded text-white">橋本 健太郎</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/5 space-y-8 scroll-reveal text-left">
          <h4 className="text-[#ff007a] font-bold text-xl mb-4 font-rounded">「なぜ、人はそれを選んでしまうのか？」</h4>
          <p className="text-gray-400 leading-relaxed">行動経済学とデジタルマーケティングを融合させた独自の戦略設計を専門とする...</p>
        </div>
      </div>
    </div>
  </section>
);

// ... (Biases, Cases, Footer も同様に配置) ...

export default function App() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, observerOptions);
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0a0a0c] min-h-screen selection:bg-pink-500 selection:text-white text-left">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&family=Noto+Sans+JP:wght@300;500;700&display=swap');
        .font-rounded { font-family: 'M PLUS Rounded 1c', sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .scroll-reveal.active { opacity: 1; transform: translateY(0); }
        .profile-glow::after { content: ''; position: absolute; inset: -5px; background: linear-gradient(45deg, #a855f7, #ff007a); border-radius: 2rem; z-index: -1; filter: blur(15px); opacity: 0.5; }
        html { scroll-behavior: smooth; }
      `}} />
      <Navbar />
      <Hero />
      <About />
      {/* 簡易化のため以下省略していますが、お手元の全コンポーネントをここに入れてください */}
      <Footer />
    </div>
  );
}
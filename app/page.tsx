'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5">
    <div className="h-8 md:h-10">
      <img src="/textlogo_pinkandwhite.png" alt="BIAS & LOGIC" className="h-full w-auto object-contain" />
    </div>
    <div className="hidden md:flex space-x-8 text-sm font-medium">
      <a href="#about" className="text-white hover:text-[#ff007a] transition-colors uppercase">About</a>
      <a href="#biases" className="text-white hover:text-[#ff007a] transition-colors uppercase">Diagram</a>
      <a href="#cases" className="text-white hover:text-[#ff007a] transition-colors uppercase">Cases</a>
      <button className="bg-[#ff007a] px-6 py-2 rounded-full text-white font-bold hover:scale-105 transition-all">CONTACT</button>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#2e1065_0%,#0a0a0c_100%)] pt-20">
    <div className="container mx-auto px-6 text-center z-10">
      <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight text-white font-rounded">
        心を動かす、<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#ec4899] to-[#ff007a]">非合理のロジック。</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
        行動経済学 × マーケティング。人間の意思決定を科学する。
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link href="/tool" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ff007a] hover:text-white transition-all shadow-xl">
          アイディア出しツールを試す
        </Link>
        <a href="#about" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:border-[#ff007a] hover:text-[#ff007a] transition-all">
          私たちについて
        </a>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-black">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white font-rounded uppercase">Representative</h2>
      <div className="flex flex-col md:flex-row items-center gap-12 justify-center">
        <div className="w-64 h-80 bg-zinc-900 rounded-3xl border border-white/10 flex items-center justify-center text-white/20 font-bold">IMAGE</div>
        <div className="max-w-xl text-left">
          <h3 className="text-[#ff007a] font-bold text-xl mb-4 font-rounded">橋本 健太郎</h3>
          <p className="text-gray-400 leading-relaxed">行動経済学とデジタルマーケティングを融合させた独自の戦略設計を専門とする...</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10 bg-zinc-950 border-t border-white/5 text-center text-gray-500 text-xs">
    <p>&copy; 2025 BIAS & LOGIC INC. ALL RIGHTS RESERVED.</p>
  </footer>
);

export default function App() {
  return (
    <div className="bg-[#0a0a0c] min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700&display=swap');
        .font-rounded { font-family: 'M PLUS Rounded 1c', sans-serif; }
        html { scroll-behavior: smooth; }
      `}} />
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  );
}
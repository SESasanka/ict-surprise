'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
// Assuming you created this component in the previous step.
import FeedbackSection from './components/FeedbackSection';
import Memories from './components/Memories';
import Footer from './components/Footer';


// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

export default function ICTSurprise() {
  const container = useRef(null);
  const [stage, setStage] = useState('editor'); 

  // --- CELEBRATION ANIMATION LOGIC ---
  const handleCelebration = () => {
    // A mix of tech icons and celebration emojis
    const symbols = ['💻', '💾', '🚀', '1', '0', '{ }', '❤️', '🎉', '🐛', '⚡', '☕'];
    
    // Create 50 particles
    for(let i = 0; i < 50; i++) {
      const el = document.createElement('div');
      el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
      el.className = 'fixed z-[100] pointer-events-none select-none font-bold';
      
      // Random starting position near the bottom center
      el.style.left = `${50 + (Math.random() * 20 - 10)}%`; 
      el.style.bottom = '0%';
      
      // Random colors: Cyan, Green, Purple, or Yellow
      const colors = ['#22d3ee', '#4ade80', '#c084fc', '#facc15'];
      el.style.color = colors[Math.floor(Math.random() * colors.length)];
      
      el.style.fontSize = `${Math.random() * 2 + 1.5}rem`;
      el.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
      
      document.body.appendChild(el);

      // Animate explosion
      gsap.to(el, {
        x: (Math.random() - 0.5) * window.innerWidth, // Explode outward width
        y: -window.innerHeight * (Math.random() * 0.8 + 0.5), // Go up
        rotation: Math.random() * 720,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 2 + 2,
        ease: "power4.out",
        onComplete: () => el.remove()
      });
    }
  };

  // --- AUTO TRIGGER FIREWORKS ON GALLERY LOAD ---
  useEffect(() => {
    if (stage === 'gallery') {
      // First burst immediately upon loading gallery
      handleCelebration();

      // Second burst 800ms later for effect
      const timer = setTimeout(() => {
        handleCelebration();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [stage]);

  // --- STAGE ANIMATIONS ---
  useGSAP(() => {
    if (stage === 'editor') {
      const tl = gsap.timeline();
      tl.from('.editor-container', { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
      [".code-line-1", ".code-line-2", ".code-line-3", ".code-line-4"].forEach((line) => {
        tl.to(line, { opacity: 1, duration: 0.1 }).from(`${line} .type-effect`, { text: "", duration: 1.2, ease: "none" });
      });
      tl.to(".status-bar", { text: "Compiling Tribute... 100%", duration: 1, delay: 0.5, color: "#4ade80" })
        .to('.editor-container', { scale: 1.1, opacity: 0, filter: "blur(20px)", duration: 0.8, ease: "power2.in", onComplete: () => setStage('card') });
    }
  }, [stage]);

  useGSAP(() => {
    if (stage === 'card') {
      gsap.fromTo('.surprise-card', { scale: 0.8, opacity: 0, rotationX: 20 }, { scale: 1, opacity: 1, rotationX: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" });
      gsap.from(".hero-text", { y: 50, opacity: 0, stagger: 0.1, duration: 0.8 });
    }
  }, [stage]);

  useGSAP(() => {
    if (stage === 'decrypt') {
      const tl = gsap.timeline({ onComplete: () => setStage('gallery') });
      tl.to('.decrypt-text', { text: "ACCESSING SECURE ARCHIVES...", duration: 2, ease: "none" })
        .to('.decrypt-bar', { width: "100%", duration: 1.5, ease: "expo.inOut" })
        .to('.decrypt-container', { opacity: 0, scale: 2, duration: 0.5 }); 
    }
  }, [stage]);

  return (
    <main ref={container} className="min-h-screen bg-[#0d1117] flex items-center justify-center overflow-x-hidden relative font-mono selection:bg-cyan-900 selection:text-cyan-100 text-white">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#0d1117]/80 to-[#0d1117]"></div>

      {/* PHASE 1: EDITOR */}
      {stage === 'editor' && (
        <div className="editor-container z-10 w-full max-w-3xl mx-4 rounded-xl border border-slate-700 bg-[#161b22] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-slate-800">
             <div className="flex space-x-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
             <div className="text-xs text-slate-500">logic.js</div>
          </div>
          <div className="p-6 md:p-8 text-sm md:text-lg leading-relaxed font-mono">
            <div className="code-line-1 opacity-0 flex mb-2"><span className="text-slate-600 mr-4 select-none">1</span><div className="type-effect"><span className="text-purple-400">import</span> <span className="text-yellow-200">{`{ Appreciation }`}</span> <span className="text-purple-400">from</span> <span className="text-green-300">'heart'</span>;</div></div>
            <div className="code-line-2 opacity-0 flex mb-2"><span className="text-slate-600 mr-4 select-none">2</span><div className="type-effect"><span className="text-purple-400">const</span> <span className="text-blue-400">teacher</span> = <span className="text-purple-400">new</span> <span className="text-yellow-200">Legend</span>(<span className="text-green-300">"SIR"</span>);</div></div>
            <div className="code-line-3 opacity-0 flex mb-2"><span className="text-slate-600 mr-4 select-none">3</span><div className="type-effect"><span className="text-blue-400">teacher</span>.<span className="text-yellow-200">knowledge</span> = <span className="text-orange-400">Infinity</span>;</div></div>
            <div className="code-line-4 opacity-0 flex mb-2"><span className="text-slate-600 mr-4 select-none">4</span><div className="type-effect"><span className="text-cyan-400">console</span>.<span className="text-yellow-200">log</span>(<span className="text-green-300">"Deploying Surprise...🎉"</span>);</div></div>
          </div>
          <div className="px-6 py-3 bg-[#0d1117] border-t border-slate-800 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span className="status-bar text-slate-400 text-xs uppercase">Compiling...</span></div>
        </div>
      )}

      {/* PHASE 2: CARD */}
      {stage === 'card' && (
        <div className="surprise-card z-20 relative w-full max-w-4xl mx-4">
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_100px_rgba(56,189,248,0.2)] overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/30 rounded-full blur-[80px]"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-2xl rotate-6 opacity-70 blur-lg"></div>
                <div className="absolute inset-0 bg-slate-800 rounded-2xl border-2 border-white/20 flex items-center justify-center overflow-hidden">
                    <span className="text-8xl">👨‍🏫</span>
                </div>
              </div>
              <div className="text-center md:text-left space-y-6">
                <h1 className="hero-text text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">Surprise!</h1>
                <p className="hero-text text-slate-300 text-lg">This website is a small token of our <span className="text-cyan-400">gratitude</span> for the endless patience, guidance, and <span className="text-cyan-400">inspiration</span> you’ve given us❤️</p>
                <div className="hero-text pt-4">
                  <button onClick={() => setStage('decrypt')} className="group relative px-8 py-3 bg-cyan-900/30 overflow-hidden rounded-full border border-cyan-500/50 hover:border-cyan-400 transition-all cursor-pointer">
                    <div className="absolute inset-0 w-0 bg-cyan-500/20 transition-all duration-300 ease-out group-hover:w-full"></div>
                    <span className="relative flex items-center gap-2 text-cyan-300 font-bold">See Memories <span className="text-xl">➜</span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: DECRYPT */}
      {stage === 'decrypt' && (
        <div className="decrypt-container z-30 fixed inset-0 bg-black flex flex-col items-center justify-center">
          <div className="decrypt-text text-green-500 text-xl md:text-3xl font-bold font-mono tracking-widest mb-6">INITIALIZING...</div>
          <div className="w-80 h-1 bg-gray-900 rounded overflow-hidden"><div className="decrypt-bar h-full w-0 bg-green-500 shadow-[0_0_20px_#22c55e]"></div></div>
        </div>
      )}

      {/* PHASE 4: GALLERY */}
      {stage === 'gallery' && (
        <div className="z-40 w-full max-w-7xl p-6 min-h-screen flex flex-col items-center pt-20 pb-40">
          
          <div className="gallery-header text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">ARCHIVE UNLOCKED</h2>
            <p className="text-slate-500 font-mono mt-4">/usr/local/memories/loaded</p>
          </div>
          
          <Memories />
          
          <FeedbackSection />

          <div className="pb-16 text-center mt-20 flex flex-col items-center gap-4">
            <button 
              onClick={handleCelebration} 
              className="group relative px-8 py-3 bg-slate-800 text-cyan-400 rounded-full font-bold text-lg hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:-translate-y-1 active:scale-95"
            >
              🎁 Click for Surprise 
            </button>
            
            <button onClick={() => window.location.reload()} className="text-slate-600 hover:text-white underline font-mono text-xs mt-10">
              Restart System
            </button>
          </div>

          <div className="w-full mt-20">
              <Footer />
            </div>

        </div>
      )}

    </main>
  );
}
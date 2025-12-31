'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import { Terminal, Cpu, Sparkles, MessageSquareCode } from 'lucide-react';

// Register TextPlugin to enable typing effects
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

const Sir = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // --- 1. IMAGE ANIMATION (Cyber Frame Reveal) ---
    tl.from(".sir-image-container", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .from(".cyber-border", {
      scaleX: 0,
      scaleY: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.5");

    // Continuous Floating for Image
    gsap.to(".sir-image-container", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // --- 2. TERMINAL TYPING ANIMATION (Right Side) ---
    tl.from(".terminal-window", {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");

    // Type the header
    tl.to(".typing-header", {
      text: "message_to_sir.txt",
      duration: 1,
      ease: "none"
    });

    // Type the main body text
    tl.to(".typing-body", {
      text: "Sir, you didn't just teach us ICT, you taught us how to think. Thank you for being the constant variable in our chaotic lives. We will miss you! ❤️",
      duration: 6, // Adjust speed here
      ease: "none",
    });

    // Blink cursor
    gsap.to(".cursor", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "steps(1)"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto py-12 px-4">
      
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        
        {/* ================= LEFT SIDE: IMAGE WITH CYBER FRAME ================= */}
        <div className="relative group w-full max-w-sm flex-shrink-0">
          
          {/* Animated Background Blob */}
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

          {/* The Image Container */}
          <div className="sir-image-container relative z-10">
            
            {/* Corner Borders (Animated) */}
            <div className="cyber-border absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl"></div>
            <div className="cyber-border absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl"></div>
            <div className="cyber-border absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl"></div>
            <div className="cyber-border absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-400 rounded-br-xl"></div>

            {/* Main Image Box */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl shadow-cyan-900/50">
              
              {/* REPLACE SRC BELOW WITH SIR'S IMAGE */}
              <img 
                src="sirimg.jpg" 
                alt="ICT Sir" 
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>

              {/* Name Tag at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-lg border border-slate-600 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">Sanath Herath</h3>
                  <p className="text-cyan-400 text-xs font-mono">Status: LEGEND</p>
                </div>
                <Cpu className="text-cyan-500 w-6 h-6 animate-spin-slow" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: TYPING TERMINAL ================= */}
        <div className="terminal-window w-full flex-grow relative">
          
          {/* Decorative Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 -left-16 w-16 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-cyan-500"></div>
          <div className="hidden md:block absolute top-1/2 -left-1 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#22d3ee]"></div>

          {/* Terminal Box */}
          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
            
            {/* Terminal Header */}
            <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-black">
              <div className="flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-slate-400" />
                 <span className="typing-header text-sm text-slate-300 font-mono"></span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8 min-h-[200px] font-mono text-sm md:text-lg leading-relaxed">
              <div className="flex items-start gap-3 mb-4">
                 <MessageSquareCode className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                 <div className="text-green-500 font-bold">Students@Classroom:~$ <span className="text-white">echo "Gratitude"</span></div>
              </div>
              
              {/* The Text That Gets Typed */}
              <div className="pl-9 relative">
                <span className="typing-body text-slate-300"></span>
                <span className="cursor inline-block w-2.5 h-5 bg-cyan-400 ml-1 align-middle"></span>
              </div>

              <div className="mt-8 pl-9 text-slate-500 text-xs">
                // Execution completed successfully<br/>
                // Return value: Forever Grateful
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-cyan-900/20 py-1 px-4 text-right">
               <span className="text-[10px] text-cyan-400 font-mono">Ln 1, Col 1 • UTF-8 • JavaScript</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Sir;
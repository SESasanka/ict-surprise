'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Heart, 
  ArrowUp, 
  Github, 
  Linkedin, 
  Instagram, 
  Terminal, 
  Code2, 
  Coffee,
  Cpu
} from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  // --- SCROLL TO TOP FUNCTION ---
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // --- ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
      }
    });

    tl.from(".footer-item", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Hover effect for the "Built With" badges
    const badges = gsap.utils.toArray('.tech-badge');
    badges.forEach((badge: any) => {
      badge.addEventListener('mouseenter', () => {
        gsap.to(badge, { y: -5, scale: 1.1, duration: 0.2, ease: "back.out" });
      });
      badge.addEventListener('mouseleave', () => {
        gsap.to(badge, { y: 0, scale: 1, duration: 0.2 });
      });
    });

  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative bg-[#0d1117] text-slate-400 border-t border-slate-800 pt-16 pb-8 overflow-hidden">
      
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_10px_#22d3ee]"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* COLUMN 1: BRANDING */}
          <div className="md:col-span-5 footer-item space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-tighter">
              <Terminal className="w-6 h-6 text-cyan-400" />
              <span>BATCH_2025</span>
              <span className="text-cyan-500 animate-pulse">_</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Proudly created by Batch 2025 AL in honor of our ICT Sir — Mentor, Guide, and Inspiration<span className="text-red-400">❤</span>.
            </p>
          </div>

          {/* COLUMN 2: TECH STACK */}
          <div className="md:col-span-4 footer-item">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" /> 
              Built With
            </h3>
            <div className="flex flex-wrap gap-2">
              <TechBadge name="React" color="text-cyan-400" bg="bg-cyan-900/20" border="border-cyan-500/30" />
              <TechBadge name="Tailwind" color="text-blue-400" bg="bg-blue-900/20" border="border-blue-500/30" />
              <TechBadge name="GSAP" color="text-green-400" bg="bg-green-900/20" border="border-green-500/30" />
              <TechBadge name="TypeScript" color="text-blue-300" bg="bg-blue-900/20" border="border-blue-400/30" />
              <TechBadge name="Lucide" color="text-pink-400" bg="bg-pink-900/20" border="border-pink-500/30" />
            </div>
          </div>

          {/* COLUMN 3: ACTIONS */}
          <div className="md:col-span-3 footer-item flex flex-col justify-start md:items-end">
            <h3 className="text-white font-bold mb-4">System Commands</h3>
            
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-3 px-5 py-3 bg-slate-900 border border-slate-700 rounded-lg hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300 w-full md:w-auto"
            >
              <div className="bg-cyan-500/10 p-2 rounded-md group-hover:bg-cyan-500/20 transition-colors">
                 <ArrowUp className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-left">
                <span className="block text-xs text-slate-500 uppercase font-mono">Execute</span>
                <span className="block text-sm text-white font-bold group-hover:text-cyan-400 transition-colors">Scroll to Top</span>
              </div>
            </button>

            <div className="mt-6 text-right hidden md:block">
              <div className="text-xs text-slate-600 font-mono">
                STATUS: <span className="text-green-500">ONLINE</span>
              </div>
              <div className="text-xs text-slate-600 font-mono mt-1">
                V.1.0.0
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="footer-item border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-slate-600" />
            <span>© 2025 Sasanka Akash. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 animate-pulse fill-red-500" />
            <span>for our Sir.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- SUB-COMPONENTS ---

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500 hover:bg-cyan-900/10 hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </a>
);

const TechBadge = ({ name, color, bg, border }: { name: string, color: string, bg: string, border: string }) => (
  <span className={`tech-badge px-3 py-1.5 rounded-md text-xs font-mono font-bold border ${bg} ${color} ${border} cursor-default select-none`}>
    {name}
  </span>
);

export default Footer;
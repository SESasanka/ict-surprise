"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Terminal,
  Code,
  Cpu,
  Heart,
  GraduationCap,
  Zap,
  Users,
  Sparkles,
} from "lucide-react";
import Sir from "./Sir";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- CONFIGURATION: EDIT YOUR DATA HERE ---


const Memories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const groupImageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animation
      const tl = gsap.timeline();
      tl.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      }).from(".hero-sub", { opacity: 0, x: -20, duration: 0.8 }, "-=0.5");

      // 2. Code Block Animation
      gsap.from(codeBlockRef.current, {
        scrollTrigger: { trigger: codeBlockRef.current, start: "top 85%" },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // --- NEW: GROUP PHOTO ANIMATION ---
      const groupTl = gsap.timeline({
        scrollTrigger: {
          trigger: groupImageRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1, // Smoothly animates with scroll
        },
      });

      groupTl
        .from(".group-photo-wrapper", {
          clipPath: "inset(10% 20% 10% 20% round 50px)", // Starts as a small rounded oval
          scale: 0.9,
          filter: "grayscale(100%)", // Starts black & white
          duration: 1,
        })
        .to(".group-photo-wrapper", {
          clipPath: "inset(0% 0% 0% 0% round 20px)", // Expands to full rectangle
          scale: 1,
          filter: "grayscale(0%)", // Becomes colorful
          duration: 1,
        });
      // ----------------------------------

      // 4. Memory Cards Stagger
      gsap.from(".memory-card", {
        scrollTrigger: { trigger: ".memory-grid", start: "top 75%" },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // 5. Floating Icons
      gsap.to(".floating-icon", {
        y: -20,
        rotation: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 1, from: "random" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-slate-200 overflow-x-hidden font-sans selection:bg-cyan-500 selection:text-white"
    >
      <Sir />
      {/* --- NEW: GROUP PHOTO SECTION --- */}
      <section ref={groupImageRef} className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Users className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white tracking-widest uppercase">
              The Squad
            </h3>
          </div>

          <div className="relative group-photo-wrapper overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.2)] border border-slate-700">
            {/* REPLACE WITH YOUR GROUP IMAGE URL */}
            <img
              src="gp_image.jpg"
              alt="Class Group Photo"
              className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-[2s] hover:scale-105"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>

            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-xl flex items-center gap-4">
              <div className="bg-cyan-500/20 p-3 rounded-full">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg">
                  Batch of 2025 AL
                </div>
                <div className="text-slate-400 text-xs font-mono">
                  Students
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Memories;

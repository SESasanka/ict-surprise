'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trash2, AlertTriangle, CheckCircle, X } from 'lucide-react'; // Import icons

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TYPE DEFINITIONS ---
interface Comment {
  id: number;
  name: string;
  comment: string;
  date: string;
}

export default function FeedbackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // --- CUSTOM ALERT STATE ---
  const [alertState, setAlertState] = useState({ show: false, message: '', type: 'error' });

  // 1. Load Comments from LocalStorage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("ict_student_comments");
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        setComments([]);
      }
    }
  }, []);

  // 2. Alert Animation Logic
  const triggerAlert = (msg: string, type: 'error' | 'success' = 'error') => {
    setAlertState({ show: true, message: msg, type });

    if (alertRef.current) {
      gsap.killTweensOf(alertRef.current);
      const tl = gsap.timeline();

      // Reset
      gsap.set(alertRef.current, { y: -100, opacity: 0 });

      // Slide In
      tl.to(alertRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });

      // Shake if Error
      if (type === 'error') {
        tl.to(alertRef.current, { x: 10, duration: 0.1, repeat: 5, yoyo: true, ease: "sine.inOut" });
        tl.to(alertRef.current, { x: 0, duration: 0.1 });
      }

      // Auto Hide
      gsap.to(alertRef.current, {
        y: -100, opacity: 0, duration: 0.5, delay: 3, ease: "power3.in",
        onComplete: () => setAlertState(prev => ({ ...prev, show: false }))
      });
    }
  };

  // 3. Scroll Animation
  useGSAP(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
    tl.from(containerRef.current.children, {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
    });
  }, { scope: containerRef });

  // 4. Handle Publish
  const handlePublish = () => {
    if (!name.trim() || !commentText.trim()) {
      triggerAlert("ERROR: Input Fields Cannot Be Empty!", "error");
      return;
    }

    const newEntry = {
      id: Date.now(),
      name: name,
      comment: commentText,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newEntry, ...comments];
    setComments(updated);
    localStorage.setItem("ict_student_comments", JSON.stringify(updated));

    // Button Animation
    gsap.to(formRef.current, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });

    triggerAlert("SUCCESS: Message added to repository!", "success");
    setName("");
    setCommentText("");
  };

  // 5. Handle Delete SINGLE Comment
  const handleDeleteOne = (idToDelete: number) => {
    const updated = comments.filter(comment => comment.id !== idToDelete);
    setComments(updated);
    localStorage.setItem("ict_student_comments", JSON.stringify(updated));
    triggerAlert("Deleted comment successfully.", "success");
  };

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="w-full max-w-4xl border-t border-slate-800 pt-12 relative">
      
      {/* --- CUSTOM POPUP NOTIFICATION --- */}
      <div 
        ref={alertRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-lg border shadow-2xl backdrop-blur-md min-w-[320px]
          ${alertState.show ? 'pointer-events-auto' : 'pointer-events-none opacity-0'}
          ${alertState.type === 'error' 
            ? 'bg-red-950/90 border-red-500 text-red-200 shadow-red-900/20' 
            : 'bg-green-950/90 border-green-500 text-green-200 shadow-green-900/20'
          }
        `}
      >
        <div className={`p-2 rounded-full ${alertState.type === 'error' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
          {alertState.type === 'error' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
        </div>
        <div>
          <h4 className="font-bold font-mono text-xs tracking-widest mb-1">
            {alertState.type === 'error' ? 'SYSTEM_ERROR' : 'COMMIT_SUCCESS'}
          </h4>
          <p className="text-sm font-sans font-medium">{alertState.message}</p>
        </div>
        
        {/* Close Button */}
        <button onClick={() => gsap.to(alertRef.current, { y: -100, opacity: 0 })} className="ml-auto p-1 hover:bg-white/10 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* HEADER */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-2">
          Student Comments 🚀
        </h3>
        <p className="text-slate-500 text-sm font-mono">Leave a message for Sir!</p>
      </div>

      {/* --- ADD COMMENT FORM --- */}
      <div ref={formRef} className="bg-[#161b22] border border-slate-700 rounded-xl p-6 md:p-8 shadow-2xl mb-12 relative overflow-hidden">
        <div className="mb-4 relative z-10">
          <label className="block text-xs font-mono text-cyan-400 mb-2">NAME / ALIAS</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. CodeMaster"
            className="w-full bg-[#0d1117] border border-slate-700 rounded p-3 text-white focus:border-cyan-500 outline-none transition-colors"
          />
        </div>
        <div className="mb-4 relative z-10">
          <label className="block text-xs font-mono text-cyan-400 mb-2">MESSAGE</label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your gratitude..."
            className="w-full bg-[#0d1117] border border-slate-700 rounded p-3 text-white focus:border-cyan-500 outline-none h-24 transition-colors"
          ></textarea>
        </div>
        <button
          onClick={handlePublish}
          className="w-full py-3 bg-cyan-900/50 hover:bg-cyan-500 hover:text-black border border-cyan-500/50 text-cyan-400 font-bold rounded font-mono transition-all duration-300 uppercase tracking-widest relative z-10"
        >
          Push to git log 🚀
        </button>
      </div>

      {/* --- VIEWING SECTION --- */}
      <div className="space-y-4">
        <h4 className="text-slate-400 font-mono text-sm border-b border-slate-800 pb-2 mb-4">
          {`> git log --recent`}
        </h4>

        {comments.length === 0 ? (
          <p className="text-slate-600 text-center italic py-8">
            // No comments found. Be the first to commit!
          </p>
        ) : (
          comments.map((entry) => (
            <div
              key={entry.id}
              className="group relative bg-[#0d1117] border border-slate-700/50 rounded-lg p-4 flex gap-4 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold border border-slate-600 shrink-0 group-hover:scale-110 transition-transform">
                {entry.name.charAt(0).toUpperCase()}
              </div>
              
              {/* Content */}
              <div className="flex-1 pr-8">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-[16px] group-hover:text-cyan-300 transition-colors">
                    {entry.name}
                  </h4>
                  <span className="text-slate-600 text-[15px] font-mono">{entry.date}</span>
                </div>
                <p className="text-slate-300 text-[16px] mt-1 leading-relaxed break-words">{entry.comment}</p>
              </div>

              {/* DELETE SINGLE BUTTON (Visible on Hover) */}
              <button
                onClick={() => handleDeleteOne(entry.id)}
                className="absolute top-2 right-2 p-2 rounded text-slate-600 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
                title="Remove Comment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}

        {/* Clear All History Button */}
        {comments.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                if (confirm("WARNING: This will delete ALL comments. Are you sure?")) {
                  localStorage.removeItem("ict_student_comments");
                  setComments([]);
                  triggerAlert("Database wiped successfully.", "success");
                }
              }}
              className="text-xs text-red-500/30 hover:text-red-500 underline font-mono transition-colors"
            >
              sudo rm -rf ./all_history
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
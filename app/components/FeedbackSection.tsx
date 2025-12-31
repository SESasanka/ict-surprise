"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import Comment from "./Comment";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TYPE DEFINITIONS ---
interface CommentType {
  id: number;
  name: string;
  comment: string;
  date: string;
}

// --- DEFAULT CONFIGURATION (SEED DATA) ---
const DEFAULT_COMMENTS: CommentType[] = [
  {
    id: 101,
    name: "Sinali Geethmi",
    comment: "Your guidance and kindness have made our learning journey truly special. Sir, the patience, understanding, and encouragement you showed us gave us confidence and strength that will stay with us long after this classroom. Having you as our ICT teacher has meant more to us than words can express. Thank you, Sir, for every effort, every lesson, and every moment of support—we will always remember you with gratitude.🩶",
    date: "31/12/2025",
  },
  {
    id: 102,
    name: "Minudi Anujana",
    comment: "Your sincere teaching not only enhanced our understanding of IT but also strengthened our confidence in facing the future. Sir, the knowledge, guidance, and values you have imparted will remain a lasting and cherished part of our academic journey. Learning from a respectful and exemplary teacher like you has been a valuable opportunity for us. We sincerely thank you, Sir—we will never forget everything you have done for us.💜",
    date: "31/12/2025",
  },
  {
    id: 103,
    name: "Sandali Ayodya",
    comment: "මම සර්ගේ class ආවේ මැදදි වගේ .හැබැයි මන් ආපු පළවෙනි දවසෙම සර් කලින් පාඩම ඉවර කරලා තිබුනු නිසා අලුත් පාඩමකින් තමා එදා දවස සර් පටන් ගත්තේ.ඇත්තම කිව්වොත් මට ICT විෂය අමාරුම විෂයක් වෙලයි තිබුනේ. ඒත් සර්,සර්ගේ class ආපු පළවෙනි දවසෙන්ම ICT විෂය කියන්නේ අමාරු වුණත් ගොඩදාගන්න පුළුවන් විෂයක් කියලා සර්ගේ ඉගැන්වීම් රටාවත් එක්ක මට තේරුම් ගියා.අන්තිමේදී එපාම වෙලා තිබුනු විෂයක් මන් ආසම විෂයක් වුණා.ඇත්තටම සර්ට ගොඩක් පින් මේ හැමදේටම .❤️💫සර් papers කලා,Revision කලා,ict විෂයෙන් ලෝකය බලන්න කියලා දුන්නා,ictවිෂයේ පුළුල් පැතිකඩ කියලා දුන්නා.ict විෂය ජීවිතය ඇතුළේ හරියටම පාවිච්චි කරන්නේ කොහොමද කියලා අපිට කියලා දුන්නා. exam එක කල් ගියත් සර් class නතර කලේ නෑ.දිගටම papers discuss කලා.😢ඇත්තටම සර්ගේ මෙහෙය විෂිශ්ටයි .සමහරක් විට එහෙම අපිට දවස් දීලා එන්න කියලා class කරපු වෙලාව සර් නිදහසේ ඉන්න වෙලාවක් වෙන්න ඇති . නැත්තම් සර් සර්ගේ වැඩ යොදාගත්ත දවසක් වෙන්න ඇති.🥹💞ඒත් සර් ඒ කාලය අපි වෙනුවෙන් කැප කලාට සර්ට ගොඩක් පින් මේ හැමදේකටම .🥹ඉස්සරහටත් නංගිලා මල්ලිලටත් මේ විෂය මේ විදිහටම උගන්නලා එයාලගේ ජීවිතත් එළිය කරන්න සර්ට ශක්තිය ලැබෙන්න ඕනි .💖 මට විශ්වාසයි සර් නිසාම තව හුග දෙනෙක්ගේ ජීවිත ICT වලින්ම ලස්සන වේවි.🤍 සර්ගේ නිහතමානි හිනාවට තමා අපි ගොඩක්ම ආස හැමදාම සර්ගේ මූණේ හිනාව රැදෙන්න කියලා ප්‍රාර්ථනා කරනවා. ගොඩක් ස්තූතියි සර් මේ හැමදේටම♥️💫",
    date: "31/12/2025",
  },
  {
    id: 103,
    name: "Himori Ashmitha",
    comment: "මම සර්ගෙ class එන්නේ 11 වසරේ ඉඳන්.මට ඒ කාලේ ict අමාරු වෙලා තිබ්බේ. ඒත් සර්ගෙ class ආවට පස්සේ මට ict වල ලකුණු වැඩි කර ගන්න පුළුවන් වුණා A එකක් ගන්න පුළුවන් වෙන තරමට ම. සර් ට ඒකටත් ගොඩක් ස්තූතියි.❤️✨ A\L වලටත් මං සර් ගේ class ආවේ මට ict ඉගෙන ගන්න පුළුවන් හරිම තැන නිසා.සර් ගොඩක් හොඳට කියලා දෙනවා. Syllabus එකෙන් එහා ගියපු දේවල් කියලා දෙනවා.ඒවා අපිට ගොඩක් වටිනවා. Ict වල සමහර තැන් අමාරු වුණත් මගේ ආසම විෂය තමයි මේක. සර් අපි වෙනුවෙන් මහන්සි වුණ විදිහ ඒකට සර් ට පින්..💗 විභාගේ ළං වෙනකම් ම උගන්නලා ඒක කල් කල් ගියත් සර් අපිට පේපර්ස් සාකච්ජා කරලා අපිට ගොඩක් ම උදව් කළා. ඒකට ගොඩාක්ම ස්තූතියි සර්..🥹🩷සර් class එකේ ළමයිත් එක්ක තියෙන friendly ගතියට අපි ගොඩක් ආසයි.නපුරු නැති විනෝදකාමී,ලස්සන හිනාවක් තියෙන handsome සර් කෙනෙක්.😌🤍 Thank You Very Much for Teaching Us, Sir!!!❤️❤️❤️💫",
    date: "31/12/2025",
  },
  {
    id: 103,
    name: "Pasindu Janith",
    comment: "I appreciate you being so patient with us and always helping us when we are stuck.Tnq sir🤍",
    date: "31/12/2025",
  },
  {
    id: 103,
    name: "Sasanka Akash",
    comment: "We would like to express our sincere gratitude for your dedication and commitment to teaching Information Technology. Your patience, clear explanations, and constant encouragement helped us understand even the most challenging concepts with confidence. You always motivated us to explore, think critically, and believe in our abilities. Beyond teaching us technical skills, you guided us to be responsible digital citizens and prepared us for a rapidly changing world. Your passion for teaching and your willingness to support us at every step made a lasting impact on our academic journey. We will always remember your lessons, kindness, and guidance. Thank you for being an inspiring teacher and mentor.❤️",
    date: "31/12/2025",
  },
  {
    id: 103,
    name: "Nirwan Randima",
    comment: "Thank you, dear teacher, for turning complex technology into simple knowledge and for guiding us with patience and dedication. Your lessons went beyond computers—you taught us confidence, problem-solving, and the courage to explore the digital world. We are truly grateful for your support and inspiration.🤍",
    date: "31/12/2025",
  },
  {
    id: 103,
    name: "Akalanka",
    comment: "Thank you, sir, for guiding us through the world of ICT with dedication and care.Your lessons shaped not just our skills, but our future.❤️",
    date: "31/12/2025",
  },
];

export default function FeedbackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const [comments, setComments] = useState<CommentType[]>([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // --- ALERT STATE ---
  const [alertState, setAlertState] = useState({
    show: false,
    message: "",
    type: "error",
  });

  // 1. Load Comments (With Defaults Logic)
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("ict_student_comments");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setComments(parsed);
      } catch (e) {
        // If JSON is corrupt, fall back to defaults
        setComments(DEFAULT_COMMENTS);
      }
    } else {
      // If no LocalStorage data exists (First visit), set defaults
      setComments(DEFAULT_COMMENTS);
    }
  }, []);

  // 2. Alert Animation Logic
  const triggerAlert = (msg: string, type: "error" | "success" = "error") => {
    setAlertState({ show: true, message: msg, type });

    if (alertRef.current) {
      gsap.killTweensOf(alertRef.current);
      const tl = gsap.timeline();

      gsap.set(alertRef.current, { y: -100, opacity: 0 });

      tl.to(alertRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });

      if (type === "error") {
        tl.to(alertRef.current, {
          x: 10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "sine.inOut",
        });
        tl.to(alertRef.current, { x: 0, duration: 0.1 });
      }

      gsap.to(alertRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.5,
        delay: 3,
        ease: "power3.in",
        onComplete: () => setAlertState((prev) => ({ ...prev, show: false })),
      });
    }
  };

  // 3. Scroll Animation
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      tl.from(containerRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

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

    // Form Animation
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    triggerAlert("SUCCESS: Message added to repository!", "success");
    setName("");
    setCommentText("");
  };

  // 5. Handle Delete SINGLE Comment
  const handleDeleteOne = (idToDelete: number) => {
    const updated = comments.filter((comment) => comment.id !== idToDelete);
    setComments(updated);
    localStorage.setItem("ict_student_comments", JSON.stringify(updated));
    triggerAlert("Deleted comment successfully.", "success");
  };

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl border-t border-slate-800 pt-12 relative mx-auto"
    >
      {/* --- CUSTOM POPUP NOTIFICATION --- */}
      <div
        ref={alertRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-lg border shadow-2xl backdrop-blur-md min-w-[320px]
          ${
            alertState.show
              ? "pointer-events-auto"
              : "pointer-events-none opacity-0"
          }
          ${
            alertState.type === "error"
              ? "bg-red-950/90 border-red-500 text-red-200 shadow-red-900/20"
              : "bg-green-950/90 border-green-500 text-green-200 shadow-green-900/20"
          }
        `}
      >
        <div
          className={`p-2 rounded-full ${
            alertState.type === "error" ? "bg-red-500/20" : "bg-green-500/20"
          }`}
        >
          {alertState.type === "error" ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
        </div>
        <div>
          <h4 className="font-bold font-mono text-xs tracking-widest mb-1">
            {alertState.type === "error" ? "SYSTEM_ERROR" : "COMMIT_SUCCESS"}
          </h4>
          <p className="text-sm font-sans font-medium">{alertState.message}</p>
        </div>

        <button
          onClick={() => gsap.to(alertRef.current, { y: -100, opacity: 0 })}
          className="ml-auto p-1 hover:bg-white/10 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* HEADER */}
      <div className="text-center mb-10">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-2">
          Student Comments 🚀
        </h3>
        <p className="text-slate-500 text-sm font-mono">
          Leave a message for Sir!
        </p>
      </div>

      {/* --- ADD COMMENT FORM --- */}
      <div
        ref={formRef}
        className="bg-[#161b22] border border-slate-700 rounded-xl p-6 md:p-8 shadow-2xl mb-12 relative overflow-hidden"
      >
        <div className="mb-4 relative z-10">
          <label className="block text-xs font-mono text-cyan-400 mb-2">
            NAME / ALIAS
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. CodeMaster"
            className="w-full bg-[#0d1117] border border-slate-700 rounded p-3 text-white focus:border-cyan-500 outline-none transition-colors"
          />
        </div>
        <div className="mb-4 relative z-10">
          <label className="block text-xs font-mono text-cyan-400 mb-2">
            MESSAGE
          </label>
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

      {/* --- COMMENTS VIEWING SECTION --- */}
      <div className="space-y-4">
        <h4 className="text-slate-400 font-mono text-sm border-b border-slate-800 pb-2 mb-4">
          {`> git log --recent`}{" "}
        </h4>

        {comments.length === 0 ? (
          <p className="text-slate-600 text-center italic py-8 font-mono">
            // No comments found. Be the first to commit!
          </p>
        ) : (
          comments.map((entry) => (
            <Comment
              key={entry.id}
              id={entry.id}
              name={entry.name}
              comment={entry.comment}
              date={entry.date}
              onDelete={handleDeleteOne}
            />
          ))
        )}

        {/* Global Clear All Comments Button */}
        {comments.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                if (
                  confirm(
                    "WARNING: This will delete ALL comments. Are you sure?"
                  )
                ) {
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
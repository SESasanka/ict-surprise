"use client";

import React from "react";
import { Trash2 } from "lucide-react";

interface CommentProps {
  id: number;
  name: string;
  comment: string;
  date: string;
  onDelete: (id: number) => void;
}

const Comment: React.FC<CommentProps> = ({ id, name, comment, date, onDelete }) => {
  return (
    <div className="group relative bg-[#0d1117] border border-slate-700/50 rounded-lg p-4 flex gap-4 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300">
      {/* User Avatar - First letter of the name */}
      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold border border-slate-600 shrink-0 group-hover:scale-110 transition-transform select-none">
        {name.charAt(0).toUpperCase()}
      </div>

      {/* Comment Content Container */}
      <div className="flex-1 pr-8">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-white text-[16px] group-hover:text-cyan-300 transition-colors">
            {name}
          </h4>
          <span className="text-slate-600 text-[15px] font-mono text-xs md:text-sm">
            {date}
          </span>
        </div>
        <p className="text-slate-300 text-[15px] md:text-[16px] mt-1 leading-relaxed break-words whitespace-pre-wrap">
          {comment}
        </p>
      </div>

      {/* Delete Button (Visible on Hover) */}
      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 p-2 rounded text-slate-600 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100"
        title="git rm comment"
        aria-label="Delete comment"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Comment;
'use client';
import { FileText, Download } from 'lucide-react';

export default function FloatingResume() {
  return (
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#E50914] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-red-700 transition-all duration-300 group border-2 border-transparent hover:border-white/20"
      aria-label="Download Resume"
    >
      <FileText className="w-6 h-6" />
      {/* Text reveals on hover */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-bold text-sm">
        Resume
      </span>
    </a>
  );
}
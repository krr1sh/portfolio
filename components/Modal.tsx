'use client';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ModalProps {
  project: any;
  onClose: () => void;
}

export default function Modal({ project, onClose }: ModalProps) {
  if (!project) return null;

  // LOGIC: This splits "Company | Date" into two separate pieces
  // Example: "Govt Agency | 2021 - Present" becomes ["Govt Agency", "2021 - Present"]
  const [company, dateRange] = (project.subtitle || '').split(' | ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.9 }} 
        className="relative w-full max-w-4xl bg-[#181818] rounded-md overflow-hidden shadow-2xl scrollbar-hide max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-white/20 transition"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Hero Image Section */}
        <div className="relative h-[50vh] w-full">
          <Image 
            src={project.thumbnail || '/placeholder.png'} 
            alt={project.title} 
            fill 
            className="object-cover opacity-90" 
          />
          <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-[#181818] to-transparent" />
          
          {/* TITLE & DETAILS SECTION */}
          <div className="absolute bottom-6 left-6 md:left-12">
            {/* Line 1: Job Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              {project.title}
            </h2>
            
            <div className="flex flex-col space-y-1">
              {/* Line 2: Company Name (Uses the first part of split) */}
              <p className="text-xl md:text-2xl text-gray-200 font-semibold drop-shadow-md">
                {company}
              </p>
              
              {/* Line 3: Date (Uses the second part of split) */}
              {dateRange && (
                <p className="text-sm md:text-base text-gray-400 font-medium">
                  {dateRange}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description & Tags Section */}
        <div className="p-6 md:p-12 text-white space-y-6 bg-[#181818]">
          
          <div className="flex items-center space-x-4">
             {project.match && <span className="text-green-400 font-bold">{project.match} Match</span>}
             {project.rating && <span className="border border-gray-500 px-2 text-xs rounded uppercase">{project.rating}</span>}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-4">
            {project.tags?.map((tag: string) => (
              <span key={tag} className="text-gray-400 text-sm border border-gray-600 px-3 py-1 rounded hover:bg-white/10 transition cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
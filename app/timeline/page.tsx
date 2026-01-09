'use client';
import Navbar from '@/components/Navbar';
import contentData from '@/data/content.json';
import { GraduationCap, Briefcase } from 'lucide-react';

const getYear = (dateStr: string) => {
  if (!dateStr) return '0';
  const match = dateStr.match(/\b20\d{2}\b/); 
  if (match) return match[0];
  if (dateStr.toLowerCase().includes('present') || dateStr.toLowerCase().includes('current')) {
    return new Date().getFullYear().toString();
  }
  return '0';
};

export default function TimelinePage() {
  const experience = contentData.categories.find(c => c.title === "Experience")?.items || [];
  const education = contentData.categories.find(c => c.title === "Education")?.items || [];

  const allItems = [
    ...experience.map(i => ({ ...i, type: 'work', year: getYear(i.subtitle?.split('|')[1] || '') })),
    ...education.map(i => ({ ...i, type: 'edu', year: getYear(i.subtitle?.split('|')[1] || '') }))
  ];

  const groupedByYear: { [key: string]: typeof allItems } = {};
  allItems.forEach(item => {
    if (!groupedByYear[item.year]) groupedByYear[item.year] = [];
    groupedByYear[item.year].push(item);
  });

  const sortedYears = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-12 pb-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 border-l-4 border-[#E50914] pl-4">
          My Professional Journey
        </h1>

        {/* HEADERS (Desktop Only) */}
        <div className="hidden md:flex justify-between items-center mb-16 px-4">
           <div className="w-1/2 flex justify-end pr-16 items-center space-x-3 text-[#E50914]">
             <h2 className="text-2xl font-bold uppercase tracking-widest">Education</h2>
             <GraduationCap className="w-8 h-8" />
           </div>
           <div className="w-1/2 flex pl-16 items-center space-x-3 text-gray-300">
             <Briefcase className="w-8 h-8" />
             <h2 className="text-2xl font-bold uppercase tracking-widest">Experience</h2>
           </div>
        </div>

        <div className="relative">
          {/* CENTER LINE (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2 z-0" />

          {sortedYears.map((year) => {
            if (year === '0') return null;
            const items = groupedByYear[year];
            const eduItems = items.filter(i => i.type === 'edu');
            const workItems = items.filter(i => i.type === 'work');

            return (
              <div key={year} className="mb-16 relative">
                
                {/* YEAR BUBBLE */}
                {/* Mobile: Aligned Left | Desktop: Centered */}
                <div className="flex absolute left-0 md:left-1/2 -top-8 md:-top-3 md:-translate-x-1/2 z-20 items-center justify-center bg-[#E50914] text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg border-4 border-[#141414]">
                  {year}
                </div>

                {/* CONTENT CONTAINER */}
                {/* Mobile: Adds Left Border & Padding | Desktop: No Border, Row Layout */}
                <div className="flex flex-col md:flex-row border-l-2 border-gray-800 md:border-l-0 ml-4 md:ml-0 pl-6 md:pl-0 pt-4 md:pt-0">
                  
                  {/* LEFT COLUMN: EDUCATION */}
                  <div className="w-full md:w-1/2 md:text-right space-y-12 relative mb-8 md:mb-0">
                    {eduItems.length > 0 ? (
                      eduItems.map(item => {
                        const [uni, fullDate] = (item.subtitle || '').split(' | ');
                        return (
                          <div key={item.id} className="relative group md:pr-16">
                            
                            {/* DATE */}
                            <span className="block text-sm text-[#E50914] font-bold tracking-widest uppercase mb-1">
                              {fullDate}
                            </span>

                            {/* TITLE & ICON */}
                            <div className="flex items-center md:justify-end gap-2 mb-1">
                               <GraduationCap className="text-[#E50914] w-5 h-5 md:hidden" />
                               <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            </div>
                            <h4 className="text-lg text-gray-400 mb-2">{uni}</h4>

                            {/* --- CONNECTORS (Desktop Only) --- */}
                            <div className="hidden md:block absolute right-0 top-7 w-16 h-[1px] bg-gray-800" />
                            <div className="hidden md:block absolute -right-[6px] top-[22px] w-3 h-3 rounded-full bg-[#E50914] ring-4 ring-[#141414] group-hover:scale-125 transition z-10" />
                          </div>
                        );
                      })
                    ) : ( <div className="hidden md:block" /> )}
                  </div>

                  {/* RIGHT COLUMN: EXPERIENCE */}
                  <div className="w-full md:w-1/2 mt-0 md:mt-0 space-y-12 relative">
                    {workItems.length > 0 ? (
                      workItems.map(item => {
                        const [company, fullDate] = (item.subtitle || '').split(' | ');
                        return (
                          <div key={item.id} className="relative group md:pl-16">
                            
                            {/* DATE */}
                            <span className="block text-sm text-[#E50914] font-bold tracking-widest uppercase mb-1">
                              {fullDate}
                            </span>

                            {/* TITLE & ICON */}
                            <div className="flex items-center gap-2 mb-1">
                               <Briefcase className="text-gray-400 w-5 h-5 md:hidden" />
                               <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            </div>
                            <h4 className="text-lg text-gray-400 mb-1">{company}</h4>

                            {/* --- CONNECTORS (Desktop Only) --- */}
                            <div className="hidden md:block absolute left-0 top-7 w-16 h-[1px] bg-gray-800" />
                            <div className="hidden md:block absolute -left-[6px] top-[22px] w-3 h-3 rounded-full bg-gray-500 ring-4 ring-[#141414] group-hover:scale-125 transition z-10" />
                          </div>
                        );
                      })
                    ) : ( <div className="hidden md:block" /> )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
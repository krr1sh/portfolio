'use client';
import Navbar from '@/components/Navbar';
import contentData from '@/data/content.json';

// 1. Define what an Experience Item looks like to satisfy TypeScript
interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets?: string[]; // Optional array of strings
  match?: string;
  rating?: string;
  tags?: string[];    // Optional array of strings
  thumbnail?: string;
}

export default function ExperiencePage() {
  // 2. Safely retrieve the data with Type Assertion
  const category = contentData.categories.find(c => c.title === "Experience");
  const experience: ExperienceItem[] = (category?.items || []) as ExperienceItem[];

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-12 pb-20 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 border-l-4 border-[#E50914] pl-4">
          Professional Experience
        </h1>

        <div className="space-y-12">
          {experience.map((job) => {
             // Safe split of the subtitle
             const parts = (job.subtitle || '').split(' | ');
             const company = parts[0] || job.subtitle;
             const date = parts[1] || '';
             
             return (
              <div key={job.id} className="bg-[#1f1f1f] rounded-lg p-6 md:p-8 hover:bg-[#252525] transition duration-300 shadow-xl border border-white/5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{job.title}</h2>
                    <h3 className="text-xl text-[#E50914] font-semibold">{company}</h3>
                  </div>
                  <div className="mt-2 md:mt-0 px-4 py-1 bg-white/10 rounded-full text-sm font-medium text-gray-300 whitespace-nowrap">
                    {date}
                  </div>
                </div>

                {/* BULLET POINTS (With safety check) */}
                <ul className="space-y-3 list-disc list-outside ml-5 text-gray-300 leading-relaxed">
                  {(job.bullets && job.bullets.length > 0) ? (
                    job.bullets.map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))
                  ) : (
                    // Fallback if no bullets exist
                    <li>{job.description}</li>
                  )}
                </ul>

                {/* TAGS (With safety check) */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
                  {(job.tags || []).map((tag: string) => (
                    <span key={tag} className="text-xs bg-black/40 text-gray-400 px-3 py-1 rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
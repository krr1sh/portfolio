'use client';
import Navbar from '@/components/Navbar';
import contentData from '@/data/content.json';

export default function SkillsPage() {
  const skillCategories = contentData.categories.find(c => c.title === "Technical Skills")?.items || [];

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-12 pb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 border-l-4 border-[#E50914] pl-4">
          Technical Expertise
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((skill) => (
            <div key={skill.id} className="bg-[#1f1f1f] p-8 rounded-xl border border-white/5 hover:border-[#E50914]/50 transition group">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{skill.title}</h2>
                <span className="text-xs font-bold text-[#E50914] border border-[#E50914] px-2 py-1 rounded">
                  {skill.match}
                </span>
              </div>
              
              <p className="text-gray-400 mb-6 text-sm">{skill.description}</p>
              
              <div className="flex flex-wrap gap-3">
                {skill.tags.map((tag: string) => (
                  <div key={tag} className="bg-black/40 px-4 py-2 rounded text-sm font-medium text-gray-200 border border-white/10 group-hover:border-white/30 transition">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
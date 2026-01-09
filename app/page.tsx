'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Row from '../components/Row';
import Modal from '../components/Modal';
import contentData from '../data/content.json';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <main className="relative bg-[#141414] min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <Hero data={contentData.hero} />
      
      {/* FIXED: Changed -mt-32 to mt-4 to push it down below the buttons */}
      <section className="flex flex-col space-y-8 md:space-y-12 mt-4 relative z-10 pb-20 pl-4 md:pl-12">
        {contentData.categories.map((category) => (
          <Row 
            key={category.title}
            title={category.title} 
            projects={category.items}
            onProjectClick={(project) => setSelectedProject(project)} 
          />
        ))}
      </section>
      
      {selectedProject && <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
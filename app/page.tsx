'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Row from '../components/Row';
import Modal from '../components/Modal';
import Hero from '../components/Hero';
import ProfileGate from '../components/ProfileGate';
import contentData from '../data/content.json';

export default function Home() {
  const { hero, categories } = contentData;
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [profileSelected, setProfileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. CHECK SESSION STORAGE ON LOAD
  useEffect(() => {
    const hasProfile = sessionStorage.getItem('netflix-profile');
    if (hasProfile) {
      setProfileSelected(true);
    }
    setIsLoading(false);
  }, []);

  // 2. SAVE TO SESSION STORAGE ON SELECT
  const handleProfileSelect = () => {
    sessionStorage.setItem('netflix-profile', 'active');
    setProfileSelected(true);
  };

  // Prevent flicker while checking storage
  if (isLoading) return null;

  // Show Gate if no profile selected
  if (!profileSelected) {
    return <ProfileGate onSelect={handleProfileSelect} />;
  }

  return (
    <main className="relative bg-[#141414] min-h-screen text-white overflow-x-hidden animate-in fade-in duration-700">
      <Navbar />
      
      {/* HERO SECTION */}
      <Hero data={hero} />

      {/* ROWS SECTION */}
      {/* FIXED: Changed -mt-24 to -mt-8 so it doesn't collide with buttons */}
      <section className="relative z-20 -mt-10 pl-4 md:pl-12 pb-20 space-y-12">
        {categories.map((category) => (
          <Row 
            key={category.title}
            title={category.title} 
            projects={category.items}
            onProjectClick={(project) => setSelectedProject(project)} 
          />
        ))}
      </section>
      
      {/* MODAL */}
      {selectedProject && (
        <Modal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </main>
  );
}
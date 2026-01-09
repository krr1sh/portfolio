'use client';
import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import contentData from '@/data/content.json';
import Image from 'next/image';
import { Camera, Gamepad2, Instagram, Film, Zap, MapPin, ArrowLeft, Play, Pause, X } from 'lucide-react';

export default function AboutPage() {
  const { bio, hobbies, gallery, instagram } = contentData.personal;
  const profilePic = "/images/my-profile.png"; 
  
  // STATE FOR VIDEO PLAYER
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Close player handler
  const closePlayer = () => setVideoSrc(null);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#E50914] selection:text-white">
      <Navbar />
      
      {/* ----------------- NETFLIX STYLE PLAYER OVERLAY ----------------- */}
      {videoSrc && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
          
          {/* Player Header (Back Button) */}
          <div className="absolute top-0 left-0 w-full p-6 z-50 bg-gradient-to-b from-black/80 to-transparent flex items-center">
            <button 
              onClick={closePlayer}
              className="group flex items-center gap-2 text-white hover:text-[#E50914] transition"
            >
              <ArrowLeft className="w-8 h-8 group-hover:scale-110 transition" />
              <span className="font-bold text-lg uppercase tracking-wider">Back to Profile</span>
            </button>
          </div>

          {/* The Video */}
          <div className="flex-1 flex items-center justify-center bg-black">
            <video 
              src={videoSrc} 
              controls 
              autoPlay 
              className="w-full h-full max-h-screen object-contain focus:outline-none"
            />
          </div>
        </div>
      )}
      {/* ---------------------------------------------------------------- */}

      <div className="pt-32 px-4 md:px-12 pb-20 max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
          <div className="relative group shrink-0">
             <div className="absolute -inset-1 bg-gradient-to-r from-[#E50914] to-purple-600 rounded-full opacity-75 blur md:opacity-100 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#141414] bg-[#141414]">
                <Image src={profilePic} alt="Krr1sh" fill className="object-cover" />
             </div>
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#E50914]/50 bg-[#E50914]/10 text-[#E50914] text-xs font-bold tracking-widest uppercase">
              <Zap className="w-3 h-3" /> Player 1 Ready
            </div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter italic pr-0 md:pr-16 py-4 leading-normal">
              <span className="inline-block pr-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Krr1sh
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed">{bio}</p>
            <div className="pt-4 flex justify-center md:justify-start">
              <a href={instagram} target="_blank" className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded font-black hover:bg-[#E50914] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
                <Instagram className="w-5 h-5" /> MY EDITS
              </a>
            </div>
          </div>
        </div>

        {/* HOBBIES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
           {hobbies.map((hobby: string, index: number) => (
             <div key={index} className="bg-[#1f1f1f] border border-white/5 p-6 rounded-xl hover:border-[#E50914] transition group">
                <div className="mb-4 text-[#E50914] group-hover:scale-110 transition">
                  {hobby.includes("Game") ? <Gamepad2 className="w-8 h-8" /> : hobby.includes("Photo") ? <Camera className="w-8 h-8" /> : hobby.includes("Travel") ? <MapPin className="w-8 h-8" /> : <Film className="w-8 h-8" />}
                </div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Attribute {index + 1}</h3>
                <p className="text-lg font-bold text-white">{hobby}</p>
             </div>
           ))}
        </div>

        {/* GALLERY (UPDATED TO OPEN PLAYER) */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
             <div className="h-8 w-1 bg-[#E50914]"></div>
             <h2 className="text-4xl font-black uppercase tracking-tighter">Highlights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item: any, index: number) => (
              <div 
                key={index} 
                onClick={() => item.type === 'video' ? setVideoSrc(item.src) : null}
                className={`relative aspect-video bg-[#1a1a1a] rounded-xl overflow-hidden group border border-white/5 hover:border-[#E50914] transition ${item.type === 'video' ? 'cursor-pointer' : ''}`}
              >
                
                {item.type === 'video' ? (
                  <>
                    <video src={item.src} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" muted playsInline />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="bg-[#E50914] rounded-full p-4 shadow-lg transform group-hover:scale-110 transition">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <Film className="w-3 h-3 text-[#E50914]" /> CLICK TO PLAY
                    </div>
                  </>
                ) : (
                  <>
                    <Image src={item.src} alt="Gallery" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <Camera className="w-3 h-3 text-[#E50914]" /> SHOT
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
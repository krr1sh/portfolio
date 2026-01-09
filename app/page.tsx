'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Database, TrendingUp, ShieldCheck } from 'lucide-react';
import contentData from '@/data/content.json';

export default function Home() {
  const { hero } = contentData;
  
  // TYPEWRITER STATE
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(150); // Typing speed
  
  // The words to cycle through
  const toRotate = [ "Business Systems Analyst", "Data Strategist", "Content Creator" ];

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(50); // Deleting is faster
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000); // Wait 2 seconds before deleting
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(150); // Reset typing speed
    }
  };

  return (
    <main className="min-h-screen bg-[#141414] text-white overflow-x-hidden selection:bg-[#E50914] selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Left: Text */}
        <div className="flex-1 space-y-8 z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#E50914]/50 bg-[#E50914]/10 text-[#E50914] text-xs font-bold tracking-widest uppercase animate-pulse">
             <span className="w-2 h-2 rounded-full bg-[#E50914]"></span> Available for Hire
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1]">
            Sai Krishna <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] to-red-600">Goli</span>
          </h1>
          
          {/* TYPEWRITER EFFECT */}
          <div className="h-10 md:h-12">
            <h2 className="text-xl md:text-3xl font-bold text-gray-300 font-mono">
              I am a <span className="text-white border-r-4 border-[#E50914] pr-1">{text}</span>
            </h2>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            {hero.description}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link href="/timeline" className="group relative px-8 py-4 bg-[#E50914] font-bold text-white rounded overflow-hidden">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
               <span className="relative flex items-center gap-2">
                 View Timeline <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </span>
            </Link>
            <Link href="/about" className="px-8 py-4 border border-white/20 hover:bg-white/10 font-bold rounded transition flex items-center justify-center gap-2">
               <Play className="w-5 h-5" /> More Info
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative w-full max-w-md aspect-[4/5] md:aspect-square flex-shrink-0 group">
           <div className="absolute inset-0 bg-gradient-to-tr from-[#E50914] to-transparent opacity-20 group-hover:opacity-30 transition duration-500 rounded-2xl" />
           <div className="absolute -inset-4 border-2 border-[#E50914]/30 rounded-2xl z-0 group-hover:scale-105 transition duration-500" />
           <Image 
             src={hero.thumbnail} 
             alt="Sai Krishna Goli" 
             fill
             className="object-cover rounded-2xl z-10 shadow-2xl grayscale group-hover:grayscale-0 transition duration-500 ease-in-out"
             priority
           />
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="border-y border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
           <div className="flex items-center gap-4 justify-center md:justify-start">
              <Database className="w-8 h-8 text-[#E50914]" />
              <div>
                <h3 className="text-2xl font-black">6+</h3>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Years Exp.</p>
              </div>
           </div>
           <div className="flex items-center gap-4 justify-center md:justify-start">
              <ShieldCheck className="w-8 h-8 text-[#E50914]" />
              <div>
                <h3 className="text-2xl font-black">100%</h3>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Compliance</p>
              </div>
           </div>
           <div className="flex items-center gap-4 justify-center md:justify-start">
              <TrendingUp className="w-8 h-8 text-[#E50914]" />
              <div>
                <h3 className="text-2xl font-black">$2M+</h3>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Revenue Impact</p>
              </div>
           </div>
           <div className="flex items-center gap-4 justify-center md:justify-start">
              <Play className="w-8 h-8 text-[#E50914]" />
              <div>
                <h3 className="text-2xl font-black">4K</h3>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Edit Quality</p>
              </div>
           </div>
        </div>
      </div>

    </main>
  );
}
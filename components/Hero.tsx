'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';

export default function Hero({ data }: { data: any }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- TYPEWRITER LOGIC START ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(150);
  
  // The roles you want to cycle through
  const toRotate = ["Data Analyst", "Business Analyst", "Systems Analyst"];

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
      setDelta(50);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000); // Wait 2 seconds before deleting
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(150);
    }
  };
  // --- TYPEWRITER LOGIC END ---

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-[65vh] md:h-[85vh] w-full flex flex-col justify-center overflow-hidden">
      
      {/* LAYER 0: THE VIDEO */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#141414] to-transparent z-20" />
        
        {/* VIDEO PLAYER (No changes to your settings) */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          {/* Ensure hero-video.mp4 is directly in your 'public' folder */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* LAYER 10: CONTENT AREA */}
      <div className="relative z-30 mt-40 md:mt-48 w-full flex flex-col space-y-4">
        
        {/* TEXT SECTION */}
        <div className="pl-4 md:pl-12 max-w-2xl space-y-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-2xl">
              {data?.title}
            </h1>
            
            {/* --- CHANGED: Subtitle is now Typewriter --- */}
            <p className="text-lg md:text-xl text-gray-200 font-semibold mt-2 drop-shadow-md min-h-[1.75rem]">
              I am a <span className="text-white">{text}</span>
              <span className="animate-pulse text-[#E50914] font-bold">|</span>
            </p>
            {/* ------------------------------------------- */}

          </div>

          <p className="text-white text-sm md:text-base drop-shadow-md leading-relaxed font-medium max-w-lg">
            {data?.description}
          </p>
        </div>

        {/* BUTTON BAR (Aligned Full Width) */}
        <div className="flex items-center justify-between w-full px-4 md:px-12 pt-2">
          
          {/* LEFT: Resume & Info */}
          <div className="flex space-x-3">
            <a 
              href={data?.resume || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center bg-white text-black px-5 py-2 rounded font-bold hover:bg-opacity-80 transition cursor-pointer text-sm md:text-base"
            >
              <Play className="w-4 h-4 mr-2 fill-black" /> 
              Resume
            </a>

            <Link 
              href="/about"
              className="flex items-center bg-gray-500/70 text-white px-5 py-2 rounded font-bold hover:bg-gray-500/50 transition text-sm md:text-base"
            >
              <Info className="w-4 h-4 mr-2" /> 
              More Info
            </Link>
          </div>

          {/* RIGHT: Mute Button & Rating */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleMute}
              className="flex items-center justify-center border border-white/30 bg-black/20 w-10 h-10 rounded-full hover:bg-white/10 transition backdrop-blur-sm"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
            
            <div className="border-l-4 border-gray-200 bg-gray-500/30 pl-2 pr-4 py-1 backdrop-blur-sm text-white text-sm font-bold">
              13+
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
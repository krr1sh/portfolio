'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

// Default Netflix Avatar URLs (using standard placeholders that look like them)
const AVATAR_BLUE = "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp";
const AVATAR_RED = "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.webp";

export default function ProfileGate({ onSelect }: { onSelect: () => void }) {
  const [loading, setLoading] = useState(true);
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Simulate loading spinner
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle PIN Logic
  const handlePinChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(false);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check PIN when full
    if (index === 3 && value) {
      const fullPin = newPin.join('');
      if (fullPin === '4654') {
        router.push('/about'); // Success -> Go to Personal Page
      } else {
        setError(true);
        setPin(['', '', '', '']); // Reset
        inputRefs.current[0]?.focus(); // Focus first
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#141414] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#E50914] border-transparent"></div>
      </div>
    );
  }

  // --- PIN ENTRY SCREEN ---
  if (pinMode) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#141414] flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
        <div className="max-w-md w-full flex flex-col items-center">
          <p className="text-gray-400 uppercase tracking-widest text-sm mb-4">Profile Lock</p>
          <h2 className="text-3xl font-medium mb-12">Enter your PIN to access this profile.</h2>
          
          <div className="flex gap-4 mb-8">
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={el => { if(el) inputRefs.current[i] = el }} // Correct ref assignment
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-16 h-16 bg-transparent border-2 ${error ? 'border-[#E50914]' : 'border-white'} text-center text-3xl font-bold focus:outline-none rounded`}
              />
            ))}
          </div>
          
          {error && <p className="text-[#E50914] text-lg font-bold mb-6">Incorrect PIN. Please try again.</p>}

          <button 
            onClick={() => { setPinMode(false); setPin(['','','','']); setError(false); }}
            className="border border-gray-500 px-8 py-2 text-gray-400 hover:text-white hover:border-white transition uppercase tracking-widest text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // --- PROFILE SELECTION SCREEN ---
  return (
    <div className="fixed inset-0 z-[90] bg-[#141414] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-5xl font-medium text-white mb-12 tracking-wide">Who's watching?</h1>
      
      <div className="flex gap-6 md:gap-10">
        
        {/* PROFILE 1: RECRUITER (Default Blue) */}
        <div 
          onClick={onSelect}
          className="group flex flex-col items-center gap-4 cursor-pointer hover:text-white text-gray-400"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200">
             {/* Using generic blue avatar */}
             <img src={AVATAR_BLUE} alt="Recruiter" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg md:text-xl transition">Recruiter</span>
        </div>

        {/* PROFILE 2: PERSONAL (Default Red + Lock) */}
        <div 
          onClick={() => setPinMode(true)}
          className="group flex flex-col items-center gap-4 cursor-pointer hover:text-white text-gray-400"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200">
             {/* Using generic red avatar */}
             <img src={AVATAR_RED} alt="Personal" className="w-full h-full object-cover" />
             
             {/* Lock Icon Overlay */}
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white opacity-70" />
             </div>
          </div>
          <span className="text-lg md:text-xl transition">Personal</span>
        </div>

        {/* ADD PROFILE (Fake Button) */}
        <div className="group flex flex-col items-center gap-4 cursor-not-allowed opacity-60 hidden md:flex">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-md flex items-center justify-center border-2 border-gray-600 bg-transparent group-hover:bg-gray-800 transition">
             <span className="text-5xl text-gray-400 font-light">+</span>
          </div>
          <span className="text-lg md:text-xl text-gray-400">Add Profile</span>
        </div>

      </div>

      <button className="mt-20 border border-gray-500 text-gray-400 px-8 py-2 uppercase tracking-widest text-sm hover:border-white hover:text-white transition cursor-pointer">
        Manage Profiles
      </button>
    </div>
  );
}
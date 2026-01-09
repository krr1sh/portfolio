'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, LogOut, Settings, Film } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
    { name: "Skills", path: "/skills" },
    { name: "Timeline", path: "/timeline" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header className={`${isScrolled ? 'bg-[#141414]' : 'bg-transparent'} fixed top-0 z-50 w-full transition duration-500`}>
      <div className="flex items-center px-4 py-4 md:px-12 gap-8 relative">
        
        <Link href="/">
          <h1 className="text-[#E50914] text-2xl md:text-3xl font-black cursor-pointer tracking-tighter uppercase drop-shadow-md whitespace-nowrap" 
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
            Sai Krishna Goli
          </h1>
        </Link>

        {/* NAVIGATION LINKS */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.path}
                className={`text-sm font-medium transition cursor-pointer ${
                  pathname === link.path ? "text-white font-bold" : "text-[#e5e5e5] hover:text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT ICONS */}
        <div className="flex items-center space-x-6 text-white ml-auto relative">
          
          {/* SEARCH */}
          <div className={`flex items-center border border-white/0 transition-all duration-300 ${showSearch ? 'border-white/100 bg-black/50 px-2' : ''}`}>
            <Search 
              className="w-6 h-6 cursor-pointer hover:text-gray-300" 
              onClick={() => setShowSearch(!showSearch)}
            />
            {/* FIXED: Added suppressHydrationWarning to stop Bitwarden/Extensions from crashing the app 
              Added autoComplete="off" to discourage autofill
            */}
            <input 
              type="text" 
              placeholder="Titles, people, genres"
              autoComplete="off"
              suppressHydrationWarning
              className={`bg-transparent text-sm text-white placeholder-gray-400 outline-none ml-2 transition-all duration-300 ${showSearch ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
            />
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative">
            <Bell 
              className="w-6 h-6 cursor-pointer hover:text-gray-300" 
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {/* Notification Dot */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></div>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute top-10 right-0 w-64 bg-black/90 border border-white/20 p-4 rounded shadow-2xl z-50">
                <h4 className="text-sm font-bold border-b border-gray-700 pb-2 mb-2">Notifications</h4>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start hover:bg-white/10 p-2 rounded cursor-pointer transition">
                    <div className="w-10 h-6 bg-blue-600 rounded"></div>
                    <div>
                      <p className="text-xs text-gray-300">New Project Added</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start hover:bg-white/10 p-2 rounded cursor-pointer transition">
                    <div className="w-10 h-6 bg-green-600 rounded"></div>
                    <div>
                      <p className="text-xs text-gray-300">Resume Updated</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* USER PROFILE */}
          <div className="relative flex items-center gap-2 cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="w-8 h-8 rounded bg-[#E50914] flex items-center justify-center font-bold">S</div>
            <span className={`w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}></span>
            
            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute top-10 right-0 w-48 bg-black/95 border border-white/10 py-2 rounded shadow-2xl z-50">
                <Link href="/about" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition text-sm">
                  <Film className="w-4 h-4 text-gray-400" /> Gamer Profile
                </Link>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition text-sm text-gray-400">
                  <Settings className="w-4 h-4" /> Settings
                </div>
                <div className="border-t border-gray-700 my-1"></div>
                <Link href="/contact" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition text-sm">
                   <LogOut className="w-4 h-4 text-gray-400" /> Sign out
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
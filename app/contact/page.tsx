'use client';
import Navbar from '@/components/Navbar';
import contentData from '@/data/content.json';
import { Mail, Phone, Linkedin, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const { email, phone, linkedin } = contentData.personal;

  return (
    <main className="min-h-screen bg-[#141414] text-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-[#1f1f1f] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Let's Connect</h1>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Looking for a Data Analyst who understands both Systems and Strategy?
          </p>

          <div className="space-y-6">
            
            {/* Email Card */}
            <a href={`mailto:${email}`} className="flex items-center justify-between p-6 bg-black/40 rounded-xl hover:bg-[#E50914]/10 hover:border-[#E50914] border border-transparent transition group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#E50914]/20 rounded-full text-[#E50914]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Me</p>
                  <p className="text-xl font-bold">{email}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#E50914] group-hover:translate-x-1 transition" />
            </a>

            {/* Phone Card */}
            <a href={`tel:${phone}`} className="flex items-center justify-between p-6 bg-black/40 rounded-xl hover:bg-[#E50914]/10 hover:border-[#E50914] border border-transparent transition group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#E50914]/20 rounded-full text-[#E50914]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Me</p>
                  <p className="text-xl font-bold">{phone}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#E50914] group-hover:translate-x-1 transition" />
            </a>

            {/* LinkedIn Card */}
            <a href={linkedin} target="_blank" className="flex items-center justify-between p-6 bg-black/40 rounded-xl hover:bg-[#0077b5]/10 hover:border-[#0077b5] border border-transparent transition group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0077b5]/20 rounded-full text-[#0077b5]">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Connect</p>
                  <p className="text-xl font-bold">LinkedIn Profile</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#0077b5] group-hover:translate-x-1 transition" />
            </a>

          </div>
        </div>
      </div>
    </main>
  );
}
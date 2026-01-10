'use client';
import { useState, useEffect, useRef } from 'react';
import { X, Terminal, Minus, Square } from 'lucide-react';

export default function SQLTerminal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    "Microsoft Windows [Version 10.0.19045.4208]",
    "(c) Microsoft Corporation. All rights reserved.",
    "",
    "C:\\Users\\SaiKrishna> SQL_Connect --user=admin",
    "Connected to SAI_DB successfully.",
    "Type 'help' for a list of commands.",
    ""
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = "";

      switch(cmd) {
        case 'help':
          response = "AVAILABLE COMMANDS: \n  SELECT * FROM SKILLS   - List all technical skills\n  SELECT * FROM CONTACT  - Show contact info\n  WHOAMI                 - Display current user role\n  CLEAR                  - Clear terminal screen\n  EXIT                   - Close terminal";
          break;
        case 'select * from skills':
        case 'skills':
          response = "--------------------------------------------------\n| SKILL_ID | NAME          | PROFICIENCY | TYPE      |\n--------------------------------------------------\n| 001      | SQL           | EXPERT      | DATABASE  |\n| 002      | PYTHON        | ADVANCED    | BACKEND   |\n| 003      | POWER BI      | EXPERT      | VISUAL    |\n| 004      | AWS           | CERTIFIED   | CLOUD     |\n--------------------------------------------------\n(4 rows affected)";
          break;
        case 'select * from contact':
        case 'contact':
          response = "EMAIL: saikrishnagoli@icloud.com\nLINKEDIN: /in/imkrr1sh\nSTATUS: Open to work";
          break;
        case 'whoami':
          response = "User: Sai Krishna Goli\nRole: Business Systems Analyst\nLevel: 25";
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          onClose();
          return;
        default:
          response = `'${input}' is not recognized as an internal or external command.`;
      }

      setHistory([...history, `C:\\Users\\SaiKrishna> ${input}`, response, ""]);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-[#0c0c0c] border border-[#333] shadow-2xl rounded-lg overflow-hidden font-mono text-sm md:text-base animate-in zoom-in-95 duration-200">
        
        {/* Title Bar */}
        <div className="bg-[#1f1f1f] px-4 py-2 flex items-center justify-between border-b border-[#333] select-none">
          <div className="flex items-center gap-2 text-white">
            <Terminal className="w-4 h-4 text-[#E50914]" />
            <span className="font-bold">Command Prompt - SQL Interface</span>
          </div>
          <div className="flex items-center gap-3">
            <Minus className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            <Square className="w-3 h-3 text-gray-400 hover:text-white cursor-pointer" />
            <X className="w-4 h-4 text-gray-400 hover:text-[#E50914] cursor-pointer" onClick={onClose} />
          </div>
        </div>

        {/* Console Area */}
        <div className="h-[400px] overflow-y-auto p-4 text-green-500 font-bold bg-black/90 scrollbar-hide">
           {history.map((line, i) => (
             <div key={i} className="whitespace-pre-wrap mb-1 leading-relaxed">{line}</div>
           ))}
           <div className="flex items-center gap-2 mt-2">
             <span className="text-gray-400">C:\Users\SaiKrishna&gt;</span>
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleCommand}
               autoFocus
               className="bg-transparent border-none outline-none text-white flex-1 caret-green-500"
               spellCheck={false}
             />
           </div>
           <div ref={bottomRef} />
        </div>

      </div>
    </div>
  );
}
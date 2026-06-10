"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Command {
  input: string;
  output: React.ReactNode;
  isError?: boolean;
}

const WELCOME = `
  ___  ____  ____  ____  ____ 
 / __)(  _ \\(  _ \\(  _ \\(  _ \\
( (__  )   / )   / )   / )   /
 \\___)(__\\_)(__\\_)(__\\_)(__\\_)

Type 'help' to see available commands.
`;

const AVAILABLE_COMMANDS = [
  { cmd: "help", desc: "Show all available commands" },
  { cmd: "whoami", desc: "Display user information" },
  { cmd: "ls", desc: "List all portfolio sections" },
  { cmd: "open [app]", desc: "Open an app (about, projects, skills, contact)" },
  { cmd: "clear", desc: "Clear terminal screen" },
  { cmd: "date", desc: "Show current date and time" },
  { cmd: "neofetch", desc: "Display system info" },
  { cmd: "sudo rm -rf /", desc: "Try it if you dare" },
];

function getOutput(input: string, onOpenApp: (id: string) => void): React.ReactNode {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "help") {
    return (
      <div className="space-y-1">
        <p className="text-folder-blue font-bold mb-2">Available Commands:</p>
        {AVAILABLE_COMMANDS.map((c) => (
          <div key={c.cmd} className="flex gap-4">
            <span className="text-amber-600 min-w-[20ch] font-mono">{c.cmd}</span>
            <span className="text-text-light">{c.desc}</span>
          </div>
        ))}
      </div>
    );
  }

  if (trimmed === "whoami") {
    return (
      <div className="space-y-1">
        <p><span className="text-folder-blue">User:</span> Izi Oussama</p>
        <p><span className="text-folder-blue">Role:</span> Full Stack Developer & Designer</p>
        <p><span className="text-folder-blue">Location:</span> Earth, Milky Way</p>
        <p><span className="text-folder-blue">Status:</span> <span className="text-green-600">Available for work</span></p>
      </div>
    );
  }

  if (trimmed === "ls") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {["about", "projects", "skills", "contact", "terminal"].map((dir) => (
          <span key={dir} className="text-folder-blue font-mono">
            <span className="text-amber-600">📁</span> {dir}/
          </span>
        ))}
        <span className="text-text-light font-mono">resume.pdf</span>
      </div>
    );
  }

  if (trimmed.startsWith("open ")) {
    const app = trimmed.replace("open ", "").trim();
    const validApps = ["about", "projects", "skills", "contact"];
    if (validApps.includes(app)) {
      onOpenApp(app);
      return <span className="text-green-600">Opening {app}...</span>;
    }
    return <span className="text-red-500">Error: App '{app}' not found. Try: about, projects, skills, contact</span>;
  }

  if (trimmed === "clear") return null;

  if (trimmed === "date") {
    return <span className="text-text-light">{new Date().toString()}</span>;
  }

  if (trimmed === "neofetch") {
    return (
      <div className="flex gap-4">
        <pre className="text-folder-blue leading-none text-xs">
          {`
   ██████╗ ███████╗
  ██╔═══██╗██╔════╝
  ██║   ██║█████╗  
  ██║   ██║██╔══╝  
  ╚██████╔╝██║     
   ╚═════╝ ╚═╝     
          `}
        </pre>
        <div className="space-y-0.5 text-sm">
          <p><span className="text-folder-blue font-bold">OS:</span> CreativityOS 15.0</p>
          <p><span className="text-folder-blue font-bold">Host:</span> Izi Oussama Portfolio</p>
          <p><span className="text-folder-blue font-bold">Kernel:</span> React 19.0.0</p>
          <p><span className="text-folder-blue font-bold">Uptime:</span> 5+ years</p>
          <p><span className="text-folder-blue font-bold">Shell:</span> nextjs-portfolio</p>
          <p><span className="text-folder-blue font-bold">Resolution:</span> 1920x1080</p>
          <p><span className="text-folder-blue font-bold">DE:</span> Tailwind CSS</p>
          <p><span className="text-folder-blue font-bold">WM:</span> Framer Motion</p>
          <p><span className="text-folder-blue font-bold">Terminal:</span> kitty</p>
          <p><span className="text-folder-blue font-bold">CPU:</span> Brain 8-core</p>
          <p><span className="text-folder-blue font-bold">Memory:</span> ∞ ideas</p>
        </div>
      </div>
    );
  }

  if (trimmed === "sudo rm -rf /") {
    return (
      <div>
        <p className="text-red-500 font-bold">Nice try.</p>
        <p className="text-text-light text-sm mt-1">Permission denied. This portfolio is protected by passion.</p>
      </div>
    );
  }

  if (trimmed === "") return null;

  return <span className="text-red-500">Command not found: {input}. Type 'help' for available commands.</span>;
}

interface TerminalAppProps {
  onOpenApp?: (id: string) => void;
}

export default function TerminalApp({ onOpenApp }: TerminalAppProps) {
  const [history, setHistory] = useState<Command[]>([
    { input: "", output: <pre className="text-green-600 text-xs leading-tight whitespace-pre">{WELCOME}</pre> },
  ]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const output = getOutput(input, onOpenApp || (() => {}));
    
    if (input.trim().toLowerCase() === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { input, output }]);
    }
    
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const commands = history.filter((h) => h.input).map((h) => h.input);
      if (historyIndex < commands.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commands[commands.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commands = history.filter((h) => h.input).map((h) => h.input);
        setInput(commands[commands.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className="h-full flex flex-col font-mono text-sm cursor-text bg-[#1e1e2e] text-white rounded-lg -m-6 p-6"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto custom-scrollbar space-y-3 pb-4">
        <AnimatePresence initial={false}>
          {history.map((cmd, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
            >
              {cmd.input && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-400">➜</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-white/80">{cmd.input}</span>
                </div>
              )}
              <div className="text-white/70 pl-6">{cmd.output}</div>
            </motion.div>
          ))}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400">➜</span>
          <span className="text-cyan-400">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white/80 caret-cyan-400"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certificateImages, desktopItems } from "@/lib/data";
import { useWindowManager } from "../hooks/useWindowManager";
import FolderIcon from "./FolderIcon";
import Window from "./Window";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import AboutApp from "./apps/AboutApp";
import ProjectsApp from "./apps/ProjectsApp";
import SkillsApp from "./apps/SkillsApp";
import ContactApp from "./apps/ContactApp";
import TerminalApp from "./apps/TerminalApp";
import SplineBackground from "./SplineBackground";

const appTitles: Record<string, string> = {
  about: "About Me",
  projects: "Projects",
  skills: "Skills",
  contact: "Contact",
  terminal: "Terminal",
  react: "React",
  nodejs: "Node.js",
  nextjs: "Next.js",
  html: "HTML5",
  certificate: "Certificate Simplone",
  project1: "Ecommerce Project",
  resume: "Resume.pdf",
};

const MemoizedFolderIcon = memo(FolderIcon);
const MemoizedWindow = memo(Window);

type DesktopItem = {
  id: string;
  name: string;
  icon: string;
  angle: number;
  radius: number;
  appType?: string;
  imageSrc?: string;
  width?: number;
  height?: number;
  size?: "small" | "medium" | "large";
};

function ImageViewer({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-[#0a0a0f]">
      <div className="relative w-full max-w-2xl aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <img src={src} alt={name} className="w-full h-full object-contain" loading="lazy" />
      </div>
      <p className="mt-4 text-sm font-medium text-white/60">{name}</p>
    </div>
  );
}

function CertificateGallery() {
  return (
    <div className="h-full overflow-auto bg-[#0a0a0f] p-6 custom-scrollbar">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {certificateImages.map((image) => (
          <div key={image.src} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-black/30">
              <img src={image.src} alt={image.name} className="h-full w-full object-contain" loading="lazy" />
            </div>
            <p className="mt-3 text-sm font-medium text-white/70">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getAppComponent(id: string, openWindowFn: (id: string, title: string) => void) {
  const components: Record<string, React.ReactNode> = {
    about: <AboutApp isDark={true} />,
    projects: <ProjectsApp isDark={true} />,
    skills: <SkillsApp isDark={true} />,
    contact: <ContactApp isDark={true} />,
    terminal: <TerminalApp onOpenApp={(appId) => { openWindowFn(appId, appTitles[appId] || appId); }} />,
    nodejs: <TerminalApp onOpenApp={(appId) => openWindowFn(appId, appTitles[appId] || appId)} />,
    nextjs: <TerminalApp onOpenApp={(appId) => openWindowFn(appId, appTitles[appId] || appId)} />,
    html: <TerminalApp onOpenApp={(appId) => openWindowFn(appId, appTitles[appId] || appId)} />,
    certificate: <CertificateGallery />,
    project1: <ImageViewer src="/project-ecommerce.jpg" name="Ecommerce Project" />,
    resume: <ImageViewer src="/resume.pdf" name="Resume.pdf" />,
  };
  return components[id] || <AboutApp isDark={true} />;
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return Math.min(prev + Math.random() * 15 + 5, 100);
      });
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">IZI</h1>
        <p className="text-xs text-white/40 tracking-[0.4em] uppercase mt-3">Oussama</p>
      </motion.div>
      <div className="mt-16 w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
}

// ─── MOBILE WELCOME HEADER ─────────────────────────────────────
// z-5 so it stays below windows (z-20) and below the LinkedIn button (z-10)
function MobileWelcomeHeader() {
  const phrases = [
    "Welcome to IZI Oussama's Portfolio",
    "Building the web, one pixel at a time",
    "Hire me — I turn ideas into code",
    "React • Next.js • Node.js • TypeScript",
    "Let's build something amazing together",
    "Available for freelance & full-time roles",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="absolute top-[20%] left-0 right-0 -translate-y-1/2 z-[5] pointer-events-none flex flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-center max-w-sm"
        >
          <h1 
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
          >
            {phrases[currentIndex]}
          </h1>
          <p 
            className="mt-3 text-sm sm:text-base text-cyan-400/80 tracking-widest uppercase font-medium"
            style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Tap an icon below to explore
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── LINKEDIN GET IN TOUCH BUTTON ──────────────────────────────
function LinkedInButton({ hasWindows }: { hasWindows: boolean }) {
  return (
    <div className={`absolute bottom-28 left-0 right-0 z-10 flex items-center justify-center pointer-events-auto transition-opacity duration-500 ${hasWindows ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <motion.a
        href="https://linkedin.com/in/oussama-izi"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A66C2] text-white font-semibold text-sm shadow-lg shadow-[#0A66C2]/30 border border-white/10 backdrop-blur-sm"
        style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        Get in Touch
      </motion.a>
    </div>
  );
}

export default function Desktop() {
  const [isLoading, setIsLoading] = useState(true);
  const [showDesktop, setShowDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const DESKTOP_DELAY = 2000;

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, isOpen, isMinimized } = useWindowManager();
  const activeApp = windows.find((w) => !w.isMinimized)?.title || "Finder";
  const hasOpenWindows = windows.length > 0;

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => {
      setShowDesktop(true);
    }, DESKTOP_DELAY);
  }, []);

  const splineBackground = useMemo(() => <SplineBackground />, []);
  const allItems = useMemo<DesktopItem[]>(() => desktopItems as DesktopItem[], []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative w-full h-screen overflow-hidden bg-black">

          {/* ═══════════════════════════════════════════════════════
              LAYER 0: Spline Background (lowest z-index)
              pointer-events-auto so mouse moves reach the canvas
              ═══════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 z-0 pointer-events-auto">
            {splineBackground}
          </div>

          {/* Center Text — pointer-events-none so mouse passes through to Spline */}
          <div className="absolute bottom-32 left-0 right-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 hidden md:flex">
            <p className="text-xs text-white/30 tracking-[0.3em] uppercase mb-2">
              Welcome to my <span className="text-cyan-400/60">Portfolio</span>
            </p>
            <h2 className="text-xl md:text-2xl text-white/80 font-light text-center max-w-md leading-relaxed">
              I build modern, responsive, and<br />
              user-focused web experiences.
            </h2>
          </div>

          {/* MOBILE: Welcome Header (visible only on mobile) — centered vertically, z-5 */}
          {isMobile && showDesktop && <MobileWelcomeHeader />}

          {/* MOBILE: LinkedIn Get in Touch Button — above dock, hides when window open */}
          {isMobile && showDesktop && <LinkedInButton hasWindows={hasOpenWindows} />}

          {/* ═══════════════════════════════════════════════════════
              LAYER 1: Folders, Windows, Dock, MenuBar
              The wrapper is pointer-events-none so mouse moves over
              empty areas still reach the Spline canvas below.
              Only the interactive children re-enable pointer events.
              ═══════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {showDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 z-10 pointer-events-none"
              >

                {/* Folder icons — HIDDEN on mobile, visible on md+ */}
                <div className="hidden md:block pointer-events-auto">
                  {allItems.map((folder) => (
                    <MemoizedFolderIcon
                      key={folder.id}
                      id={folder.id}
                      name={folder.name}
                      angle={folder.angle}
                      radius={folder.radius}
                      isFile={folder.icon === "file"}
                      isApp={folder.icon === "app"}
                      isPdf={folder.icon === "pdf"}
                      isImage={folder.icon === "image"}
                      appType={folder.appType}
                      imageSrc={folder.imageSrc}
                      width={folder.width}
                      height={folder.height}
                      size={folder.size}
                      isDark={true}
                      onOpen={() => {
                        if (folder.id === "react") window.open("https://react.dev", "_blank");
                        if (folder.id === "nodejs") window.open("https://nodejs.org", "_blank");
                        else if (folder.id === "nextjs") window.open("https://nextjs.org", "_blank");
                        else if (folder.id === "html") window.open("https://developer.mozilla.org/en-US/docs/Web/HTML", "_blank");
                        else if (folder.id === "resume") window.open("/resume.pdf", "_blank");
                        else openWindow(folder.id, folder.name);
                      }}
                    />
                  ))}
                </div>

                {/* ═══════════════════════════════════════════════════════
                    LAYER 2: Windows (highest z-index = z-20)
                    pointer-events-auto so windows are fully interactive
                    On mobile: fixed inset-0 for TRUE fullscreen
                    On desktop: normal draggable positioned windows
                    ═══════════════════════════════════════════════════════ */}
                <AnimatePresence>
                  {windows.map((win) => (
                    <div
                      key={win.id}
                      className="pointer-events-auto"
                      style={
                        isMobile
                          ? {
                              position: "fixed",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              zIndex: 20,
                              width: "100vw",
                              height: "100vh",
                            }
                          : {
                              position: "absolute",
                              left: win.position?.x || 100,
                              top: win.position?.y || 100,
                              zIndex: 20,
                            }
                      }
                    >
                      <MemoizedWindow
                        window={win}
                        isDark={true}
                        isMobile={isMobile}
                        onClose={() => closeWindow(win.id)}
                        onMinimize={() => minimizeWindow(win.id)}
                        onMaximize={() => maximizeWindow(win.id)}
                        onFocus={() => focusWindow(win.id)}
                        onDrag={(pos) => {
                          if (!isMobile) updatePosition(win.id, pos);
                        }}
                      >
                        {getAppComponent(win.id, openWindow)}
                      </MemoizedWindow>
                    </div>
                  ))}
                </AnimatePresence>

                {/* MenuBar — ALWAYS visible on all devices */}
                <div className="pointer-events-auto">
                  <MenuBar activeApp={activeApp} isDark={true} />
                </div>

                {/* Dock — ALWAYS visible (mobile + desktop) */}
                <div className="pointer-events-auto">
                  <Dock
                    onOpenApp={(id) => {
                      const title = appTitles[id] || id;
                      openWindow(id, title);
                    }}
                    openApps={allItems.map((f) => f.id).filter((id) => isOpen(id))}
                    minimizedApps={allItems.map((f) => f.id).filter((id) => isMinimized(id))}
                    isDark={true}
                  />
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
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

export default function Desktop() {
  const [isLoading, setIsLoading] = useState(true);
  const [showDesktop, setShowDesktop] = useState(false);
  const DESKTOP_DELAY = 2000;
  
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, isOpen, isMinimized } = useWindowManager();
  const activeApp = windows.find((w) => !w.isMinimized)?.title || "Finder";

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
          <div className="absolute bottom-32 left-0 right-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">
            <p className="text-xs text-white/30 tracking-[0.3em] uppercase mb-2">
              Welcome to my <span className="text-cyan-400/60">Portfolio</span>
            </p>
            <h2 className="text-xl md:text-2xl text-white/80 font-light text-center max-w-md leading-relaxed">
              I build modern, responsive, and<br />
              user-focused web experiences.
            </h2>
          </div>

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

                {/* Folder icons — re-enable pointer events */}
                <div className="pointer-events-auto">
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
                        else if (folder.id === "terminal") openWindow(folder.id, folder.name);
                        else openWindow(folder.id, folder.name);
                      }}
                    />
                  ))}
                </div>

                {/* ═══════════════════════════════════════════════════════
                    LAYER 2: Windows (highest z-index)
                    pointer-events-auto so windows are fully interactive
                    ═══════════════════════════════════════════════════════ */}
                <AnimatePresence>
                  {windows.map((win) => (
                    <div
                      key={win.id}
                      className="absolute z-20 pointer-events-auto"
                      style={{ left: win.position?.x || 100, top: win.position?.y || 100 }}
                    >
                      <MemoizedWindow
                        window={win}
                        isDark={true}
                        onClose={() => closeWindow(win.id)}
                        onMinimize={() => minimizeWindow(win.id)}
                        onMaximize={() => maximizeWindow(win.id)}
                        onFocus={() => focusWindow(win.id)}
                        onDrag={(pos) => updatePosition(win.id, pos)}
                      >
                        {getAppComponent(win.id, openWindow)}
                      </MemoizedWindow>
                    </div>
                  ))}
                </AnimatePresence>

                {/* MenuBar — re-enable pointer events */}
                <div className="pointer-events-auto">
                  <MenuBar activeApp={activeApp} isDark={true} />
                </div>

                {/* Dock — re-enable pointer events */}
                <div className="pointer-events-auto">
                  <Dock
                    onOpenApp={openWindow}
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
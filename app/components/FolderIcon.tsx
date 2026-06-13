"use client";

import { motion } from "framer-motion";
import { FileText, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface FolderIconProps {
  id: string;
  name: string;
  position?: { x: number; y: number };
  angle?: number;
  radius?: number;
  isFile?: boolean;
  isApp?: boolean;
  isImage?: boolean;
  isPdf?: boolean; // NEW: PDF icon
  appType?: string;
  imageSrc?: string;
  width?: number;
  height?: number;
  size?: "small" | "medium" | "large";
  isDark: boolean;
  onOpen: () => void;
}

// Convert an angle to a responsive top-half elliptical orbit.
function calculatePosition(angle: number, radius: number, screenWidth: number, screenHeight: number) {
  const angleRad = (angle * Math.PI) / 180;
  const centerX = screenWidth / 2;
  const centerY = screenHeight * 0.8;
  const radiusScale = radius > 8 ? radius / 360 : radius;
  const radiusX = Math.min(screenWidth * 0.35, 760) * radiusScale;
  const radiusY = Math.min(screenHeight * 0.70, 700) * radiusScale;
  
  return {
    x: centerX + radiusX * Math.cos(angleRad),
    y: centerY + radiusY * Math.sin(angleRad),
  };
}

const PDFIcon = () => (
  <svg viewBox="0 0 128 128" className="w-10 h-10">
    <path fill="#e74c3c" d="M108 8H20c-4.4 0-8 3.6-8 8v104c0 4.4 3.6 8 8 8h88c4.4 0 8-3.6 8-8V16c0-4.4-3.6-8-8-8z"/>
    <path fill="#c0392b" d="M108 8H20c-4.4 0-8 3.6-8 8v104c0 4.4 3.6 8 8 8h88c4.4 0 8-3.6 8-8V16c0-4.4-3.6-8-8-8z" opacity="0.3"/>
    <path fill="#fff" d="M28 48h72v4H28zm0 12h72v4H28zm0 12h48v4H28z"/>
    <text x="64" y="95" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Arial">PDF</text>
  </svg>
);

const NodeJSIcon = () => (
  <svg viewBox="0 0 128 128" className="w-10 h-10">
    <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623c-.712 0-2.306 1.061-2.306 1.774v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754c1.417.841 3.027 1.246 4.647 1.246 1.642 0 3.25-.406 4.669-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .691-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z" />
  </svg>
);

const NextJSIcon = ({ isDark }: { isDark: boolean }) => (
  <svg viewBox="0 0 128 128" className="w-10 h-10">
    <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z" fill={isDark ? "#fff" : "#000"} />
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const HTMLIcon = () => (
  <svg viewBox="0 0 128 128" className="w-10 h-10">
    <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z" />
    <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z" />
    <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H34.641l1.928 21.609 28.193 7.826.063-.017z" />
    <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z" />
  </svg>
);

const TerminalIcon = ({ isDark }: { isDark: boolean }) => (
  <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${isDark ? "bg-[#1a1a2e] border border-cyan-400/30" : "bg-[#2d2d3d] border border-gray-600"}`}>
    <Terminal size={22} className={isDark ? "text-cyan-400" : "text-green-400"} />
    <div className="absolute bottom-1 right-1.5 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
  </div>
);

const AppIconWrapper = ({ children, isDark, size = "medium" }: { children: React.ReactNode; isDark: boolean; size?: string }) => {
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
    large: "w-20 h-20",
  };
  
  return (
    <div className="relative group">
      <div className={`
        ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.medium}
        rounded-2xl flex items-center justify-center transition-all duration-300
        ${isDark 
          ? "bg-[#1e1e2e]/80 border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] group-hover:border-cyan-400/40" 
          : "bg-white/80 border border-gray-200 shadow-lg group-hover:shadow-xl group-hover:border-folder-blue/40"
        }
      `}>
        {children}
      </div>
      <div className={`
        absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300
        ${isDark ? "bg-cyan-400/60 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-folder-blue/60 group-hover:bg-folder-blue"}
      `} />
    </div>
  );
};

const ImageThumbnail = ({ src, width, height, isDark, name }: { src: string; width?: number; height?: number; isDark: boolean; name: string }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative group">
      <div
        className={`
          relative overflow-hidden rounded-lg shadow-lg transition-all duration-300
          ${isDark
            ? "border border-white/10 bg-[#1e1e2e]/80 shadow-[0_0_20px_rgba(34,211,238,0.05)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] group-hover:border-cyan-400/30"
            : "border border-gray-200 bg-white shadow-lg group-hover:shadow-xl group-hover:border-folder-blue/30"
          }
        `}
        style={{ width: width || 120, height: height || 160 }}
      >
        {hasError ? (
          <div className={`flex h-full w-full items-center justify-center ${isDark ? "text-cyan-400/70" : "text-folder-blue"}`}>
            <FileText size={Math.min(width || 120, height || 160) * 0.42} />
          </div>
        ) : (
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={`${width || 120}px`}
            onError={() => setHasError(true)}
          />
        )}
        <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isDark ? "bg-cyan-400/10" : "bg-folder-blue/10"}`} />
      </div>
      <div className="absolute top-0 right-0 w-4 h-4 rounded-bl-lg bg-gradient-to-bl from-white/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default function FolderIcon({ 
  name, 
  position, 
  angle, 
  radius, 
  isFile, 
  isApp, 
  isImage, 
  isPdf, // NEW: PDF prop
  appType, 
  imageSrc, 
  width, 
  height, 
  size = "medium",
  isDark, 
  onOpen 
}: FolderIconProps) {
  
  // Calculate position from angle/radius or use legacy position
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
   if (angle === -90) {
  console.log("cent
    erX:", window.innerWidth / 2);
  console.log("nodeX:", newPos.x);
      const updatePosition = () => {
        const newPos = calculatePosition(angle, radius, window.innerWidth, window.innerHeight);
        setPos(newPos);
      };
      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => window.removeEventListener("resize", updatePosition);
    } else if (position) {
      const frame = requestAnimationFrame(() => setPos(position));
      return () => cancelAnimationFrame(frame);
    }
  }, [angle, radius, position]);

  const renderIcon = () => {
    // PDF icon — separate from app icons
    if (isPdf) {
      return <AppIconWrapper isDark={isDark} size={size}><PDFIcon /></AppIconWrapper>;
    }

    if (isImage && imageSrc) {
      return <ImageThumbnail src={imageSrc} width={width} height={height} isDark={isDark} name={name} />;
    }

    if (isFile) {
      return (
        <div className={`w-16 h-20 rounded-lg flex items-center justify-center shadow-md transition-all group-hover:shadow-xl ${isDark ? "bg-[#2a2a3c] text-cyan-400" : "bg-white text-folder-blue"}`}>
          <FileText size={32} />
        </div>
      );
    }

    if (isApp) {
      switch (appType) {
        case "nodejs":
          return <AppIconWrapper isDark={isDark} size={size}><NodeJSIcon /></AppIconWrapper>;
        case "react":
          return <AppIconWrapper isDark={isDark} size={size}><ReactIcon /></AppIconWrapper>;
        case "nextjs":
          return <AppIconWrapper isDark={isDark} size={size}><NextJSIcon isDark={isDark} /></AppIconWrapper>;
        case "html":
          return <AppIconWrapper isDark={isDark} size={size}><HTMLIcon /></AppIconWrapper>;
        case "terminal":
          return <AppIconWrapper isDark={isDark} size={size}><TerminalIcon isDark={isDark} /></AppIconWrapper>;
        default:
          return <AppIconWrapper isDark={isDark} size={size}><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500" /></AppIconWrapper>;
      }
    }

    // Default folder
    return (
      <div className="relative w-20 h-16 drop-shadow-md transition-shadow group-hover:drop-shadow-xl">
        <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
          <path d="M6 12C6 8.686 8.686 6 12 6H28L32 12H68C71.314 12 74 14.686 74 18V52C74 55.314 71.314 58 68 58H12C8.686 58 6 55.314 6 52V12Z" fill={isDark ? "#3a3a50" : "#4a90c6"} />
          <path d="M2 20C2 16.686 4.686 14 8 14H72C75.314 14 78 16.686 78 20V56C78 59.314 75.314 62 72 62H8C4.686 62 2 59.314 2 56V20Z" fill={isDark ? "url(#folderGradientDark)" : "url(#folderGradient)"} />
          <path d="M2 20C2 16.686 4.686 14 8 14H72C75.314 14 78 16.686 78 20V24C78 24 50 26 2 24V20Z" fill="white" fillOpacity="0.12" />
          <defs>
            <linearGradient id="folderGradient" x1="40" y1="14" x2="40" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7bbde8" /><stop offset="1" stopColor="#5ba3d9" />
            </linearGradient>
            <linearGradient id="folderGradientDark" x1="40" y1="14" x2="40" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5a5a7a" /><stop offset="1" stopColor="#4a4a68" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
      className="absolute z-10 flex flex-col items-center gap-2 cursor-pointer group select-none"
      style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
      onClick={onOpen}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      {renderIcon()}
      <span className={`px-2.5 py-1 rounded-md text-sm font-medium backdrop-blur-sm transition-colors shadow-sm ${isDark ? "text-white/70 bg-white/5 group-hover:bg-cyan-400/20 group-hover:text-white" : "text-text-light bg-white/60 group-hover:bg-folder-blue/20 group-hover:text-text"}`}>
        {name}
      </span>
    </motion.div>
  );
}

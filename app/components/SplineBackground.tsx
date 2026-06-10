"use client";

import { useEffect, useRef } from "react";

export default function SplineBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if already initialized
    if (container.querySelector("spline-viewer")) return;

    // Create viewer element
    const viewer = document.createElement("spline-viewer") as any;
    viewer.setAttribute("url", "https://prod.spline.design/edusSYPjF9gTwo9S/scene.splinecode");
    viewer.style.width = "100%";
    viewer.style.height = "100%";
    viewer.style.position = "absolute";
    viewer.style.top = "0";
    viewer.style.left = "0";


    container.appendChild(viewer);

    // Load script only once
    if (!document.querySelector('script[data-spline="viewer"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.12.97/build/spline-viewer.js";
      script.async = true;
      script.setAttribute("data-spline", "viewer");
      document.body.appendChild(script);
    }

    return () => {
      // Don't remove on re-render
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}
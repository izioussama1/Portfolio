export const desktopItems = [
  {
    id: "contact",
    name: "Contact",
    icon: "folder",
    angle: -180,
    radius: 1,
    size: "medium",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "app",
    appType: "terminal",
    angle: -162,
    radius: 1,
    size: "small",
  },
  {
    id: "projects",
    name: "Projects",
    icon: "folder",
    angle: -144,
    radius: 1,
    size: "medium",
  },
  {
    id: "certificate",
    name: "Certificate",
    icon: "folder",
    angle: -126,
    radius: 1,
    size: "medium",
  },
  {
    id: "react",
    name: "React",
    icon: "app",
    appType: "react",
    angle: -108,
    radius: 1,
    size: "small",
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: "app",
    appType: "nodejs",
    angle: -90,
    radius: 1,
    size: "small",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "app",
    appType: "nextjs",
    angle: -72,
    radius: 1,
    size: "small",
  },
  {
    id: "html",
    name: "HTML5",
    icon: "app",
    appType: "html",
    angle: -54,
    radius: 1,
    size: "small",
  },
  {
    id: "about",
    name: "About me",
    icon: "folder",
    angle: -36,
    radius: 1,
    size: "medium",
  },
  {
    id: "skills",
    name: "Skills",
    icon: "folder",
    angle: -18,
    radius: 1,
    size: "medium",
  },
  {
    id: "resume",
    name: "Resume.pdf",
    icon: "pdf",
    angle: -0,
    radius: 1,
    size: "medium",
  },
];

export const certificateImages = [
  { src: "/certificate-1.jpg", name: "Certificate 1" },
  { src: "/certificate-2.jpg", name: "Certificate 2" },
];

export const dockApps = [
  { id: "about", name: "About Me", icon: "user" },
  { id: "projects", name: "Projects", icon: "briefcase" },
  { id: "skills", name: "Skills", icon: "zap" },
  { id: "contact", name: "Contact", icon: "mail" },
  { id: "terminal", name: "Terminal", icon: "terminal" },
];

export const projects = [
  { id: 1, title: "Nexus Commerce", desc: "Full-stack e-commerce with Stripe, real-time inventory, and admin dashboard.", tags: ["Next.js", "Prisma", "Stripe"], year: "2024" },
  { id: 2, title: "Aura Analytics", desc: "Real-time data visualization with WebSocket and drag-and-drop widgets.", tags: ["React", "D3.js", "Node.js"], year: "2024" },
  { id: 3, title: "Flux Social", desc: "Social platform with real-time messaging and AI content recommendations.", tags: ["Next.js", "Socket.io", "Redis"], year: "2023" },
  { id: 4, title: "Zenith AI", desc: "AI content generation suite with image synthesis and model fine-tuning.", tags: ["Python", "FastAPI", "React"], year: "2023" },
  { id: 5, title: "Vertex 3D", desc: "Interactive 3D product configurator with AR preview.", tags: ["Three.js", "R3F", "WebGL"], year: "2023" },
  { id: 6, title: "Prisma CMS", desc: "Headless CMS with visual editor and multi-tenant architecture.", tags: ["Next.js", "GraphQL", "Docker"], year: "2022" },
];

export const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "MongoDB", "Prisma", "GraphQL", "REST"] },
  { category: "Design", items: ["Figma", "UI/UX", "Prototyping", "Design Systems", "Illustrator"] },
  { category: "DevOps", items: ["Git", "Docker", "AWS", "Vercel", "Linux", "CI/CD"] },
];

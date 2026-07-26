import { User, FolderGit2, BadgeCheck, Trophy, Send, Briefcase } from "lucide-react";
import avatarImg from '../assets/avatar.jpg';
import { resume } from "react-dom/server";
import { image } from "framer-motion/client";
import { PROJECT_IMAGES } from "./imagesProjects";

export const ACCENT = "#1DB954";
export const ACCENT_BRIGHT = "#1ed760";

export const SPOTIFY_PLAYLIST_ID = '1Qtx91HoyTSXLp6j744lhz';

export const PERSONAL_INFO = {
  name: "Aisah Atik Fitriani",
  role: "Web Developer || Back-End Developer",
  location: "Indonesia",
  status: "Available for Work",
  bio: "Information Technology graduate specializing in Backend Development, with hands-on experience in Laravel, PHP, and MySQL. Skilled in developing RESTful APIs, designing relational databases, and building efficient data-driven applications. A detail-oriented and quick learner with strong problem-solving skills and a passion for creating reliable and scalable backend solutions.",
};

export const SKILLS = {
  "Frontend": ["React", "Blade", "JavaScript", "TypeScript","Tailwind", "Bootstrap"],
  "Backend": ["Laravel", "Node.js", "Express", "Python", "REST API", "MySQL"],
  "Design Tools": ["Figma", "Canva", "Adobe Illustrator"],
  "Development": ["Github", "Gitlab", "XAMPP", "Laragon", "Docker", "Linux"],
};

export const SOCIALS = {
  resume: "https://drive.google.com/file/d/1oncxgJ4Oo3qBvLfN0TRIas2Q4eWYkr1u/view?usp=sharing",
  github: "https://github.com/eshhteh",
  linkedin: "https://www.linkedin.com/in/aisyah-fitriani/",
  instagram: "https://www.instagram.com/fitriaaiii_/",
};

export const PHOTO_SRC =
  avatarImg +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#2f8f4e'/>
          <stop offset='100%' stop-color='#0d2b16'/>
        </linearGradient>
      </defs>
      <rect width='200' height='200' fill='url(#g)'/>
      <circle cx='100' cy='78' r='34' fill='rgba(255,255,255,0.85)'/>
      <path d='M40 190 C40 140 70 118 100 118 C130 118 160 140 160 190 Z' fill='rgba(255,255,255,0.85)'/>
    </svg>
  `);

export const NAV = [
  { id: "about-me", label: "About", icon: User },
  { id: "work", label: "Work Experience", icon: Briefcase  },
  { id: "project", label: "Projects", icon: FolderGit2 },
  { id: "certification", label: "Certifications", icon: BadgeCheck },
  { id: "award", label: "Awards", icon: Trophy },
  { id: "contact", label: "Contact", icon: Send },
];

export const WORK_EXPERIENCE = [
  {
    id: 1,
    role: "Teaching Assistant / Instructor — User Evaluation Course",
    company: "Universitas Muhammadiyah Yogyakarta",
    period: "2 February 2026 — 21 June 2026",
    location: "Yogyakarta, Indonesia",
    desc: "Responsible for delivering learning and practical sessions for the User Evaluation course across 2 classes with approximately 75 students, managing and maintaining student attendance records to ensure data accuracy, completeness, and proper documentation throughout the semester, and supporting the assessment and grading process for Ujian Capaian Pembelajaran (UCP), contributing to the evaluation of 40% of the overall UCP grading components.",
  },
  {
    id: 2,
    role: "Lecturer's Project Assistant",
    company: "Universitas Muhammadiyah Yogyakarta",
    period: "20 November 2025 — 20 January 2026",
    location: "Remote",
    desc: "Responsible for a 3-month project assistant role in developing a web-based attendance system using face recognition and QR Code, focusing on full-stack development and successfully supporting efficient check-ins for more than 250 event participants.",
  },
  {
    id: 3,
    role: "Backend Developer Internship",
    company: "PT Razen Teknologi Indonesia",
    period: "01 October 2024 — 31 December 2024",
    location: "Yogyakarta, Indonesia",
    desc: "Responsible for backend development as part of a 3-person team for a village population information system. Designed system specifications, system architecture, and database relationships, and completed the backend within approximately 4 weeks across 4 main modules.",
  },
  {
    id: 4,
    role: "Teaching Assistant — Cybersecurity Course",
    company: "Universitas Muhammadiyah Yogyakarta",
    period: "06 February 2024 — 30 June 2024",
    location: "Yogyakarta, Indonesia",
    desc: "Responsible for approximately 80% of the implementation of Cybersecurity practicum activities, serving as a Teaching Assistant and managing student assignments and attendance throughout the course.",
  },
];

export const CATEGORIES = ["All", "Fullstack", "Frontend", "Backend"];

export const PROJECTS = [
  { 
    id: 1, 
    title: "PresenSee", 
    desc: "A web-based student attendance system that leverages Face Recognition technology to automate attendance recording. The platform enables fast and accurate attendance verification while providing real-time attendance management and reporting for teachers and school administrators.", 
    stack: "Laravel · MySQL · Blade · TailwindCSS · Javascript · Python · REST API", 
    image: "/presenseeP.png",
    images: PROJECT_IMAGES.presensee,
    cat: "Fullstack", 
    grad: ["#ff5c8a", "#66103a"], 
    glyph: "PS",
    github: "https://github.com/eshhteh/PresenSee.git",
    link:"https://drive.google.com/file/d/13iS7vtUOONzFN6quEmuj-zXYMBOHyYyj/view?usp=sharing", 
  },
  { 
    id: 2, 
    title: "Digital Event Check-In System", 
    desc: "A web-based event attendance system that enables participants to log in using a unique participant code and complete check-in through QR Code or Face Recognition. The platform provides secure verification, real-time attendance tracking, and efficient participant management for events.", 
    stack: "Laravel · MySQL · InertiaJS · TypeScript · TailwindCSS · html5-qrcode · FastAPI · InsightFace · Docker", 
    image: "",
    images: PROJECT_IMAGES.eventCheck,
    cat: "Fullstack", 
    grad: [ACCENT, "#0d3d1e"], 
    glyph: "DECIS",
    github: "https://github.com/eshhteh/Event-CheckIn.git",
  },
  { 
    id: 3, 
    title: "Personal Portofolio", 
    desc: "A modern and responsive portfolio website built with React to showcase my projects, skills, and experience through a clean and user-friendly interface.", 
    stack: "React · TailwindCSS · Javascript", 
    image: "/porto.png",
    images: PROJECT_IMAGES.porto,
    cat: "Frontend", 
    grad: ["#4ecbff", "#0d3a66"], 
    glyph: "PP",
    github: "https://github.com/eshhteh/My-Portofolio.git",
    link:"hashjaj",
  },
  { 
    id: 4, 
    title: "Village Population Information System", 
    desc: "A web-based information system that enables residents to securely access and manage personal data while submitting village administrative service requests, including birth, death, and relocation registrations. The platform streamlines administrative processes and improves the efficiency of public service delivery.", 
    stack: "Laravel · MySQL · JSON · REST API · Git · Postman", 
    image: "/magangP.png",
    images: PROJECT_IMAGES.magang,
    cat: "Backend", 
    grad: ["#8e4bff", "#2a0d66"], 
    glyph: "VPIS",
    github: "https://github.com/eshhteh/Village-Population-Information-System.git",
    docs:"https://docs.google.com/document/d/1HJs3FGm6wo2BfAvWuENDKvKUhPo-cuq8wWwX3QLxUwE/edit?usp=sharing",
    link:"https://documenter.getpostman.com/view/31701128/2sAYJ1jMc4",
  },
  { 
    id: 5, 
    title: "Socio-Economic Information System", 
    desc: "A web-based information system for the Sendangarum Village Office, Sleman, Yogyakarta, designed to manage population and socio-economic data. The system streamlines administrative processes, improves data accuracy, and supports efficient, responsive public service delivery.", 
    stack: "Laravel · MySQL · Blade · TailwindCSS · Javascript",
    image: "/capstoneP.png", 
    images: PROJECT_IMAGES.capstone,
    cat: "Fullstack", 
    grad: ["#3a6df0", "#0b1a4d"], 
    glyph: "SE",
    github: "https://github.com/eshhteh/Socio-Economic-Information-System.git", 
  },
  { 
    id: 6, 
    title: "Web-based Library Management System", 
    desc: "A simple web-based library management system for managing book collections, member data, and borrowing transactions. The system simplifies lending and return processes while improving record accuracy and operational efficiency.", 
    stack: "Laravel · MySQL · Blade · TailwindCSS · Javascript", 
    image: "/libraryP.png",
    images: PROJECT_IMAGES.perpus,
    cat: "Fullstack", 
    grad: ["#ff8a3d", "#66230d"], 
    glyph: "LMS",
    github: "https://github.com/eshhteh/Library-Management-System.git",
  },
  
];

export const IMAGESCAPSTONE = {
  "../src/assets/capstoneP.png": "capstoneP.png",
  "../src/assets/magangP.png": "magangP.png",
  "../src/assets/libraryP.png": "libraryP.png",
  "../src/assets/presenseeP.png": "presenseeP.png",
  "../src/assets/decisP.png": "decisP.png",
  "../src/assets/pp.png": "pp.png",
};

export const CERTIFICATIONS = [
  { id: 1, title: "Web Developer Certification", issuer: "Badan Nasional Sertifikasi Profesi (BNSP)", year: "2025", grad: ["#ff8a3d", "#66230d"], link:"https://drive.google.com/file/d/18RvOEbDWLm6zD-uCQKvw6X7cbE60pRU5/view?usp=sharing" },
  { id: 2, title: "Microsoft Office Specialist Excel 2019", issuer: "Microsoft · Certiport", year: "2025", grad: ["#4285F4", "#1A56DB"], link:"https://drive.google.com/file/d/1HE2sH1vq_IQFv8EiH5RDmQtv4wTOoDSf/view?usp=sharing" },
  { id: 3, title: "Software Deployment", issuer: "TLab", year: "2024", grad: ["#8e4bff", "#2a0d66"], link:"https://drive.google.com/file/d/1amUBCIdyEjVl8cdvhNz8l49msL21vwwK/view?usp=sharing" },
  { id: 4, title: "Microsoft Azure Data Fundamentals I", issuer: "Microsoft", year: "2024", grad: ["#00C6FF", "#0072FF"], link:"https://drive.google.com/file/d/1Yl4zamec7pdbBcMCMbeEo9SSZP6cNhbT/view?usp=sharing" },
  { id: 5, title: "Microsoft Azure Data Fundamentals II", issuer: "Microsoft", year: "2024", grad: [ACCENT, "#0d3d1e"], link:"https://drive.google.com/file/d/10x4HxwwovB129eAS0nd5OMz8efAEbUYb/view?usp=sharing" },
  { id: 6, title: "Microsoft Azure Data Fundamentals III", issuer: "Microsoft", year: "2024", grad: ["#ff5c8a", "#66103a"], link:"https://drive.google.com/file/d/1BjC2evKuKUBO1aI_zrcPLHToeDfmM8YU/view?usp=sharing" },
  { id: 7, title: "Microsoft Azure Data Fundamentals IV", issuer: "Microsoft", year: "2024", grad: ["#2193B0", "#6DD5ED"], link:"https://drive.google.com/file/d/1L-SS4mqFO544LfsUn5w8KqvOuFSA3405/view?usp=sharing" },
  { id: 8, title: "Fundamentals of Responsible Generative AI", issuer: "Microsoft", year: "2024", grad: ["#FFD200", "#F7971E"], link:"https://drive.google.com/file/d/1SQB8DPjv9P34DrYsH3c7I3gyOSWnkP0F/view?usp=sharing" },
  { id: 9, title: "Fundamentals of Azure OpenAI Service", issuer: "Microsoft", year: "2024", grad: ["#5F2C82", "#49A09D"], link:"https://drive.google.com/file/d/1km6JE9-COYseFNlzeLAezRJtFvb3yFqQ/view?usp=sharing" },
];

export const AWARDS = [
  { id: 1, title: "Kompetisi Mahasiswa Muhammadiyah (KMM) dan Program Kreativitas Mahasiswa Muhammadiyah (PKMM)", org: "Asosiasi Sains dan Teknologi Perguruan Tinggi Muhammadiyah 'Aisyiyah (AST-PTMA)", desc: "Peraih Medali Emas Kategori PKM Karsa Cipta", year: "2024", grad: [ACCENT, "#0d3d1e"], link: "https://drive.google.com/file/d/1qQ-WyE5XgkeEgCPUgu7d-NirI0Hx87bh/view?usp=sharing" },
];
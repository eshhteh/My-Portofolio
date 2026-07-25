import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import HeroSection from './components/HeroSection';
import SpotifySection from './components/SpotifySection';
import ProjectSection from './components/ProjectSection';
import CertificationSection from './components/CertificationSection';
import AwardSection from './components/AwardSection';
import ContactSection from './components/ContactSection';
import PlayerBar from './components/PlayerBar';
import { PROJECTS } from './data/portfolioData';
import { styles } from './styles/portoStyle';
import AboutSection from './components/AboutSection';
import WorkExperienceSection from './components/WorkExperienceSection';


export default function Portfolio() {
  const [query, setQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(PROJECTS[0]);
  const [progress, setProgress] = useState(64);

  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.4)), 200);
    return () => clearInterval(t);
  }, [isPlaying]);

  // Auto-collapse sidebar di layar sempit
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handlePlayProject = (proj) => {
    if (nowPlaying.id === proj.id) { setIsPlaying((p) => !p); }
    else { setNowPlaying(proj); setIsPlaying(true); setProgress(4); }
  };

  return (
    <div style={styles.appWrap}>
      <div style={styles.app}>
        <Sidebar
          activeSection="about"
          scrollTo={scrollTo}
          width={sidebarWidth}
          setWidth={setSidebarWidth}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main id="scrollArea" style={styles.main}>
          <Topbar query={query} setQuery={setQuery} scrollTo={scrollTo} />
          <HeroSection scrollTo={scrollTo} />
          <AboutSection />
          <WorkExperienceSection />
          <ProjectSection query={query} isPlaying={isPlaying} nowPlaying={nowPlaying} handlePlayProject={handlePlayProject} />
          <CertificationSection />
          <AwardSection />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}
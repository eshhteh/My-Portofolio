import React, { useState, useEffect } from 'react';
import { Code2, Server, Database, Palette, Terminal } from 'lucide-react';
import { styles } from '../styles/portoStyle';
import { PERSONAL_INFO, SKILLS } from '../data/portfolioData';
import SpotifySection from './SpotifySection';

const MOBILE_BREAKPOINT = 768;

function useIsMobileLocal() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, []);
  return isMobile;
}

const CATEGORY_ICONS = {
  "Frontend": Code2,
  "Backend": Server,
  "Database": Database,
  "Design Tools": Palette,
  "Development": Terminal,
};

export default function AboutSection() {
  const isMobile = useIsMobileLocal();

  return (
    <section
      id="about-me"
      style={{ ...styles.section, textAlign: "left", ...(isMobile ? { padding: "24px 16px" } : {}) }}
    >
      <div style={styles.secHead}>
        <h2 style={{ ...styles.secH2, ...(isMobile ? { fontSize: 18 } : {}) }}>About Me</h2>
      </div>

      <div
        style={{
          ...styles.bioPanel,
          ...(isMobile ? { display: "flex", flexDirection: "column", gap: 20 } : {}),
        }}
      >
        <div>
          <p style={{ ...styles.bioP, ...(isMobile ? { fontSize: 13, lineHeight: 1.7 } : {}) }}>
            {PERSONAL_INFO.bio}
          </p>
        </div>

        <div>
          <SpotifySection compact />
        </div>
      </div>

      <div
        style={{
          ...styles.skillGrid,
          ...(isMobile ? { gridTemplateColumns: "1fr", gap: 12, marginTop: 20 } : {}),
        }}
      >
        {Object.entries(SKILLS).map(([category, skills]) => {
          const Icon = CATEGORY_ICONS[category] || Code2;
          return (
            <div
              key={category}
              style={{ ...styles.skillCard, ...(isMobile ? { padding: 14 } : {}) }}
            >
              <div style={styles.skillCategoryHeader}>
                <Icon size={14} style={{ color: "#3d8f56" }} />
                <span style={styles.skillCategoryLabel}>{category}</span>
              </div>
              <div style={styles.chipRowCompact}>
                {skills.map((skill) => (
                  <span key={skill} style={styles.skillChipSmall}>{skill}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SOCIALS, PERSONAL_INFO } from '../data/portfolioData';
import { styles } from '../styles/portoStyle';

const MOBILE_BREAKPOINT = 768;

function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", handler) : mq.addListener(handler);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", handler) : mq.removeListener(handler);
    };
  }, [breakpoint]);

  return isMobile;
}

const Github = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z"/>
  </svg>
);

const Linkedin = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/>
  </svg>
);

export default function Topbar({ query, setQuery, scrollTo }) {
  const isMobile = useIsMobile();


  if (isMobile) {
    return (
      <div style={styles.topbarMobileWrap}>
        <div style={styles.topbarMobileActionsRow}>
          <button style={styles.topbarMobileBrand} onClick={() => scrollTo("about")}>
            <div style={styles.topbarMobileBrandMark}>AF</div>
            <span style={styles.topbarMobileBrandText}>
              <span style={styles.topbarMobileBrandName}>Aisah Atik Fitriani</span>
              <span style={styles.topbarMobileBrandRole}>// web developer</span>
            </span>
          </button>

          <div style={styles.topbarMobileSocials}>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.btnIcon}
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.btnIcon}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={SOCIALS.resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.btnPill, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    );
  }


  return (
    <header style={styles.topbar}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={styles.searchBox}>
          <Search size={16} color="#a7a7a7" />
          <input
            type="text"
            placeholder="Find my project..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.btnIcon}
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href={SOCIALS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.btnIcon}
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href={SOCIALS.resume}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.btnPill, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
        >
          Resume
        </a>
      </div>
    </header>
  );
}
import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, BadgeCheck } from 'lucide-react';
import { styles } from '../styles/portoStyle';
import { ACCENT, PERSONAL_INFO } from '../data/portfolioData';
import profilePhoto from '../assets/avatar.jpg';

const MOBILE_BREAKPOINT = 768;

export default function HeroSection({ scrollTo }) {
  const [photoHover, setPhotoHover] = useState(false);
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

  const photo = (
    <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
      <div
        style={{
          ...styles.heroPhotoWrap,
          ...(photoHover ? styles.heroPhotoWrapHover : {}),
          ...(isMobile ? { width: 240, height: 240 } : {}),
        }}
        onMouseEnter={() => setPhotoHover(true)}
        onMouseLeave={() => setPhotoHover(false)}
      >
        <img
          src={profilePhoto}
          alt={PERSONAL_INFO.name}
          style={{
            ...styles.heroPhoto,
            transform: photoHover ? "scale(1.15)" : "scale(1.25)",
          }}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <section id="about" style={styles.heroMobile}>
        <div style={styles.heroGlow} />
        <div
          style={{
            ...styles.heroGlowAccent,
            ...(photoHover ? styles.heroGlowAccentHover : {}),
          }}
        />

        {photo}

        <div style={{ position: "relative", zIndex: 1, ...styles.heroInfoMobile }}>
          <div style={styles.verifiedBadge}>
            <span style={styles.verifiedIcon}>
              <BadgeCheck size={16} />
            </span>
            Verified Developer
          </div>

          <h1 style={{ ...styles.heroTitle, margin: 0, fontSize: 22, textAlign: "center" }}>
            {PERSONAL_INFO.name}
          </h1>

          <div style={{ ...styles.heroSub, ...styles.heroSubMobile }}>
            <span style={{ color: "#fff" }}>{PERSONAL_INFO.role}</span>
            <span>•</span>
            <span>{PERSONAL_INFO.location}</span>
            <span>•</span>
            <span style={{ color: ACCENT }}>{PERSONAL_INFO.status}</span>
          </div>

          <div style={styles.ctaRowMobile}>
            <button
              style={{ ...styles.ctaPrimary, ...styles.ctaPrimaryMobile }}
              onClick={() => scrollTo("project")}
            >
              View My Project
              <ArrowRight size={16} />
            </button>
            <button
              style={{ ...styles.ctaSecondary, ...styles.ctaSecondaryMobile }}
              onClick={() => scrollTo("contact")}
            >
              <Mail size={16} />
              Contact Me
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" style={{ ...styles.hero, alignItems: "center", flexWrap: "wrap" }}>
      <div style={styles.heroGlow} />
      <div
        style={{
          ...styles.heroGlowAccent,
          ...(photoHover ? styles.heroGlowAccentHover : {}),
        }}
      />

      {photo}

      <div style={{ position: "relative", zIndex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={styles.verifiedBadge}>
          <span style={styles.verifiedIcon}>
            <BadgeCheck size={16} />
          </span>
          Verified Developer
        </div>
        <h1 style={{ ...styles.heroTitle, margin: 0 }}>{PERSONAL_INFO.name}</h1>
        <div style={styles.heroSub}>
          <span style={{ color: "#fff" }}>{PERSONAL_INFO.role}</span>
          <span>•</span>
          <span>{PERSONAL_INFO.location}</span>
          <span>•</span>
          <span style={{ color: ACCENT }}>{PERSONAL_INFO.status}</span>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
          <CtaButton
            style={styles.ctaPrimary}
            hoverStyle={styles.ctaPrimaryHover}
            onClick={() => scrollTo("project")}
          >
            View My Project
            <ArrowRight size={16} />
          </CtaButton>

          <CtaButton
            style={styles.ctaSecondary}
            hoverStyle={styles.ctaSecondaryHover}
            onClick={() => scrollTo("contact")}
          >
            <Mail size={16} />
            Contact Me
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function CtaButton({ style, hoverStyle, onClick, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...style, ...(hover ? hoverStyle : {}) }}
    >
      {children}
    </button>
  );
}
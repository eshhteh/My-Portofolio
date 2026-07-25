import React, { useState } from 'react';
import { ArrowRight, icons, Mail, BadgeCheck } from 'lucide-react';
import { styles } from '../styles/portoStyle';
import { ACCENT, PERSONAL_INFO } from '../data/portfolioData';
import profilePhoto from '../assets/avatar.jpg';

export default function HeroSection({ scrollTo }) {
  const [photoHover, setPhotoHover] = useState(false);

  return (
    <section id="about" style={{ ...styles.hero, alignItems: "center", flexWrap: "wrap" }}>
      <div style={styles.heroGlow} />
      <div
        style={{
          ...styles.heroGlowAccent,
          ...(photoHover ? styles.heroGlowAccentHover : {}),
        }}
      />

      {/* Profile Photo */}
      <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
        <div
          style={{
            ...styles.heroPhotoWrap,
            ...(photoHover ? styles.heroPhotoWrapHover : {}),
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

      {/* Artist Info */}
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

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
          <button style={styles.ctaPrimary} onClick={() => scrollTo("project")}>
            View My Project
            <ArrowRight size={16} />
          </button>
          <button style={styles.ctaSecondary} onClick={() => scrollTo("contact")}>
            <Mail size={16} />
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}
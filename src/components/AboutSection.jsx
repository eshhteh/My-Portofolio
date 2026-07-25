import React from 'react';
import { Code2, Server, Database, Palette, Terminal } from 'lucide-react';
import { styles } from '../styles/portoStyle';
import { PERSONAL_INFO, SKILLS } from '../data/portfolioData';
import SpotifySection from './SpotifySection';

const CATEGORY_ICONS = {
  "Frontend": Code2,
  "Backend": Server,
  "Database": Database,
  "Design Tools": Palette,
  "Development": Terminal,
};

export default function AboutSection() {
  return (
    <section id="about-me" style={{ ...styles.section, textAlign: "left" }}>
      <div style={styles.secHead}>
        <h2 style={styles.secH2}>About Me</h2>
      </div>

        <div style={styles.bioPanel}>
            <div>
                <p style={styles.bioP}>{PERSONAL_INFO.bio}</p>
            </div>

            <div>
                <SpotifySection compact />
            </div>
        </div>

        <div style={styles.skillGrid}>
            {Object.entries(SKILLS).map(([category, skills]) => {
              const Icon = CATEGORY_ICONS[category] || Code2;
              return (
                <div key={category} style={styles.skillCard}>
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
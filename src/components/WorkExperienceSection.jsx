import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { WORK_EXPERIENCE } from '../data/portfolioData';
import { styles } from '../styles/portoStyle';
import Reveal from './Reveal';

export default function WorkExperienceSection() {
  return (
    <section id="work" style={styles.section}>
      <div style={styles.secHead}>
        <h2 style={styles.secH2}>My Work Experience</h2>
      </div>

      <div style={styles.timelineWrap}>
        <div style={styles.timelineLine} />
        {WORK_EXPERIENCE.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 80}>
            <TimelineItem exp={exp} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ exp }) {
  const [hover, setHover] = useState(false);
  const techList = exp.stack
    ? exp.stack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div style={styles.timelineItem}>
      <span style={styles.timelineDot} />
      <div
        style={{ ...styles.timelineCard, ...(hover ? styles.timelineCardHover : {}) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={styles.timelineHeadRow}>
          <div>
            <h3 style={styles.timelineRole}>{exp.role}</h3>
            <div style={styles.timelineCompany}>{exp.company}</div>
          </div>
          <span style={styles.timelinePeriod}>{exp.period}</span>
        </div>

        {exp.location && (
          <div style={styles.timelineLocation}>
            <MapPin size={12} style={{ display: "inline", marginRight: 4, verticalAlign: -2 }} />
            {exp.location}
          </div>
        )}

        <p style={styles.timelineDesc}>{exp.desc}</p>

        {techList.length > 0 && (
          <div style={styles.timelineTechRow}>
            {techList.map((t) => (
              <span key={t} style={styles.modalTechChip}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
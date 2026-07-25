import React, { useState, useEffect } from 'react';
import { Trophy, ChevronRight, X, ExternalLink } from 'lucide-react';
import { AWARDS } from '../data/portfolioData';
import { styles } from '../styles/portoStyle';
import Reveal from './Reveal';

export default function AwardSection() {
  const [previewAward, setPreviewAward] = useState(null);

  return (
    <section id="awards" style={styles.section}>
      <div style={styles.secHead}><h2 style={styles.secH2}>My Awards</h2></div>

      <div style={styles.awardList}>
        {AWARDS.map((awrd, i) => (
          <Reveal key={awrd.id} delay={i * 60}>
            <AwardRow
              awrd={awrd}
              index={i + 1}
              isLast={i === AWARDS.length - 1}
              onOpen={() => setPreviewAward(awrd)}
            />
          </Reveal>
        ))}
      </div>

      {previewAward && (
        <AwardPreviewModal awrd={previewAward} onClose={() => setPreviewAward(null)} />
      )}
    </section>
  );
}

function AwardRow({ awrd, index, isLast, onOpen }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onOpen(); }}
      style={{
        ...styles.awardRow,
        ...styles.awardRowClickable,
        ...(isLast ? styles.awardRowLast : {}),
        ...(hover ? styles.awardRowHover : {}),
        ...(hover ? styles.awardCardHover : {}),
      }}
    >
      <span style={styles.awardIndex}>{index}</span>

      <div style={{
        ...styles.awardBadge,
        background: `linear-gradient(135deg, ${awrd.grad[0]}, ${awrd.grad[1]})`,
      }}>
        <Trophy size={20} color="#fff" />
      </div>

      <div style={{ overflow: "hidden" }}>
        <div style={styles.awardTitle} title={awrd.title}>{awrd.title}</div>
        <div style={styles.awardDesc} title={awrd.desc}>{awrd.desc}</div>
      </div>

      <div style={styles.awardOrg} title={awrd.org}>{awrd.org}</div>
      <div style={styles.awardYear}>{awrd.year}</div>

      <ChevronRight
        size={18}
        style={{ ...styles.awardArrow, ...(hover ? styles.awardArrowVisible : {}) }}
      />
    </div>
  );
}

function getDrivePreviewUrl(url) {
  if (!url) return null;
  let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  const fileId = match[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function AwardPreviewModal({ awrd, onClose }) {
  const [closeHover, setCloseHover] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const drivePreviewUrl = getDrivePreviewUrl(awrd.link);

  return (
    <div style={styles.backdrop} onClick={onClose} role="presentation">
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Preview award ${awrd.title}`}
      >
        <button
          onClick={onClose}
          onMouseEnter={() => setCloseHover(true)}
          onMouseLeave={() => setCloseHover(false)}
          aria-label="Tutup preview"
          style={{ ...styles.closeBtn, ...(closeHover ? styles.closeBtnHover : {}) }}
        >
          <X size={18} color="#fff" />
        </button>

        <div style={styles.awardModalBody}>
          {drivePreviewUrl ? (
            <div style={styles.certModalPreviewWrap}>
              <iframe
                src={drivePreviewUrl}
                title={`Preview ${awrd.title}`}
                style={styles.certModalPreviewFrame}
                allow="autoplay"
                loading="lazy"
              />
            </div>
          ) : (
            <div style={{
              ...styles.awardModalBadge,
              background: `linear-gradient(135deg, ${awrd.grad[0]}, ${awrd.grad[1]})`
            }}>
              <Trophy size={32} color="#fff" />
            </div>
          )}

          <h3 style={styles.awardModalTitle}>{awrd.title}</h3>
          <div style={styles.awardModalEvent}>{awrd.event}</div>
          <div style={styles.awardModalYear}>{awrd.year}</div>

          {awrd.desc && <p style={styles.awardModalDesc}>{awrd.desc}</p>}

          {awrd.link && (
            <a
              href={awrd.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setLinkHover(true)}
              onMouseLeave={() => setLinkHover(false)}
              style={{
                ...styles.certModalLink,
                ...(linkHover ? { background: "#fff", color: "#000" } : {}),
              }}
            >
              Lihat kredensial <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
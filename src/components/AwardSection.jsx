import React, { useState, useEffect } from 'react';
import { Trophy, ChevronRight, X, ExternalLink } from 'lucide-react';
import { AWARDS } from '../data/portfolioData';
import { styles } from '../styles/portoStyle';
import Reveal from './Reveal';

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

export default function AwardSection() {
  const [previewAward, setPreviewAward] = useState(null);
  const isMobile = useIsMobileLocal();

  return (
    <section id="award" style={{ ...styles.section, minHeight: "20vh", ...(isMobile ? { padding: "24px 16px" } : {}) }}>
      <div style={styles.secHead}>
        <h2 style={{ ...styles.secH2, ...(isMobile ? { fontSize: 18 } : {}) }}>My Awards</h2>
      </div>

      <div style={styles.awardList}>
        {AWARDS.map((awrd, i) => (
          <Reveal key={awrd.id} delay={i * 60}>
            <AwardRow
              awrd={awrd}
              index={i + 1}
              isLast={i === AWARDS.length - 1}
              onOpen={() => setPreviewAward(awrd)}
              isMobile={isMobile}
            />
          </Reveal>
        ))}
      </div>

      {previewAward && (
        <AwardPreviewModal awrd={previewAward} onClose={() => setPreviewAward(null)} isMobile={isMobile} />
      )}
    </section>
  );
}

function AwardRow({ awrd, index, isLast, onOpen, isMobile }) {
  const [hover, setHover] = useState(false);

  if (isMobile) {
    return (
      <div
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter") onOpen(); }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 4px",
          borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.06)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            ...styles.awardBadge,
            background: `linear-gradient(135deg, ${awrd.grad[0]}, ${awrd.grad[1]})`,
            width: 40,
            height: 40,
            flexShrink: 0,
          }}
        >
          <Trophy size={18} color="#fff" />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...styles.awardTitle, fontSize: 13, whiteSpace: "normal" }}>
            {awrd.title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 3,
              fontSize: 11,
              color: "#727272",
            }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {awrd.org}
            </span>
            <span>•</span>
            <span style={{ flexShrink: 0 }}>{awrd.year}</span>
          </div>
        </div>

        <ChevronRight size={16} color="#727272" style={{ flexShrink: 0 }} />
      </div>
    );
  }

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

function AwardPreviewModal({ awrd, onClose, isMobile }) {
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
        style={{
          ...styles.modal,
          ...(isMobile ? { width: "100%", maxHeight: "90vh", borderRadius: 16, margin: 0 } : {}),
        }}
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

        <div style={{ ...styles.awardModalBody, ...(isMobile ? { padding: "20px 16px" } : {}) }}>
          {drivePreviewUrl ? (
            <div
              style={{
                ...styles.certModalPreviewWrap,
                ...(isMobile ? { aspectRatio: "3 / 4" } : {}),
              }}
            >
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

          <h3 style={{ ...styles.awardModalTitle, ...(isMobile ? { fontSize: 17 } : {}) }}>{awrd.title}</h3>
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
                ...(isMobile ? { width: "100%", justifyContent: "center" } : {}),
              }}
            >
              Show Credentials <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
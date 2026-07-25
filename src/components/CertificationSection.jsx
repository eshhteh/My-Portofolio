import React, { useState, useEffect } from 'react';
import { BadgeCheck, ChevronRight, X, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { styles } from '../styles/portoStyle';
import Reveal from './Reveal';

export default function CertificationSection() {
  const [previewCert, setPreviewCert] = useState(null);

  return (
    <section id="certification" style={styles.section}>
      <div style={styles.secHead}>
        <h2 style={styles.secH2}>My Certifications</h2>
      </div>
      <div style={styles.gridCert}>
        {CERTIFICATIONS.map((cert, i) => (
          <Reveal key={cert.id} delay={i * 80}>
            <CertCard cert={cert} onOpen={() => setPreviewCert(cert)} />
          </Reveal>
        ))}
      </div>

      {previewCert && (
        <CertPreviewModal cert={previewCert} onClose={() => setPreviewCert(null)} />
      )}
    </section>
  );
}

function CertCard({ cert, onOpen }) {
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
        ...styles.certCard,
        ...styles.certCardClickable,
        ...(hover ? styles.certCardHover : {}),
      }}
    >
      <div style={{
        ...styles.certBadge,
        background: `linear-gradient(135deg, ${cert.grad[0]}, ${cert.grad[1]})`
      }}>
        <BadgeCheck size={20} color="#fff" />
      </div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div style={styles.certTitle} title={cert.title}>{cert.title}</div>
        <div style={styles.certIssuer}>{cert.issuer}</div>
      </div>
      <div style={styles.certYear}>{cert.year}</div>
      <ChevronRight
        size={18}
        style={{ ...styles.certArrow, ...(hover ? styles.certArrowVisible : {}) }}
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

function CertPreviewModal({ cert, onClose }) {
  const [linkHover, setLinkHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const drivePreviewUrl = getDrivePreviewUrl(cert.link);

  return (
    <div style={styles.backdrop} onClick={onClose} role="presentation">
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Preview sertifikat ${cert.title}`}
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

        <div style={styles.certModalBody}>
          {drivePreviewUrl ? (
            <div style={styles.certModalPreviewWrap}>
              <iframe
                src={drivePreviewUrl}
                title={`Preview ${cert.title}`}
                style={styles.certModalPreviewFrame}
                allow="autoplay"
                loading="lazy"
              />
            </div>
          ) : (
            <div style={{
              ...styles.certModalBadge,
              background: `linear-gradient(135deg, ${cert.grad[0]}, ${cert.grad[1]})`
            }}>
              <BadgeCheck size={32} color="#fff" />
            </div>
          )}

          <h3 style={styles.certModalTitle}>{cert.title}</h3>
          <div style={styles.certModalIssuer}>{cert.issuer}</div>
          <div style={styles.certModalYear}>{cert.year}</div>

          {cert.desc && <p style={styles.certModalDesc}>{cert.desc}</p>}

          {cert.link && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setLinkHover(true)}
              onMouseLeave={() => setLinkHover(false)}
              style={{
                ...styles.certModalLink,
                ...(linkHover ? { background: "#fff", color: "#000" } : {}),
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
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ExternalLink, ChevronLeft, ChevronRight, User, Code2, FileText } from 'lucide-react';
import { CATEGORIES, PROJECTS } from '../data/portfolioData';
import { styles } from '../styles/portoStyle';
import Reveal from './Reveal';

const SLIDE_INTERVAL = 2000; // ms per slide
const MOBILE_BREAKPOINT = 768;

const Github = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.07.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z"/>
  </svg>
);

const Docs = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <line x1="8.5" y1="13" x2="15.5" y2="13" />
    <line x1="8.5" y1="17" x2="13" y2="17" />
  </svg>
);

const LinkIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 20 20" width={size} height={size} fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
  </svg>
);

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

export default function ProjectSection({ query, isPlaying, nowPlaying, handlePlayProject }) {
  const [category, setCategory] = useState("Semua");
  const [previewProject, setPreviewProject] = useState(null);
  const isMobile = useIsMobileLocal();

  const filteredProjects = useMemo(() => PROJECTS.filter((p) => {
    const matchCat = category === "Semua" || p.cat === category;
    const matchQuery =
      query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.stack.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  }), [query, category]);

  const handleTogglePlay = (proj) => {
    const isThisPlaying = isPlaying && nowPlaying?.id === proj.id;
    handlePlayProject(proj);

    setPreviewProject(isThisPlaying ? null : proj);
  };

  return (
    <section id="project" style={{ ...styles.section, ...(isMobile ? { padding: "24px 16px" } : {}) }}>
      <div style={styles.secHead}>
        <h2 style={{ ...styles.secH2, ...(isMobile ? { fontSize: 18 } : {}) }}>My Projects</h2>
      </div>

      <div
        style={{
          ...styles.chipRow,
          ...(isMobile ? { overflowX: "auto", flexWrap: "nowrap", paddingBottom: 6, WebkitOverflowScrolling: "touch" } : {}),
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              ...styles.chip,
              ...(category === c ? styles.chipActive : {}),
              ...(isMobile ? { flexShrink: 0, whiteSpace: "nowrap" } : {}),
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div style={styles.emptyState}>Tidak ada project yang cocok dengan pencarianmu.</div>
      ) : (
        <div
          style={{
            ...styles.grid,
            ...(isMobile
              ? { gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }
              : {}),
          }}
        >
          {filteredProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <ProjectCard
                proj={p}
                isPlaying={isPlaying && nowPlaying?.id === p.id}
                onPlay={() => handleTogglePlay(p)}
                isMobile={isMobile}
              />
            </Reveal>
          ))}
        </div>
      )}

      {previewProject && (
        <ProjectPreviewModal
          proj={previewProject}
          isPlaying={isPlaying && nowPlaying?.id === previewProject.id}
          onTogglePlay={() => handleTogglePlay(previewProject)}
          onClose={() => setPreviewProject(null)}
          isMobile={isMobile}
        />
      )}
    </section>
  );
}

function ProjectCard({ proj, isPlaying, onPlay, isMobile }) {
  const [hover, setHover] = useState(false);
  const [playHover, setPlayHover] = useState(false);
  const [imgError, setImgError] = useState(false);
  const showPlay = hover || isPlaying;
  const coverImage = proj.image || (proj.images && proj.images[0]);
  const hasImage = coverImage && !imgError;

  return (
    <div
      style={{
        ...styles.card,
        background: hover ? "#232323" : "#181818",
        ...(isMobile ? { padding: 10, borderRadius: 10 } : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          ...styles.cardCover,
          background: hasImage
            ? "#000"
            : `linear-gradient(135deg, ${proj.grad[0]}, ${proj.grad[1]})`,
          position: "relative",
          overflow: "hidden",
          ...(isMobile ? { aspectRatio: "1 / 1", borderRadius: 8 } : {}),
        }}
      >
        {hasImage ? (
          <img
            src={coverImage}
            alt={proj.title}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <span style={{ ...styles.coverGlyph, ...(isMobile ? { fontSize: 28 } : {}) }}>{proj.glyph}</span>
        )}

        <button
          onClick={onPlay}
          onMouseEnter={() => setPlayHover(true)}
          onMouseLeave={() => setPlayHover(false)}
          aria-label={isPlaying ? `Pause preview ${proj.title}` : `Play preview ${proj.title}`}
          style={{
            ...styles.playOverlay,
            ...(showPlay ? styles.playOverlayVisible : {}),
            ...(showPlay && playHover ? styles.playOverlayHover : {}),
            ...(isMobile ? { width: 32, height: 32 } : {}),
          }}
        >
          {isPlaying ? (
            <Pause size={isMobile ? 13 : 16} fill="#000" color="#000" />
          ) : (
            <Play size={isMobile ? 13 : 16} fill="#000" color="#000" style={{ marginLeft: 2 }} />
          )}
        </button>
      </div>

      <h3
        style={{
          ...styles.cardTitle,
          ...(isMobile ? { fontSize: 12.5, minHeight: "2.4em", marginTop: 8 } : {}),
        }}
      >
        {proj.title}
      </h3>
      <p
        style={{
          ...styles.cardDesc,
          ...(isMobile ? { fontSize: 10, minHeight: "2.4em", marginTop: 2, WebkitLineClamp: 2 } : {}),
        }}
      >
        {proj.desc}
      </p>

      <div
        style={{
          ...styles.projectLinksRow,
          ...(isMobile ? { gap: 10, marginTop: 8, paddingTop: 8 } : {}),
        }}
      >
        {proj.github && (
          <ProjectIcon href={proj.github} label="GitHub">
            <Github size={isMobile ? 14 : 16} />
          </ProjectIcon>
        )}
        {proj.docs && (
          <ProjectIcon href={proj.docs} label="Documentations">
            <Docs size={isMobile ? 14 : 16} />
          </ProjectIcon>
        )}
        {proj.link && (
          <ProjectIcon href={proj.link} label="Link">
            <LinkIcon size={isMobile ? 14 : 16} />
          </ProjectIcon>
        )}
      </div>
    </div>
  );
}

function ProjectPreviewModal({ proj, isPlaying, onTogglePlay, onClose, isMobile }) {
  const [playHover, setPlayHover] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const enteredOnceRef = useRef(false); // cegah pause instan saat modal mount di bawah kursor

  const slides = useMemo(() => {
    if (Array.isArray(proj.images) && proj.images.length > 0) return proj.images;
    if (proj.image) return [proj.image];
    return [];
  }, [proj]);

  const hasImages = slides.length > 0 && !imgError;
  const hasMultiple = slides.length > 1;


  const techList = useMemo(() => {
    if (!proj.stack) return [];
    return proj.stack.split(",").map((t) => t.trim()).filter(Boolean);
  }, [proj.stack]);

  const goTo = useCallback((idx) => {
    setSlideIndex(((idx % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex]);
  const prev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex]);


  useEffect(() => {
    setSlideIndex(0);
    setImgError(false);
    setPaused(false);
    enteredOnceRef.current = false;
  }, [proj]);


  useEffect(() => {
    if (!hasMultiple || paused) return;
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [hasMultiple, paused, slides.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (hasMultiple && e.key === "ArrowRight") next();
      if (hasMultiple && e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, hasMultiple, next, prev]);

  const handleCoverMouseMove = () => {
    enteredOnceRef.current = true;
    setPaused(true);
  };
  const handleCoverMouseLeave = () => {
    if (enteredOnceRef.current) setPaused(false);
  };

  return (
    <div style={styles.modalBackdrop} onClick={onClose} role="presentation">
      <div
        style={{ ...styles.modal, ...(isMobile ? { width: "100%", maxHeight: "85vh", borderRadius: 16 } : {}) }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Preview ${proj.title}`}
      >
        <div
          style={{
            ...styles.modalCover,
            background: hasImages ? "#000" : `linear-gradient(135deg, ${proj.grad[0]}, ${proj.grad[1]})`,
          }}
          onMouseMove={handleCoverMouseMove}
          onMouseLeave={handleCoverMouseLeave}
        >
          {hasImages ? (
            <>
              {slides.map((src, i) => (
                <img
                  key={src + i}
                  src={src}
                  alt={`${proj.title} ${i + 1}`}
                  onError={() => setImgError(true)}
                  style={{
                    ...styles.modalSlideImg,
                    opacity: i === slideIndex ? 1 : 0,
                    zIndex: i === slideIndex ? 1 : 0,
                  }}
                />
              ))}

              {hasMultiple && (
                <>
                  <button onClick={prev} aria-label="Previous image" style={{ ...styles.modalNavBtn, left: 14 }}>
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={next} aria-label="Next image" style={{ ...styles.modalNavBtn, right: 14 }}>
                    <ChevronRight size={20} />
                  </button>

                  <div style={styles.modalDotsRow}>
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to image ${i + 1}`}
                        style={{ ...styles.modalDot, ...(i === slideIndex ? styles.modalDotActive : {}) }}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <span style={styles.modalGlyph}>{proj.glyph}</span>
          )}

          <button
            onClick={onTogglePlay}
            onMouseEnter={() => setPlayHover(true)}
            onMouseLeave={() => setPlayHover(false)}
            aria-label={isPlaying ? "Pause" : "Play"}
            style={{ ...styles.modalPlayBtn, ...(playHover ? styles.modalPlayBtnHover : {}) }}
          >
            {isPlaying ? (
              <Pause size={22} fill="#000" color="#000" />
            ) : (
              <Play size={22} fill="#000" color="#000" style={{ marginLeft: 3 }} />
            )}
          </button>
        </div>

        <div style={{ ...styles.modalBody, ...styles.modalBodyCol, ...(isMobile ? { padding: "16px 18px 20px" } : {}) }}>
          {/* Judul */}
          <h3 style={{ ...styles.modalTitleSection, ...(isMobile ? { fontSize: 18 } : {}) }}>{proj.title}</h3>

          {/* Deskripsi */}
          <ModalSection icon={<FileText size={13} color="#727272" />} label="Description">
            <p style={styles.modalDescText}>{proj.desc}</p>
          </ModalSection>

          {/* Teknologi */}
          {techList.length > 0 && (
            <ModalSection icon={<Code2 size={13} color="#727272" />} label="Technology">
              <div style={styles.modalTechRow}>
                {techList.map((t) => (
                  <span key={t} style={styles.modalTechChip}>
                    {t}
                  </span>
                ))}
              </div>
            </ModalSection>
          )}
        </div>
      </div>
    </div>
  );
}

function ModalSection({ icon, label, children }) {
  return (
    <div style={styles.modalSection}>
      <div style={styles.modalSectionLabelRow}>
        {icon}
        <span style={styles.modalSectionLabel}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function ProjectIcon({ href, label, children }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...styles.projectIconBtn, ...(hover ? styles.projectIconBtnHover : {}) }}
    >
      {children}
    </a>
  );
}
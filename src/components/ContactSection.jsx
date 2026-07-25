import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { styles } from '../styles/portoStyle';
import { SOCIALS } from '../data/portfolioData';
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

const Instagram = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 2c-2.72 0-3.06.01-4.13.06-1.07.05-1.8.22-2.44.47-.66.26-1.22.6-1.78 1.16-.56.56-.9 1.12-1.16 1.78-.25.64-.42 1.37-.47 2.44C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.13c.05 1.07.22 1.8.47 2.44.26.66.6 1.22 1.16 1.78.56.56 1.12.9 1.78 1.16.64.25 1.37.42 2.44.47C8.94 21.99 9.28 22 12 22s3.06-.01 4.13-.06c1.07-.05 1.8-.22 2.44-.47.66-.26 1.22-.6 1.78-1.16.56-.56.9-1.12 1.16-1.78.25-.64.42-1.37.47-2.44.05-1.07.06-1.41.06-4.13s-.01-3.06-.06-4.13c-.05-1.07-.22-1.8-.47-2.44-.26-.66-.6-1.22-1.16-1.78-.56-.56-1.12-.9-1.78-1.16-.64-.25-1.37-.42-2.44-.47C15.06 2.01 14.72 2 12 2zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.51.21 1.86.34.47.18.8.4 1.15.75.35.35.57.68.75 1.15.13.35.3.88.34 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.51-.34 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.35.13-.88.3-1.86.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.51-.21-1.86-.34-.47-.18-.8-.4-1.15-.75-.35-.35-.57-.68-.75-1.15-.13-.35-.3-.88-.34-1.86-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.04-.98.21-1.51.34-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.35-.13.88-.3 1.86-.34C9.01 3.81 9.33 3.8 12 3.8zm0 3.06a5.14 5.14 0 1 0 0 10.28 5.14 5.14 0 0 0 0-10.28zm0 8.48a3.34 3.34 0 1 1 0-6.68 3.34 3.34 0 0 1 0 6.68zm6.54-8.68a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/>
  </svg>
);

const EMAILJS_SERVICE_ID = "service_aesha";
const EMAILJS_TEMPLATE_ID = "template_fnsvzii";
const EMAILJS_PUBLIC_KEY = "LBtEVHId0wBsZHePf";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const isMobile = useIsMobileLocal();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Semua field wajib diisi.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: "aisyahafitriani05@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to send message. Please try again or use direct email.");
    }
  };

  return (
    <Reveal>
      <section id="contact" style={{ ...styles.section, ...(isMobile ? { padding: "24px 16px" } : {}) }}>
        <div style={styles.secHead}>
          <h2 style={{ ...styles.secH2, ...(isMobile ? { fontSize: 18 } : {}) }}>Contact Me</h2>
        </div>
        <div style={{ ...styles.ctaBanner, ...(isMobile ? { padding: 20, borderRadius: 16 } : {}) }}>
          <div style={styles.ctaGlow} />

          <div
            style={{
              ...styles.ctaLayout,
              ...(isMobile ? { gap: 24 } : {}),
            }}
          >
            <div
              style={{
                ...styles.ctaLeft,
                ...(isMobile ? { minWidth: 0, width: "100%", flexBasis: "auto" } : {}),
              }}
            >
              <h2 style={{ ...styles.ctaH2, ...(isMobile ? { fontSize: 20 } : {}) }}>Let's Collaborate!</h2>
              <p style={{ ...styles.ctaP, ...(isMobile ? { fontSize: 13 } : {}) }}>
                Interested in hiring me or discussing a new project? Send a message directly from here, I'll reply as soon as I can.
              </p>

              <div style={styles.socialRow}>
                <SocialIcon href={SOCIALS.github} label="GitHub">
                  <Github size={18} />
                </SocialIcon>
                <SocialIcon href={SOCIALS.linkedin} label="LinkedIn">
                  <Linkedin size={18} />
                </SocialIcon>
                <SocialIcon href={SOCIALS.instagram} label="Instagram">
                  <Instagram size={18} />
                </SocialIcon>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                ...styles.ctaFormCard,
                ...(isMobile ? { minWidth: 0, width: "100%", maxWidth: "100%", flexBasis: "auto", padding: 16 } : {}),
              }}
              noValidate
            >
              <div style={styles.contactFormGrid}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  style={styles.contactInput}
                  disabled={status === "sending"}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.contactInput}
                  disabled={status === "sending"}
                />
                <textarea
                  name="message"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  style={{ ...styles.contactInput, resize: "vertical", fontFamily: "inherit" }}
                  disabled={status === "sending"}
                />
              </div>

              <div
                style={{
                  ...styles.ctaFormActions,
                  ...(isMobile ? { flexDirection: "column" } : {}),
                }}
              >
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    ...styles.btnPill,
                    ...styles.ctaSubmitBtn,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.7 : 1,
                    ...(isMobile ? { width: "100%" } : {}),
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send message
                    </>
                  )}
                </button>

                <a
                  href="mailto:aisyahafitriani05@gmail.com"
                  style={{
                    ...styles.btnPillOutline,
                    ...styles.ctaEmailBtn,
                    ...(isMobile ? { width: "100%" } : {}),
                  }}
                >
                  <Mail size={16} /> Direct Email
                </a>
              </div>

              {status === "success" && (
                <div style={styles.contactStatusSuccess}>
                  <CheckCircle2 size={16} /> Message sent successfully! Thank you for contacting me.
                </div>
              )}
              {status === "error" && (
                <div style={styles.contactStatusError}>
                  <XCircle size={16} /> {errorMsg}
                </div>
              )}
            </form>
          </div>
        </div>

        <footer style={{ ...styles.footer, ...(isMobile ? { textAlign: "center", fontSize: 11, padding: "20px 16px" } : {}) }}>
          <p>© {new Date().getFullYear()} Aisah Atik Fitriani. Made with React & Vite.</p>
        </footer>
      </section>
    </Reveal>
  );
}

function SocialIcon({ href, label, children }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...styles.socialIconBtn, ...(hover ? styles.socialIconBtnHover : {}) }}
    >
      {children}
    </a>
  );
}
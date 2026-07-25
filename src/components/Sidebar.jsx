import React, { useRef, useCallback, useState, useEffect } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { ACCENT, NAV } from '../data/portfolioData';
import { styles } from '../styles/portoStyle';

const MIN_WIDTH = 200;
const MAX_WIDTH = 420;
const COLLAPSED_WIDTH = 76;
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

export default function Sidebar({ activeSection, scrollTo, width, setWidth, collapsed, setCollapsed }) {
  const dragging = useRef(false);
  const isMobile = useIsMobile();

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX));
    setWidth(newWidth);
  }, [setWidth]);

  const onMouseUp = useCallback(() => {
    dragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (isMobile) return; // drag-resize cuma relevan di desktop
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp, isMobile]);



  if (isMobile) {
    return (
      <nav style={styles.mobileBottomNav}>
        {NAV.map((n) => (
          <MobileNavItem
            key={n.id}
            item={n}
            active={activeSection === n.id}
            onClick={() => scrollTo(n.id)}
          />
        ))}
      </nav>
    );
  }


  const effectiveWidth = collapsed ? COLLAPSED_WIDTH : width;

  return (
    <aside style={{ ...styles.sidebar, width: effectiveWidth, position: "relative", transition: dragging.current ? "none" : "width .2s ease" }}>
      <button
        style={{ ...styles.collapseBtn }}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
      >
        {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
      </button>

      <button style={styles.brand} onClick={() => scrollTo("about")}>
        <div style={styles.brandMark}>AF</div>
        {!collapsed && (
          <div>
            <div style={styles.brandName}>Aisah Atik Fitriani</div>
            <div style={styles.brandRole}>// web developer</div>
          </div>
        )}
      </button>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 18 }}>
        {NAV.map((n) => (
          <NavItem
            key={n.id}
            item={n}
            active={activeSection === n.id}
            collapsed={collapsed}
            onClick={() => scrollTo(n.id)}
          />
        ))}
      </nav>

      {!collapsed && (
        <div
          onMouseDown={onMouseDown}
          style={styles.resizeHandle}
        />
      )}
    </aside>
  );
}

function NavItem({ item, active, collapsed, onClick }) {
  const [hover, setHover] = useState(false);
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={collapsed ? item.label : undefined}
      style={{
        ...styles.navItem,
        ...(hover && !active ? styles.navItemHover : {}),
        ...(active ? styles.navItemActive : {}),
        justifyContent: collapsed ? "center" : "flex-start",
        gap: collapsed ? 0 : 16,
      }}
    >
      {active && <span style={styles.navItemActiveBar} />}
      <Icon size={18} color={active ? ACCENT : "currentColor"} />
      {!collapsed && item.label}
    </button>
  );
}

function MobileNavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      aria-label={item.label}
      style={styles.mobileNavItem}
    >
      <Icon size={20} color={active ? "#1db954" : "#a7a7a7"} />
      <span style={{ ...styles.mobileNavLabel, color: active ? "#1db954" : "#a7a7a7" }}>
        {item.label}
      </span>
      {active && <span style={styles.mobileNavDot} />}
    </button>
  );
}
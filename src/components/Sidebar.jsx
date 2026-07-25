import React, { useRef, useCallback } from 'react';
import { Music2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NAV, ACCENT } from '../data/portfolioData';
import { styles } from '../styles/portoStyle';

const MIN_WIDTH = 200;
const MAX_WIDTH = 420;
const COLLAPSED_WIDTH = 76;

export default function Sidebar({ activeSection, scrollTo, width, setWidth, collapsed, setCollapsed }) {
  const dragging = useRef(false);

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

  React.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

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
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = activeSection === n.id;
          return (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              title={collapsed ? n.label : undefined}
              style={{
                ...styles.navItem,
                ...(active ? styles.navItemActive : {}),
                justifyContent: collapsed ? "center" : "flex-start",
                gap: collapsed ? 0 : 16,
              }}
            >
              <Icon size={18} />
              {!collapsed && n.label}
            </button>
          );
        })}
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
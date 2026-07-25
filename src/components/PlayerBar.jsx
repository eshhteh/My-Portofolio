import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Repeat, Shuffle } from 'lucide-react';
import { styles } from '../styles/portoStyle';

export default function PlayerBar({ isPlaying, setIsPlaying, nowPlaying, progress }) {
  return (
    <div style={styles.player}>
      {/* Left side: Now Playing Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 180, overflow: "hidden" }}>
        {nowPlaying && (
          <>
            <div style={{
              ...styles.playerCover,
              background: `linear-gradient(135deg, ${nowPlaying.grad?.[0] || "#333"}, ${nowPlaying.grad?.[1] || "#111"})`
            }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
                {nowPlaying.glyph || "PR"}
              </span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={styles.playerTitle}>{nowPlaying.title}</div>
              <div style={styles.playerSub}>{nowPlaying.desc}</div>
            </div>
          </>
        )}
      </div>

      {/* Center: Playback Controls */}
      <div style={styles.playerCenter}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button style={{ background: "none", border: "none", color: "#a7a7a7", cursor: "pointer" }}>
            <Shuffle size={16} />
          </button>
          <button style={{ background: "none", border: "none", color: "#a7a7a7", cursor: "pointer" }}>
            <SkipBack size={18} fill="#a7a7a7" />
          </button>
          <button style={styles.playerPlayBtn} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <Pause size={16} fill="#000" color="#000" />
            ) : (
              <Play size={16} fill="#000" color="#000" style={{ marginLeft: 2 }} />
            )}
          </button>
          <button style={{ background: "none", border: "none", color: "#a7a7a7", cursor: "pointer" }}>
            <SkipForward size={18} fill="#a7a7a7" />
          </button>
          <button style={{ background: "none", border: "none", color: "#a7a7a7", cursor: "pointer" }}>
            <Repeat size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressRow}>
          <span style={styles.timeLabel}>
            {`0:${Math.floor((progress * 30) / 100).toString().padStart(2, '0')}`}
          </span>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
          <span style={styles.timeLabel}>0:30</span>
        </div>
      </div>

      {/* Right side: Volume and Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end" }}>
        <button style={{ background: "none", border: "none", color: "#a7a7a7", cursor: "pointer" }}>
          <Volume2 size={18} />
        </button>
        <div style={styles.volTrack}>
          <div style={styles.volFill} />
        </div>
        <button style={{ background: "none", border: "none", color: "#a7a7a7", cursor: "pointer" }}>
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { SPOTIFY_PLAYLIST_ID } from '../data/portfolioData';
import { styles } from '../styles/portoStyle';
import Reveal from './Reveal';

export default function SpotifySection({ compact = false }) {

  const height = compact ? "80" : "152";

  const content = (
    <section id={compact ? undefined : "spotify"} style={compact ? {} : styles.section}>
      {/* Header hanya muncul di versi Full (bukan compact) */}
      {!compact && (
        <div style={styles.secHead}>
          <h2 style={styles.secH2}>Dengarkan Playlist Coding Saya</h2>
        </div>
      )}

      {/* Spotify Embed iFrame */}
      <div style={{ ...styles.spotifyStateBox, border: "none", marginTop: compact ? 8 : 16 }}>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
          width="100%"
          height={height}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: 12 }}
          title="Spotify Playlist"
        />
      </div>
    </section>
  );

  return compact ? content : <Reveal>{content}</Reveal>;
}
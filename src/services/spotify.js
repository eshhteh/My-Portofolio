const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const getAccessToken = async () => {
  const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });

  if (!response.ok) throw new Error(`Gagal mendapatkan token (${response.status})`);
  return response.json();
};

export const getCustomPlaylist = async (playlistId) => {
  if (!playlistId) throw new Error('Playlist ID tidak diberikan.');

  const { access_token } = await getAccessToken();

  // Ambil metadata playlist (nama, cover, dll — ini masih tersedia)
  const metaRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!metaRes.ok) throw new Error(`Gagal mengambil metadata playlist (${metaRes.status})`);
  const meta = await metaRes.json();

  // Endpoint baru untuk tracks — TAPI ini hanya jalan kalau playlist dimiliki oleh
  // akun yang sedang login (Authorization Code Flow), bukan Client Credentials
  let items = [];
  try {
    const itemsRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/items`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    if (itemsRes.ok) {
      const itemsData = await itemsRes.json();
      items = itemsData.items || [];
    }
  } catch {
    // items tidak tersedia untuk Client Credentials Flow
  }

  return {
    playlistName: meta.name,
    playlistCover: meta.images?.[0]?.url,
    totalTracks: meta.tracks?.total ?? items.length,
    externalUrl: meta.external_urls.spotify,
    tracks: items
      .filter((item) => item.item) // sesuai rename: track -> item
      .map((item) => ({
        id: item.item.id,
        title: item.item.name,
        artist: item.item.artists?.map((a) => a.name).join(', '),
        albumName: item.item.album?.name,
        albumCover: item.item.album?.images?.[0]?.url,
        songUrl: item.item.external_urls?.spotify,
        durationMs: item.item.duration_ms,
      })),
  };
};
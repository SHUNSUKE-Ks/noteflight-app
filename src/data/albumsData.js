// npm run dev

// アルバムデータの構造定義
export const albumsData = [
  {
    id: 1,
    title: "森の調べ",
    artist: "ナチュラル・サウンズ",
    coverImage: "/images/forest_sunset.jpg",
    releaseYear: 2023,
    genre: "アンビエント",
    description: "深い森に響く自然の音楽を収録したリラクゼーションアルバム",
    tracks: [
      {
        id: 101,
        number: 1,
        title: "朝露の歌",
        duration: "4:32",
        audioFile: "/audio/morning-dew.mp3"
      },
      {
        id: 102,
        number: 2,
        title: "木漏れ日のワルツ",
        duration: "5:18",
        audioFile: "/audio/sunlight-waltz.mp3"
      },
      {
        id: 103,
        number: 3,
        title: "鳥たちの合唱",
        duration: "3:45",
        audioFile: "/audio/bird-chorus.mp3"
      },
      {
        id: 104,
        number: 4,
        title: "風の子守唄",
        duration: "6:12",
        audioFile: "/audio/wind-lullaby.mp3"
      },
      {
        id: 105,
        number: 5,
        title: "夜の静寂",
        duration: "4:58",
        audioFile: "/audio/night-silence.mp3"
      }
    ]
  }
];

// アルバムIDから特定のアルバムを取得
export const getAlbumById = (id) => {
  return albumsData.find((album) => album.id === parseInt(id));
};

// トラックIDから特定のトラックとそのアルバムを取得
export const getTrackById = (trackId) => {
  for (const album of albumsData) {
    const track = album.tracks.find((t) => t.id === parseInt(trackId));
    if (track) {
      return { track, album };
    }
  }
  return null;
};

// ジャンル別にアルバムを取得
export const getAlbumsByGenre = (genre) => {
  return albumsData.filter((album) => album.genre === genre);
};

// 全ジャンルのリストを取得
export const getAllGenres = () => {
  return [...new Set(albumsData.map((album) => album.genre))];
};

// アーティスト名で検索
export const getAlbumsByArtist = (artistName) => {
  return albumsData.filter((album) => album.artist.toLowerCase().includes(artistName.toLowerCase()));
};

// アルバムタイトルで検索
export const searchAlbums = (searchTerm) => {
  return albumsData.filter(
    (album) =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// ランダムなアルバムを取得
export const getRandomAlbum = () => {
  const randomIndex = Math.floor(Math.random() * albumsData.length);
  return albumsData[randomIndex];
};

// アルバム内の総楽曲数を取得
export const getTotalTrackCount = (albumId) => {
  const album = getAlbumById(albumId);
  return album ? album.tracks.length : 0;
};

// アルバムの総再生時間を取得（文字列形式）
export const getAlbumDuration = (albumId) => {
  const album = getAlbumById(albumId);
  if (!album) return "0:00";

  let totalSeconds = 0;
  album.tracks.forEach((track) => {
    const [minutes, seconds] = track.duration.split(":").map(Number);
    totalSeconds += minutes * 60 + seconds;
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${(totalSeconds % 60).toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${(totalSeconds % 60).toString().padStart(2, "0")}`;
  }
};

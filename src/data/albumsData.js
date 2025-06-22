// npm run dev

// アルバムデータの構造定義
export const albumsData = [
  {
    id: 1,
    title: "森の調べ",
    artist: "ナチュラル・サウンズ",
    coverImage: "/images/forest-melody.jpg",
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
  },
  {
    id: 2,
    title: "都市の夜景",
    artist: "シティ・ライツ",
    coverImage: "/images/city-nights.jpg",
    releaseYear: 2023,
    genre: "チルアウト",
    description: "都市の夜を彩るモダンなサウンドトラック",
    tracks: [
      {
        id: 201,
        number: 1,
        title: "ネオンサイン",
        duration: "3:28",
        audioFile: "/audio/neon-signs.mp3"
      },
      {
        id: 202,
        number: 2,
        title: "深夜のカフェ",
        duration: "4:15",
        audioFile: "/audio/midnight-cafe.mp3"
      },
      {
        id: 203,
        number: 3,
        title: "雨の街角",
        duration: "5:03",
        audioFile: "/audio/rainy-street.mp3"
      },
      {
        id: 204,
        number: 4,
        title: "タクシーの窓から",
        duration: "3:52",
        audioFile: "/audio/taxi-window.mp3"
      }
    ]
  },
  {
    id: 3,
    title: "海辺の記憶",
    artist: "オーシャン・ブリーズ",
    coverImage: "/images/seaside-memories.jpg",
    releaseYear: 2022,
    genre: "アコースティック",
    description: "懐かしい海辺の思い出を歌ったアコースティックアルバム",
    tracks: [
      {
        id: 301,
        number: 1,
        title: "波音のセレナーデ",
        duration: "4:20",
        audioFile: "/audio/wave-serenade.mp3"
      },
      {
        id: 302,
        number: 2,
        title: "砂浜の足跡",
        duration: "3:35",
        audioFile: "/audio/sandy-footprints.mp3"
      },
      {
        id: 303,
        number: 3,
        title: "夕陽のギター",
        duration: "5:42",
        audioFile: "/audio/sunset-guitar.mp3"
      },
      {
        id: 304,
        number: 4,
        title: "潮風の詩",
        duration: "4:08",
        audioFile: "/audio/sea-breeze-poem.mp3"
      },
      {
        id: 305,
        number: 5,
        title: "灯台の光",
        duration: "6:25",
        audioFile: "/audio/lighthouse-beam.mp3"
      },
      {
        id: 306,
        number: 6,
        title: "帰り道",
        duration: "4:45",
        audioFile: "/audio/way-home.mp3"
      }
    ]
  },
  {
    id: 4,
    title: "季節の旅",
    artist: "フォーシーズンズ",
    coverImage: "/images/seasonal-journey.jpg",
    releaseYear: 2023,
    genre: "インストゥルメンタル",
    description: "四季の移ろいを音楽で表現したインストゥルメンタルアルバム",
    tracks: [
      {
        id: 401,
        number: 1,
        title: "桜咲く春",
        duration: "4:55",
        audioFile: "/audio/cherry-spring.mp3"
      },
      {
        id: 402,
        number: 2,
        title: "夏祭りの夜",
        duration: "3:18",
        audioFile: "/audio/summer-festival.mp3"
      },
      {
        id: 403,
        number: 3,
        title: "紅葉散歩道",
        duration: "5:30",
        audioFile: "/audio/autumn-walk.mp3"
      },
      {
        id: 404,
        number: 4,
        title: "雪景色",
        duration: "6:02",
        audioFile: "/audio/snow-scene.mp3"
      }
    ]
  },
  {
    id: 5,
    title: "カフェ・タイム",
    artist: "コーヒー・ハウス・トリオ",
    coverImage: "/images/cafe-time.jpg",
    releaseYear: 2023,
    genre: "ジャズ",
    description: "カフェで流れるような心地よいジャズコレクション",
    tracks: [
      {
        id: 501,
        number: 1,
        title: "モーニング・ブリュー",
        duration: "3:42",
        audioFile: "/audio/morning-brew.mp3"
      },
      {
        id: 502,
        number: 2,
        title: "午後のひととき",
        duration: "4:28",
        audioFile: "/audio/afternoon-moment.mp3"
      },
      {
        id: 503,
        number: 3,
        title: "エスプレッソ・ブルース",
        duration: "5:15",
        audioFile: "/audio/espresso-blues.mp3"
      },
      {
        id: 504,
        number: 4,
        title: "ラテアートの魔法",
        duration: "3:58",
        audioFile: "/audio/latte-art-magic.mp3"
      },
      {
        id: 505,
        number: 5,
        title: "クロージングタイム",
        duration: "4:33",
        audioFile: "/audio/closing-time.mp3"
      }
    ]
  },
  {
    id: 6,
    title: "星空の下で",
    artist: "ミッドナイト・オーケストラ",
    coverImage: "/images/under-starry-sky.jpg",
    releaseYear: 2022,
    genre: "クラシカル",
    description: "星空をテーマにした美しいオーケストラ楽曲集",
    tracks: [
      {
        id: 601,
        number: 1,
        title: "天の川",
        duration: "7:20",
        audioFile: "/audio/milky-way.mp3"
      },
      {
        id: 602,
        number: 2,
        title: "流れ星の願い",
        duration: "5:45",
        audioFile: "/audio/shooting-star-wish.mp3"
      },
      {
        id: 603,
        number: 3,
        title: "月光のソナタ",
        duration: "6:38",
        audioFile: "/audio/moonlight-sonata.mp3"
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

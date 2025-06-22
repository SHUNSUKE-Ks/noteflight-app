// npm run dev でアプリを起動してください
// React + Vite + Tailwind CSS を使用しています

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import TrackItem from "../ui/TrackItem";
import PlayButton from "../ui/PlayButton";
import { MusicContext } from "../../context/MusicContext";
import { albumsData } from "../../data/albumsData";

const AlbumDetailScreen = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useContext(MusicContext);
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    // アルバムデータを取得
    const foundAlbum = albumsData.find((a) => a.id === albumId);
    if (foundAlbum) {
      setAlbum(foundAlbum);
    } else {
      // アルバムが見つからない場合は一覧に戻る
      navigate("/albums");
    }
  }, [albumId, navigate]);

  const handleTrackPlay = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      pauseTrack();
    } else {
      playTrack(track, album);
    }
  };

  const handlePlayAll = () => {
    if (album?.tracks?.length > 0) {
      playTrack(album.tracks[0], album);
    }
  };

  if (!album) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* ヘッダー */}
      <Header title={album.title} showBackButton={true} onBackClick={() => navigate("/albums")} />

      {/* アルバム情報ヘッダー */}
      <div className="px-6 py-8">
        <div className="flex items-start space-x-6">
          {/* アルバムジャケット */}
          <div className="flex-shrink-0">
            <img
              src={album.coverImage}
              alt={album.title}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-2xl object-cover"
              onError={(e) => {
                e.target.src = "/images/default-album.jpg";
              }}
            />
          </div>

          {/* アルバム詳細 */}
          <div className="flex-1 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{album.title}</h1>
            <p className="text-gray-300 text-lg mb-2">{album.artist}</p>
            <p className="text-gray-400 text-sm mb-4">
              {album.year} • {album.tracks?.length || 0}曲
            </p>

            {/* 全曲再生ボタン */}
            <button
              onClick={handlePlayAll}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold transition-colors duration-200">
              <PlayButton isPlaying={currentTrack?.albumId === album.id && isPlaying} size="small" />
              <span>全曲再生</span>
            </button>
          </div>
        </div>
      </div>

      {/* トラックリスト */}
      <div className="px-6 pb-6">
        <h2 className="text-white text-xl font-semibold mb-4">楽曲</h2>

        <div className="bg-gray-800/30 rounded-lg overflow-hidden">
          {album.tracks && album.tracks.length > 0 ? (
            album.tracks.map((track, index) => (
              <TrackItem
                key={track.id}
                track={{
                  ...track,
                  trackNumber: index + 1,
                  albumId: album.id
                }}
                isCurrentTrack={currentTrack?.id === track.id}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                onPlay={() =>
                  handleTrackPlay({
                    ...track,
                    albumId: album.id,
                    albumTitle: album.title,
                    albumArtist: album.artist,
                    albumCover: album.coverImage
                  })
                }
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-4">🎵</div>
              <p>このアルバムには楽曲がありません</p>
            </div>
          )}
        </div>

        {/* アルバム統計 */}
        {album.tracks && album.tracks.length > 0 && (
          <div className="mt-6 text-gray-400 text-sm text-center">総再生時間: {album.totalDuration || "不明"}</div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetailScreen;

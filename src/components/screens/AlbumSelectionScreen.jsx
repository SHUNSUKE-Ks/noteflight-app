// npm run dev でアプリを起動してください
// React + Vite + Tailwind CSS を使用しています

import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../ui/Header";
import { albumsData } from "../../data/albumsData";

const AlbumSelectionScreen = () => {
  const navigate = useNavigate();

  const handleAlbumSelect = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* ヘッダー */}
      <Header title="アルバム" showBackButton={false} />

      {/* アルバムリスト */}
      <div className="px-4 pb-6">
        <div className="space-y-2">
          {albumsData.map((album, index) => (
            <div
              key={album.id}
              onClick={() => handleAlbumSelect(album.id)}
              className="flex items-center p-4 bg-gray-800/40 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-all duration-200 group">
              {/* アルバムジャケット */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                {album.coverImage ? (
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/default-album.jpg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <span className="text-2xl">🎵</span>
                  </div>
                )}
              </div>

              {/* アルバム情報 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg truncate group-hover:text-blue-300 transition-colors">
                  {album.title}
                </h3>
                <p className="text-gray-400 text-sm truncate">{album.artist}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {album.year} • {album.tracks?.length || 0}曲
                </p>
              </div>

              {/* 矢印アイコン */}
              <div className="ml-4 text-gray-400 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* 空の状態表示 */}
        {albumsData.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold mb-2">アルバムがありません</h3>
            <p className="text-center">音楽ファイルを追加して、お気に入りのアルバムを楽しみましょう</p>
          </div>
        )}
      </div>

      {/* フッター装飾 */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
    </div>
  );
};

export default AlbumSelectionScreen;

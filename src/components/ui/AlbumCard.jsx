// npm run dev

import React, { useState } from "react";

const AlbumCard = ({ album, onClick, size = "default", showPlayButton = true, className = "" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // アルバム情報の取得
  const { id, title, artist, coverImage, trackCount, year, genre } = album;

  // サイズバリエーション
  const sizes = {
    small: {
      container: "w-32",
      image: "h-32",
      title: "text-sm",
      artist: "text-xs"
    },
    default: {
      container: "w-48",
      image: "h-48",
      title: "text-base",
      artist: "text-sm"
    },
    large: {
      container: "w-64",
      image: "h-64",
      title: "text-lg",
      artist: "text-base"
    }
  };

  const currentSize = sizes[size];

  const handleClick = () => {
    if (onClick) {
      onClick(album);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div
      className={`
        ${currentSize.container} 
        cursor-pointer 
        transform transition-all duration-300 
        hover:scale-105 hover:shadow-2xl
        group
        ${className}
      `}
      onClick={handleClick}>
      {/* アルバムカードコンテナ */}
      <div className="relative bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors duration-300">
        {/* アルバムジャケット */}
        <div className={`${currentSize.image} relative overflow-hidden bg-gray-700`}>
          {/* 画像読み込み中のスケルトン */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 animate-pulse" />
          )}

          {/* アルバムジャケット画像 */}
          {!imageError ? (
            <img
              src={coverImage}
              alt={`${title} - ${artist}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`
                w-full h-full object-cover 
                transition-all duration-300
                ${imageLoaded ? "opacity-100" : "opacity-0"}
                group-hover:scale-110
              `}
            />
          ) : (
            // 画像エラー時のプレースホルダー
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
          )}

          {/* ホバー時のオーバーレイ */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />

          {/* 再生ボタン */}
          {showPlayButton && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="
                  w-12 h-12 bg-white bg-opacity-90 hover:bg-opacity-100
                  rounded-full flex items-center justify-center
                  transform transition-all duration-200
                  hover:scale-110 active:scale-95
                  shadow-lg
                  text-gray-800
                "
                onClick={(e) => {
                  e.stopPropagation();
                  // ここで再生処理を実装
                  console.log("Play album:", id);
                }}
                aria-label={`${title}を再生`}>
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}

          {/* 新着・人気バッジ */}
          {album.isNew && (
            <div className="absolute top-2 left-2">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">NEW</span>
            </div>
          )}

          {album.isPopular && (
            <div className="absolute top-2 right-2">
              <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">人気</span>
            </div>
          )}
        </div>

        {/* アルバム情報 */}
        <div className="p-3 space-y-1">
          {/* アルバムタイトル */}
          <h3
            className={`
            ${currentSize.title} 
            font-bold text-white 
            truncate 
            group-hover:text-purple-300 
            transition-colors duration-300
          `}>
            {title}
          </h3>

          {/* アーティスト名 */}
          <p
            className={`
            ${currentSize.artist} 
            text-gray-400 
            truncate
            group-hover:text-gray-300
            transition-colors duration-300
          `}>
            {artist}
          </p>

          {/* 追加情報 */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>{trackCount} 曲</span>
            {year && <span>{year}</span>}
          </div>

          {/* ジャンル */}
          {genre && (
            <div className="mt-1">
              <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">{genre}</span>
            </div>
          )}
        </div>

        {/* ローディング状態のオーバーレイ */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 pointer-events-none">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};

// グリッド表示用のコンテナコンポーネント
export const AlbumGrid = ({ albums, onAlbumClick, className = "" }) => {
  return (
    <div
      className={`
      grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
      gap-4 md:gap-6
      p-4
      ${className}
    `}>
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} onClick={onAlbumClick} size="default" />
      ))}
    </div>
  );
};

// フィーチャード表示用のコンポーネント
export const FeaturedAlbum = ({ album, onClick, className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
        style={{ backgroundImage: `url(${album.coverImage})` }}
      />

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* コンテンツ */}
      <div className="relative p-6 h-48 flex flex-col justify-end">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">{album.title}</h2>
          <p className="text-lg text-gray-300">{album.artist}</p>
          <button
            onClick={() => onClick(album)}
            className="
              inline-flex items-center space-x-2
              bg-white bg-opacity-20 hover:bg-opacity-30
              text-white px-4 py-2 rounded-full
              transition-all duration-200
              backdrop-blur-sm
            ">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>今すぐ聴く</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;

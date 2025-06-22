// npm run dev

import React from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";

const PlayButton = ({ trackId, trackSrc, albumId, trackIndex, size = "default", className = "" }) => {
  const { currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack } = useMusicPlayer();

  // 現在のトラックが再生中かどうかを判定
  const isCurrentTrack = currentTrack?.id === trackId;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  // クリックハンドラー
  const handleClick = () => {
    if (isCurrentTrack) {
      // 同じトラックの場合は再生/一時停止を切り替え
      if (isPlaying) {
        pauseTrack();
      } else {
        resumeTrack();
      }
    } else {
      // 別のトラックの場合は新しいトラックを再生
      playTrack({
        id: trackId,
        src: trackSrc,
        albumId,
        index: trackIndex
      });
    }
  };

  // サイズバリエーション
  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    default: "w-10 h-10 text-base",
    large: "w-12 h-12 text-lg"
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        bg-white bg-opacity-10 
        hover:bg-opacity-20 
        active:bg-opacity-30
        backdrop-blur-sm
        rounded-full 
        flex items-center justify-center 
        transition-all duration-200 
        transform hover:scale-105 active:scale-95
        border border-white border-opacity-20
        text-white
        shadow-lg hover:shadow-xl
        group
        ${className}
      `}
      aria-label={isCurrentlyPlaying ? "一時停止" : "再生"}
      type="button">
      {/* アイコンのアニメーション付き表示 */}
      <div className="relative flex items-center justify-center">
        {/* 再生アイコン */}
        <div
          className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-200 transform
          ${isCurrentlyPlaying ? "scale-0 opacity-0" : "scale-100 opacity-100"}
        `}>
          <svg
            width="60%"
            height="60%"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-0.5" // 視覚的中央揃えのための微調整
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* 一時停止アイコン */}
        <div
          className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-200 transform
          ${isCurrentlyPlaying ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        `}>
          <svg width="60%" height="60%" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </div>
      </div>

      {/* ローディング状態のアニメーション */}
      {isCurrentTrack && (
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin opacity-30" />
      )}
    </button>
  );
};

export default PlayButton;

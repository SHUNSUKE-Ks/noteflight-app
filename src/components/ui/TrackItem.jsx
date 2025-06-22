// npm run dev

import React from "react";
import PlayButton from "./PlayButton";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";

const TrackItem = ({
  track,
  albumId,
  index,
  className = "",
  showArtist = false,
  showDuration = true,
  compact = false
}) => {
  const { currentTrack, isPlaying } = useMusicPlayer();

  // トラック情報の取得
  const { id, title, artist, duration, src, trackNumber } = track;

  // 現在のトラックかどうかの判定
  const isCurrentTrack = currentTrack?.id === id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  // 時間をフォーマット（秒をmm:ss形式に変換）
  const formatDuration = (seconds) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`
      group relative
      ${compact ? "py-2" : "py-3"}
      px-4 
      hover:bg-white hover:bg-opacity-5
      active:bg-white active:bg-opacity-10
      transition-all duration-200
      border-b border-gray-800 last:border-b-0
      ${isCurrentTrack ? "bg-purple-500 bg-opacity-10 border-purple-500 border-opacity-30" : ""}
      ${className}
    `}>
      <div className="flex items-center space-x-4">
        {/* トラック番号または再生ボタン */}
        <div className="w-8 flex items-center justify-center">
          {/* デスクトップ: ホバー時に再生ボタン表示 */}
          <div className="hidden sm:block">
            <span
              className={`
              text-sm font-mono text-gray-400 
              group-hover:opacity-0 
              transition-opacity duration-200
              ${isCurrentTrack ? "text-purple-400" : ""}
            `}>
              {trackNumber || index + 1}
            </span>
            <div className="absolute left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <PlayButton trackId={id} trackSrc={src} albumId={albumId} trackIndex={index} size="small" />
            </div>
          </div>

          {/* モバイル: 常に再生ボタン表示 */}
          <div className="sm:hidden">
            <PlayButton trackId={id} trackSrc={src} albumId={albumId} trackIndex={index} size="small" />
          </div>
        </div>

        {/* 楽曲情報 */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            {/* 楽曲タイトル */}
            <h4
              className={`
              font-medium truncate
              ${isCurrentTrack ? "text-purple-300" : "text-white"}
              ${compact ? "text-sm" : "text-base"}
              transition-colors duration-200
            `}>
              {title}
              {/* 再生中インジケーター */}
              {isCurrentlyPlaying && (
                <span className="ml-2 inline-flex items-center">
                  <div className="flex space-x-0.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-0.5 h-3 bg-purple-400 animate-pulse"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: "1s"
                        }}
                      />
                    ))}
                  </div>
                </span>
              )}
            </h4>

            {/* アーティスト名（オプション） */}
            {showArtist && artist && (
              <p
                className={`
                text-gray-400 truncate
                ${compact ? "text-xs" : "text-sm"}
              `}>
                {artist}
              </p>
            )}
          </div>
        </div>

        {/* 楽曲時間 */}
        {showDuration && (
          <div className="flex items-center space-x-3">
            <span
              className={`
              text-gray-400 font-mono text-sm
              ${isCurrentTrack ? "text-purple-400" : ""}
            `}>
              {formatDuration(duration)}
            </span>
          </div>
        )}

        {/* その他のアクションボタン */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* お気に入りボタン */}
          <button
            className="
              p-1.5 rounded-full 
              hover:bg-white hover:bg-opacity-10
              text-gray-400 hover:text-red-400
              transition-all duration-200
            "
            aria-label="お気に入りに追加"
            onClick={(e) => {
              e.stopPropagation();
              // お気に入り処理
              console.log("Add to favorites:", id);
            }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* メニューボタン */}
          <button
            className="
              p-1.5 rounded-full 
              hover:bg-white hover:bg-opacity-10
              text-gray-400 hover:text-white
              transition-all duration-200
            "
            aria-label="その他のオプション"
            onClick={(e) => {
              e.stopPropagation();
              // メニュー処理
              console.log("Show menu for:", id);
            }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 進行状況バー（現在の楽曲の場合） */}
      {isCurrentTrack && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-1/3 transition-all duration-300" />
        </div>
      )}
    </div>
  );
};

// トラックリスト表示用のコンテナコンポーネント
export const TrackList = ({ tracks, albumId, className = "", showHeader = true, compact = false }) => {
  return (
    <div className={`${className}`}>
      {/* ヘッダー */}
      {showHeader && (
        <div className="flex items-center px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wide border-b border-gray-800">
          <div className="w-8 text-center">#</div>
          <div className="flex-1 ml-4">タイトル</div>
          <div className="w-16 text-center">時間</div>
          <div className="w-16"></div> {/* アクションボタン用スペース */}
        </div>
      )}

      {/* トラック一覧 */}
      <div className="divide-y divide-gray-800">
        {tracks.map((track, index) => (
          <TrackItem key={track.id} track={track} albumId={albumId} index={index} compact={compact} />
        ))}
      </div>
    </div>
  );
};

// 現在再生中楽曲用のミニプレイヤー
export const NowPlayingTrack = ({ className = "" }) => {
  const { currentTrack, isPlaying } = useMusicPlayer();

  if (!currentTrack) return null;

  return (
    <div
      className={`
      fixed bottom-0 left-0 right-0 
      bg-gray-900 border-t border-gray-700
      px-4 py-3
      ${className}
    `}>
      <div className="flex items-center space-x-4">
        {/* アルバムアート */}
        <div className="w-12 h-12 bg-gray-700 rounded flex-shrink-0">
          {currentTrack.albumCover && (
            <img src={currentTrack.albumCover} alt="現在再生中" className="w-full h-full object-cover rounded" />
          )}
        </div>

        {/* 楽曲情報 */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
          <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
        </div>

        {/* 再生ボタン */}
        <PlayButton
          trackId={currentTrack.id}
          trackSrc={currentTrack.src}
          albumId={currentTrack.albumId}
          trackIndex={currentTrack.index}
          size="default"
        />
      </div>
    </div>
  );
};

export default TrackItem;

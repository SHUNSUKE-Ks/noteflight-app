// npm run dev

import React from "react";

const Logo = ({ size = "default", animated = false, className = "", showText = true }) => {
  // サイズバリエーション
  const sizes = {
    small: {
      container: "w-12 h-12",
      text: "text-lg font-bold",
      icon: "w-8 h-8"
    },
    default: {
      container: "w-16 h-16",
      text: "text-xl font-bold",
      icon: "w-12 h-12"
    },
    large: {
      container: "w-24 h-24",
      text: "text-2xl font-bold",
      icon: "w-18 h-18"
    },
    splash: {
      container: "w-32 h-32",
      text: "text-3xl font-bold",
      icon: "w-24 h-24"
    }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* ロゴアイコン部分 */}
      <div
        className={`
        ${currentSize.container} 
        relative 
        ${animated ? "animate-pulse" : ""}
      `}>
        {/* 背景の円形グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-teal-400 rounded-full opacity-20 blur-sm" />

        {/* メインアイコンコンテナ */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* 音符と鳥を組み合わせたSVGロゴ */}
          <svg
            className={`${currentSize.icon} text-white drop-shadow-lg`}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* 鳥のシルエット */}
            <path
              d="M25 35c-5 0-8 3-8 8 0 8 8 15 15 20 2 1 4 2 6 2s4-1 6-2c7-5 15-12 15-20 0-5-3-8-8-8-3 0-6 2-8 5-2-3-5-5-8-5z"
              fill="url(#birdGradient)"
              className={animated ? "animate-bounce" : ""}
              style={{
                animationDelay: "0.2s",
                animationDuration: "2s"
              }}
            />

            {/* 音符の符幹 */}
            <rect
              x="60"
              y="25"
              width="3"
              height="35"
              fill="url(#noteGradient)"
              className={animated ? "animate-pulse" : ""}
              style={{
                animationDelay: "0.5s",
                animationDuration: "1.5s"
              }}
            />

            {/* 音符の符頭 */}
            <ellipse
              cx="58"
              cy="57"
              rx="6"
              ry="4"
              fill="url(#noteGradient)"
              className={animated ? "animate-pulse" : ""}
              style={{
                animationDelay: "0.5s",
                animationDuration: "1.5s"
              }}
            />

            {/* 音符の旗 */}
            <path
              d="M63 25c8 2 12 8 12 15s-4 13-12 15V25z"
              fill="url(#noteGradient)"
              className={animated ? "animate-pulse" : ""}
              style={{
                animationDelay: "0.7s",
                animationDuration: "1.8s"
              }}
            />

            {/* 音波のライン */}
            <g className={animated ? "animate-ping" : ""} style={{ animationDuration: "3s" }}>
              <circle cx="35" cy="45" r="15" stroke="url(#waveGradient)" strokeWidth="2" fill="none" opacity="0.6" />
              <circle cx="35" cy="45" r="20" stroke="url(#waveGradient)" strokeWidth="1.5" fill="none" opacity="0.4" />
              <circle cx="35" cy="45" r="25" stroke="url(#waveGradient)" strokeWidth="1" fill="none" opacity="0.2" />
            </g>

            {/* グラデーション定義 */}
            <defs>
              <linearGradient id="birdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>

              <linearGradient id="noteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>

              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* アプリ名テキスト */}
      {showText && (
        <div className="flex flex-col">
          <h1
            className={`
            ${currentSize.text} 
            text-white 
            tracking-wide 
            ${animated ? "animate-fade-in" : ""}
          `}>
            NoteFlight
          </h1>
          {size === "splash" && <p className="text-gray-400 text-sm tracking-wider">音楽の翼で飛び立とう</p>}
        </div>
      )}
    </div>
  );
};

export default Logo;

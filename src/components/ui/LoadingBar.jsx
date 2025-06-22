// npm run dev

import React, { useState, useEffect } from "react";

const LoadingBar = ({
  duration = 3000,
  onComplete = () => {},
  className = "",
  showPercentage = true,
  animated = true
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let startTime = Date.now();
    let animationFrame;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 200); // 完了後少し待ってからコールバック実行
      } else {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    if (animated) {
      animationFrame = requestAnimationFrame(updateProgress);
    } else {
      setProgress(100);
      setIsComplete(true);
      onComplete();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [duration, onComplete, animated]);

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* パーセンテージ表示 */}
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-white text-sm font-medium">読み込み中...</span>
          <span className="text-white text-sm font-mono">{Math.round(progress)}%</span>
        </div>
      )}

      {/* プログレスバーコンテナ */}
      <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
        {/* 背景のグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full" />

        {/* プログレスバー本体 */}
        <div
          className={`
            absolute top-0 left-0 h-full rounded-full
            bg-gradient-to-r from-purple-500 via-blue-500 to-teal-400
            transition-all duration-100 ease-out
            ${isComplete ? "shadow-lg shadow-blue-500/50" : ""}
          `}
          style={{ width: `${progress}%` }}>
          {/* 光沢効果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full" />

          {/* 進行中のアニメーション効果 */}
          {progress > 0 && progress < 100 && (
            <div className="absolute right-0 top-0 w-4 h-full bg-white opacity-50 blur-sm animate-pulse" />
          )}
        </div>

        {/* 完了時のキラキラエフェクト */}
        {isComplete && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping opacity-60" />
            <div
              className="absolute -top-1 left-1/2 w-3 h-3 bg-blue-300 rounded-full animate-ping opacity-40"
              style={{ animationDelay: "0.3s" }}
            />
            <div
              className="absolute -bottom-1 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-50"
              style={{ animationDelay: "0.6s" }}
            />
          </>
        )}
      </div>

      {/* ローディングドット */}
      <div className="flex justify-center mt-4 space-x-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`
              w-2 h-2 bg-white rounded-full
              ${animated ? "animate-bounce" : "opacity-50"}
            `}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: "1s"
            }}
          />
        ))}
      </div>

      {/* ステータステキスト */}
      <div className="text-center mt-3">
        <p className="text-gray-400 text-xs">
          {progress < 30 && "アプリを起動しています..."}
          {progress >= 30 && progress < 60 && "リソースを読み込んでいます..."}
          {progress >= 60 && progress < 90 && "音楽ライブラリを準備しています..."}
          {progress >= 90 && progress < 100 && "もうすぐ完了です..."}
          {progress >= 100 && "完了！"}
        </p>
      </div>
    </div>
  );
};

export default LoadingBar;

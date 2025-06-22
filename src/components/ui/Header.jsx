// npm run dev

import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Header = ({
  title = "",
  showBackButton = false,
  showLogo = false,
  rightContent = null,
  className = "",
  transparent = false
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header
      className={`
      sticky top-0 z-50 w-full
      ${transparent ? "bg-black bg-opacity-40 backdrop-blur-md" : "bg-gray-900 border-b border-gray-700"}
      ${className}
    `}>
      <div className="flex items-center justify-between px-4 py-3 min-h-[60px]">
        {/* 左側：戻るボタンまたはロゴ */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="
                p-2 rounded-full 
                bg-white bg-opacity-10 
                hover:bg-opacity-20 
                active:bg-opacity-30
                transition-all duration-200 
                transform hover:scale-105 active:scale-95
                text-white
                group
              "
              aria-label="戻る">
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {showLogo && <Logo size="small" showText={false} />}
        </div>

        {/* 中央：タイトル */}
        <div className="flex-1 text-center px-4">
          {title && <h1 className="text-white text-lg font-semibold truncate">{title}</h1>}
        </div>

        {/* 右側：カスタムコンテンツ */}
        <div className="flex items-center space-x-2 min-w-0 flex-1 justify-end">
          {rightContent || (
            // デフォルトのオプションボタン
            <button
              className="
                p-2 rounded-full 
                bg-white bg-opacity-10 
                hover:bg-opacity-20 
                active:bg-opacity-30
                transition-all duration-200 
                transform hover:scale-105 active:scale-95
                text-white
                opacity-60
              "
              aria-label="メニュー">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* プログレスバー（現在再生中の楽曲がある場合） */}
      <div className="h-1 bg-gray-800">
        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-0 transition-all duration-300" />
      </div>
    </header>
  );
};

// ヘッダー用のプリセットコンポーネント
export const AlbumHeader = ({ albumTitle, artistName, onBack }) => (
  <Header
    title={albumTitle}
    showBackButton={true}
    transparent={true}
    rightContent={
      <div className="text-right">
        <p className="text-white text-sm font-medium truncate max-w-32">{albumTitle}</p>
        <p className="text-gray-400 text-xs truncate max-w-32">{artistName}</p>
      </div>
    }
  />
);

export const MainHeader = () => (
  <Header
    showLogo={true}
    rightContent={
      <div className="flex items-center space-x-2">
        {/* 検索ボタン */}
        <button
          className="
            p-2 rounded-full 
            bg-white bg-opacity-10 
            hover:bg-opacity-20 
            active:bg-opacity-30
            transition-all duration-200 
            transform hover:scale-105 active:scale-95
            text-white
          "
          aria-label="検索">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* 設定ボタン */}
        <button
          className="
            p-2 rounded-full 
            bg-white bg-opacity-10 
            hover:bg-opacity-20 
            active:bg-opacity-30
            transition-all duration-200 
            transform hover:scale-105 active:scale-95
            text-white
          "
          aria-label="設定">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    }
  />
);

export default Header;

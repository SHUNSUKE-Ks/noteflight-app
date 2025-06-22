// npm run dev でアプリケーションを起動

import { useState, useEffect, useRef, useCallback } from "react";

export const useMusicPlayer = (playlist = []) => {
  // 再生状態管理
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [repeat, setRepeat] = useState("none"); // 'none', 'one', 'all'
  const [shuffle, setShuffle] = useState(false);
  const [error, setError] = useState(null);

  // Audio要素の参照
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const shuffleHistoryRef = useRef([]);

  // 現在のトラック情報
  const currentTrack = playlist[currentTrackIndex] || null;

  // 音声要素の初期化
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "metadata";
    }

    const audio = audioRef.current;

    // イベントリスナー設定
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => handleTrackEnd();
    const handleError = (e) => {
      setError("音楽の読み込みに失敗しました");
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // プレイリストまたはトラックインデックス変更時の処理
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      const audio = audioRef.current;
      if (audio.src !== currentTrack.src) {
        audio.src = currentTrack.src;
        setCurrentTime(0);
        setError(null);
      }
    }
  }, [currentTrack]);

  // 音量設定
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // トラック終了時の処理
  const handleTrackEnd = useCallback(() => {
    if (repeat === "one") {
      // 1曲リピート
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else if (repeat === "all" || currentTrackIndex < playlist.length - 1) {
      // 全曲リピートまたは次の曲がある場合
      nextTrack();
    } else {
      // プレイリスト終了
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [repeat, currentTrackIndex, playlist.length]);

  // 再生・一時停止
  const togglePlay = useCallback(async () => {
    if (!audioRef.current || !currentTrack) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (_error) {
      setError("再生に失敗しました");
      setIsPlaying(false);
    }
  }, [isPlaying, currentTrack]);

  // 次のトラック
  const nextTrack = useCallback(() => {
    if (playlist.length === 0) return;

    let nextIndex;
    if (shuffle) {
      // シャッフル再生
      const availableIndexes = playlist
        .map((_, index) => index)
        .filter((index) => !shuffleHistoryRef.current.includes(index));

      if (availableIndexes.length === 0) {
        // 全曲再生済みの場合、履歴をクリア
        shuffleHistoryRef.current = [];
        nextIndex = Math.floor(Math.random() * playlist.length);
      } else {
        nextIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      }
      shuffleHistoryRef.current.push(currentTrackIndex);
    } else {
      // 通常再生
      nextIndex = (currentTrackIndex + 1) % playlist.length;
    }

    setCurrentTrackIndex(nextIndex);
  }, [currentTrackIndex, playlist.length, shuffle]);

  // 前のトラック
  const previousTrack = useCallback(() => {
    if (playlist.length === 0) return;

    if (shuffle) {
      // シャッフル時は履歴から前の曲を取得
      const lastIndex = shuffleHistoryRef.current.pop();
      if (lastIndex !== undefined) {
        setCurrentTrackIndex(lastIndex);
      } else {
        // 履歴がない場合はランダム
        const randomIndex = Math.floor(Math.random() * playlist.length);
        setCurrentTrackIndex(randomIndex);
      }
    } else {
      // 通常再生
      const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
    }
  }, [currentTrackIndex, playlist.length, shuffle]);

  // 特定のトラックを選択
  const selectTrack = useCallback(
    (index) => {
      if (index >= 0 && index < playlist.length) {
        setCurrentTrackIndex(index);
        if (shuffle) {
          shuffleHistoryRef.current = [];
        }
      }
    },
    [playlist.length, shuffle]
  );

  // シーク
  const seekTo = useCallback(
    (time) => {
      if (audioRef.current) {
        audioRef.current.currentTime = Math.max(0, Math.min(time, duration));
        setCurrentTime(audioRef.current.currentTime);
      }
    },
    [duration]
  );

  // 音量変更
  const changeVolume = useCallback(
    (newVolume) => {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      setVolume(clampedVolume);
      if (isMuted && clampedVolume > 0) {
        setIsMuted(false);
      }
    },
    [isMuted]
  );

  // ミュート切り替え
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // リピートモード切り替え
  const toggleRepeat = useCallback(() => {
    setRepeat((prev) => {
      switch (prev) {
        case "none":
          return "all";
        case "all":
          return "one";
        case "one":
          return "none";
        default:
          return "none";
      }
    });
  }, []);

  // シャッフル切り替え
  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => {
      if (!prev) {
        // シャッフルを有効にする場合、履歴をクリア
        shuffleHistoryRef.current = [];
      }
      return !prev;
    });
  }, []);

  // 進行状況（パーセンテージ）
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // フォーマット済み時間
  const formatTime = useCallback((time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    // 状態
    isPlaying,
    isLoading,
    currentTrack,
    currentTrackIndex,
    currentTime,
    duration,
    volume,
    isMuted,
    repeat,
    shuffle,
    error,
    progress,

    // アクション
    togglePlay,
    nextTrack,
    previousTrack,
    selectTrack,
    seekTo,
    changeVolume,
    toggleMute,
    toggleRepeat,
    toggleShuffle,

    // ユーティリティ
    formatTime,

    // プレイリスト情報
    hasNextTrack: shuffle || currentTrackIndex < playlist.length - 1,
    hasPreviousTrack: shuffle || currentTrackIndex > 0,
    playlistLength: playlist.length
  };
};

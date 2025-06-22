// npm run dev
// フォルダ: src/context/MusicContext.jsx

import React, { createContext, useContext, useReducer } from "react";

// 初期状態
const initialState = {
  // 現在の再生状態
  isPlaying: false,
  isPaused: false,
  isLoading: false,

  // 現在の楽曲情報
  currentTrack: null,
  currentAlbum: null,
  currentTrackIndex: 0,

  // プレイリスト管理
  playlist: [],
  playMode: "normal", // 'normal', 'repeat', 'repeat-one', 'shuffle'

  // 音声制御
  volume: 80,
  isMuted: false,
  currentTime: 0,
  duration: 0,

  // UI状態
  showPlayer: false,
  isPlayerMinimized: false,

  // エラー管理
  error: null,

  // 履歴
  playHistory: [],

  // その他
  audioElement: null
};

// アクションタイプ定数
export const MUSIC_ACTIONS = {
  // 再生制御
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  STOP: "STOP",
  TOGGLE_PLAY_PAUSE: "TOGGLE_PLAY_PAUSE",

  // 楽曲制御
  SET_CURRENT_TRACK: "SET_CURRENT_TRACK",
  NEXT_TRACK: "NEXT_TRACK",
  PREVIOUS_TRACK: "PREVIOUS_TRACK",
  SEEK_TO_TIME: "SEEK_TO_TIME",

  // プレイリスト制御
  SET_PLAYLIST: "SET_PLAYLIST",
  ADD_TO_PLAYLIST: "ADD_TO_PLAYLIST",
  REMOVE_FROM_PLAYLIST: "REMOVE_FROM_PLAYLIST",
  CLEAR_PLAYLIST: "CLEAR_PLAYLIST",
  SHUFFLE_PLAYLIST: "SHUFFLE_PLAYLIST",

  // 再生モード
  SET_PLAY_MODE: "SET_PLAY_MODE",
  TOGGLE_REPEAT: "TOGGLE_REPEAT",
  TOGGLE_SHUFFLE: "TOGGLE_SHUFFLE",

  // 音量制御
  SET_VOLUME: "SET_VOLUME",
  TOGGLE_MUTE: "TOGGLE_MUTE",

  // 時間更新
  UPDATE_TIME: "UPDATE_TIME",
  SET_DURATION: "SET_DURATION",

  // ローディング状態
  SET_LOADING: "SET_LOADING",

  // UI制御
  SHOW_PLAYER: "SHOW_PLAYER",
  HIDE_PLAYER: "HIDE_PLAYER",
  TOGGLE_PLAYER_SIZE: "TOGGLE_PLAYER_SIZE",

  // エラー管理
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",

  // その他
  SET_AUDIO_ELEMENT: "SET_AUDIO_ELEMENT",
  ADD_TO_HISTORY: "ADD_TO_HISTORY",
  CLEAR_HISTORY: "CLEAR_HISTORY"
};

// リデューサー関数
const musicReducer = (state, action) => {
  switch (action.type) {
    case MUSIC_ACTIONS.PLAY:
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
        error: null
      };

    case MUSIC_ACTIONS.PAUSE:
      return {
        ...state,
        isPlaying: false,
        isPaused: true
      };

    case MUSIC_ACTIONS.STOP:
      return {
        ...state,
        isPlaying: false,
        isPaused: false,
        currentTime: 0
      };

    case MUSIC_ACTIONS.TOGGLE_PLAY_PAUSE:
      return {
        ...state,
        isPlaying: !state.isPlaying,
        isPaused: state.isPlaying
      };

    case MUSIC_ACTIONS.SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload.track,
        currentAlbum: action.payload.album,
        currentTrackIndex: action.payload.index || 0,
        showPlayer: true,
        error: null
      };

    case MUSIC_ACTIONS.NEXT_TRACK:
      const nextIndex = getNextTrackIndex(state);
      if (nextIndex !== null && state.playlist[nextIndex]) {
        return {
          ...state,
          currentTrackIndex: nextIndex,
          currentTrack: state.playlist[nextIndex],
          currentTime: 0
        };
      }
      return state;

    case MUSIC_ACTIONS.PREVIOUS_TRACK:
      const prevIndex = getPreviousTrackIndex(state);
      if (prevIndex !== null && state.playlist[prevIndex]) {
        return {
          ...state,
          currentTrackIndex: prevIndex,
          currentTrack: state.playlist[prevIndex],
          currentTime: 0
        };
      }
      return state;

    case MUSIC_ACTIONS.SEEK_TO_TIME:
      return {
        ...state,
        currentTime: action.payload
      };

    case MUSIC_ACTIONS.SET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload.tracks,
        currentAlbum: action.payload.album
      };

    case MUSIC_ACTIONS.ADD_TO_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, action.payload]
      };

    case MUSIC_ACTIONS.REMOVE_FROM_PLAYLIST:
      const filteredPlaylist = state.playlist.filter((_, index) => index !== action.payload);
      return {
        ...state,
        playlist: filteredPlaylist,
        currentTrackIndex:
          state.currentTrackIndex > action.payload ? state.currentTrackIndex - 1 : state.currentTrackIndex
      };

    case MUSIC_ACTIONS.CLEAR_PLAYLIST:
      return {
        ...state,
        playlist: [],
        currentTrack: null,
        currentAlbum: null,
        currentTrackIndex: 0,
        isPlaying: false,
        isPaused: false,
        showPlayer: false
      };

    case MUSIC_ACTIONS.SHUFFLE_PLAYLIST:
      return {
        ...state,
        playlist: shuffleArray([...state.playlist])
      };

    case MUSIC_ACTIONS.SET_PLAY_MODE:
      return {
        ...state,
        playMode: action.payload
      };

    case MUSIC_ACTIONS.TOGGLE_REPEAT:
      const repeatModes = ["normal", "repeat", "repeat-one"];
      const currentIndex = repeatModes.indexOf(state.playMode);
      const nextRepeatMode = repeatModes[(currentIndex + 1) % repeatModes.length];
      return {
        ...state,
        playMode: nextRepeatMode
      };

    case MUSIC_ACTIONS.TOGGLE_SHUFFLE:
      return {
        ...state,
        playMode: state.playMode === "shuffle" ? "normal" : "shuffle"
      };

    case MUSIC_ACTIONS.SET_VOLUME:
      return {
        ...state,
        volume: Math.max(0, Math.min(100, action.payload)),
        isMuted: action.payload === 0
      };

    case MUSIC_ACTIONS.TOGGLE_MUTE:
      return {
        ...state,
        isMuted: !state.isMuted
      };

    case MUSIC_ACTIONS.UPDATE_TIME:
      return {
        ...state,
        currentTime: action.payload
      };

    case MUSIC_ACTIONS.SET_DURATION:
      return {
        ...state,
        duration: action.payload
      };

    case MUSIC_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case MUSIC_ACTIONS.SHOW_PLAYER:
      return {
        ...state,
        showPlayer: true
      };

    case MUSIC_ACTIONS.HIDE_PLAYER:
      return {
        ...state,
        showPlayer: false
      };

    case MUSIC_ACTIONS.TOGGLE_PLAYER_SIZE:
      return {
        ...state,
        isPlayerMinimized: !state.isPlayerMinimized
      };

    case MUSIC_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case MUSIC_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case MUSIC_ACTIONS.SET_AUDIO_ELEMENT:
      return {
        ...state,
        audioElement: action.payload
      };

    case MUSIC_ACTIONS.ADD_TO_HISTORY:
      const newHistory = [action.payload, ...state.playHistory.slice(0, 49)]; // 最大50件
      return {
        ...state,
        playHistory: newHistory
      };

    case MUSIC_ACTIONS.CLEAR_HISTORY:
      return {
        ...state,
        playHistory: []
      };

    default:
      return state;
  }
};

// ヘルパー関数
const getNextTrackIndex = (state) => {
  const { currentTrackIndex, playlist, playMode } = state;

  if (playlist.length === 0) return null;

  switch (playMode) {
    case "repeat-one":
      return currentTrackIndex;

    case "shuffle":
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * playlist.length);
      } while (randomIndex === currentTrackIndex && playlist.length > 1);
      return randomIndex;

    case "repeat":
      return (currentTrackIndex + 1) % playlist.length;

    case "normal":
    default:
      return currentTrackIndex + 1 < playlist.length ? currentTrackIndex + 1 : null;
  }
};

const getPreviousTrackIndex = (state) => {
  const { currentTrackIndex, playlist, playMode } = state;

  if (playlist.length === 0) return null;

  switch (playMode) {
    case "repeat-one":
      return currentTrackIndex;

    case "shuffle":
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * playlist.length);
      } while (randomIndex === currentTrackIndex && playlist.length > 1);
      return randomIndex;

    case "repeat":
      return currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;

    case "normal":
    default:
      return currentTrackIndex > 0 ? currentTrackIndex - 1 : null;
  }
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Context作成（エクスポート追加）
const MusicContext = createContext();
export { MusicContext };

// Provider コンポーネント
export const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  return <MusicContext.Provider value={{ state, dispatch }}>{children}</MusicContext.Provider>;
};

// カスタムフック
export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicContext は MusicProvider 内で使用してください");
  }
  return context;
};

// アクション作成ヘルパー
export const musicActions = {
  play: () => ({ type: MUSIC_ACTIONS.PLAY }),
  pause: () => ({ type: MUSIC_ACTIONS.PAUSE }),
  stop: () => ({ type: MUSIC_ACTIONS.STOP }),
  togglePlayPause: () => ({ type: MUSIC_ACTIONS.TOGGLE_PLAY_PAUSE }),

  setCurrentTrack: (track, album, index) => ({
    type: MUSIC_ACTIONS.SET_CURRENT_TRACK,
    payload: { track, album, index }
  }),

  nextTrack: () => ({ type: MUSIC_ACTIONS.NEXT_TRACK }),
  previousTrack: () => ({ type: MUSIC_ACTIONS.PREVIOUS_TRACK }),
  seekToTime: (time) => ({ type: MUSIC_ACTIONS.SEEK_TO_TIME, payload: time }),

  setPlaylist: (tracks, album) => ({
    type: MUSIC_ACTIONS.SET_PLAYLIST,
    payload: { tracks, album }
  }),

  addToPlaylist: (track) => ({
    type: MUSIC_ACTIONS.ADD_TO_PLAYLIST,
    payload: track
  }),

  setVolume: (volume) => ({ type: MUSIC_ACTIONS.SET_VOLUME, payload: volume }),
  toggleMute: () => ({ type: MUSIC_ACTIONS.TOGGLE_MUTE }),

  setPlayMode: (mode) => ({ type: MUSIC_ACTIONS.SET_PLAY_MODE, payload: mode }),
  toggleRepeat: () => ({ type: MUSIC_ACTIONS.TOGGLE_REPEAT }),
  toggleShuffle: () => ({ type: MUSIC_ACTIONS.TOGGLE_SHUFFLE }),

  updateTime: (time) => ({ type: MUSIC_ACTIONS.UPDATE_TIME, payload: time }),
  setDuration: (duration) => ({ type: MUSIC_ACTIONS.SET_DURATION, payload: duration }),

  setLoading: (loading) => ({ type: MUSIC_ACTIONS.SET_LOADING, payload: loading }),
  setError: (error) => ({ type: MUSIC_ACTIONS.SET_ERROR, payload: error }),
  clearError: () => ({ type: MUSIC_ACTIONS.CLEAR_ERROR }),

  showPlayer: () => ({ type: MUSIC_ACTIONS.SHOW_PLAYER }),
  hidePlayer: () => ({ type: MUSIC_ACTIONS.HIDE_PLAYER }),
  togglePlayerSize: () => ({ type: MUSIC_ACTIONS.TOGGLE_PLAYER_SIZE }),

  setAudioElement: (element) => ({
    type: MUSIC_ACTIONS.SET_AUDIO_ELEMENT,
    payload: element
  }),

  addToHistory: (track) => ({
    type: MUSIC_ACTIONS.ADD_TO_HISTORY,
    payload: track
  })
};

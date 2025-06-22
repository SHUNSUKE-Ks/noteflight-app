// npm run dev

/**
 * 時間文字列（MM:SS）を秒数に変換
 * @param {string} timeString - "4:32" 形式の時間文字列
 * @returns {number} 秒数
 */
export const timeStringToSeconds = (timeString) => {
  if (!timeString || typeof timeString !== "string") return 0;

  const parts = timeString.split(":");
  if (parts.length !== 2) return 0;

  const minutes = parseInt(parts[0], 10) || 0;
  const seconds = parseInt(parts[1], 10) || 0;

  return minutes * 60 + seconds;
};

/**
 * 秒数を時間文字列（MM:SS）に変換
 * @param {number} seconds - 秒数
 * @returns {string} "MM:SS" 形式の文字列
 */
export const secondsToTimeString = (seconds) => {
  if (!seconds || seconds < 0) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

/**
 * 秒数を時間文字列（H:MM:SS または MM:SS）に変換
 * @param {number} seconds - 秒数
 * @returns {string} 時間文字列
 */
export const secondsToDetailedTimeString = (seconds) => {
  if (!seconds || seconds < 0) return "0:00";

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  } else {
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
};

/**
 * 音声ファイルのプリロード
 * @param {string} audioUrl - 音声ファイルのURL
 * @returns {Promise<HTMLAudioElement>} プリロードされたAudio要素
 */
export const preloadAudio = (audioUrl) => {
  return new Promise((resolve, reject) => {
    if (!audioUrl) {
      reject(new Error("音声URLが提供されていません"));
      return;
    }

    const audio = new Audio();

    const handleLoad = () => {
      audio.removeEventListener("canplaythrough", handleLoad);
      audio.removeEventListener("error", handleError);
      resolve(audio);
    };

    const handleError = () => {
      audio.removeEventListener("canplaythrough", handleLoad);
      audio.removeEventListener("error", handleError);
      reject(new Error(`音声ファイルの読み込みに失敗しました: ${audioUrl}`));
    };

    audio.addEventListener("canplaythrough", handleLoad);
    audio.addEventListener("error", handleError);

    audio.preload = "auto";
    audio.src = audioUrl;
  });
};

/**
 * 複数の音声ファイルを一括プリロード
 * @param {string[]} audioUrls - 音声ファイルのURL配列
 * @returns {Promise<HTMLAudioElement[]>} プリロードされたAudio要素の配列
 */
export const preloadMultipleAudio = async (audioUrls) => {
  try {
    const promises = audioUrls.map((url) => preloadAudio(url));
    return await Promise.all(promises);
  } catch (error) {
    console.warn("一部の音声ファイルのプリロードに失敗しました:", error);
    return [];
  }
};

/**
 * 音声ファイルの再生時間を取得
 * @param {string} audioUrl - 音声ファイルのURL
 * @returns {Promise<number>} 再生時間（秒）
 */
export const getAudioDuration = (audioUrl) => {
  return new Promise((resolve, reject) => {
    if (!audioUrl) {
      reject(new Error("音声URLが提供されていません"));
      return;
    }

    const audio = new Audio();

    const handleLoadedMetadata = () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
      resolve(audio.duration);
    };

    const handleError = () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
      reject(new Error(`音声ファイルのメタデータ取得に失敗しました: ${audioUrl}`));
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);

    audio.src = audioUrl;
  });
};

/**
 * 音量をパーセンテージからAudio要素の値に変換
 * @param {number} percentage - 0-100の音量パーセンテージ
 * @returns {number} 0.0-1.0のAudio要素用音量値
 */
export const percentageToVolume = (percentage) => {
  return Math.max(0, Math.min(100, percentage)) / 100;
};

/**
 * Audio要素の音量値をパーセンテージに変換
 * @param {number} volume - 0.0-1.0のAudio要素音量値
 * @returns {number} 0-100の音量パーセンテージ
 */
export const volumeToPercentage = (volume) => {
  return Math.round(Math.max(0, Math.min(1, volume)) * 100);
};

/**
 * 音声ファイルのフォーマットをチェック
 * @param {string} audioUrl - 音声ファイルのURL
 * @returns {string|null} 音声フォーマット（mp3, wav, ogg等）またはnull
 */
export const getAudioFormat = (audioUrl) => {
  if (!audioUrl || typeof audioUrl !== "string") return null;

  const extension = audioUrl.split(".").pop()?.toLowerCase();
  const supportedFormats = ["mp3", "wav", "ogg", "aac", "flac", "m4a"];

  return supportedFormats.includes(extension) ? extension : null;
};

/**
 * ブラウザが特定の音声フォーマットをサポートしているかチェック
 * @param {string} format - 音声フォーマット（mp3, wav, ogg等）
 * @returns {boolean} サポート状況
 */
export const isFormatSupported = (format) => {
  const audio = new Audio();
  const mimeTypes = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    aac: "audio/aac",
    flac: "audio/flac",
    m4a: "audio/mp4"
  };

  const mimeType = mimeTypes[format?.toLowerCase()];
  if (!mimeType) return false;

  return audio.canPlayType(mimeType) !== "";
};

/**
 * 現在の再生位置をパーセンテージで取得
 * @param {HTMLAudioElement} audio - Audio要素
 * @returns {number} 0-100の再生位置パーセンテージ
 */
export const getPlaybackPercentage = (audio) => {
  if (!audio || !audio.duration || audio.duration === 0) return 0;
  return (audio.currentTime / audio.duration) * 100;
};

/**
 * パーセンテージから再生位置を設定
 * @param {HTMLAudioElement} audio - Audio要素
 * @param {number} percentage - 0-100の再生位置パーセンテージ
 */
export const setPlaybackPercentage = (audio, percentage) => {
  if (!audio || !audio.duration) return;

  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  audio.currentTime = (clampedPercentage / 100) * audio.duration;
};

/**
 * 音声ファイルの読み込み状況を取得
 * @param {HTMLAudioElement} audio - Audio要素
 * @returns {object} 読み込み状況の詳細
 */
export const getLoadingStatus = (audio) => {
  if (!audio) {
    return {
      readyState: 0,
      readyStateName: "HAVE_NOTHING",
      canPlay: false,
      buffered: 0
    };
  }

  const readyStateNames = [
    "HAVE_NOTHING",
    "HAVE_METADATA",
    "HAVE_CURRENT_DATA",
    "HAVE_FUTURE_DATA",
    "HAVE_ENOUGH_DATA"
  ];

  let bufferedPercentage = 0;
  if (audio.buffered.length > 0 && audio.duration) {
    const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
    bufferedPercentage = (bufferedEnd / audio.duration) * 100;
  }

  return {
    readyState: audio.readyState,
    readyStateName: readyStateNames[audio.readyState] || "UNKNOWN",
    canPlay: audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA,
    buffered: Math.round(bufferedPercentage)
  };
};

/**
 * Audio要素のエラー情報を取得
 * @param {HTMLAudioElement} audio - Audio要素
 * @returns {string|null} エラーメッセージまたはnull
 */
export const getAudioError = (audio) => {
  if (!audio || !audio.error) return null;

  const errorMessages = {
    1: "メディアの取得が中断されました",
    2: "ネットワークエラーが発生しました",
    3: "メディアのデコードでエラーが発生しました",
    4: "メディアフォーマットがサポートされていません"
  };

  return errorMessages[audio.error.code] || `不明なエラー (コード: ${audio.error.code})`;
};

/**
 * フェードイン効果
 * @param {HTMLAudioElement} audio - Audio要素
 * @param {number} duration - フェード時間（ミリ秒）
 * @param {number} targetVolume - 目標音量（0.0-1.0）
 */
export const fadeIn = (audio, duration = 1000, targetVolume = 1.0) => {
  if (!audio) return;

  audio.volume = 0;
  const startTime = Date.now();

  const fade = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    audio.volume = progress * targetVolume;

    if (progress < 1) {
      requestAnimationFrame(fade);
    }
  };

  requestAnimationFrame(fade);
};

/**
 * フェードアウト効果
 * @param {HTMLAudioElement} audio - Audio要素
 * @param {number} duration - フェード時間（ミリ秒）
 * @param {Function} onComplete - 完了時のコールバック
 */
export const fadeOut = (audio, duration = 1000, onComplete = null) => {
  if (!audio) return;

  const startVolume = audio.volume;
  const startTime = Date.now();

  const fade = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    audio.volume = startVolume * (1 - progress);

    if (progress < 1) {
      requestAnimationFrame(fade);
    } else {
      audio.volume = 0;
      if (onComplete) onComplete();
    }
  };

  requestAnimationFrame(fade);
};

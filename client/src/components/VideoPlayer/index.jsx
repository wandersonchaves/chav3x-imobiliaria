import { useEffect, useState } from 'react';

export function useVideoPlayer(videoElement) {
  const [playerState, setPlayerState] = useState({
    isPlaying: true,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  return {
    playerState,
    togglePlay,
  };
}

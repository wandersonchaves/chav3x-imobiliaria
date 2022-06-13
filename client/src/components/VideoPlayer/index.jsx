import { useEffect, useState } from 'react';

export function useVideoPlayer(videoElement) {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying && videoElement.current.play();
  }, [playerState.isPlaying, videoElement]);

  return {
    playerState,
    togglePlay,
  };
}

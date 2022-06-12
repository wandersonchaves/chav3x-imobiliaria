import { useEffect, useState } from 'react';

export function useVideoPlayer(videoElement) {
  const [playerState, setPlayerState] = useState({
    isPlaying: true,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  // const [isPlaying, setIsPlaying] = useState(true);
  // const [progress, setProgress] = useState(0);
  // const [speed, setSpeed] = useState(1);
  // const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    // setIsPlaying(...isPlaying, !isPlaying);

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

  const handleOnTimeUpdate = () => {
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;

    // setProgress({ ...progress, progress });

    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime =
      (videoElement.current.duration / 100) * manualChange;

    // setProgress({ ...progress, progress: manualChange });

    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;

    // setSpeed({ ...speed, speed });

    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const toggleMute = () => {
    // setIsMuted({ ...isMuted, isMuted: !isMuted });

    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);

  return {
    // isPlaying,
    // progress,
    // speed,
    // isMuted,
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  };
}

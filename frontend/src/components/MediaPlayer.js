// MediaPlayer.js
import React, { useRef, useState, useEffect } from "react";

const MediaPlayer = ({ videoSrc = "", onClose="" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pausedAt, setPausedAt] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleTimeUpdate = () => {
        setCurrentTime(videoElement.currentTime);
      };

      const handleLoadedMetadata = () => {
        setDuration(videoElement.duration);
      };

      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        setPausedAt(videoElement.currentTime);
      } else {
        videoElement.play();
        setPausedAt(null);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
      setIsPlaying(false);
      setPausedAt(null);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black">
      <div className="relative w-[90%] h-[85vh] flex bg-black bg-opacity-75 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full rounded-lg"
            src={videoSrc}
            controls={false}
            onClick={handlePlayPause}
          ></video>
          <button
            onClick={handlePlayPause}
            className={`absolute top-10 right-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ${isPlaying ? "opacity-100" : "opacity-50"}`}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={handleStop}
            className="absolute top-10 right-20 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Stop
          </button>
          <button
            onClick={onClose}
            className="absolute top-10 left-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 p-4 text-white">
          <div className="flex justify-between">
            <p>
              <strong>Current Time:</strong> {formatTime(currentTime)}
            </p>
            <p>
              <strong>Duration:</strong> {formatTime(duration)}
            </p>
            <p>
              <strong>Paused At:</strong> {pausedAt !== null ? formatTime(pausedAt) : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;

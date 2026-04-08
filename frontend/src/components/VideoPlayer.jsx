import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, Heart } from 'lucide-react';

export default function VideoPlayer({ videoUrl, videoDuration = 0 }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const containerRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSkip = (direction) => {
    if (videoRef.current) {
      videoRef.current.currentTime += direction === 'forward' ? 10 : -10;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-black w-full ${isFullscreen ? 'h-screen' : 'aspect-video'} group`}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-full"
      />

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress bar */}
        <input
          type="range"
          min="0"
          max={videoDuration || (videoRef.current?.duration || 0)}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-1 bg-dark-600 rounded cursor-pointer accent-red-600 mb-4"
        />

        <div className="flex items-center justify-between text-white">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <button onClick={togglePlay} className="hover:text-red-600 transition">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button onClick={() => handleSkip('backward')} className="hover:text-red-600 transition">
              <SkipBack size={20} />
            </button>

            <button onClick={() => handleSkip('forward')} className="hover:text-red-600 transition">
              <SkipForward size={20} />
            </button>

            <div className="flex items-center gap-1 ml-4">
              <button onClick={toggleMute} className="hover:text-red-600 transition">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-dark-600 rounded cursor-pointer accent-red-600"
              />
            </div>

            <span className="ml-4 text-sm">
              {formatTime(currentTime)} / {formatTime(videoDuration)}
            </span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`transition ${isLiked ? 'text-red-600' : 'hover:text-red-600'}`}
            >
              <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
            </button>

            <button onClick={toggleFullscreen} className="hover:text-red-600 transition">
              <Maximize2 size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Play button overlay */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center hover:bg-black/20 transition group/play"
        >
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover/play:scale-110 transition">
            <Play size={48} className="text-white ml-1" fill="white" />
          </div>
        </button>
      )}
    </div>
  );
}

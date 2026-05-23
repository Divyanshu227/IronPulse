import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"; 

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } catch (e) {
      console.log("Audio action interrupted or blocked.", e);
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.volume = 0.3; 
      setIsPlaying(!audioEl.paused);
      
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audioEl.addEventListener('play', handlePlay);
      audioEl.addEventListener('pause', handlePause);

      return () => {
        audioEl.removeEventListener('play', handlePlay);
        audioEl.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioSrc} loop />
      <button 
        className={`audio-btn ${isPlaying ? 'playing' : ''}`} 
        onClick={togglePlay}
        title="Toggle Energy Music"
      >
        {isPlaying ? (
          <>
            <span className="equalizer">
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
              <span className="bar bar-3"></span>
            </span>
            <Volume2 size={20} />
          </>
        ) : (
          <>
            <span style={{ fontSize: '1rem', marginRight: '6px' }}>BOOST ENERGY</span>
            <VolumeX size={20} />
          </>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;

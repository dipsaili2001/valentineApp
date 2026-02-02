import { useEffect, useState, useRef } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function SuccessPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      if (!playerContainerRef.current) return;

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'b_CpWmkhwq0',
        playerVars: {
          autoplay: 1,
          start: 45,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            event.target.unMute();
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(45);
              event.target.playVideo();
            }
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Error destroying player:', error);
        }
      }
    };
  }, []);

  const toggleMute = () => {
    if (!playerRef.current || !isPlayerReady) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 dark:from-pink-900 dark:via-rose-900 dark:to-red-900 overflow-hidden relative">
      <div ref={playerContainerRef} className="absolute opacity-0 pointer-events-none">
        <div id="youtube-player"></div>
      </div>

      {isPlayerReady && (
        <Button
          onClick={toggleMute}
          size="icon"
          variant="outline"
          className="fixed top-4 right-4 z-30 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg backdrop-blur-sm"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          ) : (
            <Volume2 className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          )}
        </Button>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-400/30 dark:text-rose-500/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div
        className={`relative z-10 text-center px-4 transition-all duration-1000 flex-1 flex flex-col items-center justify-center ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      >
        <div className="mb-8 animate-bounce-slow">
          <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full shadow-2xl border-8 border-rose-300 dark:border-rose-700 overflow-hidden bg-rose-100 dark:bg-rose-900/30">
            <img
              src="https://media.giphy.com/media/4N1wOi78ZGzSB6H7vK/giphy.gif"
              alt="Cute hearts"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-rose-600 dark:text-rose-400 animate-pulse-slow">
          Yay! I knew you'd say yes 💖
        </h1>

        <p className="text-xl md:text-2xl text-rose-500 dark:text-rose-300 mb-8">
          You've made me the happiest person in the world!
        </p>

        <div className="flex justify-center gap-4">
          <Heart className="text-rose-500 animate-heartbeat" size={32} fill="currentColor" />
          <Heart className="text-rose-400 animate-heartbeat delay-100" size={32} fill="currentColor" />
          <Heart className="text-rose-500 animate-heartbeat delay-200" size={32} fill="currentColor" />
        </div>

        {isPlayerReady && (
          <p className="mt-6 text-sm text-rose-500 dark:text-rose-400 flex items-center gap-2 justify-center">
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 animate-pulse" />
            )}
            Now playing: Those Eyes by New West
          </p>
        )}
      </div>

      <footer className="relative z-10 pb-4 text-center text-rose-600 dark:text-rose-400 text-sm">
        Made with <Heart className="inline w-4 h-4 text-rose-500" fill="currentColor" /> by Dipesh
      </footer>
    </div>
  );
}

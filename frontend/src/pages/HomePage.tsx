import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import FloatingHearts from '@/components/FloatingHearts';
import { Heart } from 'lucide-react';

interface HomePageProps {
  onYesClick: () => void;
}

export default function HomePage({ onYesClick }: HomePageProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = (clientX: number, clientY: number) => {
    if (!noButtonRef.current || !containerRef.current) return;

    const button = noButtonRef.current;
    const container = containerRef.current;
    const rect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate distance from pointer to button center
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(clientX - buttonCenterX, 2) + Math.pow(clientY - buttonCenterY, 2)
    );

    // Large trigger radius - runs away before cursor/touch can reach it
    if (distance < 250) {
      const padding = 20;
      const maxX = Math.max(0, containerRect.width - rect.width - padding);
      const maxY = Math.max(0, containerRect.height - rect.height - padding);

      let newX = Math.random() * maxX;
      let newY = Math.random() * maxY;

      const minDistance = 300;
      let attempts = 0;
      while (attempts < 15) {
        const distanceFromPointer = Math.sqrt(
          Math.pow(clientX - (containerRect.left + newX + rect.width / 2), 2) +
          Math.pow(clientY - (containerRect.top + newY + rect.height / 2), 2)
        );

        if (distanceFromPointer > minDistance) break;

        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
        attempts++;
      }

      setNoButtonPosition({ x: newX, y: newY });
      setIsNoButtonMoved(true);
    }
  };

  useEffect(() => {
    const handlePointer = (clientX: number, clientY: number) => {
      moveNoButton(clientX, clientY);
    };

    const handleMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Use document for reliable touch/mouse capture on all devices
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 dark:from-pink-950 dark:via-rose-950 dark:to-red-950"
    >
      <FloatingHearts />

      <div className="relative z-10 text-center px-4 animate-in fade-in duration-1000 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 text-rose-600 dark:text-rose-400 animate-in zoom-in duration-700">
          Will you be my Valentine 👉👈?
        </h1>

        <p className="text-rose-500 dark:text-rose-400 text-sm mb-8 animate-in fade-in duration-1000 delay-150">
          (psst... the No button is a little shy)
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center relative min-h-[120px] w-full">
          <Button
            onClick={onYesClick}
            size="lg"
            className="text-lg px-12 py-6 bg-rose-500 hover:bg-rose-600 text-white shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-110 animate-in slide-in-from-bottom-4"
          >
            Yes! 💖
          </Button>

          <Button
            ref={noButtonRef}
            size="lg"
            className="text-lg px-12 py-6 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 animate-in slide-in-from-bottom-4 delay-150 touch-none pointer-events-none select-none cursor-default"
            style={{
              position: isNoButtonMoved ? 'absolute' : 'relative',
              left: isNoButtonMoved ? `${noButtonPosition.x}px` : 'auto',
              top: isNoButtonMoved ? `${noButtonPosition.y}px` : 'auto',
              transition: 'all 0.3s ease-out',
            }}
          >
            No 😢💔
          </Button>
        </div>
      </div>

      <footer className="relative z-10 pb-4 text-center text-rose-600 dark:text-rose-400 text-sm">
        Made with <Heart className="inline w-4 h-4 text-rose-500" fill="currentColor" /> by Dipesh
      </footer>
    </div>
  );
}

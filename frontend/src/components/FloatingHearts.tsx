import { Heart } from 'lucide-react';

export default function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <Heart
          key={i}
          className="absolute text-rose-400/40 dark:text-rose-500/30 animate-float-up"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-50px',
            width: `${15 + Math.random() * 30}px`,
            height: `${15 + Math.random() * 30}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

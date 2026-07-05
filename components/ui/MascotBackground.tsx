import React from 'react';
import { Mascot, MascotEmote } from './Mascot';

const mascotConfig: { id: number; emote: MascotEmote; top: string; left: string; delay: string; duration: string; scale: number; rotation: number }[] = [
  { id: 1, emote: 'happy', top: '10%', left: '5%', delay: '0s', duration: '6s', scale: 0.8, rotation: -10 },
  { id: 2, emote: 'starry', top: '25%', left: '80%', delay: '1s', duration: '7s', scale: 1.2, rotation: 15 },
  { id: 3, emote: 'idea', top: '60%', left: '15%', delay: '2.5s', duration: '6.5s', scale: 0.9, rotation: -5 },
  { id: 4, emote: 'love', top: '75%', left: '75%', delay: '1.5s', duration: '8s', scale: 1.1, rotation: 20 },
  { id: 5, emote: 'wink', top: '40%', left: '50%', delay: '3s', duration: '7s', scale: 1, rotation: 5 },
  { id: 6, emote: 'laugh', top: '85%', left: '40%', delay: '0.5s', duration: '6s', scale: 0.85, rotation: -15 },
  { id: 7, emote: 'blush', top: '15%', left: '60%', delay: '4s', duration: '7.5s', scale: 0.95, rotation: 10 },
  { id: 8, emote: 'proud', top: '50%', left: '90%', delay: '2s', duration: '6s', scale: 1.05, rotation: -25 },
];

export function MascotBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {mascotConfig.map((config) => (
        <div
          key={config.id}
          className="absolute opacity-15 animate-float"
          style={{
            top: config.top,
            left: config.left,
            animationDelay: config.delay,
            animationDuration: config.duration,
            transform: `scale(${config.scale}) rotate(${config.rotation}deg)`,
          }}
        >
          <Mascot emote={config.emote} size={96} className="drop-shadow-xl" />
        </div>
      ))}
      
      {/* Soft gradient overlay to blend things elegantly */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-transparent to-white/80" />
    </div>
  );
}

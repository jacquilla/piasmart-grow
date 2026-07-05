import React from 'react'
import Image from 'next/image'

export type MascotEmote = 
  | 'wink' | 'happy' | 'sad'
  | 'angry' | 'salute' | 'starry'
  | 'cry' | 'shocked' | 'love'
  | 'idea' | 'laugh' | 'nervous'
  | 'blush' | 'proud' | 'ok'
  | 'angry-1' | 'angry-2'
  | 'celebrate-3'
  | 'confused-1' | 'confused-2'
  | 'idea-1' | 'idea-2'
  | 'laugh-2'
  | 'love-1' | 'love-2'
  | 'proud-1' | 'proud-2'
  | 'sad-1' | 'sad-2'
  | 'sleepy-1'
  | 'smile-1' | 'smile-2' | 'smile-3'
  | 'starry-1' | 'starry-2'
  | 'thinking-1' | 'thinking-2'

interface MascotProps {
  emote?: MascotEmote
  className?: string
  size?: number
}

const EMOTE_FILE_MAP: Record<MascotEmote, string> = {
  // Legacy mappings for backwards compatibility
  happy:   'smile-1.webp',
  wink:    'smile-2.webp',
  sad:     'sad-1.webp',
  angry:   'angry-1.webp',
  salute:  'proud-2.webp',
  starry:  'starry-1.webp',
  cry:     'sad-2.webp',
  shocked: 'confused-1.webp',
  love:    'love-1.webp',
  idea:    'idea-1.webp',
  laugh:   'laugh-2.webp',
  nervous: 'confused-2.webp',
  blush:   'smile-3.webp',
  proud:   'proud-1.webp',
  ok:      'celebrate-3.webp',
  
  // Direct file mappings
  'angry-1': 'angry-1.webp',
  'angry-2': 'angry-2.webp',
  'celebrate-3': 'celebrate-3.webp',
  'confused-1': 'confused-1.webp',
  'confused-2': 'confused-2.webp',
  'idea-1': 'idea-1.webp',
  'idea-2': 'idea-2.webp',
  'laugh-2': 'laugh-2.webp',
  'love-1': 'love-1.webp',
  'love-2': 'love-2.webp',
  'proud-1': 'proud-1.webp',
  'proud-2': 'proud-2.webp',
  'sad-1': 'sad-1.webp',
  'sad-2': 'sad-2.webp',
  'sleepy-1': 'sleepy-1.webp',
  'smile-1': 'smile-1.webp',
  'smile-2': 'smile-2.webp',
  'smile-3': 'smile-3.webp',
  'starry-1': 'starry-1.webp',
  'starry-2': 'starry-2.webp',
  'thinking-1': 'thinking-1.webp',
  'thinking-2': 'thinking-2.webp',
}

export function Mascot({ emote = 'happy', className = '', size = 64 }: MascotProps) {
  const fileName = EMOTE_FILE_MAP[emote] || EMOTE_FILE_MAP.happy

  return (
    <div 
      className={`inline-flex shrink-0 relative ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={`/mascots/${fileName}`}
        alt={`Mascot ${emote}`}
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority={size >= 64}
      />
    </div>
  )
}

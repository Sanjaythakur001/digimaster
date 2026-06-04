import { motion } from 'framer-motion'

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#a855f7', '#06b6d4', '#eab308']

// Deterministic pseudo-random so it works without Math.random restrictions concerns
function rand(seed) {
  const x = Math.sin(seed * 99.13) * 10000
  return x - Math.floor(x)
}

export default function Confetti({ count = 60 }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = rand(i + 1) * 100
        const delay = rand(i + 2) * 0.6
        const dur = 1.6 + rand(i + 3) * 1.4
        const size = 6 + rand(i + 4) * 8
        const color = COLORS[i % COLORS.length]
        const rotate = rand(i + 5) * 720 - 360
        return (
          <motion.span
            key={i}
            initial={{ y: -40, x: 0, opacity: 1, rotate: 0 }}
            animate={{ y: '105vh', x: (rand(i + 6) - 0.5) * 200, opacity: [1, 1, 0.9, 0], rotate }}
            transition={{ duration: dur, delay, ease: 'easeIn' }}
            style={{ position: 'absolute', left: `${left}%`, width: size, height: size * 0.6, background: color, borderRadius: 2 }}
          />
        )
      })}
    </div>
  )
}

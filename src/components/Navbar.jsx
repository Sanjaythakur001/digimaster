import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { BookOpen, Network, Gamepad2, Sun, Moon, Menu, X } from 'lucide-react'
import { useProgress } from '../context/ProgressContext.jsx'

const links = [
  { to: '/theory', label: 'Theory Library', icon: BookOpen },
  { to: '/map', label: 'Neuro Map', icon: Network },
  { to: '/simulator', label: 'Campaign Simulator', icon: Gamepad2 },
]

export default function Navbar() {
  const { overallPct, theme, toggleTheme } = useProgress()
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  return (
    <header className="sticky top-0 z-50">
      {/* top progress bar */}
      <div className="h-1 w-full bg-white/5">
        <motion.div className="h-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-green"
          animate={{ width: `${overallPct}%` }} transition={{ duration: 0.6 }} />
      </div>

      <nav className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <span className="relative grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple">
              <span className="absolute inset-0 rounded-xl bg-brand-blue animate-ping opacity-30" />
              <span className="relative w-3 h-3 rounded-full bg-white" />
            </span>
            <span className="font-display font-extrabold text-lg tracking-tight">
              Digi<span className="gradient-text">Master</span>
            </span>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
                  }`}>
                <l.icon size={16} /> {l.label}
              </NavLink>
            ))}
          </div>

          {/* right */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 border border-white/10">
              <span className="text-xs text-slate-400">Progress</span>
              <span className="text-sm font-bold gradient-text">{overallPct}%</span>
            </div>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="grid place-items-center w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setOpen((o) => !o)} className="md:hidden grid place-items-center w-9 h-9 rounded-xl bg-white/5 border border-white/10">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            className="md:hidden border-t border-white/10 overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${isActive ? 'bg-white/10 text-white' : 'text-slate-300'}`}>
                  <l.icon size={16} /> {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen, Network, Gamepad2, ArrowRight, Sparkles, Trophy, Target,
  Zap, CheckCircle2, TrendingUp,
} from 'lucide-react'
import { useProgress } from '../context/ProgressContext.jsx'
import { chapters } from '../data/chapters.js'

const stagger = { show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Home() {
  const { overallPct, mapPct, simulatorBestScore, readChapters } = useProgress()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* HERO */}
      <section className="relative pt-16 pb-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300">
          <Sparkles size={14} className="text-brand-purple" /> Your 30-day interview prep, gamified
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-6 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-balance">
          Master <span className="gradient-text">Digital Marketing</span><br className="hidden sm:block" /> like a real product, not a textbook.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-5 max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          14 deep chapters, an interactive business journey, and a live campaign simulator — built to get you interview-ready with concepts you’ll actually remember. (Yes, with chai-time Hinglish analogies. ☕)
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/theory" className="btn-primary text-base">Start Learning <ArrowRight size={18} /></Link>
          <Link to="/simulator" className="btn-ghost text-base"><Gamepad2 size={18} /> Try the Simulator</Link>
        </motion.div>

        {/* floating glow orbs */}
        <div className="absolute -z-10 top-20 left-10 w-72 h-72 rounded-full bg-brand-blue/20 blur-3xl animate-float" />
        <div className="absolute -z-10 top-32 right-10 w-72 h-72 rounded-full bg-brand-purple/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </section>

      {/* PROGRESS STRIP */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="grid sm:grid-cols-4 gap-4 mb-16">
        {[
          { label: 'Overall', val: `${overallPct}%`, c: 'purple', icon: TrendingUp },
          { label: 'Theory read', val: `${readChapters.length}/${chapters.length}`, c: 'blue', icon: BookOpen },
          { label: 'Map explored', val: `${mapPct}%`, c: 'green', icon: Network },
          { label: 'Best sim score', val: `${simulatorBestScore}/100`, c: 'orange', icon: Trophy },
        ].map((s) => (
          <motion.div key={s.label} variants={item} className="card p-5 flex items-center gap-4">
            <div className={`grid place-items-center w-12 h-12 rounded-xl bg-brand-${s.c}/15`}>
              <s.icon className={`text-brand-${s.c}`} size={22} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">{s.val}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* THREE PILLARS */}
      <section className="mb-20">
        <h2 className="text-center text-3xl font-bold font-display mb-2">Three ways to learn</h2>
        <p className="text-center text-slate-400 mb-10">Read it, live it, then prove it.</p>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5">
          {[
            { to: '/theory', icon: BookOpen, c: 'blue', title: 'Theory Library', desc: '14 chapters in a 3-layer format: industry standard, a real brand example, and an unforgettable Hinglish analogy. Diagrams, flip cards & interview mode.', cta: 'Read chapters' },
            { to: '/map', icon: Network, c: 'green', title: 'The Neuro Map', desc: 'A living neural-network of every digital-marketing concept. Tap any cell to see what it is and exactly how it wires to everything else.', cta: 'Explore the map' },
            { to: '/simulator', icon: Gamepad2, c: 'purple', title: 'Campaign Simulator', desc: 'Build a real ad campaign step-by-step and watch realistic Indian-market results roll in. Optimise, relaunch, and beat the benchmarks.', cta: 'Launch a campaign' },
          ].map((p) => (
            <motion.div key={p.to} variants={item}>
              <Link to={p.to} className="group block card p-6 h-full hover:-translate-y-1 transition-transform">
                <div className={`grid place-items-center w-14 h-14 rounded-2xl bg-brand-${p.c}/15 mb-4`}>
                  <p.icon className={`text-brand-${p.c}`} size={26} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{p.desc}</p>
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold text-brand-${p.c}`}>
                  {p.cta} <ArrowRight size={15} className="group-hover:translate-x-1 transition" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHY THIS WORKS */}
      <section className="mb-20 card p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold font-display mb-4">Built to make it <span className="gradient-text">stick</span></h2>
            <ul className="space-y-3">
              {[
                'Every concept explained 3 ways — definition, real brand, and a desi analogy you won’t forget.',
                'Interview Mode on every chapter — type an answer, get instant coaching on what to add.',
                'Live calculators & simulators with real Indian benchmarks (CPC, CTR, ROAS).',
                'Progress saved automatically — pick up exactly where you left off.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 size={20} className="text-brand-green shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-orange/30 bg-gradient-to-br from-orange-500/10 to-amber-500/5 p-6">
            <div className="flex items-center gap-2 text-brand-orange font-semibold mb-2"><Zap size={18} /> Sample analogy — CPC vs CPM</div>
            <p className="text-orange-50/90 italic text-sm leading-relaxed">
              “Socho tum Chandigarh se Delhi ja rahe ho. Ek auto wala bolta hai — ‘₹1000 flat, seat book kar lo.’ That’s CPM — you pay for the space. Doosra bolta hai — ‘meter se chalega, jitna chaloge utna doge.’ That’s CPC — you pay only when someone clicks.” ☕
            </p>
          </div>
        </div>
      </section>

      {/* footer cta */}
      <section className="text-center pb-24">
        <Target className="mx-auto text-brand-purple mb-4" size={32} />
        <h2 className="text-3xl font-bold font-display mb-3">Ready in 30 days. Start in 30 seconds.</h2>
        <Link to="/theory" className="btn-primary text-base mt-2">Open the Theory Library <ArrowRight size={18} /></Link>
      </section>
    </div>
  )
}

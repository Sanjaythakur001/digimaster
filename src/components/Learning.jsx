import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Target, RotateCcw, ChevronLeft, ChevronRight, Lightbulb, CheckCircle2,
  ArrowRight, Brain, X,
} from 'lucide-react'
import { chapterById } from '../data/chapters.js'
import { Icon, colorClasses } from '../lib/icons.jsx'

// ───────────────────────── Flip cards (key terms) ─────────────────────────
export function FlipCards({ terms }) {
  if (!terms?.length) return null
  return (
    <div className="my-6">
      <div className="text-sm font-semibold text-slate-300 mb-3">🔁 Key terms — tap to flip</div>
      <div className="grid sm:grid-cols-3 gap-3">
        {terms.map((t, i) => <FlipCard key={i} {...t} />)}
      </div>
    </div>
  )
}

function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="[perspective:1000px] h-32 cursor-pointer" onClick={() => setFlipped((f) => !f)}>
      <motion.div className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5 }}>
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl border border-brand-blue/40 bg-brand-blue/10 grid place-items-center p-4 text-center">
          <span className="font-bold text-brand-blue">{front}</span>
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-brand-purple/40 bg-brand-purple/10 grid place-items-center p-4 text-center">
          <span className="text-xs text-slate-200 leading-relaxed">{back}</span>
        </div>
      </motion.div>
    </div>
  )
}

// ───────────────────────── Flashcard deck (revision) ─────────────────────────
export function Flashcards({ cards }) {
  const [i, setI] = useState(0)
  const [show, setShow] = useState(false)
  if (!cards?.length) return null
  const next = () => { setShow(false); setI((x) => (x + 1) % cards.length) }
  const prev = () => { setShow(false); setI((x) => (x - 1 + cards.length) % cards.length) }
  const c = cards[i]
  return (
    <div className="card p-5 my-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-brand-orange"><RotateCcw size={16} /> Quick Revision Cards</div>
        <span className="text-xs text-slate-400">{i + 1} / {cards.length}</span>
      </div>
      <div className="[perspective:1200px] h-44 cursor-pointer" onClick={() => setShow((s) => !s)}>
        <motion.div className="relative w-full h-full [transform-style:preserve-3d]" animate={{ rotateX: show ? 180 : 0 }} transition={{ duration: 0.5 }}>
          <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl border border-white/10 bg-navy-800/60 grid place-items-center p-6 text-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Question</div>
              <div className="font-semibold text-white">{c.q}</div>
              <div className="text-xs text-slate-500 mt-3">tap to reveal answer</div>
            </div>
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateX(180deg)] rounded-2xl border border-brand-green/40 bg-brand-green/10 grid place-items-center p-6 text-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-brand-green/80 mb-2">Answer</div>
              <div className="text-sm text-slate-100">{c.a}</div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button onClick={prev} className="btn-ghost py-1.5 px-3 text-sm"><ChevronLeft size={16} /> Prev</button>
        <button onClick={next} className="btn-primary py-1.5 px-4 text-sm">Next <ChevronRight size={16} /></button>
      </div>
    </div>
  )
}

// ───────────────────────── Connected topics ─────────────────────────
export function ConnectedTopics({ ids }) {
  if (!ids?.length) return null
  return (
    <div className="my-6">
      <div className="text-sm font-semibold text-slate-300 mb-3">🔗 Connected Topics</div>
      <div className="flex flex-wrap gap-3">
        {ids.map((id) => {
          const ch = chapterById(id)
          if (!ch) return null
          const c = colorClasses[ch.color]
          return (
            <Link key={id} to={`/theory/${ch.slug}`}
              className={`group flex items-center gap-2 rounded-xl border ${c.border} ${c.bgSoft} px-3 py-2 text-sm hover:scale-[1.03] transition`}>
              <Icon name={ch.icon} size={16} className={c.text} />
              <span className="text-slate-200">Ch {ch.num}: {ch.title}</span>
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ───────────────────────── Interview alert + mode ─────────────────────────
export function InterviewAlert({ questions }) {
  const [open, setOpen] = useState(false)
  if (!questions?.length) return null
  return (
    <>
      <div className="card p-5 my-6 border-brand-orange/30" style={{ borderColor: 'rgba(249,115,22,0.3)' }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 font-semibold text-brand-orange"><Target size={18} /> Interview Question Alert</div>
          <button onClick={() => setOpen(true)} className="btn-primary py-1.5 px-4 text-sm"><Brain size={15} /> Test Yourself</button>
        </div>
        <ul className="mt-4 space-y-2">
          {questions.map((q, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
              <span className="text-brand-orange shrink-0">🎯</span>{q.q}
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>{open && <InterviewMode questions={questions} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}

function InterviewMode({ questions, onClose }) {
  const [i, setI] = useState(0)
  const [ans, setAns] = useState('')
  const [checked, setChecked] = useState(false)
  const q = questions[i]
  const hits = checked ? q.includes.filter((k) => ans.toLowerCase().includes(k.split(' ')[0].toLowerCase()) || matchKey(ans, k)) : []
  const score = checked ? Math.round((hits.length / q.includes.length) * 100) : 0
  const reset = () => { setAns(''); setChecked(false) }
  const go = (d) => { setI((x) => (x + d + questions.length) % questions.length); reset() }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} className="card p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-bold text-white"><Brain size={18} className="text-brand-purple" /> Interview Mode</div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
        </div>
        <div className="text-xs text-slate-400 mb-1">Question {i + 1} of {questions.length}</div>
        <div className="text-lg font-semibold text-white mb-3">🎯 {q.q}</div>
        <textarea value={ans} onChange={(e) => setAns(e.target.value)} rows={4} placeholder="Type your answer like you would in an interview…"
          className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-sm focus:border-brand-purple outline-none resize-none" />
        {!checked ? (
          <button onClick={() => setChecked(true)} disabled={!ans.trim()} className="btn-primary mt-3 w-full justify-center disabled:opacity-40">Check my answer</button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl font-extrabold" style={{ color: score >= 66 ? '#22c55e' : score >= 33 ? '#f97316' : '#ef4444' }}>{score}%</div>
              <div className="text-sm text-slate-300">{score >= 66 ? 'Strong answer! 🔥' : score >= 33 ? 'Decent — add the missing points.' : 'Review the chapter and try again.'}</div>
            </div>
            <div className="text-xs font-semibold text-slate-300 mb-2">A strong answer mentions:</div>
            <ul className="space-y-1.5">
              {q.includes.map((k) => {
                const hit = hits.includes(k)
                return (
                  <li key={k} className="flex items-center gap-2 text-sm">
                    {hit ? <CheckCircle2 size={15} className="text-brand-green" /> : <Lightbulb size={15} className="text-brand-orange" />}
                    <span className={hit ? 'text-slate-200' : 'text-slate-400'}>{k}</span>
                  </li>
                )
              })}
            </ul>
            <button onClick={reset} className="btn-ghost mt-3 w-full justify-center text-sm">Try again</button>
          </motion.div>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <button onClick={() => go(-1)} className="btn-ghost py-1.5 px-3 text-sm"><ChevronLeft size={16} /> Prev</button>
          <button onClick={() => go(1)} className="btn-ghost py-1.5 px-3 text-sm">Next <ChevronRight size={16} /></button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function matchKey(ans, key) {
  const words = key.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter((w) => w.length > 3)
  if (!words.length) return false
  const a = ans.toLowerCase()
  return words.some((w) => a.includes(w))
}

// ───────────────────────── Key takeaway ─────────────────────────
export function KeyTakeaway({ text }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      className="my-6 rounded-2xl border border-brand-green/40 bg-brand-green/10 p-5">
      <div className="flex items-center gap-2 font-bold text-brand-green mb-2"><CheckCircle2 size={18} /> Key Takeaway</div>
      <p className="text-sm text-slate-100 leading-relaxed">{text}</p>
    </motion.div>
  )
}

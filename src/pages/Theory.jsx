import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, CheckCircle2, Circle, Menu, X, Clock, ArrowRight, ArrowLeft,
  Flame, Award, ChevronRight,
} from 'lucide-react'
import { chapters } from '../data/chapters.js'
import { useProgress } from '../context/ProgressContext.jsx'
import { Icon, colorClasses } from '../lib/icons.jsx'
import ChapterRenderer from '../components/ChapterRenderer.jsx'
import { FlipCards, Flashcards, ConnectedTopics, InterviewAlert, KeyTakeaway } from '../components/Learning.jsx'
import Confetti from '../components/Confetti.jsx'

export default function Theory() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { readChapters, isChapterRead, markChapterRead, dailyGoal, setDailyGoal } = useProgress()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [showCert, setShowCert] = useState(false)

  const current = useMemo(
    () => chapters.find((c) => c.slug === slug) || chapters[0],
    [slug]
  )
  const idx = chapters.indexOf(current)
  const c = colorClasses[current.color]

  // Search across chapter titles, summaries, section text & flashcards
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    return chapters
      .map((ch) => {
        const hay = [
          ch.title, ch.summary,
          ...ch.sections.flatMap((s) => [s.text, s.body, s.brand, ...(s.items || []), ...(s.rows?.flat() || [])]),
          ...ch.flashcards.flatMap((f) => [f.q, f.a]),
          ...ch.flipTerms.flatMap((t) => [t.front, t.back]),
        ].filter(Boolean).join(' ').toLowerCase()
        return { ch, hit: hay.includes(q) }
      })
      .filter((r) => r.hit)
      .map((r) => r.ch)
  }, [query])

  const allRead = readChapters.length === chapters.length
  useEffect(() => { setSidebarOpen(false) }, [slug])

  const goChapter = (s) => { setQuery(''); navigate(`/theory/${s}`) }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Daily goal banner */}
      <DailyGoal current={current} dailyGoal={dailyGoal} setDailyGoal={setDailyGoal} />

      <div className="flex gap-6">
        {/* SIDEBAR */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24">
            <SearchBar query={query} setQuery={setQuery} />
            <SidebarList current={current} onPick={goChapter} isRead={isChapterRead} />
          </div>
        </aside>

        {/* MOBILE sidebar toggle */}
        <button onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-white bg-white/10 backdrop-blur border border-white/15">
          <Menu size={18} /> Chapters
        </button>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
              <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                onClick={(e) => e.stopPropagation()} className="w-80 max-w-[85vw] h-full bg-navy-900 border-r border-white/10 p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold">Chapters</span>
                  <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
                </div>
                <SearchBar query={query} setQuery={setQuery} />
                <SidebarList current={current} onPick={goChapter} isRead={isChapterRead} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN */}
        <div className="flex-1 min-w-0">
          {results ? (
            <SearchResults results={results} query={query} onPick={goChapter} clear={() => setQuery('')} />
          ) : (
            <motion.article key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              {/* chapter header */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                <Link to="/theory" className="hover:text-white">Theory Library</Link>
                <ChevronRight size={12} /> <span>Chapter {current.num}</span>
              </div>
              <div className="flex items-start gap-4 mb-4">
                <div className={`grid place-items-center w-14 h-14 rounded-2xl ${c.bgSoft} shrink-0`}>
                  <Icon name={current.icon} size={26} className={c.text} />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">{current.title}</h1>
                  <p className="text-slate-400 mt-1">{current.summary}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={13} /> {current.est} min read</span>
                    {current.deep && <span className="chip bg-brand-purple/15 text-brand-purple">Deep dive</span>}
                  </div>
                </div>
              </div>

              {/* reading progress (scroll-based) */}
              <ReadingProgress key={current.id} color={current.color} />

              {/* content */}
              <ChapterRenderer sections={current.sections} />

              {/* learning blocks (skip the auto KeyTakeaway display order) */}
              <KeyTakeaway text={current.keyTakeaway} />
              <FlipCards terms={current.flipTerms} />
              <InterviewAlert questions={current.interview} />
              <Flashcards cards={current.flashcards} />
              <ConnectedTopics ids={current.connected} />

              {/* complete + nav */}
              <CompleteBar current={current} idx={idx} isRead={isChapterRead(current.id)}
                onComplete={() => { markChapterRead(current.id); if (readChapters.length + 1 === chapters.length) setShowCert(true) }}
                onNav={goChapter} />
            </motion.article>
          )}
        </div>
      </div>

      {/* certificate */}
      <AnimatePresence>
        {showCert && allRead && <Certificate onClose={() => setShowCert(false)} />}
      </AnimatePresence>
      {allRead && !showCert && (
        <button onClick={() => setShowCert(true)} className="fixed bottom-20 right-5 z-40 btn-primary text-sm shadow-glow-green">
          <Award size={16} /> View Certificate
        </button>
      )}
    </div>
  )
}

function SearchBar({ query, setQuery }) {
  return (
    <div className="relative mb-4">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search all chapters…"
        className="w-full rounded-xl bg-white/5 border border-white/10 pl-9 pr-3 py-2.5 text-sm focus:border-brand-blue outline-none" />
    </div>
  )
}

function SidebarList({ current, onPick, isRead }) {
  const { readChapters } = useProgress()
  return (
    <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar pr-1">
      <div className="flex items-center justify-between px-2 pb-2 text-xs text-slate-500">
        <span>14 chapters</span><span>{readChapters.length} done</span>
      </div>
      {chapters.map((ch) => {
        const active = ch.id === current.id
        const read = isRead(ch.id)
        const cc = colorClasses[ch.color]
        return (
          <button key={ch.id} onClick={() => onPick(ch.slug)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition ${
              active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}>
            {read ? <CheckCircle2 size={16} className="text-brand-green shrink-0" /> : <Circle size={16} className="text-slate-600 shrink-0" />}
            <Icon name={ch.icon} size={15} className={`${cc.text} shrink-0`} />
            <span className="truncate flex-1"><span className="text-slate-500">{ch.num}.</span> {ch.title}</span>
          </button>
        )
      })}
    </nav>
  )
}

function SearchResults({ results, query, onPick, clear }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Search: “{query}” <span className="text-slate-400 text-sm">({results.length})</span></h2>
        <button onClick={clear} className="btn-ghost py-1.5 px-3 text-sm"><X size={14} /> Clear</button>
      </div>
      {results.length === 0 ? (
        <p className="text-slate-400">No chapters match. Try “ROAS”, “funnel”, “quality score”…</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {results.map((ch) => {
            const cc = colorClasses[ch.color]
            return (
              <button key={ch.id} onClick={() => onPick(ch.slug)} className="text-left card p-4 hover:-translate-y-0.5 transition">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name={ch.icon} size={16} className={cc.text} />
                  <span className="font-semibold text-white">Ch {ch.num}: {ch.title}</span>
                </div>
                <p className="text-sm text-slate-400">{ch.summary}</p>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ReadingProgress({ color }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight)
      setPct(Math.min(100, Math.max(0, scrolled * 100)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const cc = colorClasses[color]
  return (
    <div className="sticky top-[68px] z-20 my-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
      <div className={`h-full bg-gradient-to-r ${cc.grad}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

function CompleteBar({ current, idx, isRead, onComplete, onNav }) {
  const prev = chapters[idx - 1]
  const next = chapters[idx + 1]
  return (
    <div className="mt-10 border-t border-white/10 pt-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button onClick={onComplete} disabled={isRead}
          className={`w-full sm:w-auto justify-center ${isRead ? 'btn-ghost text-brand-green border-brand-green/40' : 'btn-primary'}`}>
          {isRead ? <><CheckCircle2 size={18} /> Completed</> : <><Circle size={18} /> Mark chapter complete</>}
        </button>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => prev && onNav(prev.slug)} disabled={!prev} className="btn-ghost flex-1 justify-center text-sm disabled:opacity-30"><ArrowLeft size={15} /> Prev</button>
          <button onClick={() => next && onNav(next.slug)} disabled={!next} className="btn-ghost flex-1 justify-center text-sm disabled:opacity-30">Next <ArrowRight size={15} /></button>
        </div>
      </div>
      {next && <p className="text-center text-xs text-slate-500 mt-3">Up next: Ch {next.num} — {next.title}</p>}
    </div>
  )
}

function DailyGoal({ current, dailyGoal, setDailyGoal }) {
  const today = new Date().toISOString().slice(0, 10)
  const active = dailyGoal && dailyGoal.date === today
  const goalCh = active ? chapters.find((c) => c.id === dailyGoal.chapterId) : null
  const { isChapterRead } = useProgress()
  const done = goalCh && isChapterRead(goalCh.id)
  return (
    <div className="card p-3 mb-5 flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2 text-sm">
        <Flame size={18} className="text-brand-orange" />
        {active ? (
          done
            ? <span className="text-brand-green font-semibold">🎉 Today’s goal done — Ch {goalCh.num}: {goalCh.title}!</span>
            : <span className="text-slate-300">Today’s goal: <span className="font-semibold text-white">Ch {goalCh.num} — {goalCh.title}</span></span>
        ) : (
          <span className="text-slate-400">Set today’s goal to stay on a streak.</span>
        )}
      </div>
      {!done && (
        <button onClick={() => setDailyGoal(current.id)} className="btn-ghost py-1.5 px-3 text-xs">
          Set “{current.title}” as today’s goal
        </button>
      )}
    </div>
  )
}

function Certificate({ onClose }) {
  return (
    <>
      <Confetti count={80} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[65] grid place-items-center bg-black/70 backdrop-blur p-4" onClick={onClose}>
        <motion.div initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg rounded-3xl border-2 border-brand-green/40 bg-gradient-to-br from-navy-800 to-navy-900 p-8 text-center shadow-glow-green">
          <Award size={56} className="mx-auto text-brand-green mb-3" />
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Certificate of Completion</div>
          <h2 className="text-3xl font-extrabold font-display gradient-text mt-2">Digital Marketing Mastery</h2>
          <p className="text-slate-300 mt-4">You’ve completed all <span className="font-bold text-white">14 chapters</span> of the DigiMaster Theory Library. You’re interview-ready. 🚀</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
            <CheckCircle2 size={16} className="text-brand-green" /> Theory Library · 100%
          </div>
          <button onClick={onClose} className="btn-primary mt-6 mx-auto">Keep going <ArrowRight size={16} /></button>
        </motion.div>
      </motion.div>
    </>
  )
}

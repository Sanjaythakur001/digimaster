import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen, ArrowRight, Network, Sparkles, MousePointerClick } from 'lucide-react'
import { nodes, edges, domains } from '../data/conceptMap.js'
import { Icon } from '../lib/icons.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import ConceptGraph from '../components/ConceptGraph.jsx'

export default function NeuralMap() {
  const { exploreConcept, exploredConcepts } = useProgress()
  const [selectedId, setSelectedId] = useState(null)
  const [focusId, setFocusId] = useState(null)
  const [focusNonce, setFocusNonce] = useState(0)
  const [query, setQuery] = useState('')
  const [activeDomain, setActiveDomain] = useState(null)
  const [hintSeen, setHintSeen] = useState(false)

  const nodeById = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [])

  const select = (id) => {
    setSelectedId(id)
    if (id) { exploreConcept(id); setActiveDomain(null) }
  }
  const focusOn = (id) => {
    select(id)
    setFocusId(id); setFocusNonce((n) => n + 1)
  }

  // connections of selected node, with reasons
  const connections = useMemo(() => {
    if (!selectedId) return []
    const out = []
    edges.forEach(([a, b, reason]) => {
      if (a === selectedId) out.push({ id: b, reason })
      else if (b === selectedId) out.push({ id: a, reason })
    })
    return out
  }, [selectedId])

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return nodes.filter((n) => n.label.toLowerCase().includes(q) || n.what.toLowerCase().includes(q)).slice(0, 6)
  }, [query])

  const sel = selectedId ? nodeById[selectedId] : null

  return (
    <div className="relative" style={{ height: 'calc(100vh - 68px)' }}>
      {/* graph canvas */}
      <div className="absolute inset-0 bg-navy-950/40">
        <ConceptGraph
          selectedId={selectedId}
          onSelect={select}
          focusId={focusNonce ? focusId : null}
          highlightDomain={activeDomain}
        />
      </div>

      {/* top bar: title + search */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3 pointer-events-none z-30">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2 text-white font-display font-extrabold text-lg">
            <Network size={20} className="text-brand-purple" /> The Neuro Map
          </div>
          <p className="text-xs text-slate-400 mt-0.5 max-w-[240px] hidden sm:block">Every concept, wired to every other. Tap a cell to explore it.</p>
        </div>

        <div className="pointer-events-auto w-56 sm:w-72">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a concept…"
              className="w-full rounded-xl glass border border-white/15 pl-9 pr-3 py-2 text-sm outline-none focus:border-brand-purple" />
          </div>
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-2 rounded-xl glass border border-white/15 overflow-hidden">
                {searchResults.map((n) => (
                  <button key={n.id} onClick={() => { focusOn(n.id); setQuery('') }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/10">
                    <span className="w-6 h-6 grid place-items-center rounded-md" style={{ background: `${domains[n.d].color}33` }}>
                      <Icon name={n.icon} size={13} color={domains[n.d].color} />
                    </span>
                    <span className="text-slate-200">{n.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* legend / domain filter */}
      <div className="absolute bottom-4 left-4 z-30 max-w-[70%]">
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(domains).map(([key, d]) => {
            const active = activeDomain === key
            return (
              <button key={key} onClick={() => { setActiveDomain(active ? null : key); setSelectedId(null) }}
                className={`chip border text-[11px] transition ${active ? 'text-white' : 'text-slate-300'}`}
                style={{ borderColor: `${d.color}77`, background: active ? d.color : `${d.color}1a` }}>
                <span className="w-2 h-2 rounded-full" style={{ background: active ? '#fff' : d.color }} /> {d.label}
              </button>
            )
          })}
        </div>
        <div className="text-[11px] text-slate-500 mt-2">{exploredConcepts.length}/{nodes.length} concepts explored</div>
      </div>

      {/* intro hint */}
      <AnimatePresence>
        {!hintSeen && !selectedId && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="glass border border-white/15 rounded-2xl px-5 py-4 text-center max-w-xs pointer-events-auto">
              <MousePointerClick className="mx-auto text-brand-purple mb-2" size={24} />
              <p className="text-sm text-slate-200">Tap any glowing <span className="text-brand-purple font-semibold">cell</span> to see what it is and how it wires to the rest. Drag to rearrange, scroll to zoom.</p>
              <button onClick={() => setHintSeen(true)} className="btn-ghost text-xs mt-3 mx-auto">Got it</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* detail panel */}
      <AnimatePresence>
        {sel && (
          <motion.aside
            key={sel.id}
            initial={{ x: '110%' }} animate={{ x: 0 }} exit={{ x: '110%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="absolute top-0 right-0 h-full w-full sm:w-[380px] z-40 glass border-l border-white/15 overflow-y-auto"
          >
            <DetailPanel node={sel} connections={connections} nodeById={nodeById} onClose={() => setSelectedId(null)} onJump={focusOn} />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

function DetailPanel({ node, connections, nodeById, onClose, onJump }) {
  const color = domains[node.d].color
  return (
    <div className="p-5">
      <div className="flex items-start justify-between mb-4">
        <span className="chip text-xs" style={{ background: `${color}22`, color }}>
          <span className="w-2 h-2 rounded-full" style={{ background: color }} /> {domains[node.d].label}
        </span>
        <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={18} /></button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="grid place-items-center w-16 h-16 rounded-2xl shrink-0"
          style={{ background: `radial-gradient(circle at 35% 30%, ${color}, ${color}33)`, boxShadow: `0 0 24px ${color}66` }}>
          <Icon name={node.icon} size={30} color="#fff" />
        </div>
        <h2 className="text-2xl font-extrabold font-display text-white leading-tight">{node.label}</h2>
      </div>

      <p className="text-[15px] text-slate-300 leading-relaxed mb-4">{node.what}</p>

      {/* fact chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {node.facts.map((f) => (
          <span key={f} className="chip text-xs border" style={{ borderColor: `${color}55`, background: `${color}14`, color: '#e2e8f0' }}>
            <Sparkles size={11} style={{ color }} /> {f}
          </span>
        ))}
      </div>

      {node.chapter && (
        <Link to={`/theory/${node.chapter}`} className="btn-primary w-full justify-center text-sm mb-5">
          <BookOpen size={15} /> Read the full chapter
        </Link>
      )}

      {/* connections */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-white">How it connects</h3>
        <span className="text-xs text-slate-500">{connections.length} links</span>
      </div>
      <div className="space-y-2 pb-8">
        {connections.map((c) => {
          const nb = nodeById[c.id]
          const col = domains[nb.d].color
          return (
            <button key={c.id} onClick={() => onJump(c.id)}
              className="w-full text-left rounded-xl border border-white/10 bg-white/[0.03] p-3 hover:bg-white/[0.07] transition group">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 grid place-items-center rounded-lg shrink-0" style={{ background: `${col}22` }}>
                  <Icon name={nb.icon} size={14} color={col} />
                </span>
                <span className="font-semibold text-sm text-white flex-1">{nb.label}</span>
                <ArrowRight size={14} className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-9">{c.reason}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

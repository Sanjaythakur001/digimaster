import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, X } from 'lucide-react'
import { keyMetrics, inputLabels } from '../data/metrics.js'

const cmap = { blue: '#3b82f6', green: '#22c55e', orange: '#f97316', purple: '#a855f7' }

export default function MetricsCalculator() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(keyMetrics[4]) // ROAS default
  const [vals, setVals] = useState({})

  const result = active.compute(
    active.inputs.reduce((o, k) => ({ ...o, [k]: parseFloat(vals[k]) || 0 }), {})
  )
  const fmt = (n) => {
    if (active.unit === '%') return `${n.toFixed(1)}%`
    if (active.unit === 'x') return `${n.toFixed(2)}x`
    return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-purple shadow-glow hover:scale-105 transition">
        <Calculator size={18} /> <span className="hidden sm:inline">Metrics Calculator</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-end sm:place-items-center bg-black/60 backdrop-blur-sm p-0 sm:p-4" onClick={() => setOpen(false)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card w-full sm:max-w-md p-5 rounded-b-none sm:rounded-2xl max-h-[88vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 font-bold text-white"><Calculator size={18} className="text-brand-blue" /> Metrics Calculator</div>
                <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {keyMetrics.map((m) => (
                  <button key={m.key} onClick={() => { setActive(m); setVals({}) }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition"
                    style={active.key === m.key
                      ? { background: cmap[m.color], color: '#0f172a' }
                      : { background: 'rgba(255,255,255,0.05)', color: '#cbd5e1' }}>
                    {m.key}
                  </button>
                ))}
              </div>

              <div className="rounded-xl bg-white/5 px-3 py-2 text-xs font-mono mb-4" style={{ color: cmap[active.color] }}>
                {active.key} = {active.formula}
              </div>

              <div className="space-y-3">
                {active.inputs.map((k) => (
                  <label key={k} className="block">
                    <span className="text-xs text-slate-400">{inputLabels[k]}</span>
                    <input type="number" inputMode="decimal" value={vals[k] ?? ''} onChange={(e) => setVals((v) => ({ ...v, [k]: e.target.value }))}
                      className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-brand-blue outline-none" placeholder="0" />
                  </label>
                ))}
              </div>

              <motion.div layout className="mt-5 rounded-2xl border p-4 text-center" style={{ borderColor: `${cmap[active.color]}55`, background: `${cmap[active.color]}12` }}>
                <div className="text-xs text-slate-400">{active.name}</div>
                <div className="text-3xl font-extrabold mt-1" style={{ color: cmap[active.color] }}>{fmt(result)}</div>
              </motion.div>
              <p className="text-[11px] text-slate-500 mt-3">{active.means}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

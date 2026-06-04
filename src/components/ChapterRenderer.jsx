import { motion } from 'framer-motion'
import { Lightbulb, AlertTriangle, Sigma, ImageIcon } from 'lucide-react'
import TermText from './TermText.jsx'
import Diagram from './Diagrams.jsx'
import ChapterWidget from './ChapterWidgets.jsx'
import { adsCharts } from './AdsLab.jsx'

const charts = { ...adsCharts }

const cmap = { blue: '#3b82f6', green: '#22c55e', orange: '#f97316', purple: '#a855f7' }

export default function ChapterRenderer({ sections }) {
  return (
    <div className="space-y-1">
      {sections.map((s, i) => <Section key={i} s={s} />)}
    </div>
  )
}

function Section({ s }) {
  switch (s.t) {
    case 'h':
      return (
        <motion.h2 initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="text-2xl font-bold font-display text-white mt-10 mb-3 flex items-center gap-3">
          <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-brand-blue to-brand-purple" />
          {s.text}
        </motion.h2>
      )
    case 'p':
      return <p className="text-[15px] leading-relaxed text-slate-300 my-3"><TermText text={s.text} /></p>

    case 'layer1':
      return <LayerBox tone="standard" title="Industry Standard" body={s.body} />
    case 'layer2':
      return <LayerBox tone="example" title={`Industry Example · ${s.brand}`} body={s.body} />
    case 'layer3':
      return <Hinglish emoji={s.emoji} body={s.body} />

    case 'list':
      return (
        <ul className="my-4 space-y-2">
          {s.items.map((it, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 text-[15px] text-slate-300">
              {s.ordered
                ? <span className="shrink-0 w-6 h-6 grid place-items-center rounded-lg bg-brand-blue/15 text-brand-blue text-xs font-bold">{i + 1}</span>
                : <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-brand-purple" />}
              <span><TermText text={it} /></span>
            </motion.li>
          ))}
        </ul>
      )

    case 'table':
      return (
        <div className="my-5 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5">
                {s.head.map((h) => <th key={h} className="text-left font-semibold text-slate-200 px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, ri) => (
                <tr key={ri} className="border-t border-white/5 hover:bg-white/[0.03]">
                  {r.map((c, ci) => (
                    <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'font-semibold text-white' : 'text-slate-300'}`}><TermText text={c} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'cards':
      return (
        <div className="my-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {s.items.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl border p-4" style={{ borderColor: `${cmap[c.color]}55`, background: `${cmap[c.color]}12` }}>
              <div className="font-bold mb-1" style={{ color: cmap[c.color] }}>{c.title}</div>
              <p className="text-sm text-slate-300 leading-relaxed"><TermText text={c.body} /></p>
            </motion.div>
          ))}
        </div>
      )

    case 'callout': {
      const warn = s.tone === 'warn'
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="my-5 flex gap-3 rounded-2xl border p-4"
          style={{ borderColor: warn ? '#f9731655' : '#3b82f655', background: warn ? '#f9731612' : '#3b82f612' }}>
          {warn ? <AlertTriangle size={20} className="text-brand-orange shrink-0 mt-0.5" /> : <Lightbulb size={20} className="text-brand-blue shrink-0 mt-0.5" />}
          <p className="text-sm text-slate-200 leading-relaxed"><TermText text={s.text} /></p>
        </motion.div>
      )
    }

    case 'diagram':
      return <Diagram name={s.name} />
    case 'component':
      return <ChapterWidget name={s.name} />
    case 'chart': {
      const Ch = charts[s.name]
      return Ch ? <Ch /> : null
    }

    case 'image':
      return <Figure {...s} />
    case 'formula':
      return <Formula {...s} />
    case 'framework':
      return <Framework {...s} />

    default:
      return null
  }
}

function Figure({ src, alt, caption, credit }) {
  // Resolve public-folder assets against Vite's base path (e.g. '/digimaster/').
  const resolved = src.startsWith('/') ? import.meta.env.BASE_URL.replace(/\/$/, '') + src : src
  return (
    <motion.figure initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="my-6">
      <div className="card p-3 overflow-hidden">
        <img src={resolved} alt={alt} loading="lazy" className="w-full h-auto rounded-xl" />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-2 flex items-start gap-2 text-xs text-slate-400">
          <ImageIcon size={13} className="shrink-0 mt-0.5 text-slate-500" />
          <span>{caption}{credit && <span className="text-slate-600"> · {credit}</span>}</span>
        </figcaption>
      )}
    </motion.figure>
  )
}

function Formula({ expr, terms = [], example, benchmark }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="my-6 rounded-2xl border border-brand-blue/30 bg-brand-blue/[0.06] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-brand-blue/10 border-b border-brand-blue/20">
        <Sigma size={15} className="text-brand-blue" />
        <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">Formula</span>
      </div>
      <div className="p-5">
        <div className="text-center text-lg sm:text-xl font-mono font-bold text-white tracking-tight"><TermText text={expr} /></div>
        {terms.length > 0 && (
          <div className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {terms.map((t) => (
              <div key={t.sym} className="flex gap-2 text-sm">
                <code className="text-brand-blue font-semibold shrink-0">{t.sym}</code>
                <span className="text-slate-400">— {t.desc}</span>
              </div>
            ))}
          </div>
        )}
        {example && (
          <div className="mt-4 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-slate-200">
            <span className="text-brand-green font-semibold">Worked example: </span><TermText text={example} />
          </div>
        )}
        {benchmark && (
          <div className="mt-3 text-xs"><span className="chip bg-brand-orange/15 text-brand-orange">Benchmark</span> <span className="text-slate-400 ml-1">{benchmark}</span></div>
        )}
      </div>
    </motion.div>
  )
}

function Framework({ title, subtitle, steps = [] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="card p-5 my-6">
      <div className="text-sm font-bold text-white">{title}</div>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5 mb-4">{subtitle}</p>}
      <div className="relative pl-7 space-y-4 mt-3">
        <span className="absolute left-[11px] top-1 bottom-1 w-px bg-gradient-to-b from-brand-blue/60 to-brand-purple/40" />
        {steps.map((st, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="relative">
            <span className="absolute -left-7 grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white text-xs font-bold ring-4 ring-navy-900">{i + 1}</span>
            <div className="font-semibold text-white text-sm">{st.label}</div>
            <p className="text-sm text-slate-300 leading-relaxed mt-0.5"><TermText text={st.body} /></p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function LayerBox({ tone, title, body }) {
  const standard = tone === 'standard'
  const color = standard ? '#3b82f6' : '#a855f7'
  const tag = standard ? 'Layer 1' : 'Layer 2'
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="my-4 rounded-2xl border-l-4 p-4 bg-white/[0.03]" style={{ borderColor: color }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${color}22`, color }}>{tag}</span>
        <span className="text-xs font-semibold text-slate-400">{title}</span>
      </div>
      <p className="text-[15px] leading-relaxed text-slate-200"><TermText text={body} /></p>
    </motion.div>
  )
}

function Hinglish({ emoji, body }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      className="my-5 rounded-2xl border border-brand-orange/40 bg-gradient-to-br from-orange-500/10 to-amber-500/5 p-5 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 text-6xl opacity-10 select-none">{emoji}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{emoji}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange">Layer 3 · Real-world (Hinglish)</span>
      </div>
      <p className="text-[15px] leading-relaxed text-orange-50/90 italic">{body}</p>
    </motion.div>
  )
}

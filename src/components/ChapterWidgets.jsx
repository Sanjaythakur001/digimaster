import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip } from 'recharts'
import {
  Search as SearchIcon, Image as ImageIcon, Video, Images, MonitorPlay,
  ShoppingBag, Copy, Check, User, Link2,
} from 'lucide-react'
import { keyMetrics } from '../data/metrics.js'
import { glossary } from '../data/glossary.js'
import { adsWidgets } from './AdsLab.jsx'

export default function ChapterWidget({ name }) {
  const W = WIDGETS[name]
  return W ? <W /> : null
}

const card = 'card p-5 my-6'

// ───────────────────────── Persona Builder (Ch2) ─────────────────────────
function PersonaBuilder() {
  const [f, setF] = useState({ name: 'Priya', age: '28', job: 'Marketing Exec', goal: 'glowing skin without chemicals', pain: 'confused by too many product claims' })
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))
  const fields = [
    ['name', 'Persona name'], ['age', 'Age'], ['job', 'Occupation'],
    ['goal', 'Main goal'], ['pain', 'Biggest frustration'],
  ]
  return (
    <div className={`${card} grid md:grid-cols-2 gap-5`}>
      <div className="space-y-3">
        <div className="text-sm font-semibold text-brand-purple">Build a buyer persona</div>
        {fields.map(([k, label]) => (
          <label key={k} className="block">
            <span className="text-xs text-slate-400">{label}</span>
            <input value={f[k]} onChange={set(k)} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-brand-purple outline-none" />
          </label>
        ))}
      </div>
      <motion.div layout className="rounded-2xl border border-brand-purple/40 bg-brand-purple/10 p-5">
        <div className="flex items-center gap-3">
          <div className="grid place-items-center w-14 h-14 rounded-full bg-brand-purple/30 text-brand-purple"><User size={26} /></div>
          <div>
            <div className="text-lg font-bold text-white">{f.name || '—'}</div>
            <div className="text-xs text-slate-400">{f.age || '?'} · {f.job || '—'}</div>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <p><span className="text-brand-green font-semibold">Wants:</span> {f.goal || '—'}</p>
          <p><span className="text-brand-orange font-semibold">Struggles with:</span> {f.pain || '—'}</p>
          <p className="text-xs text-slate-400 pt-2 border-t border-white/10">“Market to {f.name || 'this person'}, not to ‘everyone’.”</p>
        </div>
      </motion.div>
    </div>
  )
}

// ───────────────────────── Tabs helper ─────────────────────────
function Tabs({ tabs }) {
  const [active, setActive] = useState(0)
  return (
    <div className={card}>
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t, i) => (
          <button key={t.label} onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${active === i ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-glow' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {tabs[active].content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function GoogleCampaignTabs() {
  return (
    <Tabs tabs={[
      { label: 'Search', content: <TabBody icon={SearchIcon} title="Search Ads" body="Text ads on Google results for high-intent keywords. Best for capturing demand — people actively searching for what you sell." benchmark="CTR 2–5% · highest intent" /> },
      { label: 'Display', content: <TabBody icon={ImageIcon} title="Display Ads" body="Banner/image ads across millions of sites & apps. Best for awareness & retargeting — cheap reach, lower intent." benchmark="CTR ~0.5% · cheap CPM" /> },
      { label: 'Video', content: <TabBody icon={Video} title="Video Ads (YouTube)" body="Skippable/non-skippable video. Great for storytelling, awareness and remarketing at scale." benchmark="Pay per view/CPV" /> },
      { label: 'Shopping', content: <TabBody icon={ShoppingBag} title="Shopping Ads" body="Product image + price + store, pulled from a product feed. The default for ecommerce on Google." benchmark="High purchase intent" /> },
    ]} />
  )
}

function TabBody({ icon: I, title, body, benchmark }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="grid place-items-center w-12 h-12 rounded-xl bg-brand-blue/15 text-brand-blue shrink-0"><I size={22} /></div>
      <div>
        <div className="font-bold text-white">{title}</div>
        <p className="text-sm text-slate-300 mt-1">{body}</p>
        <span className="chip bg-brand-green/15 text-brand-green mt-2">{benchmark}</span>
      </div>
    </div>
  )
}

function MetaFormats() {
  return (
    <Tabs tabs={[
      { label: 'Image', content: <TabBody icon={ImageIcon} title="Single Image" body="One striking visual + copy + CTA. Simple, fast to produce, great for testing offers." benchmark="Workhorse format" /> },
      { label: 'Video / Reels', content: <TabBody icon={Video} title="Video & Reels" body="Short vertical video. Highest reach and engagement on Instagram today." benchmark="Best for awareness" /> },
      { label: 'Carousel', content: <TabBody icon={Images} title="Carousel" body="Multiple swipeable cards — show several products or tell a step-by-step story." benchmark="Great for catalogues" /> },
      { label: 'Collection', content: <TabBody icon={MonitorPlay} title="Collection / Catalog" body="A hero asset above a grid of products; opens a fast in-app storefront. Built for shopping." benchmark="Ecommerce sales" /> },
    ]} />
  )
}

function PlatformTabs() {
  return (
    <Tabs tabs={[
      { label: 'Instagram', content: <PlatBody name="Instagram" who="18–34, visual, lifestyle & D2C" algo="Rewards Reels watch-time, saves & shares" strat="Reels + carousels + UGC; aesthetic consistency" /> },
      { label: 'LinkedIn', content: <PlatBody name="LinkedIn" who="Professionals, B2B decision-makers" algo="Rewards dwell-time & meaningful comments; dislikes external links" strat="Insightful text posts, thought leadership, native docs" /> },
      { label: 'YouTube', content: <PlatBody name="YouTube" who="All ages; search + discovery" algo="Optimises watch-time & click-through; it's a search engine too" strat="SEO titles, strong hooks, Shorts for reach + long-form for depth" /> },
      { label: 'Twitter / X', content: <PlatBody name="Twitter / X" who="News, tech, real-time conversation" algo="Rewards replies, reposts & recency" strat="Timely takes, threads, engage in conversations" /> },
    ]} />
  )
}

function PlatBody({ name, who, algo, strat }) {
  return (
    <div className="space-y-2 text-sm">
      <div className="font-bold text-white text-base">{name}</div>
      <p><span className="text-brand-blue font-semibold">Audience:</span> {who}</p>
      <p><span className="text-brand-purple font-semibold">Algorithm:</span> {algo}</p>
      <p><span className="text-brand-green font-semibold">Strategy:</span> {strat}</p>
    </div>
  )
}

// ───────────────────────── Traffic Pie (Ch12) ─────────────────────────
const TRAFFIC = [
  { name: 'Organic Search', value: 34, color: '#22c55e' },
  { name: 'Paid Search', value: 22, color: '#3b82f6' },
  { name: 'Social', value: 18, color: '#a855f7' },
  { name: 'Direct', value: 14, color: '#f97316' },
  { name: 'Email', value: 8, color: '#06b6d4' },
  { name: 'Referral', value: 4, color: '#94a3b8' },
]
function TrafficPie() {
  return (
    <div className={`${card} grid md:grid-cols-2 gap-4 items-center`}>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={TRAFFIC} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3} stroke="none">
              {TRAFFIC.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie>
            <RTooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#e2e8f0' }} formatter={(v, n) => [`${v}%`, n]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        <div className="text-sm font-semibold text-slate-200 mb-1">Traffic sources breakdown</div>
        {TRAFFIC.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-sm" style={{ background: d.color }} />
            <span className="flex-1 text-slate-300">{d.name}</span>
            <span className="font-semibold text-white">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ───────────────────────── UTM Builder (Ch12) ─────────────────────────
function UtmBuilder() {
  const [v, setV] = useState({ url: 'https://glowup.in/sale', source: 'instagram', medium: 'cpc', campaign: 'diwali_sale', content: 'reel_a' })
  const [copied, setCopied] = useState(false)
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))
  const link = useMemo(() => {
    const p = new URLSearchParams()
    if (v.source) p.set('utm_source', v.source)
    if (v.medium) p.set('utm_medium', v.medium)
    if (v.campaign) p.set('utm_campaign', v.campaign)
    if (v.content) p.set('utm_content', v.content)
    const q = p.toString()
    return v.url + (q ? (v.url.includes('?') ? '&' : '?') + q : '')
  }, [v])
  const copy = () => { navigator.clipboard?.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  const fields = [['url', 'Destination URL'], ['source', 'utm_source (e.g. instagram)'], ['medium', 'utm_medium (e.g. cpc)'], ['campaign', 'utm_campaign'], ['content', 'utm_content (optional)']]
  return (
    <div className={card}>
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue mb-3"><Link2 size={16} /> UTM Link Builder</div>
      <div className="grid sm:grid-cols-2 gap-3">
        {fields.map(([k, label]) => (
          <label key={k} className="block">
            <span className="text-xs text-slate-400">{label}</span>
            <input value={v[k]} onChange={set(k)} className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-brand-blue outline-none" />
          </label>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-brand-blue/30 bg-brand-blue/10 p-3 flex items-start gap-3">
        <code className="text-xs text-brand-blue break-all flex-1">{link}</code>
        <button onClick={copy} className="btn-ghost shrink-0 py-1.5 px-3 text-xs">
          {copied ? <><Check size={14} className="text-brand-green" /> Copied</> : <><Copy size={14} /> Copy</>}
        </button>
      </div>
    </div>
  )
}

// ───────────────────────── Metrics Table (Ch12) ─────────────────────────
function MetricsTable() {
  const cmap = { blue: '#3b82f6', green: '#22c55e', orange: '#f97316', purple: '#a855f7' }
  return (
    <div className="my-6 grid sm:grid-cols-2 gap-4">
      {keyMetrics.map((m, i) => (
        <motion.div key={m.key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
          className="card p-4" style={{ borderTopColor: cmap[m.color], borderTopWidth: 3 }}>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-extrabold text-white">{m.key}</span>
            <span className="text-xs text-slate-400">{m.name}</span>
          </div>
          <div className="mt-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-mono" style={{ color: cmap[m.color] }}>{m.formula}</div>
          <p className="text-sm text-slate-300 mt-2">{m.means}</p>
          <div className="text-xs mt-2"><span className="text-brand-green font-semibold">Benchmark:</span> <span className="text-slate-400">{m.benchmark}</span></div>
          <div className="mt-2 rounded-lg border border-brand-orange/30 bg-brand-orange/10 px-3 py-2 text-xs text-orange-200">☕ {m.example}</div>
        </motion.div>
      ))}
    </div>
  )
}

// ───────────────────────── Glossary Browser (Ch14) ─────────────────────────
function GlossaryBrowser() {
  const [q, setQ] = useState('')
  const sorted = useMemo(() => [...glossary].sort((a, b) => a.term.localeCompare(b.term)), [])
  const filtered = useMemo(
    () => sorted.filter((g) => g.term.toLowerCase().includes(q.toLowerCase()) || g.def.toLowerCase().includes(q.toLowerCase())),
    [q, sorted]
  )
  const letters = useMemo(() => Array.from(new Set(filtered.map((g) => g.term[0].toUpperCase()))), [filtered])
  const grouped = useMemo(() => {
    const m = {}
    filtered.forEach((g) => { const L = g.term[0].toUpperCase(); (m[L] ||= []).push(g) })
    return m
  }, [filtered])
  return (
    <div className={card}>
      <div className="sticky top-20 z-10 -mx-5 px-5 pb-3 bg-navy-900/80 backdrop-blur">
        <div className="relative">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search any term…"
            className="w-full rounded-xl bg-white/5 border border-white/10 pl-9 pr-3 py-2.5 text-sm focus:border-brand-purple outline-none" />
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {letters.map((L) => (
            <a key={L} href={`#gl-${L}`} className="w-7 h-7 grid place-items-center rounded-md text-xs bg-white/5 hover:bg-brand-purple/30 text-slate-300">{L}</a>
          ))}
        </div>
      </div>
      <div className="mt-3 space-y-5">
        {Object.keys(grouped).map((L) => (
          <div key={L} id={`gl-${L}`}>
            <div className="text-brand-purple font-extrabold text-lg mb-2">{L}</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {grouped[L].map((g) => (
                <div key={g.term} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="font-semibold text-white text-sm">{g.term}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{g.def}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No terms match “{q}”.</p>}
      </div>
    </div>
  )
}

const WIDGETS = {
  personaBuilder: PersonaBuilder,
  googleCampaignTabs: GoogleCampaignTabs,
  metaFormats: MetaFormats,
  platformTabs: PlatformTabs,
  trafficPie: TrafficPie,
  utmBuilder: UtmBuilder,
  metricsTable: MetricsTable,
  glossaryBrowser: GlossaryBrowser,
  ...adsWidgets,
}

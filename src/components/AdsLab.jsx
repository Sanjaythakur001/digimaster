import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer,
  Tooltip as RTooltip, LabelList,
} from 'recharts'
import { Gavel, Star, Calculator, TrendingUp, Trophy, AlertTriangle } from 'lucide-react'

const card = 'card p-5 my-6'
const C = { blue: '#3b82f6', green: '#22c55e', orange: '#f97316', purple: '#a855f7', slate: '#94a3b8' }
const inr = (n) => `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`

// shared slider
function Slider({ label, value, min, max, step = 1, onChange, suffix = '', accent = C.blue }) {
  return (
    <label className="block">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">{label}</span>
        <span className="font-bold" style={{ color: accent }}>{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-current" style={{ color: accent }} />
    </label>
  )
}

// ─────────────────────────── Live Ad Auction ───────────────────────────
const RIVALS = [
  { name: 'MegaShoes', bid: 90, qs: 5 },
  { name: 'RunFast', bid: 55, qs: 9 },
  { name: 'SpeedRun', bid: 50, qs: 6 },
  { name: 'BudgetKicks', bid: 40, qs: 7 },
]
const SLOTS = 4 // Google shows ~4 ads above the organic results

function AuctionSimulator() {
  const [bid, setBid] = useState(70)
  const [qs, setQs] = useState(8)

  const ranked = useMemo(() => {
    const field = [...RIVALS, { name: 'You', bid, qs, you: true }]
      .map((a) => ({ ...a, adRank: a.bid * a.qs }))
      .sort((a, b) => b.adRank - a.adRank)
    return field.map((a, i) => {
      const below = field[i + 1]
      // Generalised second-price: pay just enough to beat the Ad Rank below you.
      let cpc = below ? below.adRank / a.qs + 0.01 : 5
      cpc = Math.min(cpc, a.bid)
      return { ...a, pos: i + 1, cpc: Math.round(cpc * 100) / 100, shown: i < SLOTS }
    })
  }, [bid, qs])

  const me = ranked.find((r) => r.you)

  return (
    <div className={card}>
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue mb-1"><Gavel size={16} /> Live ad auction — you're one advertiser</div>
      <p className="text-xs text-slate-400 mb-4">Drag your bid and Quality Score. Every search re-runs this auction in milliseconds.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <Slider label="Your max bid (CPC)" value={bid} min={20} max={120} step={1} suffix="" onChange={setBid} accent={C.blue} />
        <Slider label="Your Quality Score (1–10)" value={qs} min={1} max={10} step={1} onChange={setQs} accent={C.purple} />
      </div>

      <div className="space-y-2">
        {ranked.map((a) => (
          <motion.div layout key={a.name}
            className="flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm"
            style={{
              borderColor: a.you ? `${C.blue}88` : 'rgba(255,255,255,0.08)',
              background: a.you ? `${C.blue}1a` : a.shown ? 'rgba(255,255,255,0.03)' : 'rgba(249,115,22,0.06)',
            }}>
            <span className="w-6 h-6 grid place-items-center rounded-lg text-xs font-bold shrink-0"
              style={{ background: a.shown ? `${C.blue}33` : `${C.orange}33`, color: a.shown ? C.blue : C.orange }}>
              {a.shown ? a.pos : '—'}
            </span>
            <span className={`font-semibold ${a.you ? 'text-white' : 'text-slate-300'}`}>
              {a.name}{a.you && ' (you)'}
            </span>
            {a.pos === 1 && <Trophy size={14} className="text-brand-orange" />}
            <span className="ml-auto text-xs text-slate-400 hidden sm:block">
              {inr(a.bid)} bid × {a.qs} QS = <span className="text-slate-200 font-semibold">{a.adRank}</span> Ad Rank
            </span>
            <span className="text-xs font-bold shrink-0" style={{ color: a.shown ? C.green : C.slate }}>
              {a.shown ? `pays ${inr(a.cpc)}` : 'not shown'}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border p-3 text-sm flex gap-3"
        style={{ borderColor: me.shown ? `${C.green}44` : `${C.orange}55`, background: me.shown ? `${C.green}12` : `${C.orange}12` }}>
        {me.shown
          ? <><Trophy size={18} className="text-brand-green shrink-0 mt-0.5" />
              <span className="text-slate-200">You're at <b className="text-white">position {me.pos}</b>. You bid {inr(bid)} but pay only <b className="text-brand-green">{inr(me.cpc)}</b> — Quality Score {qs} buys placement at a discount. {me.pos === 1 && qs >= 8 && 'Relevance beat a bigger budget.'}</span></>
          : <><AlertTriangle size={18} className="text-brand-orange shrink-0 mt-0.5" />
              <span className="text-slate-200">Your Ad Rank ({bid * qs}) fell below the top {SLOTS} slots — <b className="text-white">your ad won't show.</b> Raise your Quality Score (cheapest) or your bid.</span></>}
      </div>
    </div>
  )
}

// ─────────────────────── Quality Score → CPC lab ───────────────────────
const LEVELS = [
  { label: 'Below avg', v: 3 },
  { label: 'Average', v: 6 },
  { label: 'Above avg', v: 10 },
]
const FACTORS = [
  { key: 'ctr', name: 'Expected CTR', weight: 0.4 },
  { key: 'rel', name: 'Ad relevance', weight: 0.3 },
  { key: 'lp', name: 'Landing-page experience', weight: 0.3 },
]
const RIVAL_AD_RANK = 400 // Ad Rank you must match to hold position 1

function QualityScoreLab() {
  const [f, setF] = useState({ ctr: 2, rel: 2, lp: 2 }) // index into LEVELS
  const qs = useMemo(() => {
    const raw = FACTORS.reduce((s, x) => s + LEVELS[f[x.key]].v * x.weight, 0)
    return Math.max(1, Math.min(10, Math.round(raw)))
  }, [f])

  const yourCpc = RIVAL_AD_RANK / qs
  const avgCpc = RIVAL_AD_RANK / 5 // a QS-5 competitor
  const savings = Math.max(0, Math.round((1 - yourCpc / avgCpc) * 100))

  return (
    <div className={card}>
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-purple mb-1"><Star size={16} /> Quality Score lab — relevance is a discount</div>
      <p className="text-xs text-slate-400 mb-4">Quality Score (1–10) is built from three signals. Improve them and the same position costs less.</p>

      <div className="space-y-3">
        {FACTORS.map((x) => (
          <div key={x.key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">{x.name} <span className="text-slate-500">· {Math.round(x.weight * 100)}% weight</span></span>
              <span className="font-semibold text-brand-purple">{LEVELS[f[x.key]].label}</span>
            </div>
            <div className="flex gap-1.5">
              {LEVELS.map((lv, i) => (
                <button key={lv.label} onClick={() => setF((s) => ({ ...s, [x.key]: i }))}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium transition"
                  style={f[x.key] === i
                    ? { background: C.purple, color: '#0f172a' }
                    : { background: 'rgba(255,255,255,0.05)', color: '#cbd5e1' }}>
                  {lv.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl border p-3" style={{ borderColor: `${C.purple}55`, background: `${C.purple}12` }}>
          <div className="text-xs text-slate-400">Quality Score</div>
          <div className="text-2xl font-extrabold" style={{ color: C.purple }}>{qs}/10</div>
        </div>
        <div className="rounded-2xl border p-3" style={{ borderColor: `${C.blue}55`, background: `${C.blue}12` }}>
          <div className="text-xs text-slate-400">Your CPC for pos 1</div>
          <div className="text-2xl font-extrabold" style={{ color: C.blue }}>{inr(Math.round(yourCpc))}</div>
        </div>
        <div className="rounded-2xl border p-3" style={{ borderColor: `${C.green}55`, background: `${C.green}12` }}>
          <div className="text-xs text-slate-400">vs a QS-5 rival</div>
          <div className="text-2xl font-extrabold" style={{ color: C.green }}>−{savings}%</div>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 mt-3">Because CPC needed to hold a position ∝ 1 ÷ Quality Score, doubling your QS roughly halves your cost for the same slot.</p>
    </div>
  )
}

// ───────────────── Bid economics — what you can afford to pay ─────────────────
function BidEconomics() {
  const [aov, setAov] = useState(2000)
  const [margin, setMargin] = useState(40)
  const [cvr, setCvr] = useState(3)

  const maxCPA = aov * (margin / 100)
  const maxCPC = maxCPA * (cvr / 100)
  const beRoas = margin > 0 ? 100 / margin : 0

  const rows = [
    { label: 'Break-even ROAS', val: `${beRoas.toFixed(2)}x`, sub: '= 1 ÷ margin. Below this you lose money.', formula: '100 ÷ Margin%', color: C.orange },
    { label: 'Max CPA you can afford', val: inr(Math.round(maxCPA)), sub: 'Most you can pay per sale at break-even.', formula: 'AOV × Margin%', color: C.purple },
    { label: 'Max CPC (your bid ceiling)', val: inr(Math.round(maxCPC * 100) / 100), sub: 'Bid below this to stay profitable.', formula: 'Max CPA × CVR%', color: C.green },
  ]

  return (
    <div className={card}>
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-green mb-1"><Calculator size={16} /> Bid economics — why your max CPC isn't a guess</div>
      <p className="text-xs text-slate-400 mb-4">The number you can bid is dictated by the maths below — not by the competition. This is the spine of profitable paid search.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        <label className="block">
          <span className="text-xs text-slate-400">Average order value (AOV)</span>
          <div className="flex items-center mt-1 rounded-lg bg-white/5 border border-white/10 px-3">
            <span className="text-slate-500 text-sm">₹</span>
            <input type="number" value={aov} onChange={(e) => setAov(parseFloat(e.target.value) || 0)}
              className="w-full bg-transparent py-2 text-sm outline-none" />
          </div>
        </label>
        <Slider label="Gross margin" value={margin} min={5} max={90} step={1} suffix="%" onChange={setMargin} accent={C.purple} />
        <Slider label="Landing-page CVR" value={cvr} min={0.5} max={15} step={0.5} suffix="%" onChange={setCvr} accent={C.green} />
      </div>

      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3 rounded-xl border px-4 py-3"
            style={{ borderColor: `${r.color}44`, background: `${r.color}10` }}>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">{r.label}</div>
              <div className="text-[11px] text-slate-400">{r.sub}</div>
            </div>
            <code className="hidden sm:block text-[11px] text-slate-500">{r.formula}</code>
            <div className="text-xl font-extrabold shrink-0" style={{ color: r.color }}>{r.val}</div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500 mt-3">Worked: AOV {inr(aov)} × {margin}% margin = {inr(Math.round(maxCPA))} max CPA. At {cvr}% CVR, only {cvr} of every 100 clicks buys — so each click is worth {inr(Math.round(maxCPC * 100) / 100)}. Bid above that and you burn cash.</p>
    </div>
  )
}

// ─────────────────────────── Benchmark chart ───────────────────────────
const CPC_BENCHMARKS = [
  { industry: 'Legal', cpc: 110, color: C.orange },
  { industry: 'Finance', cpc: 75, color: C.orange },
  { industry: 'B2B / SaaS', cpc: 60, color: C.blue },
  { industry: 'Ecommerce', cpc: 22, color: C.green },
  { industry: 'Travel', cpc: 18, color: C.green },
  { industry: 'Food / D2C', cpc: 12, color: C.green },
]
function IndustryBenchmarks() {
  return (
    <div className={card}>
      <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue mb-1"><TrendingUp size={16} /> Average Search CPC by industry (India, indicative)</div>
      <p className="text-xs text-slate-400 mb-4">High-value, high-competition niches pay far more per click — which is exactly why bid economics matters more there.</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CPC_BENCHMARKS} layout="vertical" margin={{ left: 10, right: 30 }}>
            <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(v) => `₹${v}`} />
            <YAxis type="category" dataKey="industry" stroke="#94a3b8" fontSize={12} width={86} />
            <RTooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#e2e8f0' }}
              formatter={(v) => [`₹${v}`, 'Avg CPC']} />
            <Bar dataKey="cpc" radius={[0, 6, 6, 0]} barSize={20}>
              {CPC_BENCHMARKS.map((d) => <Cell key={d.industry} fill={d.color} />)}
              <LabelList dataKey="cpc" position="right" formatter={(v) => `₹${v}`} fill="#cbd5e1" fontSize={11} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export const adsWidgets = {
  auctionSimulator: AuctionSimulator,
  qualityScoreLab: QualityScoreLab,
  bidEconomics: BidEconomics,
}
export const adsCharts = {
  industryBenchmarks: IndustryBenchmarks,
}

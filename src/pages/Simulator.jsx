import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip as RTooltip } from 'recharts'
import {
  ArrowRight, ArrowLeft, Rocket, Check, Sparkles, Target, RotateCcw, Trophy,
  TrendingUp, TrendingDown, Lightbulb,
} from 'lucide-react'
import {
  businesses, goals, channels, intents, cityTiers, interestOptions, landingTypes,
  simulate, getSuggestions, scoreCampaign,
} from '../lib/simEngine.js'
import { useProgress } from '../context/ProgressContext.jsx'
import Confetti from '../components/Confetti.jsx'

const STEPS = ['Business', 'Goal', 'Budget', 'Channel', 'Audience', 'Ad', 'Landing', 'Launch', 'Optimise', 'Relaunch']
const cmap = { blue: '#3b82f6', green: '#22c55e', orange: '#f97316', purple: '#a855f7' }

const initial = {
  business: null, goal: null, budget: 50000, channel: null,
  ageMin: 22, ageMax: 40, tier: 'metro', interests: [], intent: 'consideration',
  headline: '', description: '', cta: 'Shop Now', visual: 'Image', landing: null,
}

export default function Simulator() {
  const { recordSimScore } = useProgress()
  const [step, setStep] = useState(0)
  const [cfg, setCfg] = useState(initial)
  const [launching, setLaunching] = useState(false)
  const [firstResult, setFirstResult] = useState(null)
  const [firstScore, setFirstScore] = useState(0)
  const [opts, setOpts] = useState([])
  const [relaunched, setRelaunched] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  const set = (patch) => setCfg((c) => ({ ...c, ...patch }))

  const canNext = useMemo(() => {
    switch (step) {
      case 0: return !!cfg.business
      case 1: return !!cfg.goal
      case 3: return !!cfg.channel
      case 6: return !!cfg.landing
      default: return true
    }
  }, [step, cfg])

  const runLaunch = () => {
    setLaunching(true)
    setTimeout(() => {
      const res = simulate(cfg)
      const sc = scoreCampaign(res)
      setFirstResult(res); setFirstScore(sc)
      recordSimScore(sc)
      setLaunching(false)
      setStep(7)
    }, 2200)
  }

  const relaunch = () => {
    const res = simulate(cfg, opts)
    const sc = scoreCampaign(res)
    recordSimScore(sc)
    setRelaunched({ res, sc })
    setCelebrate(true)
    setTimeout(() => setCelebrate(false), 2500)
    setStep(9)
  }

  const next = () => {
    if (step === 6) return runLaunch()
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }
  const back = () => setStep((s) => Math.max(0, s - 1))
  const restart = () => { setCfg(initial); setStep(0); setFirstResult(null); setOpts([]); setRelaunched(false) }

  const suggestions = firstResult ? getSuggestions(cfg, firstResult) : []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {celebrate && <Confetti count={60} />}

      {/* step indicator */}
      <div className="mb-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max">
          {STEPS.map((s, k) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                k === step ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white' : k < step ? 'text-brand-green' : 'text-slate-500'}`}>
                <span className={`grid place-items-center w-5 h-5 rounded-full text-[10px] ${k < step ? 'bg-brand-green text-navy-900' : k === step ? 'bg-white/20' : 'bg-white/5'}`}>
                  {k < step ? <Check size={11} /> : k + 1}
                </span>
                <span className="hidden sm:inline">{s}</span>
              </div>
              {k < STEPS.length - 1 && <div className="w-3 h-px bg-white/10" />}
            </div>
          ))}
        </div>
      </div>

      {launching && <LaunchSequence />}

      <AnimatePresence mode="wait">
        {!launching && (
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            {step === 0 && <StepBusiness cfg={cfg} set={set} />}
            {step === 1 && <StepGoal cfg={cfg} set={set} />}
            {step === 2 && <StepBudget cfg={cfg} set={set} />}
            {step === 3 && <StepChannel cfg={cfg} set={set} />}
            {step === 4 && <StepAudience cfg={cfg} set={set} />}
            {step === 5 && <StepAd cfg={cfg} set={set} />}
            {step === 6 && <StepLanding cfg={cfg} set={set} />}
            {step === 7 && firstResult && <ResultsDashboard res={firstResult} score={firstScore} />}
            {step === 8 && <StepOptimize suggestions={suggestions} opts={opts} setOpts={setOpts} />}
            {step === 9 && relaunched && <RelaunchResults first={firstResult} firstScore={firstScore} second={relaunched.res} secondScore={relaunched.sc} opts={opts} onRestart={restart} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* nav */}
      {!launching && step < 9 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <button onClick={back} disabled={step === 0} className="btn-ghost disabled:opacity-30"><ArrowLeft size={16} /> Back</button>
          {step === 6 && <button onClick={next} disabled={!canNext} className="btn-primary disabled:opacity-40"><Rocket size={16} /> Launch Campaign</button>}
          {step === 7 && <button onClick={() => setStep(8)} className="btn-primary">See suggestions <ArrowRight size={16} /></button>}
          {step === 8 && <button onClick={relaunch} className="btn-primary shadow-glow-green"><RotateCcw size={16} /> Optimise & Relaunch</button>}
          {step < 6 && <button onClick={next} disabled={!canNext} className="btn-primary disabled:opacity-40">Next <ArrowRight size={16} /></button>}
        </div>
      )}
    </div>
  )
}

/* ── step header ── */
function Head({ n, title, sub }) {
  return (
    <div className="mb-6">
      <div className="text-xs uppercase tracking-[0.3em] text-brand-purple">Step {n}</div>
      <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">{title}</h1>
      {sub && <p className="text-slate-400 mt-1">{sub}</p>}
    </div>
  )
}

function CardGrid({ items, value, onChange, cols = 2 }) {
  return (
    <div className={`grid sm:grid-cols-${cols} gap-3`}>
      {items.map((it) => {
        const active = value === it.id
        return (
          <button key={it.id} onClick={() => onChange(it.id)}
            className={`text-left rounded-2xl border p-4 transition hover:-translate-y-0.5 ${active ? 'border-brand-blue bg-brand-blue/10 ring-1 ring-brand-blue/40' : 'border-white/10 hover:bg-white/5'}`}>
            <div className="text-3xl mb-2">{it.emoji}</div>
            <div className="font-bold text-white">{it.name}</div>
            <div className="text-xs text-slate-400 mt-1">{it.desc}</div>
          </button>
        )
      })}
    </div>
  )
}

function StepBusiness({ cfg, set }) {
  return <><Head n={1} title="Choose your business" sub="Each type has its own benchmarks." /><CardGrid items={businesses} value={cfg.business} onChange={(id) => set({ business: id })} /></>
}
function StepGoal({ cfg, set }) {
  return <><Head n={2} title="Set your goal" sub="This changes which metrics matter in your results." /><CardGrid items={goals} value={cfg.goal} onChange={(id) => set({ goal: id })} cols={3} /></>
}

function StepBudget({ cfg, set }) {
  const b = businesses.find((x) => x.id === cfg.business) || businesses[0]
  const estReach = Math.round((cfg.budget / 22) * 0.65 / (2.1 / 100)).toLocaleString('en-IN')
  return (
    <>
      <Head n={3} title="Set your monthly budget" />
      <div className="card p-6">
        <div className="text-center text-4xl font-extrabold gradient-text mb-2">₹{cfg.budget.toLocaleString('en-IN')}</div>
        <input type="range" min={5000} max={500000} step={5000} value={cfg.budget} onChange={(e) => set({ budget: +e.target.value })}
          className="w-full accent-brand-purple" />
        <div className="flex justify-between text-xs text-slate-500 mt-1"><span>₹5,000</span><span>₹5,00,000</span></div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl border border-white/10 p-3"><div className="text-xs text-slate-400">Est. monthly reach</div><div className="text-lg font-bold text-brand-blue">~{estReach}</div></div>
          <div className="rounded-xl border border-white/10 p-3"><div className="text-xs text-slate-400">Business AOV</div><div className="text-lg font-bold text-brand-green">₹{b.aov.toLocaleString('en-IN')}</div></div>
        </div>
      </div>
    </>
  )
}

function StepChannel({ cfg, set }) {
  return (
    <>
      <Head n={4} title="Choose your channel" sub="Capture demand (Google) vs create it (Meta)." />
      <CardGrid items={channels} value={cfg.channel} onChange={(id) => set({ channel: id })} cols={3} />
    </>
  )
}

function StepAudience({ cfg, set }) {
  const toggle = (i) => set({ interests: cfg.interests.includes(i) ? cfg.interests.filter((x) => x !== i) : [...cfg.interests, i] })
  // crude audience size estimate
  const tier = cityTiers.find((t) => t.id === cfg.tier)
  const base = 8_000_000 * tier.reachMult
  const ageFactor = (cfg.ageMax - cfg.ageMin) / 40
  const intFactor = cfg.interests.length ? Math.max(0.15, 1 - cfg.interests.length * 0.12) : 1
  const size = Math.round(base * ageFactor * intFactor)
  return (
    <>
      <Head n={5} title="Define your audience" sub="Tighter targeting = more relevant, often cheaper." />
      <div className="card p-6 space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2"><span className="text-slate-300">Age range</span><span className="font-semibold text-white">{cfg.ageMin}–{cfg.ageMax}</span></div>
          <div className="flex gap-3 items-center">
            <input type="range" min={13} max={65} value={cfg.ageMin} onChange={(e) => set({ ageMin: Math.min(+e.target.value, cfg.ageMax - 1) })} className="w-full accent-brand-blue" />
            <input type="range" min={13} max={65} value={cfg.ageMax} onChange={(e) => set({ ageMax: Math.max(+e.target.value, cfg.ageMin + 1) })} className="w-full accent-brand-purple" />
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-300 mb-2">City tier</div>
          <div className="flex gap-2">
            {cityTiers.map((t) => (
              <button key={t.id} onClick={() => set({ tier: t.id })} className={`flex-1 rounded-xl border py-2 text-sm ${cfg.tier === t.id ? 'border-brand-blue bg-brand-blue/10 text-white' : 'border-white/10 text-slate-300'}`}>{t.name}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-300 mb-2">Interests</div>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((i) => (
              <button key={i} onClick={() => toggle(i)} className={`chip border ${cfg.interests.includes(i) ? 'border-brand-purple bg-brand-purple/15 text-brand-purple' : 'border-white/10 text-slate-300'}`}>{i}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-300 mb-2">Intent level</div>
          <div className="flex gap-2">
            {intents.map((t) => (
              <button key={t.id} onClick={() => set({ intent: t.id })} className={`flex-1 rounded-xl border py-2 text-xs sm:text-sm ${cfg.intent === t.id ? 'border-brand-green bg-brand-green/10 text-white' : 'border-white/10 text-slate-300'}`}>{t.name}</button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/10 p-3 text-center">
          <span className="text-xs text-slate-400">Estimated audience size </span>
          <span className="text-lg font-bold text-brand-blue">~{size.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </>
  )
}

function StepAd({ cfg, set }) {
  const ctas = ['Shop Now', 'Get 30% Off', 'Sign Up Free', 'Learn More', 'Book Now']
  const visuals = ['Image', 'Video', 'Carousel']
  return (
    <>
      <Head n={6} title="Build your ad" sub="Watch the live preview update as you type." />
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card p-5 space-y-4">
          <label className="block">
            <div className="flex justify-between text-xs text-slate-400"><span>Headline</span><span className={cfg.headline.length > 50 ? 'text-brand-orange' : ''}>{cfg.headline.length}/50</span></div>
            <input maxLength={60} value={cfg.headline} onChange={(e) => set({ headline: e.target.value })} placeholder="Brighter skin in 14 days — 4.8★"
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-brand-blue outline-none" />
          </label>
          <label className="block">
            <div className="flex justify-between text-xs text-slate-400"><span>Description</span><span>{cfg.description.length}/90</span></div>
            <textarea maxLength={90} rows={2} value={cfg.description} onChange={(e) => set({ description: e.target.value })} placeholder="Clinically-tested Vitamin C serum. Free shipping. Money-back guarantee."
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-brand-blue outline-none resize-none" />
          </label>
          <div>
            <div className="text-xs text-slate-400 mb-1">CTA button</div>
            <div className="flex flex-wrap gap-2">{ctas.map((c) => <button key={c} onClick={() => set({ cta: c })} className={`chip border ${cfg.cta === c ? 'border-brand-green bg-brand-green/15 text-brand-green' : 'border-white/10 text-slate-300'}`}>{c}</button>)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">Visual type</div>
            <div className="flex gap-2">{visuals.map((v) => <button key={v} onClick={() => set({ visual: v })} className={`flex-1 rounded-xl border py-2 text-sm ${cfg.visual === v ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-white/10 text-slate-300'}`}>{v}</button>)}</div>
          </div>
        </div>
        <AdPreview cfg={cfg} />
      </div>
    </>
  )
}

function AdPreview({ cfg }) {
  const isGoogle = cfg.channel === 'google'
  return (
    <div className="card p-5">
      <div className="text-xs text-slate-400 mb-3">Live preview ({isGoogle ? 'Google Search' : 'Meta feed'})</div>
      {isGoogle ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1"><span className="font-bold text-white">Ad</span> · glowup.in</div>
          <div className="text-brand-blue text-lg font-medium leading-snug">{cfg.headline || 'Your headline appears here'}</div>
          <div className="text-sm text-slate-400 mt-1">{cfg.description || 'Your description shows here — make it benefit-led.'}</div>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center gap-2 p-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple" /><div><div className="text-sm font-semibold text-white">GlowUp</div><div className="text-[10px] text-slate-400">Sponsored</div></div></div>
          <div className="h-40 grid place-items-center text-5xl bg-gradient-to-br from-navy-800 to-navy-950">{cfg.visual === 'Video' ? '▶️' : cfg.visual === 'Carousel' ? '🖼️🖼️' : '🧴'}</div>
          <div className="p-3">
            <div className="text-sm font-semibold text-white">{cfg.headline || 'Your headline appears here'}</div>
            <div className="text-xs text-slate-400 mt-0.5">{cfg.description || 'Your description shows here.'}</div>
            <button className="mt-2 w-full rounded-lg bg-brand-blue/90 py-1.5 text-sm font-semibold text-white">{cfg.cta}</button>
          </div>
        </div>
      )}
    </div>
  )
}

function StepLanding({ cfg, set }) {
  return (
    <>
      <Head n={7} title="Choose your landing page" sub="The page is part of your conversion rate." />
      <CardGrid items={landingTypes} value={cfg.landing} onChange={(id) => set({ landing: id })} />
    </>
  )
}

function LaunchSequence() {
  const msgs = ['Submitting to ad auction…', 'Matching your audience…', 'Optimising delivery…', 'Collecting results…']
  const [m, setM] = useState(0)
  useEffect(() => { const t = setInterval(() => setM((x) => Math.min(x + 1, msgs.length - 1)), 520); return () => clearInterval(t) }, [])
  return (
    <div className="card p-12 text-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} className="mx-auto mb-5 w-14 h-14 rounded-full border-4 border-white/10 border-t-brand-purple" />
      <div className="text-lg font-bold text-white">🚀 Launching your campaign</div>
      <AnimatePresence mode="wait"><motion.div key={m} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-sm text-slate-400 mt-2">{msgs[m]}</motion.div></AnimatePresence>
    </div>
  )
}

/* ── animated number ── */
function Num({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    const controls = animate(0, value, {
      duration: 1.4, ease: 'easeOut',
      onUpdate: (v) => { if (node) node.textContent = prefix + v.toLocaleString('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) + suffix },
    })
    return () => controls.stop()
  }, [value])
  return <span ref={ref}>{prefix}0{suffix}</span>
}

function ResultsDashboard({ res, score }) {
  const data = [
    { name: 'CTR', you: +res.ctr.toFixed(1), bench: +res.bench.ctr.toFixed(1), unit: '%' },
    { name: 'Conv. Rate', you: +res.cvrPct.toFixed(1), bench: +res.bench.cvr.toFixed(1), unit: '%' },
    { name: 'ROAS', you: +res.roas.toFixed(1), bench: res.bench.roas, unit: 'x' },
  ]
  return (
    <div>
      <Head n={8} title="🎉 Campaign Results" sub="Animated metrics + benchmark comparison." />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <Metric label="Impressions" val={<Num value={res.impressions} />} c="blue" />
        <Metric label="Clicks" val={<Num value={res.clicks} />} c="blue" />
        <Metric label="CTR" val={<Num value={res.ctr} suffix="%" decimals={1} />} c={res.ctr >= res.bench.ctr ? 'green' : 'orange'} good={res.ctr >= res.bench.ctr} bench={`bench ${res.bench.ctr.toFixed(1)}%`} />
        <Metric label="Conversions" val={<Num value={res.conversions} />} c="purple" />
        <Metric label="CPA" val={<Num value={res.cpa} prefix="₹" decimals={0} />} c="orange" />
        <Metric label="ROAS" val={<Num value={res.roas} suffix="x" decimals={1} />} c={res.roas >= res.bench.roas ? 'green' : 'orange'} good={res.roas >= res.bench.roas} bench="bench 3.0x" />
      </div>

      <div className="card p-5 mb-5">
        <div className="text-sm font-semibold text-slate-200 mb-3">You vs Industry Benchmark</div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <RTooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="bench" name="Benchmark" fill="#475569" radius={[6, 6, 0, 0]} />
              <Bar dataKey="you" name="You" radius={[6, 6, 0, 0]}>
                {data.map((d, i) => <Cell key={i} fill={d.you >= d.bench ? '#22c55e' : '#f97316'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <QualityScore score={score} quality={res.quality} />
    </div>
  )
}

function Metric({ label, val, c, good, bench }) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: `${cmap[c]}44`, background: `${cmap[c]}0d` }}>
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">{val}</div>
      {bench && (
        <div className="flex items-center gap-1 text-[11px] mt-1" style={{ color: good ? '#22c55e' : '#f97316' }}>
          {good ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {bench}
        </div>
      )}
    </div>
  )
}

function QualityScore({ score, quality }) {
  const color = score >= 70 ? '#22c55e' : score >= 45 ? '#f97316' : '#ef4444'
  return (
    <div className="card p-5 flex items-center gap-5">
      <div className="relative grid place-items-center w-24 h-24 shrink-0">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <motion.circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={276} initial={{ strokeDashoffset: 276 }} animate={{ strokeDashoffset: 276 - (276 * score) / 100 }} transition={{ duration: 1.4 }} />
        </svg>
        <div className="text-2xl font-extrabold" style={{ color }}>{score}</div>
      </div>
      <div>
        <div className="text-sm font-semibold text-white">Campaign Quality Score</div>
        <p className="text-xs text-slate-400 mt-1">{score >= 70 ? 'Excellent — well-targeted and efficient. Scale it!' : score >= 45 ? 'Decent start — the suggestions next will lift this.' : 'Lots of upside — optimise and relaunch to see the jump.'}</p>
      </div>
    </div>
  )
}

function StepOptimize({ suggestions, opts, setOpts }) {
  const toggle = (id) => setOpts((o) => o.includes(id) ? o.filter((x) => x !== id) : [...o, id])
  return (
    <div>
      <Head n={9} title="Optimisation suggestions" sub="Check the fixes you’ll apply — each boosts specific metrics." />
      <div className="space-y-3">
        {suggestions.map((s) => {
          const on = opts.includes(s.id)
          return (
            <button key={s.id} onClick={() => toggle(s.id)}
              className={`w-full text-left rounded-2xl border p-4 transition ${on ? 'border-brand-green/50 bg-brand-green/10' : 'border-white/10 hover:bg-white/5'}`}>
              <div className="flex items-start gap-3">
                <div className={`grid place-items-center w-6 h-6 rounded-md shrink-0 mt-0.5 ${on ? 'bg-brand-green text-navy-900' : 'bg-white/10'}`}>{on ? <Check size={14} /> : <Lightbulb size={14} className="text-brand-orange" />}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white text-sm">{s.title}</span>
                    <span className="chip bg-brand-green/15 text-brand-green shrink-0">{s.boost}</span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {s.tips.map((t) => <li key={t} className="text-xs text-slate-400 flex items-center gap-1.5"><ArrowRight size={11} className="text-brand-blue" /> {t}</li>)}
                  </ul>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RelaunchResults({ first, firstScore, second, secondScore, opts, onRestart }) {
  const rows = [
    ['CTR', `${first.ctr.toFixed(1)}%`, `${second.ctr.toFixed(1)}%`, second.ctr >= first.ctr],
    ['Conversions', first.conversions, second.conversions, second.conversions >= first.conversions],
    ['CPA', `₹${Math.round(first.cpa)}`, `₹${Math.round(second.cpa)}`, second.cpa <= first.cpa],
    ['ROAS', `${first.roas.toFixed(1)}x`, `${second.roas.toFixed(1)}x`, second.roas >= first.roas],
    ['Revenue', `₹${Math.round(first.revenue).toLocaleString('en-IN')}`, `₹${Math.round(second.revenue).toLocaleString('en-IN')}`, second.revenue >= first.revenue],
  ]
  return (
    <div>
      <Head n={10} title="🚀 Relaunch Results" sub="Your optimised campaign vs the first run." />
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div className="card p-5 text-center"><div className="text-xs text-slate-400">First run</div><div className="text-4xl font-extrabold text-slate-300 mt-1">{firstScore}</div></div>
        <div className="card p-5 text-center border-brand-green/40" style={{ borderColor: '#22c55e55' }}>
          <div className="text-xs text-brand-green">After optimising</div>
          <div className="text-4xl font-extrabold text-brand-green mt-1"><Num value={secondScore} /></div>
          <div className="text-xs text-brand-green mt-1">+{secondScore - firstScore} points</div>
        </div>
      </div>

      <div className="card overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead><tr className="bg-white/5 text-slate-400 text-xs"><th className="text-left px-4 py-3">Metric</th><th className="px-4 py-3">Before</th><th className="px-4 py-3">After</th><th className="px-4 py-3">Δ</th></tr></thead>
          <tbody>
            {rows.map(([k, a, b, good]) => (
              <tr key={k} className="border-t border-white/5">
                <td className="px-4 py-3 font-semibold text-white">{k}</td>
                <td className="px-4 py-3 text-center text-slate-400">{a}</td>
                <td className="px-4 py-3 text-center font-bold text-white">{b}</td>
                <td className="px-4 py-3 text-center">{good ? <TrendingUp size={16} className="inline text-brand-green" /> : <TrendingDown size={16} className="inline text-brand-orange" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card p-5 text-center">
        <Trophy size={36} className="mx-auto text-brand-green mb-2" />
        <div className="font-bold text-white">Final Campaign Score: <span className="gradient-text">{secondScore}/100</span></div>
        <p className="text-sm text-slate-400 mt-1">You applied {opts.length} optimisation{opts.length !== 1 ? 's' : ''}. {secondScore >= 75 ? 'Pro-level — you’re interview-ready! 🔥' : 'Solid — try different choices to push past 75.'}</p>
        <button onClick={onRestart} className="btn-ghost mt-4 mx-auto"><RotateCcw size={16} /> Run a new campaign</button>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import {
  Search, FileText, Trophy, Link2, Bot, Database, ArrowRight, ArrowDown,
  Gauge, MousePointerClick, Eye, ShoppingCart, Mail, Tag, BarChart3,
  Layers, FolderTree, Megaphone, CheckCircle2, Zap, Users, UserPlus, Target,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
}

function Frame({ children, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`card p-5 sm:p-7 my-6 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

const Box = ({ children, color = 'blue', className = '' }) => (
  <div
    className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold bg-${color}-500/10 ${className}`}
    style={{
      borderColor: cssColor(color, 0.4),
      background: cssColor(color, 0.1),
      color: cssColor(color, 1),
    }}
  >
    {children}
  </div>
)

function cssColor(c, a = 1) {
  const map = { blue: '59,130,246', green: '34,197,94', orange: '249,115,22', purple: '168,85,247', slate: '148,163,184' }
  return `rgba(${map[c] || map.blue},${a})`
}

const Step = ({ i, color, icon: I, title, desc }) => (
  <motion.div variants={fadeUp} custom={i} className="flex-1 min-w-[140px]">
    <div
      className="flex flex-col items-center gap-2 rounded-2xl border p-4 h-full"
      style={{ borderColor: cssColor(color, 0.35), background: cssColor(color, 0.07) }}
    >
      <div className="grid place-items-center w-12 h-12 rounded-xl" style={{ background: cssColor(color, 0.18) }}>
        <I size={22} style={{ color: cssColor(color, 1) }} />
      </div>
      <div className="font-bold text-white">{title}</div>
      <div className="text-xs text-slate-400 text-center leading-relaxed">{desc}</div>
    </div>
  </motion.div>
)

const Arrow = () => (
  <div className="hidden sm:flex items-center justify-center px-1 text-slate-500">
    <ArrowRight size={20} />
  </div>
)

// ─────────────────────────────────────────────────────────────────────────
export default function Diagram({ name }) {
  const D = DIAGRAMS[name]
  return D ? <D /> : null
}

const DIAGRAMS = {
  // CH1 — ecosystem
  ecosystem: () => (
    <Frame>
      <div className="text-center mb-6 text-sm uppercase tracking-widest text-slate-400">The Digital Marketing Ecosystem</div>
      <div className="relative grid place-items-center">
        <motion.div
          variants={fadeUp}
          className="z-10 grid place-items-center w-28 h-28 rounded-full text-center font-bold text-white"
          style={{ background: 'radial-gradient(circle,#3b82f6,#a855f7)' }}
        >
          Your<br />Business
        </motion.div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
          {[
            ['Content', 'orange'], ['SEO', 'green'], ['Paid Ads', 'blue'], ['Social', 'purple'],
            ['Email', 'green'], ['Website', 'blue'], ['Analytics', 'orange'], ['Automation', 'purple'],
          ].map(([t, c], i) => (
            <motion.div key={t} variants={fadeUp} custom={i}><Box color={c}>{t}</Box></motion.div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-slate-400 max-w-md">
          Content fuels SEO & social → ads + SEO drive traffic to the website → analytics measures it → email & automation retain. One connected loop.
        </p>
      </div>
    </Frame>
  ),

  // CH3 — Core Web Vitals
  webVitals: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">Core Web Vitals</div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { k: 'LCP', d: 'Largest Contentful Paint — main content loads', good: '≤ 2.5s', c: 'green', pct: 80 },
          { k: 'INP', d: 'Interaction to Next Paint — responsiveness', good: '≤ 200ms', c: 'orange', pct: 65 },
          { k: 'CLS', d: 'Cumulative Layout Shift — visual stability', good: '≤ 0.1', c: 'blue', pct: 90 },
        ].map((v, i) => (
          <motion.div key={v.k} variants={fadeUp} custom={i} className="rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold" style={{ color: cssColor(v.c) }}>{v.k}</span>
              <Gauge size={18} style={{ color: cssColor(v.c) }} />
            </div>
            <p className="text-xs text-slate-400 mt-1 mb-3 h-10">{v.d}</p>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: cssColor(v.c) }}
                initial={{ width: 0 }} whileInView={{ width: `${v.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.15 }} />
            </div>
            <div className="text-right text-xs mt-1 font-semibold" style={{ color: cssColor(v.c) }}>Good: {v.good}</div>
          </motion.div>
        ))}
      </div>
    </Frame>
  ),

  // CH4 — crawl → index → rank
  seo: () => (
    <Frame>
      <div className="text-center mb-6 text-sm uppercase tracking-widest text-slate-400">How Google Works</div>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <Step i={0} color="blue" icon={Bot} title="1. Crawl" desc="Bots follow links to discover your pages across the web." />
        <Arrow />
        <Step i={1} color="purple" icon={Database} title="2. Index" desc="Pages are stored & understood in Google's giant database." />
        <Arrow />
        <Step i={2} color="green" icon={Trophy} title="3. Rank" desc="For each query, pages are ordered by relevance & quality." />
      </div>
      <motion.div variants={fadeUp} custom={3} className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
        <Search size={14} /> Query → Google scans the index → returns the best-ranked results in milliseconds.
      </motion.div>
    </Frame>
  ),

  // CH4 — on-page anatomy
  onpage: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">On-Page SEO — where each element goes</div>
      <div className="grid sm:grid-cols-[1fr,260px] gap-5 items-start">
        <div className="rounded-2xl border border-white/10 bg-navy-950/60 p-4 space-y-3">
          <div className="rounded-lg border border-brand-blue/50 bg-brand-blue/10 px-3 py-2 text-sm font-bold text-brand-blue">&lt;title&gt; Best Running Shoes 2026 | BrandX</div>
          <div className="rounded-lg border border-brand-purple/40 bg-brand-purple/10 px-3 py-2 text-xs text-brand-purple">meta description — the snippet under the title in results</div>
          <div className="rounded-lg border border-brand-green/50 bg-brand-green/10 px-3 py-2 text-base font-extrabold text-brand-green">H1 · Run Faster in BrandX Pro</div>
          <div className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-slate-300">H2 · Lightweight cushioning</div>
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-4/5 rounded bg-white/10" />
          <div className="flex items-center gap-2 text-xs text-brand-orange"><Link2 size={14}/> internal link → related guide</div>
          <div className="flex items-center gap-2 text-xs text-slate-400"><FileText size={14}/> img alt="brandx pro running shoe"</div>
        </div>
        <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
          <li>• <span className="text-brand-blue font-semibold">Title</span>: keyword near the front</li>
          <li>• <span className="text-brand-purple font-semibold">Meta desc</span>: written to earn the click</li>
          <li>• <span className="text-brand-green font-semibold">One H1</span>, logical H2/H3 below</li>
          <li>• Keyword in URL & first paragraph</li>
          <li>• <span className="text-brand-orange font-semibold">Internal links</span> spread authority</li>
          <li>• Alt text on every image</li>
        </ul>
      </div>
    </Frame>
  ),

  // CH4 — backlinks
  backlinks: () => (
    <Frame>
      <div className="text-center mb-6 text-sm uppercase tracking-widest text-slate-400">Off-Page SEO — backlinks as votes</div>
      <div className="relative grid place-items-center">
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          {['News Site', 'Blog', 'Directory'].map((s, i) => (
            <motion.div key={s} variants={fadeUp} custom={i} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs">{s}</motion.div>
          ))}
        </div>
        <div className="flex gap-10 my-2 text-brand-green"><ArrowDown size={22}/><ArrowDown size={22}/><ArrowDown size={22}/></div>
        <motion.div variants={fadeUp} custom={3} className="rounded-2xl border-2 border-brand-green/50 bg-brand-green/10 px-6 py-4 font-bold text-brand-green">
          Your Site ↑ Authority
        </motion.div>
        <p className="mt-4 text-center text-xs text-slate-400 max-w-sm">Each quality link is a "vote of trust". 3 links from respected sites beat 100 from spammy ones.</p>
      </div>
    </Frame>
  ),

  // CH5 / CH11 — funnel
  funnel: () => (
    <Frame>
      <div className="text-center mb-6 text-sm uppercase tracking-widest text-slate-400">The Marketing Funnel</div>
      <div className="flex flex-col items-center gap-1">
        {[
          { w: '100%', c: 'blue', t: 'TOFU · Awareness', s: 'Blogs, SEO, social, broad ads' },
          { w: '70%', c: 'orange', t: 'MOFU · Consideration', s: 'Email, webinars, comparisons, retargeting' },
          { w: '40%', c: 'green', t: 'BOFU · Decision', s: 'Offers, demos, reviews, checkout' },
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, scaleY: 0.4 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="origin-top rounded-lg border py-4 text-center"
            style={{ width: s.w, borderColor: cssColor(s.c, 0.5), background: cssColor(s.c, 0.12) }}
          >
            <div className="font-bold" style={{ color: cssColor(s.c) }}>{s.t}</div>
            <div className="text-[11px] text-slate-400">{s.s}</div>
          </motion.div>
        ))}
        <div className="text-brand-green mt-1"><ArrowDown size={20} /></div>
        <motion.div variants={fadeUp} custom={4} className="text-sm font-bold text-brand-green">🎉 Customer</motion.div>
      </div>
    </Frame>
  ),

  // CH5 — content calendar
  calendar: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">Content Calendar (sample week)</div>
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 text-xs">
        {[
          ['Mon', 'Blog post', 'green'], ['Tue', 'Reel', 'purple'], ['Wed', 'Newsletter', 'blue'],
          ['Thu', 'Carousel', 'orange'], ['Fri', 'YouTube', 'purple'], ['Sat', 'UGC repost', 'green'], ['Sun', 'Plan/analyse', 'blue'],
        ].map(([d, c, col], i) => (
          <motion.div key={d} variants={fadeUp} custom={i} className="rounded-xl border border-white/10 p-2 text-center">
            <div className="font-bold text-slate-300">{d}</div>
            <div className="mt-2 rounded-md px-1 py-1.5 font-medium" style={{ background: cssColor(col, 0.15), color: cssColor(col) }}>{c}</div>
          </motion.div>
        ))}
      </div>
    </Frame>
  ),

  // CH6 — auction
  auction: () => (
    <Frame>
      <div className="text-center mb-6 text-sm uppercase tracking-widest text-slate-400">The Google Ads Auction</div>
      <div className="space-y-3">
        {[
          { n: 'Advertiser A', bid: 30, qs: 9, rank: 270, c: 'green', pos: '#1 (pays less!)' },
          { n: 'Advertiser B', bid: 40, qs: 6, rank: 240, c: 'orange', pos: '#2' },
          { n: 'Advertiser C', bid: 50, qs: 4, rank: 200, c: 'blue', pos: '#3 (high bid, low QS)' },
        ].map((a, i) => (
          <motion.div key={a.n} variants={fadeUp} custom={i} className="rounded-xl border border-white/10 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white">{a.n}</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: cssColor(a.c, 0.15), color: cssColor(a.c) }}>{a.pos}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <span>Bid ₹{a.bid}</span><span className="text-slate-600">×</span><span>QS {a.qs}</span><span className="text-slate-600">=</span>
              <span className="font-bold" style={{ color: cssColor(a.c) }}>Ad Rank {a.rank}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div className="h-full" style={{ background: cssColor(a.c) }} initial={{ width: 0 }} whileInView={{ width: `${a.rank / 3}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.15 }} />
            </div>
          </motion.div>
        ))}
        <p className="text-center text-xs text-slate-400">Ad Rank = Bid × Quality Score. A wins #1 despite the lowest bid — relevance beats budget.</p>
      </div>
    </Frame>
  ),

  // CH6 — quality score
  qualityScore: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">What builds Quality Score</div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {[['Expected CTR', 'blue'], ['Ad Relevance', 'purple'], ['Landing Page Experience', 'green']].map(([t, c], i) => (
          <motion.div key={t} variants={fadeUp} custom={i}><Box color={c} className="min-w-[150px]">{t}</Box></motion.div>
        ))}
        <div className="text-slate-500 font-bold text-xl">=</div>
        <motion.div variants={fadeUp} custom={3} className="grid place-items-center w-20 h-20 rounded-full border-2 border-brand-green text-brand-green font-extrabold text-xl">
          QS<br/>1–10
        </motion.div>
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">Higher QS → higher Ad Rank at a lower CPC. The strict teacher rewards relevance.</p>
    </Frame>
  ),

  // CH6 — campaign hierarchy
  googleHierarchy: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">Campaign Structure</div>
      <div className="space-y-2 max-w-lg mx-auto">
        <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2 rounded-xl border border-brand-blue/40 bg-brand-blue/10 p-3">
          <Megaphone size={18} className="text-brand-blue" /><span className="font-bold text-brand-blue">Campaign</span><span className="text-xs text-slate-400">— goal & budget (e.g. "Mumbai – Sales")</span>
        </motion.div>
        <div className="pl-6 space-y-2">
          {['Biryani', 'Pizza'].map((g, i) => (
            <motion.div key={g} variants={fadeUp} custom={i + 1}>
              <div className="flex items-center gap-2 rounded-xl border border-brand-purple/40 bg-brand-purple/10 p-3">
                <FolderTree size={16} className="text-brand-purple" /><span className="font-semibold text-brand-purple">Ad Group: {g}</span>
              </div>
              <div className="pl-6 mt-2 flex flex-wrap gap-2">
                <span className="chip bg-brand-green/15 text-brand-green"><Layers size={12}/> keywords</span>
                <span className="chip bg-brand-orange/15 text-brand-orange"><FileText size={12}/> ad copy</span>
                <span className="chip bg-white/10 text-slate-300"><MousePointerClick size={12}/> landing page</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Frame>
  ),

  // CH6 — conversion tracking
  convTracking: () => (
    <Frame>
      <div className="text-center mb-6 text-sm uppercase tracking-widest text-slate-400">Conversion Tracking Flow</div>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <Step i={0} color="blue" icon={Target} title="Define" desc="Pick the action: purchase / lead / call." />
        <Arrow />
        <Step i={1} color="purple" icon={Tag} title="Tag" desc="Add Google tag or import from GA4." />
        <Arrow />
        <Step i={2} color="orange" icon={CheckCircle2} title="Fire" desc="Tag fires on the thank-you page." />
        <Arrow />
        <Step i={3} color="green" icon={BarChart3} title="Optimise" desc="Bid toward conversions, not clicks." />
      </div>
    </Frame>
  ),

  // CH7 — Meta Ads Manager
  metaManager: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">Meta Ads Manager structure</div>
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { t: 'Campaign', s: 'Objective (Sales, Leads…)', c: 'blue', icon: Megaphone },
          { t: 'Ad Set', s: 'Audience · Budget · Placement · Schedule', c: 'purple', icon: Users },
          { t: 'Ad', s: 'The creative — image/video + copy + CTA', c: 'green', icon: FileText },
        ].map((x, i) => (
          <motion.div key={x.t} variants={fadeUp} custom={i} className="rounded-2xl border p-4" style={{ borderColor: cssColor(x.c, 0.4), background: cssColor(x.c, 0.08) }}>
            <x.icon size={20} style={{ color: cssColor(x.c) }} />
            <div className="mt-2 font-bold" style={{ color: cssColor(x.c) }}>{x.t}</div>
            <div className="text-xs text-slate-400 mt-1">{x.s}</div>
          </motion.div>
        ))}
      </div>
    </Frame>
  ),

  // CH7 — audience circles
  metaAudiences: () => (
    <Frame>
      <div className="text-center mb-4 text-sm uppercase tracking-widest text-slate-400">Audience targeting — Core → Custom → Lookalike</div>
      <div className="relative mx-auto h-64 w-64">
        {[
          { r: 256, c: 'blue', label: 'Core', sub: 'interests & demographics', top: 8 },
          { r: 176, c: 'purple', label: 'Custom', sub: 'your own data', top: 48 },
          { r: 96, c: 'green', label: 'Lookalike', sub: 'similar new people', top: 88 },
        ].map((x, i) => (
          <motion.div
            key={x.label}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 120 }}
            className="absolute left-1/2 -translate-x-1/2 rounded-full border-2 grid place-items-start justify-center pt-3"
            style={{ width: x.r, height: x.r, top: x.top, borderColor: cssColor(x.c, 0.6), background: cssColor(x.c, 0.08) }}
          >
            <div className="text-center">
              <div className="font-bold text-sm" style={{ color: cssColor(x.c) }}>{x.label}</div>
              <div className="text-[10px] text-slate-400">{x.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-slate-400 mt-2">Core = broad interest targeting · Custom = people who know you · Lookalike = new people resembling your best customers.</p>
    </Frame>
  ),

  // CH7 — pixel flow
  pixelFlow: () => (
    <Frame>
      <div className="text-center mb-6 text-sm uppercase tracking-widest text-slate-400">How the Meta Pixel tracks</div>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <Step i={0} color="blue" icon={MousePointerClick} title="Visit" desc="User clicks your ad and lands on your site." />
        <Arrow />
        <Step i={1} color="purple" icon={Eye} title="Pixel fires" desc="Snippet records the action (view, add-to-cart, purchase)." />
        <Arrow />
        <Step i={2} color="orange" icon={Database} title="Reports back" desc="Action sent to Meta, tied to the ad." />
        <Arrow />
        <Step i={3} color="green" icon={Users} title="Powers" desc="Conversion tracking, retargeting & Lookalikes." />
      </div>
    </Frame>
  ),

  // CH7 / CH10 — A/B test
  abtest: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">A/B Testing</div>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {[
          { v: 'A', h: '"Buy Now"', cr: '2.1%', c: 'slate', win: false },
          { v: 'B', h: '"Get 30% Off Today"', cr: '3.4%', c: 'green', win: true },
        ].map((x, i) => (
          <motion.div key={x.v} variants={fadeUp} custom={i} className="rounded-2xl border p-4 text-center relative" style={{ borderColor: cssColor(x.c, 0.5), background: cssColor(x.c, 0.08) }}>
            {x.win && <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full bg-brand-green text-navy-900 font-bold">WINNER</span>}
            <div className="text-2xl font-extrabold" style={{ color: cssColor(x.c) }}>{x.v}</div>
            <div className="text-sm font-semibold text-slate-200 my-2">{x.h}</div>
            <div className="text-xs text-slate-400">Conv. rate</div>
            <div className="text-lg font-bold" style={{ color: cssColor(x.c) }}>{x.cr}</div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-slate-400 mt-3">Change one variable, split traffic, let data crown the winner.</p>
    </Frame>
  ),

  // CH9 — email flow
  emailFlow: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">Email types across the journey</div>
      <div className="grid sm:grid-cols-4 gap-2 text-xs">
        {[
          ['Welcome', 'Onboard & set expectations', 'blue'],
          ['Nurture', 'Educate, build trust', 'purple'],
          ['Promo / Cart', 'Offers & recovery', 'orange'],
          ['Retention', 'Win-back & loyalty', 'green'],
        ].map(([t, s, c], i) => (
          <motion.div key={t} variants={fadeUp} custom={i} className="rounded-xl border p-3" style={{ borderColor: cssColor(c, 0.4), background: cssColor(c, 0.08) }}>
            <Mail size={16} style={{ color: cssColor(c) }} />
            <div className="font-bold mt-1" style={{ color: cssColor(c) }}>{t}</div>
            <div className="text-slate-400 mt-0.5">{s}</div>
          </motion.div>
        ))}
      </div>
    </Frame>
  ),

  // CH10 — landing anatomy
  landingAnatomy: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">Anatomy of a high-converting landing page</div>
      <div className="grid sm:grid-cols-[1fr,240px] gap-5">
        <div className="rounded-2xl border border-white/10 bg-navy-950/60 p-4 space-y-3">
          {[
            ['Hero headline — the big promise', 'green', 'text-lg font-extrabold'],
            ['Sub-headline — how/why it works', 'slate', 'text-sm'],
            ['Primary CTA button', 'orange', 'font-bold text-center py-2'],
            ['Benefits (not just features)', 'blue', 'text-sm'],
            ['Trust signals — reviews / logos', 'purple', 'text-sm'],
            ['Repeat CTA', 'orange', 'font-bold text-center py-2'],
          ].map(([t, c, cls], i) => (
            <motion.div key={t} variants={fadeUp} custom={i} className={`rounded-lg border px-3 py-2 ${cls}`} style={{ borderColor: cssColor(c, 0.45), background: cssColor(c, 0.1), color: cssColor(c) }}>{t}</motion.div>
          ))}
        </div>
        <ul className="text-xs text-slate-400 space-y-2">
          <li>① One promise, instantly clear</li>
          <li>② One primary action, repeated</li>
          <li>③ Benefits over features</li>
          <li>④ Trust removes doubt</li>
          <li>⑤ No nav = no escape routes</li>
          <li>⑥ Fast & mobile-first</li>
        </ul>
      </div>
    </Frame>
  ),

  // CH11 — AIDA
  aida: () => (
    <Frame>
      <div className="text-center mb-6 text-sm uppercase tracking-widest text-slate-400">The AIDA Model</div>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <Step i={0} color="blue" icon={Eye} title="Attention" desc="Grab the eye — bold hook or visual." />
        <Arrow />
        <Step i={1} color="purple" icon={Zap} title="Interest" desc="Make it relevant — speak to their need." />
        <Arrow />
        <Step i={2} color="orange" icon={Trophy} title="Desire" desc="Build want — benefits & proof." />
        <Arrow />
        <Step i={3} color="green" icon={MousePointerClick} title="Action" desc="Clear CTA — tell them what to do." />
      </div>
    </Frame>
  ),

  // CH11 — cart recovery
  cartRecovery: () => (
    <Frame>
      <div className="text-center mb-6 text-sm uppercase tracking-widest text-slate-400">Cart Abandonment Recovery</div>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        <Step i={0} color="orange" icon={ShoppingCart} title="Abandon" desc="~70% leave before paying." />
        <Arrow />
        <Step i={1} color="blue" icon={Mail} title="Email / WhatsApp" desc="Nudge within an hour or two." />
        <Arrow />
        <Step i={2} color="purple" icon={Eye} title="Retarget ad" desc="Remind them across feeds." />
        <Arrow />
        <Step i={3} color="green" icon={CheckCircle2} title="Recover" desc="Offer + easy checkout closes it." />
      </div>
    </Frame>
  ),

  // CH12 — GA4 dashboard mockup
  ga4: () => (
    <Frame>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200"><BarChart3 size={18} className="text-brand-green" /> GA4 Dashboard</div>
        <span className="text-[10px] text-slate-500">Last 28 days</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ['Users', '12,480', '+8.4%', 'blue'], ['Sessions', '18,902', '+6.1%', 'purple'],
          ['Engagement', '61.2%', '+2.3%', 'green'], ['Conversions', '432', '+11%', 'orange'],
        ].map(([k, v, d, c], i) => (
          <motion.div key={k} variants={fadeUp} custom={i} className="rounded-xl border border-white/10 p-3">
            <div className="text-[11px] text-slate-400">{k}</div>
            <div className="text-lg font-extrabold text-white">{v}</div>
            <div className="text-[11px] font-semibold" style={{ color: cssColor(c) }}>{d}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-white/10 p-3">
        <div className="text-[11px] text-slate-400 mb-2">Users over time</div>
        <svg viewBox="0 0 300 70" className="w-full h-16">
          <polyline fill="none" stroke="#22c55e" strokeWidth="2"
            points="0,55 30,48 60,52 90,38 120,40 150,28 180,30 210,20 240,24 270,12 300,16" />
          <motion.polyline fill="rgba(34,197,94,0.12)" stroke="none"
            points="0,55 30,48 60,52 90,38 120,40 150,28 180,30 210,20 240,24 270,12 300,16 300,70 0,70" />
        </svg>
      </div>
    </Frame>
  ),

  // CH13 — tools map
  toolsMap: () => (
    <Frame>
      <div className="text-center mb-5 text-sm uppercase tracking-widest text-slate-400">The Tools Map — who does what</div>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        {[
          ['Measure', 'GA4, Search Console', 'green', BarChart3],
          ['Deploy trackers', 'Google Tag Manager', 'blue', Tag],
          ['Store people', 'CRM (HubSpot, Zoho)', 'purple', Database],
          ['Act / automate', 'Email & automation tools', 'orange', Zap],
          ['Advertise', 'Google Ads, Meta Ads Manager', 'blue', Target],
          ['Retarget', 'Pixels & ad-platform audiences', 'purple', Users],
        ].map(([job, tools, c, I], i) => (
          <motion.div key={job} variants={fadeUp} custom={i} className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: cssColor(c, 0.35), background: cssColor(c, 0.07) }}>
            <I size={18} style={{ color: cssColor(c) }} />
            <div>
              <div className="font-semibold" style={{ color: cssColor(c) }}>{job}</div>
              <div className="text-xs text-slate-400">{tools}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Frame>
  ),
}

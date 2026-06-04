// Campaign Simulator engine — realistic Indian-market benchmarks.

export const businesses = [
  { id: 'ecom', name: 'Ecommerce', emoji: '🛍️', cvr: 0.02, aov: 1200, benchCtrG: 3.0, benchCtrM: 1.2, desc: 'Online store · CVR 1–3% · AOV ~₹1,200' },
  { id: 'local', name: 'Local Service', emoji: '📍', cvr: 0.06, aov: 2500, benchCtrG: 4.0, benchCtrM: 1.3, desc: 'Salon, clinic, repair · high local intent' },
  { id: 'saas', name: 'SaaS', emoji: '💻', cvr: 0.04, aov: 6000, benchCtrG: 2.5, benchCtrM: 1.0, desc: 'Software subscription · trials → paid' },
  { id: 'd2c', name: 'D2C Brand', emoji: '🧴', cvr: 0.025, aov: 900, benchCtrG: 3.2, benchCtrM: 1.4, desc: 'Direct-to-consumer · brand + performance' },
]

export const goals = [
  { id: 'awareness', name: 'Brand Awareness', emoji: '📣', primary: 'impressions', cvrMult: 0.5, desc: 'Maximise reach & recall. Cheap impressions matter most.' },
  { id: 'leads', name: 'Lead Generation', emoji: '🎯', primary: 'conversions', cvrMult: 1.4, desc: 'Capture leads. CPA & conversion rate matter most.' },
  { id: 'sales', name: 'Direct Sales', emoji: '💰', primary: 'roas', cvrMult: 1.0, desc: 'Drive purchases. ROAS is the bottom line.' },
]

export const channels = [
  { id: 'google', name: 'Google Search', emoji: '🔍', cpc: 32, ctr: 3.2, cvrMult: 1.3, desc: 'High intent · CTR 2–5% · CPC ₹15–50' },
  { id: 'meta', name: 'Meta Ads', emoji: '📱', cpc: 14, ctr: 1.2, cvrMult: 0.9, desc: 'Broad reach · CTR 0.9–1.5% · CPC ₹5–25' },
  { id: 'both', name: 'Both', emoji: '🔀', cpc: 22, ctr: 2.1, cvrMult: 1.15, desc: 'Diversified — capture demand + create it' },
]

export const intents = [
  { id: 'awareness', name: 'Awareness', cvrMult: 0.6 },
  { id: 'consideration', name: 'Consideration', cvrMult: 1.0 },
  { id: 'purchase', name: 'Purchase Ready', cvrMult: 1.5 },
]

export const cityTiers = [
  { id: 'metro', name: 'Metro', reachMult: 1.0, cpcMult: 1.25 },
  { id: 'tier2', name: 'Tier 2', reachMult: 0.7, cpcMult: 0.95 },
  { id: 'tier3', name: 'Tier 3', reachMult: 0.45, cpcMult: 0.75 },
]

export const interestOptions = ['Fashion', 'Beauty', 'Tech', 'Fitness', 'Parenting', 'Finance', 'Travel', 'Food', 'Gaming', 'Home']

export const landingTypes = [
  { id: 'home', name: 'Homepage', cvrMult: 0.6, emoji: '🏠', desc: 'Generic, many distractions — weakest converter' },
  { id: 'dedicated', name: 'Dedicated Landing Page', cvrMult: 1.5, emoji: '🎯', desc: 'One goal, one CTA — best converter' },
  { id: 'product', name: 'Product Page', cvrMult: 1.1, emoji: '📦', desc: 'Focused on one product — solid for ecommerce' },
  { id: 'leadform', name: 'Lead Form', cvrMult: 1.3, emoji: '📝', desc: 'Frictionless capture — great for lead gen' },
]

// Compute a full result object from the campaign config.
export function simulate(cfg, optimizations = []) {
  const b = businesses.find((x) => x.id === cfg.business) || businesses[0]
  const g = goals.find((x) => x.id === cfg.goal) || goals[2]
  const ch = channels.find((x) => x.id === cfg.channel) || channels[0]
  const intent = intents.find((x) => x.id === cfg.intent) || intents[1]
  const tier = cityTiers.find((x) => x.id === cfg.tier) || cityTiers[0]
  const lp = landingTypes.find((x) => x.id === cfg.landing) || landingTypes[0]

  // optimisation multipliers
  const optCtr = 1 + (optimizations.includes('headline') ? 0.4 : 0) + (optimizations.includes('numbers') ? 0.2 : 0)
  const optCvr = 1 + (optimizations.includes('landing') ? 0.3 : 0) + (optimizations.includes('trust') ? 0.2 : 0)
  const optCpc = optimizations.includes('negatives') ? 0.85 : 1

  // Ad quality from creative (headline length sweet spot + cta + visual)
  const headLen = (cfg.headline || '').length
  const headlineQ = headLen >= 20 && headLen <= 50 ? 1 : 0.85
  const ctaQ = cfg.cta && cfg.cta !== 'Submit' ? 1 : 0.9
  const visualQ = cfg.visual === 'Video' ? 1.1 : cfg.visual === 'Carousel' ? 1.05 : 1
  const creativeMult = headlineQ * ctaQ * visualQ

  // audience tightness — too broad or too narrow penalised
  const ageSpan = (cfg.ageMax || 45) - (cfg.ageMin || 18)
  const ageQ = ageSpan <= 25 ? 1 : 0.9
  const interestQ = (cfg.interests?.length || 0) >= 1 && (cfg.interests?.length || 0) <= 4 ? 1 : 0.92

  const cpc = ch.cpc * tier.cpcMult * optCpc
  const budget = cfg.budget || 50000
  const clicks = Math.round((budget / cpc))
  const ctr = ch.ctr * creativeMult * optCtr
  const impressions = Math.round((clicks / (ctr / 100)))
  const reach = Math.round(impressions * 0.65 * tier.reachMult)

  const cvr = b.cvr * g.cvrMult * ch.cvrMult * intent.cvrMult * lp.cvrMult * optCvr * ageQ * interestQ
  const conversions = Math.max(0, Math.round(clicks * cvr))
  const cpa = conversions ? budget / conversions : 0
  const revenue = conversions * b.aov
  const roas = budget ? revenue / budget : 0

  // Quality score 0-100 — blend of relevance, creative, landing, audience, intent
  const quality = Math.round(
    Math.min(100,
      40 +
      (creativeMult - 0.85) * 60 +
      (lp.cvrMult / 1.5) * 18 +
      (intent.cvrMult / 1.5) * 12 +
      (ageQ * interestQ) * 10 +
      (optimizations.length * 3)
    )
  )

  const benchCtr = ch.id === 'meta' ? b.benchCtrM : ch.id === 'google' ? b.benchCtrG : (b.benchCtrG + b.benchCtrM) / 2
  const benchCvr = b.cvr * 100
  const benchRoas = 3.0

  return {
    impressions, reach, clicks, ctr, conversions, cpa, revenue, roas,
    quality: Math.max(20, quality),
    primary: g.primary,
    bench: { ctr: benchCtr, cvr: benchCvr, roas: benchRoas, cpa: cpa ? cpa * 0.8 : 0 },
    cvrPct: cvr * 100,
  }
}

// Generate optimisation suggestions based on weak spots vs benchmark.
export function getSuggestions(cfg, res) {
  const s = []
  if (res.ctr < res.bench.ctr) {
    s.push({
      id: 'headline',
      title: `CTR is ${res.ctr.toFixed(1)}% vs benchmark ${res.bench.ctr.toFixed(1)}%`,
      tips: ['Make the headline specific to a pain point', 'Lead with the outcome, not the product', 'Try a question-based headline'],
      boost: '+40% CTR',
    })
    s.push({ id: 'numbers', title: 'Add concrete numbers & proof', tips: ['“4.8★ from 12,000 reviews”', '“Results in 14 days”', 'Numbers earn trust and clicks'], boost: '+20% CTR' })
  }
  if (res.cvrPct < res.bench.cvr) {
    s.push({ id: 'landing', title: `Conversion rate ${res.cvrPct.toFixed(1)}% is below the ${res.bench.cvr.toFixed(1)}% benchmark`, tips: ['Use a dedicated landing page, not the homepage', 'One clear CTA, remove nav', 'Match the page to the ad’s promise'], boost: '+30% CVR' })
    s.push({ id: 'trust', title: 'Add trust signals to the page', tips: ['Reviews & ratings near the CTA', 'Money-back guarantee', 'Secure-payment badges'], boost: '+20% CVR' })
  }
  if (res.roas < res.bench.roas) {
    s.push({ id: 'negatives', title: `ROAS ${res.roas.toFixed(1)}x is below a healthy 3x`, tips: ['Add negative keywords to cut waste', 'Pause non-converting placements', 'Shift budget to top performers'], boost: '-15% CPC' })
  }
  if (s.length === 0) {
    s.push({ id: 'trust', title: 'Strong campaign! Squeeze more', tips: ['Test a second creative', 'Build a retargeting audience', 'Expand the winning audience'], boost: '+20% CVR' })
  }
  return s.slice(0, 5)
}

export function scoreCampaign(res) {
  let score = 0
  score += Math.min(30, (res.ctr / Math.max(res.bench.ctr, 0.1)) * 22)
  score += Math.min(30, (res.cvrPct / Math.max(res.bench.cvr, 0.1)) * 22)
  score += Math.min(30, (res.roas / 3) * 22)
  score += res.quality * 0.1
  return Math.max(10, Math.min(100, Math.round(score)))
}

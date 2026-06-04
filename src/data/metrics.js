// Key marketing metrics — used by the metrics table (Ch 12) and the floating calculator.

export const keyMetrics = [
  {
    key: 'CPC',
    name: 'Cost Per Click',
    formula: 'Total Spend ÷ Clicks',
    means: 'How much you pay each time someone clicks your ad.',
    benchmark: 'Google India ₹15–₹50 · Meta India ₹5–₹25',
    color: 'blue',
    example:
      'Socho ₹1,000 kharch kiye aur 50 logon ne click kiya → CPC = ₹20. Matlab har click ₹20 ka pada.',
    inputs: ['spend', 'clicks'],
    compute: ({ spend, clicks }) => (clicks ? spend / clicks : 0),
    unit: '₹',
  },
  {
    key: 'CPM',
    name: 'Cost Per Mille',
    formula: '(Spend ÷ Impressions) × 1000',
    means: 'Cost to show your ad 1,000 times (you pay for reach, not clicks).',
    benchmark: 'Meta India ₹40–₹120 per 1,000',
    color: 'purple',
    example:
      'Socho ₹500 mein ad 25,000 baar dikha → CPM = (500 ÷ 25000) × 1000 = ₹20. Har 1,000 views ke ₹20.',
    inputs: ['spend', 'impressions'],
    compute: ({ spend, impressions }) => (impressions ? (spend / impressions) * 1000 : 0),
    unit: '₹',
  },
  {
    key: 'CTR',
    name: 'Click-Through Rate',
    formula: '(Clicks ÷ Impressions) × 100',
    means: 'What % of people who saw the ad actually clicked — measures appeal.',
    benchmark: 'Google Search 2–5% · Meta 0.9–1.5%',
    color: 'green',
    example:
      'Socho ad 10,000 baar dikha, 200 ne click kiya → CTR = 2%. Achha hai! 100 mein se 2 ne click kiya.',
    inputs: ['clicks', 'impressions'],
    compute: ({ clicks, impressions }) => (impressions ? (clicks / impressions) * 100 : 0),
    unit: '%',
  },
  {
    key: 'CPA',
    name: 'Cost Per Acquisition',
    formula: 'Total Spend ÷ Conversions',
    means: 'How much you spend to get one conversion (lead or sale).',
    benchmark: 'Lead gen ₹100–₹600 · Ecom CPA varies by AOV',
    color: 'orange',
    example:
      'Socho ₹4,000 kharch kiye, 20 leads aaye → CPA = ₹200. Har lead ₹200 ka pada.',
    inputs: ['spend', 'conversions'],
    compute: ({ spend, conversions }) => (conversions ? spend / conversions : 0),
    unit: '₹',
  },
  {
    key: 'ROAS',
    name: 'Return On Ad Spend',
    formula: 'Revenue ÷ Ad Spend',
    means: 'Revenue earned per rupee of ad spend — the core profitability ratio.',
    benchmark: 'Healthy ecom 3x–5x+ (break-even depends on margin)',
    color: 'green',
    example:
      'Socho ₹10,000 ad pe lagaye, ₹40,000 ki sale hui → ROAS = 4x. Har ₹1 ne ₹4 wapas diye.',
    inputs: ['revenue', 'spend'],
    compute: ({ revenue, spend }) => (spend ? revenue / spend : 0),
    unit: 'x',
  },
  {
    key: 'CAC',
    name: 'Customer Acquisition Cost',
    formula: '(Sales + Marketing Spend) ÷ New Customers',
    means: 'Total cost to win one new paying customer.',
    benchmark: 'Must be well below LTV (aim LTV:CAC ≥ 3:1)',
    color: 'blue',
    example:
      'Socho ₹50,000 marketing pe lage, 100 naye customer mile → CAC = ₹500 per customer.',
    inputs: ['spend', 'customers'],
    compute: ({ spend, customers }) => (customers ? spend / customers : 0),
    unit: '₹',
  },
  {
    key: 'LTV',
    name: 'Lifetime Value',
    formula: 'Avg Order Value × Purchases/Yr × Years',
    means: 'Total revenue one customer brings over the whole relationship.',
    benchmark: 'Should be ≥ 3× your CAC',
    color: 'purple',
    example:
      'Socho ek customer ₹800 ka order, saal mein 4 baar, 3 saal tak → LTV = 800 × 4 × 3 = ₹9,600.',
    inputs: ['aov', 'frequency', 'years'],
    compute: ({ aov, frequency, years }) => aov * frequency * years,
    unit: '₹',
  },
  {
    key: 'ROI',
    name: 'Return On Investment',
    formula: '((Revenue − Cost) ÷ Cost) × 100',
    means: 'Percentage profit relative to what you invested.',
    benchmark: 'Positive & growing; compare across channels',
    color: 'orange',
    example:
      'Socho ₹10,000 lagaye aur ₹25,000 kamaye → ROI = ((25000−10000)/10000)×100 = 150%.',
    inputs: ['revenue', 'cost'],
    compute: ({ revenue, cost }) => (cost ? ((revenue - cost) / cost) * 100 : 0),
    unit: '%',
  },
]

// Input field labels for the calculator
export const inputLabels = {
  spend: 'Ad Spend (₹)',
  clicks: 'Clicks',
  impressions: 'Impressions',
  conversions: 'Conversions',
  revenue: 'Revenue (₹)',
  cost: 'Total Cost (₹)',
  customers: 'New Customers',
  aov: 'Avg Order Value (₹)',
  frequency: 'Purchases / Year',
  years: 'Customer Lifespan (Years)',
}

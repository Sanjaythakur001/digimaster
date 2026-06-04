// ============================================================================
//  The Neuro Map — every digital-marketing concept as an interconnected "cell".
//  Each NODE is a concept; each EDGE is a real cause-and-effect link with a
//  plain-English reason. The whole point: see how EVERYTHING connects.
// ============================================================================

// Domains (each its own neural colour)
export const domains = {
  core:       { label: 'Foundation',  color: '#a855f7' },
  audience:   { label: 'Audience',    color: '#8b5cf6' },
  seo:        { label: 'SEO',         color: '#22c55e' },
  paid:       { label: 'Paid Ads',    color: '#3b82f6' },
  social:     { label: 'Social',      color: '#ec4899' },
  content:    { label: 'Content',     color: '#f97316' },
  email:      { label: 'Email & CRM', color: '#06b6d4' },
  web:        { label: 'Web & UX',    color: '#6366f1' },
  conversion: { label: 'Conversion',  color: '#eab308' },
  funnel:     { label: 'Funnel',      color: '#14b8a6' },
  analytics:  { label: 'Analytics',   color: '#10b981' },
  metrics:    { label: 'Metrics',     color: '#f43f5e' },
  tools:      { label: 'Tools',       color: '#0ea5e9' },
}

// id, label, domain (d), size (1-3), icon, what (1 line), facts (chips), chapter slug
export const nodes = [
  { id: 'dm', label: 'Digital Marketing', d: 'core', size: 3, icon: 'Network', what: 'Promoting a brand through measurable online channels — the brain everything connects to.', facts: ['Measurable', 'Targeted', 'Scalable'], chapter: 'what-is-digital-marketing' },

  // Audience
  { id: 'audience', label: 'Target Audience', d: 'audience', size: 2, icon: 'Users', what: 'The specific group most likely to buy — defined by demographics, interests & behaviour.', facts: ['Demographics', 'Psychographics', 'Behaviour'], chapter: 'understanding-your-audience' },
  { id: 'persona', label: 'Buyer Persona', d: 'audience', size: 1, icon: 'UserCheck', what: 'A semi-fictional profile of your ideal customer that guides every message.', facts: ['Name + age', 'Goals', 'Frustrations'], chapter: 'understanding-your-audience' },
  { id: 'journey', label: 'Customer Journey', d: 'audience', size: 1, icon: 'Compass', what: 'The path a buyer takes: Awareness → Consideration → Decision.', facts: ['3 stages', 'Message per stage'], chapter: 'understanding-your-audience' },

  // SEO
  { id: 'seo', label: 'SEO', d: 'seo', size: 2, icon: 'Search', what: 'Earning free organic ranking on search engines — the long, compounding game.', facts: ['Free/organic', 'Crawl→Index→Rank', 'Compounds'], chapter: 'seo' },
  { id: 'onpage', label: 'On-Page SEO', d: 'seo', size: 1, icon: 'FileText', what: 'Optimising content & HTML on the page itself so Google understands it.', facts: ['Title & meta', 'Headings', 'Internal links'], chapter: 'seo' },
  { id: 'offpage', label: 'Off-Page SEO', d: 'seo', size: 1, icon: 'Share2', what: 'Authority earned elsewhere — chiefly through backlinks.', facts: ['Reputation', 'Mentions'], chapter: 'seo' },
  { id: 'backlinks', label: 'Backlinks', d: 'seo', size: 1, icon: 'Link2', what: 'Links from other sites — votes of trust that lift ranking.', facts: ['Quality > quantity', 'Trust signal'], chapter: 'seo' },
  { id: 'techseo', label: 'Technical SEO', d: 'seo', size: 1, icon: 'Wrench', what: 'Speed, crawlability, mobile, structured data — the plumbing of ranking.', facts: ['Sitemap', 'Mobile-first', 'Schema'], chapter: 'seo' },
  { id: 'localseo', label: 'Local SEO', d: 'seo', size: 1, icon: 'MapPin', what: 'Ranking for "near me" — Google Business Profile, reviews, NAP.', facts: ['Map pack', 'Reviews'], chapter: 'seo' },
  { id: 'keywords', label: 'Keywords', d: 'seo', size: 2, icon: 'KeyRound', what: 'The words people search — the shared language of SEO and Search Ads.', facts: ['Intent', 'Volume', 'Difficulty'], chapter: 'seo' },
  { id: 'serp', label: 'SERP Ranking', d: 'seo', size: 1, icon: 'Trophy', what: 'Your position on the search results page — the prize SEO competes for.', facts: ['Position #1 wins clicks'], chapter: 'seo' },

  // Paid
  { id: 'gads', label: 'Google Search Ads', d: 'paid', size: 2, icon: 'Target', what: 'Paid text ads that capture people actively searching with intent.', facts: ['Pay-per-click', 'High intent', 'CTR 2–5%'], chapter: 'google-ads' },
  { id: 'display', label: 'Display Ads', d: 'paid', size: 1, icon: 'Image', what: 'Banner ads across sites & apps — cheap reach for awareness & retargeting.', facts: ['Low CPM', 'Awareness'], chapter: 'google-ads' },
  { id: 'videoads', label: 'YouTube Ads', d: 'paid', size: 1, icon: 'Video', what: 'Video ads for storytelling, awareness and remarketing at scale.', facts: ['Pay-per-view', 'Story'], chapter: 'google-ads' },
  { id: 'shopping', label: 'Shopping Ads', d: 'paid', size: 1, icon: 'ShoppingBag', what: 'Product image + price ads pulled from a feed — the ecommerce default.', facts: ['Product feed', 'High intent'], chapter: 'google-ads' },
  { id: 'auction', label: 'Ad Auction', d: 'paid', size: 1, icon: 'Gauge', what: 'The real-time bidding that decides which ads show and in what order.', facts: ['Every search', 'Real-time'], chapter: 'google-ads' },
  { id: 'qs', label: 'Quality Score', d: 'paid', size: 2, icon: 'Star', what: "Google's 1–10 rating of relevance — higher score = cheaper, higher ads.", facts: ['Expected CTR', 'Ad relevance', 'Landing page'], chapter: 'google-ads' },
  { id: 'adrank', label: 'Ad Rank', d: 'paid', size: 1, icon: 'TrendingUp', what: 'Bid × Quality Score — decides your position. Relevance can beat budget.', facts: ['= Bid × QS'], chapter: 'google-ads' },
  { id: 'bidding', label: 'Bidding Strategy', d: 'paid', size: 1, icon: 'CircleDollarSign', what: 'How much you pay per click/conversion — manual or automated (tCPA, tROAS).', facts: ['Manual / Auto', 'Target CPA/ROAS'], chapter: 'google-ads' },
  { id: 'matchtypes', label: 'Match Types', d: 'paid', size: 1, icon: 'ListChecks', what: 'Broad / Phrase / Exact — how loosely a search matches your keyword.', facts: ['Broad', 'Phrase', 'Exact'], chapter: 'google-ads' },
  { id: 'negkw', label: 'Negative Keywords', d: 'paid', size: 1, icon: 'Crosshair', what: 'Terms you exclude so you never pay for irrelevant clicks.', facts: ['Cut waste', 'Lift relevance'], chapter: 'google-ads' },
  { id: 'campaign', label: 'Campaign Structure', d: 'paid', size: 1, icon: 'FolderTree', what: 'Campaign → Ad Group → Ad — tight theming that raises Quality Score.', facts: ['Tight themes'], chapter: 'google-ads' },
  { id: 'retarget', label: 'Retargeting', d: 'paid', size: 2, icon: 'Repeat', what: 'Ads shown to people who already visited — warm, cheaper conversions.', facts: ['Warm audience', 'Cheap CVR'], chapter: 'sales-funnel' },

  // Meta / paid-social
  { id: 'meta', label: 'Meta Ads', d: 'paid', size: 2, icon: 'Facebook', what: 'Interest & behaviour ads on Facebook/Instagram — creates demand.', facts: ['CTR 0.9–1.5%', 'Creative-led'], chapter: 'meta-ads' },
  { id: 'pixel', label: 'Meta Pixel', d: 'paid', size: 1, icon: 'Eye', what: 'A snippet that reports site actions back to Meta — the tracking engine.', facts: ['Tracks actions', 'Powers audiences'], chapter: 'meta-ads' },
  { id: 'lookalike', label: 'Lookalike Audience', d: 'paid', size: 1, icon: 'UserPlus', what: 'New people who resemble your best existing customers.', facts: ['Built from a source', 'Scale reach'], chapter: 'meta-ads' },
  { id: 'custom', label: 'Custom Audience', d: 'paid', size: 1, icon: 'UserCheck', what: 'People who already know you — visitors, customer lists, engagers.', facts: ['Your own data', 'Retarget base'], chapter: 'meta-ads' },

  // Social
  { id: 'smm', label: 'Social Media Marketing', d: 'social', size: 2, icon: 'Share2', what: 'Building brand & community across platforms — organic and paid together.', facts: ['Platforms', 'Community'], chapter: 'social-media-marketing' },
  { id: 'organic', label: 'Organic Social', d: 'social', size: 1, icon: 'Sparkles', what: 'Unpaid posting that builds trust and community over time.', facts: ['Free', 'Slow, compounds'], chapter: 'social-media-marketing' },
  { id: 'reels', label: 'Video & Reels', d: 'social', size: 1, icon: 'Video', what: 'Short vertical video — the highest-reach format today.', facts: ['Watch-time', 'Reach'], chapter: 'social-media-marketing' },
  { id: 'algorithm', label: 'Platform Algorithm', d: 'social', size: 1, icon: 'Brain', what: 'The system deciding reach — rewards early engagement & dwell-time.', facts: ['Predicts engagement', 'Rewards dwell'], chapter: 'social-media-marketing' },
  { id: 'influencer', label: 'Influencer Marketing', d: 'social', size: 2, icon: 'Megaphone', what: 'Paying creators for trusted reach — relevance beats follower count.', facts: ['Micro > celeb', 'Trust', 'Track w/ codes'], chapter: 'social-media-marketing' },

  // Content
  { id: 'content', label: 'Content Marketing', d: 'content', size: 2, icon: 'PenTool', what: 'Giving value first to earn attention & trust — fuel for every channel.', facts: ['Value first', 'Fuels SEO & email'], chapter: 'content-marketing' },
  { id: 'blog', label: 'Blog & Articles', d: 'content', size: 1, icon: 'FileText', what: 'SEO workhorses that answer search queries and earn organic traffic.', facts: ['Target keywords', 'Evergreen'], chapter: 'content-marketing' },
  { id: 'calendar', label: 'Content Calendar', d: 'content', size: 1, icon: 'CalendarDays', what: 'A plan of what to publish, where & when — keeps output consistent.', facts: ['Consistency', 'Tied to goals'], chapter: 'content-marketing' },

  // Email & CRM
  { id: 'email', label: 'Email Marketing', d: 'email', size: 2, icon: 'Mail', what: 'Your owned, highest-ROI channel — no algorithm between you and your list.', facts: ['Owned', '~₹40:₹1 ROI', 'Retention'], chapter: 'email-marketing' },
  { id: 'list', label: 'Email List', d: 'email', size: 1, icon: 'ClipboardList', what: 'Permission-based subscribers — built with lead magnets & opt-ins.', facts: ['Opt-in only', 'Segment early'], chapter: 'email-marketing' },
  { id: 'automation', label: 'Marketing Automation', d: 'email', size: 1, icon: 'Workflow', what: 'Behaviour-triggered workflows that scale personalisation without manual work.', facts: ['Triggers', 'Scales'], chapter: 'automation-tools' },

  // Web & UX
  { id: 'website', label: 'Website', d: 'web', size: 2, icon: 'Globe', what: 'Your always-on digital home — many pages, many goals.', facts: ['Many pages', 'Domain + hosting'], chapter: 'website-online-presence' },
  { id: 'landing', label: 'Landing Page', d: 'web', size: 2, icon: 'MousePointerClick', what: 'One page, one goal, one CTA — built purely to convert a campaign.', facts: ['No nav', 'One CTA', 'Message-match'], chapter: 'landing-pages-conversion' },
  { id: 'uiux', label: 'UI / UX Design', d: 'web', size: 2, icon: 'Smartphone', what: 'How clear, fast & intuitive the experience is — friction or flow.', facts: ['Clarity in 3s', 'Mobile-first'], chapter: 'website-online-presence' },
  { id: 'cta', label: 'Call To Action', d: 'web', size: 1, icon: 'MousePointer2', what: 'The button/prompt that tells visitors exactly what to do next.', facts: ['Action + benefit', 'High contrast'], chapter: 'landing-pages-conversion' },
  { id: 'speed', label: 'Page Speed', d: 'web', size: 1, icon: 'Zap', what: 'Load time & Core Web Vitals — every second lost drops conversions.', facts: ['LCP / INP / CLS', 'Mobile'], chapter: 'website-online-presence' },
  { id: 'trust', label: 'Trust Signals', d: 'web', size: 1, icon: 'ShieldCheck', what: 'Reviews, guarantees, badges — proof that removes buyer doubt.', facts: ['Reviews', 'Guarantee', 'Security'], chapter: 'landing-pages-conversion' },

  // Conversion
  { id: 'cro', label: 'Conversion Optimization', d: 'conversion', size: 2, icon: 'Percent', what: 'Systematically lifting the % of visitors who take the desired action.', facts: ['Test & iterate', 'Pure profit'], chapter: 'landing-pages-conversion' },
  { id: 'abtest', label: 'A/B Testing', d: 'conversion', size: 1, icon: 'SplitSquareHorizontal', what: 'Comparing two versions to let data crown the winner.', facts: ['One variable', 'Data decides'], chapter: 'landing-pages-conversion' },
  { id: 'forms', label: 'Forms & Lead Capture', d: 'conversion', size: 1, icon: 'ClipboardList', what: 'Where interest becomes a lead — fewer fields, more conversions.', facts: ['Minimise fields', 'Friction kills'], chapter: 'landing-pages-conversion' },
  { id: 'checkout', label: 'Checkout & Cart', d: 'conversion', size: 1, icon: 'ShoppingBag', what: 'The final step — friction here causes ~70% cart abandonment.', facts: ['Guest checkout', 'UPI/COD'], chapter: 'sales-funnel' },

  // Funnel
  { id: 'funnel', label: 'Sales Funnel', d: 'funnel', size: 2, icon: 'Filter', what: 'The model of how prospects narrow from awareness to purchase.', facts: ['Find the leaks', 'Stage = message'], chapter: 'sales-funnel' },
  { id: 'tofu', label: 'TOFU / MOFU / BOFU', d: 'funnel', size: 1, icon: 'Layers', what: 'Top / Middle / Bottom of funnel — awareness, consideration, decision.', facts: ['3 stages'], chapter: 'sales-funnel' },
  { id: 'aida', label: 'AIDA Model', d: 'funnel', size: 1, icon: 'Lightbulb', what: 'Attention → Interest → Desire → Action — the persuasion sequence.', facts: ['A·I·D·A'], chapter: 'sales-funnel' },
  { id: 'lead', label: 'Lead', d: 'funnel', size: 1, icon: 'User', what: 'A potential customer who shared contact info or showed intent.', facts: ['Nurture it', 'Score it'], chapter: 'sales-funnel' },

  // Analytics
  { id: 'ga4', label: 'Analytics (GA4)', d: 'analytics', size: 2, icon: 'BarChart3', what: 'Event-based measurement — the brain that turns guessing into deciding.', facts: ['Users/Sessions', 'Events', 'Key events'], chapter: 'analytics-metrics' },
  { id: 'utm', label: 'UTM Parameters', d: 'analytics', size: 1, icon: 'Tag', what: 'URL tags that attribute every visit to the exact campaign & source.', facts: ['source/medium', 'Attribution'], chapter: 'analytics-metrics' },
  { id: 'convtrack', label: 'Conversion Tracking', d: 'analytics', size: 1, icon: 'Crosshair', what: 'Recording the actions that matter so platforms can optimise toward them.', facts: ['Fires on success', 'Feeds bidding'], chapter: 'analytics-metrics' },

  // Metrics
  { id: 'roas', label: 'ROAS', d: 'metrics', size: 1, icon: 'TrendingUp', what: 'Revenue ÷ Ad Spend — the core profitability ratio for sales.', facts: ['= Rev ÷ Spend', 'Aim 3x+'], chapter: 'analytics-metrics' },
  { id: 'ctr', label: 'CTR', d: 'metrics', size: 1, icon: 'Percent', what: 'Clicks ÷ Impressions — how compelling your ad or listing is.', facts: ['= Clicks ÷ Impr', 'Feeds QS'], chapter: 'analytics-metrics' },
  { id: 'cpc', label: 'CPC', d: 'metrics', size: 1, icon: 'CircleDollarSign', what: 'Cost Per Click — what you pay each time someone clicks.', facts: ['Google ₹15–50', 'Meta ₹5–25'], chapter: 'analytics-metrics' },
  { id: 'cpa', label: 'CPA / CAC', d: 'metrics', size: 1, icon: 'Target', what: 'Cost to win one conversion / customer — must stay below LTV.', facts: ['= Spend ÷ Conv', 'Watch vs LTV'], chapter: 'analytics-metrics' },
  { id: 'ltv', label: 'LTV', d: 'metrics', size: 1, icon: 'Repeat', what: 'Lifetime Value — total revenue one customer brings over time.', facts: ['Aim ≥ 3× CAC', 'Retention lever'], chapter: 'analytics-metrics' },

  // Tools
  { id: 'crm', label: 'CRM', d: 'tools', size: 1, icon: 'Database', what: 'Stores every contact & interaction — the backbone of personalisation.', facts: ['Single source', 'Sales+marketing'], chapter: 'automation-tools' },
  { id: 'gtm', label: 'Tag Manager', d: 'tools', size: 1, icon: 'Tag', what: 'One container to deploy all tracking tags without touching code.', facts: ['Deploy tags', 'No dev needed'], chapter: 'automation-tools' },
  { id: 'gsc', label: 'Search Console', d: 'tools', size: 1, icon: 'LineChart', what: "Free tool showing your Google queries, clicks & indexing health.", facts: ['Queries', 'Indexing'], chapter: 'seo' },
]

// [a, b, reason]  — undirected links with a plain-English "why they connect"
export const edges = [
  // Hub
  ['dm', 'seo', 'SEO is a core channel of digital marketing — free, compounding traffic.'],
  ['dm', 'gads', 'Paid search is how DM captures people actively searching with intent.'],
  ['dm', 'meta', 'Paid social lets DM create demand among people not yet searching.'],
  ['dm', 'smm', 'Social media is where DM builds brand and community.'],
  ['dm', 'content', 'Content is the fuel DM burns across every other channel.'],
  ['dm', 'email', 'Email is the owned channel DM uses to nurture and retain.'],
  ['dm', 'ga4', 'Analytics is the brain DM uses to measure and decide.'],
  ['dm', 'website', 'The website is the home base every DM channel points to.'],
  ['dm', 'funnel', 'The funnel is the model DM uses to move strangers to customers.'],
  ['dm', 'audience', 'Knowing the audience is where all DM strategy begins.'],

  // Audience web
  ['audience', 'persona', 'A persona turns the abstract audience into a relatable human.'],
  ['audience', 'journey', 'Mapping the audience reveals the journey they take to buy.'],
  ['journey', 'funnel', 'The customer journey is the funnel seen from the buyer’s side.'],
  ['audience', 'gads', 'Audience definition decides which keywords & intents to bid on.'],
  ['audience', 'meta', 'Meta targeting is built directly from your audience definition.'],
  ['audience', 'content', 'Content only resonates when written for a specific audience.'],
  ['persona', 'content', 'Personas dictate the tone, topics and channels content uses.'],

  // SEO cluster
  ['seo', 'onpage', 'On-page optimisation is a pillar of SEO you fully control.'],
  ['seo', 'offpage', 'Off-page authority (links) is the second pillar of SEO.'],
  ['seo', 'techseo', 'Technical health lets crawlers index — no tech SEO, no ranking.'],
  ['seo', 'localseo', 'Local SEO is SEO applied to "near me" and map results.'],
  ['offpage', 'backlinks', 'Backlinks are the main currency of off-page authority.'],
  ['onpage', 'keywords', 'On-page SEO places target keywords in titles, headings & copy.'],
  ['seo', 'serp', 'All SEO effort aims at one prize: a higher SERP position.'],
  ['backlinks', 'serp', 'Quality backlinks are among the strongest ranking signals.'],
  ['techseo', 'speed', 'Page speed & Core Web Vitals are core technical-SEO signals.'],
  ['seo', 'content', 'Content gives Google fresh, relevant pages to rank — no content, no SEO.'],
  ['gsc', 'seo', 'Search Console is the free dashboard you monitor SEO with.'],
  ['gsc', 'keywords', 'Search Console reveals the real queries you already rank for.'],

  // Keywords bridge SEO <-> Paid
  ['keywords', 'gads', 'The same keyword intent powers both organic SEO and paid Search Ads.'],
  ['keywords', 'matchtypes', 'Match types control how loosely searches map to your keywords.'],
  ['keywords', 'negkw', 'Negative keywords prune the searches you never want to pay for.'],

  // Paid cluster
  ['gads', 'auction', 'Every Google search triggers a real-time ad auction.'],
  ['auction', 'adrank', 'The auction ranks ads by Ad Rank to decide position.'],
  ['adrank', 'qs', 'Ad Rank = Bid × Quality Score, so relevance can beat a bigger bid.'],
  ['qs', 'ctr', 'Expected CTR is one of the three ingredients of Quality Score.'],
  ['qs', 'landing', 'Landing-page experience is one-third of Quality Score.'],
  ['gads', 'bidding', 'Bidding strategy sets how much you pay per click or conversion.'],
  ['gads', 'campaign', 'Tight campaign structure keeps ads relevant and Quality Score high.'],
  ['campaign', 'matchtypes', 'Ad groups organise keywords by match type and theme.'],
  ['gads', 'display', 'Display is Google’s awareness/retargeting network beyond search.'],
  ['gads', 'videoads', 'YouTube ads extend Google campaigns into video.'],
  ['gads', 'shopping', 'Shopping ads turn a product feed into visual search ads.'],
  ['display', 'retarget', 'Display is the classic canvas for retargeting banners.'],
  ['negkw', 'cpc', 'Cutting irrelevant clicks with negatives lowers wasted CPC.'],

  // Meta cluster
  ['meta', 'smm', 'Meta Ads are the paid layer on top of organic social.'],
  ['meta', 'pixel', 'The Pixel is what makes Meta optimisation & tracking possible.'],
  ['meta', 'campaign', 'Meta uses Campaign → Ad Set → Ad, mirroring paid structure.'],
  ['pixel', 'custom', 'The Pixel builds Custom Audiences from your site visitors.'],
  ['custom', 'lookalike', 'Lookalikes are generated from a Custom Audience seed.'],
  ['pixel', 'retarget', 'The Pixel’s visitor data powers Meta retargeting.'],
  ['pixel', 'convtrack', 'The Pixel reports conversions back for tracking & optimisation.'],
  ['meta', 'lookalike', 'Lookalikes let Meta scale to new people like your buyers.'],

  // Social cluster
  ['smm', 'organic', 'Organic posting is the unpaid half of social media marketing.'],
  ['smm', 'reels', 'Short video/Reels is today’s highest-reach social format.'],
  ['smm', 'algorithm', 'The platform algorithm decides how far your social content travels.'],
  ['reels', 'algorithm', 'Algorithms reward Reels watch-time, saves and shares.'],
  ['smm', 'influencer', 'Influencers extend social reach with borrowed trust.'],

  // Influencer cross-links (the "back-connected" magic)
  ['influencer', 'gads', 'Influencer buzz sparks branded searches — branded Search Ads then capture that warm demand cheaply.'],
  ['influencer', 'trust', 'A creator’s endorsement is social proof that boosts on-site conversion.'],
  ['influencer', 'content', 'Influencer posts are content you can repurpose across channels.'],
  ['influencer', 'retarget', 'People who engage with influencer posts become a warm retargeting pool.'],

  // Content cluster
  ['content', 'blog', 'Blogs are the SEO workhorse of content marketing.'],
  ['content', 'calendar', 'A calendar keeps content consistent and tied to goals.'],
  ['blog', 'seo', 'Each article targets keywords and earns organic ranking.'],
  ['content', 'email', 'Great content gives your emails something valuable to send.'],
  ['content', 'smm', 'Content is what you actually post on social.'],
  ['content', 'funnel', 'Content is matched to each funnel stage (educate → prove).'],

  // Email & CRM cluster
  ['email', 'list', 'Email marketing is only as strong as the list behind it.'],
  ['email', 'automation', 'Automation sends the right email at the right trigger, at scale.'],
  ['email', 'checkout', 'Cart-recovery emails win back abandoned checkouts.'],
  ['email', 'ltv', 'Retention emails increase repeat purchases and lift LTV.'],
  ['email', 'funnel', 'Email nurtures prospects through every funnel stage.'],
  ['list', 'forms', 'Forms & lead magnets are how the email list grows.'],
  ['automation', 'crm', 'Automation runs on the contact data stored in the CRM.'],
  ['crm', 'lead', 'The CRM stores and tracks every lead’s status & history.'],
  ['crm', 'retarget', 'CRM lists sync to ad platforms to retarget or exclude customers.'],

  // Web & UX cluster
  ['website', 'landing', 'A landing page is a focused single-goal page within your web presence.'],
  ['website', 'uiux', 'UI/UX quality defines how usable the whole website feels.'],
  ['uiux', 'cro', 'Clean, intuitive UI removes friction so more visitors convert.'],
  ['uiux', 'speed', 'Fast, smooth interfaces are a core part of good UX.'],
  ['uiux', 'trust', 'Polished design itself signals credibility and builds trust.'],
  ['landing', 'cta', 'A landing page lives or dies by its single, clear CTA.'],
  ['landing', 'trust', 'Trust signals near the CTA remove the doubt that blocks conversion.'],
  ['landing', 'cro', 'The landing page is the main battleground for conversion optimisation.'],
  ['landing', 'gads', 'Search clicks must hit a relevant landing page to convert & lift QS.'],
  ['landing', 'meta', 'Meta clicks are lower-intent, so the landing page must restate the promise fast.'],
  ['speed', 'cro', 'Faster pages convert better — speed is a conversion lever.'],
  ['speed', 'seo', 'Page speed is a direct Google ranking & page-experience signal.'],

  // Conversion cluster
  ['cro', 'abtest', 'A/B testing is the primary engine of conversion optimisation.'],
  ['cro', 'forms', 'Shorter, smarter forms are a top CRO lever for lead gen.'],
  ['cro', 'checkout', 'Reducing checkout friction is the highest-impact ecommerce CRO.'],
  ['cta', 'cro', 'CTA wording, colour & placement are classic A/B-tested CRO factors.'],
  ['forms', 'lead', 'A completed form is the moment a visitor becomes a lead.'],
  ['checkout', 'retarget', 'Abandoned-cart users are retargeted to recover the sale.'],
  ['abtest', 'ctr', 'Ad A/B tests are judged largely on which version wins CTR.'],

  // Funnel cluster
  ['funnel', 'tofu', 'TOFU/MOFU/BOFU are the named stages of the funnel.'],
  ['funnel', 'aida', 'AIDA is the psychology that moves a person down the funnel.'],
  ['aida', 'cta', 'AIDA’s final "Action" step is triggered by a strong CTA.'],
  ['funnel', 'retarget', 'Retargeting recovers the warm prospects who leak from the funnel.'],
  ['funnel', 'lead', 'Mid-funnel, an interested prospect converts into a lead.'],
  ['tofu', 'content', 'Top-of-funnel relies on educational content to create awareness.'],

  // Analytics cluster
  ['ga4', 'utm', 'UTMs feed GA4 the source/campaign labels it needs to attribute traffic.'],
  ['ga4', 'convtrack', 'Conversion tracking flags the GA4 events that actually matter.'],
  ['ga4', 'cro', 'Analytics reveals where visitors leak — the input to CRO.'],
  ['ga4', 'roas', 'GA4 + revenue data is how ROAS is measured and reported.'],
  ['utm', 'email', 'UTM-tagged links let you measure which emails drove traffic.'],
  ['utm', 'smm', 'UTMs attribute social clicks to the exact post or campaign.'],
  ['convtrack', 'gads', 'Conversion data lets Google bid toward sales, not just clicks.'],
  ['convtrack', 'bidding', 'Smart bidding (tCPA/tROAS) is impossible without conversion tracking.'],
  ['gtm', 'pixel', 'Tag Manager deploys the Meta Pixel without editing code.'],
  ['gtm', 'ga4', 'Tag Manager fires GA4 and other tags from one container.'],
  ['gtm', 'convtrack', 'Conversion tags are usually deployed through Tag Manager.'],

  // Metrics cluster
  ['ctr', 'gads', 'CTR shows how compelling your Search ad is.'],
  ['ctr', 'meta', 'CTR gauges whether your Meta creative earns the click.'],
  ['cpc', 'gads', 'CPC is the price you pay per Search-ad click.'],
  ['cpc', 'bidding', 'Your bidding strategy directly shapes the CPC you pay.'],
  ['roas', 'meta', 'ROAS is the bottom-line metric for Meta sales campaigns.'],
  ['cpa', 'lead', 'CPA measures the cost to generate each lead.'],
  ['cpa', 'ltv', 'CPA/CAC only makes sense compared against LTV (aim LTV ≥ 3× CAC).'],
  ['roas', 'cpa', 'ROAS and CPA are read together to judge profitability.'],
]

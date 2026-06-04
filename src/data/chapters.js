// ============================================================================
//  DigiMaster — Theory Library content (14 chapters)
//  Section schema consumed by <ChapterRenderer/>:
//    { t:'h',   text }                          subheading
//    { t:'p',   text }                          paragraph (terms auto-linked)
//    { t:'layer1', body }                       Industry Standard Explanation
//    { t:'layer2', brand, body }                Industry Example (real brand)
//    { t:'layer3', emoji, body }                Hinglish relatable analogy
//    { t:'list', items:[] | ordered }           bullet / numbered list
//    { t:'table', head:[], rows:[[]] }          comparison table
//    { t:'cards', items:[{title,body,color}] }  grid of mini cards
//    { t:'callout', tone:'tip'|'warn', text }   inline callout
//    { t:'diagram', name }                      named CSS/SVG diagram
//    { t:'component', name }                    named interactive widget
// ============================================================================

export const chapters = [
  // ───────────────────────────── CHAPTER 1 ─────────────────────────────
  {
    id: 'ch1',
    num: 1,
    title: 'What is Digital Marketing',
    slug: 'what-is-digital-marketing',
    icon: 'Rocket',
    color: 'blue',
    est: 7,
    summary: 'The big picture — what digital marketing is, why it exists, and the channels that make it up.',
    sections: [
      { t: 'h', text: 'The core idea' },
      {
        t: 'layer1',
        body: 'Digital marketing is the practice of promoting products, services or brands through digital channels — search engines, websites, social media, email, mobile apps and paid ads — to reach the right people, drive measurable actions, and grow revenue. Unlike traditional marketing, every rupee can be tracked: you know exactly who saw the ad, who clicked, and who bought. It blends creativity (the message) with data (the targeting and measurement), and its defining advantage is **measurability** — you can attribute outcomes to spend and optimise in real time.',
      },
      {
        t: 'layer2',
        brand: 'Nike',
        body: 'When Nike launches a new running shoe, it does not just buy a TV slot and hope. It runs Instagram and YouTube video ads to build awareness, retargets people who viewed the product page with carousel ads, captures emails with a "early access" landing page, and sends a launch-day email sequence. Every channel has a job, and Nike measures cost-per-purchase across all of them — shifting budget to whatever performs.',
      },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho purane zamane mein ek dukaandaar gali mein khada chillata tha — "Aalu le lo, pyaaz le lo!" Sabko sunai deta, par usse kya pata kaun sun raha hai, kaun khareedega. Yeh hai traditional marketing — shout karo aur ummeed karo. Ab socho wahi dukaandaar ke paas ek magic register hai jo batata hai — "Yeh aadmi 3 baar aalu ke paas rukha, isko aalu ka offer bhejo." Yahi hai digital marketing, bhai — sirf shout nahi, balki kis-ne-suna, kis-ne-dekha, kisne-khareeda sab track hota hai.',
      },

      { t: 'h', text: 'Traditional vs Digital' },
      {
        t: 'table',
        head: ['Aspect', 'Traditional', 'Digital'],
        rows: [
          ['Channels', 'TV, radio, print, billboards', 'Search, social, email, web, apps'],
          ['Targeting', 'Broad — everyone sees it', 'Precise — age, interest, intent, location'],
          ['Measurement', 'Hard to attribute', 'Every click & sale tracked'],
          ['Cost to start', 'High (₹ lakhs+)', 'Low — start with ₹500'],
          ['Speed to change', 'Slow (reprint/reshoot)', 'Instant — edit a live ad'],
          ['Two-way?', 'One-way broadcast', 'Interactive — comments, DMs, reviews'],
        ],
      },

      { t: 'h', text: 'The digital marketing ecosystem' },
      { t: 'p', text: 'No single channel works alone. They form an ecosystem where each feeds the next — content fuels SEO, SEO and ads drive traffic, landing pages convert it, analytics measures it, and email retains it.' },
      { t: 'diagram', name: 'ecosystem' },

      { t: 'h', text: 'Why digital marketing exists — the business need' },
      {
        t: 'list',
        items: [
          'Buyers research online before purchasing — if you are not visible there, you are invisible.',
          'It is measurable, so finance teams can see exactly what each rupee returns (ROI/ROAS).',
          'It is scalable — a winning ₹1,000/day campaign can become ₹1,00,000/day with the same structure.',
          'It levels the field — a small D2C brand can outrank a giant with smarter content and targeting.',
        ],
      },

      { t: 'h', text: 'The channels at a glance' },
      {
        t: 'cards',
        items: [
          { title: 'SEO', body: 'Earn free ranking on Google over time.', color: 'green' },
          { title: 'Paid Search (Google Ads)', body: 'Pay to appear when people search with intent.', color: 'blue' },
          { title: 'Social Media', body: 'Build brand & community on Instagram, LinkedIn, YouTube.', color: 'purple' },
          { title: 'Paid Social (Meta Ads)', body: 'Targeted ads on Facebook & Instagram.', color: 'blue' },
          { title: 'Content Marketing', body: 'Blogs, videos, guides that attract and educate.', color: 'orange' },
          { title: 'Email Marketing', body: 'Direct, owned channel for nurture & retention.', color: 'green' },
          { title: 'Affiliate & Influencer', body: 'Pay partners/creators for reach & sales.', color: 'purple' },
          { title: 'Analytics', body: 'The brain — measures & guides every decision.', color: 'orange' },
        ],
      },
    ],
    keyTakeaway:
      'Digital marketing = promoting a brand through trackable online channels. Its superpower is measurability: you target precisely, measure exactly, and optimise continuously. The channels form one connected ecosystem, not a list of separate tactics.',
    interview: [
      { q: 'What is digital marketing in one line?', includes: ['Promoting via digital channels', 'measurable & targeted', 'drives actions/revenue', 'real-time optimisation'] },
      { q: 'How is digital different from traditional marketing?', includes: ['Precise targeting vs broad', 'measurable attribution', 'lower entry cost', 'two-way / interactive', 'instant to change'] },
      { q: 'Why do businesses invest in digital marketing?', includes: ['Buyers research online', 'measurable ROI', 'scalable', 'levels the playing field'] },
    ],
    connected: ['ch4', 'ch6', 'ch12'],
    flashcards: [
      { q: 'The #1 advantage of digital over traditional marketing?', a: 'Measurability — every impression, click and sale can be tracked and attributed.' },
      { q: 'Name 4 core digital channels.', a: 'SEO, Paid Search, Social Media, Email (also: content, paid social, affiliate).' },
      { q: 'What does “the ecosystem” mean?', a: 'Channels feed each other: content → SEO → traffic → landing page → conversion → email retention, all measured by analytics.' },
    ],
    flipTerms: [
      { front: 'Channel', back: 'A medium used to reach an audience (search, social, email, etc.).' },
      { front: 'Attribution', back: 'Crediting a conversion to the touchpoints that caused it.' },
      { front: 'ROI', back: '(Profit ÷ Cost) × 100 — the percentage return on what you invested.' },
    ],
  },

  // ───────────────────────────── CHAPTER 2 ─────────────────────────────
  {
    id: 'ch2',
    num: 2,
    title: 'Understanding Your Audience',
    slug: 'understanding-your-audience',
    icon: 'Users',
    color: 'purple',
    est: 8,
    summary: 'Who you sell to decides everything. Target audiences, buyer personas, the customer journey and research.',
    sections: [
      { t: 'h', text: 'Target audience' },
      {
        t: 'layer1',
        body: 'A **target audience** is the specific group of people most likely to want your product, defined by demographics (age, gender, income, location), psychographics (interests, values, lifestyle) and behaviour (what they buy, how they research). Marketing to "everyone" wastes budget; defining a tight audience lets you craft messages that resonate and target ads efficiently. The audience drives channel choice, tone, offer and creative.',
      },
      {
        t: 'layer2',
        brand: 'boAt',
        body: 'boAt did not target "people who listen to music." They targeted 18–28 year-old urban Indians who want stylish, affordable audio and follow cricket & Bollywood. That sharp definition shaped everything: punchy Instagram creatives, celebrity "boAthead" influencers, and pricing that undercut premium brands — turning a new entrant into a market leader.',
      },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho tum shaadi mein khaana bana rahe ho. Agar tu kahe "sabke liye ek hi sabzi bana deta hoon" — to bachhe bhi naraz, buzurg bhi, Jain mehmaan bhi. Par agar tu pehle pata kare — kitne bachhe hain, kaun spicy khaata hai, kaun Jain hai — phir har plate hit hogi. Target audience samajhna yahi hai: pehle jaano kaun aa raha hai, phir thali banao.',
      },

      { t: 'h', text: 'Buyer persona — build one now' },
      { t: 'p', text: 'A **Buyer Persona** is a semi-fictional profile of your ideal customer — given a name, age, goals and frustrations — so the whole team markets to a real human, not a spreadsheet. Try the interactive builder below.' },
      { t: 'component', name: 'personaBuilder' },

      { t: 'h', text: 'The customer journey' },
      { t: 'p', text: 'Customers rarely buy on first contact. They move through stages — and your job is to meet them with the right message at each.' },
      {
        t: 'cards',
        items: [
          { title: '1 · Awareness', body: 'They realise they have a problem/need. You show up with helpful content & broad ads.', color: 'blue' },
          { title: '2 · Consideration', body: 'They compare options. You provide reviews, comparisons, demos, retargeting.', color: 'orange' },
          { title: '3 · Decision', body: 'They are ready to buy. You remove friction: clear CTA, offer, trust signals.', color: 'green' },
        ],
      },

      { t: 'h', text: 'Market research basics' },
      {
        t: 'list',
        items: [
          'Talk to real customers — interviews and surveys reveal the words they use.',
          'Study competitors — their reviews show unmet needs you can win on.',
          'Use search data — Google "people also ask", autocomplete and keyword tools reveal demand.',
          'Read your own analytics — which pages and products attract which people.',
        ],
      },
    ],
    keyTakeaway:
      'You cannot market well to "everyone". Define a tight target audience, give it a human face with buyer personas, and map the customer journey (Awareness → Consideration → Decision) so you deliver the right message at the right stage.',
    interview: [
      { q: 'What is a buyer persona and why use one?', includes: ['Semi-fictional ideal customer', 'demographics + goals + pain points', 'aligns team & messaging', 'guides targeting/creative'] },
      { q: 'Walk me through the customer journey.', includes: ['Awareness', 'Consideration', 'Decision', 'different message per stage'] },
      { q: 'How would you research a new audience?', includes: ['Customer interviews/surveys', 'competitor reviews', 'keyword/search data', 'own analytics'] },
    ],
    connected: ['ch5', 'ch11', 'ch7'],
    flashcards: [
      { q: 'Three pillars that define a target audience?', a: 'Demographics, psychographics, and behaviour.' },
      { q: 'The three customer-journey stages?', a: 'Awareness → Consideration → Decision.' },
      { q: 'Why personify your audience as a persona?', a: 'So the team markets to a relatable human with real goals and frustrations, sharpening message and targeting.' },
    ],
    flipTerms: [
      { front: 'Psychographics', back: 'Interests, values, attitudes and lifestyle of an audience.' },
      { front: 'Persona', back: 'A named, semi-fictional profile of your ideal customer.' },
      { front: 'Consideration', back: 'The journey stage where buyers compare and evaluate options.' },
    ],
  },

  // ───────────────────────────── CHAPTER 3 ─────────────────────────────
  {
    id: 'ch3',
    num: 3,
    title: 'Website & Online Presence',
    slug: 'website-online-presence',
    icon: 'Globe',
    color: 'blue',
    est: 8,
    summary: 'Your digital home base — websites vs landing pages, hosting, UX fundamentals, and page speed.',
    sections: [
      { t: 'h', text: 'Website vs Landing Page vs Microsite' },
      {
        t: 'layer1',
        body: 'A **website** is your full digital home — many pages (home, about, products, blog, contact) serving many goals. A **landing page** is a single focused page built for one campaign with one **CTA** and no distractions (no nav menu) — designed purely to convert. A **microsite** is a small standalone site (a handful of pages) dedicated to one campaign, product launch or theme, often on its own URL.',
      },
      {
        t: 'cards',
        items: [
          { title: 'Website', body: 'Many pages, many goals, full navigation. Your always-on home.', color: 'blue' },
          { title: 'Landing Page', body: 'One page, one goal, one CTA. Built to convert a campaign.', color: 'green' },
          { title: 'Microsite', body: 'A few pages on a dedicated URL for one campaign/launch.', color: 'purple' },
        ],
      },
      {
        t: 'layer2',
        brand: 'CRED',
        body: 'CRED’s main website explains the whole product. But during their IPL campaign they spun up dedicated landing pages — one headline, one offer, one "Download" button — so the millions arriving from a single ad were not distracted by menus. The campaign traffic hit a page engineered for exactly one action.',
      },
      {
        t: 'layer3',
        emoji: '💡',
        body: 'Socho website ek bada mall hai — kapde, khaana, cinema, sab kuch, ghoomte raho. Landing page ek single kiosk hai mall ke gate pe jisme sirf ek hi cheez bikti hai aur uska bada sa board laga hai "Yeh lo, ₹499". Mall ghumane ke liye hai; kiosk bechne ke liye. Campaign ka traffic kiosk pe bhejo, mall mein nahi — warna banda ghoomta reh jaayega aur kharidega kuch nahi.',
      },

      { t: 'h', text: 'Domain & hosting, simply' },
      {
        t: 'list',
        items: [
          'Domain = your address (glowup.in). You rent it yearly from a registrar (GoDaddy, Namecheap).',
          'Hosting = the land/server where your site’s files actually live (Hostinger, AWS, Vercel).',
          'DNS = the phonebook that connects your domain name to your hosting server’s IP.',
          'SSL (https) = the padlock; encrypts data and is required for trust and SEO.',
        ],
      },

      { t: 'h', text: 'What makes a good website — UX basics' },
      {
        t: 'list',
        items: [
          'Clarity in 3 seconds — a visitor instantly understands what you offer and what to do.',
          'A strong Hero Section above the fold with a headline + CTA.',
          'Fast, mobile-first, and easy to navigate.',
          'Trust signals — reviews, logos, secure checkout, clear contact.',
          'One primary CTA per page — do not split attention.',
        ],
      },
      { t: 'callout', tone: 'tip', text: 'Above the Fold = what users see before scrolling. Put your value proposition and main CTA here — most visitors decide whether to stay in seconds.' },

      { t: 'h', text: 'Page Speed & Core Web Vitals' },
      { t: 'p', text: 'Speed is money: every extra second of load time drops conversions. Google measures page experience through **Core Web Vitals**.' },
      { t: 'diagram', name: 'webVitals' },
    ],
    keyTakeaway:
      'A website serves many goals; a landing page serves exactly one. Buy a domain, put it on hosting, secure it with SSL. Good UX = clarity in 3 seconds, a strong hero + single CTA, mobile-first, trust signals, and fast load times (Core Web Vitals).',
    interview: [
      { q: 'Difference between a website and a landing page?', includes: ['Website = many pages/goals + nav', 'landing page = one goal/one CTA, no nav', 'landing page built to convert campaigns'] },
      { q: 'What are Core Web Vitals?', includes: ['LCP (loading)', 'INP (interactivity)', 'CLS (visual stability)', 'Google page-experience signals'] },
      { q: 'What makes a high-quality website?', includes: ['Clarity in 3s', 'strong hero + CTA above the fold', 'mobile-first & fast', 'trust signals'] },
    ],
    connected: ['ch4', 'ch10', 'ch6'],
    flashcards: [
      { q: 'Landing page vs website in one line?', a: 'Landing page = one focused goal/CTA, no nav; website = many pages and goals.' },
      { q: 'What does SSL/https give you?', a: 'Encryption, the trust padlock, and an SEO ranking signal.' },
      { q: 'Name the three Core Web Vitals.', a: 'LCP (loading speed), INP (interactivity), CLS (visual stability).' },
    ],
    flipTerms: [
      { front: 'Above the Fold', back: 'The visible area of a page before any scrolling.' },
      { front: 'Hero Section', back: 'The top banner with the main headline, visual and CTA.' },
      { front: 'LCP', back: 'Largest Contentful Paint — time for the main content to load.' },
    ],
  },

  // ───────────────────────────── CHAPTER 4 ─────────────────────────────
  {
    id: 'ch4',
    num: 4,
    title: 'Search Engine Optimization (SEO)',
    slug: 'seo',
    icon: 'Search',
    color: 'green',
    est: 12,
    summary: 'How Google works and how to earn free ranking — on-page, off-page, technical and local SEO.',
    sections: [
      { t: 'h', text: 'How search engines work' },
      {
        t: 'layer1',
        body: '**SEO** is the practice of improving a website to earn higher organic (unpaid) rankings on search engines. Search engines work in three steps: **crawling** (bots follow links to discover pages), **indexing** (storing and understanding those pages in a giant database), and **ranking** (ordering results for a query by hundreds of signals — relevance, content quality, links, page experience and intent match). SEO is the long game: it compounds, builds trust, and brings traffic you do not pay per-click for.',
      },
      { t: 'diagram', name: 'seo' },
      {
        t: 'layer2',
        brand: 'CarDekho',
        body: 'CarDekho dominates searches like "best SUV under 15 lakh" not by paying per click, but by publishing deep, well-structured comparison pages, earning backlinks from auto news sites, and keeping pages fast and mobile-friendly. Years of this compounds into free, high-intent traffic that paid ads would cost crores to match.',
      },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho Google ek library hai aur uska librarian har nayi kitaab padhta hai (crawling), uska summary register mein likhta hai (indexing), aur jab koi aata hai "best biryani recipe" maangta hai, toh librarian sabse achhi, sabse bharosemand kitaab sabse upar rakhta hai (ranking). SEO matlab apni kitaab ko itna acha aur clear likhna ki librarian use hamesha sabse upar rakhe — bina ek bhi rupaya diye.',
      },

      { t: 'h', text: 'On-Page SEO' },
      { t: 'p', text: 'On-page SEO = everything you control on the page itself so Google understands and trusts it. Here is where each element goes:' },
      { t: 'diagram', name: 'onpage' },
      {
        t: 'list',
        items: [
          'Title tag — the clickable headline in results; include the main keyword near the front.',
          'Meta description — the summary under the title; write it to earn the click.',
          'H1 + structured headings (H2/H3) — one clear H1, logical sub-headings.',
          'Keyword in URL, first paragraph, and naturally throughout — never stuffed.',
          'Internal links — connect related pages to spread authority.',
          'Image alt text — describe images for accessibility and image search.',
        ],
      },

      { t: 'h', text: 'Off-Page SEO — backlinks' },
      { t: 'p', text: 'Off-page SEO is about authority earned elsewhere — chiefly **backlinks**. Each quality link from a trusted site is a "vote" telling Google you are credible.' },
      { t: 'diagram', name: 'backlinks' },

      { t: 'h', text: 'Technical SEO' },
      {
        t: 'list',
        items: [
          'Site speed & Core Web Vitals — fast pages rank and convert better.',
          'Mobile-friendliness — Google indexes the mobile version first.',
          'XML sitemap & robots.txt — guide crawlers to what matters.',
          'HTTPS, clean URL structure, no broken links or duplicate content.',
          'Structured data (schema) — helps Google show rich results (stars, FAQs).',
        ],
      },

      { t: 'h', text: 'Local SEO' },
      { t: 'p', text: 'For businesses with a physical/local service: optimise your Google Business Profile, collect reviews, keep NAP (Name, Address, Phone) consistent, and target "near me" / city keywords. This wins the local map pack.' },

      { t: 'h', text: 'How landing-page quality affects rank' },
      { t: 'callout', tone: 'tip', text: 'Google rewards pages that satisfy the searcher: relevant content, fast load, mobile-friendly, low bounce. A great landing page boosts organic rank AND lowers paid-ad costs (Quality Score) — the same quality signals serve both.' },

      { t: 'h', text: 'Essential tools' },
      {
        t: 'cards',
        items: [
          { title: 'Google Search Console', body: 'Free. See your queries, clicks, indexing & errors straight from Google.', color: 'blue' },
          { title: 'Ahrefs / SEMrush', body: 'Keyword research, backlink analysis, competitor gaps.', color: 'purple' },
          { title: 'PageSpeed Insights', body: 'Measure Core Web Vitals & speed fixes.', color: 'orange' },
        ],
      },
    ],
    keyTakeaway:
      'SEO earns free, compounding traffic. Google crawls → indexes → ranks. Win by combining on-page (titles, headings, content, internal links), off-page (quality backlinks), and technical SEO (speed, mobile, structure). Page quality lifts both organic rank and paid Quality Score.',
    interview: [
      { q: 'Explain how search engines work.', includes: ['Crawling (discover via links)', 'indexing (store/understand)', 'ranking (order by relevance & quality signals)'] },
      { q: 'Difference between on-page and off-page SEO?', includes: ['On-page = content/HTML you control (titles, headings, keywords, internal links)', 'off-page = authority earned elsewhere (backlinks)'] },
      { q: 'What is a backlink and why does it matter?', includes: ['Link from another site', 'a vote of trust/authority', 'quality > quantity', 'boosts ranking'] },
    ],
    connected: ['ch3', 'ch5', 'ch6'],
    flashcards: [
      { q: 'The three steps of how Google works?', a: 'Crawling → Indexing → Ranking.' },
      { q: 'Best free tool to monitor your SEO?', a: 'Google Search Console.' },
      { q: 'On-page vs off-page in one line?', a: 'On-page = what you control on the page; off-page = authority (backlinks) earned elsewhere.' },
    ],
    flipTerms: [
      { front: 'Crawling', back: 'Bots discovering pages by following links across the web.' },
      { front: 'Backlink', back: 'A link from another website to yours — a trust signal.' },
      { front: 'SERP', back: 'Search Engine Results Page.' },
    ],
  },

  // ───────────────────────────── CHAPTER 5 ─────────────────────────────
  {
    id: 'ch5',
    num: 5,
    title: 'Content Marketing',
    slug: 'content-marketing',
    icon: 'PenTool',
    color: 'orange',
    est: 8,
    summary: 'Attract and earn trust by giving value first — content types, the content funnel, calendars and how content fuels SEO.',
    sections: [
      { t: 'h', text: 'What is content marketing' },
      {
        t: 'layer1',
        body: '**Content marketing** is attracting and retaining a clearly defined audience by consistently creating valuable, relevant content — instead of directly pitching, you earn attention and trust by being useful. Over time this builds authority, fuels SEO, nurtures leads through the funnel, and lowers paid-acquisition costs because people come to you. Content is the fuel almost every other channel burns.',
      },
      {
        t: 'layer2',
        brand: 'Zerodha (Varsity)',
        body: 'Zerodha built "Varsity" — free, in-depth lessons on stock-market investing. They sold nothing directly; they taught. Millions learned to invest there, trusted Zerodha, and opened accounts. That content engine made Zerodha India’s largest broker with almost no traditional advertising.',
      },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho mohalle mein ek aunty hai jo sabko free mein achhi salah deti hai — "beta yeh dawai lo, yeh nuskha try karo." Dheere-dheere pura mohalla unpe bharosa karne lagta hai. Jab unki beti tuition shuru karti hai, sab seedha unke paas bhejte hain. Aunty ne kabhi bola nahi "mujhse padho" — par trust bana liya. Content marketing yahi hai: pehle value do, bharosa kamao, bechna baad mein apne aap ho jaata hai.',
      },

      { t: 'h', text: 'Types of content' },
      {
        t: 'cards',
        items: [
          { title: 'Blog & Articles', body: 'SEO workhorses; answer search queries.', color: 'green' },
          { title: 'Video & Reels', body: 'High engagement; great for awareness.', color: 'purple' },
          { title: 'Infographics', body: 'Make complex ideas shareable.', color: 'blue' },
          { title: 'Ebooks & Guides', body: 'Lead magnets — trade value for email.', color: 'orange' },
          { title: 'Webinars', body: 'Deep trust + lead capture for MOFU/BOFU.', color: 'blue' },
          { title: 'Case Studies', body: 'Proof that closes — perfect for BOFU.', color: 'green' },
        ],
      },

      { t: 'h', text: 'The content funnel — TOFU / MOFU / BOFU' },
      { t: 'p', text: 'Match content to the buyer’s stage: broad and educational at the top, decisive and proof-heavy at the bottom.' },
      { t: 'diagram', name: 'funnel' },

      { t: 'h', text: 'Content calendar' },
      { t: 'p', text: 'A content calendar plans what you publish, where and when — keeping output consistent and tied to goals, seasons and campaigns.' },
      { t: 'diagram', name: 'calendar' },

      { t: 'h', text: 'How content feeds SEO' },
      { t: 'callout', tone: 'tip', text: 'Every quality article targets keywords, earns backlinks, and gives Google fresh, relevant pages to rank — so content marketing and SEO are two sides of the same coin. No content, no organic rankings.' },
    ],
    keyTakeaway:
      'Content marketing earns attention by giving value first. Use the right content type for each funnel stage (educational at TOFU, proof at BOFU), publish consistently via a calendar, and remember: content is the fuel for SEO, email and social alike.',
    interview: [
      { q: 'What is content marketing?', includes: ['Valuable, relevant content', 'attract & retain an audience', 'build trust/authority', 'not a direct pitch'] },
      { q: 'How does content map to the funnel?', includes: ['TOFU = educational/awareness', 'MOFU = comparison/guides/webinars', 'BOFU = case studies/demos'] },
      { q: 'How does content support SEO?', includes: ['Targets keywords', 'fresh pages to index', 'earns backlinks', 'satisfies search intent'] },
    ],
    connected: ['ch4', 'ch9', 'ch11'],
    flashcards: [
      { q: 'Core principle of content marketing?', a: 'Give value first to earn attention and trust — selling follows.' },
      { q: 'Which content suits BOFU?', a: 'Case studies, demos, comparisons, testimonials — proof that closes.' },
      { q: 'What is a lead magnet?', a: 'Valuable content (ebook/guide) offered in exchange for an email.' },
    ],
    flipTerms: [
      { front: 'Lead Magnet', back: 'Free content given in exchange for contact details.' },
      { front: 'Content Calendar', back: 'A plan of what to publish, where and when.' },
      { front: 'Evergreen Content', back: 'Content that stays relevant and drives traffic long after publishing.' },
    ],
  },

  // ───────────────────────────── CHAPTER 6 (DEEP) ─────────────────────────────
  {
    id: 'ch6',
    num: 6,
    title: 'Google Ads',
    slug: 'google-ads',
    icon: 'Target',
    color: 'blue',
    est: 19,
    deep: true,
    summary: 'The deep dive: the auction mechanics, the unit economics that set your bid, campaign architecture, match types, Quality Score, automated bidding and the optimisation loop.',
    sections: [
      { t: 'h', text: 'How Google Ads works — the auction' },
      {
        t: 'layer1',
        body: 'Google Ads is a **pay-per-click** system built on a real-time auction. The instant someone searches, Google holds an auction among every advertiser eligible for that query — and it finishes before the page paints. Crucially, you do **not** win by bidding highest. Google ranks ads by **Ad Rank**, which multiplies your bid by your **Quality Score** (and factors in ad assets/extensions and the search context). A relevant advertiser with a high Quality Score routinely outranks a richer competitor *and* pays less. Pricing is **generalised second-price**: you pay only the minimum needed to beat the advertiser ranked just below you — almost always less than your max bid.',
      },
      {
        t: 'image',
        src: '/images/serp-anatomy.svg',
        alt: 'Annotated search results page: two sponsored ad positions decided by Ad Rank, above the free organic results.',
        caption: 'Anatomy of a results page — the top ~4 slots are auctioned on every search; their order is Ad Rank, not bid.',
        credit: 'Replica',
      },
      { t: 'p', text: 'Theory only sticks when you can move the levers yourself. Set your bid and Quality Score below and watch your position **and your actual CPC** change against four competitors:' },
      { t: 'component', name: 'auctionSimulator' },
      {
        t: 'formula',
        expr: 'Ad Rank = Max Bid × Quality Score (+ asset & context impact)',
        terms: [
          { sym: 'Max Bid', desc: 'the most you are willing to pay for a click' },
          { sym: 'Quality Score', desc: "Google's 1–10 relevance rating" },
          { sym: 'Actual CPC', desc: '≈ (Ad Rank of the advertiser below you ÷ your Quality Score) + ₹0.01' },
        ],
        example: 'You bid ₹70 with QS 8 → Ad Rank 560, position 1. The rival below you has Ad Rank 495, so you pay 495 ÷ 8 + 0.01 ≈ ₹61.88 — not your full ₹70.',
        benchmark: 'A jump from QS 4 to QS 8 typically cuts CPC ~50% for the same position.',
      },
      {
        t: 'layer3',
        emoji: '🛺',
        body: 'Socho do auto-wale. Pehla bolta hai "₹1000 flat, baith jao chahe so jao" — that is **CPM**, you pay for the space whether you act or not. Doosra bolta hai "meter se — jitna chaloge utna" — that is **CPC**, paisa tabhi katega jab koi click kare. Search Ads CPC pe chalte hain. Par yahan twist hai: meter sirf bid se nahi, *Quality Score* se bhi set hota hai — relevant ad wale ko Google sasta meter deta hai. Achha kaam = sasta click.',
      },

      { t: 'h', text: 'The economics — what you can actually afford to bid' },
      {
        t: 'layer1',
        body: 'This is the question most beginners skip and every serious marketer answers first: *what is the most I can pay for a click and still make money?* Your bid ceiling is **not** set by competitors — it is set by your own unit economics. Work backwards from the sale: margin per order tells you the most you can pay per conversion (**max CPA**); your landing-page conversion rate tells you how many clicks it takes to get one; together they give your **max CPC**. Bid above that and you buy traffic at a loss, no matter how good the ad looks.',
      },
      { t: 'component', name: 'bidEconomics' },
      {
        t: 'formula',
        expr: 'Max CPC = (AOV × Gross Margin %) × Conversion Rate %',
        terms: [
          { sym: 'AOV', desc: 'average order value (revenue per sale)' },
          { sym: 'Gross Margin %', desc: 'share of AOV left after cost of goods' },
          { sym: 'Conversion Rate %', desc: 'clicks that become sales' },
          { sym: 'Break-even ROAS', desc: '= 1 ÷ Gross Margin % — the minimum return that keeps you whole' },
        ],
        example: '₹2,000 AOV × 40% margin = ₹800 max CPA. At a 3% landing-page CVR, only 3 of 100 clicks buy — so each click is worth ₹800 × 3% = ₹24. Bid above ₹24 and you lose money.',
        benchmark: 'Break-even ROAS for a 40% margin = 2.5x. Profitable accounts target well above their break-even line.',
      },
      { t: 'p', text: 'Why does the affordable bid swing so much between businesses? Because click prices do — and high-margin, high-competition niches are exactly where the maths is unforgiving:' },
      { t: 'chart', name: 'industryBenchmarks' },

      { t: 'h', text: 'Campaign types — match the format to the funnel stage' },
      { t: 'p', text: 'Google Ads is not one product. Each campaign type sits at a different point of the funnel, so the right choice follows your objective, not your preference.' },
      { t: 'component', name: 'googleCampaignTabs' },
      {
        t: 'framework',
        title: 'Choosing a campaign type by objective',
        subtitle: 'Map the goal to the format before you ever set a bid.',
        steps: [
          { label: 'Capture existing demand → Search', body: 'People already searching with intent ("buy running shoes online"). Highest intent, highest CPC, best for direct response.' },
          { label: 'Sell products at scale → Shopping / Performance Max', body: 'Pulls images, price and reviews from a product feed. **Performance Max** lets Google serve across Search, Shopping, Display, YouTube and Gmail from one campaign — powerful, but it hides placement data, so feed quality and clear conversion goals matter more.' },
          { label: 'Build awareness & retarget → Display / Video', body: 'Cheap reach across millions of sites and YouTube. Low intent on its own; far more effective as remarketing to people who already visited.' },
          { label: 'Re-engage lost visitors → Remarketing', body: 'Audiences who visited but did not convert. They already know you, so they convert cheaper — covered in depth in Chapter 11.' },
        ],
      },

      { t: 'h', text: 'Keywords & match types' },
      { t: 'p', text: '**Keywords** are the searches you bid to appear for. **Match types** control how loosely Google matches a live search to your keyword — looser = more reach but less control. Note: match types have loosened over the years (Google now matches on *meaning*, not exact strings), and **close variants** mean even Exact triggers on synonyms and intent — so negative keywords and the Search Terms report do the controlling that match types once did.' },
      {
        t: 'table',
        head: ['Match type', 'Syntax', 'Reach vs control', 'A search it can trigger on'],
        rows: [
          ['Broad', 'running shoes', 'Widest reach, least control — pair only with Smart Bidding + tight negatives', '“jogging gear”, “marathon trainers”, “sports footwear”'],
          ['Phrase', '"running shoes"', 'Balanced — must contain the *meaning* of the phrase', '“best running shoes for men”, “buy running shoes online”'],
          ['Exact', '[running shoes]', 'Tightest control, lowest volume — but still matches close variants', '“running shoes”, “shoes for running”'],
        ],
      },
      {
        t: 'layer2',
        brand: 'Zomato',
        body: 'Zomato bids on high-intent terms like "food delivery near me" and "order biryani online". The architecture does the heavy lifting: a campaign per city (budget control), ad groups split by cuisine — Biryani, Pizza, Chinese — each with tightly-themed keywords, matching ad copy ("Biryani in 30 mins — Flat 50% off") and a cuisine-specific landing page. Intent is matched end-to-end, which lifts Quality Score, cuts CPC, and raises conversion rate simultaneously. That is the compounding payoff of tight structure.',
      },
      { t: 'callout', tone: 'warn', text: 'Negative keywords stop your ad showing for searches that will never convert. Selling premium shoes? Add “free”, “cheap”, “repair”, “jobs”, “DIY” as negatives. Mining the Search Terms report for negatives weekly is the single highest-ROI habit in a Google Ads account — it is where wasted spend hides.' },

      { t: 'h', text: 'Quality Score — relevance is a discount' },
      {
        t: 'layer1',
        body: '**Quality Score** (1–10) is diagnostic feedback on three components: **expected CTR**, **ad relevance**, and **landing-page experience**. It feeds Ad Rank, so a higher score wins better positions at lower cost. The lever marketers most often forget is the third one: the landing page is part of the ad. Send a "biryani" click to a biryani page, not the homepage — speed, mobile-friendliness and message-match all move the score.',
      },
      { t: 'component', name: 'qualityScoreLab' },
      {
        t: 'layer3',
        emoji: '🎓',
        body: 'Quality Score ko ek strict professor samjho jo internal marks deta hai. Relevant ad + fast, matching landing page + log click kar rahe hain = achhe marks, aur achhe marks waale ki "fees" (CPC) kam ho jaati hai. Random keywords pe ghisa-pita ad? Professor naraz — tum zyada pay karoge aur phir bhi peeche. MBA framing: Quality Score is Google pricing *relevance as a discount* — relevance lower karta hai marginal cost per acquisition.',
      },

      { t: 'h', text: 'Account architecture' },
      { t: 'p', text: 'Performance is downstream of structure. The hierarchy — **Account → Campaigns (by goal/budget) → Ad Groups (by tight theme) → Keywords + Ads + a matching Landing Page** — exists so that every layer reinforces relevance. Loose, sprawling ad groups are the most common reason Quality Scores and ROAS quietly decay.' },
      { t: 'diagram', name: 'googleHierarchy' },

      { t: 'h', text: 'Bidding strategies — manual control vs Smart Bidding' },
      { t: 'p', text: 'Bidding has shifted from setting keyword bids by hand to telling Google a *goal* and letting its models bid per-auction using signals you can\'t see (device, time, audience, query). The skill today is choosing the right strategy for your data maturity and feeding it clean conversion data.' },
      {
        t: 'table',
        head: ['Strategy', 'Optimises for', 'Use when'],
        rows: [
          ['Manual / Enhanced CPC', 'You set bids; Google nudges for conversions', 'New accounts, thin data, maximum control while learning'],
          ['Maximise Clicks', 'Most clicks for the budget', 'Top-of-funnel traffic, no conversion data yet'],
          ['Target CPA', 'Conversions at a set cost', 'You have a cost-per-lead goal and ~15–30 conv./month'],
          ['Target ROAS', 'Revenue per ₹ spent', 'Ecommerce with revenue/value tracking live'],
          ['Maximise Conversions', 'Most conversions for the budget', 'Lead gen with enough volume, no strict CPA cap'],
          ['Maximise Conversion Value', 'Highest total value', 'Varied order values with value tracking on'],
        ],
      },
      { t: 'callout', tone: 'tip', text: 'Smart Bidding is only as good as the conversions you feed it. Garbage or missing conversion data → the algorithm optimises toward the wrong outcome. Get tracking right *before* you switch on Target CPA or Target ROAS.' },

      { t: 'h', text: 'Conversion tracking & the metrics that move together' },
      { t: 'p', text: 'Without conversion tracking you are optimising clicks, not customers. The flow: define a conversion (purchase, qualified lead) → install the Google tag or import the event from GA4 → fire it at the moment of value (thank-you page / purchase) → let bidding optimise toward it.' },
      { t: 'diagram', name: 'convTracking' },
      {
        t: 'formula',
        expr: 'CPA = Cost ÷ Conversions   •   ROAS = Conv. Value ÷ Cost',
        terms: [
          { sym: 'CPA', desc: 'cost per acquisition — what one conversion cost you' },
          { sym: 'ROAS', desc: 'return on ad spend — revenue earned per ₹1 spent' },
          { sym: 'CVR', desc: 'conversion rate = Conversions ÷ Clicks' },
        ],
        example: '₹10,000 spend → 200 clicks → 10 sales worth ₹40,000. CVR = 5%, CPA = ₹1,000, ROAS = 4x. Whether 4x is "good" depends entirely on your break-even ROAS from the economics section.',
        benchmark: 'Search CVR averages ~3–5% across industries; anything below ~1% usually points at a landing-page or intent-match problem.',
      },

      { t: 'h', text: 'The optimisation loop' },
      { t: 'p', text: 'Google Ads is not "set and forget" — it is a weekly loop of reading signals and reallocating. The order matters: cut waste first, then scale winners.' },
      {
        t: 'list',
        ordered: true,
        items: [
          'Mine the **Search Terms report** → add irrelevant queries as negatives (cut waste first).',
          'Pause keywords/ads with high cost and zero conversions; they only drain budget.',
          'Shift budget toward profitable keywords/campaigns; throttle the poor performers.',
          'Run 2–3 responsive ad variations per ad group and let the winners accumulate impressions (A/B).',
          'Raise low Quality Scores at the source — tighten ad-group theme + landing-page match.',
          'Read CTR, CPC, CVR, CPA **and** ROAS together — never optimise one metric in isolation.',
        ],
      },
      {
        t: 'cards',
        items: [
          { title: 'Bidding on brand only', body: 'Cheap clicks that you would have won organically — vanity ROAS, little incremental sales.', color: 'orange' },
          { title: 'Homepage as landing page', body: 'Breaks message-match, tanks Quality Score and CVR. Send each ad group to a dedicated page.', color: 'orange' },
          { title: 'Ignoring search terms', body: 'Broad match without negatives quietly bleeds spend on irrelevant queries.', color: 'orange' },
          { title: 'Optimising clicks not value', body: 'Cheap clicks that never convert beat no one. Bid to CPA/ROAS, not CPC.', color: 'orange' },
        ],
      },
    ],
    keyTakeaway:
      'Google Ads runs a real-time auction where Ad Rank = Bid × Quality Score — relevance can beat a bigger budget. Structure tightly (Campaign → Ad Group → Ad), use match types + negatives for control, track conversions, and remember the landing page is part of your Quality Score.',
    interview: [
      { q: 'How does the Google Ads auction decide ad position?', includes: ['Ad Rank = Bid × Quality Score', 'plus extensions/context', 'highest bid does not always win', 'relevance lowers cost'] },
      { q: 'Explain match types.', includes: ['Broad = widest reach', 'Phrase = contains the meaning', 'Exact = closest match only', 'looser = more reach less control'] },
      { q: 'What is Quality Score made of and why does it matter?', includes: ['Expected CTR', 'ad relevance', 'landing-page experience', 'higher QS = lower CPC & better position'] },
    ],
    connected: ['ch4', 'ch10', 'ch12'],
    flashcards: [
      { q: 'The Ad Rank formula?', a: 'Ad Rank = Max Bid × Quality Score (plus extensions & context).' },
      { q: 'CPC vs CPM in one line?', a: 'CPC = pay per click (the action); CPM = pay per 1,000 impressions (the space).' },
      { q: 'What are the 3 parts of Quality Score?', a: 'Expected CTR, ad relevance, and landing-page experience.' },
      { q: 'Why use negative keywords?', a: 'To stop paying for irrelevant searches that will never convert.' },
      { q: 'How do you find your maximum affordable CPC?', a: 'Max CPC = (AOV × Gross Margin %) × Conversion Rate %. It is set by your unit economics, not by competitors.' },
      { q: 'What is break-even ROAS and how is it calculated?', a: 'The minimum return that keeps you whole: 1 ÷ Gross Margin %. A 40% margin → break-even ROAS of 2.5x.' },
      { q: 'Why does a high Quality Score lower your CPC?', a: 'CPC needed to hold a position is proportional to 1 ÷ Quality Score, so higher relevance buys the same slot for less.' },
    ],
    flipTerms: [
      { front: 'Ad Rank', back: 'Bid × Quality Score — decides ad position.' },
      { front: 'Broad Match', back: 'Widest match type; triggers on related searches.' },
      { front: 'Target CPA', back: 'Automated bidding toward a target cost per conversion.' },
      { front: 'Search Terms Report', back: 'The actual queries that triggered your ads — mine it for negatives.' },
    ],
  },

  // ───────────────────────────── CHAPTER 7 (DEEP) ─────────────────────────────
  {
    id: 'ch7',
    num: 7,
    title: 'Meta Ads',
    slug: 'meta-ads',
    icon: 'Facebook',
    color: 'blue',
    est: 14,
    deep: true,
    summary: 'Facebook & Instagram advertising — Ads Manager, objectives, audience targeting, formats, the Pixel, budgets and testing.',
    sections: [
      { t: 'h', text: 'Facebook vs Instagram ads' },
      {
        t: 'layer1',
        body: 'Meta Ads run across Facebook, Instagram, Messenger and the Audience Network from one place — **Meta Ads Manager**. The key difference from Google: Google captures *existing demand* (people searching), while Meta *creates demand* by interrupting people with compelling creative based on who they are and what they like. It is **interest- and behaviour-based** targeting rather than keyword/intent-based. Facebook skews broader/older; Instagram skews younger and more visual — but you can run both and let Meta optimise placement.',
      },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho Google ek dukaan hai jahan log khud chalke aate hain — "bhaiya, joote chahiye." Tumhe sirf wahin khade rehna hai. Meta ek shaadi ka function hai — koi joote dhoondhne nahi aaya, par tum ek banda dekhke jaante ho "is bande ko style pasand hai" aur uske saamne sundar joote rakh dete ho. Woh impulse mein le leta hai. Google demand pakadta hai, Meta demand banata hai.',
      },

      { t: 'h', text: 'Meta Ads Manager — the structure' },
      { t: 'p', text: 'Three levels: Campaign (the objective) → Ad Set (audience, budget, placement, schedule) → Ad (the creative). Below is a simplified Ads Manager view.' },
      { t: 'diagram', name: 'metaManager' },

      { t: 'h', text: 'Campaign objectives' },
      {
        t: 'cards',
        items: [
          { title: 'Awareness', body: 'Maximise reach & brand recall. Cheap impressions.', color: 'blue' },
          { title: 'Traffic', body: 'Send clicks to a site or landing page.', color: 'purple' },
          { title: 'Engagement', body: 'Likes, comments, messages, video views.', color: 'orange' },
          { title: 'Leads', body: 'Collect leads via instant forms or site.', color: 'green' },
          { title: 'App Promotion', body: 'Installs & in-app actions.', color: 'blue' },
          { title: 'Sales', body: 'Drive purchases (uses the Pixel & catalog).', color: 'green' },
        ],
      },
      { t: 'callout', tone: 'tip', text: 'Pick the objective that matches your true goal — Meta optimises delivery toward whatever you choose. Choosing "Traffic" when you want sales gets you cheap clicks that never buy.' },

      { t: 'h', text: 'Audience targeting — Core, Custom, Lookalike' },
      { t: 'p', text: 'Meta’s targeting power lives in three audience types, expanding outward from your own data:' },
      { t: 'diagram', name: 'metaAudiences' },
      {
        t: 'layer2',
        brand: 'Mamaearth',
        body: 'Mamaearth scaled on Meta by building a **Custom Audience** of website visitors and purchasers, then a **Lookalike** (1%) of their buyers to find similar new mothers across India — paired with **Core** interest targeting (organic/toxin-free, parenting). Creative-led, audience-smart: that combination took them from startup to unicorn.',
      },

      { t: 'h', text: 'Ad formats' },
      { t: 'component', name: 'metaFormats' },

      { t: 'h', text: 'The Meta Pixel' },
      { t: 'p', text: 'The **Pixel** is a snippet on your site that reports visitor actions back to Meta — page views, add-to-carts, purchases. It powers conversion tracking, retargeting Custom Audiences, and Lookalikes.' },
      { t: 'diagram', name: 'pixelFlow' },

      { t: 'h', text: 'Budget — daily vs lifetime' },
      {
        t: 'table',
        head: ['', 'Daily Budget', 'Lifetime Budget'],
        rows: [
          ['How it spends', 'A set amount each day', 'A total over the whole schedule'],
          ['Pacing', 'Even, ongoing', 'Meta paces across days/dayparting'],
          ['Best for', 'Always-on campaigns', 'Fixed-duration promos/events'],
          ['Scheduling ads', 'Limited', 'Allows ad scheduling'],
        ],
      },

      { t: 'h', text: 'A/B testing' },
      { t: 'p', text: 'Test one variable at a time — creative, audience, or placement — so you know what actually moved the result. Meta’s built-in A/B test splits audiences fairly and declares a winner.' },
      { t: 'diagram', name: 'abtest' },

      { t: 'h', text: 'Landing page → Meta campaign connection' },
      { t: 'callout', tone: 'tip', text: 'Meta clicks are lower-intent than search clicks, so the landing page must restate the ad’s promise instantly, load fast on mobile, and have the Pixel firing — otherwise you pay for clicks you can’t track or convert.' },

      { t: 'h', text: 'Reading Meta reports' },
      {
        t: 'list',
        items: [
          'CTR & CPC — is the creative compelling and the click affordable?',
          'CPM — how expensive is reaching this audience?',
          'Frequency — above ~3–4 means ad fatigue; refresh creative.',
          'Cost per result (per the objective) and ROAS — the bottom line.',
          'Use the breakdowns (age, placement, device) to cut what doesn’t work.',
        ],
      },
    ],
    keyTakeaway:
      'Meta Ads create demand with interest/behaviour targeting (vs Google capturing search demand). Structure = Campaign (objective) → Ad Set (audience/budget) → Ad (creative). The audience trio — Core → Custom → Lookalike — plus the Pixel is the engine. Match objective to goal and feed strong creative.',
    interview: [
      { q: 'How is Meta advertising different from Google Ads?', includes: ['Meta = interest/behaviour, creates demand', 'Google = keyword/intent, captures demand', 'creative-led vs query-led'] },
      { q: 'Explain Core, Custom and Lookalike audiences.', includes: ['Core = demographics/interests you define', 'Custom = your own data (visitors/list)', 'Lookalike = new people similar to a source audience'] },
      { q: 'What is the Meta Pixel and what does it enable?', includes: ['Tracking snippet on site', 'reports actions/conversions', 'powers retargeting & Lookalikes', 'optimises delivery'] },
    ],
    connected: ['ch2', 'ch10', 'ch11'],
    flashcards: [
      { q: 'Meta’s three-level structure?', a: 'Campaign (objective) → Ad Set (audience/budget/placement) → Ad (creative).' },
      { q: 'What does the Pixel power?', a: 'Conversion tracking, retargeting Custom Audiences, and Lookalike audiences.' },
      { q: 'Core vs Custom vs Lookalike?', a: 'Core = you define interests; Custom = your own data; Lookalike = similar new people.' },
      { q: 'What does high frequency signal?', a: 'Ad fatigue — refresh the creative.' },
    ],
    flipTerms: [
      { front: 'Ad Set', back: 'The Meta level holding audience, budget, placement & schedule.' },
      { front: 'Lookalike', back: 'A new audience Meta finds resembling your best customers.' },
      { front: 'Pixel', back: 'Site snippet that reports actions back to Meta.' },
      { front: 'Frequency', back: 'Average times one person saw your ad.' },
    ],
  },

  // ───────────────────────────── CHAPTER 8 ─────────────────────────────
  {
    id: 'ch8',
    num: 8,
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    icon: 'Share2',
    color: 'purple',
    est: 9,
    summary: 'Organic vs paid, the major platforms and their algorithms, content strategy per platform, and influencer marketing.',
    sections: [
      { t: 'h', text: 'Organic vs Paid' },
      {
        t: 'layer1',
        body: '**Organic** social media is the unpaid content you post to build community, trust and brand over time. **Paid** social is advertising to reach beyond your followers, fast and targeted. They work together: organic builds the brand and tests what resonates; paid amplifies the winners and drives specific actions. Most brands need both — organic for depth and trust, paid for reach and speed.',
      },
      {
        t: 'cards',
        items: [
          { title: 'Organic', body: 'Free reach to followers. Builds trust & community. Slow, compounding.', color: 'green' },
          { title: 'Paid', body: 'Bought reach to targeted strangers. Fast, controllable, costs money.', color: 'blue' },
        ],
      },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho organic woh dosti hai jo tu mohalle mein roz milke, chai pilake, dheere-dheere banata hai — time lagta hai par pakki hoti hai. Paid woh hai jab tu newspaper mein ad deke ek din mein 1000 logon tak pahunch jaata hai — fast, par paisa lagta hai aur ruka toh ruk gaya. Smart banda dono karta hai: dosti bhi banata hai, ad bhi deta hai.',
      },

      { t: 'h', text: 'Platform breakdown' },
      { t: 'p', text: 'Each platform has its own audience, format and algorithm. Pick where your audience actually is — do not spread thin everywhere.' },
      { t: 'component', name: 'platformTabs' },

      { t: 'h', text: 'Algorithm basics' },
      { t: 'p', text: 'Every feed algorithm asks the same core question: "Will this person engage with and value this?" They reward early engagement, watch-time/dwell, relevance and consistency — and punish clickbait and external links that send people away.' },

      { t: 'h', text: 'Influencer marketing' },
      {
        t: 'list',
        items: [
          'Nano (1–10k) & micro (10–100k) influencers often beat celebrities on trust and cost-per-engagement.',
          'Match the creator’s audience to your target — relevance beats follower count.',
          'Brief clearly but let creators keep their authentic voice.',
          'Track with promo codes / UTM links to measure real ROI.',
        ],
      },
      {
        t: 'layer2',
        brand: 'Sugar Cosmetics',
        body: 'Sugar grew largely on Instagram — sharp, on-trend reels plus an army of micro-influencers doing honest reviews and tutorials. Organic content built the aesthetic and trust; paid amplified top reels and retargeted engagers. Relatable creators, not big celebrities, did the heavy lifting.',
      },
    ],
    keyTakeaway:
      'Organic builds trust slowly; paid buys reach fast — use both. Choose platforms where your audience lives, feed each its native format, design for early engagement (what algorithms reward), and use relevant micro-influencers with trackable links.',
    interview: [
      { q: 'Organic vs paid social — when to use each?', includes: ['Organic = trust/community, slow & free', 'paid = fast targeted reach, costs money', 'use together: organic builds, paid amplifies'] },
      { q: 'How do social algorithms generally decide reach?', includes: ['Predict engagement/value', 'reward early engagement & dwell-time', 'relevance & consistency', 'penalise clickbait'] },
      { q: 'How would you run an influencer campaign?', includes: ['Match audience relevance > follower count', 'micro/nano for trust & cost', 'clear brief + authentic voice', 'track via codes/UTM'] },
    ],
    connected: ['ch5', 'ch7', 'ch2'],
    flashcards: [
      { q: 'Organic vs paid in one line?', a: 'Organic = unpaid, trust-building, slow; paid = bought reach, fast, targeted.' },
      { q: 'What do feed algorithms reward most?', a: 'Early engagement, dwell/watch-time, and relevance.' },
      { q: 'Why prefer micro-influencers?', a: 'Higher trust and engagement at lower cost; more relevant audiences.' },
    ],
    flipTerms: [
      { front: 'Engagement Rate', back: 'Interactions ÷ reach (or followers) — how actively people respond.' },
      { front: 'Reach', back: 'Unique people who saw your content.' },
      { front: 'Micro-influencer', back: 'A creator with ~10k–100k engaged followers.' },
    ],
  },

  // ───────────────────────────── CHAPTER 9 ─────────────────────────────
  {
    id: 'ch9',
    num: 9,
    title: 'Email Marketing',
    slug: 'email-marketing',
    icon: 'Mail',
    color: 'green',
    est: 8,
    summary: 'The highest-ROI owned channel — building a list, email types, key metrics and how email fits the funnel.',
    sections: [
      { t: 'h', text: 'What is email marketing' },
      {
        t: 'layer1',
        body: '**Email marketing** is sending targeted messages to a list of people who opted in, to nurture, convert and retain them. It is an *owned* channel — unlike ads or social, no algorithm sits between you and your audience, and you do not pay per send. That is why it consistently posts the highest ROI in marketing (often quoted around ₹40+ back per ₹1 spent). Success hinges on permission, segmentation, and relevance.',
      },
      {
        t: 'layer2',
        brand: 'Myntra',
        body: 'Myntra’s email engine segments by behaviour: a wishlist reminder when an item drops in price, an abandoned-cart nudge two hours later, a "your size is back in stock" alert, and personalised sale previews. Each email is triggered by what *you* did — that relevance is why their emails get opened and convert.',
      },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho social media aur ads kiraye ke ghar jaise hain — landlord (algorithm) kabhi bhi rent badha de ya nikaal de. Email list tumhara apna ghar hai — koi tumhe nikaal nahi sakta, koi beech mein paisa nahi maangta. Isliye samajhdar marketer apni email list ko sona samajhta hai: ek baar bana li, toh seedha apne logon tak, free, jab marzi pahunch sakte ho.',
      },

      { t: 'h', text: 'Building an email list' },
      {
        t: 'list',
        items: [
          'Offer a lead magnet (discount, ebook, checklist) in exchange for the email.',
          'Use signup forms, exit-intent popups and checkout opt-ins.',
          'Always get permission (opt-in) — never buy lists; it kills deliverability and trust.',
          'Segment from day one — interests, source, behaviour.',
        ],
      },

      { t: 'h', text: 'Types of emails' },
      { t: 'diagram', name: 'emailFlow' },

      { t: 'h', text: 'Key metrics' },
      {
        t: 'table',
        head: ['Metric', 'Meaning', 'Healthy range'],
        rows: [
          ['Open Rate', '% who opened the email', '20–35%'],
          ['CTR', '% who clicked a link', '2–5%'],
          ['Bounce Rate', '% that failed to deliver', 'Under 2%'],
          ['Unsubscribe', '% who opted out', 'Under 0.5%'],
          ['Conversion', '% who took the goal action', 'Varies by goal'],
        ],
      },
      { t: 'callout', tone: 'tip', text: 'Subject line drives Open Rate; the offer + CTA drive click and conversion. A list that is clean and segmented beats a huge, cold one every time.' },

      { t: 'h', text: 'Tools' },
      {
        t: 'cards',
        items: [
          { title: 'Mailchimp', body: 'Beginner-friendly, great templates.', color: 'orange' },
          { title: 'Klaviyo', body: 'Ecommerce automation powerhouse.', color: 'green' },
          { title: 'HubSpot', body: 'Email + CRM + full automation.', color: 'blue' },
        ],
      },

      { t: 'h', text: 'Email + funnel connection' },
      { t: 'p', text: 'Email nurtures across the whole funnel: welcome (TOFU), education & social proof (MOFU), offers & cart recovery (BOFU), then retention & win-back after purchase.' },
    ],
    keyTakeaway:
      'Email is your owned, highest-ROI channel — no algorithm or per-send fee between you and your audience. Build the list with permission and lead magnets, segment and trigger by behaviour, and watch Open Rate, CTR and conversions. It nurtures every funnel stage and powers retention.',
    interview: [
      { q: 'Why is email considered high-ROI?', includes: ['Owned channel (no algorithm/middleman)', 'no per-send cost', 'targeted & permission-based', 'great for retention'] },
      { q: 'How would you grow an email list ethically?', includes: ['Lead magnets / opt-in forms', 'permission only — never buy lists', 'segment early', 'protect deliverability'] },
      { q: 'Which email metrics matter and why?', includes: ['Open Rate (subject line)', 'CTR (offer/CTA)', 'bounce & unsubscribe (list health)', 'conversions'] },
    ],
    connected: ['ch5', 'ch11', 'ch13'],
    flashcards: [
      { q: 'Why is email called an "owned" channel?', a: 'No algorithm or platform sits between you and your audience; you control the relationship.' },
      { q: 'What mainly drives Open Rate?', a: 'The subject line (and sender reputation / send time).' },
      { q: 'Healthy email bounce rate?', a: 'Under 2%.' },
    ],
    flipTerms: [
      { front: 'Opt-in', back: 'Explicit permission a subscriber gives to receive your emails.' },
      { front: 'Segmentation', back: 'Splitting your list into groups for more relevant messaging.' },
      { front: 'Drip / Automation', back: 'A pre-built sequence of emails triggered by actions or time.' },
    ],
  },

  // ───────────────────────────── CHAPTER 10 ─────────────────────────────
  {
    id: 'ch10',
    num: 10,
    title: 'Landing Pages & Conversion',
    slug: 'landing-pages-conversion',
    icon: 'MousePointerClick',
    color: 'orange',
    est: 9,
    summary: 'Where clicks become customers — anatomy of a high-converting page, CTAs, forms, trust signals and A/B testing.',
    sections: [
      { t: 'h', text: 'Landing page vs website (recap)' },
      {
        t: 'layer1',
        body: 'A **landing page** is a standalone page built for a single campaign and a single conversion goal, stripped of distractions (often no nav menu). Its entire job is to turn a visitor into a lead or customer. Because paid traffic is expensive, the landing page is where you protect that investment — a 1% lift in **conversion rate** is pure profit on the same ad spend.',
      },
      {
        t: 'layer3',
        emoji: '💡',
        body: 'Socho tu ad pe ₹50 kharch karke ek banda apne page pe laaya. Ab agar page confusing hai, slow hai, button hi nahi dikh raha — toh woh ₹50 paani mein. Landing page woh salesman hai jo tere mehengaai se laaye huye customer ko deal close karke deta hai. Kharab salesman = paisa barbaad, accha salesman = same kharch mein double sale.',
      },

      { t: 'h', text: 'Anatomy of a high-converting landing page' },
      { t: 'p', text: 'Every high-converting page has the same building blocks. Here is the annotated anatomy:' },
      { t: 'diagram', name: 'landingAnatomy' },

      { t: 'h', text: 'CTA design & placement' },
      {
        t: 'list',
        items: [
          'One primary action, repeated — hero, mid-page, and end.',
          'Action + benefit wording: "Get my free quote" beats "Submit".',
          'High-contrast button colour that stands out from everything else.',
          'Above the fold and again after you have made the case.',
        ],
      },

      { t: 'h', text: 'Forms & lead capture' },
      { t: 'callout', tone: 'warn', text: 'Every extra form field lowers conversion. Ask only for what you truly need now (often just name + email/phone). You can enrich later. Friction is the silent conversion killer.' },

      { t: 'h', text: 'Trust signals' },
      {
        t: 'cards',
        items: [
          { title: 'Social proof', body: 'Reviews, ratings, testimonials, user counts.', color: 'green' },
          { title: 'Authority', body: 'Client logos, press mentions, certifications.', color: 'blue' },
          { title: 'Risk reversal', body: 'Money-back guarantee, free trial, easy returns.', color: 'orange' },
          { title: 'Security', body: 'HTTPS, secure-payment badges, privacy note.', color: 'purple' },
        ],
      },

      { t: 'h', text: 'A/B testing' },
      { t: 'p', text: 'Test one element at a time (headline, hero image, CTA text/colour, form length). Send traffic to both versions, let the data pick the winner, then iterate. Small wins compound.' },
      { t: 'diagram', name: 'abtest' },

      { t: 'h', text: 'How the landing page connects to every channel' },
      {
        t: 'layer2',
        brand: 'Cult.fit',
        body: 'Cult.fit sends each campaign to a purpose-built landing page: a Google "gym near me" ad lands on a location page with a free-trial form; an Instagram fitness reel lands on a transformation-focused page. Same brand, different page per intent — that message-match is why their cost per lead stays low across both Google and Meta.',
      },
      { t: 'callout', tone: 'tip', text: 'The landing page is the hub every channel points to. It affects Google Quality Score, Meta cost-per-result, email conversions and SEO alike. Improve the page once and every channel gets cheaper and more effective.' },
    ],
    keyTakeaway:
      'The landing page is where expensive clicks become customers. Build it around one goal: clear hero + headline, single repeated CTA, minimal form fields, strong trust signals, and message-match to the ad. A/B test relentlessly — it lifts ROI across every channel at once.',
    interview: [
      { q: 'What makes a landing page convert?', includes: ['One goal/one CTA, no distractions', 'clear value headline + hero', 'minimal form fields', 'trust signals', 'message-match to ad', 'fast & mobile'] },
      { q: 'How do you improve a low-converting landing page?', includes: ['A/B test one element at a time', 'reduce friction/fields', 'stronger CTA & headline', 'add trust signals', 'improve speed'] },
      { q: 'Why does the landing page affect ad performance?', includes: ['Part of Google Quality Score', 'lowers CPC/cost-per-result', 'higher conversion rate = better ROAS'] },
    ],
    connected: ['ch3', 'ch6', 'ch7'],
    flashcards: [
      { q: 'Golden rule of landing pages?', a: 'One page, one goal, one CTA — remove every distraction.' },
      { q: 'Effect of adding form fields?', a: 'More fields → more friction → lower conversion. Ask only what you need.' },
      { q: 'Why A/B test one variable at a time?', a: 'So you know which change actually caused the difference in results.' },
    ],
    flipTerms: [
      { front: 'Conversion Rate', back: 'Conversions ÷ visitors × 100.' },
      { front: 'Message Match', back: 'The page restating the exact promise of the ad that sent the click.' },
      { front: 'Trust Signal', back: 'Proof (reviews, guarantees, badges) that reduces buyer anxiety.' },
    ],
  },

  // ───────────────────────────── CHAPTER 11 ─────────────────────────────
  {
    id: 'ch11',
    num: 11,
    title: 'Sales Funnel & Customer Journey',
    slug: 'sales-funnel',
    icon: 'Filter',
    color: 'purple',
    est: 9,
    summary: 'The path from stranger to customer — funnel stages, AIDA, retargeting, checkout optimisation and cart recovery.',
    sections: [
      { t: 'h', text: 'What is a funnel' },
      {
        t: 'layer1',
        body: 'A **funnel** is the model of how prospects move from first awareness to purchase, narrowing at each stage as some drop off. It is wide at the top (many strangers) and narrow at the bottom (few buyers). Marketers map the funnel to (a) understand where people leak out and (b) deliver the right message at each stage. Optimising the funnel = plugging the biggest leaks, not just adding more traffic.',
      },
      { t: 'diagram', name: 'funnel' },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho ek shaadi ka rishta. Pehle dono families ek doosre ke baare mein sunte hain (awareness). Phir milte hain, baat-cheet hoti hai, ek doosre ko parakhte hain (consideration). Phir haan-na ka faisla hota hai (decision). Har step pe kuch rishtey toot jaate hain. Funnel bilkul yahi hai — har stage pe log kam hote jaate hain, aur tumhara kaam hai sahi waqt pe sahi baat karke rishta pakka karwana.',
      },

      { t: 'h', text: 'TOFU / MOFU / BOFU in detail' },
      {
        t: 'cards',
        items: [
          { title: 'TOFU — Awareness', body: 'Goal: get discovered. Tactics: SEO, social, broad ads, educational content. Metric: reach/traffic.', color: 'blue' },
          { title: 'MOFU — Consideration', body: 'Goal: build trust & shortlist. Tactics: email nurture, comparisons, webinars, retargeting. Metric: leads/engagement.', color: 'orange' },
          { title: 'BOFU — Decision', body: 'Goal: convert. Tactics: offers, demos, reviews, cart recovery. Metric: conversions/sales.', color: 'green' },
        ],
      },

      { t: 'h', text: 'The AIDA model' },
      { t: 'p', text: 'AIDA describes the psychology of a single persuasion sequence — what good copy and campaigns move a person through:' },
      { t: 'diagram', name: 'aida' },

      { t: 'h', text: 'Retargeting & remarketing' },
      {
        t: 'layer1',
        body: '**Retargeting** shows ads to people who already engaged (visited your site, watched a video) but did not convert — recovering "warm" prospects who leaked from the funnel. It works because they already know you; warm audiences convert far cheaper than cold ones.',
      },
      {
        t: 'layer3',
        emoji: '💡',
        body: 'Kabhi hua hai na — Amazon pe ek laptop dekha, tab se har jagah wahi laptop dikhne laga? Instagram pe, YouTube pe, news website pe. Yeh retargeting hai bhai — brand tere peeche pad gayi. Tu interested tha, chala gaya, toh ab woh tujhe bar-bar yaad dilaa rahi hai "wapas aa, laptop le le." Aur kaam karta hai, kyunki tu pehle se interested tha.',
      },

      { t: 'h', text: 'Checkout optimisation & cart abandonment' },
      { t: 'callout', tone: 'warn', text: '~70% of online carts are abandoned. Top causes: surprise shipping costs, forced account creation, a long/clunky checkout, and few payment options. Fixing these often beats spending more on ads.' },
      {
        t: 'list',
        items: [
          'Show total cost early — no surprise fees at the last step.',
          'Offer guest checkout; minimise steps and fields.',
          'Provide multiple payment options (UPI, cards, COD, wallets).',
          'Trigger a cart-recovery email/WhatsApp + a retargeting ad.',
        ],
      },
      { t: 'diagram', name: 'cartRecovery' },
    ],
    keyTakeaway:
      'The funnel shows where prospects leak (TOFU→MOFU→BOFU). Match message to stage, use AIDA to persuade, retarget warm drop-offs (they convert cheap), and fix checkout friction — recovering abandoned carts often beats buying more traffic.',
    interview: [
      { q: 'Explain TOFU, MOFU and BOFU.', includes: ['TOFU = awareness/discovery', 'MOFU = consideration/nurture', 'BOFU = decision/convert', 'different tactic & metric each'] },
      { q: 'What is retargeting and why does it work?', includes: ['Ads to prior visitors/engagers', 'warm audience', 'cheaper conversions', 'recovers funnel leaks'] },
      { q: 'How would you reduce cart abandonment?', includes: ['Show costs early', 'guest checkout & fewer steps', 'more payment options', 'cart-recovery email + retargeting'] },
    ],
    connected: ['ch2', 'ch5', 'ch10'],
    flashcards: [
      { q: 'What does AIDA stand for?', a: 'Attention → Interest → Desire → Action.' },
      { q: 'Why do retargeted audiences convert cheaper?', a: 'They already know and showed interest in you — they are warm, not cold.' },
      { q: 'Most common cart-abandonment cause?', a: 'Unexpected extra costs (shipping/fees) revealed late in checkout.' },
    ],
    flipTerms: [
      { front: 'TOFU', back: 'Top of Funnel — awareness stage.' },
      { front: 'AIDA', back: 'Attention, Interest, Desire, Action.' },
      { front: 'Cart Abandonment', back: 'Adding items but leaving before completing checkout.' },
    ],
  },

  // ───────────────────────────── CHAPTER 12 (DEEP) ─────────────────────────────
  {
    id: 'ch12',
    num: 12,
    title: 'Analytics & Metrics',
    slug: 'analytics-metrics',
    icon: 'BarChart3',
    color: 'green',
    est: 15,
    deep: true,
    summary: 'The brain of marketing — GA4, traffic sources, UTM tracking, and the must-know metrics (CPC, CPM, CTR, CPA, ROAS, CAC, LTV, ROI).',
    sections: [
      { t: 'h', text: 'GA4 overview' },
      {
        t: 'layer1',
        body: 'Analytics is how you measure what is working and decide where to invest next — without it, marketing is guessing. **GA4 (Google Analytics 4)** is event-based: every interaction (page_view, click, purchase) is an event, letting you track users across web and app. Core dimensions: where users come from (source/medium), what they do (events/engagement), and whether they convert (key events/conversions).',
      },
      { t: 'diagram', name: 'ga4' },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho tu dukaan chalata hai par tujhe pata hi nahi kितne log andar aaye, kahan se aaye, kya dekha, aur kitno ne kharida. Tu andhere mein teer chala raha hai. Analytics woh CCTV + cash register hai jo sab batata hai — "subah 40 log aaye, zyada Instagram se, sabse zyada shampoo dekha, par sirf 3 ne kharida." Ab tu samajhdaari se decision le sakta hai, andaaze se nahi.',
      },

      { t: 'h', text: 'Core GA4 metrics' },
      {
        t: 'table',
        head: ['Metric', 'What it means'],
        rows: [
          ['Users', 'Unique people who visited'],
          ['Sessions', 'Visits (a group of interactions in a time window)'],
          ['Engagement Rate', '% of sessions that were engaged (10s+, conversion, or 2+ views)'],
          ['Bounce Rate', '% of sessions that were NOT engaged (inverse of engagement)'],
          ['Avg. Engagement Time', 'Time users actively spent on your site'],
          ['Key Events', 'The important actions you flagged as conversions'],
        ],
      },

      { t: 'h', text: 'Traffic sources' },
      { t: 'p', text: 'GA4 groups traffic into channels so you know what is driving results. Here is a typical breakdown:' },
      { t: 'component', name: 'trafficPie' },

      { t: 'h', text: 'Conversion tracking & goals' },
      { t: 'p', text: 'Mark the actions that matter (purchase, sign-up, lead) as **key events / conversions**, then you can see which channels, campaigns and pages actually drive them — and feed that back to Google/Meta bidding.' },

      { t: 'h', text: 'UTM parameters — build one' },
      { t: 'p', text: '**UTM** tags are labels added to a URL so analytics can attribute a visit to the exact campaign. Build one below and copy your tracked link:' },
      { t: 'component', name: 'utmBuilder' },

      { t: 'h', text: 'KEY METRICS — the ones interviewers love' },
      { t: 'p', text: 'Master these. For each: the formula, what it tells you, a healthy Indian benchmark, and a relatable example.' },
      { t: 'component', name: 'metricsTable' },

      { t: 'h', text: 'How to read a dashboard & decide' },
      {
        t: 'list',
        ordered: true,
        items: [
          'Start with the goal metric (ROAS for sales, CPA for leads) — not vanity metrics.',
          'Read metrics together: a great CTR with a terrible conversion rate means the landing page is the problem, not the ad.',
          'Compare against benchmark and against your own trend (week-over-week).',
          'Segment by source/campaign/device to find what to scale and what to cut.',
          'Decide one change, implement, measure — never change everything at once.',
        ],
      },
      { t: 'callout', tone: 'tip', text: 'A metric in isolation lies. High clicks + low conversions = landing-page problem. High CPC + high ROAS = fine, keep spending. Always read the chain: impressions → clicks → conversions → revenue.' },
    ],
    keyTakeaway:
      'Analytics turns guessing into deciding. GA4 is event-based (users, sessions, engagement, key events). Tag campaigns with UTMs to attribute traffic. Master the metric chain — CPC, CPM, CTR, CPA, CAC, LTV, ROAS, ROI — and always read metrics together against benchmarks, never in isolation.',
    interview: [
      { q: 'Walk me through CTR, CPC, CPA and ROAS.', includes: ['CTR = clicks/impressions', 'CPC = cost/click', 'CPA = cost/conversion', 'ROAS = revenue/spend', 'how they relate in the chain'] },
      { q: 'What are UTM parameters used for?', includes: ['Tag URLs', 'attribute traffic to campaign/source/medium', 'measure ROI in analytics'] },
      { q: 'Your CTR is high but conversions are low — what is wrong?', includes: ['Ad is good but landing page/offer fails', 'message mismatch or friction', 'fix the page not the ad', 'read metrics together'] },
    ],
    connected: ['ch6', 'ch7', 'ch13'],
    flashcards: [
      { q: 'ROAS formula?', a: 'Revenue ÷ Ad Spend (e.g. ₹40,000 ÷ ₹10,000 = 4x).' },
      { q: 'CAC vs CPA?', a: 'CPA = cost per conversion (any goal); CAC = total cost to acquire a paying customer.' },
      { q: 'What do UTM tags do?', a: 'Attribute a visit to a specific campaign/source/medium in analytics.' },
      { q: 'Why never read a metric alone?', a: 'Each only tells part of the story; the chain (impressions→clicks→conversions→revenue) reveals the real problem.' },
    ],
    flipTerms: [
      { front: 'Engagement Rate', back: 'GA4: % of sessions that were "engaged".' },
      { front: 'Key Event', back: 'A GA4 event flagged as a conversion.' },
      { front: 'ROAS', back: 'Revenue ÷ Ad Spend — a ratio (4x).' },
      { front: 'UTM', back: 'URL tags for campaign attribution.' },
    ],
  },

  // ───────────────────────────── CHAPTER 13 ─────────────────────────────
  {
    id: 'ch13',
    num: 13,
    title: 'Marketing Automation & Tools',
    slug: 'automation-tools',
    icon: 'Workflow',
    color: 'blue',
    est: 8,
    summary: 'Doing more with less — automation, CRM, the tools map, retargeting tools and Tag Manager.',
    sections: [
      { t: 'h', text: 'What is marketing automation' },
      {
        t: 'layer1',
        body: '**Marketing automation** uses software to run repetitive marketing tasks and workflows automatically — triggered by user behaviour or time. Examples: a welcome email when someone signs up, a cart-recovery sequence, lead scoring, or auto-tagging contacts. It scales personalisation (the right message to the right person at the right time) without manual effort, and frees marketers to focus on strategy and creative.',
      },
      {
        t: 'layer2',
        brand: 'Swiggy',
        body: 'Swiggy automates lifecycle messaging: a welcome offer on signup, "you haven’t ordered in a while" win-back notifications, time-of-day push ("Lunch time? 50% off"), and abandoned-cart nudges — all triggered automatically by your behaviour and timing. No human sends these one by one; the system does, at millions of scale.',
      },
      {
        t: 'layer3',
        emoji: '☕',
        body: 'Socho ek dukaandaar har customer ko khud yaad rakhe — "Sharma ji ko har mahine atta khatam hota hai, unhe call karoon" — impossible hai 1000 customers ke saath. Ab socho ek assistant hai jo automatically har customer ko sahi waqt pe yaad dila de. Automation woh tireless assistant hai: ek baar rule set karo, woh hamesha sahi waqt pe sahi message bhejta rahega.',
      },

      { t: 'h', text: 'CRM basics' },
      { t: 'p', text: 'A **CRM** (Customer Relationship Management) stores every contact, their details and full interaction history in one place — so sales and marketing always know where each lead stands. It is the backbone automation and personalisation run on.' },

      { t: 'h', text: 'The tools map — who does what' },
      { t: 'diagram', name: 'toolsMap' },

      { t: 'h', text: 'Retargeting tools' },
      {
        t: 'list',
        items: [
          'Meta Pixel & Google Ads tag — build retargeting audiences from site visitors.',
          'Google Tag Manager — deploy all these tags without touching code repeatedly.',
          'CRM + ad platform sync — retarget or exclude based on customer status.',
        ],
      },

      { t: 'h', text: 'Tag Manager basics' },
      { t: 'p', text: '**Google Tag Manager (GTM)** is a container you place once on your site; then you add/edit all tracking tags (GA4, Pixel, conversion tags) through its dashboard — no developer needed each time. It keeps tracking organised and fast to update.' },
      { t: 'callout', tone: 'tip', text: 'Rule of thumb: GA4 measures, GTM deploys the trackers, the CRM stores the people, and automation tools act on them. Learn the category, not just one brand — tools change, the jobs don’t.' },
    ],
    keyTakeaway:
      'Automation runs behaviour-triggered workflows so personalisation scales without manual work. The CRM stores contacts and history; GA4 measures; Google Tag Manager deploys trackers; ad pixels build retargeting audiences. Learn what each category does — the specific brand matters less.',
    interview: [
      { q: 'What is marketing automation?', includes: ['Software runs repetitive tasks/workflows', 'triggered by behaviour/time', 'scales personalisation', 'frees up strategy time'] },
      { q: 'What does a CRM do?', includes: ['Stores contacts + interaction history', 'single source of truth', 'aligns sales & marketing', 'powers personalisation'] },
      { q: 'What is Google Tag Manager for?', includes: ['Container to manage all tags', 'deploy GA4/Pixel/conversion tags', 'no repeated dev work', 'organised tracking'] },
    ],
    connected: ['ch9', 'ch12', 'ch11'],
    flashcards: [
      { q: 'One-line definition of marketing automation?', a: 'Software that runs marketing workflows automatically based on triggers — scaling personalisation.' },
      { q: 'What does a CRM store?', a: 'Every contact’s details and full interaction history in one place.' },
      { q: 'What is GTM’s job?', a: 'Deploy and manage all tracking tags from one container without editing code each time.' },
    ],
    flipTerms: [
      { front: 'Workflow', back: 'An automated sequence of actions triggered by an event or time.' },
      { front: 'CRM', back: 'Customer Relationship Management software.' },
      { front: 'GTM', back: 'Google Tag Manager — central deployment of tracking tags.' },
    ],
  },

  // ───────────────────────────── CHAPTER 14 ─────────────────────────────
  {
    id: 'ch14',
    num: 14,
    title: 'Glossary',
    slug: 'glossary',
    icon: 'BookMarked',
    color: 'purple',
    est: 5,
    isGlossary: true,
    summary: 'Every key digital-marketing term in one searchable, A-Z reference.',
    sections: [
      { t: 'h', text: 'Searchable glossary' },
      { t: 'p', text: 'Search any term or jump by letter. These are the same definitions that power the hover-tooltips across the whole platform — revise them and you can answer almost any "what is X?" interview question instantly.' },
      { t: 'component', name: 'glossaryBrowser' },
    ],
    keyTakeaway:
      'Know the vocabulary cold. Interviewers test fundamentals with rapid "what is X?" questions — being fluent in these terms signals you actually understand the field.',
    interview: [
      { q: 'Define CPC, CPM and CTR.', includes: ['CPC = cost per click', 'CPM = cost per 1,000 impressions', 'CTR = clicks ÷ impressions'] },
      { q: 'What is the difference between reach and impressions?', includes: ['Reach = unique people', 'impressions = total times shown (can repeat)'] },
      { q: 'What is a conversion?', includes: ['A completed desired action', 'purchase/lead/signup', 'tracked goal'] },
    ],
    connected: ['ch1', 'ch6', 'ch12'],
    flashcards: [
      { q: 'Reach vs Impressions?', a: 'Reach = unique people; impressions = total views (one person can generate many).' },
      { q: 'CPM stands for?', a: 'Cost Per Mille — cost per 1,000 impressions.' },
      { q: 'What is a SERP?', a: 'Search Engine Results Page.' },
    ],
    flipTerms: [
      { front: 'CPM', back: 'Cost per 1,000 impressions.' },
      { front: 'CTR', back: 'Clicks ÷ impressions × 100.' },
      { front: 'Reach', back: 'Unique people who saw your content.' },
    ],
  },
]

export const chapterById = (id) => chapters.find((c) => c.id === id)

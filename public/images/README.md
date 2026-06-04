# Images used by the Theory Library

Anything dropped in `public/images/` is served at `/images/<file>` and can be
referenced from a chapter section like:

```js
{ t: 'image', src: '/images/serp-anatomy.svg',
  alt: '...', caption: '...', credit: 'Replica' }
```

## What's here

| File | Type | Notes |
|------|------|-------|
| `serp-anatomy.svg` | **Replica** | Hand-built annotated search-results page. No copyright risk, themeable, crisp at any zoom. |

## Adding the "few real shots"

The chapters reserve slots for real product screenshots where authenticity
matters (these are decided per the "replicas + a few real shots" plan). To add one:

1. Capture the screenshot yourself from a real account (you own that image),
   e.g. **Google Ads → Search terms report**, **Auction Insights**, or a
   **GA4 acquisition report**.
2. Save it here as a `.png` (e.g. `google-ads-search-terms.png`).
3. Reference it from the chapter with `{ t: 'image', src: '/images/google-ads-search-terms.png', ... , credit: 'Real screenshot' }`.

> Prefer screenshots from your own account over images pulled off the web —
> those are usually copyrighted and go stale when the product UI changes.

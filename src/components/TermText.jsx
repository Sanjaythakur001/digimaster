import { useMemo } from 'react'
import { glossaryMap } from '../data/glossary.js'

// Terms we auto-detect in body text. Longest first so multi-word terms win.
const TERMS = Object.keys(glossaryMap)
  .map((t) => t)
  .sort((a, b) => b.length - a.length)

// Build one regex that matches any known term as a whole word (case-insensitive).
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const TERM_RE = new RegExp(`\\b(${TERMS.map(escape).join('|')})\\b`, 'gi')

function Tooltip({ word }) {
  const def = glossaryMap[word.toLowerCase()]
  return (
    <span className="group relative dm-term whitespace-nowrap">
      {word}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 bottom-full z-50 mb-2 w-60 -translate-x-1/2
          rounded-xl border border-white/10 bg-navy-800 p-3 text-xs leading-relaxed text-slate-200
          opacity-0 shadow-glow transition-opacity duration-200 group-hover:opacity-100"
      >
        <span className="block font-semibold text-brand-blue mb-1">{word}</span>
        {def}
      </span>
    </span>
  )
}

// Renders a string, auto-linking glossary terms with hover tooltips.
// Also supports **bold** segments which themselves get term-scanned.
export default function TermText({ text, className = '' }) {
  const nodes = useMemo(() => parse(text), [text])
  return <span className={className}>{nodes}</span>
}

function parse(text) {
  if (!text) return null
  // First split on **bold**
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2)
      return (
        <strong key={i} className="font-semibold text-white">
          {linkTerms(inner, `b${i}`)}
        </strong>
      )
    }
    return <span key={i}>{linkTerms(part, `t${i}`)}</span>
  })
}

function linkTerms(str, keyPrefix) {
  const out = []
  let last = 0
  let m
  const seen = new Set()
  TERM_RE.lastIndex = 0
  while ((m = TERM_RE.exec(str)) !== null) {
    const word = m[0]
    const lower = word.toLowerCase()
    // Only the FIRST occurrence of each term in a string becomes a tooltip (avoid clutter)
    if (seen.has(lower)) continue
    seen.add(lower)
    if (m.index > last) out.push(str.slice(last, m.index))
    out.push(<Tooltip key={`${keyPrefix}-${m.index}`} word={word} />)
    last = m.index + word.length
  }
  if (last < str.length) out.push(str.slice(last))
  return out
}

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '../lib/icons.jsx'
import { nodes, edges, domains } from '../data/conceptMap.js'

const W = 1800
const H = 1200
const CX = W / 2
const CY = H / 2

const radiusFor = (size) => (size === 3 ? 40 : size === 2 ? 28 : 20)

// Deterministic pseudo-random (stable layout, no Math.random in init)
const rand = (s) => {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export default function ConceptGraph({ selectedId, onSelect, focusId, highlightDomain }) {
  const containerRef = useRef(null)
  const posRef = useRef(null)
  const [, force] = useState(0)
  const [view, setView] = useState({ x: 0, y: 0, k: 0.62 })
  const viewRef = useRef(view)
  const selectedRef = useRef(selectedId)
  const dragState = useRef(null)
  useEffect(() => { viewRef.current = view }, [view])
  useEffect(() => { selectedRef.current = selectedId }, [selectedId])

  // adjacency
  const adj = useMemo(() => {
    const m = new Map()
    nodes.forEach((n) => m.set(n.id, new Set()))
    edges.forEach(([a, b]) => { m.get(a)?.add(b); m.get(b)?.add(a) })
    return m
  }, [])

  const nodeById = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [])
  const domainOrder = useMemo(() => Object.keys(domains), [])

  // init positions (clustered by domain around a ring)
  if (!posRef.current) {
    const p = new Map()
    nodes.forEach((n, i) => {
      if (n.id === 'dm') { p.set(n.id, { x: CX, y: CY, vx: 0, vy: 0, fixed: false }); return }
      const di = domainOrder.indexOf(n.d)
      const ang = (di / domainOrder.length) * Math.PI * 2
      const ringR = 420
      const jitter = 120
      const cx = CX + Math.cos(ang) * ringR
      const cy = CY + Math.sin(ang) * ringR
      p.set(n.id, {
        x: cx + (rand(i + 1) - 0.5) * jitter,
        y: cy + (rand(i + 7) - 0.5) * jitter,
        vx: 0, vy: 0, fixed: false,
      })
    })
    posRef.current = p
  }

  // Run the whole force layout ONCE, synchronously — then it stays frozen.
  // No per-frame physics, so nothing drifts/jitters after settling.
  const relax = useCallback((iterations, pinnedId = null) => {
    const p = posRef.current
    const REP = 26000, SPRING = 0.012, LEN = 150, GRAV = 0.012, DOM = 0.006, DAMP = 0.82, MAXV = 24
    for (let it = 0; it < iterations; it++) {
      // repulsion
      for (let i = 0; i < nodes.length; i++) {
        const a = p.get(nodes[i].id)
        for (let j = i + 1; j < nodes.length; j++) {
          const b = p.get(nodes[j].id)
          let dx = a.x - b.x, dy = a.y - b.y
          let d2 = dx * dx + dy * dy || 0.01
          const d = Math.sqrt(d2)
          const f = REP / d2
          const fx = (dx / d) * f, fy = (dy / d) * f
          a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy
        }
      }
      // springs
      edges.forEach(([s, t]) => {
        const a = p.get(s), b = p.get(t)
        if (!a || !b) return
        let dx = b.x - a.x, dy = b.y - a.y
        const d = Math.sqrt(dx * dx + dy * dy) || 0.01
        const f = (d - LEN) * SPRING
        const fx = (dx / d) * f, fy = (dy / d) * f
        a.vx += fx; a.vy += fy; b.vx -= fx; b.vy -= fy
      })
      // gravity to centre + domain cohesion
      nodes.forEach((n) => {
        const a = p.get(n.id)
        a.vx += (CX - a.x) * GRAV
        a.vy += (CY - a.y) * GRAV
        const di = domainOrder.indexOf(n.d)
        const ang = (di / domainOrder.length) * Math.PI * 2
        const dcx = CX + Math.cos(ang) * 430, dcy = CY + Math.sin(ang) * 430
        if (n.id !== 'dm') { a.vx += (dcx - a.x) * DOM; a.vy += (dcy - a.y) * DOM }
      })
      // integrate (with damping + velocity clamp so it can never explode)
      nodes.forEach((n) => {
        const a = p.get(n.id)
        if (n.id === pinnedId || n.id === 'dm') { a.vx = 0; a.vy = 0; return }
        a.vx *= DAMP; a.vy *= DAMP
        a.vx = Math.max(-MAXV, Math.min(MAXV, a.vx))
        a.vy = Math.max(-MAXV, Math.min(MAXV, a.vy))
        a.x += a.vx; a.y += a.vy
      })
    }
    // zero out residual velocity so it sits perfectly still
    nodes.forEach((n) => { const a = p.get(n.id); a.vx = 0; a.vy = 0 })
  }, [domainOrder])

  // build the layout once on mount
  useEffect(() => {
    relax(500)
    force((v) => v + 1)
  }, [relax])

  // fit view on mount
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const k = Math.min(width / W, height / H) * 1.05
    setView({ k, x: width / 2 - CX * k, y: height / 2 - CY * k })
  }, [])

  // focus a node (centre it)
  useEffect(() => {
    if (!focusId) return
    const el = containerRef.current
    const a = posRef.current.get(focusId)
    if (!el || !a) return
    const { width, height } = el.getBoundingClientRect()
    setView((v) => ({ ...v, x: width / 2 - a.x * v.k, y: height / 2 - a.y * v.k }))
  }, [focusId])

  const screenToWorld = (clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect()
    const v = viewRef.current
    return { x: (clientX - rect.left - v.x) / v.k, y: (clientY - rect.top - v.y) / v.k }
  }

  // pan / drag handlers
  const onPointerDownBg = (e) => {
    dragState.current = { type: 'pan', sx: e.clientX, sy: e.clientY, ox: view.x, oy: view.y }
  }
  const onPointerDownNode = (e, id) => {
    e.stopPropagation()
    const w = screenToWorld(e.clientX, e.clientY)
    dragState.current = { type: 'node', id, sx: e.clientX, sy: e.clientY, moved: false, offx: w.x - posRef.current.get(id).x, offy: w.y - posRef.current.get(id).y }
    posRef.current.get(id).fixed = true
  }
  useEffect(() => {
    const onMove = (e) => {
      const ds = dragState.current
      if (!ds) return
      if (ds.type === 'pan') {
        setView((v) => ({ ...v, x: ds.ox + (e.clientX - ds.sx), y: ds.oy + (e.clientY - ds.sy) }))
      } else if (ds.type === 'node') {
        if (Math.abs(e.clientX - ds.sx) + Math.abs(e.clientY - ds.sy) > 4) ds.moved = true
        const w = screenToWorld(e.clientX, e.clientY)
        const a = posRef.current.get(ds.id)
        a.x = w.x - ds.offx; a.y = w.y - ds.offy; a.vx = 0; a.vy = 0
        force((v) => v + 1)
      }
    }
    const onUp = () => {
      const ds = dragState.current
      if (ds?.type === 'node') {
        if (!ds.moved) { onSelect(ds.id === selectedRef.current ? null : ds.id) }
        // keep node where dropped, but allow it to relax with the sim again
        const a = posRef.current.get(ds.id); a.fixed = false
      }
      dragState.current = null
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onWheel = (e) => {
    e.preventDefault()
    const rect = containerRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left, my = e.clientY - rect.top
    const factor = e.deltaY < 0 ? 1.12 : 0.89
    setView((v) => {
      const k = Math.min(2.2, Math.max(0.25, v.k * factor))
      const wx = (mx - v.x) / v.k, wy = (my - v.y) / v.k
      return { k, x: mx - wx * k, y: my - wy * k }
    })
  }

  const zoom = (factor) => {
    const el = containerRef.current
    const { width, height } = el.getBoundingClientRect()
    setView((v) => {
      const k = Math.min(2.2, Math.max(0.25, v.k * factor))
      const wx = (width / 2 - v.x) / v.k, wy = (height / 2 - v.y) / v.k
      return { k, x: width / 2 - wx * k, y: height / 2 - wy * k }
    })
  }
  const resetView = () => {
    const el = containerRef.current
    const { width, height } = el.getBoundingClientRect()
    const k = Math.min(width / W, height / H) * 1.05
    setView({ k, x: width / 2 - CX * k, y: height / 2 - CY * k })
  }

  const p = posRef.current
  const neighbors = selectedId ? adj.get(selectedId) : null
  const isDim = (id) => {
    if (selectedId) return id !== selectedId && !neighbors?.has(id)
    if (highlightDomain) return nodeById[id].d !== highlightDomain
    return false
  }
  const edgeActive = (a, b) => selectedId && (a === selectedId || b === selectedId)

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        onPointerDown={onPointerDownBg}
        onWheel={onWheel}
        className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none"
      >
        <div className="absolute top-0 left-0" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`, transformOrigin: '0 0', width: W, height: H }}>
          {/* edges */}
          <svg width={W} height={H} className="absolute top-0 left-0 overflow-visible pointer-events-none">
            <defs>
              <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={CX} cy={CY} r={520} fill="url(#bgGlow)" />
            {edges.map(([a, b], i) => {
              const pa = p.get(a), pb = p.get(b)
              if (!pa || !pb) return null
              const active = edgeActive(a, b)
              const dim = selectedId ? !active : highlightDomain ? (nodeById[a].d !== highlightDomain && nodeById[b].d !== highlightDomain) : false
              const col = domains[nodeById[active ? (a === selectedId ? b : a) : a].d].color
              return (
                <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                  stroke={active ? col : '#475569'}
                  strokeWidth={active ? 2.4 : 1}
                  strokeOpacity={dim ? 0.06 : active ? 0.9 : 0.18} />
              )
            })}
            {/* synapse signals on selected node's edges */}
            {selectedId && [...(neighbors || [])].map((nb, i) => {
              const pa = p.get(selectedId), pb = p.get(nb)
              if (!pa || !pb) return null
              const col = domains[nodeById[nb].d].color
              return (
                <motion.circle key={nb} r={4} fill={col}
                  initial={{ cx: pa.x, cy: pa.y }}
                  animate={{ cx: [pa.x, pb.x], cy: [pa.y, pb.y] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }} />
              )
            })}
          </svg>

          {/* nodes */}
          {nodes.map((n, i) => {
            const a = p.get(n.id)
            if (!a) return null
            const r = radiusFor(n.size)
            const col = domains[n.d].color
            const dim = isDim(n.id)
            const selected = n.id === selectedId
            const isNeighbor = neighbors?.has(n.id)
            // gentle, slow idle wobble — deterministic per node, a few px over several seconds
            const amp = 3 + rand(i * 3) * 3
            const durX = 6 + rand(i * 5) * 4
            const durY = 6 + rand(i * 7) * 4
            return (
              <motion.button
                key={n.id}
                onPointerDown={(e) => onPointerDownNode(e, n.id)}
                animate={{
                  scale: selected ? 1.18 : 1,
                  opacity: dim ? 0.22 : 1,
                  x: selected ? 0 : [0, amp, 0, -amp, 0],
                  y: selected ? 0 : [0, -amp, 0, amp, 0],
                }}
                transition={{
                  scale: { duration: 0.3 }, opacity: { duration: 0.3 },
                  x: { duration: durX, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: durY, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute rounded-full grid place-items-center cursor-pointer"
                style={{
                  left: a.x - r, top: a.y - r, width: r * 2, height: r * 2,
                  background: `radial-gradient(circle at 35% 30%, ${col}, ${col}22)`,
                  boxShadow: selected || isNeighbor ? `0 0 28px 2px ${col}aa` : `0 0 14px ${col}55`,
                  border: `2px solid ${selected ? '#fff' : col}`,
                  zIndex: selected ? 30 : isNeighbor ? 20 : 10,
                }}
              >
                {/* pulsing aura */}
                <motion.span className="absolute inset-0 rounded-full" style={{ border: `2px solid ${col}` }}
                  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: (i % 7) * 0.3 }} />
                <Icon name={n.icon} size={r * 0.8} color="#fff" strokeWidth={2} />
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap text-[11px] font-semibold text-slate-200"
                  style={{ textShadow: '0 1px 4px #000', opacity: dim ? 0.3 : 1 }}>
                  {n.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* zoom controls */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-2 z-40">
        <CtrlBtn onClick={() => zoom(1.2)}>+</CtrlBtn>
        <CtrlBtn onClick={() => zoom(0.83)}>−</CtrlBtn>
        <CtrlBtn onClick={resetView} title="Reset view"><span className="text-xs">⤢</span></CtrlBtn>
      </div>
    </div>
  )
}

function CtrlBtn({ children, ...props }) {
  return (
    <button {...props} className="w-10 h-10 grid place-items-center rounded-xl glass border border-white/15 text-lg font-bold text-slate-200 hover:bg-white/10 transition">
      {children}
    </button>
  )
}

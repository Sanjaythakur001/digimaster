import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { chapters } from '../data/chapters.js'
import { nodes as conceptNodes } from '../data/conceptMap.js'

const ProgressContext = createContext(null)

const STORAGE_KEY = 'digimaster_progress_v1'

const defaultState = {
  readChapters: [], // array of chapter ids
  exploredConcepts: [], // Neuro Map concept ids explored
  simulatorBestScore: 0,
  dailyGoal: null, // { chapterId, date }
  theme: 'dark',
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore quota errors */
    }
  }, [state])

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement
    if (state.theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [state.theme])

  const toggleChapter = useCallback((id) => {
    setState((s) => {
      const has = s.readChapters.includes(id)
      return {
        ...s,
        readChapters: has ? s.readChapters.filter((c) => c !== id) : [...s.readChapters, id],
      }
    })
  }, [])

  const markChapterRead = useCallback((id) => {
    setState((s) =>
      s.readChapters.includes(id) ? s : { ...s, readChapters: [...s.readChapters, id] }
    )
  }, [])

  const exploreConcept = useCallback((id) => {
    setState((s) =>
      s.exploredConcepts.includes(id) ? s : { ...s, exploredConcepts: [...s.exploredConcepts, id] }
    )
  }, [])

  const recordSimScore = useCallback((score) => {
    setState((s) => ({ ...s, simulatorBestScore: Math.max(s.simulatorBestScore, score) }))
  }, [])

  const setDailyGoal = useCallback((chapterId) => {
    const date = new Date().toISOString().slice(0, 10)
    setState((s) => ({ ...s, dailyGoal: { chapterId, date } }))
  }, [])

  const toggleTheme = useCallback(() => {
    setState((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))
  }, [])

  const resetProgress = useCallback(() => setState(defaultState), [])

  // Derived overall completion across all three parts
  const theoryPct = (state.readChapters.length / chapters.length) * 100
  const mapPct = (state.exploredConcepts.length / conceptNodes.length) * 100
  const simPct = state.simulatorBestScore // already 0-100
  const overallPct = Math.round(theoryPct * 0.5 + mapPct * 0.25 + simPct * 0.25)

  const value = {
    ...state,
    theoryPct: Math.round(theoryPct),
    mapPct: Math.round(mapPct),
    overallPct,
    isChapterRead: (id) => state.readChapters.includes(id),
    toggleChapter,
    markChapterRead,
    exploreConcept,
    recordSimScore,
    setDailyGoal,
    toggleTheme,
    resetProgress,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}

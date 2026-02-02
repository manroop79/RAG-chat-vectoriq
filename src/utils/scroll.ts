import { useEffect, useRef, useState } from 'react'

export const useAutoScroll = <T extends HTMLElement>(deps: unknown[]) => {
  const containerRef = useRef<T | null>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [isScrollable, setIsScrollable] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const threshold = 12
      const scrollable = container.scrollHeight > container.clientHeight + threshold
      const atBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < threshold
      setIsScrollable(scrollable)
      setIsAtBottom(atBottom || !scrollable)
    }

    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !isAtBottom) return
    container.scrollTop = container.scrollHeight
  }, [isAtBottom, ...deps])

  const scrollToBottom = () => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
  }

  return { containerRef, isAtBottom, isScrollable, scrollToBottom }
}


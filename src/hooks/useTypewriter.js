import { useEffect, useState } from 'react'

export function useTypewriter(text, { speed = 24, startDelay = 700 } = {}) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let index = 0
    let interval

    const timeout = setTimeout(() => {
      setDisplay('')
      interval = setInterval(() => {
        index += 1
        setDisplay(text.slice(0, index))
        if (index >= text.length) clearInterval(interval)
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return display
}

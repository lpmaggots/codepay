'use client'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  if(theme === 'dark') {
    return (
      <button
        type="button"
        onClick={() => setTheme('light')}
      >
        <FiMoon />
      </button>
    )
  }

  if(theme === 'light') {
    return (
      <button
        type="button"
        onClick={() => setTheme('dark')}
      >
        <FiSun />
      </button>
    )
  }

}
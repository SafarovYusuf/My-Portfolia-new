import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { languages } from '../data/languages'

export default function LanguageSwitcher({ className = '', variant = 'dropdown' }) {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = languages.find((lang) => lang.code === i18n.language) ?? languages[0]

  const handleSelect = (code) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1 ${className}`}>
        {languages.map((lang) => {
          const isActive = lang.code === current.code
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              aria-pressed={isActive}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase transition-colors ${
                isActive ? 'bg-accent text-white' : 'text-text-muted hover:text-accent'
              }`}
            >
              {lang.label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t('language.label')}
        aria-expanded={isOpen}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-text-muted transition-colors hover:border-accent hover:text-accent"
      >
        <Globe className="h-3.5 w-3.5" />
        {current.label}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-40 origin-top-right overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-xl shadow-black/20"
          >
            {languages.map((lang) => {
              const isActive = lang.code === current.code
              return (
                <li key={lang.code}>
                  <button
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      isActive ? 'bg-accent-soft text-accent' : 'text-text-muted hover:bg-surface-hover hover:text-text'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-8 text-xs font-semibold uppercase">{lang.label}</span>
                      <span>{lang.name}</span>
                    </span>
                    {isActive ? <Check className="h-3.5 w-3.5" /> : null}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

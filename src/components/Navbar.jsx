import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { navLinks } from '../data/nav'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar({ theme, toggleTheme }) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const sectionIds = ['home', ...navLinks.map((link) => link.id)]
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const NAV_OFFSET = 80

  const scrollToSection = (id) => (event) => {
    event.preventDefault()
    setIsOpen(false)
    // Closing the mobile menu unlocks body scroll via an effect, but that runs
    // asynchronously — reset it here too so the browser can scroll immediately.
    document.body.style.overflow = ''

    const target = document.getElementById(id)
    if (!target) return

    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg/80 backdrop-blur-lg border-b border-border shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          onClick={scrollToSection('home')}
          className="font-display text-lg font-bold tracking-tight text-text"
        >
          Yusuf<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id
            return (
              <li key={link.id} className="relative py-1">
                <a
                  href={link.href}
                  onClick={scrollToSection(link.id)}
                  className={`relative z-10 text-sm font-medium transition-colors ${
                    isActive ? 'text-accent' : 'text-text-muted hover:text-accent'
                  }`}
                >
                  {t(`nav.${link.id}`)}
                </a>
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <a
            href="#contact"
            onClick={scrollToSection('contact')}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-soft transition-transform hover:scale-105"
          >
            {t('nav.cta')}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-border bg-bg/95 backdrop-blur-lg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => {
                const isActive = activeId === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={scrollToSection(link.id)}
                      className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-surface hover:text-accent ${
                        isActive ? 'text-accent' : 'text-text-muted'
                      }`}
                    >
                      {t(`nav.${link.id}`)}
                    </a>
                  </li>
                )
              })}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={scrollToSection('contact')}
                  className="block rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  {t('nav.cta')}
                </a>
              </li>
              <li className="mt-3 flex justify-center border-t border-border pt-4">
                <LanguageSwitcher variant="inline" />
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

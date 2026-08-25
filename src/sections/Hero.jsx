import { motion } from 'framer-motion'
import { ArrowRight, Download, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import GithubIcon from '../components/icons/GithubIcon'
import LinkedinIcon from '../components/icons/LinkedinIcon'
import { useTypewriter } from '../hooks/useTypewriter'
import profileImage from '../assets/profile.jpg'

const EASE = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function Hero() {
  const { t } = useTranslation()
  const tagline = t('hero.tagline')
  const typedTagline = useTypewriter(tagline)

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_20%,transparent_100%)]" />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/30 blur-[120px] animate-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 right-0 h-96 w-96 rounded-full bg-accent-2/20 blur-[120px] animate-blob"
        style={{ animationDelay: '-6s' }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center"
      >
        <motion.div
          variants={item}
          className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-accent/40 bg-surface p-1 shadow-lg shadow-accent-soft sm:h-32 sm:w-32"
        >
          <img
            src={profileImage}
            alt="Safarov Yusuf"
            className="h-full w-full rounded-full object-cover"
          />
        </motion.div>

        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-text-muted"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {t('hero.badge')}
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {t('hero.greeting')} <span className="text-gradient">Safarov Yusuf</span>
        </motion.h1>

        <motion.p variants={item} className="font-display text-xl font-medium text-text-muted sm:text-2xl">
          {t('hero.role')} <span className="text-accent">/</span> {t('hero.stack')}
        </motion.p>

        <motion.p variants={item} className="max-w-xl text-base text-text-muted sm:text-lg">
          <span className="sr-only">{tagline}</span>
          <span aria-hidden="true">
            {typedTagline}
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-accent" />
          </span>
        </motion.p>

        <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-soft"
          >
            {t('hero.ctaProjects')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="/Safarov-Yusuf-CV.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-7 py-3 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
          >
            {t('hero.ctaCV')}
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </motion.a>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-5 pt-4">
          <a
            href="https://github.com/SafarovYusuf"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-text-muted transition-colors hover:text-accent"
          >
            <GithubIcon className="h-6 w-6" />
          </a>
          <a
            href="https://t.me/Safarov_000"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="text-text-muted transition-colors hover:text-accent"
          >
            <Send className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/yusuf-yusuf-uz"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon className="h-6 w-6" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

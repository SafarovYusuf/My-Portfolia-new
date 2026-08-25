import { ArrowUp, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import GithubIcon from './icons/GithubIcon'
import LinkedinIcon from './icons/LinkedinIcon'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-text-muted">
          &copy; {year} Safarov Yusuf. {t('footer.rights')}
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/SafarovYusuf"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-text-muted transition-colors hover:text-accent"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href="https://t.me/Safarov_000"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="text-text-muted transition-colors hover:text-accent"
          >
            <Send className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/yusuf-yusuf-uz"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={t('footer.backToTop')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

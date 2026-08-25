import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import RevealOnScroll from '../components/RevealOnScroll'
import SectionHeading from '../components/SectionHeading'
import GithubIcon from '../components/icons/GithubIcon'
import LinkedinIcon from '../components/icons/LinkedinIcon'

const CONTACT_EMAIL = 'safarovyusuf2003@gmail.com'

const contactItems = [
  { id: 'email', icon: Mail, value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { id: 'phone', icon: Phone, value: '+998 99 289 67 44', href: 'tel:+998992896744' },
  { id: 'telegram', icon: Send, value: '@Safarov_000', href: 'https://t.me/Safarov_000' },
  { id: 'github', icon: GithubIcon, value: 'github.com/SafarovYusuf', href: 'https://github.com/SafarovYusuf' },
  {
    id: 'linkedin',
    icon: LinkedinIcon,
    value: 'linkedin.com/in/yusuf-yusuf-uz',
    href: 'https://linkedin.com/in/yusuf-yusuf-uz',
  },
]

const STATUS = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' }

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(STATUS.IDLE)

  const isLoading = status === STATUS.LOADING

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isLoading) return

    setStatus(STATUS.LOADING)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || 'Request failed')
      }

      setStatus(STATUS.SUCCESS)
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus(STATUS.ERROR)
    }
  }

  return (
    <section id="contact" className="bg-bg-soft/50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          description={t('contact.description')}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-5 lg:gap-16">
          <RevealOnScroll delay={0.1} className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-text">{t('contact.location.title')}</p>
                <p className="text-xs text-text-muted">{t('contact.location.subtitle')}</p>
              </div>
            </div>

            {contactItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-text-muted">{t(`contact.items.${item.id}`)}</p>
                  <p className="text-sm font-semibold text-text">{item.value}</p>
                </div>
              </a>
            ))}
          </RevealOnScroll>

          <RevealOnScroll delay={0.2} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-text">{t('contact.form.name')}</span>
                  <input
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder={t('contact.form.namePlaceholder')}
                    className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent disabled:opacity-60"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-text">{t('contact.form.email')}</span>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder={t('contact.form.emailPlaceholder')}
                    className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent disabled:opacity-60"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-text">{t('contact.form.message')}</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent disabled:opacity-60"
                />
              </label>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={isLoading ? undefined : { scale: 1.05 }}
                whileTap={isLoading ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-soft disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    {t('contact.form.sending')}
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {t('contact.form.submit')}
                    <Send className="h-4 w-4" />
                  </>
                )}
              </motion.button>

              <AnimatePresence mode="wait">
                {status === STATUS.SUCCESS ? (
                  <motion.p
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-sm font-medium text-emerald-400"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    {t('contact.form.success')}
                  </motion.p>
                ) : null}
                {status === STATUS.ERROR ? (
                  <motion.p
                    key="error"
                    role="alert"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-sm font-medium text-red-400"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {t('contact.form.error')}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

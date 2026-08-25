import { Code2, GraduationCap, Server } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import RevealOnScroll from '../components/RevealOnScroll'
import SectionHeading from '../components/SectionHeading'

const highlights = [
  { id: 'apps', icon: Code2 },
  { id: 'mern', icon: Server },
  { id: 'learning', icon: GraduationCap },
]

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />

      <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
        <RevealOnScroll delay={0.1} className="lg:col-span-3">
          <p className="text-lg leading-relaxed text-text-muted">
            <Trans
              i18nKey="about.bio"
              components={{ b: <span className="font-semibold text-text" /> }}
            />
          </p>
        </RevealOnScroll>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          {highlights.map((highlight, index) => (
            <RevealOnScroll
              key={highlight.id}
              delay={0.15 + index * 0.08}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <highlight.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display font-semibold text-text">
                  {t(`about.highlights.${highlight.id}.title`)}
                </h3>
                <p className="mt-1 text-sm text-text-muted">
                  {t(`about.highlights.${highlight.id}.description`)}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

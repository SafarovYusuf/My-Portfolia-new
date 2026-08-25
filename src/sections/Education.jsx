import { GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import RevealOnScroll from '../components/RevealOnScroll'
import SectionHeading from '../components/SectionHeading'
import { educationIds, educationStatusKeys } from '../data/experience'

export default function Education() {
  const { t } = useTranslation()

  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow={t('education.eyebrow')} title={t('education.title')} />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {educationIds.map((id, index) => {
          const statusKey = educationStatusKeys[id]

          return (
            <RevealOnScroll
              key={id}
              delay={index * 0.1}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    statusKey === 'inProgress'
                      ? 'bg-accent-2/15 text-accent-2'
                      : 'bg-emerald-500/15 text-emerald-400'
                  }`}
                >
                  {t(`education.status.${statusKey}`)}
                </span>
              </div>
              <div>
                <h3 className="font-display font-semibold text-text">
                  {t(`education.items.${id}.degree`)}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">{t(`education.items.${id}.place`)}</p>
                <p className="mt-1 text-sm text-text-muted">{t(`education.items.${id}.period`)}</p>
              </div>
            </RevealOnScroll>
          )
        })}
      </div>
    </section>
  )
}

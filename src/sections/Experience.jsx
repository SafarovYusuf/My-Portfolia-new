import { Briefcase } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import RevealOnScroll from '../components/RevealOnScroll'
import SectionHeading from '../components/SectionHeading'
import { experienceIds } from '../data/experience'

export default function Experience() {
  const { t } = useTranslation()

  return (
    <section id="experience" className="bg-bg-soft/50 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow={t('experience.eyebrow')} title={t('experience.title')} />

        <div className="relative mt-12 pl-8">
          <div className="absolute top-2 bottom-2 left-[9px] w-px bg-border" />

          <div className="flex flex-col gap-10">
            {experienceIds.map((id, index) => (
              <RevealOnScroll key={id} delay={index * 0.1} className="relative">
                <span className="absolute -left-8 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-bg-soft">
                  <Briefcase className="h-2.5 w-2.5 text-accent" />
                </span>

                <div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-text">
                      {t(`experience.items.${id}.role`)}
                    </h3>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-text-muted">
                      {t(`experience.items.${id}.period`)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">{t(`experience.items.${id}.place`)}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {t(`experience.items.${id}.description`)}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

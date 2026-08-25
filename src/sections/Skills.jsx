import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import RevealOnScroll from '../components/RevealOnScroll'
import SectionHeading from '../components/SectionHeading'
import { skillGroups } from '../data/skills'

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="bg-bg-soft/50 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t('skills.eyebrow')}
          title={t('skills.title')}
          description={t('skills.description')}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <RevealOnScroll
              key={group.id}
              delay={index * 0.1}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <group.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-text">
                {t(`skills.categories.${group.id}`)}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <motion.li
                    key={skill}
                    whileHover={{ scale: 1.08, rotate: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="cursor-default rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

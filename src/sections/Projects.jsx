import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import RevealOnScroll from '../components/RevealOnScroll'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        description={t('projects.description')}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const title = t(`projects.items.${project.id}.title`)

          return (
            <RevealOnScroll
              key={project.id}
              delay={(index % 3) * 0.1}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,box-shadow] duration-300 ease-out hover:border-accent/50 hover:shadow-2xl hover:shadow-accent-soft"
            >
              <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br from-accent/20 via-bg-soft to-accent-2/10">
                <span className="font-display text-3xl font-bold text-text/20 transition-transform duration-500 ease-out group-hover:scale-125 group-hover:rotate-2">
                  {title
                    .split(' ')
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join('')}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-text">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                  {t(`projects.items.${project.id}.description`)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-text transition-colors hover:text-accent"
                >
                  {project.linkLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </RevealOnScroll>
          )
        })}
      </div>
    </section>
  )
}

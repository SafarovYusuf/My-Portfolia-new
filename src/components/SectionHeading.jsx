import RevealOnScroll from './RevealOnScroll'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <RevealOnScroll className={`flex flex-col gap-3 max-w-2xl ${alignment}`}>
      <span className="font-display text-sm font-semibold tracking-widest uppercase text-accent">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-text">{title}</h2>
      {description ? <p className="text-text-muted text-base sm:text-lg leading-relaxed">{description}</p> : null}
    </RevealOnScroll>
  )
}

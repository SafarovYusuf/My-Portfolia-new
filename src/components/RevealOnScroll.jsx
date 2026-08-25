import { motion } from 'framer-motion'

export default function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  y = 24,
  as: Component = motion.div,
  ...motionProps
}) {
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...motionProps}
    >
      {children}
    </Component>
  )
}

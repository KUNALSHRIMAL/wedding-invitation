import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({
  children,
  className = '',
  delay = 0,
  distance = 28,
  as = 'div',
  once = true,
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      {...props}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18 }}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}

export function SectionHeading({ eyebrow, title, copy, tone = 'dark', id }) {
  return (
    <Reveal className={`section-heading section-heading--${tone}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      <div className="heading-flourish" aria-hidden="true">
        <span />
        <i>✦</i>
        <span />
      </div>
      {copy && <p className="section-heading__copy">{copy}</p>}
    </Reveal>
  )
}

export function FloralDivider({ light = false }) {
  return (
    <div className={`floral-divider${light ? ' floral-divider--light' : ''}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 74 24" role="presentation">
        <path d="M37 21c-5-7-13-8-18-4 2-6 7-9 14-8-3-4-2-7 4-9 6 2 7 5 4 9 7-1 12 2 14 8-5-4-13-3-18 4Z" />
        <path d="M26 12c-6 0-11-2-16-7M48 12c6 0 11-2 16-7" />
      </svg>
      <span />
    </div>
  )
}

export function PetalField({ count = 16, subtle = false }) {
  return (
    <div className={`petal-field${subtle ? ' petal-field--subtle' : ''}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={{
            '--petal-x': `${(index * 37 + 9) % 100}%`,
            '--petal-delay': `${-((index * 1.7) % 14)}s`,
            '--petal-duration': `${10 + (index % 6) * 1.8}s`,
            '--petal-drift': `${index % 2 ? 52 : -44}px`,
            '--petal-size': `${7 + (index % 4) * 2}px`,
          }}
        />
      ))}
    </div>
  )
}

export function CornerOrnaments({ light = false }) {
  return (
    <div className={`corner-ornaments${light ? ' corner-ornaments--light' : ''}`} aria-hidden="true">
      <span className="corner corner--tl" />
      <span className="corner corner--tr" />
      <span className="corner corner--bl" />
      <span className="corner corner--br" />
    </div>
  )
}

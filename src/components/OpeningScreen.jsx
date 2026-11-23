import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { CornerOrnaments, FloralDivider, PetalField } from './InvitationUI'

export default function OpeningScreen({ data, isOpen, onOpen, onComplete }) {
  const reduceMotion = useReducedMotion()
  const { couple, wedding, opening, images, features } = data

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isOpen && (
        <motion.div
          className="opening-screen"
          role="dialog"
          aria-modal="true"
          aria-labelledby="opening-title"
          initial={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 1.035, filter: 'blur(8px)' }
          }
          transition={{ duration: reduceMotion ? 0.1 : 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            className="opening-screen__image"
            src={images.hero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            initial={reduceMotion ? false : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5, ease: 'easeOut' }}
          />
          <div className="opening-screen__veil" />
          {features.showFloatingPetals && <PetalField count={18} />}

          <motion.div
            className="invitation-cover"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CornerOrnaments light />
            <div className="invitation-cover__monogram" aria-hidden="true">
              {couple.bride.firstName.charAt(0)}
              <span>✦</span>
              {couple.groom.firstName.charAt(0)}
            </div>
            <p className="invitation-cover__eyebrow">{opening.eyebrow}</p>
            <FloralDivider light />
            <p className="invitation-cover__title" id="opening-title">
              {opening.title}
            </p>
            <div className="invitation-cover__names" role="heading" aria-level="2">
              <span>{couple.bride.firstName}</span>
              <i>&amp;</i>
              <span>{couple.groom.firstName}</span>
            </div>
            <p className="invitation-cover__date">{wedding.shortDate}</p>
            <button className="open-invitation-button" type="button" onClick={onOpen} autoFocus>
              <Sparkles size={17} strokeWidth={1.5} aria-hidden="true" />
              <span>{opening.buttonLabel}</span>
            </button>
            <p className="invitation-cover__note">{opening.note}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

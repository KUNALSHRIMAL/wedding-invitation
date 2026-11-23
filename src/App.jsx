import { useEffect, useMemo, useRef, useState } from 'react'
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import OpeningScreen from './components/OpeningScreen'
import {
  ClosingSection,
  CountdownSection,
  EventsSection,
  FamilyInvitation,
  HeroSection,
  RSVPSection,
  SiteHeader,
  StorySection,
  VenueSection,
} from './components/WeddingInvitation'
import weddingData from './data/weddingData'

function App() {
  const [invitationOpen, setInvitationOpen] = useState(false)
  const mainRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 })

  const themeStyle = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(weddingData.theme).map(([name, value]) => [`--${name}`, value]),
      ),
    [],
  )

  useEffect(() => {
    document.body.classList.toggle('invitation-locked', !invitationOpen)
    return () => document.body.classList.remove('invitation-locked')
  }, [invitationOpen])

  const handleOpeningComplete = () => {
    mainRef.current?.focus({ preventScroll: true })
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="invitation-app" style={themeStyle}>
        <OpeningScreen
          data={weddingData}
          isOpen={invitationOpen}
          onOpen={() => setInvitationOpen(true)}
          onComplete={handleOpeningComplete}
        />

        <div
          className="invitation-site"
          aria-hidden={!invitationOpen}
          inert={invitationOpen ? undefined : ''}
        >
          <a className="skip-link" href="#main-content">Skip to invitation content</a>
          <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
          <SiteHeader data={weddingData} />

          <main id="main-content" ref={mainRef} tabIndex="-1">
            <HeroSection data={weddingData} />
            <CountdownSection data={weddingData} />
            <EventsSection data={weddingData} />
            <StorySection data={weddingData} />
            <FamilyInvitation data={weddingData} />
            <VenueSection data={weddingData} />
            <RSVPSection data={weddingData} />
          </main>

          <ClosingSection data={weddingData} />
        </div>
      </div>
    </MotionConfig>
  )
}

export default App

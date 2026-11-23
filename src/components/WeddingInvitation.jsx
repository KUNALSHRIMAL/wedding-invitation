import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CalendarDays,
  Clock3,
  Flower2,
  GlassWater,
  Heart,
  MapPin,
  Music2,
  Navigation,
  Send,
  Sparkles,
  SunMedium,
  Users,
} from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  CornerOrnaments,
  FloralDivider,
  PetalField,
  Reveal,
  SectionHeading,
} from './InvitationUI'

const eventIcons = {
  Sparkles,
  Sun: SunMedium,
  Music2,
  Heart,
  GlassWater,
}

const calculateTimeLeft = (dateTime) => {
  const target = new Date(dateTime).getTime()
  const difference = target - Date.now()

  if (!Number.isFinite(target) || difference <= 0) {
    return { complete: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    complete: false,
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  }
}

export function SiteHeader({ data }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="site-header__monogram" href="#home" aria-label="Back to the invitation top">
        {data.couple.bride.firstName.charAt(0)}
        <i>✦</i>
        {data.couple.groom.firstName.charAt(0)}
      </a>

      <button
        type="button"
        className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
        aria-expanded={menuOpen}
        aria-controls="invitation-navigation"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav
        id="invitation-navigation"
        className={`site-navigation${menuOpen ? ' is-open' : ''}`}
        aria-label="Invitation navigation"
      >
        <a href="#events" onClick={closeMenu}>Celebrations</a>
        {data.features.showStory && <a href="#story" onClick={closeMenu}>Our story</a>}
        <a href="#venue" onClick={closeMenu}>Venue</a>
        <a className="nav-rsvp" href="#rsvp" onClick={closeMenu}>RSVP</a>
      </nav>
    </header>
  )
}

export function HeroSection({ data }) {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '13%'])

  return (
    <section className="hero-section" id="home" ref={sectionRef} aria-labelledby="hero-title">
      <motion.img
        className="hero-section__image"
        src={data.images.hero}
        alt={data.images.heroAlt}
        fetchPriority="high"
        style={{ y: reduceMotion ? 0 : imageY }}
      />
      <div className="hero-section__overlay" />
      {data.features.showFloatingPetals && <PetalField count={13} subtle />}
      <CornerOrnaments light />

      <div className="hero-section__content shell">
        <motion.p
          className="hero-section__eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.15 }}
        >
          {data.hero.eyebrow}
        </motion.p>
        <motion.h1
          className="hero-section__names"
          id="hero-title"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{data.couple.bride.firstName}</span>
          <i>&amp;</i>
          <span>{data.couple.groom.firstName}</span>
        </motion.h1>
        <FloralDivider light />
        <motion.p
          className="hero-section__date"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.45 }}
        >
          {data.wedding.displayDate}
          <span aria-hidden="true">•</span>
          {data.wedding.time}
        </motion.p>
        <motion.p
          className="hero-section__message"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.55 }}
        >
          {data.hero.invitationMessage}
        </motion.p>
      </div>

      <a className="scroll-cue" href="#countdown" aria-label="Continue to wedding countdown">
        <span>Discover our celebration</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
}

export function CountdownSection({ data }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(data.wedding.dateTime))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(data.wedding.dateTime))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [data.wedding.dateTime])

  const units = [
    ['days', timeLeft.days],
    ['hours', timeLeft.hours],
    ['minutes', timeLeft.minutes],
    ['seconds', timeLeft.seconds],
  ]

  return (
    <section className="countdown-section paper-section" id="countdown" aria-labelledby="countdown-title">
      <div className="mandala-watermark" aria-hidden="true">✦</div>
      <div className="shell shell--narrow">
        <SectionHeading
          id="countdown-title"
          eyebrow="Save the date"
          title="Until we say I do"
          copy={data.wedding.displayDate}
        />

        {timeLeft.complete ? (
          <Reveal className="countdown-complete" role="status">
            Our forever has begun. Thank you for being part of our celebration.
          </Reveal>
        ) : (
          <Reveal className="countdown" aria-label="Time remaining until the wedding">
            {units.map(([label, value]) => (
              <div className="countdown__unit" key={label}>
                <span className="countdown__number-wrap" aria-live={label === 'seconds' ? 'off' : undefined}>
                  <motion.b
                    key={value}
                    initial={{ opacity: 0.45, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {String(value).padStart(2, '0')}
                  </motion.b>
                </span>
                <small>{label}</small>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}

export function EventsSection({ data }) {
  return (
    <section className="events-section" id="events" aria-labelledby="events-title">
      <div className="shell">
        <SectionHeading
          id="events-title"
          eyebrow="A celebration in five chapters"
          title="Wedding festivities"
          copy="Come for the rituals, stay for the laughter, and leave with memories to cherish."
        />

        <div className="event-timeline">
          <div className="event-timeline__rail" aria-hidden="true" />
          {data.events.map((event, index) => {
            const Icon = eventIcons[event.icon] || Flower2

            return (
              <Reveal
                className={`event-row${event.featured ? ' event-row--featured' : ''}`}
                delay={Math.min(index * 0.06, 0.24)}
                key={event.id}
              >
                <div className="event-row__date" aria-hidden="true">
                  <span>{event.date.split(',')[0]}</span>
                  <small>{event.date.split(',').slice(1).join(',').trim()}</small>
                </div>
                <div className="event-row__marker">
                  <Icon size={20} strokeWidth={1.45} aria-hidden="true" />
                </div>
                <article className="event-row__content">
                  <p className="event-row__index">0{index + 1}</p>
                  <h3>{event.name}</h3>
                  <p className="event-row__mobile-date">{event.date}</p>
                  <div className="event-row__meta">
                    <span><Clock3 size={15} aria-hidden="true" />{event.time}</span>
                    <span><MapPin size={15} aria-hidden="true" />{event.venue}</span>
                  </div>
                  <p className="event-row__description">{event.description}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function StorySection({ data }) {
  if (!data.features.showStory || !data.story.enabled) return null

  return (
    <section className="story-section paper-section" id="story" aria-labelledby="story-title">
      <div className="story-section__flower" aria-hidden="true">❦</div>
      <div className="shell story-layout">
        <Reveal className="story-portrait" distance={18}>
          <div className="story-portrait__mat">
            <img
              src={data.images.story}
              alt={data.images.storyAlt}
              loading="lazy"
              decoding="async"
              width="1024"
              height="1536"
            />
          </div>
          <span className="story-portrait__caption">Meera &amp; Aarav · Jaipur</span>
        </Reveal>

        <div className="story-copy">
          <SectionHeading id="story-title" eyebrow={data.story.eyebrow} title={data.story.title} />
          <Reveal as="p" className="story-copy__intro" delay={0.08}>
            {data.story.introduction}
          </Reveal>
          <Reveal as="blockquote" className="story-quote" delay={0.12}>
            “{data.story.quote}”
          </Reveal>

          {data.features.showStoryTimeline && (
            <div className="story-moments">
              {data.story.moments.map((moment, index) => (
                <Reveal className="story-moment" key={moment.year} delay={0.1 + index * 0.06}>
                  <span>{moment.year}</span>
                  <div>
                    <h3>{moment.title}</h3>
                    <p>{moment.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function FamilyInvitation({ data }) {
  return (
    <section className="family-section" aria-labelledby="family-title">
      <div className="shell shell--narrow">
        <Reveal className="family-letter">
          <CornerOrnaments />
          <p className="eyebrow">From our families, with love</p>
          <h2 id="family-title">Your presence is our blessing</h2>
          <FloralDivider />
          <p className="family-letter__message">{data.families.invitation}</p>
          <p className="family-letter__signoff">{data.families.signOff}</p>
          <div className="family-letter__names">
            <span>{data.families.brideFamily}</span>
            <i>&amp;</i>
            <span>{data.families.groomFamily}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function VenueSection({ data }) {
  return (
    <section className="venue-section" id="venue" aria-labelledby="venue-title">
      <div className="venue-section__map-lines" aria-hidden="true" />
      <div className="venue-section__glow" aria-hidden="true" />
      <div className="shell venue-layout">
        <Reveal className="venue-pin" distance={16}>
          <div className="venue-pin__ring">
            <MapPin size={38} strokeWidth={1.2} aria-hidden="true" />
          </div>
          <span>{data.venue.area}</span>
        </Reveal>

        <div className="venue-copy">
          <SectionHeading id="venue-title" eyebrow={data.venue.eyebrow} title={data.venue.name} tone="light" />
          <Reveal as="p" className="venue-copy__address" delay={0.08}>
            {data.venue.address}
          </Reveal>
          <Reveal className="venue-copy__details" delay={0.12}>
            <span><CalendarDays size={18} aria-hidden="true" />{data.wedding.displayDate}</span>
            <span><Clock3 size={18} aria-hidden="true" />{data.wedding.time}</span>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              className="button button--gold"
              href={data.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation size={18} aria-hidden="true" />
              Get directions
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function RSVPSection({ data }) {
  const [form, setForm] = useState({
    name: '',
    guests: '2',
    attendance: 'Joyfully attending',
    message: '',
  })
  const [status, setStatus] = useState('')

  const phoneNumber = useMemo(
    () => data.rsvp.whatsappNumber.replace(/\D/g, ''),
    [data.rsvp.whatsappNumber],
  )

  const genericWhatsAppUrl = useMemo(() => {
    const greeting = `Namaste! I am responding to ${data.couple.bride.firstName} & ${data.couple.groom.firstName}'s wedding invitation.`
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(greeting)}`
  }, [data.couple.bride.firstName, data.couple.groom.firstName, phoneNumber])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const guestCount = form.attendance === 'Unable to attend' ? '0' : form.guests
    const lines = [
      `Namaste! RSVP for ${data.couple.bride.firstName} & ${data.couple.groom.firstName}`,
      '',
      `Guest name: ${form.name.trim()}`,
      `Attendance: ${form.attendance}`,
      `Number of guests: ${guestCount}`,
    ]

    if (form.message.trim()) lines.push(`Message: ${form.message.trim()}`)

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(lines.join('\n'))}`
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    setStatus(
      newWindow
        ? 'Your RSVP is ready in WhatsApp. Please tap Send there to confirm.'
        : 'Your browser blocked WhatsApp. Use the direct message link below.',
    )
  }

  return (
    <section className="rsvp-section paper-section" id="rsvp" aria-labelledby="rsvp-title">
      <div className="shell rsvp-layout">
        <div className="rsvp-intro">
          <SectionHeading
            id="rsvp-title"
            eyebrow="Répondez s’il vous plaît"
            title="Will you join us?"
            copy={data.rsvp.deadline}
          />
          <Reveal as="p" className="rsvp-intro__note">
            Your reply opens directly in WhatsApp—no account, password or form submission required.
          </Reveal>
          <Reveal className="rsvp-intro__ornament" aria-hidden="true">M <i>&amp;</i> A</Reveal>
        </div>

        <Reveal as="form" className="rsvp-form" onSubmit={handleSubmit}>
          <div className="form-field form-field--wide">
            <label htmlFor="guest-name">Your name</label>
            <input
              id="guest-name"
              name="name"
              type="text"
              value={form.name}
              onChange={updateField}
              autoComplete="name"
              placeholder="How should we address you?"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="attendance">Can you attend?</label>
            <select id="attendance" name="attendance" value={form.attendance} onChange={updateField} required>
              <option>Joyfully attending</option>
              <option>Unable to attend</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="guest-count">Number of guests</label>
            <div className="input-with-icon">
              <Users size={18} aria-hidden="true" />
              <input
                id="guest-count"
                name="guests"
                type="number"
                min="1"
                max="10"
                inputMode="numeric"
                value={form.guests}
                onChange={updateField}
                disabled={form.attendance === 'Unable to attend'}
                required={form.attendance !== 'Unable to attend'}
              />
            </div>
          </div>

          <div className="form-field form-field--wide">
            <label htmlFor="guest-message">A note for the couple <span>(optional)</span></label>
            <textarea
              id="guest-message"
              name="message"
              rows="3"
              value={form.message}
              onChange={updateField}
              placeholder="Share a blessing or a little message…"
            />
          </div>

          <button className="button button--burgundy form-submit" type="submit">
            <Send size={18} aria-hidden="true" />
            Send RSVP on WhatsApp
          </button>
          <p className="form-status" aria-live="polite">{status}</p>
          <a className="direct-message-link" href={genericWhatsAppUrl} target="_blank" rel="noopener noreferrer">
            Prefer to message us directly?
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export function ClosingSection({ data }) {
  return (
    <footer className="closing-section" aria-labelledby="closing-title">
      <img className="closing-section__image" src={data.images.hero} alt="" aria-hidden="true" loading="lazy" />
      <div className="closing-section__overlay" />
      {data.features.showFloatingPetals && <PetalField count={10} subtle />}
      <div className="shell closing-section__content">
        <Reveal>
          <Sparkles className="closing-section__sparkle" size={26} strokeWidth={1.1} aria-hidden="true" />
          <p className="eyebrow">{data.closing.eyebrow}</p>
          <h2 id="closing-title">{data.closing.message}</h2>
          <FloralDivider light />
          <p className="closing-section__names">
            {data.couple.bride.firstName} <i>&amp;</i> {data.couple.groom.firstName}
          </p>
          <p className="closing-section__date">{data.wedding.displayDate}</p>
          <p className="closing-section__blessing">{data.closing.blessing}</p>
        </Reveal>
      </div>
      <p className="closing-section__credit">Made with love for a beautiful beginning</p>
    </footer>
  )
}

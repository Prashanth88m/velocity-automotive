import { useEffect, useRef, useState } from 'react'
import './App.css'

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>
}

function TechnologyIcon({ type }) {
  const paths = {
    powertrain: <><path d="M12 2 5.5 12h5L10 22l6.5-10h-5L12 2Z" /><path d="M3 17.5v2.5h18v-2.5" /></>,
    interface: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 22h8M12 18v4M7 10h3M14 10h3M10 14h4" /></>,
    connected: <><path d="M5 17.5a9.9 9.9 0 0 1 14 0M8 14.5a5.7 5.7 0 0 1 8 0M11 11.5a1.4 1.4 0 0 1 2 0M12 20h.01" /></>,
  }

  return <svg className="technology__icon" viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>
}

function App() {
  const heroVideoRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return undefined

    const mediaErrorNames = {
      1: 'MEDIA_ERR_ABORTED',
      2: 'MEDIA_ERR_NETWORK',
      3: 'MEDIA_ERR_DECODE',
      4: 'MEDIA_ERR_SRC_NOT_SUPPORTED',
    }

    const logMediaEvent = (event) => {
      if (event.type === 'error') {
        const error = video.error
        console.error('[VELOCITY hero video] error', {
          code: error?.code ?? null,
          name: mediaErrorNames[error?.code] ?? 'Unknown media error',
          message: error?.message ?? 'The browser did not provide a media error message.',
        })
        return
      }

      console.info(`[VELOCITY hero video] ${event.type}`, {
        currentTime: video.currentTime,
        readyState: video.readyState,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      })
    }

    const events = ['loadedmetadata', 'canplay', 'playing', 'error']
    events.forEach((eventName) => video.addEventListener(eventName, logMediaEvent))

    video.muted = true
    video.play().catch((error) => {
      console.error('[VELOCITY hero video] play() was rejected', error)
    })

    return () => events.forEach((eventName) => video.removeEventListener(eventName, logMediaEvent))
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const closeMenuOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', closeMenuOnEscape)
    return () => window.removeEventListener('keydown', closeMenuOnEscape)
  }, [isMenuOpen])

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <video ref={heroVideoRef} className="hero__video" autoPlay muted loop playsInline preload="metadata" poster="/velocity-background.png" aria-hidden="true">
          <source src="/velocity-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__image" aria-hidden="true" />
        <div className="hero__atmosphere" aria-hidden="true" />
        <header className="navigation">
          <a className="brand" href="#top" aria-label="Velocity home">VELOCITY<span className="brand__mark">®</span></a>
          <nav id="primary-navigation" className={isMenuOpen ? 'is-open' : ''} aria-label="Primary navigation"><a href="#design" onClick={() => setIsMenuOpen(false)}>Design</a><a href="#performance" onClick={() => setIsMenuOpen(false)}>Performance</a><a href="#technology" onClick={() => setIsMenuOpen(false)}>Technology</a></nav>
          <button className="menu-button" type="button" aria-controls="primary-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setIsMenuOpen((isOpen) => !isOpen)}><span /><span /></button>
        </header>
        <div className="hero__content" id="top">
          <p className="eyebrow"><span /> Mission 01 / 2026</p>
          <h1 id="hero-title">Beyond<br />the drive.</h1>
          <p className="hero__subtitle">Engineered for a new dimension.</p>
          <a className="button" href="#design">Discover the machine <ArrowIcon /></a>
        </div>
        <div className="hero__details" aria-label="Vehicle details"><span>V-01</span><span>Electric hyper GT</span><span>Edition one</span></div>
        <a className="scroll-indicator" href="#design" aria-label="Scroll to discover more"><span>Scroll to explore</span><i /></a>
      </section>
      <section className="intro section" id="design">
        <p className="section-label">01 / Design</p>
        <div><p className="section-kicker">Sculpted by air.</p><h2>A silhouette that moves before it starts.</h2><a className="text-link" href="#performance">Explore the form <ArrowIcon /></a></div>
      </section>
      <section className="specs section" id="performance">
        <p className="section-label">02 / Performance</p>
        <div className="spec-grid"><article><strong>1,480</strong><span>horsepower</span></article><article><strong>2.1<small>s</small></strong><span>0—100 km/h</span></article><article><strong>420<small>km</small></strong><span>electric range</span></article></div>
      </section>
      <section className="technology section" id="technology" aria-labelledby="technology-title">
        <div className="technology__intro">
          <p className="section-label">03 / Technology</p>
          <div>
            <p className="section-kicker">A quieter kind of power.</p>
            <h2 id="technology-title">Intelligence, expressed in motion.</h2>
            <p className="technology__lede">Velocity brings power, information, and connection into one focused driving environment—designed around the human behind the wheel.</p>
          </div>
        </div>
        <div className="technology__grid">
          <article className="technology__card">
            <TechnologyIcon type="powertrain" />
            <p className="technology__index">01 / Power</p>
            <h3>Electric powertrain</h3>
            <p>Instant response is shaped into a composed, deliberate drive through a fully electric architecture.</p>
          </article>
          <article className="technology__card">
            <TechnologyIcon type="interface" />
            <p className="technology__index">02 / Interface</p>
            <h3>Intelligent driver interface</h3>
            <p>Essential information stays in view, while the cabin remains focused on the road ahead.</p>
          </article>
          <article className="technology__card">
            <TechnologyIcon type="connected" />
            <p className="technology__index">03 / Connection</p>
            <h3>Connected vehicle technology</h3>
            <p>A considered digital layer keeps the vehicle, the journey, and your preferences in sync.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App

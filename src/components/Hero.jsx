import { useState } from "react";
import russiaFlag from "../assets/russia.svg";
import uzbekistanFlag from "../assets/uzbekistan.svg";
import useMagnetic from "../hooks/useMagnetic";
import useTilt from "../hooks/useTilt";
import "./Hero.css";

function Hero() {
  const [isFlipped, setIsFlipped] = useState(false);
  const primaryCtaRef = useMagnetic({ strength: 0.25, radius: 110 });
  const flashcardRef = useTilt({ max: 10, scale: 1.02 });

  return (
    <section className="hero" id="hero" data-testid="hero">
      <div className="hero__aurora" aria-hidden="true">
        <span className="hero__blob hero__blob--1" />
        <span className="hero__blob hero__blob--2" />
        <span className="hero__blob hero__blob--3" />
      </div>

      <div className="hero__grid container">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow" data-testid="hero-eyebrow">
            Medical English Platform
          </p>

          <h1 className="hero__title">
            Learn Medical English Like a{" "}
            <span className="gradient-text">Clinical Professional</span>
          </h1>

          <p className="hero__subheadline">
            MedLingo is an AI-powered Medical English learning platform designed for Uzbek and
            Russian-speaking medical students and healthcare professionals.
          </p>

          <div className="hero__actions">
            <a
              ref={primaryCtaRef}
              className="btn-primary"
              href="#waitlist"
              data-testid="hero-cta-waitlist"
            >
              Join the Waitlist
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a className="btn-secondary" href="#modules" data-testid="hero-cta-modules">
              See the Modules
            </a>
          </div>

          <div className="hero__proof" data-testid="hero-proof">
            <span className="hero__proof-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            </span>
            <span>Medically reviewed · <strong>52</strong> modules · <strong>7</strong> activity types</span>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__flashcard-shell">
            <div className="hero__flashcard-glow" aria-hidden="true" />
            <button
              ref={flashcardRef}
              className={`hero__flashcard${isFlipped ? " is-flipped" : ""}`}
              type="button"
              aria-pressed={isFlipped}
              aria-label={isFlipped ? "Show term" : "Show definition"}
              onClick={() => setIsFlipped((v) => !v)}
              data-testid="hero-flashcard"
            >
              <span className="hero__flashcard-inner">
                <span className="hero__flashcard-face hero__flashcard-face--front">
                  <span className="hero__badge">Cardiology</span>
                  <h2 className="hero__term">Myocardial Infarction</h2>
                  <p className="hero__hint">Tap to see definition →</p>
                  <div className="hero__progress" aria-hidden="true">
                    <span />
                  </div>
                  <div className="hero__pulse" aria-hidden="true">
                    <svg viewBox="0 0 200 40" preserveAspectRatio="none">
                      <polyline
                        points="0,20 30,20 40,5 50,35 60,20 110,20 120,12 130,28 140,20 200,20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </span>

                <span className="hero__flashcard-face hero__flashcard-face--back">
                  <span className="hero__definition-heading">Definition</span>

                  <div className="hero__definition-block">
                    <img className="hero__flag" src={uzbekistanFlag} alt="" aria-hidden="true" />
                    <p>
                      Miokard infarkti – Bu hayot uchun xavfli holat bo&apos;lib, unda yurak
                      mushagining (miokard) bir qismi nobud bo&apos;ladi (nekroz).
                    </p>
                  </div>

                  <div className="hero__definition-block">
                    <img className="hero__flag" src={russiaFlag} alt="" aria-hidden="true" />
                    <p>
                      Инфаркт миокарда — Это опасное для жизни состояние, при котором происходит
                      омертвение (некроз) участка сердечной мышцы (миокарда).
                    </p>
                  </div>

                  <p className="hero__flip-hint">← Tap to flip back</p>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

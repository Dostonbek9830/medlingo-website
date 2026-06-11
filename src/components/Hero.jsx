import { useState } from "react";
import russiaFlag from "../assets/russia.svg";
import uzbekistanFlag from "../assets/uzbekistan.svg";
import "./Hero.css";

function Hero() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="hero" id="hero">
      <div className="hero__grid container">
        <div className="hero__content">
          <p className="hero__eyebrow">🏥 Medical English Learning Platform</p>
          <h1>Learn Medical English Like a Clinical Professional</h1>
          <p className="hero__subheadline">
            The first AI-powered platform combining vocabulary, reading,
            listening, speaking, and writing for healthcare workers in your
            language.
          </p>

          <div className="hero__actions">
            <a className="btn-primary" href="#waitlist">
              Join the Waitlist
            </a>
            <a className="btn-secondary" href="#modules">
              See the Modules
            </a>
          </div>

          <p className="hero__proof">
            🩺 Medically reviewed by a Cardiology Surgeon · 52 modules · 7
            activity types
          </p>
        </div>

        <div className="hero__visual">
          <div className="hero__flashcard-shell">
            <button
              className={`hero__flashcard${isFlipped ? " is-flipped" : ""}`}
              type="button"
              aria-pressed={isFlipped}
              aria-label={isFlipped ? "Show term" : "Show definition"}
              onClick={() => setIsFlipped((value) => !value)}
            >
              <span className="hero__flashcard-inner">
                <span className="hero__flashcard-face hero__flashcard-face--front">
                  <span className="hero__badge">Cardiology</span>
                  <h2>Myocardial Infarction</h2>
                  <p>Tap to see definition →</p>
                  <div className="hero__progress" aria-hidden="true">
                    <span />
                  </div>
                </span>

                <span className="hero__flashcard-face hero__flashcard-face--back">
                  <span className="hero__definition-heading">Definition</span>

                  <div className="hero__definition-block">
                    <img
                      className="hero__flag"
                      src={uzbekistanFlag}
                      alt=""
                      aria-hidden="true"
                    />
                    <p>
                      Miokard infarkti – Bu hayot uchun xavfli holat
                      bo&apos;lib, unda yurak mushagining (miokard) bir qismi
                      nobud bo&apos;ladi (nekroz).
                    </p>
                  </div>

                  <div className="hero__definition-block">
                    <img
                      className="hero__flag"
                      src={russiaFlag}
                      alt=""
                      aria-hidden="true"
                    />
                    <p>
                      Инфаркт миокарда - Это опасное для жизни состояние, при котором происходит   омертвение (некроз) участка сердечной мышцы (миокарда).
                    </p>
                  </div>

                  <p className="hero__flip-hint">Tap to flip back ←</p>
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

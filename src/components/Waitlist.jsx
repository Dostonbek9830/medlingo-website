import { useEffect, useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Waitlist.css";

const formspreeUrl = "https://formspree.io/f/mkoaqgbr";
const TARGET_COUNT = 124;
const PERK_CAPACITY = 200;
const PERK_DISCOUNT = 50;

function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const [revealRef, isVisible] = useScrollReveal();
  const countStarted = useRef(false);

  useEffect(() => {
    if (!isVisible || countStarted.current) return;
    countStarted.current = true;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(TARGET_COUNT * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("email", email);
      const res = await fetch(formspreeUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (_) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="waitlist section" id="waitlist" data-testid="waitlist">
      <div className="container">
        <div
          ref={revealRef}
          className={`waitlist__card fade-in${isVisible ? " visible" : ""}`}
        >
          <div className="waitlist__glow" aria-hidden="true" />

          <p className="eyebrow waitlist__eyebrow">Early Access</p>
          <h2 className="waitlist__title">
            Be the first to access <span className="gradient-text">MedLingo</span>
          </h2>
          <p className="waitlist__subtext">
            Join healthcare professionals from Uzbekistan, Kazakhstan, and beyond. Get early access when we launch.
          </p>

          <div className="waitlist__perk" data-testid="waitlist-perk">
            <div className="waitlist__perk-head">
              <span className="waitlist__perk-tag" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V22H4V12"/><path d="M22 7H2V12H22V7Z"/><path d="M12 22V7"/><path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z"/><path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z"/></svg>
              </span>
              <div className="waitlist__perk-copy">
                <p className="waitlist__perk-title">
                  First <strong>{PERK_CAPACITY}</strong> get <strong>{PERK_DISCOUNT}% off</strong> at launch
                </p>
                <p className="waitlist__perk-sub" data-testid="waitlist-perk-status">
                  <span className="waitlist__perk-status-dot" aria-hidden="true" />
                  <strong>{count}</strong> / {PERK_CAPACITY} founders&apos; spots claimed
                  <span className="waitlist__perk-remaining"> · {Math.max(PERK_CAPACITY - count, 0)} left</span>
                </p>
              </div>
            </div>
            <div
              className="waitlist__perk-bar"
              role="progressbar"
              aria-label="Founder's discount capacity"
              aria-valuemin={0}
              aria-valuemax={PERK_CAPACITY}
              aria-valuenow={count}
            >
              <span
                className="waitlist__perk-bar-fill"
                style={{ width: `${Math.min((count / PERK_CAPACITY) * 100, 100)}%` }}
              />
              <span className="waitlist__perk-bar-shine" aria-hidden="true" />
            </div>
          </div>

          {!submitted ? (
            <form
              className="waitlist__form"
              action={formspreeUrl}
              method="POST"
              onSubmit={handleSubmit}
              data-testid="waitlist-form"
            >
              <label className="waitlist__label" htmlFor="waitlist-email">
                Email address
              </label>
              <div className="waitlist__field">
                <input
                  id="waitlist-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@hospital.com"
                  required
                  data-testid="waitlist-email-input"
                />
                <button
                  className="btn-primary waitlist__button"
                  type="submit"
                  disabled={submitting}
                  data-testid="waitlist-submit"
                >
                  {submitting ? "Joining…" : "Join Waitlist"}
                </button>
              </div>
              {error && <p className="waitlist__error" data-testid="waitlist-error">{error}</p>}
            </form>
          ) : (
            <div className="waitlist__success" data-testid="waitlist-success">
              <span className="waitlist__success-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <p>You&apos;re on the list! We&apos;ll be in touch.</p>
            </div>
          )}

          <div className="waitlist__meta">
            <p className="waitlist__note">
              <span aria-hidden="true">🔒</span> No spam. We&apos;ll only email you when MedLingo is ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Waitlist;

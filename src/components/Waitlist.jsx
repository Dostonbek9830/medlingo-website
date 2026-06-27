import { useEffect, useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Waitlist.css";

const formspreeUrl = "https://formspree.io/f/mkoaqgbr";
const TARGET_COUNT = 124;

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
            <p className="waitlist__counter" data-testid="waitlist-counter">
              <span className="waitlist__counter-pulse" aria-hidden="true" />
              <strong>{count}</strong> healthcare professionals waiting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Waitlist;

import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import useTheme from "../hooks/useTheme";
import useMagnetic from "../hooks/useMagnetic";
import "./Navbar.css";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const ctaRef = useMagnetic({ strength: 0.25, radius: 100 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`navbar${isScrolled ? " scrolled" : ""}`} data-testid="navbar">
      <div className="navbar__inner container">
        <a className="navbar__brand" href="#hero" aria-label="MedLingo home" data-testid="navbar-brand">
          <img className="navbar__logo" src={logo} alt="MedLingo" />
        </a>

        <nav className="navbar__links" aria-label="Primary navigation">
          <a href="#activities" data-testid="navlink-features">Features</a>
          <a href="#modules" data-testid="navlink-modules">Modules</a>
          <a href="#team" data-testid="navlink-team">Team</a>

          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggle}
            data-testid="theme-toggle"
          >
            <span className={`theme-toggle__icon theme-toggle__icon--sun${theme === "dark" ? " hidden" : ""}`}>
              <SunIcon />
            </span>
            <span className={`theme-toggle__icon theme-toggle__icon--moon${theme === "dark" ? "" : " hidden"}`}>
              <MoonIcon />
            </span>
          </button>

          <a
            ref={ctaRef}
            className="btn-primary navbar__cta"
            href="#waitlist"
            data-testid="navbar-cta"
          >
            Get Early Access
          </a>
        </nav>

        <div className="navbar__mobile-controls">
          <button
            className="theme-toggle theme-toggle--mobile"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggle}
            data-testid="theme-toggle-mobile"
          >
            <span className={`theme-toggle__icon theme-toggle__icon--sun${theme === "dark" ? " hidden" : ""}`}>
              <SunIcon />
            </span>
            <span className={`theme-toggle__icon theme-toggle__icon--moon${theme === "dark" ? "" : " hidden"}`}>
              <MoonIcon />
            </span>
          </button>

          <button
            className="navbar__menu-button"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((o) => !o)}
            data-testid="navbar-menu-button"
          >
            <span className={`hamburger${isMenuOpen ? " open" : ""}`} aria-hidden="true">
              <span /><span /><span />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="navbar__mobile-menu" aria-label="Mobile navigation" data-testid="mobile-menu">
          <a href="#activities" onClick={closeMenu}>Features</a>
          <a href="#modules" onClick={closeMenu}>Modules</a>
          <a href="#team" onClick={closeMenu}>Team</a>
          <a className="btn-primary navbar__mobile-cta" href="#waitlist" onClick={closeMenu}>
            Get Early Access
          </a>
        </nav>
      )}
    </header>
  );
}

export default Navbar;

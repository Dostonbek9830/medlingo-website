import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a className="navbar__brand" href="#hero" aria-label="MedLingo home">
          <img className="navbar__logo" src={logo} alt="MedLingo" />
        </a>

        <nav className="navbar__links" aria-label="Primary navigation">
          <a href="#activities">Features</a>
          <a href="#modules">Modules</a>
          <a href="#team">Team</a>
          <a className="btn-primary navbar__cta" href="#waitlist">
            Get Early Access
          </a>
        </nav>

        <button
          className="navbar__menu-button"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <nav className="navbar__mobile-menu" aria-label="Mobile navigation">
          <a href="#activities" onClick={closeMenu}>
            Features
          </a>
          <a href="#modules" onClick={closeMenu}>
            Modules
          </a>
          <a href="#team" onClick={closeMenu}>
            Team
          </a>
          <a className="btn-primary navbar__mobile-cta" href="#waitlist" onClick={closeMenu}>
            Get Early Access
          </a>
        </nav>
      )}
    </header>
  )
}

export default Navbar

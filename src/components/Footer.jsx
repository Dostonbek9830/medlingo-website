import logo from "../assets/logo.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="footer" data-testid="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <img className="footer__logo" src={logo} alt="MedLingo" />
            <p>Medical English for the next generation of healthcare professionals.</p>
          </div>

          <div className="footer__column">
            <nav className="footer__links" aria-label="Footer links">
              <a href="#">Privacy Policy</a>
              <a href="mailto:hello@medlingo.app">Contact</a>
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 MedLingo. All rights reserved.</p>
          <p className="footer__microcopy">
            Made in Uzbekistan <span aria-hidden="true">🇺🇿</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

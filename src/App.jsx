import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Activities from "./components/Activities";
import Modules from "./components/Modules";
import Team from "./components/Team";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Problem />
      <Activities />
      <Modules />
      <Team />
      <Waitlist />
      <Footer />

      {showBackToTop && (
        <button
          className="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="back-to-top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;

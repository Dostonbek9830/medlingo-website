import { useEffect, useState } from "react";
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
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          onClick={scrollToTop}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;

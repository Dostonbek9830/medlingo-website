import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import useTilt from "../hooks/useTilt";
import "./Modules.css";

const phase1Modules = [
  { icon: "🫀", name: "The Human Body" },
  { icon: "🩺", name: "Medical Equipment" },
  { icon: "🏥", name: "In the Hospital" },
  { icon: "🔍", name: "Diagnosis I" },
  { icon: "🔬", name: "Diagnosis II" },
  { icon: "🦠", name: "Diseases and Illness" },
  { icon: "💀", name: "Anatomy" },
  { icon: "🩹", name: "Surgery" },
  { icon: "👩‍⚕️", name: "English for Nursing I" },
  { icon: "📋", name: "Routine Checkups" },
];

const phase2Modules = [
  { icon: "❤️", name: "The Heart and Lungs" },
  { icon: "🎗️", name: "Cancer and Tumors" },
  { icon: "🔪", name: "Surgery I" },
  { icon: "⚕️", name: "Surgery II" },
  { icon: "🤒", name: "Symptoms I-IV" },
  { icon: "🖥️", name: "Tests and Scans" },
  { icon: "🫀", name: "Cardiology ★" },
  { icon: "🩸", name: "Blood" },
  { icon: "🦴", name: "Bones and Joints" },
];

function Modules() {
  const [activeTab, setActiveTab] = useState("phase1");
  const [headerRef, headerVisible] = useScrollReveal();
  const isPhase2 = activeTab === "phase2";
  const activeModules = isPhase2 ? phase2Modules : phase1Modules;

  return (
    <section className="modules section" id="modules" data-testid="modules">
      <div className="container">
        <div
          ref={headerRef}
          className={`modules__header fade-in${headerVisible ? " visible" : ""}`}
        >
          <p className="eyebrow">Course Content</p>
          <h2 className="modules__title">
            <span className="gradient-text">52 Modules</span> from Basic to Specialist
          </h2>
          <p className="modules__subtitle">
            Start with B2 fundamentals. Unlock C1 specialist tracks as you progress.
          </p>
        </div>

        <div className="modules__tabs" role="tablist" aria-label="Module phases" data-testid="modules-tabs">
          <button
            className={`modules__tab${activeTab === "phase1" ? " active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab === "phase1"}
            onClick={() => setActiveTab("phase1")}
            data-testid="modules-tab-phase1"
          >
            Phase 1 — Basic (B2)
          </button>
          <button
            className={`modules__tab${activeTab === "phase2" ? " active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab === "phase2"}
            onClick={() => setActiveTab("phase2")}
            data-testid="modules-tab-phase2"
          >
            Phase 2 — Specialised (C1)
          </button>
          <span className={`modules__tab-glider modules__tab-glider--${activeTab}`} aria-hidden="true" />
        </div>

        <div className="modules__grid" key={activeTab}>
          {activeModules.map((module, i) => (
            <ModuleCard
              key={`${activeTab}-${module.name}`}
              module={module}
              delay={i * 0.05}
              isPhase2={isPhase2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ module, delay, isPhase2 }) {
  const [revealRef, isVisible] = useScrollReveal();
  const tiltRef = useTilt({ max: 6 });

  return (
    <div
      ref={revealRef}
      className={`modules__card-wrap fade-in${isVisible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <article
        ref={tiltRef}
        className={`card modules__card${isPhase2 ? " locked" : ""}`}
        data-testid={`module-card-${module.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
      >
        <div className="modules__card-content">
          <div className="modules__topline">
            <span className="modules__icon" aria-hidden="true">{module.icon}</span>
            <span className={isPhase2 ? "c1-badge" : "b2-badge"}>
              {isPhase2 ? "C1" : "B2"}
            </span>
          </div>
          <h3>{module.name}</h3>
          <p>7 activities</p>
        </div>

        {isPhase2 && (
          <div className="modules__lock-overlay" aria-hidden="true">
            <span className="modules__lock">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <span className="modules__pro-badge">Pro</span>
          </div>
        )}
      </article>
    </div>
  );
}

export default Modules;

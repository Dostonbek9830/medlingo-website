import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
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
    <section className="modules" id="modules">
      <div className="container">
        <div
          ref={headerRef}
          className={`modules__header fade-in${headerVisible ? " visible" : ""}`}
        >
          <p className="modules__eyebrow">Course Content</p>
          <h2>52 Modules from Basic to Specialist</h2>
          <p>
            Start with B2 fundamentals. Unlock C1 specialist tracks as you
            progress.
          </p>
        </div>

        <div
          className="modules__tabs"
          role="tablist"
          aria-label="Module phases"
        >
          <button
            className={activeTab === "phase1" ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={activeTab === "phase1"}
            onClick={() => setActiveTab("phase1")}
          >
            Phase 1 — Basic (B2)
          </button>
          <button
            className={activeTab === "phase2" ? "active" : ""}
            type="button"
            role="tab"
            aria-selected={activeTab === "phase2"}
            onClick={() => setActiveTab("phase2")}
          >
            Phase 2 — Specialised (C1)
          </button>
        </div>

        <div className="modules__grid">
          {activeModules.map((module, index) => (
            <ModuleCard
              key={module.name}
              module={module}
              delay={index * 0.1}
              isPhase2={isPhase2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ module, delay, isPhase2 }) {
  const [cardRef, isVisible] = useScrollReveal();

  return (
    <article
      ref={cardRef}
      className={`modules__card${isPhase2 ? " locked" : ""} fade-in${isVisible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="modules__card-content">
        <div className="modules__topline">
          <span className="modules__icon" aria-hidden="true">
            {module.icon}
          </span>
          <span className={isPhase2 ? "c1-badge" : "b2-badge"}>
            {isPhase2 ? "C1" : "B2"}
          </span>
        </div>
        <h3>{module.name}</h3>
        <p>7 activities</p>
      </div>

      {isPhase2 && (
        <div className="modules__lock-overlay" aria-hidden="true">
          <span className="modules__lock">🔒</span>
          <span className="modules__pro-badge">Pro</span>
        </div>
      )}
    </article>
  );
}

export default Modules;

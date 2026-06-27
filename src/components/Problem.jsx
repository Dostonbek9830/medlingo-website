import useScrollReveal from "../hooks/useScrollReveal";
import useTilt from "../hooks/useTilt";
import "./Problem.css";

const problemCards = [
  {
    icon: "🌍",
    title: "No localised tool",
    text: "Every existing medical English app is English-only. Uzbek, Russian, and Tajik speakers have no native-language medical English learning solution.",
  },
  {
    icon: "📋",
    title: "Exams require it",
    text: "USMLE, PLAB, and international licensing exams are entirely in English. Failure costs $645–895 per attempt. Students need structured preparation.",
  },
  {
    icon: "🏥",
    title: "Career barrier",
    text: "International hospitals, clinical rotations, and medical publications are all in English. Without clinical English fluency, career growth is limited.",
  },
];

function Problem() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="problem section" id="problem" data-testid="problem">
      <div className="container">
        <div
          ref={headerRef}
          className={`problem__header fade-in${headerVisible ? " visible" : ""}`}
        >
          <p className="eyebrow">The Problem</p>
          <h2 className="problem__title">
            Healthcare professionals in Central Asia need clinical English —
            but <span className="gradient-text">nothing exists for them</span>
          </h2>
        </div>

        <div className="problem__grid">
          {problemCards.map((card, i) => (
            <ProblemCard card={card} delay={i * 0.1} key={card.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemCard({ card, delay }) {
  const [revealRef, isVisible] = useScrollReveal();
  const tiltRef = useTilt({ max: 6 });

  return (
    <div
      ref={revealRef}
      className={`problem__card-wrap fade-in${isVisible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <article ref={tiltRef} className="card problem__card" data-testid={`problem-card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="problem__icon-wrap">
          <span className="problem__icon" aria-hidden="true">{card.icon}</span>
        </div>
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </article>
    </div>
  );
}

export default Problem;

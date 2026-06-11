import useScrollReveal from "../hooks/useScrollReveal";
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
    <section className="problem" id="problem">
      <div className="container">
        <div
          ref={headerRef}
          className={`problem__header fade-in${headerVisible ? " visible" : ""}`}
        >
          <p className="problem__eyebrow">The Problem</p>
          <h2>
            Healthcare professionals in Central Asia need clinical English — but
            nothing exists for them
          </h2>
        </div>

        <div className="problem__grid">
          {problemCards.map((card, index) => (
            <ProblemCard card={card} delay={index * 0.1} key={card.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemCard({ card, delay }) {
  const [cardRef, isVisible] = useScrollReveal();

  return (
    <article
      ref={cardRef}
      className={`problem__card fade-in${isVisible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="problem__icon" aria-hidden="true">
        {card.icon}
      </div>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
    </article>
  );
}

export default Problem;

import useScrollReveal from "../hooks/useScrollReveal";
import useTilt from "../hooks/useTilt";
import "./Activities.css";

const activities = [
  { icon: "🔤", title: "Vocabulary Builder", text: "Learn terms with definitions, clinical sentences, and pronunciation audio." },
  { icon: "📖", title: "Reading Comprehension", text: "Read real clinical texts using your module vocabulary. Answer comprehension questions." },
  { icon: "✅", title: "Multiple Choice Quiz", text: "AI-generated questions at 3 difficulty levels. Instant explanations after each answer." },
  { icon: "🎧", title: "Listening Comprehension", text: "Real clinical dialogues: doctor-patient conversations, ward rounds, handovers." },
  { icon: "✏️", title: "Spelling Activity", text: "Hear the term spoken aloud. Type the correct medical spelling." },
  { icon: "🎙️", title: "Speaking Activity", text: "Speak clinical sentences. AI grades your pronunciation and vocabulary use.", badge: "Key Feature" },
  { icon: "📝", title: "Writing Activity", text: "Write clinical notes, patient letters, and referrals. AI grades your response." },
];

function Activities() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="activities section" id="activities" data-testid="activities">
      <div className="container">
        <div
          ref={headerRef}
          className={`activities__header fade-in${headerVisible ? " visible" : ""}`}
        >
          <p className="eyebrow">How It Works</p>
          <h2 className="activities__title">
            <span className="gradient-text">7 Activities</span> Per Module
          </h2>
          <p className="activities__subtitle">
            Every module takes you through all four language skills plus medical accuracy training.
          </p>
        </div>

        <div className="activities__grid">
          {activities.map((a, i) => (
            <ActivityCard activity={a} delay={i * 0.08} key={a.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ activity, delay }) {
  const [revealRef, isVisible] = useScrollReveal();
  const tiltRef = useTilt({ max: 8 });

  return (
    <div
      ref={revealRef}
      className={`activities__card-wrap fade-in${isVisible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <article ref={tiltRef} className="card activities__card" data-testid={`activity-card-${activity.title.toLowerCase().replace(/\s+/g, '-')}`}>
        {activity.badge && (
          <span className="activities__badge" data-testid="activities-key-badge">
            <span className="activities__badge-dot" aria-hidden="true" />
            {activity.badge}
          </span>
        )}
        <div className="activities__icon-wrap">
          <span className="activities__icon" aria-hidden="true">{activity.icon}</span>
        </div>
        <h3>{activity.title}</h3>
        <p>{activity.text}</p>
      </article>
    </div>
  );
}

export default Activities;

import useScrollReveal from "../hooks/useScrollReveal";
import "./Activities.css";

const activities = [
  {
    icon: "🔤",
    title: "Vocabulary Builder",
    text: "Learn terms with definitions, clinical sentences, and pronunciation audio",
  },
  {
    icon: "📖",
    title: "Reading Comprehension",
    text: "Read real clinical texts using your module vocabulary. Answer comprehension questions.",
  },
  {
    icon: "✅",
    title: "Multiple Choice Quiz",
    text: "AI-generated questions at 3 difficulty levels. Instant explanations after each answer.",
  },
  {
    icon: "🎧",
    title: "Listening Comprehension",
    text: "Real clinical dialogues: doctor-patient conversations, ward rounds, handovers.",
  },
  {
    icon: "✏️",
    title: "Spelling Activity",
    text: "Hear the term spoken aloud. Type the correct medical spelling.",
  },
  {
    icon: "🎙️",
    title: "Speaking Activity",
    text: "Speak clinical sentences. AI grades your pronunciation and vocabulary use.",
    badge: "⭐ Key Feature",
  },
  {
    icon: "📝",
    title: "Writing Activity",
    text: "Write clinical notes, patient letters, and referrals. AI grades your response.",
  },
];

function Activities() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="activities" id="activities">
      <div className="container">
        <div
          ref={headerRef}
          className={`activities__header fade-in${headerVisible ? " visible" : ""}`}
        >
          <p className="activities__eyebrow">How It Works</p>
          <h2>7 Activities Per Module</h2>
          <p>
            Every module takes you through all four language skills plus medical
            accuracy training.
          </p>
        </div>

        <div className="activities__grid">
          {activities.map((activity, index) => (
            <ActivityCard
              activity={activity}
              delay={index * 0.1}
              key={activity.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ activity, delay }) {
  const [cardRef, isVisible] = useScrollReveal();

  return (
    <article
      ref={cardRef}
      className={`activities__card fade-in${isVisible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {activity.badge && (
        <span className="activities__badge">{activity.badge}</span>
      )}
      <div className="activities__icon" aria-hidden="true">
        {activity.icon}
      </div>
      <h3>{activity.title}</h3>
      <p>{activity.text}</p>
    </article>
  );
}

export default Activities;

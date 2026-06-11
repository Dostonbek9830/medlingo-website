import useScrollReveal from "../hooks/useScrollReveal";
import "./Team.css";

function Team() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="team" id="team">
      <div className="container">
        <div
          ref={headerRef}
          className={`team__header fade-in${headerVisible ? " visible" : ""}`}
        >
          <p className="team__eyebrow">The Team</p>
          <h2>Built by someone who lives the problem</h2>
        </div>

        <div className="team__grid">
          <TeamCard
            delay={0}
            avatarClassName="team__avatar--founder"
            avatarText="D"
            name="Dostonbek Yokubov"
            title="Founder & Product Lead"
            tags={[
              "Data Analyst @ Yandex Market",
              "Python & SQL",
              "Westminster International University in Tashkent",
              "Tashkent, Uzbekistan",
            ]}
            bio="Data analyst with a background in sales analytics. Fluent in Uzbek, Russian, and English. Building MedLingo to solve the medical English gap he sees in Central Asia's healthcare community."
          />

          <TeamCard
            delay={0.1}
            advisorBadge="✓ Medical Advisor"
            avatarClassName="team__avatar--advisor"
            avatarText="Dr"
            name="Dr. Sherzod Ismadiyorov"
            title="Medical Advisor — Cardiolog"
            tags={[
              "Cardiovascular surgeon",
              "Kemerovo State Medical University in Russia",
              "Tashkent, Uzbekistan",
            ]}
            bio="Practising cardiology surgeon with first-hand experience of the medical English barrier in Uzbekistan. Medically reviews all MedLingo content for clinical accuracy."
          />
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  delay,
  advisorBadge,
  avatarClassName,
  avatarText,
  name,
  title,
  tags,
  bio,
}) {
  const [cardRef, isVisible] = useScrollReveal();

  return (
    <article
      ref={cardRef}
      className={`team__card fade-in${isVisible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {advisorBadge && (
        <span className="team__advisor-badge">{advisorBadge}</span>
      )}
      <div className={`team__avatar ${avatarClassName}`}>{avatarText}</div>
      <h3>{name}</h3>
      <p className="team__title">{title}</p>
      <div className="team__tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p className="team__bio">{bio}</p>
    </article>
  );
}

export default Team;

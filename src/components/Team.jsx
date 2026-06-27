import useScrollReveal from "../hooks/useScrollReveal";
import useTilt from "../hooks/useTilt";
import "./Team.css";

function Team() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="team section" id="team" data-testid="team">
      <div className="container">
        <div
          ref={headerRef}
          className={`team__header fade-in${headerVisible ? " visible" : ""}`}
        >
          <p className="eyebrow">The Team</p>
          <h2 className="team__title">
            Built by <span className="gradient-text">someone who lives the problem</span>
          </h2>
        </div>

        <div className="team__grid">
          <TeamCard
            delay={0}
            accent="mint"
            avatarText="D"
            name="Dostonbek Yokubov"
            title="Founder & Product Lead"
            tags={[
              "Data Analyst @ Yandex Market",
              "Python & SQL",
              "Westminster Int. Uni Tashkent",
              "Tashkent, Uzbekistan",
            ]}
            bio="Data analyst with a background in sales analytics. Fluent in Uzbek, Russian, and English. Building MedLingo to solve the medical English gap he sees in Central Asia's healthcare community."
          />

          <TeamCard
            delay={0.1}
            accent="coral"
            advisorBadge="Medical Advisor"
            avatarText="Dr"
            name="Dr. Sherzod Ismadiyorov"
            title="Medical Advisor — Cardiology"
            tags={[
              "Cardiovascular surgeon",
              "Kemerovo State Medical University",
              "Tashkent, Uzbekistan",
            ]}
            bio="Practising cardiology surgeon with first-hand experience of the medical English barrier in Uzbekistan. Medically reviews all MedLingo content for clinical accuracy."
          />
        </div>
      </div>
    </section>
  );
}

function TeamCard({ delay, advisorBadge, accent, avatarText, name, title, tags, bio }) {
  const [revealRef, isVisible] = useScrollReveal();
  const tiltRef = useTilt({ max: 4 });

  return (
    <div
      ref={revealRef}
      className={`team__card-wrap fade-in${isVisible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <article ref={tiltRef} className={`card team__card team__card--${accent}`} data-testid={`team-card-${name.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
        {advisorBadge && (
          <span className="team__advisor-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
            {advisorBadge}
          </span>
        )}

        <div className={`team__avatar team__avatar--${accent}`} aria-hidden="true">
          <span>{avatarText}</span>
          <span className="team__avatar-ring" />
        </div>

        <h3 className="team__name">{name}</h3>
        <p className="team__role">{title}</p>

        <div className="team__tags">
          {tags.map((tag) => (
            <span key={tag} className="team__tag">{tag}</span>
          ))}
        </div>

        <p className="team__bio">{bio}</p>
      </article>
    </div>
  );
}

export default Team;

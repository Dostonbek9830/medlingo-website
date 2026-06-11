import { useState } from "react";
import "./Waitlist.css";

const formspreeUrl = "https://formspree.io/f/YOUR_FORM_ID";

function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    await fetch(formspreeUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    setSubmitted(true);
  };

  return (
    <section className="waitlist" id="waitlist">
      <div className="waitlist__inner container">
        <h2>Be the first to access MedLingo</h2>
        <p className="waitlist__subtext">
          Join healthcare professionals from Uzbekistan, Kazakhstan, and beyond.
          Get early access when we launch.
        </p>

        {!submitted ? (
          <form
            className="waitlist__form"
            action={formspreeUrl}
            method="POST"
            onSubmit={handleSubmit}
          >
            <label className="waitlist__label" htmlFor="waitlist-email">
              Email address
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
            <button className="btn-primary waitlist__button" type="submit">
              Join Waitlist
            </button>
          </form>
        ) : (
          <p className="waitlist__success">
            ✅ You're on the list! We'll be in touch.
          </p>
        )}

        <p className="waitlist__note">
          🔒 No spam. We'll only email you when MedLingo is ready.
        </p>
        <p className="waitlist__counter">
          🩺 124 healthcare professionals waiting
        </p>
      </div>
    </section>
  );
}

export default Waitlist;

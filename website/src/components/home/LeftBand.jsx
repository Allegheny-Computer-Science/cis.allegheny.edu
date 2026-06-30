import { useState } from "react";

export default function LeftBand({ base = "/" }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="community" className="community-section navy__band">
      <div className="community-information">
        <h1>
          Why <em>Allegheny College</em> Computer &amp; Information Science?
        </h1>

        <div className={`community-text${expanded ? " community-text--expanded" : ""}`}>
          <p>
            The Computer and Information Science field is increasingly saturated
            with specialists, but as the global approach to computing becomes
            more holistic and ethically concerned, those with broader knowledge
            and an open mind secure their place.
          </p>
          <p>
            We offer 4 majors, and though some are designed to focus on one
            aspect of CIS, our curriculum remains all-encompassing to give our
            students the edge they need in today's job market.
          </p>
        </div>

        <button
          type="button"
          className="community-expand"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less ▲" : "Read more ▼"}
        </button>

        <div className="community-buttons">
          <a href={`${base}plan/mypath`}>
            <span className="button__fill">Plan Your Path Here</span>
          </a>
          <a href="#faculty">
            <span className="button__ghost">Learn More</span>
          </a>
        </div>
      </div>

      <div className="community-image image__slider">
        <img src={`${base}img/placeholder.jpg`} alt="Placeholder photo" />
      </div>
    </section>
  );
}

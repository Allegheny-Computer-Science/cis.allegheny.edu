import { useEffect, useState } from "react";

export default function FacultyCarousel({ faculty = [] }) {
  const slideCount = faculty.length;
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (slideCount > 1) {
      setIndex(Math.floor(Math.random() * slideCount));
    }
  }, [slideCount]);

  const person = faculty[index % slideCount];

  useEffect(() => {
    if (!person) return;
    if (!person.image) { setReady(true); return; }
    setReady(false);
    const img = new Image();
    img.onload = () => setReady(true);
    img.onerror = () => setReady(true);
    img.src = person.image;
  }, [index, person?.image]);

  if (slideCount === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + slideCount) % slideCount);
  const next = () => setIndex((i) => (i + 1) % slideCount);

  return (
    <div className="faculty-carousel">
      <button type="button" className="faculty-carousel__arrow" onClick={prev} aria-label="Previous">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.1rem" height="1.1rem" fill="currentColor" aria-hidden="true">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      <div className="faculty-carousel__track">
        {faculty.map((p, i) => (
          <div
            key={i}
            className={[
              "faculty-carousel__card",
              i !== index ? "faculty-carousel__card--inactive" : "",
              i === index && ready ? "faculty-carousel__card--ready" : "",
            ].filter(Boolean).join(" ")}
          >
            <div className="faculty-carousel__photo-wrap">
              {p.image ? (
                <img src={p.image} alt={p.name} className="faculty-carousel__photo" />
              ) : (
                <div className="faculty-carousel__photo faculty-carousel__photo--placeholder" aria-hidden="true" />
              )}
            </div>
            <div className="faculty-carousel__info">
              <h2 className="faculty-carousel__name">{p.name}</h2>
              <h3 className="faculty-carousel__title">{p.title}</h3>
              <div className="faculty-carousel__statement">
                {p.statement.split("\n\n").map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="faculty-carousel__arrow" onClick={next} aria-label="Next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.1rem" height="1.1rem" fill="currentColor" aria-hidden="true">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
    </div>
  );
}

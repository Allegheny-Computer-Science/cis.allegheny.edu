import { useEffect, useState } from "react";

function PersonCard({ e, className }) {
  return (
    <div className={className}>
      <div className="endorsement-carousel__photo-wrap">
        {e.image ? (
          <img src={e.image} alt={e.name} className="endorsement-carousel__photo" width="80" height="80" loading="lazy" decoding="async" />
        ) : (
          <div className="endorsement-carousel__photo endorsement-carousel__photo--placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="endorsement-carousel__person-info">
        <p className="endorsement-carousel__name">{e.name}</p>
        <p className="endorsement-carousel__title">{e.title}</p>
      </div>
    </div>
  );
}

export default function EndorsementCarousel({ endorsements = [] }) {
  const count = endorsements.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count > 1) setIndex(Math.floor(Math.random() * count));
  }, [count]);

  if (count === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  const shortestIndex = endorsements.reduce(
    (best, e, i) => e.statement.length < endorsements[best].statement.length ? i : best,
    0
  );
  const shortest = endorsements[shortestIndex];

  return (
    <div className="endorsement-carousel">
      {/* Desktop / tablet: full cycling carousel */}
      <div className="endorsement-carousel__desktop">
        <div className="endorsement-carousel__quote-row">
          <button type="button" className="endorsement-carousel__arrow" onClick={prev} aria-label="Previous">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.1rem" height="1.1rem" fill="currentColor" aria-hidden="true">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <div className="endorsement-carousel__track">
            {endorsements.map((e, i) => (
              <div
                key={i}
                className={`endorsement-carousel__quote${i === index ? " endorsement-carousel__quote--active" : ""}`}
              >
                <div className="endorsement-carousel__statement">
                  {e.statement.split("\n\n").map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="endorsement-carousel__arrow" onClick={next} aria-label="Next">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.1rem" height="1.1rem" fill="currentColor" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>

        <div className="endorsement-carousel__person-track">
          {endorsements.map((e, i) => (
            <PersonCard
              key={i}
              e={e}
              className={`endorsement-carousel__person${i === index ? " endorsement-carousel__person--active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile: static shortest endorsement */}
      <div className="endorsement-carousel__mobile">
        <div className="endorsement-carousel__quote endorsement-carousel__quote--active">
          <div className="endorsement-carousel__statement">
            {shortest.statement.split("\n\n").map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </div>
        </div>
        <PersonCard
          e={shortest}
          className="endorsement-carousel__person endorsement-carousel__person--active"
        />
      </div>
    </div>
  );
}

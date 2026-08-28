import { useState, useEffect } from "react";

const FILTERS = [
  { key: "all",          label: "All" },
  { key: "event",        label: "Events" },
  { key: "announcement", label: "Announcements" },
  { key: "other",        label: "Other" },
];

const FILTER_EVENT = "cis:news-filter";
const PAGE_SIZE = 8;

export default function NewsFilter({ updates, baseUrl = '/' }) {
  const [active, setActive]   = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Sync with the external NewsFilterBar when it's present (desktop)
  useEffect(() => {
    const onFilter = (e) => {
      setActive(e.detail.key);
      setVisible(PAGE_SIZE);
    };
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  const filtered = active === "all"
    ? updates
    : updates.filter(u => u.category === active);

  const shown   = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  function handleFilter(key) {
    setActive(key);
    setVisible(PAGE_SIZE);
    // Also broadcast so the external bar stays in sync
    window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: { key } }));
  }

  return (
    <>
      {/* Shown on mobile/tablet; hidden on desktop by .community-feed__news .news-filter__bar { display:none } */}
      <div className="news-filter__bar news-filter__bar--inline">
        {FILTERS.map(f => (
          <button
            key={f.key}
            type="button"
            className={`news-filter__btn news-filter__btn--${f.key}${active === f.key ? " news-filter__btn--active" : ""}`}
            aria-pressed={active === f.key}
            onClick={() => handleFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="updates-grid news-grid">
        {shown.map(u => (
          <a
            key={u.slug}
            href={u.externalUrl ?? `${baseUrl}community/news/${u.slug}`}
            className={`update-card update-card--${u.category} update-card--light`}
            {...(u.externalUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <div className="update-card__image">
              <img src={u.image ?? `${baseUrl}img/placeholder.jpg`} alt={u.title} width="640" height="360" loading="lazy" decoding="async" />
            </div>
            <div className="update-card__body">
              <p className="update-card__date">{new Date(u.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <h2 className="update-card__title">{u.title}</h2>
              <p className="update-card__desc">{u.description}</p>
            </div>
          </a>
        ))}
      </div>

      {hasMore && (
        <div className="news-load-more">
          <button
            type="button"
            className="button__ghost news-load-more__btn"
            onClick={() => setVisible(v => v + PAGE_SIZE)}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

import { useState, useEffect } from "react";

const FILTERS = [
  { key: "all",          label: "All" },
  { key: "event",        label: "Events" },
  { key: "announcement", label: "Announcements" },
  { key: "other",        label: "Other" },
];

export const FILTER_EVENT = "cis:news-filter";

export default function NewsFilterBar() {
  const [active, setActive] = useState("all");

  useEffect(() => {
    // Sync if the grid resets (e.g. on back-nav)
    const onSync = (e) => setActive(e.detail.key);
    window.addEventListener(FILTER_EVENT + ":sync", onSync);
    return () => window.removeEventListener(FILTER_EVENT + ":sync", onSync);
  }, []);

  function handleFilter(key) {
    setActive(key);
    window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: { key } }));
  }

  return (
    <div className="news-filter__bar">
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
  );
}

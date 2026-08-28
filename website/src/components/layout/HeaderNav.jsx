import { useState, useEffect, useRef, useCallback } from "react";
import { courses } from "../../data/courses.js";
import { programs } from "../../data/programs.js";

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

// ── Search index ────────────────────────────────────────────────────────────

const STATIC_PAGES = [
  { title: "Home",               url: `${base}`,                          description: "CIS department home page" },
  { title: "Our Purpose",        url: `${base}about/statement`,           description: "Department mission and statement of purpose" },
  { title: "Action Plan",        url: `${base}about/actionplan`,          description: "Department action plan and strategic goals" },
  { title: "Faculty",            url: `${base}about/faculty`,             description: "Meet our faculty and staff" },
  { title: "Facilities",         url: `${base}about/facilities`,          description: "Labs, classrooms, and computing facilities" },
  { title: "Policies",           url: `${base}about/policies`,            description: "Department policies and academic integrity" },
  { title: "Majors & Minors",    url: `${base}plan/degrees`,              description: "Explore CMPSC, DS, INFM, and SE programs" },
  { title: "My Path",            url: `${base}plan/mypath`,               description: "Build your 4-year degree plan" },
  { title: "Microcredentials",   url: `${base}plan/microcredentials`,     description: "Short-form credentials and skill certifications" },
  { title: "Course Bulletin",    url: `${base}plan/bulletin`,             description: "Full list of CIS courses with descriptions" },
  { title: "Calendar & News",    url: `${base}community/news`,            description: "Department calendar and latest news" },
  { title: "Technical Leaders", url: `${base}community/tl`,              description: "CIS Technical Leaders directory" },
  { title: "Advisory Board",    url: `${base}community/tab`,             description: "Technical Advisory Board members and affiliates" },
  { title: "Fundraising",        url: `${base}community/fundraising`,     description: "Support CIS through giving" },
  { title: "Outreach",           url: `${base}community/outreach`,        description: "Outreach programs and community engagement" },
  { title: "Resources Overview", url: `${base}resources/overview`,        description: "Student resources and support" },
  { title: "References",         url: `${base}resources/references`,      description: "Helpful references and documentation" },
  { title: "Laptops",            url: `${base}resources/laptops`,         description: "Laptop requirements and loaner program" },
  { title: "Opportunities",      url: `${base}opportunities/overview`,    description: "Research, internship, and career opportunities" },
  { title: "CMU Program",        url: `${base}opportunities/cmu`,         description: "Carnegie Mellon joint program information" },
];

const COURSE_ENTRIES = courses.map(c => ({
  title: `${c.code}: ${c.title}`,
  url: `${base}plan/bulletin`,
  description: c.description ? c.description.slice(0, 120) + "…" : "",
  tag: "Course",
}));

const PROGRAM_ENTRIES = programs.map(p => ({
  title: p.label + (p.type === "major" ? " Major" : " Minor"),
  url: `${base}plan/degrees`,
  description: p.description ? p.description.slice(0, 120) + "…" : `${p.type === "major" ? "Major" : "Minor"} program in ${p.discipline}`,
  tag: p.type === "major" ? "Major" : "Minor",
}));

const SEARCH_INDEX = [
  ...STATIC_PAGES.map(e => ({ ...e, tag: "Page" })),
  ...PROGRAM_ENTRIES,
  ...COURSE_ENTRIES,
];

function searchIndex(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return SEARCH_INDEX.filter(e =>
    e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
  ).slice(0, 8);
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ExternalLinkIcon({ size = "0.75em" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
    </svg>
  );
}

function Brand() {
  return (
    <a href={base} className="header__brand">
      <img src={`${base}img/logo.svg`} alt="Allegheny College CIS gator" className="header__logo" />
      <div className="header__titles">
        <span className="header__college">Allegheny College</span>
        <span className="header__dept">Computer &amp; Information Science</span>
      </div>
    </a>
  );
}

function SearchBox({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleChange = useCallback((e) => {
    const q = e.target.value;
    setQuery(q);
    setResults(searchIndex(q));
    setActive(-1);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(a => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(a => Math.max(a - 1, -1));
    } else if (e.key === "Enter") {
      if (active >= 0 && results[active]) {
        window.location.assign(results[active].url);
        onClose?.();
      }
    } else if (e.key === "Escape") {
      onClose?.();
    }
  };

  return (
    <div className="mobile-menu__search-inner">
      <input
        ref={inputRef}
        type="search"
        placeholder="Search Website"
        className="mobile-menu__search-input"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label="Search"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-activedescendant={active >= 0 ? `search-result-${active}` : undefined}
        autoComplete="off"
      />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1rem" height="1rem" fill="currentColor" className="mobile-menu__search-icon" aria-hidden="true">
        <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
      {results.length > 0 && (
        <ul
          id="search-results"
          ref={listRef}
          className="search-results"
          role="listbox"
        >
          {results.map((r, i) => (
            <li
              key={i}
              id={`search-result-${i}`}
              role="option"
              aria-selected={i === active}
              className={`search-result${i === active ? " search-result--active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => { window.location.assign(r.url); onClose?.(); }}
            >
              <span className="search-result__tag">{r.tag}</span>
              <span className="search-result__title">{r.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HeaderNav({ navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    let timer;
    const THRESHOLD = 8;

    const onScroll = () => {
      const y = window.scrollY;
      if (y > THRESHOLD) {
        setScrolled(true);
        clearTimeout(timer);
        timer = setTimeout(() => setLinksVisible(true), 250);
      } else if (y === 0) {
        clearTimeout(timer);
        setScrolled(false);
        setLinksVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  const toggleSection = (label) =>
    setOpenSection(prev => (prev === label ? null : label));

  return (
    <>
      <div className={`header__bar${scrolled ? " header__bar--scrolled" : ""}`}>
        <Brand />
        <nav className={`header__nav${linksVisible ? " header__nav--links-visible" : ""}`}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`header__link${link.label === "Home" ? " header__link--home" : ""}${link.accent ? " header__link--accent" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://allegheny.edu/apply/"
            className="header__link header__link--apply"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply
            <ExternalLinkIcon />
          </a>
          <button
            className="header__burger"
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span /><span /><span />
          </button>
        </nav>
      </div>

      <div
        className={`mobile-menu__scrim${menuOpen ? " mobile-menu__scrim--open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <Brand />
          <button
            className="mobile-menu__close"
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            &#x2715;
          </button>
        </div>

        <div className="mobile-menu__search">
          <SearchBox onClose={closeMenu} />
        </div>

        <div className="mobile-menu__body">
          <div className="mobile-menu__left">
            <p className="mobile-menu__blurb">Allegheny College's Department of Computer and Information Science offers four majors — Computer Science, Data Science, Informatics, and Software Engineering — designed to prepare you for careers and graduate programs at the forefront of computing.</p>
            <p className="mobile-menu__blurb">From your first semester you'll work on real projects, collaborate with peers in Alden Hall, and learn from faculty who bring both research expertise and industry experience into the classroom.</p>
            <a
              href="https://allegheny.edu/apply/"
              className="button__fill mobile-menu__apply"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
              <ExternalLinkIcon size="0.85em" />
            </a>
          </div>

          <nav className="mobile-menu__nav">
            {navLinks.filter(link => link.label !== "Home").map(link => (
              <div key={link.href} className="mobile-menu__item">
                <button
                  type="button"
                  className={`mobile-menu__link${link.accent ? " mobile-menu__link--accent" : ""}`}
                  onClick={() => link.children ? toggleSection(link.label) : window.location.assign(link.href)}
                  aria-expanded={link.children ? openSection === link.label : undefined}
                  aria-controls={link.children ? `mobile-subnav-${link.label.toLowerCase().replace(/\s+/g, '-')}` : undefined}
                >
                  {link.label}
                  <svg
                    className={`mobile-menu__chevron${openSection === link.label ? " mobile-menu__chevron--open" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </button>
                {link.children && (
                  <div
                    id={`mobile-subnav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`mobile-menu__subnav${openSection === link.label ? " mobile-menu__subnav--open" : ""}`}
                  >
                    <div>
                      {link.children.map(child => (
                        <a key={child.href} href={child.href} className="mobile-menu__sublink">
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

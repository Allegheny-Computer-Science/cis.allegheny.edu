import { useState, useEffect } from "react";

function Brand() {
  return (
    <div className="header__brand">
      <div className="header__logo-placeholder" aria-hidden="true" />
      <div className="header__titles">
        <span className="header__college">Allegheny College</span>
        <span className="header__dept">Computer &amp; Information Science</span>
      </div>
    </div>
  );
}

export default function HeaderNav({ navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  useEffect(() => {
    let timer;
    let lastY = window.scrollY;
    const THRESHOLD = 54;

    const onScroll = () => {
      const y = window.scrollY;
      const scrollingUp = y < lastY;
      lastY = y;

      if (y > THRESHOLD) {
        setScrolled(true);
        clearTimeout(timer);
        timer = setTimeout(() => setLinksVisible(true), 250);
      } else {
        clearTimeout(timer);
        setScrolled(false);
        setLinksVisible(false);
        // Snap to top when scrolling up through the transition zone
        if (scrollingUp && y > 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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
              className={`header__link${link.label === "Home" ? " header__link--home" : ""}`}
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="0.75em" height="0.75em" fill="currentColor" aria-hidden="true">
              <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
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

      {/* Scrim — darkens page content below the panel */}
      <div
        className={`mobile-menu__scrim${menuOpen ? " mobile-menu__scrim--open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Navy panel — sized to content */}
      <div className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <Brand />
          <button
            className="mobile-menu__close"
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            &#x2715;
          </button>
        </div>

        <div className="mobile-menu__search">
          <div className="mobile-menu__search-inner">
            <input type="search" placeholder="Search Website" className="mobile-menu__search-input" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1rem" height="1rem" fill="currentColor" className="mobile-menu__search-icon" aria-hidden="true">
              <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
        </div>

        <div className="mobile-menu__body">
          <div className="mobile-menu__left">
            <p className="mobile-menu__blurb">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod lorem maximus, ornare eros sed, cursus sem. Cras blandit dignissim nisl non lacinia. Aliquam ut mollis risus.</p>
            <p className="mobile-menu__blurb">Duis ultrices ornare malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla consectetur libero interdum arcu tempor, at elementum odio accumsan. Maecenas porttitor nunc sapien, non mollis felis accumsan at.</p>
            <a
              href="https://allegheny.edu/apply/"
              className="button__fill mobile-menu__apply"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="0.85em" height="0.85em" fill="currentColor" aria-hidden="true">
                <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
              </svg>
            </a>
          </div>

          <nav className="mobile-menu__nav">
            {navLinks.filter(link => link.label !== "Home").map(link => (
              <div key={link.href} className="mobile-menu__item">
                <button
                  type="button"
                  className="mobile-menu__link"
                  onClick={() => link.children ? toggleSection(link.label) : window.location.assign(link.href)}
                  aria-expanded={openSection === link.label}
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
                  <div className={`mobile-menu__subnav${openSection === link.label ? " mobile-menu__subnav--open" : ""}`}>
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

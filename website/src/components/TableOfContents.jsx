import { useState, useEffect, useRef } from 'react';

export default function TableOfContents({ latestUpdate = null, relatedLinks = null, showApply = false }) {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');
    const sidebarRef = useRef(null);

    // Heading detection + active-section tracking
    useEffect(() => {
        const body = document.querySelector('.mdx-body');
        if (!body) return;

        const nodes = Array.from(body.querySelectorAll('h1, h2, h3, h4'));
        setHeadings(nodes.map(el => ({
            id: el.id,
            text: el.textContent,
            level: parseInt(el.tagName[1]),
        })));

        const observer = new IntersectionObserver(
            entries => {
                const hit = entries.find(e => e.isIntersecting);
                if (hit) setActiveId(hit.target.id);
            },
            { rootMargin: '0px 0px -70% 0px', threshold: 0 }
        );
        nodes.forEach(el => { if (el.id) observer.observe(el); });
        return () => observer.disconnect();
    }, []);

    // Natural sticky scroll:
    // - sidebar scrolls with page normally
    // - sticks when its bottom hits the viewport bottom (scrolling down)
    // - sticks when its top hits the header bottom (scrolling up)
    useEffect(() => {
        const sidebar = sidebarRef.current;
        if (!sidebar) return;

        const GAP     = 16;
        const headerEl = document.querySelector('header');
        const headerH  = headerEl?.offsetHeight ?? 80;

        let prevY = window.scrollY;
        sidebar.style.top = headerH + 'px';

        const onScroll = () => {
            const y   = window.scrollY;
            const dy  = y - prevY;
            prevY = y;

            const vH = window.innerHeight;
            const sH = sidebar.offsetHeight;

            if (sH + headerH + GAP <= vH) {
                // Fits in viewport — always stick top below header
                sidebar.style.top = headerH + 'px';
                return;
            }

            // Taller than viewport: scroll through it
            // top decreases as user scrolls down (sidebar scrolls up through viewport)
            // clamped so the top never goes above the header and the bottom never exits below viewport
            const current = parseFloat(sidebar.style.top) || headerH;
            let next = current - dy;
            next = Math.min(next, headerH);         // top boundary: header bottom
            next = Math.max(next, vH - sH - GAP);  // bottom boundary: viewport bottom
            sidebar.style.top = next + 'px';
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [headings]); // re-run when sidebar height may have changed

    const title    = headings.find(h => h.level === 1);
    const navItems = headings.filter(h => h.level > 1);

    return (
        <aside className="mdx-toc" ref={sidebarRef}>

            {/* Page title */}
            {title && <div className="mdx-toc__title">{title.text}</div>}

            {/* Heading navigation */}
            {navItems.length > 0 && (
                <nav className="mdx-toc__nav">
                    {navItems.map(h => (
                        <a
                            key={h.id}
                            href={`#${h.id}`}
                            className={[
                                'mdx-toc__link',
                                h.level >= 3 ? 'mdx-toc__link--sub' : '',
                                h.id === activeId ? 'mdx-toc__link--active' : '',
                            ].filter(Boolean).join(' ')}
                        >
                            {h.text}
                        </a>
                    ))}
                </nav>
            )}

            {/* Apply CTA — About and Plan pages only */}
            {showApply && (
                <div className="mdx-toc__apply">
                    <span className="mdx-toc__apply-text">Ready to Apply?</span>
                    <a
                        href="https://admissions.allegheny.edu/apply"
                        className="mdx-toc__apply-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Apply Now
                    </a>
                </div>
            )}

            {/* Latest update */}
            {latestUpdate && (
                <div className="mdx-toc__section">
                    <span className="mdx-toc__section-label">Latest Update</span>
                    <a href={latestUpdate.href} className="mdx-toc__update-title">
                        {latestUpdate.title}
                    </a>
                    <div className="mdx-toc__update-meta">
                        <span className={`mdx-toc__category mdx-toc__category--${latestUpdate.category}`}>
                            {latestUpdate.category}
                        </span>
                        <span className="mdx-toc__update-date">{latestUpdate.date}</span>
                    </div>
                </div>
            )}

            {/* Contact */}
            <div className="mdx-toc__section">
                <span className="mdx-toc__section-label">Contact</span>
                <a href="tel:8143324351" className="mdx-toc__contact-row">814-332-4351</a>
                <a href="mailto:compsci@allegheny.edu" className="mdx-toc__contact-row">compsci@allegheny.edu</a>
            </div>

            {/* Related pages — only if frontmatter provides them */}
            {relatedLinks && relatedLinks.length > 0 && (
                <div className="mdx-toc__section">
                    <span className="mdx-toc__section-label">Related</span>
                    {relatedLinks.map(link => (
                        <a key={link.href} href={link.href} className="mdx-toc__related-link">
                            {link.label}
                        </a>
                    ))}
                </div>
            )}

        </aside>
    );
}

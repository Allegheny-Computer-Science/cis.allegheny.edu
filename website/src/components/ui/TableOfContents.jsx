import { useEffect, useRef } from 'react';

export default function TableOfContents({
    latestUpdate = null,
    relatedLinks = null,
    showApply = false,
    sectionPages = null,
    sectionLabel = null,
    currentPath = '',
}) {
    const sidebarRef = useRef(null);

    // Natural sticky scroll
    useEffect(() => {
        const sidebar = sidebarRef.current;
        if (!sidebar) return;

        const GAP      = 16;
        const headerEl = document.querySelector('header');
        const headerH  = headerEl?.offsetHeight ?? 80;

        let prevY = window.scrollY;
        sidebar.style.top = headerH + 'px';

        const onScroll = () => {
            const y  = window.scrollY;
            const dy = y - prevY;
            prevY = y;

            const vH = window.innerHeight;
            const sH = sidebar.offsetHeight;

            if (sH + headerH + GAP <= vH) {
                sidebar.style.top = headerH + 'px';
                return;
            }

            const current = parseFloat(sidebar.style.top) || headerH;
            let next = current - dy;
            next = Math.min(next, headerH);
            next = Math.max(next, vH - sH - GAP);
            sidebar.style.top = next + 'px';
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [sectionPages]);

    return (
        <aside className="mdx-toc" ref={sidebarRef}>

            {/* Section heading */}
            {sectionLabel && <div className="mdx-toc__title">{sectionLabel}</div>}

            {/* Section page navigation */}
            {sectionPages && sectionPages.length > 0 && (
                <nav className="mdx-toc__nav">
                    {sectionPages.map(page => {
                        const isActive = currentPath === page.href || currentPath.startsWith(page.href.replace(/\/$/, '') + '/');
                        return (
                            <a
                                key={page.href}
                                href={page.href}
                                className={['mdx-toc__link', isActive ? 'mdx-toc__link--active' : ''].filter(Boolean).join(' ')}
                            >
                                {page.label}
                            </a>
                        );
                    })}
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

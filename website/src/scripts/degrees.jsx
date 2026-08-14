import { courses } from '../data/courses.js';

// Build lookup from canonical courses.js data — no duplication
const courseData = Object.fromEntries(
  courses.map(c => [c.code, {
    title:       c.title,
    credits:     c.credits,
    prereq:      c.prereq,
    dist:        c.distribution,
    description: c.description,
    outcomes:    c.outcomes,
  }])
);

// ── Tab switching ──────────────────────────────────────────────────────────────
const tabs   = document.querySelectorAll('.degree-tab');
const panels = document.querySelectorAll('.degree-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.discipline;
    tabs.forEach(t   => t.setAttribute('aria-selected', t.dataset.discipline === target ? 'true' : 'false'));
    panels.forEach(p => p.setAttribute('aria-hidden',   p.dataset.panel === target ? 'false' : 'true'));
  });
});

// ── Course popup ───────────────────────────────────────────────────────────────
const popup    = document.getElementById('course-popup');
const backdrop = popup.querySelector('.course-popup__backdrop');
const closeBtn = popup.querySelector('.course-popup__close');

function openPopup(code) {
  const d = courseData[code];
  if (!d) return;
  document.getElementById('popup-code').textContent    = code;
  document.getElementById('popup-title').textContent   = d.title;
  document.getElementById('popup-credits').textContent = `${d.credits} credits`;
  document.getElementById('popup-dist').textContent    = d.dist?.length ? `Distribution: ${d.dist.join(', ')}` : '';
  document.getElementById('popup-prereq').textContent  = d.prereq;
  document.getElementById('popup-description').textContent = d.description;
  const ol = document.getElementById('popup-outcomes');
  ol.innerHTML = '';
  (d.outcomes ?? []).forEach(o => {
    const li = document.createElement('li');
    li.textContent = o;
    ol.appendChild(li);
  });
  document.getElementById('popup-outcomes-wrap').style.display = d.outcomes?.length ? '' : 'none';
  popup.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closePopup() {
  popup.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('click', e => {
  const pill = e.target.closest('.course-pill--link');
  if (pill) openPopup(pill.dataset.code);
});

backdrop.addEventListener('click', closePopup);
closeBtn.addEventListener('click', closePopup);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

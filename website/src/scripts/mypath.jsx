// ── Course schedule availability ──────────────────────────────────────────────
// Loaded from src/data/course-schedule.csv at build time.
// Each key is "Fall YYYY" or "Spring YYYY"; value is true if the course runs that term.
import scheduleRaw from '../data/course-schedule.csv?raw';

function parseScheduleCsv(csv) {
  const [headerLine, ...rows] = csv.trim().split('\n');
  const semesters = headerLine.split(',').slice(1).map(s => s.trim());
  const out = {};
  for (const row of rows) {
    const cols = row.split(',');
    const code = cols[0].trim();
    out[code] = {};
    semesters.forEach((sem, i) => {
      out[code][sem] = cols[i + 1]?.trim().toUpperCase() === 'Y';
    });
  }
  return out;
}

const SCHEDULE = parseScheduleCsv(scheduleRaw);

const OTHER_DEPT_COURSES = {
  "SWS 105":  { title: "First-Year Seminar",           credits: 4 },
  "SWS 205":  { title: "Sophomore Seminar",            credits: 4 },
  "COMM 342": { title: "Business & Professional Comm.", credits: 4 },
  "PHIL 210": { title: "Ethics",                       credits: 4 },
  "MATH 151": { title: "Calculus I",                   credits: 4 },
  "MATH 152": { title: "Calculus II",                  credits: 4 },
  "MATH 210": { title: "Linear Algebra",               credits: 4 },
  "STAT 220": { title: "Applied Statistics",           credits: 4 },
  "BIO 110":  { title: "Fundamentals of Biology",      credits: 4 },
};

// Non-CMPSC required courses shown in the major palette with dept chip styling.
// display: short label shown in chip__code slot.
const EXTERNAL_REQS = {
  "DS-ETHICS":      { title: "Ethics Course",              credits: 4, display: "Ethics"    },
  "DS-COMM":        { title: "Communication Course",       credits: 4, display: "Comm."     },
  "DS-STAT":        { title: "Statistics Course",          credits: 4, display: "Stat."     },
  "DS-ELEC":        { title: "Outside Elective",           credits: 4, display: "Elective"  },
  "INFM-METHODS-1": { title: "Methods Course",             credits: 4, display: "Methods"   },
  "INFM-METHODS-2": { title: "Methods Course",             credits: 4, display: "Methods"   },
  "INFM-APPMOD-1":  { title: "Application Module Course",  credits: 4, display: "App. Mod." },
  "INFM-APPMOD-2":  { title: "Application Module Course",  credits: 4, display: "App. Mod." },
};

// Courses always auto-placed and non-removable
const LOCKED_COURSES = {
  'LS 120': { title: 'LS 120', credits: 4, defaultKey: '1-Fall'   },
  'LS 121': { title: 'LS 121', credits: 4, defaultKey: '1-Spring' },
};

// Thesis/capstone codes excluded from minor palette and Other CMPSC
const CAPSTONE_CODES = new Set([
  'CMPSC 580','CMPSC 600','CMPSC 610',
  'DS 600','DS 610','INFM 600','INFM 610','SE 600','SE 610',
]);

const CMPSC_MICROCREDS = [
  { title: "Artificial Intelligence Engineering",
    required: ["CMPSC 101","CMPSC 203"], choose: 1, from: ["CMPSC 303","CMPSC 405"] },
  { title: "Cybersecurity Risk Analysis",
    required: ["CMPSC 200","CMPSC 400","CMPSC 403"], choose: 0, from: [] },
  { title: "Data Analysis with Python and R",
    required: ["CMPSC 301"], choose: 2, from: ["CMPSC 100","CMPSC 101","CMPSC 102"] },
  { title: "Embedded Systems Engineering",
    required: ["CMPSC 200","CMPSC 203"], choose: 1, from: ["CMPSC 304","CMPSC 406"] },
  { title: "Product Development in the Internet of Things",
    required: ["CMPSC 100","CMPSC 200"], choose: 1, from: ["CMPSC 304","CMPSC 406"] },
  { title: "Programming with Web Technologies",
    required: ["CMPSC 302"], choose: 2, from: ["CMPSC 100","CMPSC 101","CMPSC 102"] },
  { title: "Site Reliability Engineering",
    required: ["CMPSC 203","CMPSC 303"], choose: 1, from: ["CMPSC 302","CMPSC 404"] },
  { title: "Software Development with Python",
    required: ["CMPSC 100","CMPSC 101"], choose: 1, from: ["CMPSC 201","CMPSC 203"] },
  { title: "Software Performance Engineering",
    required: ["CMPSC 101","CMPSC 202"], choose: 1, from: ["CMPSC 303","CMPSC 305","CMPSC 400"] },
];

// ── Prerequisites ──────────────────────────────────────────────────────────────
// Sourced from courses.js prereq fields. Each value is an array of OR-groups;
// satisfying ANY group satisfies the prereq. A group is an array of codes ALL
// of which must be placed in prior semesters.
// "Permission of instructor" clauses are omitted — not enforceable here.
// CMPSC 300: "BIO 221 and FSBIO 201, or CMPSC 100" — only CMPSC 100 trackable.
const PREREQS = {
  "CMPSC 101": [["CMPSC 100"]],                      // CMPSC 100 or permission
  "CMPSC 102": [["CMPSC 100"]],                      // CMPSC 100
  "CMPSC 200": [["CMPSC 102"]],                      // CMPSC 102
  "CMPSC 201": [["CMPSC 101"], ["CMPSC 102"]],       // CMPSC 101 or CMPSC 102
  "CMPSC 202": [["CMPSC 101"], ["CMPSC 102"]],       // CMPSC 101 or CMPSC 102
  "CMPSC 203": [["CMPSC 101"]],                      // CMPSC 101
  "CMPSC 204": [["CMPSC 102"]],                      // CMPSC 102
  "CMPSC 300": [["CMPSC 100"]],                      // BIO 221+FSBIO 201, or CMPSC 100
  "CMPSC 301": [["CMPSC 101"], ["CMPSC 102"]],       // CMPSC 101 or CMPSC 102
  "CMPSC 302": [["CMPSC 104"]],                      // CMPSC 104
  "CMPSC 303": [["CMPSC 101"], ["CMPSC 102"]],       // CMPSC 101 or CMPSC 102
  "CMPSC 304": [["CMPSC 101"], ["CMPSC 102"]],       // CMPSC 101 or CMPSC 102
  "CMPSC 305": [["CMPSC 101"]],                      // CMPSC 101
  "CMPSC 350": [["CMPSC 101"]],                      // CMPSC 101
  "CMPSC 400": [["CMPSC 200"], ["CMPSC 201"]],       // CMPSC 200 or CMPSC 201
  "CMPSC 403": [["CMPSC 200"], ["CMPSC 201"]],       // CMPSC 200 or CMPSC 201
  "CMPSC 404": [["CMPSC 203"], ["CMPSC 302"]],       // CMPSC 203 or CMPSC 302
  "CMPSC 405": [["CMPSC 301"]],                      // CMPSC 301
  "CMPSC 406": [["CMPSC 200"]],                      // CMPSC 200
  "CMPSC 600": [["CMPSC 580"]],                      // CMPSC 580
  "CMPSC 610": [["CMPSC 600"]],                      // CMPSC 600
  "DS 600":    [["CMPSC 580"]],                      // CMPSC 580
  "DS 610":    [["DS 600"]],                         // DS 600
  "INFM 600":  [["CMPSC 580"]],                      // CMPSC 580 or approved junior seminar
  "INFM 610":  [["INFM 600"]],                       // INFM 600
  "SE 600":    [["CMPSC 580"]],                      // CMPSC 580
  "SE 610":    [["SE 600"]],                         // SE 600
};

// ── Course data ────────────────────────────────────────────────────────────────
const ALL_COURSES = {
  "CMPSC 100": { title: "Computational Expression",  credits: 4 },
  "CMPSC 101": { title: "Data Structures",           credits: 4 },
  "CMPSC 102": { title: "Discrete Structures",       credits: 4 },
  "CMPSC 104": { title: "Document Engineering",      credits: 4 },
  "CMPSC 105": { title: "Data Exploration",          credits: 4 },
  "CMPSC 200": { title: "Computer Organization",     credits: 4 },
  "CMPSC 201": { title: "Programming Languages",     credits: 4 },
  "CMPSC 202": { title: "Algorithm Analysis",        credits: 4 },
  "CMPSC 203": { title: "Software Engineering",      credits: 4 },
  "CMPSC 204": { title: "Theoretical Machines",      credits: 4 },
  "CMPSC 300": { title: "Bioinformatics",            credits: 4 },
  "CMPSC 301": { title: "Data Science",              credits: 4 },
  "CMPSC 302": { title: "Web Design",                credits: 4 },
  "CMPSC 303": { title: "Artificial Intelligence",   credits: 4 },
  "CMPSC 304": { title: "Robotic Agents",            credits: 4 },
  "CMPSC 305": { title: "Database Systems",          credits: 4 },
  "CMPSC 350": { title: "Computational Narrative",   credits: 4 },
  "CMPSC 400": { title: "Operating Systems",         credits: 4 },
  "CMPSC 403": { title: "Computer Security",         credits: 4 },
  "CMPSC 404": { title: "Web Applications",          credits: 4 },
  "CMPSC 405": { title: "Deep Learning",             credits: 4 },
  "CMPSC 406": { title: "Internet of Things",        credits: 4 },
  "CMPSC 580": { title: "Junior Seminar",            credits: 4 },
  "CMPSC 600": { title: "Senior Thesis I",           credits: 4 },
  "CMPSC 610": { title: "Senior Thesis II",          credits: 4 },
  "DS 600":    { title: "Senior Thesis I (DS)",      credits: 4 },
  "DS 610":    { title: "Senior Thesis II (DS)",     credits: 4 },
  "INFM 600":  { title: "Senior Project I (INFM)",   credits: 4 },
  "INFM 610":  { title: "Senior Project II (INFM)",  credits: 4 },
  "SE 600":    { title: "Senior Thesis I (SE)",      credits: 4 },
  "SE 610":    { title: "Senior Thesis II (SE)",     credits: 4 },
};

const PROGRAMS = {
  cmpsc: {
    label: "Computer Science",
    required: ["CMPSC 100","CMPSC 101","CMPSC 102","CMPSC 200","CMPSC 202","CMPSC 204","CMPSC 406","CMPSC 580","CMPSC 600","CMPSC 610"],
    electives: { choose: 2, from: ["CMPSC 300","CMPSC 304","CMPSC 400","CMPSC 403"] },
  },
  ds: {
    label: "Data Science",
    required: ["CMPSC 100","CMPSC 101","CMPSC 105","CMPSC 301","CMPSC 405","CMPSC 580","DS 600","DS 610"],
    electives: null,
    externalReqs: ["DS-ETHICS","DS-COMM","DS-STAT","DS-ELEC"],
  },
  infm: {
    label: "Informatics",
    required: ["CMPSC 100","CMPSC 101","CMPSC 105","CMPSC 350","CMPSC 580","INFM 600","INFM 610"],
    electives: null,
    externalReqs: ["COMM 342","INFM-METHODS-1","INFM-METHODS-2","INFM-APPMOD-1","INFM-APPMOD-2"],
  },
  se: {
    label: "Software Engineering",
    required: ["CMPSC 100","CMPSC 101","CMPSC 104","CMPSC 201","CMPSC 203","CMPSC 302","CMPSC 404","CMPSC 580","SE 600","SE 610"],
    electives: { choose: 2, from: ["CMPSC 305","CMPSC 400","CMPSC 403","CMPSC 303"] },
  },
};

const STORAGE_KEY = 'cis-planner-v1';

// ── State ──────────────────────────────────────────────────────────────────────
const plan = {};
for (let y = 1; y <= 4; y++) {
  for (const s of ["Fall","Spring"]) plan[`${y}-${s}`] = [];
}

let selectedMajor    = "";
let selectedMinor    = "";
let selectedClassYear = 0;
let draggedSource    = null;
let draggedEntry     = null;
let extCounter       = 0;
let customCounter    = 0;
let savedDeptCourses = [];

// ── DOM refs ───────────────────────────────────────────────────────────────────
const selectMajorEl    = document.getElementById('select-major');
const selectMinorEl    = document.getElementById('select-minor');
const selectYearEl     = document.getElementById('select-year');
const paletteRequired  = document.getElementById('palette-required');
const paletteMinorEl   = document.getElementById('palette-minor');
const paletteMinorSec  = document.getElementById('palette-minor-section');
const paletteMinorHead = document.getElementById('palette-minor-heading');
const paletteOther     = document.getElementById('palette-other');
const paletteOtherHint = document.getElementById('palette-other-hint');
const paletteDept      = document.getElementById('palette-dept');
const paletteMajorHint = document.getElementById('palette-major-hint');
const progressMajor    = document.getElementById('progress-major');
const progressCredits  = document.getElementById('progress-credits');

// ── Persistence ────────────────────────────────────────────────────────────────
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      plan, selectedMajor, selectedMinor, selectedClassYear,
      extCounter, customCounter, savedDeptCourses,
    }));
  } catch (_) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    for (const key of Object.keys(plan)) {
      if (Array.isArray(saved.plan?.[key])) plan[key] = saved.plan[key];
    }
    // Enforce locked flag for courses that must always be non-deletable
    const ALWAYS_LOCKED = new Set(['LS 120','LS 121','SWS 105','SWS 205']);
    for (const key of Object.keys(plan)) {
      plan[key].forEach(e => { if (ALWAYS_LOCKED.has(e.code)) e.locked = true; });
    }
    if (saved.extCounter)    extCounter    = saved.extCounter;
    if (saved.customCounter) customCounter = saved.customCounter;
    if (Array.isArray(saved.savedDeptCourses)) savedDeptCourses = saved.savedDeptCourses;
    if (saved.selectedMajor && PROGRAMS[saved.selectedMajor]) {
      selectedMajor = saved.selectedMajor;
      selectMajorEl.value = selectedMajor;
    }
    if (saved.selectedMinor && PROGRAMS[saved.selectedMinor] && saved.selectedMinor !== selectedMajor) {
      selectedMinor = saved.selectedMinor;
      selectMinorEl.value = selectedMinor;
    }
    if (saved.selectedClassYear) {
      selectedClassYear = Number(saved.selectedClassYear);
      selectYearEl.value = selectedClassYear;
    }
  } catch (_) {}
}

// ── Fixed / locked course autofill ────────────────────────────────────────────
function autofillFixed() {
  const placed = placedCodes();
  Object.entries(LOCKED_COURSES).forEach(([code, d]) => {
    if (!placed.has(code)) plan[d.defaultKey].push({ code, title: d.title, credits: d.credits, locked: true });
  });
  if (!placed.has('SWS 105')) plan['1-Fall'].push({ code: 'SWS 105', title: 'First-Year Seminar', credits: 4, locked: true });
  if (!placed.has('SWS 205')) plan['2-Fall'].push({ code: 'SWS 205', title: 'Sophomore Seminar',  credits: 4, locked: true });
}

// ── Schedule helpers ───────────────────────────────────────────────────────────
// Convert a planner slot (e.g. "2-Fall") + graduation year into the real-world
// semester label used as a column header in course-schedule.csv.
// Class of 2028 starts Fall 2024, so Year 1 Fall = Fall (2028 - 4) = Fall 2024.
function realSemester(planKey, classYear) {
  const [yr, sem] = planKey.split('-');
  const n = parseInt(yr);
  const calYear = sem === 'Fall' ? classYear - 5 + n : classYear - 4 + n;
  return `${sem} ${calYear}`;
}

function isCourseAvailable(code, planKey) {
  if (!selectedClassYear) return null;
  const sched = SCHEDULE[code];
  if (!sched) return null;
  const sem = realSemester(planKey, selectedClassYear);
  if (!(sem in sched)) return null;
  return sched[sem];
}

function missingPrereqs(code, planKey) {
  const groups = PREREQS[code];
  if (!groups || groups.length === 0) return [];
  const keyOrder = ['1-Fall','1-Spring','2-Fall','2-Spring','3-Fall','3-Spring','4-Fall','4-Spring'];
  const targetIdx = keyOrder.indexOf(planKey);
  const priorCodes = new Set();
  keyOrder.slice(0, targetIdx).forEach(k => (plan[k] || []).forEach(e => priorCodes.add(e.code)));
  return groups.filter(group => !group.every(c => priorCodes.has(c)))
               .map(group => group.join(' + '));
}

function highlightZones(code) {
  if (!selectedClassYear || !SCHEDULE[code]) return;
  document.querySelectorAll('.semester-drop').forEach(zone => {
    const key   = `${zone.dataset.year}-${zone.dataset.sem}`;
    const avail = isCourseAvailable(code, key);
    if (avail === true)  zone.classList.add('semester-drop--valid');
    if (avail === false) zone.classList.add('semester-drop--invalid');
  });
}

function clearZoneHighlights() {
  document.querySelectorAll('.semester-drop').forEach(zone => {
    zone.classList.remove('semester-drop--valid', 'semester-drop--invalid');
  });
}

document.addEventListener('dragstart', e => {
  const chip = e.target.closest('[data-code]');
  if (chip) highlightZones(chip.dataset.code);
}, true);

document.addEventListener('dragend', clearZoneHighlights, true);

// ── Palette builders ───────────────────────────────────────────────────────────
function buildMajorPalette() {
  paletteRequired.innerHTML = '';
  const prog = PROGRAMS[selectedMajor];
  if (!prog) {
    paletteMajorHint.hidden = false;
    updateProgress();
    return;
  }
  paletteMajorHint.hidden = true;
  const placed = placedCodes();
  prog.required.forEach(code => addChip(paletteRequired, code, 'required', placed));
  if (prog.electives) {
    appendGroupHeading(paletteRequired, `Choose ${prog.electives.choose} of the following:`);
    prog.electives.from.forEach(code => addChip(paletteRequired, code, 'elective', placed));
  }
  if (prog.externalReqs?.length) {
    appendGroupHeading(paletteRequired, 'Outside Department Requirements:');
    prog.externalReqs.forEach(code => {
      const d = OTHER_DEPT_COURSES[code] || EXTERNAL_REQS[code];
      if (d) addDeptChip(paletteRequired, code, d, placed);
    });
  }
  updateProgress();
}

function buildMinorPalette() {
  paletteMinorEl.innerHTML = '';
  const minor = PROGRAMS[selectedMinor];
  if (!minor) { paletteMinorSec.hidden = true; updateProgress(); return; }
  paletteMinorSec.hidden = false;
  paletteMinorHead.textContent = `Minor — ${minor.label}`;
  const placed     = placedCodes();
  const majorCodes = new Set([
    ...(PROGRAMS[selectedMajor]?.required ?? []),
    ...(PROGRAMS[selectedMajor]?.electives?.from ?? []),
  ]);
  const uniqueRequired = minor.required.filter(c => !majorCodes.has(c) && !CAPSTONE_CODES.has(c));
  if (uniqueRequired.length === 0 && !minor.electives) {
    appendNote(paletteMinorEl, 'All minor requirements are already covered by your major.');
  } else {
    uniqueRequired.forEach(code => addChip(paletteMinorEl, code, 'required', placed));
  }
  if (minor.electives) {
    appendGroupHeading(paletteMinorEl, `Choose ${minor.electives.choose} of the following:`);
    minor.electives.from.filter(c => !majorCodes.has(c))
      .forEach(code => addChip(paletteMinorEl, code, 'elective', placed));
  }
  if (minor.externalNote) appendNote(paletteMinorEl, minor.externalNote);
  updateProgress();
}

function buildOtherPalette() {
  paletteOther.innerHTML = '';
  const placed = placedCodes();
  const inUse  = new Set([
    ...(PROGRAMS[selectedMajor]?.required ?? []),
    ...(PROGRAMS[selectedMajor]?.electives?.from ?? []),
    ...(PROGRAMS[selectedMinor]?.required ?? []),
    ...(PROGRAMS[selectedMinor]?.electives?.from ?? []),
  ]);
  let count = 0;
  Object.keys(ALL_COURSES).forEach(code => {
    if (!code.startsWith('CMPSC')) return;
    if (CAPSTONE_CODES.has(code)) return;
    if (inUse.has(code)) return;
    addChip(paletteOther, code, 'other', placed);
    count++;
  });
  paletteOtherHint.hidden = count > 0;
}

function buildDeptPalette() {
  paletteDept.innerHTML = '';
  const placed = placedCodes();
  savedDeptCourses.forEach(c => {
    if (placed.has(c.id)) return;
    addDeptChip(paletteDept, c.id, { title: c.title, credits: c.credits, display: '→' }, placed);
  });
}

// Add-course form
const deptNameEl    = document.getElementById('dept-course-name');
const deptCreditsEl = document.getElementById('dept-course-credits');
document.getElementById('btn-add-dept-course').addEventListener('click', () => {
  const name = deptNameEl.value.trim();
  if (!name) { deptNameEl.focus(); return; }
  const credits = Math.max(1, parseInt(deptCreditsEl.value) || 4);
  customCounter++;
  savedDeptCourses.push({ id: `CUSTOM-${customCounter}`, title: name, credits });
  deptNameEl.value = '';
  buildDeptPalette();
  saveState();
});
deptNameEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-add-dept-course').click();
});

// ── Chip factory ───────────────────────────────────────────────────────────────
function placedCodes() {
  return new Set(Object.values(plan).flatMap(arr => arr.map(c => c.code)));
}

function updateMicrocredentials() {
  const placed    = placedCodes();
  const container = document.getElementById('microcred-chips');
  const section   = document.getElementById('planner-microcreds');
  container.innerHTML = '';
  let anyVisible = false;
  CMPSC_MICROCREDS.forEach(mc => {
    const reqDone    = mc.required.every(c => placed.has(c));
    const choiceDone = mc.choose === 0 || mc.from.filter(c => placed.has(c)).length >= mc.choose;
    const complete   = reqDone && choiceDone;
    const reqProgress  = mc.required.filter(c => placed.has(c)).length;
    const fromProgress = mc.from.filter(c => placed.has(c)).length;
    if (reqProgress === 0 && fromProgress === 0 && !complete) return;
    anyVisible = true;
    const chip = document.createElement('div');
    chip.className = `microcred-chip${complete ? ' microcred-chip--complete' : ''}`;
    const need = mc.required.length + mc.choose;
    const done = reqProgress + Math.min(fromProgress, mc.choose);
    chip.innerHTML = `
      <span class="microcred-chip__title">${mc.title}</span>
      <span class="microcred-chip__count">${done} / ${need}</span>
    `;
    chip.title = complete
      ? 'All requirements met!'
      : `${mc.required.filter(c => !placed.has(c)).join(', ')} still needed`;
    container.appendChild(chip);
  });
  section.hidden = !anyVisible;
}

function refreshPalettes() {
  buildMajorPalette();
  buildMinorPalette();
  buildOtherPalette();
  buildDeptPalette();
  updateMicrocredentials();
}

function addDeptChip(container, code, d, placed) {
  if (placed?.has(code)) return;
  const chip = document.createElement('div');
  chip.className = 'course-chip course-chip--dept';
  chip.draggable = true;
  chip.dataset.code = code;
  chip.innerHTML = `
    <span class="chip__code">${d.display || code}</span>
    <span class="chip__title">${d.title}</span>
    <span class="chip__credits">${d.credits} cr</span>
  `;
  chip.addEventListener('dragstart', e => {
    draggedSource = 'palette';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', code);
  });
  container.appendChild(chip);
}

function addChip(container, code, type, placed) {
  const d = ALL_COURSES[code];
  if (!d || placed?.has(code)) return;
  const chip = document.createElement('div');
  chip.className = `course-chip course-chip--${type}`;
  chip.draggable = true;
  chip.dataset.code = code;
  chip.innerHTML = `
    <span class="chip__code">${code}</span>
    <span class="chip__title">${d.title}</span>
    <span class="chip__credits">${d.credits} cr</span>
  `;
  chip.addEventListener('dragstart', e => {
    draggedSource = 'palette';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', code);
  });
  container.appendChild(chip);
}

function appendGroupHeading(container, text) {
  const el = document.createElement('p');
  el.className = 'palette-group-heading';
  el.textContent = text;
  container.appendChild(el);
}

function appendNote(container, text) {
  const el = document.createElement('p');
  el.className = 'palette-hint palette-hint--note';
  el.textContent = text;
  container.appendChild(el);
}

// ── Shared drop handler ────────────────────────────────────────────────────────
function performDrop(zone, code) {
  clearZoneHighlights();
  const key = `${zone.dataset.year}-${zone.dataset.sem}`;

  if (isCourseAvailable(code, key) === false) { draggedSource = null; return; }

  const missing = missingPrereqs(code, key);
  if (missing.length > 0) {
    const needsAny = PREREQS[code].length > 1;
    const label = needsAny ? `one of: ${missing.join('; or ')}` : missing.join(', ');
    const ok = confirm(`Prerequisites not yet placed before this semester:\n  ${label}\n\nPlace anyway?`);
    if (!ok) { draggedSource = null; draggedEntry = null; refreshPalettes(); return; }
  }

  if (draggedSource?.startsWith('semester:')) {
    const srcKey = draggedSource.slice('semester:'.length);
    plan[srcKey] = plan[srcKey].filter(c => c.code !== code);
    renderSemester(srcKey);
  }

  if (!plan[key].find(c => c.code === code)) {
    const entry = (draggedEntry?.code === code)
      ? draggedEntry
      : (() => {
          const d = ALL_COURSES[code] || OTHER_DEPT_COURSES[code] || EXTERNAL_REQS[code]
                 || savedDeptCourses.find(c => c.id === code);
          return d
            ? { code, title: d.title, credits: Number(d.credits), display: d.display }
            : { code, title: code, credits: 4 };
        })();
    plan[key].push(entry);
    renderSemester(key);
  }

  draggedSource = null;
  draggedEntry  = null;
  refreshPalettes();
  saveState();
}

// ── Drop zones ─────────────────────────────────────────────────────────────────
document.querySelectorAll('.semester-drop').forEach(zone => {
  let enterCount = 0;

  zone.addEventListener('dragenter', e => {
    e.preventDefault();
    enterCount++;
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', () => {
    enterCount--;
    if (enterCount === 0) zone.classList.remove('drag-over');
  });
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    if (zone.classList.contains('semester-drop--invalid')) e.dataTransfer.dropEffect = 'none';
  });

  zone.addEventListener('drop', e => {
    e.preventDefault();
    enterCount = 0;
    zone.classList.remove('drag-over');
    performDrop(zone, e.dataTransfer.getData('text/plain'));
  });
});

// ── Touch drag-and-drop ────────────────────────────────────────────────────────
let touchGhost   = null;
let touchCode    = null;
let touchOffsetX = 0;
let touchOffsetY = 0;

document.addEventListener('touchstart', e => {
  const draggable = e.target.closest('[draggable="true"][data-code]');
  if (!draggable) return;

  touchCode = draggable.dataset.code;

  const semZone = draggable.closest('.semester-drop');
  if (semZone) {
    draggedSource = 'semester:' + semZone.dataset.year + '-' + semZone.dataset.sem;
    const entry = plan[semZone.dataset.year + '-' + semZone.dataset.sem]?.find(c => c.code === touchCode);
    draggedEntry = entry ? { ...entry } : null;
  } else {
    draggedSource = 'palette';
    draggedEntry  = null;
  }

  highlightZones(touchCode);

  const rect = draggable.getBoundingClientRect();
  const touch = e.touches[0];
  touchOffsetX = touch.clientX - rect.left;
  touchOffsetY = touch.clientY - rect.top;

  touchGhost = draggable.cloneNode(true);
  touchGhost.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.85;
    width: ${rect.width}px;
    left: ${touch.clientX - touchOffsetX}px;
    top:  ${touch.clientY - touchOffsetY}px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    transform: rotate(2deg);
    transition: none;
  `;
  document.body.appendChild(touchGhost);
}, { passive: true });

document.addEventListener('touchmove', e => {
  if (!touchGhost) return;
  e.preventDefault();
  const touch = e.touches[0];
  touchGhost.style.left = `${touch.clientX - touchOffsetX}px`;
  touchGhost.style.top  = `${touch.clientY - touchOffsetY}px`;

  // highlight drop zone under finger
  touchGhost.style.display = 'none';
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  touchGhost.style.display = '';
  document.querySelectorAll('.semester-drop').forEach(z => z.classList.remove('drag-over'));
  const zone = el?.closest('.semester-drop');
  if (zone) zone.classList.add('drag-over');
}, { passive: false });

document.addEventListener('touchend', e => {
  if (!touchGhost || touchCode === null) return;

  const touch = e.changedTouches[0];
  touchGhost.style.display = 'none';
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  touchGhost.style.display = '';

  document.querySelectorAll('.semester-drop').forEach(z => z.classList.remove('drag-over'));
  touchGhost.remove();
  touchGhost = null;

  const zone = el?.closest('.semester-drop');
  if (zone) {
    performDrop(zone, touchCode);
  } else {
    clearZoneHighlights();
    draggedSource = null;
    draggedEntry  = null;
  }

  touchCode = null;
}, { passive: true });

// ── Render a semester ──────────────────────────────────────────────────────────
function renderSemester(key) {
  const [year, sem] = key.split('-');
  const zone     = document.querySelector(`.semester-drop[data-year="${year}"][data-sem="${sem}"]`);
  const creditEl = document.querySelector(`.semester-credits[data-year="${year}"][data-sem="${sem}"]`);
  if (!zone) return;
  zone.innerHTML = '';
  let total = 0;
  plan[key].forEach(entry => {
    total += entry.credits;
    const chip  = document.createElement('div');
    const isDept = !entry.external && !ALL_COURSES[entry.code];
    chip.className = `course-chip course-chip--placed${isDept ? ' course-chip--dept-placed' : ''}`;
    chip.draggable = true;
    chip.dataset.code = entry.code;
    chip.innerHTML = `
      <span class="chip__code">${entry.display || entry.code}</span>
      <span class="chip__title">${entry.title}</span>
      <span class="chip__credits">${entry.credits} cr</span>
      ${entry.locked ? '' : `<button class="chip__remove" aria-label="Remove ${entry.title}" data-key="${key}" data-code="${entry.code}">&times;</button>`}
    `;
    chip.addEventListener('dragstart', e => {
      draggedSource = 'semester:' + key;
      draggedEntry  = { ...entry };
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', entry.code);
    });
    zone.appendChild(chip);
  });
  if (creditEl) creditEl.textContent = `${total} cr`;
}

function renderAllSemesters() {
  for (let y = 1; y <= 4; y++) {
    for (const s of ['Fall','Spring']) renderSemester(`${y}-${s}`);
  }
}

// ── Remove button delegation ───────────────────────────────────────────────────
document.getElementById('planner-grid').addEventListener('click', e => {
  const btn = e.target.closest('.chip__remove');
  if (!btn) return;
  const { key, code } = btn.dataset;
  plan[key] = plan[key].filter(c => c.code !== code);
  renderSemester(key);
  refreshPalettes();
  saveState();
});

// ── Progress ───────────────────────────────────────────────────────────────────
function updateProgress() {
  const prog  = PROGRAMS[selectedMajor];
  const minor = PROGRAMS[selectedMinor];
  const placed = new Set(Object.values(plan).flatMap(arr => arr.map(c => c.code)));
  const totalCredits = Object.values(plan).flatMap(arr => arr).reduce((s, c) => s + c.credits, 0);
  if (prog) {
    const reqDone = prog.required.filter(c => placed.has(c)).length;
    let label = `${reqDone} / ${prog.required.length} required`;
    if (prog.electives) {
      const elecDone = prog.electives.from.filter(c => placed.has(c)).length;
      label += ` · ${Math.min(elecDone, prog.electives.choose)} / ${prog.electives.choose} electives`;
    }
    if (minor) {
      const majorCodes  = new Set([...prog.required, ...(prog.electives?.from ?? [])]);
      const minorUnique = minor.required.filter(c => !majorCodes.has(c));
      const minorDone   = minorUnique.filter(c => placed.has(c)).length;
      label += ` · minor ${minorDone} / ${minorUnique.length}`;
    }
    progressMajor.querySelector('.progress-value').textContent = label;
  } else {
    progressMajor.querySelector('.progress-value').textContent = '—';
  }
  progressCredits.querySelector('.progress-value').textContent = `${totalCredits} cr`;
}

// ── Controls ───────────────────────────────────────────────────────────────────
const CAPSTONES = {
  cmpsc: { fall: "CMPSC 600", spring: "CMPSC 610" },
  ds:    { fall: "DS 600",    spring: "DS 610"    },
  infm:  { fall: "INFM 600",  spring: "INFM 610"  },
  se:    { fall: "SE 600",    spring: "SE 610"    },
};

function autofillCapstones(majorId) {
  const d580 = ALL_COURSES["CMPSC 580"];
  if (d580) plan["3-Spring"].push({ code: "CMPSC 580", title: d580.title, credits: d580.credits });
  const caps = CAPSTONES[majorId];
  if (caps) {
    const d1 = ALL_COURSES[caps.fall];
    const d2 = ALL_COURSES[caps.spring];
    if (d1) { plan["4-Fall"].push({ code: caps.fall,   title: d1.title, credits: d1.credits }); renderSemester("4-Fall");   }
    if (d2) { plan["4-Spring"].push({ code: caps.spring, title: d2.title, credits: d2.credits }); renderSemester("4-Spring"); }
  }
}

selectMajorEl.addEventListener('change', e => {
  selectedMajor = e.target.value;
  if (selectedMinor === selectedMajor) { selectedMinor = ''; selectMinorEl.value = ''; }
  for (const key of Object.keys(plan)) plan[key] = [];
  autofillFixed();
  if (selectedMajor) autofillCapstones(selectedMajor);
  refreshPalettes();
  saveState();
});

selectMinorEl.addEventListener('change', e => {
  if (e.target.value && e.target.value === selectedMajor) {
    alert("Your minor cannot be the same discipline as your major.");
    e.target.value = selectedMinor;
    return;
  }
  selectedMinor = e.target.value;
  refreshPalettes();
  saveState();
});

selectYearEl.addEventListener('change', e => {
  selectedClassYear = parseInt(e.target.value) || 0;
  saveState();
});

document.getElementById('btn-clear').addEventListener('click', () => {
  if (!confirm('Clear everything and start over?')) return;
  selectedMajor = ''; selectedMinor = ''; selectedClassYear = 0;
  selectMajorEl.value = ''; selectMinorEl.value = ''; selectYearEl.value = '';
  savedDeptCourses = []; customCounter = 0;
  for (const key of Object.keys(plan)) plan[key] = [];
  autofillFixed();
  renderAllSemesters();
  refreshPalettes();
  saveState();
});

// ── Export XLSX ────────────────────────────────────────────────────────────────
document.getElementById('btn-export').addEventListener('click', async () => {
  try {
  const XLSXStyle = window.XLSX;
  if (!XLSXStyle) throw new Error('xlsx-js-style did not load — check that /vendor/xlsx-js-style.min.js is served correctly.');

  // ── Color tokens ──────────────────────────────────────────────────────────────
  const NAVY   = '1B3054';
  const GOLD   = 'FEDA48';
  const WHITE  = 'FFFFFF';
  const LGRAY  = 'F4F6F9';
  const LTGOLD = 'FFF8D6';

  // ── Style factory ─────────────────────────────────────────────────────────────
  const thin = { style: 'thin', color: { rgb: 'D0D8E4' } };
  const bord = { top: thin, left: thin, bottom: thin, right: thin };

  function cell(value, fillRgb, fontRgb, { bold = false, size = 11, halign = 'left', numFmt } = {}) {
    const type = typeof value === 'number' ? 'n' : 's';
    return {
      v: value === '' || value == null ? '' : value,
      t: type,
      s: {
        fill: { patternType: 'solid', fgColor: { rgb: fillRgb } },
        font: { name: 'Calibri', sz: size, bold, color: { rgb: fontRgb } },
        alignment: { horizontal: halign, vertical: 'center' },
        border: bord,
        ...(numFmt ? { numFmt } : {}),
      },
    };
  }

  // ── Sheet assembly ─────────────────────────────────────────────────────────────
  // Layout: A=Fall Code  B=Fall Title  C=Fall Cr  D=gap  E=Spr Code  F=Spr Title  G=Spr Cr
  const COL = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6 };
  const ws = {};
  const merges = [];
  let R = 0; // current 0-indexed row

  function setRow(cells) {
    // cells: array of 7 values, each either a cell object or null (leaves gap cell styled gray)
    cells.forEach((c, ci) => {
      const ref = XLSXStyle.utils.encode_cell({ r: R, c: ci });
      ws[ref] = c ?? cell('', LGRAY, NAVY);
    });
    R++;
  }

  function merge(c1, c2) { merges.push({ s: { r: R - 1, c: COL[c1] }, e: { r: R - 1, c: COL[c2] } }); }

  // Banner
  const majorLabel = PROGRAMS[selectedMajor]?.label ?? '—';
  const minorLabel = PROGRAMS[selectedMinor]?.label ?? 'None';
  const classLabel = selectedClassYear ? `Class of ${selectedClassYear}` : '—';
  const totalCr    = Object.values(plan).flatMap(a => a).reduce((s, c) => s + c.credits, 0);

  setRow([cell('CIS Department  —  4-Year Academic Plan', NAVY, GOLD, { bold: true, size: 16, halign: 'center' }),
          null, null, null, null, null, null]);
  merge('A', 'G');

  setRow([
    cell(`Major: ${majorLabel}`, LGRAY, NAVY, { bold: true }),
    null,
    cell(`Minor: ${minorLabel}`, LGRAY, NAVY, { bold: true }),
    null,
    cell(classLabel, LGRAY, NAVY, { bold: true, halign: 'center' }),
    null,
    cell(`${totalCr} cr`, LGRAY, NAVY, { bold: true, halign: 'center' }),
  ]);
  merge('A', 'B'); merge('C', 'D'); merge('E', 'F');

  setRow([null, null, null, null, null, null, null]); // spacer

  // Year blocks
  for (let y = 1; y <= 4; y++) {
    const fKey = `${y}-Fall`;
    const sKey = `${y}-Spring`;
    const fSem = selectedClassYear ? realSemester(fKey, selectedClassYear) : `Year ${y} — Fall`;
    const sSem = selectedClassYear ? realSemester(sKey, selectedClassYear) : `Year ${y} — Spring`;
    const fCr  = plan[fKey].reduce((s, c) => s + c.credits, 0);
    const sCr  = plan[sKey].reduce((s, c) => s + c.credits, 0);

    // Year heading
    setRow([cell(`YEAR ${y}`, NAVY, WHITE, { bold: true, size: 13, halign: 'center' }),
            null, null, null, null, null, null]);
    merge('A', 'G');

    // Semester name row
    setRow([
      cell(fSem, GOLD, NAVY, { bold: true, halign: 'center' }), null, null,
      null,
      cell(sSem, GOLD, NAVY, { bold: true, halign: 'center' }), null, null,
    ]);
    merge('A', 'C'); merge('E', 'G');

    // Column headers
    setRow([
      cell('Course Code', NAVY, WHITE, { bold: true }),
      cell('Course Title', NAVY, WHITE, { bold: true }),
      cell('Cr', NAVY, WHITE, { bold: true, halign: 'center' }),
      null,
      cell('Course Code', NAVY, WHITE, { bold: true }),
      cell('Course Title', NAVY, WHITE, { bold: true }),
      cell('Cr', NAVY, WHITE, { bold: true, halign: 'center' }),
    ]);

    // Course rows
    const len = Math.max(plan[fKey].length, plan[sKey].length, 1);
    for (let i = 0; i < len; i++) {
      const fc = plan[fKey][i];
      const sc = plan[sKey][i];
      const bg = i % 2 === 0 ? WHITE : LGRAY;
      setRow([
        cell(fc?.code  ?? '', bg, NAVY),
        cell(fc?.title ?? '', bg, NAVY),
        cell(fc?.credits ?? '', bg, NAVY, { halign: 'center' }),
        null,
        cell(sc?.code  ?? '', bg, NAVY),
        cell(sc?.title ?? '', bg, NAVY),
        cell(sc?.credits ?? '', bg, NAVY, { halign: 'center' }),
      ]);
    }

    // Totals
    setRow([
      cell('', LTGOLD, NAVY),
      cell('Total credits', LTGOLD, NAVY, { bold: true, halign: 'right' }),
      cell(fCr, LTGOLD, NAVY, { bold: true, halign: 'center' }),
      null,
      cell('', LTGOLD, NAVY),
      cell('Total credits', LTGOLD, NAVY, { bold: true, halign: 'right' }),
      cell(sCr, LTGOLD, NAVY, { bold: true, halign: 'center' }),
    ]);

    setRow([null, null, null, null, null, null, null]); // spacer
  }

  ws['!ref'] = XLSXStyle.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: R - 1, c: 6 } });
  ws['!merges'] = merges;
  ws['!cols'] = [
    { wch: 14 }, { wch: 32 }, { wch: 5 },
    { wch: 2  },
    { wch: 14 }, { wch: 32 }, { wch: 5 },
  ];
  ws['!rows'] = Array.from({ length: R }, (_, i) => ({
    hpt: i === 0 ? 26 : i === 1 ? 16 : 15,
  }));

  const wb = XLSXStyle.utils.book_new();
  XLSXStyle.utils.book_append_sheet(wb, ws, '4-Year Plan');

  const buf  = XLSXStyle.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = `CIS-4-Year-Plan${selectedClassYear ? '-' + selectedClassYear : ''}.xlsx`;
    a.click();
    URL.revokeObjectURL(a.href);
  } catch (err) {
    console.error('Export failed:', err);
    alert('Export failed: ' + err);
  }
});

// ── Init ───────────────────────────────────────────────────────────────────────
loadState();
autofillFixed();
buildMajorPalette();
buildMinorPalette();
buildOtherPalette();
buildDeptPalette();
renderAllSemesters();
updateProgress();

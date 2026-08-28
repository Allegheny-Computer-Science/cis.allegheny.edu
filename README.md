# Allegheny CIS Website

Built with [Astro](https://astro.build). All commands run from the project root.

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build locally |

---

## Updating Data-Driven Pages

Most site content lives in plain JavaScript data files under `src/data/`. Edit the file, save, and the page rebuilds automatically in dev mode. No database, no CMS.

---

### Faculty & Staff Directory

**Page:** `/about/faculty`
**File:** `src/data/faculty.js`

Each person is one object in the `people` array. Order on the page matches the `order` field — keep values sequential and unique.

```js
{
  group: "faculty",       // "faculty" | "staff" — controls which section the person appears in
  order: 1,               // integer; lower = appears first within the group
  name: "Jane Smith, Ph.D.",
  title: "Associate Professor",
  degrees: [              // displayed as a list under the name; staff use this field for office hours
    "Ph.D., Computer Science, Carnegie Mellon University",
    "B.S., Mathematics, Penn State",
  ],
  email: "jsmith@allegheny.edu",
  phone: "814-332-0000",  // optional — omit or comment out if not public
  office: "Alden Hall 105",
  website: "https://example.com",  // optional
  image: "smith.jpg",     // optional — filename in src/assets/img/faculty/; omit for no photo
}
```

**To add a person:** copy an existing entry, update all fields, set a unique `order`, and place the object in the right position in the array.

**To add a photo:** drop the image file into `src/assets/img/faculty/` and set the `image` field to the filename. Recommended size: 400 × 400 px, square crop, JPEG or PNG.

**To remove a person:** delete the object from the array. Re-number `order` values if gaps bother you (not required).

---

### Technical Leaders Directory

**Page:** `/community/tl`
**File:** `src/data/tl.js`

Each TL is one object in the `technicalLeaders` array.

```js
{
  order: 1,
  name: "Hemani Alaparthi '27",
  major: "Computer Science & Economics",
  minor: null,                       // null if no minor; otherwise a string
  officeHours: "Mon 4–6pm, Tue 1–3pm",  // null if not yet set
  skills: ["Python", "JavaScript", "Docker"],  // array of strings; shown as tags
  image: "alaparthi01.jpg",          // optional — filename in src/assets/img/tl/
}
```

**To add a TL:** copy an existing entry, fill in all fields, drop the photo into `src/assets/img/tl/`. Recommended photo size: 400 × 500 px (portrait), JPEG or PNG.

**To update office hours:** edit the `officeHours` string. Use `null` when hours are not set for the semester.

**To remove a TL:** delete the object. Re-number `order` if desired.

**To update the intro paragraph** (the description of what TLs do that appears above the grid): edit the `<p class="tl-dir__intro">` element directly in `src/pages/community/tl.astro`.

**To update the office hours calendar link:** the "View Office Hours Calendar" button links to `CALENDAR_EMBED_URL` from `src/config/calendar.ts` — update that value there.

---

### Technical Advisory Board

**Page:** `/community/tab`
**File:** `src/data/tab.js`

The file exports three separate arrays:

| Array | Who | Photo? |
| :--- | :--- | :--- |
| `members` | Board members — have a board role, job, and company | Yes |
| `students` | Student TAB representatives | Yes |
| `affiliates` | Non-alumnus affiliates | No (no image field) |

**Member / student schema:**
```js
{
  order: 1,
  name: "Matt Gerega '02",
  major: "Computer Science",       // optional
  minor: null,                     // optional
  position: "President",           // optional board role; null if none
  jobTitle: "Architect",
  company: "Aspire",
  image: "gerega.jpg",             // filename in src/assets/img/tab/; omit for no photo
}
```

**Affiliate schema:**
```js
{
  order: 1,
  name: "Jane Smith",
  college: "Penn State",
  jobTitle: "Director of Engineering",
  company: "Acme Corp",
}
```

**To add a board member:** add to `members`, drop photo in `src/assets/img/tab/`. Recommended photo size: 400 × 400 px, square crop.

---

### Course Bulletin

**Page:** `/plan/bulletin`
**File:** `src/data/courses.js`

Each course is one object in the `courses` array. The bulletin page groups them by `category`.

```js
{
  code: "CMPSC 100",
  title: "Computational Expression",
  credits: 4,                      // number; use a string like "1–4" for variable credit
  category: "foundation",          // "foundation" | "core" | "elective" | "project"
  prereq: "none",                  // plain-text prerequisite string
  distribution: ["ME", "SP"],      // Allegheny distribution codes; empty array if none
  description: "Full course description text…",
  outcomes: [                      // array of learning outcome strings
    "Apply Python fundamentals…",
  ],
}
```

**To add a course:** add an object to the array, placing it near other courses of the same category. The bulletin renders courses in the order they appear in the array within each category.

**To remove a course:** delete the object. Also check `src/data/programs.js` — if the course code appears in any program's `courses` array, remove it there too.

**To update a course:** find the object by `code` and edit in place.

> **Note:** Course codes are used as identifiers. If a code changes (e.g. a course is renumbered), update it in both `courses.js` and every occurrence in `programs.js`.

---

### Majors & Minors

**Page:** `/plan/degrees`
**File:** `src/data/programs.js`
**Also uses:** `src/data/courses.js` for course details (description, credits, outcomes shown in the popup)

Each program (major or minor) is one object in the `programs` array. There are four disciplines: `CMPSC`, `DS`, `INFM`, `SE`.

**Major schema:**
```js
{
  id: "cmpsc-major",
  discipline: "CMPSC",             // "CMPSC" | "DS" | "INFM" | "SE"
  label: "Computer Science",
  type: "major",                   // "major" | "minor"
  degree: "Bachelor of Science",
  minCredits: 48,
  description: "One-paragraph program description…",
  outcomes: [                      // learning outcomes shown in a collapsible
    "Demonstrate knowledge of…",
  ],
  notes: [                         // advisory notes shown as a bulleted list
    "Students who major in Computer Science may not…",
  ],
  sections: [ /* see below */ ],
}
```

**Minor schema** — same but without `degree`, `description`, and `outcomes`.

**Section schema** — each section is a block of requirements:
```js
// "all" type — student takes every listed course
{
  heading: "Foundation",
  subheading: "Take all three courses (12 credits)",
  type: "all",
  courses: ["CMPSC 100", "CMPSC 101", "CMPSC 102"],
}

// "choose" type — student takes N of the listed courses
{
  heading: "Electives",
  subheading: "Take two of the following (8 credits)",
  type: "choose",
  choose: 2,                       // how many to choose
  courses: ["CMPSC 300", "CMPSC 304", "CMPSC 400"],
}

// External or cross-listed courses — use "Code - Title" string format
{
  heading: "Specialization",
  subheading: "Take two of the following",
  type: "choose",
  choose: 2,
  courses: [
    "CMPSC 303",                   // internal code — linked to courses.js entry
    "MATH 320 - Linear Algebra",   // external — shown as a plain label, no popup
  ],
}
```

**To add or remove a required course:** find the relevant section in the program's `sections` array and edit the `courses` list. Ensure any internal course code exists in `courses.js`.

**To update credit counts or notes:** edit `minCredits` and the `notes` array directly.

**To add a new program:** add a full program object for both `type: "major"` and `type: "minor"` (or just one). Also add the discipline to the `disciplines` array exported at the bottom of `programs.js` if it's a new discipline.

---

### Microcredentials

**Page:** `/plan/microcredentials`
**File:** `src/data/microcredentials.js`

Each microcredential is one object in the `microcredentials` array.

```js
{
  title: "AI-Driven Content Creation",
  description: "One-paragraph description of what the credential prepares students for…",
  competencies: [                  // bullet list of skills/outcomes students gain
    "Create images and text using industry-standard platforms.",
    "Write successful model prompts…",
  ],
  courseGroups: [                  // one or more requirement groups
    {
      heading: "Take all of the following courses (12 credits):",
      courses: [
        "ART 187 - Electronic & Intermedia Art",
        "CMPSC 303 - Artificial Intelligence*",
      ],
    },
    {
      heading: "Take one of the following (4 credits):",
      courses: [
        "CMPSC 350 - Computational Narrative",
      ],
    },
  ],
  note: "*Additional prerequisite not listed in requirements.",  // optional
}
```

**To add a credential:** append a new object. The page renders them in array order.

**To reorder credentials:** rearrange the objects in the array.

---

### News & Updates Feed

**Page:** `/community/news`
**Files:** `src/pages/community/news/*.mdx` (one file per news item)

Each news item is an MDX file. The feed automatically picks up all files in that folder, sorted by `date` descending. Calendar events from Google Calendar are merged in at build time.

**Frontmatter schema:**
```yaml
---
layout: ../../../layouts/NewsLayout.astro
title: "Full title of the post"
date: 2026-05-01           # YYYY-MM-DD; controls sort order
category: announcement     # "announcement" | "event" | "other"
image: /img/news/photo.jpg # optional; path under /public/; shown as card thumbnail
description: "One-sentence summary shown in the card grid."
externalUrl: https://…     # optional; if set, clicking the card goes here instead of the MDX page
---
```

**To publish a news item:**

1. Create a file named `src/pages/community/news/your-slug.mdx` (lowercase, hyphens only).
2. Paste in the frontmatter block above and fill in all fields.
3. Write the article body in Markdown below the `---` closing fence.
4. To add a thumbnail, drop the image in `public/img/news/` and set `image: /img/news/filename.jpg`.

**To link to an external story** (e.g. an allegheny.edu article): set `externalUrl` to the full URL. The card will link there directly; the MDX body still renders if someone navigates to the page URL, so write a brief summary or leave the body empty.

**To remove a post:** delete the `.mdx` file.

---

### Google Calendar Integration

**Page:** `/community/news` (calendar embed + merged events in the feed)
**Config:** `src/config/calendar.ts`

```ts
export const CALENDAR_ID = "c_abc123…@group.calendar.google.com";
export const CALENDAR_EMBED_URL = "https://calendar.google.com/calendar/embed?…";
```

- `CALENDAR_ID` is used by `src/lib/getCalendarEvents.ts` at build time to fetch upcoming events via the Google Calendar API. Set `GOOGLE_CALENDAR_API_KEY` in `.env`.
- `CALENDAR_EMBED_URL` is the iframe src for the embedded calendar widget on the news page.

**To switch to a different calendar:** update both values in `calendar.ts`. The embed URL can be copied from Google Calendar → Settings → *Integrate calendar* → *Embed code* (use only the `src` attribute value).

---

/**
 * Major and minor program requirements for all four CIS disciplines.
 * Each "section" is a block of requirements with a heading and a list of courses.
 * type: "all"   → student must take all listed courses
 * type: "choose" → student must take N of the listed courses
 */

export const programs = [
  // ── Computer Science ──────────────────────────────────────────────────────────
  {
    id: "cmpsc-major",
    discipline: "CMPSC",
    label: "Computer Science",
    type: "major",
    degree: "Bachelor of Science",
    minCredits: 48,
    description:
      "Computer Science focuses on computational theory and the rich interplay between computer hardware and software. Students use scientific and design-centric approaches to solve computational problems and to create and evaluate realistic computer and computer-based systems.",
    outcomes: [
      "Demonstrate and be able to communicate the knowledge of data types, algorithms, and mathematical principles behind discrete objects.",
      "Use scientific and theoretical methods to design, implement, evaluate, deploy, improve, maintain, and document software and hardware systems.",
      "Apply and articulate key concepts from a specialization area where the interconnection between software and hardware is important and evident.",
      "Able to communicate technical details of the produced software and hardware artifacts both in writing and orally.",
    ],
    notes: [
      "Students who major in Computer Science may not double-major or minor in Data Science, Informatics, or Software Engineering.",
      "Math 205 may substitute for CMPSC 102.",
      "Math 320, 330, 345, or 370 may substitute for one required specialization course.",
      "Students planning to attend graduate school in Computer Science are strongly encouraged to take Math 151 early.",
    ],
    sections: [
      {
        heading: "Foundation",
        subheading: "Take all three courses (12 credits)",
        type: "all",
        courses: ["CMPSC 100", "CMPSC 101", "CMPSC 102"],
      },
      {
        heading: "Core",
        subheading: "Take all four courses (16 credits)",
        type: "all",
        courses: ["CMPSC 200", "CMPSC 202", "CMPSC 204", "CMPSC 406"],
      },
      {
        heading: "Electives",
        subheading: "Take two of the following (8 credits)",
        type: "choose",
        choose: 2,
        courses: ["CMPSC 300", "CMPSC 304", "CMPSC 400", "CMPSC 403"],
      },
      {
        heading: "Project",
        subheading: "Take all three (12 credits)",
        type: "all",
        courses: ["CMPSC 580", "CMPSC 600", "CMPSC 610"],
      },
    ],
  },
  {
    id: "cmpsc-minor",
    discipline: "CMPSC",
    label: "Computer Science",
    type: "minor",
    minCredits: 24,
    notes: [
      "Students who minor in Computer Science may not major in Data Science, Informatics, or Software Engineering.",
      "Math 205 may substitute for CMPSC 102.",
    ],
    sections: [
      {
        heading: "Required",
        subheading: "Take both courses (8 credits)",
        type: "all",
        courses: ["CMPSC 100", "CMPSC 102"],
      },
      {
        heading: "Core Electives",
        subheading: "Take two of the following (8 credits)",
        type: "choose",
        choose: 2,
        courses: ["CMPSC 200", "CMPSC 202", "CMPSC 204", "CMPSC 406"],
      },
      {
        heading: "Upper Electives",
        subheading: "Take two of the following (8 credits)",
        type: "choose",
        choose: 2,
        courses: ["CMPSC 304", "CMPSC 400", "CMPSC 403"],
      },
    ],
  },

  // ── Data Science ──────────────────────────────────────────────────────────────
  {
    id: "ds-major",
    discipline: "DS",
    label: "Data Science",
    type: "major",
    degree: "Bachelor of Science",
    minCredits: 48,
    description:
      "Data Science focuses on the study of integrated principles and methods to analyze complex big data for decision making, prediction, modeling, and data management. Students examine social and human contexts and ethical implications of how data are collected, analyzed, and utilized in diverse areas.",
    outcomes: [
      "Effectively collects, organizes, analyzes and interprets both structured and unstructured datasets from diverse sources.",
      "Can effectively and ethically use statistical data analysis techniques, modern machine learning algorithms, and state-of-the-art software tools and programming environments to design, build, evaluate, and deploy new predictive models.",
      "Demonstrates and articulates the value of subject matter expertise in domains that apply data science techniques.",
      "Can clearly and persuasively communicate the results of data analysis including critical examination and reflection on the ethical implications of such analysis.",
    ],
    notes: [
      "Students who major in Data Science may not double-major or minor in Computer Science, Informatics, or Software Engineering.",
      "With advisor approval, students may substitute a Junior Seminar in another department for CMPSC 580.",
    ],
    sections: [
      {
        heading: "Foundation",
        subheading: "Take all three courses (12 credits)",
        type: "all",
        courses: ["CMPSC 100", "CMPSC 101", "CMPSC 105"],
      },
      {
        heading: "Core — Required",
        subheading: "Take both courses (8 credits)",
        type: "all",
        courses: ["CMPSC 301", "CMPSC 405"],
      },
      {
        heading: "Core — Effective Communication",
        subheading: "Take one course (4 credits)",
        type: "choose",
        choose: 1,
        courses: [
          "ENGL 210 - Writing Creative Nonfiction",
          "ENGL 208 - Professional Communication",
          "FILM 375 - Documentary Traditions",
          "COMM 360 - Rhetoric and Civic Engagement",
        ],
        external: true,
      },
      {
        heading: "Core — Ethics",
        subheading: "Take one course (4 credits)",
        type: "choose",
        choose: 1,
        courses: [
          "PHIL 130 - Values and Knowledge",
          "PHIL 140 - Ethics and Community",
          "PHIL 210 - Oppression and Liberation",
          "POLSC 140 - Introduction to Political Theory",
          "PSYCH 162 - Human Social Behavior",
          "RELST 200 - Christian Ethics",
          "RELST 341 - Jewish Ethics",
        ],
        external: true,
      },
      {
        heading: "Core — Statistics",
        subheading: "Take one course (4 credits)",
        type: "choose",
        choose: 1,
        courses: [
          "BIO 385 - Biostatistics",
          "ECON 202 - Economic Statistics",
          "POLSC 489 - Statistics and Data Analysis",
          "MATH 345 - Probability and Statistical Inference I",
          "PSYCH 207 - Statistical Methods in Psychology",
        ],
        external: true,
      },
      {
        heading: "Electives",
        subheading: "Take one course (4 credits)",
        type: "choose",
        choose: 1,
        courses: [
          "ECON 203 - Economic Statistics II",
          "ECON 241 - Behavioral Economics",
          "GHS 223 - People & Poisons: Foundations of Public Health Toxicology",
          "GHS 228 - Global Health Data & Visualization",
          "BIO 321 / GHS 321 - Epidemiology",
          "MATH 320 - Linear Algebra",
          "MATH 346 - Probability/Statistical Inference II",
          "PSYCH 307 - Intermediate Statistics",
          "COMM 376 - Ethnographic Methods in Media and Cultural Studies",
          "CMPSC 300 - Bioinformatics",
          "CMPSC 302 - Web Development",
          "CMPSC 303 - Artificial Intelligence",
          "CMPSC 305 - Database Systems",
          "CMPSC 350 - Computational Narrative",
          "CMPSC 406 - Internet of Things",
        ],
        external: true,
      },
      {
        heading: "Project",
        subheading: "Take all three (12 credits)",
        type: "all",
        courses: ["CMPSC 580", "DS 600", "DS 610"],
      },
    ],
  },
  {
    id: "ds-minor",
    discipline: "DS",
    label: "Data Science",
    type: "minor",
    minCredits: 24,
    notes: [
      "Students who minor in Data Science may not major or double-minor in Computer Science, Informatics, or Software Engineering.",
    ],
    sections: [
      {
        heading: "Required",
        subheading: "Take all three courses (12 credits)",
        type: "all",
        courses: ["CMPSC 100", "CMPSC 105", "CMPSC 301"],
      },
      {
        heading: "Ethics",
        subheading: "Take one course (4 credits)",
        type: "choose",
        choose: 1,
        courses: [
          "PHIL 130 - Values and Knowledge",
          "PHIL 140 - Ethics and Community",
          "PHIL 210 - Oppression and Liberation",
          "POLSC 140 - Introduction to Political Theory",
          "PSYCH 162 - Human Social Behavior",
          "RELST 200 - Christian Ethics",
          "RELST 341 - Jewish Ethics",
        ],
        external: true,
      },
      {
        heading: "Effective Communication",
        subheading: "Take one course (4 credits)",
        type: "choose",
        choose: 1,
        courses: [
          "ENGL 210 - Writing Creative Nonfiction",
          "ENGL 208 - Professional Communication",
          "FILM 375 - Documentary Traditions",
          "COMM 360 - Rhetoric and Civic Engagement",
        ],
        external: true,
      },
      {
        heading: "Statistics",
        subheading: "Take one course (4 credits)",
        type: "choose",
        choose: 1,
        courses: [
          "BIO 385 - Biostatistics",
          "ECON 202 - Economic Statistics",
          "POLSC 489 - Statistics and Data Analysis",
          "MATH 345 - Probability and Statistical Inference I",
          "PSYCH 207 - Statistical Methods in Psychology",
        ],
        external: true,
      },
    ],
  },

  // ── Informatics ───────────────────────────────────────────────────────────────
  {
    id: "infm-major",
    discipline: "INFM",
    label: "Informatics",
    type: "major",
    degree: "Bachelor of Arts or Bachelor of Science",
    minCredits: 48,
    description:
      "Informatics focuses on critical approaches to information and technology, with an emphasis on interdisciplinary methods. Students develop ethical and technical frameworks and apply them to a wide-ranging set of culturally-relevant problems in order to enrich the public understanding of the relationship between information and culture.",
    outcomes: [
      "Demonstrates and articulates the distinct concerns of informatics-informed approaches to understanding information as cultural material.",
      "Produce and present disciplinary findings in digital, artistic, oral, and/or written format.",
      "Develop competency in the theories, methods, and practices of domains on which to apply informatics techniques.",
      "Able to design scholarly projects and clearly and persuasively articulate their outcomes.",
    ],
    notes: [
      "Students who major in Informatics may complete any minor; however, they may not double-major or minor in Computer Science, Data Science, or Software Engineering.",
      "With advisor approval, students may substitute a Junior Seminar in another department for CMPSC 580.",
    ],
    sections: [
      {
        heading: "Foundation",
        subheading: "Take all three courses (12 credits)",
        type: "all",
        courses: ["CMPSC 100", "CMPSC 101", "CMPSC 105"],
      },
      {
        heading: "Core — Required",
        subheading: "Take both courses (8 credits)",
        type: "all",
        courses: ["CMPSC 350", "COMM 342 - Digital Media and Technology"],
        external: false,
      },
      {
        heading: "Core — Methods",
        subheading: "Take two of the following (8 credits)",
        type: "choose",
        choose: 2,
        courses: [
          "ART 187 - Electronic & Intermedia Art",
          "ART 287 - Art at the Intersection of Science and Culture",
          "CMPSC 302 - Web Development",
          "COMM 376 - Ethnographic Methods in Media and Cultural Studies",
          "FILM 171 - Filmmaking 1",
          "FILM 300 - Filmmaking 2",
          "FILM 375 - Documentary Traditions",
        ],
        external: true,
      },
      {
        heading: "Application Module",
        subheading: "Take at least two courses from at least one module (8+ credits)",
        type: "module",
        modules: [
          {
            name: "Humanities Informatics",
            description:
              "Practices which build and maintain technical platforms to answer questions traditionally thought of as the domain of the Humanities.",
            note: "At least one course must be at the 200-level or above.",
            courses: [
              "ART 251 - Contemporary Art Writing",
              "ART 343 - Feminist Art Histories",
              "Any ENGL 100-level",
              "ENGL 360 - Language, Theory, and Practice",
              "HIST 170 - Introduction to Public History",
              "PHIL 140 - Ethics and Community",
              "RELST 180 - Religion in American Life",
              "RELST 200 - Christian Ethics",
              "RELST 341 - Jewish Ethics",
            ],
          },
          {
            name: "Geoinformatics",
            description:
              "Study and development of technologies that use information to address issues in geology, geography, cartography, and other related sciences.",
            note: "At least one course must be at the 200-level or above.",
            courses: [
              "ENVSC 285 - Quantitative Sustainability",
              "ENVSC 305 - Environmental GIS I",
              "ENVSC 306 - Environmental GIS II",
              "GEO 110 - Physical Geology",
              "CMPSC 304 - Robotic Systems",
              "CMPSC 305 - Database Systems",
              "CMPSC 406 - Internet of Things",
            ],
          },
          {
            name: "Polinformatics",
            description:
              "Practices focused on building and maintaining information and information systems which pertain to questions characterized as social science, in particular those concerned with governance and political participation.",
            note: "At least one course must be at the 200-level or above.",
            courses: [
              "COMM 256 - Power, Politics, and Communication",
              "COMM 360 - Communication and Civic Engagement",
              "POLSC 120 - Comparative Politics",
              "POLSC 215 - Politics in Popular Culture",
              "POLSC 318 - Politics and the Media",
              "POLSC 321 - Urban Government and Politics",
              "POLSC 424 - Inequality and Social Policy",
              "PHIL 210 - Oppression and Liberation",
            ],
          },
          {
            name: "Health Informatics",
            description:
              "Practices which build, maintain, and conceptualize the role of information and information systems in clinical, professional, and academic contexts with particular emphasis on health data.",
            note: "At least one course must be at the 200-level or above.",
            courses: [
              "CMPSC 300 - Bioinformatics",
              "COMM 331 - Disease, Disability, and Difference in Popular Culture",
              "GHS 228 - Global Health Data and Visualization",
              "GHS 235 - Global Health Ethics",
              "GHS 321 - Epidemiology",
              "GHS 354 - Medical Anthropology",
              "HIST 380 - Disease and Medicine in Modern History",
              "PHIL 385 - Medical Ethics",
            ],
          },
        ],
      },
      {
        heading: "Project",
        subheading: "Take all three (12 credits)",
        type: "all",
        courses: ["CMPSC 580", "INFM 600", "INFM 610"],
      },
    ],
  },
  {
    id: "infm-minor",
    discipline: "INFM",
    label: "Informatics",
    type: "minor",
    minCredits: 24,
    notes: [
      "Students who minor in Informatics may complete any major; however, they may not major in Computer Science, Data Science, or Software Engineering.",
    ],
    sections: [
      {
        heading: "Foundation",
        subheading: "Take both courses (8 credits)",
        type: "all",
        courses: ["CMPSC 100", "CMPSC 101"],
      },
      {
        heading: "Core",
        subheading: "Take both courses (8 credits)",
        type: "all",
        courses: ["CMPSC 350", "COMM 342 - Digital Media and Technology"],
        external: false,
      },
      {
        heading: "Application Module",
        subheading: "Take two courses from one module (8 credits)",
        type: "module",
        modules: [
          {
            name: "Humanities Informatics",
            courses: [
              "ART 251 - Contemporary Art Writing",
              "ART 343 - Feminist Art Histories",
              "Any ENGL 100-level",
              "ENGL 360 - Language, Theory, and Practice",
              "HIST 170 - Introduction to Public History",
              "PHIL 140 - Ethics and Community",
              "RELST 180 - Religion in American Life",
              "RELST 200 - Christian Ethics",
              "RELST 341 - Jewish Ethics",
            ],
          },
          {
            name: "Geoinformatics",
            note: "At least one course must be taken outside of CMPSC.",
            courses: [
              "ENVSC 285 - Quantitative Sustainability",
              "ENVSC 305 - Environmental GIS I",
              "ENVSC 306 - Environmental GIS II",
              "GEO 110 - Physical Geology",
              "CMPSC 304 - Robotic Systems",
              "CMPSC 305 - Database Systems",
              "CMPSC 406 - Internet of Things",
            ],
          },
          {
            name: "Polinformatics",
            courses: [
              "COMM 256 - Power, Politics, and Communication",
              "COMM 360 - Communication and Civic Engagement",
              "POLSC 120 - Comparative Politics",
              "POLSC 215 - Politics in Popular Culture",
              "POLSC 318 - Politics and the Media",
              "POLSC 321 - Urban Government and Politics",
              "POLSC 424 - Inequality and Social Policy",
              "PHIL 210 - Oppression and Liberation",
            ],
          },
          {
            name: "Health Informatics",
            courses: [
              "CMPSC 300 - Bioinformatics",
              "COMM 331 - Disease, Disability, and Difference in Popular Culture",
              "GHS 228 - Global Health Data and Visualization",
              "GHS 235 - Global Health Ethics",
              "GHS 321 - Epidemiology",
              "GHS 354 - Medical Anthropology",
              "HIST 380 - Disease and Medicine in Modern History",
              "PHIL 385 - Medical Ethics",
            ],
          },
        ],
      },
    ],
  },

  // ── Software Engineering ──────────────────────────────────────────────────────
  {
    id: "se-major",
    discipline: "SE",
    label: "Software Engineering",
    type: "major",
    degree: "Bachelor of Science",
    minCredits: 48,
    description:
      "Software engineering focuses on the knowledge and skills that teams and individuals need to develop and maintain large-scale software systems. Students apply engineering principles and industry-standard software tools to design, implement, test, release, and enhance software for real-world customers.",
    outcomes: [
      "While working in a team, can effectively design, implement, evaluate, improve, and document a solution to a problem delivered as a maintainable software system.",
      "Demonstrates competency in the theories, models, and practices of project domains that require the engineering of software.",
      "Can effectively manage and predict the cost, scope, and deadline of a software engineering project.",
      "Uses effective oral and written communication methods to explain both the technical and product-use details of a software artifact.",
    ],
    notes: [
      "Students who major in Software Engineering may not double-major or minor in Computer Science, Data Science, or Informatics.",
    ],
    sections: [
      {
        heading: "Foundation",
        subheading: "Take all three courses (12 credits)",
        type: "all",
        courses: ["CMPSC 100", "CMPSC 101", "CMPSC 104"],
      },
      {
        heading: "Core",
        subheading: "Take all four courses (16 credits)",
        type: "all",
        courses: ["CMPSC 201", "CMPSC 203", "CMPSC 302", "CMPSC 404"],
      },
      {
        heading: "Electives",
        subheading: "Take two of the following (8 credits)",
        type: "choose",
        choose: 2,
        courses: ["CMPSC 305", "CMPSC 400", "CMPSC 403", "CMPSC 303"],
      },
      {
        heading: "Project",
        subheading: "Take all three (12 credits)",
        type: "all",
        courses: ["CMPSC 580", "SE 600", "SE 610"],
      },
    ],
  },
  {
    id: "se-minor",
    discipline: "SE",
    label: "Software Engineering",
    type: "minor",
    minCredits: 24,
    notes: [
      "Students who minor in Software Engineering may not major in Computer Science, Data Science, or Informatics.",
    ],
    sections: [
      {
        heading: "Required",
        subheading: "Take all three courses (12 credits)",
        type: "all",
        courses: ["CMPSC 100", "CMPSC 101", "CMPSC 203"],
      },
      {
        heading: "Core Elective",
        subheading: "Take one of the following (4 credits)",
        type: "choose",
        choose: 1,
        courses: ["CMPSC 201", "CMPSC 302", "CMPSC 404"],
      },
      {
        heading: "Upper Electives",
        subheading: "Take two of the following (8 credits)",
        type: "choose",
        choose: 2,
        courses: ["CMPSC 400", "CMPSC 403", "CMPSC 303", "CMPSC 305"],
      },
    ],
  },
];

export const disciplines = [
  { id: "CMPSC", label: "Computer Science",     color: "var(--navy)" },
  { id: "DS",    label: "Data Science",         color: "var(--gator)" },
  { id: "INFM",  label: "Informatics",          color: "var(--bold-gold)" },
  { id: "SE",    label: "Software Engineering", color: "var(--bold-gold)" },
];

export function getProgram(id) {
  return programs.find((p) => p.id === id);
}

export function getMajor(discipline) {
  return programs.find((p) => p.discipline === discipline && p.type === "major");
}

export function getMinor(discipline) {
  return programs.find((p) => p.discipline === discipline && p.type === "minor");
}

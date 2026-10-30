// ── Fundraising ────────────────────────────────────────────────────────────────
// currentCampaign: the campaign advertised at the top of /community/fundraising
//   goal / raised: whole dollars — set raised to a number to show the progress bar
//   startDate / endDate: when gifts are accepted (YYYY-MM-DD, inclusive, Eastern time).
//     Inside the window the home page shows the campaign bar and this page shows Give Now;
//     set both to null for a campaign with no window (Give Now always on, no home page bar)
//   focusAreas: category is the green badge on each card
//     url is optional — a site path ("/community/news/...") or a full URL
//
// pastCampaigns: archive, newest first
//   raised: whole dollars (summed for the archive totals) — null until the final total is reported
//   students: students supported — omit if the campaign didn't report it
//   stats: extra figures shown between total raised and students supported
//   sections: groups of projects; each project may have
//     url (title link), meta (subtitle), description (string or paragraphs),
//     funding, features (numbered), tags (pills), note, links (repos / sites)

export const currentCampaign = {
  name: "Campaign Name",
  goal: 10000,
  raised: null,
  startDate: null,
  endDate: null,
  giveUrl: "https://www.givecampus.com/",
  description:
    "A one- or two-sentence summary of what the new campaign funds and how it helps CIS students.",
  note: "Recurring gifts help sustain these initiatives year over year.",
  focusAreas: [
    {
      title: "Initiative One",
      category: "Category",
      url: null,
      description: "A short line on what this initiative does and who it reaches.",
    },
    {
      title: "Initiative Two",
      category: "Category",
      url: null,
      description: "A short line on what this initiative does and who it reaches.",
    },
    {
      title: "Initiative Three",
      category: "Category",
      url: null,
      description: "A short line on what this initiative does and who it reaches.",
    },
  ],
};

export const pastCampaigns = [
  {
    slug: "sustain-attain-train",
    name: "Sustain. Attain. Train.",
    year: 2025,
    raised: null,
    stats: [
      { label: "Goal", value: "$15,000" },
      { label: "Initiatives", value: "3" },
    ],
    summary:
      "Sustain. Attain. Train. sought $15,000 to keep student-driven computing thriving at Allegheny — funding the Gatorverse Hackathon, student research and software projects, and Code with Chompers outreach in Meadville classrooms.",
    sections: [
      {
        title: "Initiatives",
        items: [
          {
            title: "Gatorverse Hackathon",
            meta: "Event",
            url: "/community/news/gatorverse-hackathon-2025",
            description: "A 48-hour, student-run hackathon in Alden Hall with alumni mentors.",
          },
          {
            title: "Student-Driven Projects",
            meta: "Research",
            description: "Research and open-source software built by students alongside faculty.",
          },
          {
            title: "Code with Chompers",
            meta: "Outreach",
            url: "https://codewithchompers.com",
            description: "Hands-on computing lessons for K–4 students in Crawford Central schools.",
          },
        ],
      },
    ],
  },
  {
    slug: "in-for-tech-excellence",
    name: "In For Tech Excellence",
    year: 2024,
    raised: 8555,
    stats: [
      { label: "Total spent", value: "$8,611" },
      { label: "Projects", value: "3" },
    ],
    students: 10,
    summary:
      "In For Tech Excellence funds were used to support transformative tech projects that empower Allegheny students to thrive in the evolving tech landscape and engage in their community.",
    sections: [
      {
        title: "Projects",
        items: [
          {
            title: "big-iron",
            description:
              "big-iron is a student–faculty research effort developing a vendor-neutral cloud development environment that streamlines modern software workflows. This summer, the team expanded its infrastructure to support smoother remote development through improved container orchestration, terminal session management, and secure authentication. Their progress sets the stage for broader deployment and future additions like collaborative coding and instructional tools.",
          },
          {
            title: "Code with Chompers",
            url: "https://codewithchompers.com",
            description: [
              "Over the summer, Professor Janyl Jumadinova and Allegheny student, Ainslee Plesko, strengthened the program's infrastructure—updating materials, refining lessons, and preparing for expanded collaboration with local districts.",
              "This fall, eight Allegheny Outreach Fellows have been delivering hands-on introductory computing, cybersecurity and AI lessons to K–4 students across four Crawford Central elementary schools, reaching nearly 120 children and advancing early computer science education in the Meadville community.",
            ],
          },
          {
            title: "HSCoded",
            description:
              "During Spring and Fall 2025, students and faculty successfully deployed the previously developed High School Curriculum platform—funded through the Reboot campaign—to two cohorts of high school learners. The Code, Conquer, and Escape! course immersed High School students in a game-based Python adventure that introduced programming, API use, and core software engineering practices. The platform supported mission-based learning, documentation, and teamwork, demonstrating its readiness for scalable high school CS instruction.",
            links: ["https://github.com/HS-Coded-Spring2025", "https://github.com/HS-Coded"],
          },
        ],
      },
    ],
  },
  {
    slug: "reboot",
    name: "Reboot",
    year: 2023,
    raised: 16319,
    stats: [
      { label: "Spent (Spring)", value: "$5,404" },
      { label: "Spent (Summer)", value: "$12,570" },
      { label: "Projects", value: "2" },
    ],
    students: 12,
    summary:
      "Reboot Campaign funds were used to develop education platforms for High School students with a goal of broadening engagement in computing. The funding supported collaborative work of 12 students with three faculty in the creation of engaging lessons for High School students and delivery of that curriculum in our local school district.",
    sections: [
      {
        title: "Projects",
        items: [
          {
            title: "High School Curriculum Platforms",
            links: ["https://github.com/Code-With-Chompers", "https://github.com/hellowhorl"],
          },
          { title: "Internet of Things Lessons" },
          { title: "Underwater Robotics Lessons" },
        ],
      },
    ],
  },
  {
    slug: "love-at-first-byte",
    name: "Love @ First Byte",
    year: 2023,
    raised: 13593,
    stats: [
      { label: "Total spent", value: "$13,100" },
      { label: "Student research", value: "$13,100" },
      { label: "Projects", value: "5" },
    ],
    students: 16,
    summary:
      "Love @ First Byte Campaign funds were used to extend spring, summer, and fall research project opportunities to students.",
    sections: [
      {
        title: "Student Research",
        items: [
          {
            title: "New feature in GatorGrader",
            meta: "Spring 2023",
            funding: ["$650 · 2 students"],
            links: ["https://github.com/GatorEducator/gatorgrade"],
          },
          {
            title: "GatorAdvisor",
            meta: "Summer/Fall 2023",
            funding: ["$6,200 · 3 students, Summer 2023", "$500 · 2 students, Fall 2023"],
            links: ["https://github.com/Allegheny-CMPSC-summer-2023/Advise-A-Gator"],
          },
          {
            title: "Gator Growth Gauge",
            meta: "Fall 2023",
            funding: ["$5,000 · 6 students"],
            links: ["https://github.com/allegheny-cis-curriculum-assessment"],
          },
          {
            title: "ROV Education Platform",
            meta: "Fall 2023",
            funding: ["$500 · 2 students"],
            links: ["https://github.com/Underwater-Robotic-System"],
          },
          {
            title: "Improvements to termworld documentation",
            meta: "Fall 2023",
            funding: ["$250 · 1 student"],
            links: ["https://github.com/term-world"],
          },
        ],
      },
    ],
  },
  {
    slug: "power-up",
    name: "Power Up Campaign",
    year: 2022,
    raised: 17427,
    stats: [
      { label: "Total spent", value: "$17,387" },
      { label: "Equipment and hardware", value: "$5,077" },
      { label: "Software and open platforms", value: "$12,310" },
    ],
    sections: [
      {
        title: "Equipment and Hardware",
        description:
          "Using some of the funds, the department was able to purchase wheeled robots, raspberry pis, various sensors and actuators, and robot arms. These were used in our Robotic Agents class in Fall 2022, Artificial Intelligence class in Spring 2023 and is continuously utilized by Allegheny students and faculty in the outreach activities they conduct in the local community.",
        items: [
          {
            title: "Robots For Education",
            tags: ["Penny's Ice Cream Shop", "Robot Keyboard Control with Music", "Shieldbot"],
          },
          {
            title: "Robot Arm Manipulation",
            tags: ["Manny the Manufacturer", "Cup Stacking Arm"],
          },
          {
            title: "Mapping And Navigation",
            tags: ["Turtlebot Mapping and Navigation", "Trudy The Turtle"],
          },
          {
            title: "IoT Arduino",
            tags: ["Valentine's Love in the Box", "Speech Recognition", "Lie Detector", "Trash Bot", "Sound Detection"],
          },
        ],
      },
      {
        title: "Software",
        description:
          "Portions of the funds were used to design, implement, and test new software tools or to create new features and functionality in existing software tools. These tools were built by students and faculty and are either used or will be used by the department to \"power up\" our teaching. Additionally, these tools are open-source and available for anyone to use.",
        items: [
          {
            title: "GatorGrade(r)",
            url: "https://github.com/GatorEducator/gatorgrade",
            description: "An automatic grading tool that can be used to check assignments through user-created checks",
            features: [
              "Improvements to TUI",
              "Bug fixes to GatorGrade",
              "Deployment improvements",
              "JSON and Markdown export",
              "GitHub job summaries",
              "GitHub issue tracker",
              "Insights and trajectory tracking",
              "ALSO: new checks in GatorGrader!",
            ],
          },
          {
            title: "NaviGator",
            description: "A Discord bot that leverages Google Sheets to allow students to retrieve commonly requested course information",
            features: [
              "Discord bot",
              "OpenStack deployment",
              "Grade reporting",
              "Course details",
              "Interaction tracking",
              "User auth, privacy ensured",
            ],
            note: "Plan to use this tool in all CMPSC courses",
          },
          {
            title: "AFLuent",
            description: "An automated fault localization tool that is triggered when one or more test cases fail",
            features: [
              "Pinpoint defects in program",
              "Coverage profile collection",
              "Statistical fault localization",
              "Multiple AFL equations",
              "Integration with Pytest",
            ],
            note: "Plan to use this tool in CMPSC 101, 102, and 203",
          },
          {
            title: "Discover (Knockout Mutation)",
            description: "Tools to help discover test coverage and effectiveness",
            features: [
              "Assess quality of test suite",
              "Give feedback to students on poor test assertions",
              "Run locally and in CI",
              "Pip-installable tool",
              "TUI-based browser",
            ],
            note: "Plan to use this tool in CMPSC 101 and CMPSC 203",
          },
          {
            title: "Executable Examinations",
            url: "https://github.com/ProactiveProgrammers",
            description: "Delivering exams that are programming focused and are automatically executed",
            features: [
              "Integration layer on top of GatorGrade and GatorGrader",
              "Programming-centric examinations used in 101/102",
              "Security-conscious implementation for grading in CI",
              "Focus on working prototype for Spring 2023",
              "Refactor implementation and generalize for Fall 2023 / Spring 2024",
            ],
            note: "Plan to use this tool in all CMPSC courses",
          },
          {
            title: "GradeAlert",
            description: "An automated gradebook utility for teachers written in Python",
            features: [
              "Creates markdown files from the instructor's grade spreadsheet",
              "Grade files may be diffused to students via GitHub repositories",
              "Allows students to get feedback on class performance with minimal instructor effort",
              "Successfully tested in eight classes",
              "Also being used by other instructors in academia",
            ],
            note: "Plan to use this tool in CMPSC 101, 102, and 203",
          },
        ],
      },
      {
        title: "Open Course Platforms",
        description:
          "While collaborating with students, faculty led the development of open source course platforms in most courses taught in 2022. Each course below provides an online platform with easy access to the course materials including project and lab assignments, class activities, course flow, and slides. Solution repositories to all assignments can be provided upon request.",
        items: [
          {
            title: "term-world",
            meta: "Doug Luman",
            description: "Learning-by-doing curriculum focused on using real-world objects and processes to teach computer science.",
            links: ["https://www.github.com/term-world"],
          },
          {
            title: "Proactive Programmers",
            url: "https://proactiveprogrammers.com",
            meta: "Greg Kapfhammer",
            description: "Putting the PRO in Programmer with projects for students in Data Abstraction and Discrete Structures.",
            links: ["https://github.com/ProactiveProgrammers"],
          },
          {
            title: "Operating Systems Sketch",
            url: "https://www.os-sketch.com",
            meta: "Greg Kapfhammer",
            description: "Exploring operating systems ... one sketch at a time!",
            links: ["https://github.com/OS-Sketch"],
          },
          {
            title: "Ready, Set, Research!",
            meta: "Greg Kapfhammer",
            description: "Comprehensive undergraduate research project: design research project, develop a computational artifact, write undergraduate thesis and present results of the scholarly activity",
            links: ["https://github.com/ReadyResearchers"],
          },
          {
            title: "Robotic Agents",
            url: "https://learnroboticagents.com",
            meta: "Janyl Jumadinova",
            description: "Hands-on introduction to robotics via exploration of multiple robot platforms",
            links: ["https://github.com/RoboticAgents"],
          },
          {
            title: "Crafting Software",
            url: "https://learncraftingsoftware.com",
            meta: "Janyl Jumadinova",
            description: "Team-focused project-based introduction to software engineering concepts and skills",
            links: ["https://github.com/CraftingSoftware"],
          },
          {
            title: "Junior Seminar",
            url: "https://devisingresearch.com",
            meta: "Oliver Bonham-Carter",
            description: "Research preparation: cultivate ideas, determine scope and feasibility, create prototypes and deliver proposals for potential research projects.",
            links: ["https://github.com/Devising-Research"],
          },
          {
            title: "Bioinformatics",
            url: "https://computationalbioinformatics.com",
            meta: "Oliver Bonham-Carter",
            description: "An introduction to computational bioinformatics to explore and gain skill at the intersection of biology and computer science",
            links: ["https://github.com/Computational-Bioinformatics"],
          },
        ],
      },
    ],
  },
];

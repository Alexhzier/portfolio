export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  impactMetric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  colSpan: 'normal' | 'wide' | 'tall';
  accentGlow?: string;
  imageUrl?: string;
  isPrototype?: boolean;
  details: {
    problem: string;
    architecture: string;
    result: string;
    contributions?: string[];
    datasetBreakdown?: {
      category: string;
      count: number;
      percentage: string;
      color: string;
    }[];
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface MetricProof {
  value: string;
  label: string;
  detail: string;
}

export interface EducationInfo {
  degree: string;
  field: string;
  graduationStatus: string;
  graduationYear: string;
  summary: string;
  highlights: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    subRole: string;
    positioningStatement: string;
    bioParagraph: string;
    education: EducationInfo;
    availability: {
      status: boolean;
      label: string;
      subtext: string;
    };
    location: string;
    timezone: string;
    email: string;
    phone: string;
    phoneRaw: string;
    socialLinks: {
      platform: string;
      url: string;
      label: string;
    }[];
  };
  metrics: MetricProof[];
  techCategories: {
    category: string;
    skills: { name: string; proficiency: string; badge?: string }[];
  }[];
  projects: Project[];
  experience: ExperienceItem[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Alexhzier C. Asdain",
    role: "Full-Stack Engineer & Website Developer",
    subRole: "AI Systems, Modern Web Applications & Hardware Prototypes",
    positioningStatement: "I build high-performance web applications, machine learning analytics platforms, and hardware-integrated software solutions.",
    bioParagraph: "Experienced in shipping production-grade web systems, deep learning NLP pipelines, and responsive interfaces with strict attention to performance, type safety, and real-world utility.",
    education: {
      degree: "Bachelor of Science in Computer Science",
      field: "Computer Science",
      graduationStatus: "Graduated 2026",
      graduationYear: "2026",
      summary: "Comprehensive academic foundation in software engineering, algorithms, database systems, and applied machine learning.",
      highlights: [
        "Undergraduate Thesis: Social Media Listening for Mental Health Issues in SOCCSARGEN using NLP & CNN-LSTM classification model on 5,067 manually collected posts.",
        "Industry Internship: Software Development Intern at T3X Solutions contributing to Delphi full-stack applications and Highcharts reporting interfaces.",
        "Core Competencies: Object-Oriented Programming, Data Structures, Modern Web Architectures, Database Design & Biometric Hardware Integration."
      ]
    },
    availability: {
      status: true,
      label: "Available for engineering roles & select contracts",
      subtext: "Ready for new project engagements",
    },
    location: "Philippines & Remote",
    timezone: "Asia/Manila",
    email: "alexierasdain321@gmail.com",
    phone: "+63 956 036 5731",
    phoneRaw: "+639560365731",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/Alexhzier", label: "Alexhzier" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/alexhzier-asdain-317664260/", label: "alexhzier-asdain" },
      { platform: "Phone / Mobile", url: "tel:+639560365731", label: "+63 956 036 5731" },
      { platform: "Email", url: "mailto:alexierasdain321@gmail.com", label: "alexierasdain321@gmail.com" },
    ],
  },
  metrics: [
    {
      value: "5,067",
      label: "Posts Manually Analyzed",
      detail: "Regional social media listening dataset classified with CNN-LSTM",
    },
    {
      value: "100%",
      label: "Server-Clock Synced Timer",
      detail: "Persistent database-backed study timer with Supabase RLS",
    },
    {
      value: "< 50ms",
      label: "Storefront Paint Time",
      detail: "Zero-bloat vanilla JavaScript architecture on Penbrae & Co.",
    },
    {
      value: "500 DPI",
      label: "Biometric Hardware Capture",
      detail: "Optical reader integration prototype via DigitalPersona SDK",
    },
  ],
  techCategories: [
    {
      category: "Full-Stack Web Development",
      skills: [
        { name: "TypeScript", proficiency: "Advanced", badge: "Language" },
        { name: "JavaScript (ES6+)", proficiency: "Advanced", badge: "Language" },
        { name: "Next.js 15 (App Router)", proficiency: "Advanced", badge: "Framework" },
        { name: "React 19", proficiency: "Advanced", badge: "Library" },
        { name: "Tailwind CSS", proficiency: "Expert", badge: "Styling" },
        { name: "Supabase & PostgreSQL", proficiency: "Intermediate/Advanced", badge: "Database" },
      ],
    },
    {
      category: "AI, Machine Learning & Analytics",
      skills: [
        { name: "Python", proficiency: "Advanced", badge: "Language" },
        { name: "Natural Language Processing (NLP)", proficiency: "Applied", badge: "Specialty" },
        { name: "CNN-LSTM Deep Learning", proficiency: "Applied", badge: "Specialty" },
        { name: "Vercel AI SDK", proficiency: "Production", badge: "Applied" },
        { name: "Highcharts.js & Recharts", proficiency: "Advanced", badge: "Visualization" },
        { name: "Claude AI-Assisted Dev", proficiency: "Practitioner", badge: "Workflow" },
      ],
    },
    {
      category: "Hardware Integration & Systems",
      skills: [
        { name: "DigitalPersona U.are.U 4500", proficiency: "Hardware Prototype", badge: "Hardware" },
        { name: "DPUruNet SDK", proficiency: "Device Capture", badge: "Hardware" },
        { name: "Leaflet.js Cartography", proficiency: "Interactive Maps", badge: "GIS" },
        { name: "WCAG 2.2 AA Accessibility", proficiency: "Compliant", badge: "Standards" },
      ],
    },
  ],
  projects: [
    {
      id: "social-media-listening",
      title: "Social Media Listening for Mental Health Issues in SOCCSARGEN",
      subtitle: "Academic thesis using NLP & CNN-LSTM to analyze regional social media discussions",
      category: "AI / Machine Learning / Data Analytics / Thesis Project",
      impactMetric: "5,067 Posts Analyzed",
      metricLabel: "CNN-LSTM Classifier • 5 Mental Health Categories • Highcharts Dashboard",
      description: "An academic research project that analyzes 5,067 manually collected public social media posts from SOCCSARGEN (South Cotabato, Sarangani, and General Santos City) across Facebook, X, TikTok, and Threads using NLP and a CNN-LSTM deep learning model to classify mental health concerns.",
      tags: ["Python", "NLP", "CNN-LSTM", "Highcharts.js", "TopoJSON", "JavaScript", "Claude AI", "Data Analytics"],
      githubUrl: "https://github.com/Alexhzier/Social-Media-Listening-for-Mental-Health-Issues-in-SOCCSARGEN.",
      featured: true,
      colSpan: "wide",
      accentGlow: "from-violet-600/20 via-purple-500/10 to-transparent",
      imageUrl: "/projects/social-media-listening.png",
      details: {
        problem: "Understanding mental health discussions in regional social media is difficult due to noisy and informal dialect expressions (Tagalog, English, Cebuano), high volume of user content, and lack of structured visual analytics for public health interpretation.",
        architecture: "Manually collected 5,067 public posts and comments across Facebook, X (formerly Twitter), TikTok, and Threads from the SOCCSARGEN region. Designed an NLP preprocessing pipeline and trained a CNN-LSTM deep learning sequence classification model. Built an interactive Highcharts web dashboard with Region XII TopoJSON choropleth maps, platform distribution charts, and yearly trend lines. Utilized Claude as an AI-assisted development tool for data visualization and workflow optimization.",
        result: "Categorized the 5,067 posts into five clinical mental health categories: Stress (1,569 posts, 30.96%), Suicidal Behavior (947 posts, 18.69%), Depression (894 posts, 17.64%), Anxiety (787 posts, 15.53%), Addiction (773 posts, 15.25%), and Trash/Other (97 posts, 1.91%). Demonstrated how machine learning and regional social media listening can provide data-driven insights into community mental health discussions.",
        contributions: [
          "Curated and preprocessed a regional corpus of 5,067 manually gathered public posts from SOCCSARGEN.",
          "Implemented the NLP cleaning pipeline and CNN-LSTM deep learning classification model.",
          "Constructed interactive data visualizations, choropleth maps, and heatmaps using Highcharts.js and TopoJSON.",
          "Employed Claude as an AI-assisted tool to accelerate dashboard architecture and chart configurations.",
          "Delivered comprehensive data analytics breakdown across Facebook, X, TikTok, and Threads platforms."
        ],
        datasetBreakdown: [
          { category: "Stress", count: 1569, percentage: "30.96%", color: "bg-amber-500" },
          { category: "Suicidal Behavior", count: 947, percentage: "18.69%", color: "bg-rose-500" },
          { category: "Depression", count: 894, percentage: "17.64%", color: "bg-violet-500" },
          { category: "Anxiety", count: 787, percentage: "15.53%", color: "bg-blue-500" },
          { category: "Addiction", count: 773, percentage: "15.25%", color: "bg-emerald-500" },
          { category: "Trash / Other", count: 97, percentage: "1.91%", color: "bg-zinc-500" }
        ]
      },
    },
    {
      id: "ai-study-tracker",
      title: "AI Study Tracker",
      subtitle: "Full-stack study management with cross-device synced timer & adaptive AI planner",
      category: "AI / Productivity / Web Application",
      impactMetric: "Adaptive AI Planner",
      metricLabel: "Next.js App Router • Supabase RLS • Vercel AI SDK • Recharts",
      description: "A full-stack study productivity application that solves unrealistic student scheduling by analyzing actual study history and drafting adaptive, editable weekly study plans using AI, accompanied by a cross-device server-synced timer and calendar heatmaps.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel AI SDK", "Recharts"],
      liveUrl: "https://ai-study-tracker-omega.vercel.app/",
      githubUrl: "https://github.com/Alexhzier/AI-Study-Tracker",
      featured: true,
      colSpan: "wide",
      accentGlow: "from-indigo-600/20 via-violet-500/10 to-transparent",
      imageUrl: "/projects/ai-study-tracker.png",
      details: {
        problem: "Students frequently set rigid, aspirational schedules disconnected from real study pacing, leading to schedule abandonment, untracked time across multiple devices, and zero adaptive feedback when sessions fall behind.",
        architecture: "Architected using Next.js 15 (App Router), TypeScript, and Tailwind CSS. Backed by Supabase PostgreSQL with strict Row Level Security (RLS) on all tables. Built an AI planner using Vercel AI SDK that precomputes local session statistics before prompting models, strictly validating generated plans against real subjects, availability, and exam deadlines. Includes a server-clock persistent timer, Recharts calendar intensity heatmaps, and an automated pg_cron sandbox demo.",
        result: "Deployed to production with an active multi-device sync engine, reliable AI planning that admits when user history is thin rather than hallucinating, and an isolated sandbox demo mode for portfolio visitors.",
        contributions: [
          "Developed complete full-stack Next.js 15 App Router architecture with TypeScript and modern Tailwind styling.",
          "Designed Supabase PostgreSQL schema with comprehensive Row Level Security (RLS) policies.",
          "Implemented database-backed cross-device study timer using server-side clock timestamps.",
          "Integrated Vercel AI SDK to generate structured weekly study plans grounded in actual student progress.",
          "Built interactive calendar heatmaps and session analytics dashboards using Recharts.",
          "Configured temporary anonymous guest demo sandboxes with automated pg_cron cleanup."
        ]
      },
    },
    {
      id: "penbrae-and-co",
      title: "Penbrae & Co.",
      subtitle: "Bespoke editorial e-commerce platform for rare Himalayan single-harvest lots",
      category: "Web Development / Website Design",
      impactMetric: "Sub-50ms Paint Time",
      metricLabel: "Zero-Bloat Vanilla JS • Leaflet Cartography • Archival Commerce Ledger",
      description: "An independent, bespoke e-commerce experience designed as an archival field monograph and editorial tasting room for rare single-harvest teas, heirloom rhizomes, and hearth-smoked chillies from smallholder artisan collectives across Northeast India.",
      tags: ["Vanilla JS (ES6+)", "CSS3 Custom Properties", "Leaflet.js", "Web Audio API", "JSON-LD", "WordPress/WooCommerce"],
      liveUrl: "https://penbrae-and-co.vercel.app/",
      githubUrl: "https://github.com/Alexhzier/penbrae-and-co",
      featured: true,
      colSpan: "wide",
      accentGlow: "from-emerald-600/20 via-teal-500/10 to-transparent",
      imageUrl: "/projects/penbrae-and-co.png",
      details: {
        problem: "Conventional e-commerce templates treat artisan, single-harvest goods as interchangeable SKUs, erasing the human grower collectives, terroir elevations, and ancient craft traditions behind heirloom ingredients.",
        architecture: "Engineered from scratch with modern vanilla JavaScript (ES6+) and modular CSS3 custom properties without heavy runtime framework bloat. Integrated an interactive Leaflet.js cartographic map plotting producer coordinates, a slide-over cart ledger with dynamic weight/price calculations, WCAG 2.2 AA compliant harvest field audio with verbatim transcripts, and an editorial Journal.",
        result: "Achieved sub-50ms initial paint times, zero cumulative layout shift (CLS), full mobile responsiveness, and rich JSON-LD structured data graph for search visibility.",
        contributions: [
          "Designed and built the zero-bloat vanilla JavaScript frontend and custom CSS architecture.",
          "Implemented interactive Leaflet.js cartographic provenance map with producer coordinate tooltips.",
          "Developed reactive slide-over basket ledger, dynamic weight variants, and UK shipping logic.",
          "Created accessible documentary field audio player with WCAG 2.2 AA compliant transcripts.",
          "Implemented SEO graph with semantic JSON-LD structured data across all stalls and journal articles."
        ]
      },
    },
    {
      id: "fingerprint-prototype",
      title: "Fingerprint Capture Prototype",
      subtitle: "Hardware reader integration & web-based tracking prototype",
      category: "Hardware Integration & Systems Lab / Prototype",
      impactMetric: "Hardware Prototype",
      metricLabel: "DigitalPersona U.are.U 4500 • React/Next.js • PostgreSQL",
      description: "A hardware integration prototype testing fingerprint capture workflows using the DigitalPersona U.are.U 4500 optical reader, featuring a web-based capture interface and supporting database components for enrollment records.",
      tags: ["React", "Next.js", "PostgreSQL", "DigitalPersona U.are.U 4500", "DPUruNet SDK", "Hardware Integration"],
      featured: false,
      colSpan: "wide",
      accentGlow: "from-violet-500/20 via-blue-500/10 to-transparent",
      isPrototype: true,
      details: {
        problem: "Interfacing specialized desktop optical fingerprint sensors with web-based tracking interfaces requires managing driver communication, reader state events, and raw sample acquisition without blocking client workflows.",
        architecture: "Developed a prototype integration utilizing the DigitalPersona U.are.U 4500 optical fingerprint reader and DPUruNet SDK. Implemented device discovery, reader selection, and optical sensor trigger event handlers. Connected the capture pipeline with web components built in React and Next.js, backed by a PostgreSQL database schema designed to track enrollment metadata.",
        result: "Successfully demonstrated device initialization, reader connection, optical capture triggering, and raw biometric sample acquisition into the application workflow as a functional proof-of-concept prototype. (Note: Prototype focused on device capture and enrollment records; complete 1:N or 1:1 automated biometric verification was not implemented.)",
        contributions: [
          "Integrated DigitalPersona U.are.U 4500 reader using DPUruNet SDK libraries.",
          "Engineered hardware event listener handling reader selection, optical touch events, and raw sample buffers.",
          "Designed supporting PostgreSQL database schema for tracking enrollment logs and timestamps.",
          "Built web-based prototype interface components in React/Next.js to monitor reader status."
        ]
      },
    },
  ],
  experience: [
    {
      id: "exp-1",
      period: "Jun 2025 — Aug 2025",
      role: "Software Development Intern",
      company: "T3X Solutions",
      location: "Philippines",
      summary: "Contributed to the development and maintenance of full-stack applications, web-based reporting interfaces, and database workflows for healthcare and financial enterprise systems.",
      achievements: [
        "Contributed to the development and maintenance of Delphi-based full-stack applications for a hospital and a loaning company, supporting business operations through software solutions tailored to their respective workflows.",
        "Developed and supported web-based reporting interfaces using JavaScript and HTML, integrating Highcharts to present application data through interactive charts and visualizations for easier monitoring and analysis.",
        "Assisted in implementing front-end interfaces and back-end application functionality, helping connect user-facing features with underlying business logic and data-processing workflows.",
        "Worked with database-driven applications to support the handling, presentation, and organization of operational data within business systems.",
        "Gained practical experience in full-stack development by working across different application components, troubleshooting issues, and contributing to the improvement of existing software functionality.",
      ],
      technologies: ["Delphi", "JavaScript", "HTML", "Highcharts", "Full-Stack Development", "Databases"],
    },
  ],
};

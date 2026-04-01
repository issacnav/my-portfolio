export const PHYSIOHUB_PROFILES_DEMO_URL =
  "https://mvp-demo-gamma.vercel.app/";

export type ProjectStatus = "Current Build" | "Live" | "Archived";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  url: string;
  status: ProjectStatus;
  ctaLabel: string;
  eyebrow?: string;
  note?: string;
  featureHighlights?: string[];
  subdomainPreview?: string;
  featured?: boolean;
};

export const featuredProduct: Project = {
  slug: "physiohub-profiles",
  title: "PhysioHub Profiles",
  tagline: "A Linktree-style profile platform for physiotherapists.",
  description:
    "Each physiotherapist gets a branded mini-site on a PhysioHub subdomain to showcase services, booking links, credibility, and key resources in one clean place.",
  tags: ["SaaS", "Physiotherapy", "Profiles"],
  url: PHYSIOHUB_PROFILES_DEMO_URL,
  status: "Current Build",
  ctaLabel: "View Demo",
  eyebrow: "Featured Product",
  note: "Built for independent physiotherapists",
  subdomainPreview: "sarah.physiohub.io",
  featured: true,
  featureHighlights: [
    "Branded profiles",
    "Custom subdomains",
    "Bookings in one place",
  ],
};

export const projects: Project[] = [
  featuredProduct,
  {
    slug: "physiohub",
    title: "PhysioHub",
    tagline: "Earlier all-in-one PhysioHub platform concept.",
    description:
      "A broader physiotherapy platform with quiz, flashcard, and blog features. This was the original PhysioHub direction before the newer PhysioHub Profiles product focus, and it was paused in 2025 during examination commitments.",
    tags: ["Healthcare", "Physiotherapy", "Platform"],
    url: "https://physiohub.io",
    status: "Archived",
    ctaLabel: "View Archive",
    eyebrow: "Earlier Direction",
    note: "Preceded the newer PhysioHub Profiles product direction.",
  },
  {
    slug: "quizl",
    title: "Quizl",
    tagline: "Interactive quiz app with fast, clean question flow.",
    description:
      "An interactive quiz application with real-time scoring, multiple categories, and a clean user interface. Built with Next.js for fast performance and smooth transitions between questions.",
    tags: ["Next.js", "Quiz", "Interactive"],
    url: "https://quizl-opal.vercel.app/",
    status: "Live",
    ctaLabel: "View Project",
  },
];

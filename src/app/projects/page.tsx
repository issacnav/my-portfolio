"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CrossMarker, SectionSeparator } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Motion";
import { ProjectStatusBadge } from "@/components/ProjectStatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { projects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function ArrowUpRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isFeatured = project.featured;
  const chips = project.tags;

  return (
    <StaggerItem>
      <motion.article
        className={cn(
          "group screen-line-after border-x border-edge transition-colors",
          "hover:bg-accent/50"
        )}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div
          className={cn(
            "relative px-4 py-5",
            isFeatured && "px-4 py-6 sm:px-5 sm:py-6"
          )}
        >
          {index === 0 && (
            <>
              <CrossMarker position="top-left" />
              <CrossMarker position="top-right" />
            </>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {project.eyebrow ? (
                    <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {project.eyebrow}
                    </span>
                  ) : null}
                  <ProjectStatusBadge status={project.status} />
                </div>

                <h2
                  className={cn(
                    "mt-3 font-pixel font-semibold leading-tight group-hover:text-foreground",
                    isFeatured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                  )}
                >
                  {project.title}
                </h2>

                <p className="mt-1 font-mono text-sm text-foreground">
                  {project.tagline}
                </p>
              </div>

              {project.subdomainPreview ? (
                <div className="inline-flex w-fit shrink-0 rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground">
                  {project.subdomainPreview}
                </div>
              ) : (
                <div className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground">
                  <ArrowUpRightIcon />
                </div>
              )}
            </div>

            <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {project.note ? (
              <p className="font-mono text-xs text-muted-foreground">
                {project.note}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-border bg-background/80 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant: isFeatured ? "default" : "outline",
                    size: "sm",
                  }),
                  "w-full justify-center font-mono sm:w-auto"
                )}
              >
                {project.ctaLabel}
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <CommandPalette />
      <ScrollToTop />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-background to-transparent" />
      <Header />
      <main className="px-3 sm:px-4 md:px-2">
        <div className="mx-auto md:max-w-3xl">
          {/* Page header */}
          <div className="screen-line-before screen-line-after border-x border-edge">
            <div className="relative px-4 py-8">
              <CrossMarker position="top-left" />
              <CrossMarker position="top-right" />
              <FadeIn delay={0.1}>
                <h1 className="font-pixel text-3xl font-semibold sm:text-4xl">
                  Projects
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="mt-2 font-mono text-sm text-muted-foreground">
                  Selected work, with the newest PhysioHub direction featured first.
                </p>
              </FadeIn>
            </div>
          </div>

          <SectionSeparator />

          {/* Project cards */}
          <StaggerContainer className="space-y-0">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </StaggerContainer>

          <SectionSeparator />

          {/* Back link */}
          <div className="screen-line-after border-x border-edge">
            <div className="px-4 py-4">
              <FadeIn delay={0.4}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                  Back to home
                </Link>
              </FadeIn>
            </div>
          </div>

          <SectionSeparator />

          <Footer />
        </div>
      </main>
    </>
  );
}

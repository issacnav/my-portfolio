"use client";

import Link from "next/link";
import { BorderGlow } from "@/components/BorderGlow";
import { Panel } from "@/components/LayoutParts";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/Motion";
import { ProjectStatusBadge } from "@/components/ProjectStatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { featuredProduct } from "@/lib/projects";
import { cn } from "@/lib/utils";

function ArrowUpRightIcon() {
  return (
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
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function FeaturedProductSection() {
  return (
    <Panel title="Featured Product" id="featured-product">
      <div className="p-4">
        <FadeIn y={12}>
          <BorderGlow className="rounded-[20px]" animated>
            <article className="p-4 sm:p-5">
              <StaggerContainer className="flex flex-col gap-5">
                <StaggerItem>
                  <div className="flex flex-wrap items-center gap-2">
                    <ProjectStatusBadge status={featuredProduct.status} />
                    <span className="font-mono text-xs text-muted-foreground">
                      {featuredProduct.note}
                    </span>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="min-w-0">
                    <h3 className="font-pixel text-[1.7rem] font-semibold leading-tight sm:text-3xl">
                      {featuredProduct.title}
                    </h3>
                    <p className="mt-1 max-w-xl font-mono text-sm leading-relaxed text-foreground">
                      {featuredProduct.tagline}
                    </p>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <p className="max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">
                    {featuredProduct.description}
                  </p>
                </StaggerItem>

                <StaggerItem>
                  <ul className="flex flex-wrap gap-2" aria-label="PhysioHub Profiles highlights">
                    {featuredProduct.featureHighlights?.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    <a
                      href={featuredProduct.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ size: "lg" }), "w-full justify-center font-mono sm:w-auto")}
                    >
                      View Demo
                      <ArrowUpRightIcon />
                    </a>

                    <Link
                      href="/projects"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full justify-center font-mono sm:w-auto"
                      )}
                    >
                      See Projects
                    </Link>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </article>
          </BorderGlow>
        </FadeIn>
      </div>
    </Panel>
  );
}

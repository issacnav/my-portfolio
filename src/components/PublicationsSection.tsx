"use client";

import { Panel } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Motion";
import { BookOpen, FileText, Presentation } from "lucide-react";

interface Publication {
  title: string;
  type: "dissertation" | "paper" | "poster";
  venue: string;
  year: string;
  url?: string;
  description?: string;
}

const publications: Publication[] = [
  {
    title: "Comparison Between Immediate Effect Of Positional Release Technique And Ischemic Compression Release In Patients With Quadratus Lumborum Trigger Point On Pain Intensity And Pressure Threshold Having Non-Specific Low Back Pain",
    type: "dissertation",
    venue: "Government Medical College Nagpur",
    year: "2023",
    description:
      "Conducted a clinical research study comparing the immediate effectiveness of two evidence-based manual therapy interventions - Positional Release Technique (PRT) and Ischemic Compression Release (ICR) - for treating myofascial trigger points in the quadratus lumborum muscle among patients with chronic non-specific low back pain.",
  },
  {
    title: "Effect of NMES on quadriceps strength, balance, and mobility outcomes in acute stroke survivor",
    type: "dissertation",
    venue: "Glasgow Caledonian University (GCU)",
    year: "2024",
    description:
      "Investigating the effect of neuromuscular electrical stimulation (NMES) on quadriceps strength, balance, and mobility outcomes in acute stroke survivors.",
  },
];

const typeConfig = {
  dissertation: { icon: BookOpen, label: "Dissertation" },
  paper: { icon: FileText, label: "Paper" },
  poster: { icon: Presentation, label: "Poster" },
};

export function PublicationsSection() {
  return (
    <Panel title="Publications & Research" id="publications">
      <div className="p-4 space-y-4">
        <StaggerContainer className="space-y-4">
          {publications.map((pub) => {
            const config = typeConfig[pub.type];
            const Icon = config.icon;

            return (
              <StaggerItem key={pub.title}>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-muted-foreground/15">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-mono text-sm font-medium text-foreground">
                          {pub.url ? (
                            <a
                              href={pub.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-offset-4 hover:underline"
                            >
                              {pub.title}
                            </a>
                          ) : (
                            pub.title
                          )}
                        </h3>
                        <span className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {config.label}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {pub.venue} · {pub.year}
                      </p>
                      {pub.description && (
                        <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">
                          {pub.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

    
      </div>
    </Panel>
  );
}

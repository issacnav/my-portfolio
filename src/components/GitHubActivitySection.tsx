"use client";

import { Panel } from "@/components/LayoutParts";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/Motion";
import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Brain,
  Bone,
  Accessibility,
  ShieldCheck,
  ClipboardList,
  Users,
  Hand,
} from "lucide-react";
import { type ComponentType } from "react";

const certifications = [
  "Manual Therapy Certification",
  "VTCT Skills (ITEC) Level 3 Extended Diploma in Sport Massage",
  "Certified Acupuncture & Dry Needling Therapist",
  "Level 3 Health and Social Care with Adult Nursing",
];

const hoverColors = [
  "oklch(0.93 0.05 0)",      // soft rose
  "oklch(0.93 0.04 250)",    // soft blue
  "oklch(0.92 0.05 150)",    // soft green
  "oklch(0.93 0.05 30)",     // soft orange
  "oklch(0.92 0.04 280)",    // soft purple
  "oklch(0.93 0.04 190)",    // soft teal
  "oklch(0.93 0.04 80)",     // soft yellow
  "oklch(0.92 0.04 220)",    // soft sky
  "oklch(0.92 0.05 330)",    // soft pink
];

const hoverColorsDark = [
  "oklch(0.30 0.05 0)",      // dark rose
  "oklch(0.30 0.04 250)",    // dark blue
  "oklch(0.28 0.05 150)",    // dark green
  "oklch(0.30 0.05 30)",     // dark orange
  "oklch(0.28 0.04 280)",    // dark purple
  "oklch(0.30 0.04 190)",    // dark teal
  "oklch(0.30 0.04 80)",     // dark yellow
  "oklch(0.28 0.04 220)",    // dark sky
  "oklch(0.28 0.05 330)",    // dark pink
];

const skills: { label: string; icon: ComponentType<{ className?: string }> }[] = [
  { label: "Patient Care", icon: Heart },
  { label: "Communication", icon: MessageCircle },
  { label: "Neuro Rehab", icon: Brain },
  { label: "Ortho Rehab", icon: Bone },
  { label: "Mobility Support", icon: Accessibility },
  { label: "Infection Control", icon: ShieldCheck },
  { label: "Documentation", icon: ClipboardList },
  { label: "Team Collaboration", icon: Users },
  { label: "Manual Therapy", icon: Hand },
];

export function CertificationsSection() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Panel title="Certifications & Skills" id="certifications">
      <div className="p-4 space-y-4">
        <FadeIn>
          <div>
            <h3 className="font-mono text-sm font-medium text-foreground mb-2">Certifications</h3>
            <StaggerContainer className="space-y-1.5">
              {certifications.map((cert) => (
                <StaggerItem key={cert}>
                  <li className="flex items-start gap-2 font-mono text-sm text-muted-foreground list-none">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />
                    {cert}
                  </li>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div>
            <h3 className="font-mono text-sm font-medium text-foreground mb-2">Skills</h3>
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-border rounded-lg border overflow-hidden">
              {skills.map((skill, i) => (
                <StaggerItem key={skill.label}>
                  <motion.div
                    className="flex items-center gap-2.5 px-3 py-3 font-mono text-xs text-muted-foreground cursor-default"
                    whileHover={{ backgroundColor: isDark ? hoverColorsDark[i] : hoverColors[i] }}
                    transition={{ duration: 0.15 }}
                  >
                    <skill.icon className="size-4 shrink-0" />
                    <span className="leading-tight">{skill.label}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mx-auto w-full max-w-sm">
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Interests</span>
                <span className="text-sm text-neutral-800 dark:text-white/80">
                  Creative writing · Volunteering · Chess · Web development
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </Panel>
  );
}

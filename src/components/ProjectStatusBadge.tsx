"use client";

import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/projects";

const statusStyles: Record<
  ProjectStatus,
  { container: string; dot: string }
> = {
  "Current Build": {
    container: "border-border bg-background text-foreground",
    dot: "bg-foreground/70",
  },
  Live: {
    container:
      "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400",
    dot: "bg-green-500",
  },
  Archived: {
    container: "border-border bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

export function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const styles = statusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
        styles.container,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", styles.dot)} />
      {status}
    </span>
  );
}

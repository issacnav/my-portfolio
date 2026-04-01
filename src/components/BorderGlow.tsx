"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  animated?: boolean;
  edgeSensitivity?: number;
  borderRadius?: number;
  glowRadius?: number;
  coneSpread?: number;
  fillOpacity?: number;
  backgroundColor?: string;
  colors?: string[];
};

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function lerpAngle(start: number, end: number, amount: number) {
  let delta = ((end - start + 540) % 360) - 180;

  if (delta < -180) {
    delta += 360;
  }

  return (start + delta * amount + 360) % 360;
}

const gradientPositions = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];

const gradientKeys = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
] as const;

const colorMap = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]) {
  const vars: Record<string, string> = {};

  for (let index = 0; index < gradientKeys.length; index += 1) {
    const color = colors[Math.min(colorMap[index], colors.length - 1)];
    vars[gradientKeys[index]] = `radial-gradient(at ${gradientPositions[index]}, ${color} 0px, transparent 50%)`;
  }

  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;

  return vars;
}

export function BorderGlow({
  children,
  className,
  animated = true,
  edgeSensitivity = 22,
  borderRadius = 20,
  glowRadius = 24,
  coneSpread = 18,
  fillOpacity = 0.22,
  backgroundColor = "var(--background)",
  colors = [
    "color-mix(in oklab, var(--foreground) 20%, transparent)",
    "color-mix(in oklab, var(--foreground) 10%, transparent)",
    "color-mix(in oklab, var(--foreground) 24%, transparent)",
  ],
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const pointerAngleRef = useRef(120);
  const pointerProximityRef = useRef(70);
  const currentAngleRef = useRef(120);
  const currentProximityRef = useRef(70);

  const getCenterOfElement = useCallback((element: HTMLElement) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback(
    (element: HTMLElement, x: number, y: number) => {
      const [centerX, centerY] = getCenterOfElement(element);
      const deltaX = x - centerX;
      const deltaY = y - centerY;

      let kx = Infinity;
      let ky = Infinity;

      if (deltaX !== 0) {
        kx = centerX / Math.abs(deltaX);
      }

      if (deltaY !== 0) {
        ky = centerY / Math.abs(deltaY);
      }

      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement]
  );

  const getCursorAngle = useCallback(
    (element: HTMLElement, x: number, y: number) => {
      const [centerX, centerY] = getCenterOfElement(element);
      const deltaX = x - centerX;
      const deltaY = y - centerY;

      if (deltaX === 0 && deltaY === 0) {
        return 0;
      }

      const radians = Math.atan2(deltaY, deltaX);
      let degrees = radians * (180 / Math.PI) + 90;

      if (degrees < 0) {
        degrees += 360;
      }

      return degrees;
    },
    [getCenterOfElement]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;

      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);

      isHoveringRef.current = true;
      pointerAngleRef.current = angle;
      pointerProximityRef.current = Math.max(edge * 100, 56);

      card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
      card.style.setProperty(
        "--edge-proximity",
        `${pointerProximityRef.current.toFixed(3)}`
      );

      currentAngleRef.current = angle;
      currentProximityRef.current = pointerProximityRef.current;
    },
    [getCursorAngle, getEdgeProximity]
  );

  useEffect(() => {
    const card = cardRef.current;

    if (!animated || !card) {
      return;
    }

    let frameId = 0;

    const handlePointerEnter = () => {
      isHoveringRef.current = true;
    };
    const handlePointerLeave = () => {
      isHoveringRef.current = false;
    };

    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointerleave", handlePointerLeave);

    const loop = (time: number) => {
      const isHovering = isHoveringRef.current;
      const idleAngle = ((time * 0.022) % 360 + 360) % 360;
      const idleProximity = 58 + Math.sin(time * 0.0012) * 8;
      const targetAngle = isHovering ? pointerAngleRef.current : idleAngle;
      const targetProximity = isHovering
        ? pointerProximityRef.current
        : idleProximity;

      if (!isHovering) {
        currentAngleRef.current = lerpAngle(
          currentAngleRef.current,
          targetAngle,
          0.065
        );
        currentProximityRef.current = lerp(
          currentProximityRef.current,
          targetProximity,
          0.05
        );

        card.style.setProperty(
          "--cursor-angle",
          `${currentAngleRef.current.toFixed(3)}deg`
        );
        card.style.setProperty(
          "--edge-proximity",
          `${currentProximityRef.current.toFixed(3)}`
        );
      }

      frameId = requestAnimationFrame(loop);
    };

    card.classList.add("border-glow-active");
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      card.classList.remove("border-glow-active");
      card.removeEventListener("pointerenter", handlePointerEnter);
      card.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [animated]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={cn("portfolio-border-glow", animated && "border-glow-active", className)}
      style={
        {
          "--card-bg": backgroundColor,
          "--edge-sensitivity": edgeSensitivity,
          "--border-radius": `${borderRadius}px`,
          "--glow-padding": `${glowRadius}px`,
          "--cone-spread": coneSpread,
          "--fill-opacity": fillOpacity,
          ...buildGradientVars(colors),
        } as CSSProperties
      }
    >
      <span className="portfolio-border-glow-edge-light" />
      <div className="portfolio-border-glow-inner">{children}</div>
    </div>
  );
}

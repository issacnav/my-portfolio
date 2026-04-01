"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CrossMarker } from "@/components/LayoutParts";
import { FadeIn } from "@/components/Motion";
import { Signature } from "@/components/Signature";
import type { LottieRefCurrentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
  ssr: false,
});

export function Footer() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hiAnimation = useRef<object | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    import("../../public/Hi.json").then((mod) => {
      hiAnimation.current = mod.default;
      setLoaded(true);
    });
  }, []);

  const handleClick = () => {
    lottieRef.current?.goToAndPlay(0);
  };

  const handleComplete = () => {
    lottieRef.current?.pause();
  };

  return (
    <FadeIn>
    <footer className="screen-line-before screen-line-after relative border-x border-edge">
        <CrossMarker position="bottom-left" />
        <CrossMarker position="bottom-right" />

        <div className="flex flex-col-reverse items-start justify-between gap-1 px-3 pb-4 sm:flex-row sm:items-end sm:gap-2 sm:px-4">
          <div className="mt-2 flex flex-col leading-none sm:mt-6">
            <Signature className="w-24 mb-2 text-foreground sm:w-28" />
            <span className="font-mono text-[12px] text-muted-foreground">
              © 2026 Sarthak Navalekar
            </span>
            <span className="font-mono text-[12px] text-muted-foreground">
              Physiotherapist · Scotland, UK
            </span>
          </div>
          <div className="h-16 w-16 cursor-pointer self-end flex-shrink-0 sm:h-20 sm:w-20 sm:self-auto" onClick={handleClick}>
            {loaded && hiAnimation.current && (
              <Lottie
                lottieRef={lottieRef}
                animationData={hiAnimation.current}
                loop={false}
                autoplay
                onComplete={handleComplete}
              />
            )}
          </div>
        </div>
    </footer>
    </FadeIn>
  );
}

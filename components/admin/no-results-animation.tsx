"use client";

import { useEffect, useRef } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";

interface NoResultsAnimationProps {
  message?: string;
  isSearching?: boolean;
}

export function NoResultsAnimation({
  message = "No results found",
  isSearching = false,
}: NoResultsAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const dotLottie = new DotLottie({
      canvas: canvasRef.current,
      autoplay: true,
      loop: true,
      src: "/animations/Empty Box.json",
    });

    return () => {
      dotLottie.destroy();
    };
  }, []);

  return (
    <div className="rounded-lg border border-dashed border-border bg-muted/30 py-12 px-4 text-center space-y-4">
      <div className="flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-[200px] h-[200px]"
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-medium">{message}</p>
        {isSearching && (
          <p className="text-xs text-muted-foreground">Try adjusting your search criteria</p>
        )}
      </div>
    </div>
  );
}

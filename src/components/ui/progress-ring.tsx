// ProgressRing.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps extends React.SVGProps<SVGSVGElement> {
  value: number;
}

export const ProgressRing = React.forwardRef<SVGSVGElement, ProgressRingProps>(
  ({ className, value, ...props }, ref) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <svg
        ref={ref}
        className={cn("transform -rotate-90", className)}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        {...props}
      >
        <circle
          className="text-secondary"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="transition-all duration-300 ease-out"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
    );
  }
);

ProgressRing.displayName = "ProgressRing";

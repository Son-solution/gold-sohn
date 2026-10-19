import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading, type HeadingPart } from "@/components/motion/SplitHeading";

interface SectionHeaderProps {
  eyebrow: string;
  title: HeadingPart[];
  lead?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({ eyebrow, title, lead, as = "h2", className = "", children }: SectionHeaderProps) {
  return (
    <div className={`m-center mb-10 flex min-w-0 flex-col gap-4 sm:mb-12 sm:gap-5 lg:mb-16 ${className}`}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <SplitHeading as={as} parts={title} className="h-display" />
      {lead ? (
        <Reveal delay={0.15}>
          <p className="lead">{lead}</p>
        </Reveal>
      ) : null}
      {children}
    </div>
  );
}

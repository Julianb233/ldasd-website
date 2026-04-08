"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Families Protected", value: 100000, prefix: "", suffix: "+", display: "100,000+" },
  { label: "States Covered", value: 50, prefix: "", suffix: "", display: "50" },
  { label: "Customer Satisfaction", value: 4.9, prefix: "", suffix: "/5", display: "4.9/5" },
  { label: "Years of Experience", value: 15, prefix: "", suffix: "+", display: "15+" },
];

function AnimatedCounter({ value, prefix, suffix, display }: { value: number; prefix: string; suffix: string; display: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              current = value;
              clearInterval(timer);
            }
            setCount(current);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const formatted = hasAnimated
    ? value >= 1000
      ? `${prefix}${Math.floor(count).toLocaleString()}${suffix}`
      : value % 1 !== 0
        ? `${prefix}${count.toFixed(1)}${suffix}`
        : `${prefix}${Math.floor(count)}${suffix}`
    : `${prefix}0${suffix}`;

  return <span ref={ref}>{formatted}</span>;
}

// BBB A+ badge as SVG component
function BBBBadge() {
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-center w-10 h-10 bg-[#005A8B] rounded-lg">
        <span className="text-white font-bold text-sm leading-none">BBB</span>
      </div>
      <div className="text-left">
        <p className="text-xs font-semibold text-foreground/80 leading-tight">Accredited Business</p>
        <p className="text-lg font-bold text-[#005A8B] leading-tight">A+ Rating</p>
      </div>
    </div>
  );
}

// Money-back guarantee badge
function GuaranteeBadge() {
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
        <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      </div>
      <div className="text-left">
        <p className="text-xs font-semibold text-foreground/80 leading-tight">100% Money-Back</p>
        <p className="text-lg font-bold text-secondary-dark leading-tight">Guarantee</p>
      </div>
    </div>
  );
}

export default function TrustIndicators() {
  return (
    <section className="relative py-16 bg-white" aria-label="Trust indicators and statistics">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Badges Row */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
          <BBBBadge />
          <GuaranteeBadge />
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-foreground/80 leading-tight">Valid in All</p>
              <p className="text-lg font-bold text-primary-dark leading-tight">50 States</p>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} display={stat.display} />
              </p>
              <p className="mt-2 text-sm font-medium text-foreground/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

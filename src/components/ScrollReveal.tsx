import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<HTMLElement[]>([]);
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const revealTargets = Array.from(
      node.querySelectorAll<HTMLElement>(
        [
          ".eyebrow",
          ".heading-section",
          "section h3",
          "section p",
          ".data-panel",
          "article",
          "form",
          ".glass",
          "section img",
          "section button",
        ].join(","),
      ),
    ).filter((target, index, all) => {
      return !all.some((other, otherIndex) => otherIndex < index && other.contains(target));
    });

    revealTargets.forEach((target, index) => {
      target.dataset.reveal = "true";
      target.dataset.revealState = "hidden";
      target.style.setProperty("--reveal-order", String(index % 6));
      target.style.setProperty("--reveal-order-delay", `${(index % 6) * 55}ms`);
    });

    targetsRef.current = revealTargets;
    setArmed(true);

    return () => {
      targetsRef.current = [];
      revealTargets.forEach((target) => {
        target.removeAttribute("data-reveal");
        target.removeAttribute("data-reveal-state");
        target.style.removeProperty("--reveal-order");
        target.style.removeProperty("--reveal-order-delay");
      });
    };
  }, []);

  useEffect(() => {
    if (!armed) return;

    const targets = targetsRef.current.filter((target) => target.isConnected);
    if (!targets.length) return;

    const revealTarget = (target: HTMLElement) => {
      if (target.dataset.revealState === "visible") return;
      target.dataset.revealState = "visible";
    };

    const targetIsInView = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      return rect.top < viewportHeight * 0.68 && rect.bottom > viewportHeight * 0.08;
    };

    const checkInView = () => {
      targets.forEach((target) => {
        if (targetIsInView(target)) {
          revealTarget(target);
        }
      });
    };

    if (!("IntersectionObserver" in window)) {
      targets.forEach(revealTarget);
      return;
    }

    let frameTwo = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          revealTarget(target);
          observer.unobserve(target);
        });
      },
      { rootMargin: "0px 0px -32% 0px", threshold: 0.08 },
    );

    targets.forEach((target) => observer.observe(target));
    const firstFrame = window.requestAnimationFrame(() => {
      frameTwo = window.requestAnimationFrame(checkInView);
    });
    const timers = [200, 700, 1200].map((delay) => window.setTimeout(checkInView, delay));
    window.addEventListener("scroll", checkInView, { passive: true });
    window.addEventListener("resize", checkInView);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(frameTwo);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", checkInView);
    };
  }, [armed]);

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", armed && "is-armed", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

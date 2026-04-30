import { useEffect, useLayoutEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const revealSelector = [
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
].join(",");

function getRevealTargets(node: HTMLElement) {
  return Array.from(node.querySelectorAll<HTMLElement>(revealSelector)).filter((target, index, all) => {
    return !all.some((other, otherIndex) => otherIndex < index && other.contains(target));
  });
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const revealTargets = getRevealTargets(node);

    revealTargets.forEach((target, index) => {
      target.dataset.reveal = "true";
      target.dataset.revealState = "hidden";
      target.style.setProperty("--reveal-order", String(index % 6));
      target.style.setProperty("--reveal-order-delay", `${(index % 6) * 55}ms`);
    });

    targetsRef.current = revealTargets;
    node.dataset.revealRoot = "armed";

    return () => {
      node.removeAttribute("data-reveal-root");
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
    const getTargets = () => targetsRef.current.filter((target) => target.isConnected);
    const targets = getTargets();
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
      getTargets().forEach((target) => {
        if (targetIsInView(target)) {
          revealTarget(target);
        }
      });
    };

    if (typeof window.IntersectionObserver !== "function") {
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
    const timers = [120, 450, 900, 1600].map((delay) => window.setTimeout(checkInView, delay));
    window.addEventListener("load", checkInView);
    window.addEventListener("scroll", checkInView, { passive: true });
    window.addEventListener("resize", checkInView);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(frameTwo);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", checkInView);
      window.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", checkInView);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

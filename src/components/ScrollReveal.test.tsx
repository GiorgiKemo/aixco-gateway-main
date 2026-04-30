import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ScrollReveal } from "./ScrollReveal";

const originalIntersectionObserver = window.IntersectionObserver;

afterEach(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    writable: true,
    value: originalIntersectionObserver,
  });
});

describe("ScrollReveal", () => {
  it("arms reveal targets and falls back to visible when IntersectionObserver is unavailable", async () => {
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      writable: true,
      value: undefined,
    });

    render(
      <ScrollReveal>
        <section>
          <p className="eyebrow">Intro</p>
          <h2 className="heading-section">Section heading</h2>
          <article>Card content</article>
        </section>
      </ScrollReveal>,
    );

    const heading = screen.getByRole("heading", { name: "Section heading" });
    const root = document.querySelector(".scroll-reveal");

    expect(root).toHaveAttribute("data-reveal-root", "armed");
    expect(heading).toHaveAttribute("data-reveal", "true");

    await waitFor(() => {
      expect(heading).toHaveAttribute("data-reveal-state", "visible");
    });
  });
});

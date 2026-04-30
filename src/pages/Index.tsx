import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Dubai } from "@/components/sections/Dubai";
import { Batumi } from "@/components/sections/Batumi";
import { Participate } from "@/components/sections/Participate";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Team } from "@/components/sections/Team";
import { Partners } from "@/components/sections/Partners";
import { InsightsTeaser } from "@/components/sections/InsightsTeaser";
import { FAQs } from "@/components/sections/FAQs";
import { Contact } from "@/components/sections/Contact";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    const activeHash = window.location.hash || location.hash;
    if (!activeHash) return;

    const scrollToHash = (behavior: ScrollBehavior) => {
      const target = document.getElementById(activeHash.slice(1));
      if (!target) return;

      const top = window.scrollY + target.getBoundingClientRect().top - 96;
      window.scrollTo({ top: Math.max(0, top), behavior });
    };

    const timers = [0, 150, 500, 900, 1400, 2200].map((delay, index) =>
      window.setTimeout(() => scrollToHash(index === 0 ? "smooth" : "auto"), delay),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [location.hash]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Dubai /></ScrollReveal>
        <ScrollReveal><Batumi /></ScrollReveal>
        <ScrollReveal><Participate /></ScrollReveal>
        <ScrollReveal><HowItWorks /></ScrollReveal>
        <ScrollReveal><Team /></ScrollReveal>
        <ScrollReveal><Partners /></ScrollReveal>
        <ScrollReveal><InsightsTeaser /></ScrollReveal>
        <ScrollReveal><FAQs /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
      </main>
      <Footer />
    </>
  );
};

export default Index;

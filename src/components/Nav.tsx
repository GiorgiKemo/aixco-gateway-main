import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n, LANGS } from "@/i18n/I18nProvider";
import { useUI } from "@/components/ui-state";

const NAV = [
  { key: "nav.home", to: "/", hash: "" },
  { key: "nav.about", to: "/", hash: "#about" },
  { key: "nav.dubai", to: "/", hash: "#dubai" },
  { key: "nav.batumi", to: "/", hash: "#batumi" },
  { key: "nav.participate", to: "/", hash: "#participate" },
  { key: "nav.how", to: "/", hash: "#how" },
  { key: "nav.team", to: "/", hash: "#team" },
  { key: "nav.partners", to: "/", hash: "#partners" },
  { key: "nav.insights", to: "/insights", hash: "" },
  { key: "nav.faqs", to: "/", hash: "#faqs" },
  { key: "nav.contact", to: "/", hash: "#contact" },
];

const COMPACT_NAV = NAV.filter((item) =>
  ["nav.home", "nav.about", "nav.dubai", "nav.batumi", "nav.participate", "nav.contact"].includes(item.key),
);

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const { openLogin, openRegister } = useUI();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [overHero, setOverHero] = useState(location.pathname === "/" && !location.hash);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const hero = document.querySelector<HTMLElement>("[data-hero-section]");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setOverHero(rect.top <= 80 && rect.bottom > 96);
      } else {
        setOverHero(false);
      }
      // active section
      if (location.pathname !== "/") return;
      const sections = ["about", "dubai", "batumi", "participate", "how", "team", "partners", "faqs", "contact"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) current = `#${id}`;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  const heroHeader = overHero;
  const showHeaderBackground = open || scrolled || !heroHeader;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        showHeaderBackground
          ? heroHeader
            ? "bg-foreground/35 shadow-soft backdrop-blur-xl"
            : "bg-background/90 shadow-soft backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-x relative flex h-16 items-center justify-between md:h-20">
        <Logo inverse={heroHeader} className="relative z-10 shrink-0" />

        <nav aria-label="Primary" className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-5 xl:flex">
          {COMPACT_NAV.map((item) => {
            const isActive = item.hash
              ? active === item.hash
              : location.pathname === item.to && !active && !location.hash;
            const href = `${item.to}${item.hash}`;
            const inactiveClass = heroHeader ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground";
            const activeClass = heroHeader ? "text-primary-glow" : "text-primary";
            return (
              <Link
                key={item.key}
                to={href}
                className={`whitespace-nowrap px-2 py-1 text-[13px] font-semibold [letter-spacing:0] transition-colors ${isActive ? activeClass : inactiveClass}`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center justify-end gap-2 md:gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Change language"
              className={`inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl px-2 text-[11px] font-semibold uppercase [letter-spacing:0] transition ${
                heroHeader
                  ? "text-white/90 hover:text-white"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              {LANGS.find((l) => l.code === lang)?.native}
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>
            {langOpen && (
              <ul role="listbox" className="absolute right-0 mt-2 w-44 rounded-2xl border border-border bg-popover/95 p-1.5 shadow-elegant backdrop-blur-xl animate-scale-in">
                {LANGS.map((l) => (
                  <li key={l.code}>
                    <button
                      role="option"
                      aria-selected={l.code === lang}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${l.code === lang ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[10px] uppercase [letter-spacing:0] opacity-70">{l.native}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button onClick={openLogin} className={`hidden whitespace-nowrap rounded-xl px-2 py-2 text-[13px] font-semibold [letter-spacing:0] transition-colors md:inline-flex ${heroHeader ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"}`}>
            {t("cta.login")}
          </button>
          <button
            onClick={openRegister}
            className={`hidden whitespace-nowrap rounded-xl px-2 py-2 text-[13px] font-semibold [letter-spacing:0] transition-colors md:inline-flex ${
              heroHeader
                ? "text-white/90 hover:text-white"
                : "text-primary hover:text-primary-deep"
            }`}
          >
            {t("cta.register")}
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
              heroHeader
                ? "text-white hover:text-primary-glow"
                : "text-foreground hover:text-primary"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`overflow-hidden transition-[max-height] duration-500 ${open ? "max-h-[80vh]" : "max-h-0"}`}>
        <div className="container-x pb-6 pt-2">
          <nav aria-label="Mobile" className="glass grid gap-1 p-2">
            {NAV.map((item) => (
              <Link
                key={item.key}
                to={`${item.to}${item.hash}`}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-foreground/80 transition hover:bg-muted hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={openLogin} className="btn-ghost-gold">{t("cta.login")}</button>
            <button onClick={openRegister} className="btn-gold">{t("cta.register")}</button>
          </div>
        </div>
      </div>
    </header>
  );
}

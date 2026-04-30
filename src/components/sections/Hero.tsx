import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  Compass,
  Landmark,
} from "lucide-react";
import { useUI } from "../ui-state";

const heroVideo = "/videos/batumi-hero.mp4";

const accessRoutes = [
  {
    icon: Landmark,
    title: "AIXCO Bond",
    detail: "from EUR 1,000",
  },
  {
    icon: Building2,
    title: "Dubai Funds",
    detail: "12-15% target IRR",
  },
  {
    icon: CircleDollarSign,
    title: "Batumi Residences",
    detail: "8-10% net yield",
  },
];

export function Hero() {
  const { openRegister } = useUI();

  return (
    <section data-hero-section className="relative isolate overflow-hidden bg-foreground text-white [letter-spacing:0]">
      <div className="absolute inset-0" aria-hidden="true">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--foreground)/0.52)_0%,hsl(var(--foreground)/0.22)_38%,hsl(var(--foreground)/0.76)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--foreground)/0.66)_0%,transparent_34%,transparent_68%,hsl(var(--foreground)/0.58)_100%)]" />
      </div>

      <div className="relative container-x flex min-h-[92svh] flex-col pb-6 pt-24 md:pb-8 md:pt-28">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center py-14 text-center md:py-20">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white/90">
            <span>AIXCO Global</span>
            <span className="h-1 w-1 rounded-full bg-primary-glow" />
            <span>Vienna / Dubai / Batumi</span>
          </div>

          <h1 className="mt-6 max-w-6xl font-display text-5xl font-semibold leading-[0.95] text-white drop-shadow-[0_18px_42px_rgba(0,0,0,0.38)] [letter-spacing:0] md:text-7xl xl:text-8xl">
            Batumi real estate access, structured for global investors.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
            Managed Black Sea residences and selected development participation, built around
            transparent entry points, rental income potential, and long-term coastal growth.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={openRegister} className="btn-gold group !px-5 !py-3 [letter-spacing:0]">
              Register
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a href="#batumi" className="btn-ghost-gold group border-white/30 bg-white/10 !px-5 !py-3 text-white hover:border-white/60 hover:bg-white/20 [letter-spacing:0]">
              <Compass className="h-4 w-4" />
              View Batumi
            </a>
          </div>

          <div className="mt-9 grid w-full max-w-4xl gap-8 text-left sm:grid-cols-3">
            {accessRoutes.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-white">{title}</span>
                  <span className="mt-1 block text-sm text-white/70">{detail}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

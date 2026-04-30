import { useState } from "react";
import { team } from "@/data/site";
import { useUI } from "../ui-state";
import benjamin from "@/assets/team-benjamin.jpg";
import owais from "@/assets/team-owais.jpg";
import walter from "@/assets/team-walter.jpg";

const imageMap: Record<string, string> = {
  "team-benjamin": benjamin,
  "team-owais": owais,
  "team-walter": walter,
};

export function Team() {
  const { openTeam } = useUI();
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <section id="team" className="relative py-28 md:py-36 scroll-mt-24 bg-surface/40">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <p className="eyebrow">Team</p>
            <h2 className="heading-section mt-5">The people behind <span className="text-gold italic">AIXCO</span>.</h2>
          </div>
          <p className="text-foreground/80 leading-relaxed max-w-md">
            A small senior team with deep European real-estate finance experience, supported by 85+ specialists across Vienna, Dubai and Batumi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((m) => (
            <button
              key={m.name}
              onClick={() => openTeam(m)}
              onPointerEnter={() => setHoveredMember(m.name)}
              onPointerMove={() => setHoveredMember(m.name)}
              onPointerLeave={() => setHoveredMember((current) => current === m.name ? null : current)}
              onMouseEnter={() => setHoveredMember(m.name)}
              onMouseLeave={() => setHoveredMember((current) => current === m.name ? null : current)}
              onFocus={() => setHoveredMember(m.name)}
              onBlur={() => setHoveredMember((current) => current === m.name ? null : current)}
              className="group text-left rounded-3xl border border-border/60 overflow-hidden shadow-soft transition hover:border-primary/60"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={imageMap[m.image]}
                  alt={m.name}
                  loading="lazy"
                  width={832}
                  height={1024}
                  className={`media-hover h-full w-full object-cover grayscale group-hover:grayscale-0 ${hoveredMember === m.name ? "is-hovered grayscale-0" : ""}`}
                />
              </div>
              <div className="p-6">
                <p className="font-display text-2xl">{m.name}</p>
                <p className="text-sm text-primary mt-1">{m.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

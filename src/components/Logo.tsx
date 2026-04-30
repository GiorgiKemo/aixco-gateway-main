import { Link } from "react-router-dom";
import logoDark from "@/assets/aixco-global-logo-dark.png";
import logoWhite from "@/assets/aixco-global-logo-white.png";

export function Logo({ className = "", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link to="/" aria-label="AIXCO Global home" className={`inline-flex items-center ${className}`}>
      <img
        src={inverse ? logoWhite : logoDark}
        alt="AIXCO Global"
        className="h-7 w-auto max-w-[142px] object-contain md:h-8 md:max-w-[156px] xl:h-9 xl:max-w-[176px]"
      />
    </Link>
  );
}

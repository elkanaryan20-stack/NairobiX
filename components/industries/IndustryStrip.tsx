import Image from "next/image";
import Link from "next/link";
import { INDUSTRY_CONTEXTS } from "@/lib/industry-contexts";

const LABEL = "font-mono text-[10px] uppercase tracking-[0.2em]";
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The nine industry contexts as a strip of photographs — shared by
 * /industries (its hero) and the homepage, so both show the same cards at
 * the same size. Each card links to that industry's section on /industries:
 * pass `linkBase="/industries"` from any other page.
 */
export function IndustryStrip({ linkBase = "", className = "" }: { linkBase?: string; className?: string }) {
  return (
    <ul className={`grid grid-cols-3 gap-1.5 sm:grid-cols-9 ${className}`}>
      {INDUSTRY_CONTEXTS.map((industry, i) => (
        <li key={industry.slug}>
          <Link
            href={`${linkBase}#${industry.slug}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-[3px] bg-white/[0.03] sm:aspect-[2/5] lg:aspect-[3/5]"
          >
            <Image
              src={industry.image}
              alt=""
              fill
              sizes="(min-width: 640px) 11vw, 33vw"
              className="object-cover grayscale-[60%] transition duration-500 group-hover:grayscale-0 group-focus-visible:grayscale-0"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
            <span className="absolute inset-x-2.5 bottom-2.5">
              <span className={`${LABEL} block text-[var(--color-primary)]`}>{pad(i + 1)}</span>
              <span className="mt-1 block text-[12px] font-medium leading-4 text-white">{industry.name}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

import Image from "next/image";
import { TECHNOLOGY_PREVIEW, TECH_ROLES } from "@/lib/site-data";

const MONO = "font-mono text-[10px] uppercase tracking-[0.2em]";

// Real products get their official logo; capabilities that aren't a single
// product ("Workflow automation", "KPI dashboards") get a neutral system mark
// rather than an invented logo.
const LOGO_FOR: [RegExp, string][] = [
  [/^Google/, "google"],
  [/^Meta/, "meta"],
  [/^Zoho/, "zoho"],
  [/^WhatsApp/, "whatsapp"],
  [/Claude/, "anthropic"],
  [/Next\.js/, "nextjs"],
  [/Shopify/, "shopify"],
  [/HubSpot/, "hubspot"],
  [/WordPress/, "wordpress"],
];

const LOGOS = Object.fromEntries(
  TECHNOLOGY_PREVIEW.map((t) => [t.logo.split("/").pop()!.replace(".svg", ""), { src: t.logo, ratio: t.ratio }]),
);

function logoFor(name: string) {
  const match = LOGO_FOR.find(([re]) => re.test(name));
  return match ? LOGOS[match[1]] : undefined;
}

/**
 * A solution's or industry's technology as the system layer it belongs to:
 * each tool with its role. Shown as typical choices, not a fixed stack.
 */
export function TechnologyStack({ technology, note }: { technology: string[]; note?: string }) {
  return (
    <div>
      <ul className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {technology.map((tech) => {
          const logo = logoFor(tech);
          return (
            <li key={tech} className="flex items-center gap-4 border-b border-r border-white/10 p-5">
              <span className="flex h-10 w-12 shrink-0 items-center justify-center">
                {logo ? (
                  <Image
                    src={logo.src}
                    alt=""
                    width={Math.round(22 * logo.ratio)}
                    height={22}
                    unoptimized
                    style={{ width: Math.min(Math.round(22 * logo.ratio), 48), height: "auto" }}
                    className="object-contain"
                  />
                ) : (
                  <span aria-hidden="true" className="relative h-3.5 w-3.5 rounded-full border border-white/40">
                    <span className="absolute inset-[3px] rounded-full bg-white/40" />
                  </span>
                )}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-medium text-white">{tech}</span>
                <span className={`${MONO} mt-1 block text-[var(--color-primary)]/90`}>{TECH_ROLES[tech] ?? "System component"}</span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-sm leading-6 text-white/50">
        {note ?? "Typical technology for this capability. The final stack follows your requirements and what you already use."}
      </p>
    </div>
  );
}

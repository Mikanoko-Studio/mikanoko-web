import { site } from "@/lib/site";
import { Mikan } from "./Mikan";

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mikan size={compact ? 30 : 40} interactive={!compact} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-black tracking-tight ${
            compact ? "text-[1.05rem]" : "text-xl"
          }`}
        >
          {site.name}
        </span>
        {!compact && (
          <span className="label mt-1 text-sumi-soft">{site.nameJa}</span>
        )}
      </span>
    </span>
  );
}

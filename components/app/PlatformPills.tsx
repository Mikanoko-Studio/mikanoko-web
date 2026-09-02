import { platformLabel } from "@/lib/apps";
import type { Platform } from "@/types/app";

export function PlatformPills({ platforms }: { platforms: Platform[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {platforms.map((platform) => (
        <li key={platform} className="stamp text-sumi-soft">
          {platformLabel[platform]}
        </li>
      ))}
    </ul>
  );
}

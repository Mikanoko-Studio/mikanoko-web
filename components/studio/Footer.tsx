import Link from "next/link";
import { site } from "@/lib/site";
import { SleepingCat } from "./Doodles";

const legalLinks = [
  { href: "/privacy", label: "privacy" },
  { href: "/contact", label: "contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-sumi/10 py-10">
      <div className="wrap flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <ul className="label flex gap-5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-mikan">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="label mt-4 text-sumi-soft">
            © {site.foundedYear}–{new Date().getFullYear()} {site.legalEntity}
          </p>
        </div>

        <div className="flex items-end gap-3 text-sumi-soft">
          <span className="label">まだ起きてる</span>
          <SleepingCat size={54} />
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { nav } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  return (
    <header className="border-b-2 border-sumi/10">
      <div className="wrap flex items-center justify-between gap-4 py-4 sm:py-5">
        <Link href="/" className="rounded-sm">
          <Wordmark />
        </Link>
        <nav aria-label="Studio">
          <ul className="label flex items-center gap-4 sm:gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block transition-transform duration-150 hover:-rotate-3 hover:text-mikan"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

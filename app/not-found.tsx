import Link from "next/link";
import { SleepingCat } from "@/components/studio/Doodles";
import { apps } from "@/content/apps";

export default function NotFound() {
  return (
    <div className="wrap py-16 sm:py-24">
      <p className="label text-mikan">404 / みつからない</p>
      <h1 className="mt-3 font-display text-3xl font-black sm:text-5xl">
        the cat has taken this page
      </h1>
      <p className="mt-4 max-w-md text-sumi-soft">
        We asked. It will not say where. Here is everywhere else you could be
        going instead.
      </p>

      <div className="mt-8 rotate-[-4deg]">
        <SleepingCat size={90} />
      </div>

      <ul className="label mt-10 space-y-2">
        <li>
          <Link href="/" className="hover:text-mikan">
            the studio →
          </Link>
        </li>
        {apps.map((app) => (
          <li key={app.slug}>
            <Link href={`/apps/${app.slug}`} className="hover:text-mikan">
              {app.name} →
            </Link>
          </li>
        ))}
        <li>
          <Link href="/contact" className="hover:text-mikan">
            tell someone about this →
          </Link>
        </li>
      </ul>
    </div>
  );
}

import Link from "next/link";
import { AppCard } from "@/components/app/AppCard";
import { Band } from "@/components/studio/Band";
import { Frog, Onigiri, Plant, Star, Steam } from "@/components/studio/Doodles";
import { Mikan } from "@/components/studio/Mikan";
import { CopyEmail } from "@/components/play/CopyEmail";
import { apps } from "@/content/apps";
import { site } from "@/lib/site";

const inventory = [
  ["people", "2"],
  ["plants", "1, unnamed"],
  ["apps shipped", String(apps.filter((app) => app.status === "live").length)],
  ["unfinished ideas", "400-ish"],
  ["opinions about tabs", "1 each, incompatible"],
];

export default function HomePage() {
  return (
    <>
      {/* --- identity ---------------------------------------------------- */}
      <section className="wrap relative pt-12 pb-2 sm:pt-20">
        <p className="label flex flex-wrap items-center gap-3 text-mikan">
          {site.nameJa}
          <span className="stamp text-sumi-soft">est. {site.foundedYear}</span>
        </p>

        <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-black leading-[1.05] tracking-tight sm:text-6xl">
          {site.name}
        </h1>

        <p className="mt-5 max-w-xl font-display text-xl leading-snug sm:text-2xl">
          {site.tagline}
        </p>

        <p className="mt-5 max-w-md text-sumi-soft">
          Independent, very small, based nowhere impressive. We build the thing
          we wanted to exist and then put it in a shop.
        </p>

        {/* decorative — the hero's one moving thing */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-14 hidden sm:block lg:right-10"
        >
          <div className="anim-bob">
            <Mikan size={92} interactive={false} />
          </div>
          <p className="label mt-3 rotate-[-6deg] text-sumi-soft">みかん</p>
        </div>
      </section>

      {/* --- apps -------------------------------------------------------- */}
      <Band id="apps" no="01" name="apps" margin={<Steam size={34} />}>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          things we made
        </h2>
        <p className="mt-2 max-w-md text-sumi-soft">
          Each one has its own page, its own support inbox and its own privacy
          policy. None of them share an account system, because none of them
          have one.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}

          {/* An honest empty shelf beats padding the grid. */}
          <li className="flex min-h-[13rem] flex-col items-center justify-center gap-3 border-[2.5px] border-dashed border-sumi/30 p-5 text-center">
            <Onigiri size={38} />
            <p className="label text-sumi-soft">this slot is reserved</p>
            <p className="max-w-[16rem] text-sm text-sumi-soft">
              for whatever we get obsessed with next
            </p>
          </li>
        </ul>
      </Band>

      {/* --- who --------------------------------------------------------- */}
      <Band id="who" no="02" name="who" margin={<Plant size={38} />}>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          who is doing this
        </h2>

        <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-xl space-y-4">
            <p>
              Mikanoko Studio is two people who kept making small things at
              night and eventually gave the habit a name. We are not trying to
              grow. We are not raising anything. There is no roadmap, there is a
              list, and the list is on a fridge.
            </p>
            <p>
              We make apps that do one thing, that you buy once, that do not
              phone home, and that we would still be happy to have on our own
              phones in five years. That is the whole standard.
            </p>
          </div>

          <dl className="min-w-[15rem] self-start border-[2.5px] border-sumi bg-kami-deep p-5">
            <p className="label mb-3 text-mikan">in the studio right now</p>
            {inventory.map(([key, value]) => (
              <div
                key={key}
                className="label flex items-baseline justify-between gap-4 border-b border-dashed border-sumi/25 py-1.5 last:border-0"
              >
                <dt className="text-sumi-soft">{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      {/* --- hello ------------------------------------------------------- */}
      <Band id="hello" no="03" name="hello" margin={<Frog size={42} />}>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">say hi</h2>
        <p className="mt-2 max-w-md text-sumi-soft">
          Bugs, ideas, complaints, photographs of your kettle. All of it goes to
          the same place and a person reads it.
        </p>

        <p className="mt-6 flex flex-wrap items-center gap-3 font-display text-xl">
          <a
            href={`mailto:${site.email}`}
            className="border-b-[3px] border-mikan hover:bg-momo"
          >
            {site.email}
          </a>
          <CopyEmail email={site.email} />
        </p>

        <p className="label mt-8 flex items-center gap-2 text-sumi-soft">
          <Star size={16} />
          <Link href="/contact" className="hover:text-mikan">
            the rest of the contact details
          </Link>
        </p>
      </Band>
    </>
  );
}

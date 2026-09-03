import type { Metadata } from "next";
import { CopySignature } from "@/components/play/CopySignature";
import { SignatureBlock } from "@/components/studio/SignatureBlock";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Email signature",
  description: `The ${site.name} email signature.`,
  // An internal tool, not something to turn up in search.
  robots: { index: false, follow: false },
};

export default function SignaturePage() {
  return (
    <div className="wrap py-12 sm:py-16">
      <p className="label text-mikan">studio tools</p>
      <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">
        email signature
      </h1>
      <p className="mt-3 max-w-lg text-sumi-soft">
        Copy it, paste it into Gmail. Same for everyone on the domain.
      </p>

      <div className="mt-10 max-w-xl">
        <CopySignature>
          <SignatureBlock />
        </CopySignature>
      </div>

      <section className="prose-ink mt-14">
        <h2>Putting it in Gmail</h2>
        <ol className="mb-4 list-decimal pl-5">
          <li>Press the button above.</li>
          <li>
            Gmail → Settings → See all settings → General → Signature → Create
            new.
          </li>
          <li>Paste, then Save changes at the bottom of the page.</li>
        </ol>

        <h2>Adding the logo by URL instead</h2>
        <p>
          If you are inserting the image on its own through Gmail&apos;s{" "}
          <strong>Add an image → Web Address (URL)</strong>, use this one:
        </p>
        <p>
          <code>{`${site.url}/studio/signature/mikanoko-signature.png`}</code>
        </p>
        <p>
          It is exactly 330×75, the size it should appear at. Gmail renders a
          URL-inserted image at its natural size and gives you no handle to
          resize it, so this file is sized for that. Do not use the{" "}
          <code>@2x</code> file there — it will come in at double size.
        </p>

        <h2>If the logo is a broken image</h2>
        <p>
          The logo loads from{" "}
          <code>/studio/signature/mikanoko-signature.png</code> on this site, so
          it only works once that file is deployed. If it breaks, delete the
          image in the Gmail editor and use Gmail&apos;s own{" "}
          <strong>Insert image → Upload</strong> instead — Google will host it
          and the signature stops depending on this site at all.
        </p>

        <h2>Why it looks like 2004 under the hood</h2>
        <p>
          Gmail strips <code>&lt;style&gt;</code> blocks, CSS classes, web fonts
          and SVG. So the signature is a table with inline styles, and the
          wordmark is baked into the PNG — that is the only way to keep Zen Maru
          Gothic in an email client. The logo sits on a cream card rather than a
          transparent background so it survives dark mode.
        </p>
      </section>
    </div>
  );
}

import type { ReactNode } from "react";

type BandProps = {
  id?: string;
  /** The marker printed in the margin. Not a step in a sequence — a shelf tag. */
  no: string;
  name: string;
  /** Whatever junk belongs in the margin for this section. */
  margin?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * One horizontal section: a margin rail on the left, a quiet readable column
 * on the right. The rail is where the site is allowed to be strange.
 */
export function Band({ id, no, name, margin, children, className = "" }: BandProps) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`}>
      <div className="wrap band-grid">
        <div className="rail">
          <span className="rail-no">{no}</span>
          <span className="rail-name">{name}</span>
          {margin ? <span className="hidden lg:block">{margin}</span> : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

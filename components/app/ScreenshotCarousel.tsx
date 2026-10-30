"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Screenshot } from "@/types/app";

type ScreenshotCarouselProps = {
  shots: Screenshot[];
  /** The app's spot colour, for the Pro stamp and the progress fill. */
  accent: string;
  /** Seconds each slide stays before the next. */
  interval?: number;
};

/**
 * The app's screens, one card at a time, each with its line from the store listing.
 *
 * Swipe or scroll it like any row (it is a native scroll-snap row underneath), or use the arrows
 * and dots. It plays on its own, and the progress fill in the current dot *is* the timer: when it
 * fills, the next card comes up, so the dot and the card can never disagree. It stops for good
 * the moment someone takes over — a swipe, an arrow, a dot — and never starts for anyone who
 * prefers reduced motion.
 */
export function ScreenshotCarousel({
  shots,
  accent,
  interval = 5,
}: ScreenshotCarouselProps) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false); // hovered or focused: wait, but don't give up
  const motionOk = useMotionOk();

  const goTo = useCallback(
    (index: number) => {
      const list = track.current;
      const slide = list?.children[index] as HTMLElement | undefined;
      if (!list || !slide) return;
      // Centred on a phone, held to the column's edge on a wide screen: whatever the CSS snaps
      // to, so a click and a swipe always land in the same place.
      const start = getComputedStyle(slide).scrollSnapAlign === "start";
      list.scrollTo({
        left: start
          ? slide.offsetLeft - parseFloat(getComputedStyle(list).paddingLeft)
          : slide.offsetLeft - (list.clientWidth - slide.clientWidth) / 2,
        behavior: motionOk ? "smooth" : "auto",
      });
      setActive(index);
    },
    [motionOk],
  );

  // Whichever card is nearest the middle is the current one, however it got there.
  useEffect(() => {
    const list = track.current;
    if (!list) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const first = list.children[0] as HTMLElement | undefined;
        const start = first && getComputedStyle(first).scrollSnapAlign === "start";
        const anchor = start
          ? list.scrollLeft + parseFloat(getComputedStyle(list).paddingLeft)
          : list.scrollLeft + list.clientWidth / 2;
        let nearest = 0;
        let best = Infinity;
        Array.from(list.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const point = start ? el.offsetLeft : el.offsetLeft + el.clientWidth / 2;
          const distance = Math.abs(point - anchor);
          if (distance < best) {
            best = distance;
            nearest = i;
          }
        });
        setActive(nearest);
      });
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      list.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const takeOver = (index: number) => {
    setPlaying(false);
    goTo(index);
  };

  const running = playing && !held && motionOk;
  const count = shots.length;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Screenshots"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <ul
        ref={track}
        // A phone centres one card with its neighbours peeking in; a wide screen lines the row up
        // with the page column (.wrap: 68rem, 2rem gutters) and shows several at once.
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 px-[calc(50%-9.5rem)] lg:scroll-px-[max(2rem,calc(50%-32rem))] lg:px-[max(2rem,calc(50%-32rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onPointerDown={() => setPlaying(false)}
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) setPlaying(false);
        }}
      >
        {shots.map((shot, i) => (
          <li
            key={shot.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="w-[19rem] shrink-0 snap-center lg:snap-start"
          >
            <figure
              className={`border-[2.5px] border-sumi bg-kami-deep p-4 transition-opacity duration-300 ${
                i === active ? "opacity-100" : "opacity-60"
              }`}
            >
              <div className="relative">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1290}
                  height={2796}
                  sizes="17rem"
                  loading={i < 2 ? "eager" : "lazy"}
                  className="h-auto w-full rounded-[1.75rem] border-[2.5px] border-sumi"
                />
                {shot.pro && (
                  <span
                    className="stamp absolute -top-2 -right-2 bg-kami"
                    style={{ color: accent }}
                  >
                    pro
                  </span>
                )}
              </div>
              {shot.caption && (
                <figcaption className="mt-4 text-center font-display text-lg font-black leading-snug">
                  {shot.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-3">
        <ArrowButton
          label="Previous screenshot"
          onClick={() => takeOver((active - 1 + count) % count)}
        >
          ‹
        </ArrowButton>

        <ol className="flex items-center gap-2" aria-label="Choose a screenshot">
          {shots.map((shot, i) => (
            <li key={shot.src}>
              <button
                type="button"
                aria-label={`Screenshot ${i + 1}: ${shot.caption ?? shot.alt}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => takeOver(i)}
                className={`relative block h-2.5 overflow-hidden rounded-full border-[1.5px] border-sumi transition-[width] duration-300 ${
                  i === active ? "w-10" : "w-2.5 bg-kami-deep hover:bg-momo"
                }`}
              >
                {i === active && (
                  <span
                    // Re-mounted per slide, so the fill restarts from empty each time.
                    key={`${active}-${running}`}
                    className="absolute inset-y-0 left-0 w-full origin-left"
                    style={{
                      backgroundColor: accent,
                      transform: running ? undefined : "scaleX(1)",
                      animation: running ? `carousel-fill ${interval}s linear forwards` : "none",
                    }}
                    onAnimationEnd={() => goTo((active + 1) % count)}
                  />
                )}
              </button>
            </li>
          ))}
        </ol>

        <ArrowButton
          label="Next screenshot"
          onClick={() => takeOver((active + 1) % count)}
        >
          ›
        </ArrowButton>

        {motionOk && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="label ml-2 border-[2px] border-sumi px-3 py-1.5 hover:bg-kami-deep"
          >
            {playing ? "pause" : "play"}
          </button>
        )}
      </div>
    </section>
  );
}

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Whether movement is welcome. The server says no, so nothing plays until the browser has said
 * yes — guessing "on" would autoplay for someone who asked their device not to.
 */
function useMotionOk(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => !window.matchMedia(REDUCED).matches,
    () => false,
  );
}

function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-9 place-items-center border-[2px] border-sumi font-display text-xl leading-none hover:bg-kami-deep"
    >
      {children}
    </button>
  );
}

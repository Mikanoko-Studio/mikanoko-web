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

/** A 6.7" iPhone screenshot, the size most store shots are taken at. */
const PHONE: [number, number] = [1290, 2796];

/**
 * The app's screens as big cards, one at a time, the way a product page shows off a device:
 * the store listing's line as a headline on top, the phone rising out of the card below it, and
 * the iPad beside it when the slide has one and there's room. The next card peeks in at the edge.
 *
 * Underneath it is a native scroll-snap row, so it swipes and scrolls like any row, and the left
 * and right keys move it. It plays on its own: the current dot stretches into a bar that fills,
 * and when it's full the next card comes up, so the dot and the card can never disagree. It
 * plays from the start and keeps playing under the mouse; it stops for good the moment someone
 * takes over (a swipe, a dot, a key) or presses pause, waits while a keyboard user is inside it,
 * and never starts for anyone who prefers reduced motion.
 */
export function ScreenshotCarousel({
  shots,
  accent,
  interval = 5,
}: ScreenshotCarouselProps) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  // A keyboard user tabbed into it: wait while they read, but don't give up. A mouse resting on
  // it doesn't count, so it keeps moving under the cursor as a product page does.
  const [held, setHeld] = useState(false);
  const motionOk = useMotionOk();

  const goTo = useCallback(
    (index: number) => {
      const list = track.current;
      const slide = list?.children[index] as HTMLElement | undefined;
      if (!list || !slide) return;
      list.scrollTo({
        left: slide.offsetLeft - (list.clientWidth - slide.clientWidth) / 2,
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
        const middle = list.scrollLeft + list.clientWidth / 2;
        let nearest = 0;
        let best = Infinity;
        Array.from(list.children).forEach((child, i) => {
          const el = child as HTMLElement;
          const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - middle);
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

  const count = shots.length;
  const takeOver = (index: number) => {
    setPlaying(false);
    goTo((index + count) % count);
  };
  const running = playing && !held && motionOk;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Screenshots"
      onFocus={(e) => setHeld(e.target.matches(":focus-visible"))}
      onBlur={() => setHeld(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") takeOver(active + 1);
        if (e.key === "ArrowLeft") takeOver(active - 1);
      }}
    >
      <ul
        ref={track}
        // One card centred, about the column's width, with the next one peeking in.
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc(50%-30rem))] pb-3 sm:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            className="w-[min(60rem,calc(100vw-2.5rem))] shrink-0 snap-center"
          >
            {/* The house tile: plum outline, heavier along the bottom edge. */}
            <figure
              className={`flex h-full flex-col items-center overflow-hidden rounded-[2rem] border-[2.5px] border-b-[6px] border-sumi bg-kami-deep px-5 pt-8 transition-[opacity,transform] duration-500 sm:px-10 sm:pt-12 ${
                i === active ? "opacity-100" : "scale-[0.97] opacity-50"
              }`}
            >
              {/* Like the store images: the paid-tier stamp sits above the line it qualifies. */}
              {shot.pro && (
                <span className="stamp mb-3 bg-kami" style={{ color: accent }}>
                  pro
                </span>
              )}
              {shot.caption && (
                <figcaption className="max-w-xl text-center font-display text-2xl font-black leading-tight text-balance sm:text-4xl">
                  {shot.caption}
                </figcaption>
              )}
              <div className="mt-6 flex flex-1 items-end justify-center gap-8 sm:mt-10">
                <Phone shot={shot} eager={i < 2} />
                {shot.tablet && (
                  <Image
                    src={shot.tablet.src}
                    alt={shot.tablet.alt}
                    width={shot.tablet.size[0]}
                    height={shot.tablet.size[1]}
                    sizes="26rem"
                    loading="lazy"
                    // Only beside the phone where there's room for both.
                    className="hidden h-[26rem] w-auto rounded-t-[1.25rem] border-[2.5px] border-b-0 border-sumi lg:block"
                  />
                )}
              </div>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-3">
        <ol
          className="flex items-center gap-2.5 rounded-full border-[2px] border-sumi bg-kami-deep px-4 py-3"
          aria-label="Choose a screenshot"
        >
          {shots.map((shot, i) => (
            <li key={shot.src} className="flex">
              <button
                type="button"
                aria-label={`Screenshot ${i + 1}: ${shot.caption ?? shot.alt}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => takeOver(i)}
                className={`relative block h-2.5 overflow-hidden rounded-full transition-[width,background-color] duration-300 ${
                  i === active ? "w-10 bg-sumi-soft/30" : "w-2.5 bg-sumi-soft/60 hover:bg-sumi"
                }`}
              >
                {i === active && (
                  <span
                    // Re-mounted per slide, so the fill restarts from empty each time.
                    key={`${active}-${running}`}
                    className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
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

        {motionOk && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="grid size-11 place-items-center rounded-full border-[2px] border-sumi bg-kami-deep hover:bg-kami"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        )}
      </div>
    </section>
  );
}

/** The phone screenshot, cut off at the card's bottom edge like a device rising out of it. */
function Phone({ shot, eager }: { shot: Screenshot; eager: boolean }) {
  const [width, height] = shot.size ?? PHONE;
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={width}
      height={height}
      sizes="14rem"
      loading={eager ? "eager" : "lazy"}
      className="h-[22rem] w-auto shrink-0 rounded-t-[2rem] border-[2.5px] border-b-0 border-sumi sm:h-[26rem]"
    />
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
      <rect x="1" y="1" width="4" height="14" rx="1.5" fill="currentColor" />
      <rect x="9" y="1" width="4" height="14" rx="1.5" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
      <path
        d="M2 1.8v12.4a1 1 0 0 0 1.5.86l10-6.2a1 1 0 0 0 0-1.72l-10-6.2A1 1 0 0 0 2 1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Whether movement is welcome. The server says no, so nothing plays until the browser has said
 * yes; guessing "on" would autoplay for someone who asked their device not to.
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

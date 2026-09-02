/**
 * Margin fauna. These live in the rail and have nothing to do with the section
 * they sit next to. That is the point — do not label them.
 */

type DoodleProps = { size?: number; className?: string };

export function SleepingCat({ size = 46, className = "" }: DoodleProps) {
  return (
    <svg width={size} height={size * 0.66} viewBox="0 0 60 40" aria-hidden="true" className={`ink ${className}`}>
      <path
        d="M8 32 q0 -12 12 -12 h18 q14 0 14 12 Z"
        fill="var(--color-mikan)"
        stroke="var(--color-sumi)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M18 20 l3 -6 l5 5" fill="var(--color-mikan)" stroke="var(--color-sumi)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M52 32 q8 -2 4 -9" fill="none" stroke="var(--color-sumi)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 27 h4 M32 27 h4" stroke="var(--color-sumi)" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 12 q3 -3 6 0 M44 6 q4 -2 6 2" fill="none" stroke="var(--color-sumi)" strokeWidth="1.8" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function Plant({ size = 40, className = "" }: DoodleProps) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52" aria-hidden="true" className={`ink ${className}`}>
      <path d="M20 34 V16" stroke="var(--color-sumi)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 24 q-11 -3 -12 -13 q11 1 12 13 Z" fill="var(--color-ha)" stroke="var(--color-sumi)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M20 20 q11 -4 13 -14 q-12 2 -13 14 Z" fill="var(--color-ha)" stroke="var(--color-sumi)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M11 34 h18 l-2.5 14 h-13 Z" fill="var(--color-kami-deep)" stroke="var(--color-sumi)" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export function Frog({ size = 44, className = "" }: DoodleProps) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 55 44" aria-hidden="true" className={`ink ${className}`}>
      <ellipse cx="27" cy="30" rx="20" ry="12" fill="var(--color-ha)" stroke="var(--color-sumi)" strokeWidth="2.5" />
      <circle cx="18" cy="16" r="7" fill="var(--color-ha)" stroke="var(--color-sumi)" strokeWidth="2.5" />
      <circle cx="36" cy="16" r="7" fill="var(--color-ha)" stroke="var(--color-sumi)" strokeWidth="2.5" />
      <circle cx="18" cy="17" r="2.4" fill="var(--color-sumi)" />
      <circle cx="36" cy="17" r="2.4" fill="var(--color-sumi)" />
      <path d="M20 32 q7 5 14 0" fill="none" stroke="var(--color-sumi)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Onigiri({ size = 34, className = "" }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className={`ink ${className}`}>
      <path d="M20 6 L36 32 H4 Z" fill="var(--color-kami)" stroke="var(--color-sumi)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M13 32 h14 v-8 h-14 Z" fill="var(--color-sumi)" />
    </svg>
  );
}

export function Star({ size = 22, className = "" }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={`ink ${className}`}>
      <path
        d="M12 2 L14.6 9.4 L22 12 L14.6 14.6 L12 22 L9.4 14.6 L2 12 L9.4 9.4 Z"
        fill="var(--color-momo)"
        stroke="var(--color-sumi)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Steam({ size = 30, className = "" }: DoodleProps) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 30 36" aria-hidden="true" className={`ink ${className}`}>
      <path
        d="M10 34 q-6 -8 0 -14 t0 -14 M20 34 q-6 -8 0 -14 t0 -14"
        fill="none"
        stroke="var(--color-sora)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

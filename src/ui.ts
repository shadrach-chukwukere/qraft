/**
 * Shared Tailwind class recipes for the marketing site.
 * Keeping them here avoids repeating long utility strings across pages.
 */

export const wrap =
  "mx-auto w-[min(1240px,calc(100%-64px))] max-[900px]:w-[calc(100%-40px)]";

export const buttonBase =
  "inline-flex min-h-[54px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-7 text-[15px] font-medium leading-none transition-colors duration-200 active:scale-[0.98]";

export const buttonPrimary = `${buttonBase} bg-navy text-white hover:bg-navy-deep`;

export const buttonOutline = `${buttonBase} border-[1.5px] border-line-strong bg-white text-ink hover:border-navy hover:text-navy`;

export const buttonLight = `${buttonBase} bg-white text-navy hover:bg-blue-soft`;

export const heading =
  "font-medium leading-[1.08] tracking-[-0.03em] text-ink";

export const h1 =
  `${heading} mb-[18px] text-[clamp(2.75rem,5.6vw,4.75rem)]`;

export const h2 =
  `${heading} mb-4 text-[clamp(2rem,4vw,3.25rem)]`;

export const h3 =
  `${heading} mb-2.5 text-[clamp(1.3rem,2.2vw,1.55rem)]`;

export const sectionKicker =
  "mb-3 text-[12.5px] font-medium uppercase tracking-[0.14em] text-blue";

export const textLink =
  "inline-flex items-center gap-1.5 text-[14.5px] font-medium text-blue hover:underline";

import Image from "next/image";

/*
 * Team photos banked along both edges of the hero.
 *
 * The rule here is that nothing gets cropped: every tile runs the full height of
 * the band and lets its width follow its own aspect ratio, so each photo is
 * shown whole. That is why the widths are uneven - a portrait shot is narrow, a
 * group shot is wide - and the unevenness is what stops the row reading as a row
 * of boxes. They butt straight up against each other with square corners, so the
 * bank reads as one continuous wall rather than separate framed pictures.
 *
 * They are texture, not a gallery: mix-blend-luminosity discards each photo's
 * own colour and takes the hero gradient's instead, and a mask fades each bank
 * out before it reaches the headline.
 *
 * No parallax here any more. Drift needs slack above and below to move into, and
 * full-height tiles have none - it would pull a hard edge into the band.
 *
 * Left at the default quality on purpose: at 42% opacity under a luminosity
 * blend and the veil, 75 is indistinguishable from 90 here and weighs less.
 *
 * Hidden below md, where the banks would collide with the headline.
 */
const LEFT = [
  { src: "/images/team-group.png", w: 636, h: 332, position: "50% 28%" },
  { src: "/images/team-chennai.png", w: 387, h: 499, position: "50% 26%" },
  { src: "/images/team-awards.png", w: 437, h: 314, position: "50% 30%" },
];

const RIGHT = [
  { src: "/images/team-outdoors.png", w: 437, h: 228, position: "50% 28%" },
  { src: "/images/team-selfie.png", w: 467, h: 294, position: "58% 22%" },
  { src: "/images/team-presentation.png", w: 475, h: 301, position: "42% 20%" },
];

/** Solid at the outer edge, gone before it reaches the headline. */
const maskFor = (side) => {
  const mask = `linear-gradient(${
    side === "left" ? "90deg" : "270deg"
  }, #000 0%, #000 40%, rgba(0,0,0,0.55) 74%, transparent 100%)`;

  return { WebkitMaskImage: mask, maskImage: mask };
};

function Bank({ tiles, side }) {
  const left = side === "left";

  return (
    <div
      style={maskFor(side)}
      className={`absolute ${left ? "left-0" : "right-0 flex-row-reverse"} top-0 flex h-full w-[48%] items-stretch overflow-hidden`}
    >
      {tiles.map((tile, i) => (
        <span
          key={tile.src}
          style={{ aspectRatio: `${tile.w} / ${tile.h}` }}
          className="h-full shrink-0 overflow-hidden"
        >
          <Image
            src={tile.src}
            alt=""
            width={tile.w}
            height={tile.h}
            sizes="420px"
            // The outermost tile of each bank is above the fold and one of them
            // is the LCP element, so it must not be lazy-loaded.
            priority={i === 0}
            style={{ objectPosition: tile.position }}
            className="h-full w-full object-cover"
          />
        </span>
      ))}
    </div>
  );
}

export default function HeroPhotoWall() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden opacity-[0.42] mix-blend-luminosity md:block"
    >
      <Bank tiles={LEFT} side="left" />
      <Bank tiles={RIGHT} side="right" />
    </div>
  );
}

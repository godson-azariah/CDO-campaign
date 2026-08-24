"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/*
 * A wall of photos that fills the hero completely — no gradient shows through.
 *
 * Each tile is sized as a percentage of the band and cropped with object-cover,
 * so between them they tile the whole area with a little overlap at every seam.
 * Sizes are deliberately lopsided: one tall panel down the middle, a couple of
 * broad ones, a few smaller fillers. Each photo is used exactly once.
 *
 * The container is inset negatively so it extends past the hero on every side.
 * That bleed is what lets the tiles drift on scroll without exposing an edge.
 */
const TILES = [
  {
    src: "/images/team-group.png",
    style: { left: "0%", top: "0%", width: "40%", height: "56%" },
    position: "50% 22%",
    depth: 0.05,
  },
  {
    src: "/images/team-chennai.png",
    style: { left: "0%", top: "53%", width: "23%", height: "47%" },
    // Portrait source in a landscape box: cover scales by width, so there is
    // plenty of vertical travel. The faces sit about a third down.
    position: "50% 30%",
    depth: 0.11,
  },
  {
    src: "/images/team-awards.png",
    // Widened to take the whole strip under the presentation tile, which frees
    // that tile to be short enough to have vertical travel of its own.
    style: { left: "21%", top: "53%", width: "45%", height: "47%" },
    position: "50% 28%",
    depth: 0.08,
  },
  {
    src: "/images/team-presentation.png",
    // At 56% height this box is wider than the photo's own ratio, so cover now
    // scales by width and leaves vertical slack. At full height it scaled by
    // height instead and no amount of object-position moved it.
    style: { left: "38%", top: "0%", width: "28%", height: "56%" },
    position: "38% top",
    depth: 0.14,
  },
  {
    src: "/images/team-selfie.png",
    // Pulled in from the right edge: the tile used to run past the viewport, so
    // the third person was cropped by the screen rather than by the crop.
    style: { left: "63%", top: "0%", width: "37%", height: "52%" },
    position: "62% 20%",
    depth: 0.06,
  },
  {
    src: "/images/team-outdoors.png",
    style: { left: "63%", top: "49%", width: "37%", height: "51%" },
    position: "50% 25%",
    depth: 0.12,
  },
];

export default function HeroPhotoWall() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // A CSS variable, not React state — scrolling must never re-render these.
      el.style.setProperty("--scroll", String(window.scrollY));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -inset-y-[14%]"
    >
      {TILES.map((tile) => (
        <span
          key={tile.src}
          style={{
            ...tile.style,
            transform: `translate3d(0, calc(var(--scroll, 0) * ${tile.depth}px), 0)`,
          }}
          className="absolute overflow-hidden"
        >
          <Image
            src={tile.src}
            alt=""
            fill
            quality={95}
            sizes="60vw"
            style={{ objectPosition: tile.position }}
            className="object-cover"
          />
        </span>
      ))}
    </div>
  );
}

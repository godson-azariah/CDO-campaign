const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
};

const Svg = ({ children, ...props }) => (
  <svg {...base} {...props}>
    {children}
  </svg>
);

export const UserIcon = (p) => (
  <Svg {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Svg>
);

export const MailIcon = (p) => (
  <Svg {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2.5 6.5 8.4 5.6a2 2 0 0 0 2.2 0l8.4-5.6" />
  </Svg>
);

export const PhoneIcon = (p) => (
  <Svg {...p}>
    <path d="M6.6 3h-2A1.6 1.6 0 0 0 3 4.7C3 13.1 10.9 21 19.3 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.6 1.6 0 0 0-1.3-1.6l-2.6-.5a1.6 1.6 0 0 0-1.6.7l-.7 1a12.4 12.4 0 0 1-5.3-5.3l1-.7a1.6 1.6 0 0 0 .7-1.6l-.5-2.6A1.6 1.6 0 0 0 6.6 3Z" />
  </Svg>
);

export const BuildingIcon = (p) => (
  <Svg {...p}>
    <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
    <path d="M15 9h3a2 2 0 0 1 2 2v10" />
    <path d="M2 21h20M8 7h3M8 11h3M8 15h3" />
  </Svg>
);

export const BriefcaseIcon = (p) => (
  <Svg {...p}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M2 13h20" />
  </Svg>
);

export const PinIcon = (p) => (
  <Svg {...p}>
    <path d="M20 10c0 5.2-8 12-8 12s-8-6.8-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
);

export const CityIcon = (p) => (
  <Svg {...p}>
    <path d="M3 21V9l6-4v16M9 21V11l6-3v13M15 21V12l6 2v7M2 21h20" />
  </Svg>
);

export const MapIcon = (p) => (
  <Svg {...p}>
    <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
    <path d="M9 3v15M15 6v15" />
  </Svg>
);

export const HashIcon = (p) => (
  <Svg {...p}>
    <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
  </Svg>
);

export const GlobeIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
  </Svg>
);

export const GiftIcon = (p) => (
  <Svg {...p}>
    <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8" />
    <rect x="2" y="7" width="20" height="5" rx="1" />
    <path d="M12 21V7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7ZM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z" />
  </Svg>
);

export const LockIcon = (p) => (
  <Svg {...p}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const CalendarIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Svg>
);

export const CheckIcon = (p) => (
  <Svg {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Svg>
);

export const ShieldIcon = (p) => (
  <Svg {...p}>
    <path d="M12 2.5 4 6v6c0 5 3.4 8.5 8 9.5 4.6-1 8-4.5 8-9.5V6l-8-3.5Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

export const MegaphoneIcon = (p) => (
  <Svg {...p}>
    <path d="M3 11v2a2 2 0 0 0 2 2h2l8 5V4L7 9H5a2 2 0 0 0-2 2Z" />
    <path d="M18 9a3.5 3.5 0 0 1 0 6" />
  </Svg>
);

export const SparkIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3v18M3 12h18" />
    <path d="M12 3c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9Z" />
  </Svg>
);

export const ArrowRightIcon = (p) => (
  <Svg {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Svg>
);

export const ChevronDownIcon = (p) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const AwardIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="6" />
    <path d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7" />
  </Svg>
);

export const BookIcon = (p) => (
  <Svg {...p}>
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5V4.5Z" />
    <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
  </Svg>
);

export const AlertIcon = (p) => (
  <Svg {...p} strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5M12 16.2v.1" />
  </Svg>
);

export const ClockIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </Svg>
);

/*
 * ── Parked icons ───────────────────────────────────────────────────────────
 * Lifted out of WhyBookThisCall when that panel was stripped back. The three
 * point icons are in use there again; ConversationIcon is not, and is kept on
 * purpose so it can go straight back in if wanted - do not delete it as unused.
 */

/** Was the masthead badge: a speech bubble with three dots. */
export const ConversationIcon = (p) => (
  <Svg {...p}>
    <path d="M20.5 11.8a8.2 8.2 0 0 1-11.6 7.4L3.5 20.5l1.4-5.3a8.2 8.2 0 1 1 15.6-3.4Z" />
    <circle cx="8.6" cy="11.8" r="1" fill="currentColor" stroke="none" />
    <circle cx="12.2" cy="11.8" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.8" cy="11.8" r="1" fill="currentColor" stroke="none" />
  </Svg>
);

/** Was point 1, "Understand Your Priorities": a person with a star. */
export const PriorityIcon = (p) => (
  <Svg {...p}>
    <circle cx="10" cy="8" r="3.6" />
    <path d="M3.5 20a6.5 6.5 0 0 1 11.4-4.2" />
    <path d="m18.5 13.5 1.1 2.3 2.4.35-1.75 1.7.4 2.45-2.15-1.15-2.15 1.15.4-2.45L15 16.15l2.4-.35Z" />
  </Svg>
);

/** Was point 2, "Explore New Possibilities": a target with an outward arrow. */
export const PossibilityIcon = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="13" r="8" />
    <circle cx="11" cy="13" r="4" />
    <path d="M11 13 21 3M16.5 3H21v4.5" />
  </Svg>
);

/** Was point 3, "Leave With Practical Ideas": a lightbulb. */
export const IdeaIcon = (p) => (
  <Svg {...p}>
    <path d="M15 14.5c.2-1.1.8-1.9 1.6-2.7A6 6 0 1 0 6 8c0 1.1.3 2.3 1.4 3.8.8.8 1.4 1.6 1.6 2.7" />
    <path d="M9.5 18h5M10.5 21.5h3" />
  </Svg>
);

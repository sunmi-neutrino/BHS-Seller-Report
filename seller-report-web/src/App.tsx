import { useState, useEffect, useRef } from "react";
import {
  IconBell,
  IconFolders,
  IconHome,
  IconSparkles,
  IconEye,
  IconSearch,
  IconChartBar,
  IconWorld,
  IconDeviceMobile,
  IconNews,
  IconDeviceLaptop,
  IconFiles,
  IconLock,
  IconTrendingUp,
  IconMenu2,
  IconX,
  IconPrinter,
  IconShare3,
  IconMail,
  IconPhone,
  IconArrowUpRight,
  IconBed,
  IconBath,
  IconRuler,
  IconCheck,
  IconMinus,
} from "@tabler/icons-react";
import slwShowcase from "./assets/slw-showcase.png";
import {
  WORLD_VIEWBOX,
  US_VIEWBOX,
  WORLD_LAND,
  WORLD_BORDERS,
  US_LAND,
  US_STATE_BORDERS,
  NY_VIEWBOX,
  NY_LAND,
  NY_COUNTY_BORDERS,
  WORLD_MARKERS,
  US_MARKERS,
  NY_MARKERS,
} from "./generated/maps";

// ─── Data ────────────────────────────────────────────────────────────────────

const property = {
  name: "79th Street Apartment",
  unit: "#20BCH",
  address: "79th Street",
  city: "Manhattan, NY 10060",
  mlsId: "133444",
  totalViews: "12,545",
  onlineSince: "September 22, 2025",
  lastUpdated: "12/02/2025 at 12:41pm",
  price: "$4,250,000",
  beds: 3,
  baths: 2.5,
  sqft: "2,100",
  description:
    "A refined pre-war residence on the Upper East Side, offering sweeping park views, herringbone oak floors, and bespoke millwork throughout. Delivered in impeccable condition with a coveted corner exposure.",
  heroImage:
    "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=1600&h=900&fit=crop&auto=format",
  agent: {
    name: "Mary L. Fitzgibbons",
    title: "Licensed Associate Real Estate Broker",
    phone: "917-685-6279",
    email: "mfitzgibbons@bhsusa.com",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&auto=format",
  },
};

const navSections = [
  { id: "property", label: "Property Info" },
  { id: "exposure", label: "Total Exposure" },
  { id: "email", label: "Email Campaigns" },
  { id: "views", label: "Traffic & Views" },
  { id: "location", label: "Location Insights" },
  { id: "marketing", label: "Marketing" },
  { id: "openhouse", label: "Open Houses" },
  { id: "slw", label: "SLW Showcase" },
];

const syndicatedSites = [
  { name: "Zillow", views: 4821, logo: "Z" },
  { name: "Realtor.com", views: 3204, logo: "R" },
  { name: "Trulia", views: 2189, logo: "T" },
  { name: "StreetEasy", views: 1892, logo: "SE" },
  { name: "Homes.com", views: 1456, logo: "H" },
  { name: "Compass", views: 1203, logo: "C" },
  { name: "Coldwell Banker", views: 987, logo: "CB" },
  { name: "Christie's RE", views: 876, logo: "CR" },
  { name: "Sotheby's Realty", views: 754, logo: "S" },
  { name: "Douglas Elliman", views: 632, logo: "DE" },
  { name: "Corcoran", views: 521, logo: "Co" },
  { name: "Brown Harris Stevens", views: 489, logo: "BHS" },
];

const emailMetrics = [
  { type: "Listing Alert Emails", Icon: IconBell, count: "18,402", description: "Times your listing appeared in buyer alert emails" },
  { type: "Portfolio Newsletters", Icon: IconFolders, count: "9,871", description: "Included in agent portfolio email campaigns" },
  { type: "Open House Announcements", Icon: IconHome, count: "5,344", description: "Featured in open house notification emails" },
  { type: "Just Listed Campaigns", Icon: IconSparkles, count: "12,650", description: "Distributed via Just Listed email blasts" },
];

const viewMetrics = [
  { type: "Property Page Views", count: "7,234", trend: "+12%", Icon: IconEye },
  { type: "Search Results Appearances", count: "38,102", trend: "+8%", Icon: IconSearch },
  { type: "Report Views", count: "1,847", trend: "+22%", Icon: IconChartBar },
  { type: "SLW Traffic", count: "4,921", trend: "+15%", Icon: IconWorld },
];

const worldLocations = [
  { country: "United States", pct: 62 },
  { country: "United Kingdom", pct: 8 },
  { country: "Canada", pct: 6 },
  { country: "Germany", pct: 4 },
  { country: "France", pct: 4 },
  { country: "Switzerland", pct: 3 },
  { country: "United Arab Emirates", pct: 3 },
  { country: "Hong Kong SAR", pct: 3 },
  { country: "Australia", pct: 2 },
  { country: "Brazil", pct: 2 },
];

const stateLocations = [
  { area: "Upper East Side", pct: 24 },
  { area: "Brooklyn Heights", pct: 13 },
  { area: "Westchester", pct: 11 },
  { area: "Long Island City", pct: 9 },
  { area: "The Hamptons", pct: 8 },
  { area: "Riverdale", pct: 7 },
  { area: "Hudson Valley", pct: 6 },
  { area: "Albany", pct: 5 },
  { area: "Rochester", pct: 4 },
  { area: "Buffalo", pct: 3 },
];

const domesticLocations = [
  { city: "New York, NY", pct: 42 },
  { city: "Los Angeles, CA", pct: 11 },
  { city: "Miami, FL", pct: 8 },
  { city: "Chicago, IL", pct: 7 },
  { city: "Boston, MA", pct: 6 },
  { city: "San Francisco, CA", pct: 5 },
  { city: "Washington, DC", pct: 4 },
  { city: "Houston, TX", pct: 3 },
  { city: "Seattle, WA", pct: 3 },
  { city: "Denver, CO", pct: 2 },
];

const marketingItems = [
  {
    category: "Social Media",
    Icon: IconDeviceMobile,
    accent: "var(--color-bhs-blue)",
    items: [
      { platform: "Instagram", type: "Reel + Carousel", date: "Jan 15, 2025", reach: "14,200" },
      { platform: "Facebook", type: "Sponsored Post", date: "Jan 12, 2025", reach: "8,900" },
      { platform: "LinkedIn", type: "Feature Story", date: "Jan 10, 2025", reach: "3,400" },
    ],
  },
  {
    category: "Print Advertising",
    Icon: IconNews,
    accent: "var(--color-bhs-maroon)",
    items: [
      { platform: "Wall Street Journal", type: "Full Page Ad", date: "Jan 20, 2025", reach: "2,100,000" },
      { platform: "New York Times", type: "Half Page Ad", date: "Feb 02, 2025", reach: "480,000" },
      { platform: "NY Observer", type: "Luxury Feature", date: "Feb 14, 2025", reach: "120,000" },
    ],
  },
  {
    category: "Digital Media",
    Icon: IconDeviceLaptop,
    accent: "var(--color-bhs-cappuccino)",
    items: [
      { platform: "BHSusa.com", type: "Featured Listing", date: "Sep 22, 2025", reach: "48,000" },
      { platform: "Google Ads", type: "Display Campaign", date: "Oct 01, 2025", reach: "220,000" },
      { platform: "Video Tour", type: "Cinematic Video", date: "Oct 10, 2025", reach: "9,800" },
    ],
  },
  {
    category: "Print Collateral",
    Icon: IconFiles,
    accent: "var(--color-bhs-green)",
    items: [
      { platform: "Postcard Mailer", type: "10,000 pieces", date: "Jan 18, 2025", reach: "10,000" },
      { platform: "Luxury Brochure", type: "500 copies", date: "Jan 22, 2025", reach: "500" },
      { platform: "Property Sheet", type: "Digital PDF", date: "Sep 22, 2025", reach: "1,200" },
    ],
  },
];

const openHouseSubmissions = [
  { name: "James & Sarah Thornton", email: "jthornton@email.com", phone: "(212) 555-0142", date: "Jan 19, 2025", time: "2:00 PM", preApproved: true, notes: "Looking for pied-à-terre. Very motivated." },
  { name: "Dr. Mark Osei", email: "mark.osei@gmail.com", phone: "(646) 555-0287", date: "Jan 19, 2025", time: "2:30 PM", preApproved: false, notes: "Relocating from London, needs by April." },
  { name: "Angela & David Kim", email: "akimdesign@me.com", phone: "(917) 555-0391", date: "Jan 19, 2025", time: "3:15 PM", preApproved: true, notes: "Saw the WSJ ad, second visit." },
  { name: "Robert Ashworth", email: "rashworth@capitalize.com", phone: "(212) 555-0064", date: "Feb 2, 2025", time: "1:00 PM", preApproved: true, notes: "Investment buyer, cash offer possible." },
  { name: "Priya Nair", email: "priya.nair@outlook.com", phone: "(929) 555-0178", date: "Feb 2, 2025", time: "1:45 PM", preApproved: false, notes: "First-time buyer with agent." },
  { name: "Elena & Carlos Mendez", email: "emendez@interiors.co", phone: "(718) 555-0502", date: "Feb 2, 2025", time: "2:30 PM", preApproved: true, notes: "Interior designer, evaluating renovation scope." },
];

// ─── Brand ────────────────────────────────────────────────────────────────────

/** BHS_LOGO_Stacked — Brand Logo, BHS R3 style guide */
function BhsLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 113.787"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Brown Harris Stevens"
    >
      <path d="M8.66808 87.3242C8.66808 85.2928 10.497 84.2562 12.7251 84.2562C15.3464 84.2562 17.8723 85.5906 18.9626 88.2655L25.6945 84.3574C23.0196 79.5081 18.0213 77.1311 13.1243 77.1311C6.93447 77.1311 1.04851 80.7472 1.04851 87.8723C1.04851 94.9974 6.98808 97.0766 11.9387 98.5659C15.6026 99.6562 19.0162 100.347 19.0162 102.969C19.0162 104.946 17.1336 106.037 14.7626 106.037C11.6409 106.037 8.67404 104.351 7.68511 100.591L0.0119149 103.213C1.34638 109.051 7.33957 113.406 14.0179 113.406C20.6962 113.406 27.0349 109.593 27.0349 102.218C27.0349 94.8425 20.2017 93.2102 14.9055 91.7268C11.4919 90.7855 8.66808 89.8979 8.66808 87.3183" />
      <path d="M18.617 52.6519V39.2357H26.7847V73.9855H18.617V60.4204H9.7583V73.9855H1.57872V39.2357H9.74638V52.6519H18.6051H18.617Z" />
      <path d="M15.2808 27.9047H9.74043V20.6783H15.2808C17.9557 20.6783 19.1889 22.4119 19.1889 24.1932C19.1889 25.9745 17.8545 27.9047 15.2808 27.9047ZM9.74043 13.8987V8.00681H14.2443C16.4247 8.00681 17.4613 9.49021 17.4613 10.9796C17.4613 12.4689 16.4247 13.8987 14.3455 13.8987H9.74043ZM21.9651 16.3711C24.3421 15.0843 25.8255 12.6596 25.8255 9.78808C25.8255 5.37957 22.4596 0.58383 15.0366 0.58383H1.57872V35.3336H15.4357C23.3532 35.3336 27.6128 29.6919 27.6128 24.5447C27.6128 21.0774 25.6826 17.8128 21.9711 16.377" />
    </svg>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────

type HeadlineSegment = { text: string; className?: string };

/**
 * Headline treatment: each word rises out of a clipping mask with a short
 * stagger. Renders inline, so the caller supplies the actual h1/h2 and its
 * type styles.
 *
 * The mask needs vertical slack for descenders — pb/-mb cancel out in layout
 * but stop the overflow-hidden box from shearing the tail off a "y" or "p".
 */
function AnimatedHeadline({ segments, threshold = 0.25 }: { segments: HeadlineSegment[]; threshold?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(threshold);

  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className }))
  );

  return (
    <span ref={ref} className="word-rise">
      {words.map(({ word, className }, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <span
              className={`inline-block ${className ?? ""}`}
              style={{
                transform: inView ? "translateY(0)" : "translateY(110%)",
                opacity: inView ? 1 : 0,
                transition:
                  `transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 55}ms,` +
                  ` opacity 700ms ease-out ${i * 55}ms`,
              }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

function Eyebrow({ children, tone = "cappuccino" }: { children: React.ReactNode; tone?: "cappuccino" | "cream" }) {
  return (
    <p
      className={`eyebrow text-[11px] md:text-xs mb-4 ${
        tone === "cream" ? "text-bhs-gray-400" : "text-bhs-cappuccino"
      }`}
    >
      {children}
    </p>
  );
}

/** Section Header — hairline rule above a tracked label, per style guide */
function SectionHeader({
  eyebrow,
  title,
  children,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div className="mb-12 md:mb-16">
      <div className={`h-px w-full ${tone === "dark" ? "bg-white/20" : "bg-bhs-gray-500"}`} />
      <div className="pt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <Eyebrow tone={tone === "dark" ? "cream" : "cappuccino"}>{eyebrow}</Eyebrow>
          <h2
            className={`font-display text-[2.25rem] md:text-[3.5rem] leading-[1.02] tracking-[0.01em] ${
              tone === "dark" ? "text-white" : "text-bhs-offblack"
            }`}
          >
            <AnimatedHeadline segments={[{ text: title }]} />
          </h2>
        </div>
        {children && <div className="lg:max-w-md lg:text-right shrink-0">{children}</div>}
      </div>
    </div>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] md:text-base font-light leading-[1.6] text-bhs-coolgray">{children}</p>;
}

function StatCard({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white border border-bhs-gray-500 p-7 md:p-8 flex flex-col gap-3">
      <span className="font-display text-[2.5rem] md:text-[3.25rem] leading-none text-bhs-offblack">{value}</span>
      <span className="eyebrow text-[10px] text-bhs-cappuccino">{label}</span>
      {sub && <span className="text-xs font-light text-bhs-gray-900">{sub}</span>}
    </div>
  );
}

/**
 * Fires once when the element scrolls into view. Data graphics animate from a
 * zero state on entry, so they need to know when they become visible rather
 * than animating off-screen where nobody sees it.
 */
function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/**
 * Returns a negative pixel offset that grows as the page scrolls down, easing
 * to `-strength` once `distance` has been scrolled.
 *
 * Deliberately keyed to absolute scroll depth rather than the element's
 * viewport position: this drives an element sitting near the top of the
 * document, which is already high in the viewport at rest, so a
 * position-based mapping would spend most of its range before the reader
 * scrolls at all.
 *
 * rAF-coalesced and applied without a CSS transition, so it tracks the wheel
 * instead of lagging behind it. Stays at 0 under prefers-reduced-motion.
 */
function useScrollDrift(distance = 700, strength = 40) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      // easeOutCubic — most of the travel happens early, then settles.
      const eased = 1 - Math.pow(1 - progress, 3);
      setOffset(-eased * strength);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance, strength]);

  return offset;
}

/** Fades and lifts its children in on first scroll into view. */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Colours come from the enclosing .map-module, so it inverts with the panel. */
function BarChart({ data }: { data: { label: string; pct: number }[] }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const max = Math.max(...data.map((d) => d.pct));

  return (
    <div className="space-y-3.5" ref={ref}>
      {data.map((d, i) => (
        // Label above a full-width track: the three modules sit in narrow
        // columns, where an inline label would squeeze the bars to nothing.
        <div key={d.label}>
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <span
              className="text-[13px] font-light truncate transition-colors duration-[400ms]"
              style={{ color: "var(--ink)" }}
            >
              {d.label}
            </span>
            <span
              className="text-[13px] tabular-nums shrink-0 transition-colors duration-[400ms]"
              style={{ color: "var(--pct-ink)" }}
            >
              {d.pct}%
            </span>
          </div>
          <div className="h-[3px] transition-colors duration-[400ms]" style={{ backgroundColor: "var(--track)" }}>
            <div
              className="h-full"
              style={{
                backgroundColor: "var(--bar)",
                // Scaled against the largest share so short bars stay readable.
                width: inView ? `${(d.pct / max) * 100}%` : "0%",
                transition: `width 900ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms, background-color 400ms ease 0ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Marker radius scaled by share — area-proportional so big shares don't dominate. */
const markerRadius = (pct: number) => 2.5 + Math.sqrt(pct) * 0.95;

type Marker = { id: string; pct: number };

/**
 * Markers pop in on scroll, largest share first. `r` is CSS-animatable on SVG
 * circles in current browsers; opacity carries the effect if it isn't.
 */
function MapMarkers({
  markers,
  positions,
  inView,
}: {
  markers: Marker[];
  positions: Record<string, { x: number; y: number }>;
  inView: boolean;
}) {
  const ranked = [...markers].sort((a, b) => b.pct - a.pct);
  const topId = ranked[0]?.id;

  return (
    <>
      {ranked.map(({ id, pct }, i) => {
        const point = positions[id];
        if (!point) return null;
        const r = markerRadius(pct);
        const isTop = id === topId;
        // Per-property delays: the reveal staggers, the hover recolour does not.
        const delay = i * 80;
        const style = {
          transition:
            `r 700ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms,` +
            ` opacity 500ms ease-out ${delay}ms,` +
            " fill 400ms ease 0ms, fill-opacity 400ms ease 0ms",
        } as const;
        return (
          <g key={id} opacity={inView ? 1 : 0} style={style}>
            <circle
              cx={point.x}
              cy={point.y}
              r={inView ? r * 2 : 0}
              fill="var(--halo)"
              fillOpacity={isTop ? "calc(var(--halo-opacity) * 1.7)" : "var(--halo-opacity)"}
              style={style}
            />
            <circle
              cx={point.x}
              cy={point.y}
              r={inView ? r : 0}
              fill={isTop ? "var(--marker-top)" : "var(--marker)"}
              style={style}
            />
          </g>
        );
      })}
    </>
  );
}

/** Real Natural Earth geometry, projected at build time by scripts/generate-maps.mjs. */
function WorldMap({ data }: { data: { country: string; pct: number }[] }) {
  const [ref, inView] = useInView<SVGSVGElement>(0.2);
  return (
    <svg
      ref={ref}
      viewBox={WORLD_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-label="Buyer origins by country"
    >
      <path d={WORLD_LAND} fill="var(--map-land)" />
      <path
        d={WORLD_BORDERS}
        fill="none"
        stroke="var(--map-border)"
        strokeOpacity="var(--map-border-opacity)"
        strokeWidth="0.5"
      />
      <path
        d={WORLD_LAND}
        fill="none"
        stroke="var(--map-border)"
        strokeOpacity="var(--map-border-opacity)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <MapMarkers markers={data.map((d) => ({ id: d.country, pct: d.pct }))} positions={WORLD_MARKERS} inView={inView} />
    </svg>
  );
}

function DomesticMap({ data }: { data: { city: string; pct: number }[] }) {
  const [ref, inView] = useInView<SVGSVGElement>(0.2);
  return (
    <svg
      ref={ref}
      viewBox={US_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-label="Buyer origins by US market"
    >
      <path d={US_LAND} fill="var(--map-land)" />
      <path
        d={US_STATE_BORDERS}
        fill="none"
        stroke="var(--map-border)"
        strokeOpacity="var(--map-border-opacity)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <MapMarkers markers={data.map((d) => ({ id: d.city, pct: d.pct }))} positions={US_MARKERS} inView={inView} />
    </svg>
  );
}

/**
 * One geography row: map on the left, its bar chart on the right. The three
 * modules stack vertically so each map/chart pair reads across as a unit.
 */
function LocationModule({
  eyebrow,
  map,
  chart,
}: {
  eyebrow: string;
  map: React.ReactNode;
  chart: React.ReactNode;
}) {
  return (
    // .map-module holds the colour variables and the white → off-black hover flip.
    <div className="map-module p-8 md:p-9 flex flex-col">
      <p
        className="eyebrow text-[10px] mb-7 transition-colors duration-[400ms]"
        style={{ color: "var(--eyebrow-ink)" }}
      >
        {eyebrow}
      </p>
      {/* Same frame height across all three so the charts below start level. */}
      <div className="h-44 md:h-48 mb-9">{map}</div>
      {chart}
    </div>
  );
}

/** New York State by county — the local view beneath the domestic map. */
function StateMap({ data }: { data: { area: string; pct: number }[] }) {
  const [ref, inView] = useInView<SVGSVGElement>(0.2);
  return (
    <svg
      ref={ref}
      viewBox={NY_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-label="Buyer origins within New York State, by county"
    >
      <path d={NY_LAND} fill="var(--map-land)" />
      <path
        d={NY_COUNTY_BORDERS}
        fill="none"
        stroke="var(--map-border)"
        strokeOpacity="var(--map-border-opacity)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      <MapMarkers markers={data.map((d) => ({ id: d.area, pct: d.pct }))} positions={NY_MARKERS} inView={inView} />
    </svg>
  );
}

/**
 * Print / Email / Share. Rendered in both the masthead and the nav overlay, so
 * the visual treatment is switched by `tone` rather than duplicated.
 */
function ReportActions({ tone = "light" }: { tone?: "light" | "dark" }) {
  const shareUrl = typeof window === "undefined" ? "" : window.location.href;
  const subject = `BHS Seller Report — ${property.name} ${property.unit}`;

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: subject, url: shareUrl });
        return;
      } catch {
        // Dismissed or unavailable — fall through to clipboard.
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Clipboard blocked (insecure context or denied permission); nothing to do.
    }
  };

  const actions = [
    { label: "Print", Icon: IconPrinter, onClick: () => window.print() },
    {
      label: "Email",
      Icon: IconMail,
      onClick: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(shareUrl)}`;
      },
    },
    { label: "Share", Icon: IconShare3, onClick: share },
  ];

  const dark = tone === "dark";
  return (
    <div className="flex items-center gap-2">
      {actions.map(({ label, Icon, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className={`flex items-center gap-2 px-3 py-2 border transition-colors duration-200 ${
            dark
              ? "border-white/25 text-white hover:border-bhs-marigold hover:text-bhs-marigold"
              : "border-bhs-gray-500 text-bhs-offblack hover:border-bhs-cappuccino hover:text-bhs-cappuccino"
          }`}
        >
          <Icon size={17} stroke={1.25} />
          <span className="eyebrow text-[10px] hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}

// Stable pseudo-random so the sparkline does not reshuffle on every render
function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** 90-day page-view bars; each column grows from the baseline on scroll in. */
function Sparkline() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const days = 90;
  return (
    <div ref={ref} className="relative h-44 flex items-end gap-[2px]">
      {Array.from({ length: days }, (_, i) => {
        const height = Math.min(100, 80 + Math.sin(i / 8) * 40 + seeded(i) * 30);
        const highlight = i > 60 && i < 80;
        return (
          <div
            key={i}
            className={`flex-1 ${highlight ? "bg-bhs-marigold" : "bg-bhs-gray-500"}`}
            style={{
              height: inView ? `${height}%` : "0%",
              transition: "height 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              // Sweeps left to right across the full series.
              transitionDelay: `${(i / days) * 600}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("property");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mastheadHidden, setMastheadHidden] = useState(false);
  const lastScrollY = useRef(0);
  const agentCardOffset = useScrollDrift(700, 44);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Masthead reveals only when scrolling back up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 96) setMastheadHidden(false);
      else if (y > lastScrollY.current + 6) setMastheadHidden(true);
      else if (y < lastScrollY.current - 6) setMastheadHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const totalSyndicatedViews = syndicatedSites.reduce((a, b) => a + b.views, 0).toLocaleString();
  const totalEmailsSent = emailMetrics
    .reduce((a, b) => a + parseInt(b.count.replace(/,/g, "")), 0)
    .toLocaleString();

  return (
    <div className="min-h-screen bg-bhs-cream text-bhs-offblack">
      {/* ── Masthead — hides on scroll down, reveals on scroll up ── */}
      <header
        className={`no-print fixed top-0 left-0 right-0 z-40 bg-bhs-cream border-b border-bhs-gray-500 transition-transform duration-500 ease-out ${
          mastheadHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px] gap-6">
          <button
            onClick={() => scrollTo("property")}
            className="flex items-center gap-4 shrink-0"
            aria-label="Brown Harris Stevens — back to top"
          >
            <BhsLogo className="h-11 w-auto text-bhs-offblack" />
            <span className="h-8 w-px bg-bhs-gray-500 hidden sm:block" />
            <span className="eyebrow text-sm md:text-base text-bhs-offblack hidden sm:block">Seller Report</span>
          </button>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <ReportActions />
            <button
              onClick={() => setMenuOpen(true)}
              className="text-bhs-offblack hover:text-bhs-cappuccino transition-colors"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <IconMenu2 size={28} stroke={1.25} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full nav overlay ── */}
      <div
        className={`no-print fixed inset-0 z-50 bg-bhs-offblack transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px] gap-6">
          <div className="flex items-center gap-4 shrink-0">
            <BhsLogo className="h-11 w-auto text-white" />
            <span className="h-8 w-px bg-white/25 hidden sm:block" />
            <span className="eyebrow text-sm md:text-base text-white hidden sm:block">Seller Report</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            <ReportActions tone="dark" />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-bhs-marigold transition-colors"
              aria-label="Close menu"
            >
              <IconX size={28} stroke={1.25} />
            </button>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-10 md:pt-16 grid lg:grid-cols-[1fr_360px] gap-14 overflow-y-auto max-h-[calc(100vh-72px)] pb-16">
          <nav>
            <p className="eyebrow text-[10px] text-bhs-cappuccino mb-8">Report Sections</p>
            <ul>
              {navSections.map(({ id, label }, i) => (
                <li key={id} className="border-t border-white/12 last:border-b">
                  <button
                    onClick={() => scrollTo(id)}
                    className="w-full group flex items-baseline gap-6 py-5 text-left"
                  >
                    <span className="eyebrow text-[10px] text-bhs-gray-900 w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-[1.75rem] md:text-[2.5rem] leading-none transition-colors duration-200 ${
                        activeSection === id
                          ? "text-bhs-marigold"
                          : "text-white group-hover:text-bhs-marigold"
                      }`}
                    >
                      {label}
                    </span>
                    <IconArrowUpRight
                      size={22}
                      stroke={1}
                      className="ml-auto text-white/25 group-hover:text-bhs-marigold transition-colors"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <aside className="border border-white/15 p-7 h-fit">
            <p className="eyebrow text-[10px] text-bhs-cappuccino mb-6">Your Listing Agent</p>
            <img
              src={property.agent.photo}
              alt={property.agent.name}
              className="w-20 h-20 object-cover mb-5"
            />
            <p className="font-display text-2xl text-white leading-tight">{property.agent.name}</p>
            <p className="text-xs font-light text-bhs-gray-700w mt-2 leading-relaxed">{property.agent.title}</p>
            <div className="h-px bg-white/15 my-6" />
            <a
              href={`tel:${property.agent.phone}`}
              className="flex items-center gap-3 text-sm font-light text-white/80 hover:text-bhs-marigold transition-colors"
            >
              <IconPhone size={17} stroke={1.25} />
              {property.agent.phone}
            </a>
            <a
              href={`mailto:${property.agent.email}`}
              className="flex items-center gap-3 text-sm font-light text-white/80 hover:text-bhs-marigold transition-colors mt-3 break-all"
            >
              <IconMail size={17} stroke={1.25} />
              {property.agent.email}
            </a>
          </aside>
        </div>
      </div>

      {/* ── Section 1: Property Hero ── */}
      <section id="property" className="relative">
        <div className="relative h-[86vh] min-h-[560px] overflow-hidden">
          <img
            src={property.heroImage}
            alt="Property interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bhs-offblack/95 via-bhs-offblack/45 to-bhs-offblack/25" />

          <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-20 px-6 md:px-10 max-w-[1600px] mx-auto">
            <Eyebrow tone="cream">Brown Harris Stevens — Seller Report</Eyebrow>
            <h1 className="font-display text-[2.75rem] md:text-[5.5rem] leading-[0.98] tracking-[0.01em] text-white max-w-4xl">
              <AnimatedHeadline
                segments={[{ text: property.name }, { text: property.unit, className: "text-bhs-marigold" }]}
                threshold={0}
              />
            </h1>
            <p className="text-base md:text-lg font-light text-white/70 mt-4">{property.city}</p>

            <div className="mt-10 pt-8 border-t border-white/20 flex flex-wrap gap-x-14 gap-y-6">
              <div className="flex flex-col gap-2">
                <span className="eyebrow text-[10px] text-bhs-marigold">Asking Price</span>
                <span className="font-display text-3xl md:text-4xl text-white leading-none">{property.price}</span>
              </div>
              {[
                { label: "Beds", value: property.beds, Icon: IconBed },
                { label: "Baths", value: property.baths, Icon: IconBath },
                { label: "Interior Sq Ft", value: property.sqft, Icon: IconRuler },
              ].map(({ label, value, Icon }) => (
                <div key={label} className="flex flex-col gap-2">
                  <span className="eyebrow text-[10px] text-bhs-marigold">{label}</span>
                  <span className="font-display text-3xl md:text-4xl text-white leading-none flex items-center gap-3">
                    <Icon size={22} stroke={1} className="text-white/45" />
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Property detail strip */}
        <div className="bg-white border-b border-bhs-gray-500">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Eyebrow>About This Property</Eyebrow>
              <p className="font-display text-xl md:text-[1.75rem] leading-[1.45] text-bhs-offblack max-w-3xl">
                {property.description}
              </p>
              <div className="mt-10 pt-8 border-t border-bhs-gray-500 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "MLS #", value: property.mlsId },
                  { label: "Online Since", value: property.onlineSince },
                  { label: "Last Updated", value: property.lastUpdated },
                  { label: "Total Views", value: property.totalViews },
                ].map((d) => (
                  <div key={d.label}>
                    <span className="eyebrow text-[10px] text-bhs-gray-900 block mb-2">{d.label}</span>
                    <span className="text-sm font-normal text-bhs-offblack">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Card — lifts over the hero and drifts up on scroll */}
            <div
              className="lg:-mt-40 xl:-mt-48 relative z-20 self-start will-change-transform"
              style={{ transform: `translate3d(0, ${agentCardOffset}px, 0)` }}
            >
              <div className="bg-bhs-offblack p-8 flex flex-col shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)]">
                <p className="eyebrow text-[10px] text-bhs-cappuccino mb-6">Your Listing Agent</p>
                <img
                  src={property.agent.photo}
                  alt={property.agent.name}
                  className="w-20 h-20 object-cover mb-5"
                />
                <p className="font-display text-2xl text-white leading-tight">{property.agent.name}</p>
                <p className="text-xs font-light text-bhs-gray-700w mt-2 leading-relaxed">{property.agent.title}</p>
                <div className="h-px bg-white/15 my-6" />
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center gap-3 text-sm font-light text-white/80 hover:text-bhs-marigold transition-colors"
                >
                  <IconPhone size={17} stroke={1.25} />
                  {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center gap-3 text-sm font-light text-white/80 hover:text-bhs-marigold transition-colors mt-3 break-all"
                >
                  <IconMail size={17} stroke={1.25} />
                  {property.agent.email}
                </a>
                <div className="pt-10 grid grid-cols-2 gap-8">
                  <div>
                    <span className="font-display text-3xl text-bhs-marigold block leading-none">24</span>
                    <span className="eyebrow text-[9px] text-white/45 mt-2 block">Years</span>
                  </div>
                  <div>
                    <span className="font-display text-3xl text-bhs-marigold block leading-none">$2.1B</span>
                    <span className="eyebrow text-[9px] text-white/45 mt-2 block">Sales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* ── Section 2: Total Exposure ── */}
        <section id="exposure" className="py-20 md:py-28">
          <SectionHeader eyebrow="Performance Overview" title="Total Exposure">
            <Lede>
              Your property reached buyers across {syndicatedSites.length} syndicated real estate platforms, generating
              significant visibility in targeted markets.
            </Lede>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16">
            <StatCard value={totalSyndicatedViews} label="Total Syndicated Views" sub="Across all partner platforms" />
            <StatCard value={syndicatedSites.length.toString()} label="Syndicated Sites" sub="Premium partner network" />
            <StatCard value="98%" label="Coverage Rate" sub="Of major buyer search portals" />
          </div>

          <p className="eyebrow text-[10px] text-bhs-gray-900 mb-6">Partner Platforms</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-bhs-gray-500">
            {syndicatedSites.map((site) => (
              <div
                key={site.name}
                className="bg-white p-6 flex items-center justify-between gap-4 hover:bg-bhs-gray-100 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 border border-bhs-gray-500 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-medium tracking-wider text-bhs-cappuccino">{site.logo}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-normal text-bhs-offblack truncate">{site.name}</p>
                    <p className="text-xs font-light text-bhs-gray-900 tabular-nums">
                      {site.views.toLocaleString()} views
                    </p>
                  </div>
                </div>
                <div className="w-[3px] h-10 bg-bhs-gray-500 flex flex-col justify-end shrink-0">
                  <div
                    className="w-full bg-bhs-marigold transition-all duration-700"
                    style={{ height: `${(site.views / 4821) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: Email Campaigns ── */}
        <section id="email" className="py-20 md:py-28">
          <SectionHeader eyebrow="Digital Outreach" title="Email Campaigns">
            <div className="lg:text-right">
              <span className="font-display text-5xl md:text-6xl text-bhs-offblack leading-none block">
                {totalEmailsSent}
              </span>
              <span className="eyebrow text-[10px] text-bhs-cappuccino mt-3 block">Total Emails Sent</span>
            </div>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bhs-gray-500">
            {emailMetrics.map(({ type, Icon, count, description }) => (
              <div key={type} className="bg-white p-8 md:p-10 flex gap-6">
                <Icon size={30} stroke={1} className="text-bhs-cappuccino shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-display text-2xl text-bhs-offblack leading-tight">{type}</p>
                  <p className="font-display text-4xl text-bhs-cappuccino mt-4 leading-none tabular-nums">{count}</p>
                  <p className="text-sm font-light text-bhs-coolgray mt-4 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Traffic & Views ── */}
        <section id="views" className="py-20 md:py-28">
          <SectionHeader eyebrow="Buyer Engagement" title="Traffic & Views">
            <Lede>Comprehensive buyer touchpoints across Brown Harris Stevens digital properties.</Lede>
          </SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/15 bg-bhs-offblack mb-16">
            {viewMetrics.map(({ type, count, trend, Icon }) => (
              <div key={type} className="bg-bhs-offblack p-8 flex flex-col gap-5 border-r border-white/12 last:border-r-0">
                <Icon size={28} stroke={1} className="text-bhs-cappuccino" />
                <span className="font-display text-4xl text-white leading-none tabular-nums">{count}</span>
                <span className="eyebrow text-[10px] text-bhs-gray-700w leading-relaxed">{type}</span>
                <span className="flex items-center gap-2 text-xs font-light text-bhs-marigold mt-auto">
                  <IconTrendingUp size={15} stroke={1.25} />
                  {trend} this month
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white border border-bhs-gray-500 p-8 md:p-10">
            <p className="eyebrow text-[10px] text-bhs-gray-900 mb-8">Property Page Views — Last 90 Days</p>
            <Sparkline />
            <div className="flex justify-between mt-5 pt-4 border-t border-bhs-gray-500">
              {["Sep", "Oct", "Nov", "Dec"].map((m) => (
                <span key={m} className="eyebrow text-[10px] text-bhs-gray-900">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 5: Location Insights ── */}
        <section id="location" className="py-20 md:py-28">
          <SectionHeader eyebrow="Buyer Origins" title="Location Insights">
            <Lede>Understanding where interested buyers originate helps target future marketing efforts.</Lede>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-bhs-gray-500">
            <LocationModule
              eyebrow="Global — Top 10 Countries"
              map={<WorldMap data={worldLocations} />}
              chart={<BarChart data={worldLocations.map((d) => ({ label: d.country, pct: d.pct }))} />}
            />
            <LocationModule
              eyebrow="Domestic — Top 10 Markets"
              map={
                /* Scaled back so the US doesn't out-weigh the world map beside it. */
                <div className="h-full flex items-center justify-center">
                  <div className="h-[85%] w-full">
                    <DomesticMap data={domesticLocations} />
                  </div>
                </div>
              }
              chart={<BarChart data={domesticLocations.map((d) => ({ label: d.city, pct: d.pct }))} />}
            />
            <LocationModule
              eyebrow="New York State — Top 10 Areas"
              map={<StateMap data={stateLocations} />}
              chart={<BarChart data={stateLocations.map((d) => ({ label: d.area, pct: d.pct }))} />}
            />
          </div>
        </section>

        {/* ── Section 6: Marketing ── */}
        <section id="marketing" className="py-20 md:py-28">
          <SectionHeader eyebrow="Campaign Activity" title="Marketing Efforts">
            <Lede>
              A multi-channel strategy designed to reach the most qualified buyers across print, digital, and social.
            </Lede>
          </SectionHeader>

          <div className="space-y-16">
            {marketingItems.map(({ category, Icon, accent, items }) => (
              <div key={category}>
                <div className="flex items-center gap-5 mb-8 pb-6 border-b border-bhs-gray-500">
                  <Icon size={28} stroke={1} style={{ color: accent }} className="shrink-0" />
                  <div>
                    <p className="font-display text-2xl text-bhs-offblack leading-tight">{category}</p>
                    <p className="text-xs font-light text-bhs-gray-900 mt-1">{items.length} placements</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bhs-gray-500">
                  {items.map((item) => (
                    <div key={item.platform} className="bg-white p-7 hover:bg-bhs-gray-100 transition-colors">
                      <div className="h-[3px] w-10 mb-5" style={{ backgroundColor: accent }} />
                      <p className="font-display text-xl text-bhs-offblack leading-tight">{item.platform}</p>
                      <p className="eyebrow text-[10px] text-bhs-cappuccino mt-2">{item.type}</p>
                      <div className="mt-8 pt-5 border-t border-bhs-gray-500 flex justify-between items-end">
                        <div>
                          <span className="eyebrow text-[9px] text-bhs-gray-900 block mb-1">Reach</span>
                          <p className="font-display text-xl text-bhs-offblack leading-none tabular-nums">
                            {item.reach}
                          </p>
                        </div>
                        <span className="text-xs font-light text-bhs-gray-900">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 7: Open House Submissions ── */}
        <section id="openhouse" className="py-20 md:py-28">
          <SectionHeader eyebrow="Lead Generation" title="Open House Submissions">
            <div className="flex gap-px bg-bhs-gray-500 lg:justify-end">
              <div className="bg-bhs-offblack px-8 py-5 text-center">
                <span className="font-display text-3xl text-bhs-marigold block leading-none">
                  {openHouseSubmissions.length}
                </span>
                <span className="eyebrow text-[9px] text-white/50 mt-2 block">Registrants</span>
              </div>
              <div className="bg-white px-8 py-5 text-center">
                <span className="font-display text-3xl text-bhs-cappuccino block leading-none">
                  {openHouseSubmissions.filter((s) => s.preApproved).length}
                </span>
                <span className="eyebrow text-[9px] text-bhs-gray-900 mt-2 block">Pre-Approved</span>
              </div>
            </div>
          </SectionHeader>

          <div className="overflow-x-auto border border-bhs-gray-500">
            <table className="w-full min-w-[820px] bg-white">
              <thead>
                <tr className="bg-bhs-offblack">
                  {["Name", "Contact", "Open House", "Pre-Approved", "Notes"].map((h) => (
                    <th key={h} className="eyebrow text-[9px] text-bhs-gray-700w px-6 py-5 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {openHouseSubmissions.map((s) => (
                  <tr key={s.email} className="border-t border-bhs-gray-500 hover:bg-bhs-gray-100 transition-colors">
                    <td className="px-6 py-5">
                      <p className="font-display text-lg text-bhs-offblack leading-tight">{s.name}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-light text-bhs-coolgray">{s.email}</p>
                      <p className="text-xs font-light text-bhs-gray-900 mt-1">{s.phone}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-normal text-bhs-offblack">{s.date}</p>
                      <p className="text-xs font-light text-bhs-gray-900 mt-1">{s.time}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 eyebrow text-[9px] px-3 py-2 ${
                          s.preApproved
                            ? "bg-bhs-marigold/15 text-bhs-cappuccino"
                            : "bg-bhs-gray-200 text-bhs-gray-900"
                        }`}
                      >
                        {s.preApproved ? <IconCheck size={13} stroke={1.5} /> : <IconMinus size={13} stroke={1.5} />}
                        {s.preApproved ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-light text-bhs-coolgray max-w-xs leading-relaxed">{s.notes}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 8: SLW Showcase ── */}
        <section id="slw" className="py-20 md:py-28">
          <SectionHeader eyebrow="Digital Presence" title="SLW — Seller's Listing Website">
            <Lede>A dedicated property microsite showcasing your home to qualified buyers.</Lede>
          </SectionHeader>

          <div className="bg-bhs-offblack grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
            <div className="flex items-center justify-center p-10 md:p-14">
              <Reveal className="w-full flex justify-center">
                <img
                  src={slwShowcase}
                  alt="Seller's Listing Website shown on a desktop monitor"
                  width={281}
                  height={232}
                  className="w-full max-w-[400px] h-auto"
                />
              </Reveal>
            </div>

            <div className="p-10 md:p-14 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/12">
              <div className="inline-flex items-center gap-2.5 self-start border border-white/20 px-3.5 py-2 mb-8">
                <IconLock size={13} stroke={1.5} className="text-bhs-marigold shrink-0" />
                <span className="text-xs font-light text-white/70">
                  bhsusa.com/listing/79th-street-apt-20bch
                </span>
              </div>

              <p className="font-display text-3xl md:text-[2.75rem] text-white leading-[1.05]">
                {property.name} <span className="text-bhs-marigold">{property.unit}</span>
              </p>
              <p className="text-sm font-light text-white/60 mt-3">
                {property.city} · {property.price}
              </p>

              <div className="h-px bg-white/15 my-9" />

              <div className="flex items-end gap-5">
                <div>
                  <p className="eyebrow text-[10px] text-bhs-marigold">SLW Traffic</p>
                  <p className="font-display text-5xl text-white mt-3 leading-none tabular-nums">4,921</p>
                  <p className="text-xs font-light text-white/45 mt-2">unique visitors</p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-px grid grid-cols-2 md:grid-cols-4 gap-px bg-bhs-gray-500">
            {[
              { label: "Page Views", value: "4,921" },
              { label: "Avg. Time on Site", value: "4:32" },
              { label: "Gallery Opens", value: "1,204" },
              { label: "Contact Clicks", value: "387" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-7 text-center">
                <p className="font-display text-3xl text-bhs-offblack leading-none tabular-nums">{s.value}</p>
                <p className="eyebrow text-[9px] text-bhs-gray-900 mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-bhs-offblack">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <BhsLogo className="h-16 w-auto text-white" />
          </div>
          <div className="md:text-center">
            <p className="eyebrow text-[9px] text-bhs-cappuccino mb-3">Report Details</p>
            <p className="text-xs font-light text-white/50">Generated {property.lastUpdated}</p>
            <p className="text-xs font-light text-white/35 mt-1">
              MLS #{property.mlsId} · {property.city}
            </p>
          </div>
          <div className="md:text-right">
            <p className="eyebrow text-[9px] text-bhs-cappuccino mb-3">Prepared By</p>
            <p className="font-display text-lg text-white leading-tight">{property.agent.name}</p>
            <a
              href={`mailto:${property.agent.email}`}
              className="text-xs font-light text-bhs-marigold mt-2 block hover:underline"
            >
              {property.agent.email}
            </a>
            <p className="text-xs font-light text-white/40 mt-1">{property.agent.phone}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

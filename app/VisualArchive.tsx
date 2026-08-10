"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type ArchiveCategory =
  | "carousel"
  | "poster"
  | "editorial"
  | "flyer"
  | "social"
  | "emailer"
  | "thumbnail"
  | "report"
  | "standee"
  | "gaming"
  | "identity";

type ArchiveItem = {
  id: string;
  title: string;
  category: ArchiveCategory;
  categoryLabel: string;
  world: string;
  format: string;
  copy: string;
  art: string;
  accent: string;
  secondary: string;
  ink: string;
  variant: number;
  image?: string;
};

const worlds = {
  roselle: { world: "Roselle", art: "/images/concepts/roselle-artwork.webp", accent: "#e93c78", secondary: "#ffd8e6", ink: "#4d0d28" },
  zest: { world: "Zest Club", art: "/images/concepts/zest-artwork.webp", accent: "#ff6a3d", secondary: "#ffe64f", ink: "#1236a8" },
  phase: { world: "Phase/01", art: "/images/concepts/phase-artwork.webp", accent: "#4255ff", secondary: "#c9f56a", ink: "#080a12" },
  afterdark: { world: "Afterdark Arena", art: "/images/concepts/afterdark-artwork.webp", accent: "#f2265b", secondary: "#7a5cff", ink: "#090811" },
  common: { world: "Common Ground", art: "/images/concepts/common-ground-artwork.webp", accent: "#ff641f", secondary: "#c9f56a", ink: "#123bb4" },
};

function piece(
  id: string,
  title: string,
  category: ArchiveCategory,
  categoryLabel: string,
  format: string,
  copy: string,
  world: keyof typeof worlds,
  variant: number,
): ArchiveItem {
  return { id, title, category, categoryLabel, format, copy, variant, ...worlds[world] };
}

const archiveItems: ArchiveItem[] = [
  { ...piece("zest-ways", "Five tiny ways to add zest", "carousel", "Carousel", "7-slide carousel", "A sunny five-step story told through one strict, repeatable slide system: numeral, seal, rule, headline, ribbon.", "zest", 2), image: "/images/archive/zest-carousel-cover.webp" },
  { ...piece("phase-conf", "Design × Engineering", "carousel", "Carousel", "6-slide carousel", "A dark conference narrative balancing a glassy planet, mono metadata and confident type across six frames.", "phase", 3), image: "/images/archive/phase-carousel-cover.webp" },

  { ...piece("sonora", "Sonora", "poster", "Advertising poster", "1080 × 1350 print/social", "A retro desert-festival poster built from layered sunset arcs, slab-serif type and one rotated call-to-action.", "zest", 1), world: "Sonora Festival", accent: "#D2542B", secondary: "#F2A93B", ink: "#402314", image: "/images/archive/sonora-poster.webp" },
  { ...piece("give-one-saturday", "Give one Saturday", "poster", "Advertising poster", "1080 × 1350 print/social", "An artwork-led volunteer-drive poster pairing warm serif type with a paper-collage hero and a clean information row.", "common", 2), image: "/images/archive/common-ground-poster.webp" },

  { ...piece("material-muse", "The texture of softness", "editorial", "Magazine design", "Cover + essay spread", "A Didot-led beauty issue with a vector still life — acrylic petals, steel ribbon, glass sphere — carried from cover to essay.", "roselle", 1), image: "/images/archive/roselle-magazine.webp" },
  { ...piece("signal-journal", "Signal, vol. 01", "editorial", "Magazine design", "Cover + feature spread", "A dark systems journal: gravitational-lens cover art, a confession of a grid, and a diagram that tells the truth.", "phase", 3), image: "/images/archive/signal-journal.webp" },

  { ...piece("sip-the-sun", "Sip the sun", "flyer", "Flyer", "A5 event flyer", "The citrus campaign translated to print: photo panel, coral field and a cobalt information footer.", "zest", 2), image: "/images/archive/zest-flyer.webp" },
  { ...piece("open-studio", "Open studio", "flyer", "Flyer", "A5 event flyer", "An arch-window flyer with a four-row schedule built for scanning, and a date sticker doing the shouting.", "common", 1), image: "/images/archive/common-ground-flyer.webp" },

  { ...piece("citrus-social", "Citrus social", "social", "Social campaign", "Poster + carousel + flyer", "One citrus identity flexed across three coordinated formats without repeating a single layout.", "zest", 1), image: "/images/archive/zest-social-poster.webp" },
  { ...piece("one-table", "One table", "social", "Social campaign", "3-post system", "Bring a dish, teach a skill, tell a story — one layout system, three background moods, zero repeated frames.", "common", 2), image: "/images/archive/one-table-campaign.webp" },

  { ...piece("field-note", "Field note 06", "emailer", "Emailer", "900 × 1200 email", "A community newsletter led by a paper-collage hero, one story and one clear invitation.", "common", 1), image: "/images/archive/common-ground-emailer.webp" },
  { ...piece("welcome-roselle", "Welcome to the soft side", "emailer", "Emailer", "900 × 1200 email", "A beauty onboarding email: still-life hero, one serif welcome, one decisive CTA, three quiet product cards.", "roselle", 2), image: "/images/archive/roselle-emailer.webp" },

  piece("colour-tastes", "Why colour changes taste", "thumbnail", "Thumbnail", "16:9 video", "A bold educational thumbnail built for instant subject recognition.", "zest", 2),
  piece("interfaces-trust", "Interfaces that earn trust", "thumbnail", "Thumbnail", "16:9 video", "A technology explainer thumbnail without generic device mockups.", "phase", 3),

  piece("impact-in-motion", "Impact in motion", "report", "PDF / report", "Cover + 2 pages", "A social-impact report turning participation into a visual narrative.", "common", 1),
  piece("signals-report", "Signals 01", "report", "PDF / report", "Cover + 2 pages", "A compact trends report using diagrams, pull quotes and clear navigation.", "phase", 3),

  { ...piece("we-make-the-sun", "We make the sun together", "standee", "Standee", "600 × 1400 roll-up", "A neighbourhood-day standee designed for distance reading first, detail second.", "common", 1), image: "/images/archive/common-ground-standee.webp" },
  { ...piece("zest-pop-up", "Zest pop-up", "standee", "Standee", "600 × 1400 roll-up", "A retail standee stacked for distance: brand, artwork, offer band and an arrow that does the wayfinding.", "zest", 2), image: "/images/archive/zest-standee.webp" },

  piece("final-round", "Final round", "gaming", "Gaming poster", "Launch poster", "A cinematic tournament announcement for a fictional arena league.", "afterdark", 1),
  piece("red-signal", "Red signal", "gaming", "Gaming poster", "Matchday poster", "A matchday graphic organised around team, time and competitive tension.", "afterdark", 2),

  piece("roselle-mark", "Roselle", "identity", "Logo system", "Mark + application", "A petal-and-orbit identity balancing craft, beauty and modernity.", "roselle", 1),
  piece("common-mark", "Common Ground", "identity", "Logo system", "Mark + application", "An open circular mark representing contribution, exchange and belonging.", "common", 3),
];

const categories: { value: "all" | ArchiveCategory; label: string }[] = [
  { value: "all", label: "All 22" },
  { value: "carousel", label: "Carousels" },
  { value: "poster", label: "Posters" },
  { value: "editorial", label: "Editorial" },
  { value: "flyer", label: "Flyers" },
  { value: "social", label: "Social" },
  { value: "emailer", label: "Emailers" },
  { value: "thumbnail", label: "Thumbnails" },
  { value: "report", label: "PDFs" },
  { value: "standee", label: "Standees" },
  { value: "gaming", label: "Gaming" },
  { value: "identity", label: "Logos" },
];

function Artwork({ item, large = false }: { item: ArchiveItem; large?: boolean }) {
  const style = {
    "--archive-accent": item.accent,
    "--archive-secondary": item.secondary,
    "--archive-ink": item.ink,
    "--archive-image": `url(${item.art})`,
    "--archive-variant": item.variant,
  } as CSSProperties;

  const title = <strong>{item.title}</strong>;

  if (item.image) {
    return (
      <div className={`archive-art archive-art--final${large ? " archive-art--large" : ""}`} style={style}>
        <img src={item.image} alt={`${item.title} — ${item.categoryLabel} design for ${item.world}`} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`archive-art archive-art--${item.category} archive-art--v${item.variant}${large ? " archive-art--large" : ""}`} style={style}>
      {item.category === "carousel" && (
        <div className="archive-carousel"><span>01</span><span>{title}<i>Swipe to explore →</i></span><span>0{item.variant + 3}</span></div>
      )}
      {item.category === "poster" && (
        <><div className="archive-art__image" /><small>CONCEPT POSTER / 0{item.variant}</small>{title}<i>Visual culture, made visible.</i></>
      )}
      {item.category === "editorial" && (
        <div className="archive-spread"><span><small>ISSUE 0{item.variant}</small>{title}<i>Journal of form &amp; feeling</i></span><span><b className="archive-art__image" /><i>Words, images and space in conversation.</i></span></div>
      )}
      {item.category === "flyer" && (
        <div className="archive-flyer"><small>SAT · 19:00 · NAGPUR</small>{title}<div className="archive-art__image" /><i>Ideas / people / something worth showing up for</i><span>RSVP ↗</span></div>
      )}
      {item.category === "social" && (
        <div className="archive-social"><span>{title}<i>01 / 03</i></span><span className="archive-art__image" /><span><b>Save the thought.</b><i>03 / 03</i></span></div>
      )}
      {item.category === "emailer" && (
        <div className="archive-email"><span className="archive-email__bar"><i /><i /><i /></span><small>{item.world} / IN YOUR INBOX</small><div className="archive-art__image" />{title}<p>{item.copy}</p><b>READ THE STORY ↗</b></div>
      )}
      {item.category === "thumbnail" && (
        <div className="archive-thumbnail"><div className="archive-art__image" /><small>WATCH / 08:24</small>{title}<span>▶</span></div>
      )}
      {item.category === "report" && (
        <div className="archive-report"><span><small>REPORT / 2026</small>{title}<i>{item.world}</i></span><span><b>64%</b><i>of change begins with a clearer story.</i><em /><em /></span></div>
      )}
      {item.category === "standee" && (
        <div className="archive-standee-scene"><span className="archive-standee"><small>WELCOME / 0{item.variant}</small><b className="archive-art__image" />{title}<i>ENTER HERE ↗</i></span><span className="archive-standee__base" /></div>
      )}
      {item.category === "gaming" && (
        <><div className="archive-art__image" /><small>AFTERDARK / SEASON 01</small>{title}<i>22:00 · LIVE ARENA · REGISTER NOW</i><span className="archive-gaming__score">03<br /><b>VS</b><br />01</span></>
      )}
      {item.category === "identity" && (
        <div className="archive-identity"><span className={`archive-logo archive-logo--${item.variant}`}><i /><i /><i /></span>{title}<small>PRIMARY MARK / RESPONSIVE SYSTEM</small><div><i /><i /><i /><i /></div><em>{item.world.toLowerCase().replace(" ", "")}®</em></div>
      )}
    </div>
  );
}

function ArchiveModal({ item, onClose }: { item: ArchiveItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.classList.add("panel-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("panel-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="archive-modal" role="dialog" aria-modal="true" aria-labelledby="archive-modal-title">
      <button className="archive-modal__scrim" onClick={onClose} aria-label="Close concept project" />
      <article className="archive-modal__sheet">
        <div className="archive-modal__top"><span>Self-initiated concept / {item.categoryLabel}</span><button onClick={onClose}>Close ×</button></div>
        <div className="archive-modal__art"><Artwork item={item} large /></div>
        <div className="archive-modal__copy">
          <div><span className="eyebrow">Fictional brand world</span><h3 id="archive-modal-title">{item.world}</h3></div>
          <div><span className="eyebrow">Design</span><h4>{item.title}</h4><p>{item.copy}</p></div>
          <div><span className="eyebrow">Format</span><p>{item.format}</p></div>
          <div className="archive-modal__note"><strong>Concept project</strong><p>Original self-initiated exploration created to demonstrate visual direction, typography, campaign thinking and production range. It is not client or employer work.</p></div>
        </div>
      </article>
    </div>
  );
}

export default function VisualArchive() {
  const [filter, setFilter] = useState<"all" | ArchiveCategory>("all");
  const [activeItem, setActiveItem] = useState<ArchiveItem | null>(null);
  const visibleItems = useMemo(() => filter === "all" ? archiveItems : archiveItems.filter((item) => item.category === filter), [filter]);

  return (
    <section className="visual-archive" id="visual-archive" aria-labelledby="visual-archive-title">
      <div className="visual-archive__heading">
        <span className="eyebrow">02 / Visual archive</span>
        <h2 id="visual-archive-title">Five fictional worlds.<br /><em>Twenty-two ways in.</em></h2>
        <p>Original, self-initiated graphic-design concepts built to show range without publishing confidential employer work.</p>
      </div>
      <div className="visual-archive__notice"><strong>No borrowed client logos. No restricted artwork.</strong><span>Every piece below is a clearly labelled concept exploration.</span></div>
      <div className="visual-archive__filters" aria-label="Filter visual archive">
        {categories.map((category) => (
          <button key={category.value} className={filter === category.value ? "is-active" : ""} onClick={() => setFilter(category.value)} aria-pressed={filter === category.value}>
            {category.label}
          </button>
        ))}
      </div>
      <div className="visual-archive__grid" aria-live="polite">
        {visibleItems.map((item, index) => (
          <article
            className="archive-card"
            key={item.id}
            role="button"
            tabIndex={0}
            aria-label={`Open ${item.title}, ${item.categoryLabel} concept`}
            onClick={() => setActiveItem(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveItem(item);
              }
            }}
            data-cursor="OPEN"
            style={{ "--archive-delay": `${Math.min(index, 8) * 45}ms` } as CSSProperties}
          >
            <Artwork item={item} />
            <span className="archive-card__meta"><span><b>{item.world}</b><small>{item.categoryLabel}</small></span><i>{item.format}</i><em>↗</em></span>
          </article>
        ))}
      </div>
      {activeItem && <ArchiveModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </section>
  );
}

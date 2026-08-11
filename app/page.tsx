"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

type Project = {
  id: string;
  number: string;
  title: string;
  type: string;
  year: string;
  image: string;
  imageAlt: string;
  tone: string;
  summary: string;
  challenge: string;
  direction: string;
  contribution: string[];
  behance: string;
};

type WorkFrame = {
  src: string;
  alt: string;
  label: string;
  fit?: "landscape" | "wide" | "portrait" | "standee";
};

type WorkEntry = {
  id: string;
  number: string;
  title: string;
  discipline: "Product design" | "Visual design";
  format: string;
  year: string;
  summary: string;
  tags: string[];
  accent: string;
  frames: WorkFrame[];
  project?: Project;
};

const projects: Project[] = [
  {
    id: "bounceless",
    number: "01",
    title: "Bounceless",
    type: "B2B product · UX case study",
    year: "2024",
    image: "/images/bounceless.jpg",
    imageAlt: "Bounceless email-verification product case-study cover",
    tone: "blue",
    summary:
      "A cleaner verification experience for teams that depend on accurate email lists.",
    challenge:
      "Email-verification products often expose technical information without helping non-technical users decide what to do next.",
    direction:
      "The concept organizes list health, verification status, and next actions into a calm, confidence-building workflow.",
    contribution: ["UX direction", "Information hierarchy", "Interface design", "Prototype"],
    behance: "https://www.behance.net/gallery/202732003/Bouncless-UX-Case-Study",
  },
  {
    id: "potted-paradise",
    number: "02",
    title: "Potted Paradise",
    type: "Mobile commerce · UI/UX",
    year: "2024",
    image: "/images/potted.png",
    imageAlt: "Potted Paradise gardening marketplace case-study cover",
    tone: "green",
    summary:
      "A friendly plant-shopping experience for beginners and experienced gardeners.",
    challenge:
      "Plant buyers need more guidance than a standard product grid provides—care needs, space, light, and experience all shape the choice.",
    direction:
      "The concept combines approachable discovery, clear plant information, and a straightforward mobile purchase path.",
    contribution: ["User flows", "Mobile UI", "Visual system", "Prototyping"],
    behance:
      "https://www.behance.net/gallery/198854779/Potted-Paradise-Gardening-Store-app-UXUI(Case-Study)",
  },
  {
    id: "learnara",
    number: "03",
    title: "Learnara",
    type: "Education product · UI/UX",
    year: "2024",
    image: "/images/learnara.jpg",
    imageAlt: "Learnara e-learning product case-study cover",
    tone: "violet",
    summary:
      "An e-learning environment designed around focus, progress, and student–instructor connection.",
    challenge:
      "Learning platforms can make recorded courses, assignments, communication, and progress feel like separate products.",
    direction:
      "Learnara brings the core study loop into one visual language so students can understand where they are and what comes next.",
    contribution: ["Product thinking", "User flows", "Interface design", "Case-study art direction"],
    behance: "https://www.behance.net/gallery/202736011/Learnara-UIUX-Case-Study",
  },
  {
    id: "foodbank",
    number: "04",
    title: "Foodbank",
    type: "Social-impact app · UI/UX",
    year: "2024",
    image: "/images/foodbank.jpg",
    imageAlt: "Foodbank donation app case-study cover",
    tone: "mint",
    summary:
      "A donation flow that helps people understand impact before asking them to act.",
    challenge:
      "Donation experiences need to balance urgency, trust, clarity, and emotional weight without overwhelming the donor.",
    direction:
      "The interface uses calm green cues, visible campaign context, and a short contribution flow to reduce uncertainty.",
    contribution: ["UX exploration", "Mobile UI", "Visual hierarchy", "Prototype"],
    behance: "https://www.behance.net/gallery/202746803/FOODBANK-DONATION-APP-DESIGN",
  },
  {
    id: "dominos",
    number: "05",
    title: "Domino’s, rethought",
    type: "Independent redesign · Product UI",
    year: "2024",
    image: "/images/dominos.png",
    imageAlt: "Independent Domino’s mobile-app redesign case-study cover",
    tone: "red",
    summary:
      "An independent exploration of a faster, more legible mobile ordering experience.",
    challenge:
      "High-choice ordering flows must keep customization flexible without making repeat purchases feel laborious.",
    direction:
      "The redesign prioritizes repeat ordering, menu clarity, and visible delivery context while preserving the familiar brand cues.",
    contribution: ["UX research exercise", "Interaction design", "Mobile UI", "Prototype"],
    behance: "https://www.behance.net/gallery/203879975/Dominos-pizza-Re-design-Case-study",
  },
];

const workEntries: WorkEntry[] = [
  {
    id: projects[0].id,
    number: "01",
    title: projects[0].title,
    discipline: "Product design",
    format: projects[0].type,
    year: projects[0].year,
    summary: projects[0].summary,
    tags: projects[0].contribution,
    accent: "#c8d0ff",
    frames: [{ src: projects[0].image, alt: projects[0].imageAlt, label: "Case-study cover", fit: "landscape" }],
    project: projects[0],
  },
  {
    id: "zest-club",
    number: "02",
    title: "Zest Club",
    discipline: "Visual design",
    format: "Campaign system · Carousel · Social · Standee",
    year: "2026",
    summary: "A bright citrus identity expanded across a seven-frame carousel, a coordinated social set, and an event standee.",
    tags: ["Art direction", "Campaign design", "Typography", "Print adaptation"],
    accent: "#ffd534",
    frames: [
      { src: "/images/work/sheet-zest.png", alt: "Seven-slide Zest Club citrus carousel shown as a complete presentation sheet", label: "Carousel · 7 frames", fit: "landscape" },
      { src: "/images/work/citrus-social.png", alt: "Zest Club Citrus Social campaign across poster and social formats", label: "Social campaign system", fit: "wide" },
      { src: "/images/work/zest-standee.png", alt: "Yellow and cobalt Zest Club citrus pop-up standee", label: "Event standee", fit: "standee" },
    ],
  },
  {
    id: projects[1].id,
    number: "03",
    title: projects[1].title,
    discipline: "Product design",
    format: projects[1].type,
    year: projects[1].year,
    summary: projects[1].summary,
    tags: projects[1].contribution,
    accent: "#b8d5b2",
    frames: [{ src: projects[1].image, alt: projects[1].imageAlt, label: "Case-study cover", fit: "landscape" }],
    project: projects[1],
  },
  {
    id: "phase-01",
    number: "04",
    title: "Design × Engineering",
    discipline: "Visual design",
    format: "Event identity · 6-frame carousel",
    year: "2026",
    summary: "A conference story that brings systems, motion, and AI into one orbital visual language built for digital promotion.",
    tags: ["Visual identity", "Carousel design", "Information hierarchy", "Digital campaign"],
    accent: "#c9f56a",
    frames: [
      { src: "/images/work/phase-01-cover.png", alt: "Phase 01 Design and Engineering conference carousel cover", label: "Campaign cover", fit: "portrait" },
      { src: "/images/work/sheet-phase.png", alt: "Six-slide Design and Engineering conference carousel shown as a complete presentation sheet", label: "Carousel · 6 frames", fit: "landscape" },
    ],
  },
  {
    id: projects[2].id,
    number: "05",
    title: projects[2].title,
    discipline: "Product design",
    format: projects[2].type,
    year: projects[2].year,
    summary: projects[2].summary,
    tags: projects[2].contribution,
    accent: "#c8bdff",
    frames: [{ src: projects[2].image, alt: projects[2].imageAlt, label: "Case-study cover", fit: "landscape" }],
    project: projects[2],
  },
  {
    id: "common-ground",
    number: "06",
    title: "Common Ground",
    discipline: "Visual design",
    format: "Community campaign · Event flyer",
    year: "2026",
    summary: "A warm community open-studio flyer that turns an activity schedule into an inviting, easy-to-scan event story.",
    tags: ["Campaign concept", "Flyer design", "Editorial layout", "Event communication"],
    accent: "#ff8a22",
    frames: [{ src: "/images/work/cg-flyer.png", alt: "Common Ground Open Studio community event flyer", label: "Event flyer", fit: "portrait" }],
  },
  {
    id: projects[3].id,
    number: "07",
    title: projects[3].title,
    discipline: "Product design",
    format: projects[3].type,
    year: projects[3].year,
    summary: projects[3].summary,
    tags: projects[3].contribution,
    accent: "#bfe8d6",
    frames: [{ src: projects[3].image, alt: projects[3].imageAlt, label: "Case-study cover", fit: "landscape" }],
    project: projects[3],
  },
  {
    id: projects[4].id,
    number: "08",
    title: projects[4].title,
    discipline: "Product design",
    format: projects[4].type,
    year: projects[4].year,
    summary: projects[4].summary,
    tags: projects[4].contribution,
    accent: "#ff9e87",
    frames: [{ src: projects[4].image, alt: projects[4].imageAlt, label: "Case-study cover", fit: "landscape" }],
    project: projects[4],
  },
];

function WorkLibrary({ onOpenCaseStudy }: { onOpenCaseStudy: (project: Project) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const active = workEntries[activeIndex];
  const frame = active.frames[frameIndex];

  const selectWork = (index: number) => {
    setActiveIndex(index);
    setFrameIndex(0);
  };

  const moveWork = (direction: number) => {
    selectWork((activeIndex + direction + workEntries.length) % workEntries.length);
  };

  return (
    <div
      className="work-gallery"
      onKeyDown={(event) => {
        if ((event.target as HTMLElement).closest("button, a")) return;
        if (event.key === "ArrowLeft") moveWork(-1);
        if (event.key === "ArrowRight") moveWork(1);
      }}
      tabIndex={0}
      aria-label="Selected work viewer. Use the previous and next buttons or left and right arrow keys."
    >
      <div className="work-gallery__topline">
        <span>Project index</span>
        <span>{String(activeIndex + 1).padStart(2, "0")} of {String(workEntries.length).padStart(2, "0")}</span>
        <span>Use arrows or choose a project</span>
      </div>

      <div className="work-gallery__body" style={{ "--work-accent": active.accent } as CSSProperties}>
        <nav className="work-gallery__index" role="tablist" aria-label="Choose a project">
          {workEntries.map((item, index) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="work-stage"
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => selectWork(index)}
              data-cursor="VIEW"
            >
              <span>{item.number}</span>
              <span><strong>{item.title}</strong><small>{item.discipline}</small></span>
              <i aria-hidden="true">↗</i>
            </button>
          ))}
        </nav>

        <section className="work-gallery__project" id="work-stage" role="tabpanel" aria-live="polite">
          <figure className={`work-gallery__media work-gallery__media--${frame.fit ?? "landscape"}`} key={`${active.id}-${frameIndex}`}>
            <div className="work-gallery__ambient" aria-hidden="true"><span /><span /><span /></div>
            <div className="work-gallery__ghost-title" aria-hidden="true">
              <span>{active.title}</span><span>{active.title}</span>
            </div>
            <div className="work-gallery__media-meta">
              <span>{active.discipline}</span>
              <span>{frame.label}</span>
            </div>
            <div className="work-gallery__image">
              <img src={frame.src} alt={frame.alt} />
            </div>
            <div className="work-gallery__media-controls">
              <button onClick={() => moveWork(-1)} aria-label="Show previous project" data-cursor="PREV">← <span>Previous</span></button>
              {active.frames.length > 1 ? (
                <div aria-label="Choose a project format">
                  {active.frames.map((item, index) => (
                    <button
                      key={item.label}
                      className={index === frameIndex ? "is-active" : ""}
                      onClick={() => setFrameIndex(index)}
                      aria-label={`Show ${item.label}`}
                      aria-pressed={index === frameIndex}
                    ><span />{String(index + 1).padStart(2, "0")}</button>
                  ))}
                </div>
              ) : <span>Single project view</span>}
              <button onClick={() => moveWork(1)} aria-label="Show next project" data-cursor="NEXT"><span>Next</span> →</button>
            </div>
          </figure>

          <article className="work-gallery__details" key={`${active.id}-details`}>
            <div className="work-gallery__title">
              <span>{active.number}</span>
              <h3>{active.title}</h3>
            </div>
            <div className="work-gallery__description">
              <span>{active.format} · {active.year}</span>
              <p>{active.summary}</p>
            </div>
            <div className="work-gallery__meta">
              <ul>{active.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              {active.project ? (
                <button onClick={() => onOpenCaseStudy(active.project!)} data-cursor="OPEN">Open case study <span>↗</span></button>
              ) : (
                <a href={frame.src} target="_blank" rel="noreferrer" data-cursor="OPEN">View full artwork <span>↗</span></a>
              )}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

function ProjectPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("panel-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("panel-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className="project-panel" role="dialog" aria-modal="true" aria-labelledby="project-title">
      <button className="project-panel__scrim" onClick={onClose} aria-label="Close project" />
      <article className={`project-panel__sheet project-panel__sheet--${project.tone}`}>
        <div className="project-panel__topbar">
          <span>{project.number} / Selected work</span>
          <button onClick={onClose} className="project-panel__close">Close ×</button>
        </div>
        <div className="project-panel__hero">
          <p>{project.type}</p>
          <h2 id="project-title">{project.title}</h2>
          <p className="project-panel__lede">{project.summary}</p>
        </div>
        <div className="project-panel__image">
          <img src={project.image} alt={project.imageAlt} />
        </div>
        <div className="project-panel__story">
          <div>
            <span className="eyebrow">Challenge</span>
            <p>{project.challenge}</p>
          </div>
          <div>
            <span className="eyebrow">Design direction</span>
            <p>{project.direction}</p>
          </div>
          <div>
            <span className="eyebrow">Contribution</span>
            <ul>
              {project.contribution.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="project-panel__note">
          <span>Independent concept project</span>
          <p>This portfolio story will be expanded with verified process artifacts and testing evidence in the next content pass.</p>
        </div>
        <a className="project-panel__link" href={project.behance} target="_blank" rel="noreferrer">
          View the original Behance project <span>↗</span>
        </a>
      </article>
    </div>
  );
}

function StudioArtifact({ className, children }: { className: string; children: ReactNode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    drag.current = {
      id: event.pointerId,
      x: event.clientX - offset.x,
      y: event.clientY - offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    setOffset({
      x: event.clientX - drag.current.x,
      y: event.clientY - drag.current.y,
    });
  };

  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    drag.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className={`studio-artifact ${className}`}
      style={{ "--drag-x": `${offset.x}px`, "--drag-y": `${offset.y}px` } as CSSProperties}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      data-cursor="DRAG"
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

function CustomCursor() {
  const cursor = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (event: PointerEvent) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("blur", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div
      ref={cursor}
      className={`custom-cursor${visible ? " is-visible" : ""}${label ? " is-active" : ""}${pressed ? " is-pressed" : ""}`}
      aria-hidden="true"
    >
      <i>✿</i>
      <span>{label}</span>
    </div>
  );
}

const preferredTools = [
  { name: "Illustrator", icon: "/images/tools/illustrator.svg", use: "Identity, illustration and production artwork", color: "#ff9a35", x: 7, y: 63, rotate: -15 },
  { name: "Photoshop", icon: "/images/tools/photoshop.svg", use: "Image-making, campaigns and compositing", color: "#56b8ff", x: 12, y: 29, rotate: 10 },
  { name: "Figma", icon: "/images/tools/figma.svg", use: "Interface systems, prototypes and collaboration", color: "#f24e1e", x: 27, y: 10, rotate: -8 },
  { name: "Framer", icon: "/images/tools/framer.svg", use: "Interactive portfolio and web experiments", color: "#9d8cff", x: 42, y: 4, rotate: 7 },
  { name: "Canva", icon: "/images/tools/canva.svg", use: "Fast-moving branded communication", color: "#52e0dc", x: 58, y: 8, rotate: -6 },
  { name: "CorelDRAW", icon: "/images/tools/coreldraw.svg", use: "Print and production-ready graphics", color: "#74d67c", x: 73, y: 20, rotate: 11 },
  { name: "PowerPoint", icon: "/images/tools/powerpoint.svg", use: "Presentations and corporate storytelling", color: "#f18768", x: 86, y: 42, rotate: -9 },
  { name: "Miro", icon: "/images/tools/miro.svg", use: "Workshops, mapping and early-stage thinking", color: "#ffd95c", x: 87, y: 69, rotate: 8 },
  { name: "Google Stitch", icon: "/images/tools/stitch.png", use: "AI-assisted UI exploration and rapid screen concepts", color: "#8ab4f8", x: 79, y: 86, rotate: -7, fullColor: true },
  { name: "Notion", icon: "/images/tools/notion.svg", use: "Research, notes and project structure", color: "#f5f2e9", x: 65, y: 91, rotate: 5 },
  { name: "Lovable", icon: "/images/tools/lovable.svg", use: "Turning product ideas into fast, testable web prototypes", color: "#ff9ce4", x: 52, y: 86, rotate: -8, fullColor: true },
  { name: "Adobe Firefly", icon: "/images/tools/firefly.svg", use: "Visual exploration and AI-assisted ideation", color: "#ff6f9a", x: 39, y: 92, rotate: 6, fullColor: true },
  { name: "ChatGPT", icon: "/images/tools/chatgpt.svg", use: "Research, content exploration and idea expansion", color: "#83e0bf", x: 26, y: 83, rotate: -10 },
  { name: "Webflow", icon: "/images/tools/webflow.svg", use: "Responsive web concepts and no-code publishing", color: "#6f9cff", x: 13, y: 82, rotate: 9 },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [practiceProgress, setPracticeProgress] = useState(0);
  const heroShell = useRef<HTMLElement | null>(null);
  const practiceShell = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const updateHero = () => {
      if (!heroShell.current) return;
      const rect = heroShell.current.getBoundingClientRect();
      const distance = Math.max(1, heroShell.current.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      setHeroProgress(progress);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateHero);
    };
    updateHero();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updatePractice = () => {
      if (!practiceShell.current) return;
      const rect = practiceShell.current.getBoundingClientRect();
      const distance = Math.max(1, rect.height + window.innerHeight);
      setPracticeProgress(Math.min(1, Math.max(0, (window.innerHeight - rect.top) / distance)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updatePractice);
    };
    updatePractice();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const nameOpacity = 1 - Math.min(1, Math.max(0, (heroProgress - 0.78) / 0.22));
  const brandOpacity = Math.min(1, Math.max(0, (heroProgress - 0.72) / 0.2));
  const sceneOpacity = Math.max(0, 1 - heroProgress * 1.35);
  const transitionOpacity = Math.min(1, Math.max(0, (heroProgress - 0.46) / 0.3));
  const heroStyle = {
    "--dock-x": `${heroProgress * -40}vw`,
    "--dock-y": `${heroProgress * -45}vh`,
    "--dock-scale": `${1 - heroProgress * 0.84}`,
    "--name-opacity": `${nameOpacity}`,
    "--scene-opacity": `${sceneOpacity}`,
    "--scene-scale": `${1 + heroProgress * 0.12}`,
    "--transition-opacity": `${transitionOpacity}`,
    "--transition-scale": `${0.88 + transitionOpacity * 0.12}`,
    "--transition-turn": `${heroProgress * 18}deg`,
  } as CSSProperties;
  const practiceStyle = {
    "--practice-progress": practiceProgress,
    "--ribbon-shift": `${(practiceProgress - 0.5) * 18}vw`,
    "--object-rise": `${(0.5 - practiceProgress) * 7}rem`,
  } as CSSProperties;

  return (
    <main>
      <CustomCursor />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ananya Saini, home" style={{ opacity: brandOpacity }}>
          <span>AS</span>
          <span>Ananya Saini</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="availability" href="#contact"><span /> Available for opportunities</a>
      </header>

      <section className="hero-shell" ref={heroShell} style={heroStyle} id="top">
        <div className="hero-studio">
          <div className="hero-studio__topline">
            <span>Visual Communication + UI/UX Designer</span>
            <span>Nagpur, India · Open to opportunities</span>
          </div>

          <div className="hero-studio__intro">
            <p>Ideas that travel from</p>
            <h1 className="hero-studio__name" aria-label="Ananya Saini">
              <span>Ananya</span>
              <span>Saini<span className="hero-studio__dot">.</span></span>
            </h1>
            <p>screens to spaces.</p>
          </div>

          <div className="hero-studio__scene">
            <StudioArtifact className="studio-artifact--type">
              <span>Type study / 01</span>
              <strong>Aa</strong>
              <small>Clarity has a voice.</small>
            </StudioArtifact>

            <StudioArtifact className="studio-artifact--ui">
              <span className="mini-window__bar"><i /><i /><i /></span>
              <span className="mini-window__content"><b /><b /><b /></span>
              <small>PRODUCT / FLOW</small>
            </StudioArtifact>

            <StudioArtifact className="studio-artifact--poster">
              <span>MAKE</span><span>IT</span><span>LAND.</span>
              <small>Campaign thinking</small>
            </StudioArtifact>

            <StudioArtifact className="studio-artifact--swatches">
              <i /><i /><i /><i />
              <small>04 / COLOR SYSTEM</small>
            </StudioArtifact>

            <StudioArtifact className="studio-artifact--space">
              <span>WALL 03</span>
              <b>Ideas<br />belong<br />everywhere.</b>
              <small>Environmental graphics</small>
            </StudioArtifact>

            <StudioArtifact className="studio-artifact--stamp">
              <strong>100+</strong>
              <small>creatives delivered</small>
            </StudioArtifact>

            <div className="studio-note" aria-hidden="true">Drag the pieces →</div>
          </div>

          <div className="hero-transition" aria-hidden="true">
            <div className="hero-transition__orbit"><span /><span /><span /></div>
            <div className="hero-transition__portal">
              <small>The visual practice / enter here</small>
              <strong>Ideas need<br /><em>somewhere</em><br />to land.</strong>
              <span>Scroll into the studio ↓</span>
            </div>
            <div className="hero-transition__word hero-transition__word--one">SCREEN</div>
            <div className="hero-transition__word hero-transition__word--two">STORY</div>
            <div className="hero-transition__word hero-transition__word--three">SPACE</div>
            <div className="hero-transition__tile hero-transition__tile--one"><small>01</small><strong>Message</strong></div>
            <div className="hero-transition__tile hero-transition__tile--two"><small>02</small><strong>Medium</strong></div>
            <div className="hero-transition__tile hero-transition__tile--three"><small>03</small><strong>Meaning</strong></div>
          </div>

          <a className="hero-studio__scroll" href="#practice-map">
            <span>Scroll to see ideas leave the screen</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section
        className="practice-map"
        id="practice-map"
        aria-label="Ananya's design practice"
        ref={practiceShell}
        style={practiceStyle}
      >
        <div className="practice-map__grain" aria-hidden="true" />
        <div className="practice-map__intro">
          <span className="eyebrow">00 / Inside the visual studio</span>
          <h2>My work doesn’t stay<br /><em>inside a frame.</em></h2>
          <p>
            It begins with a message, then finds the right surface—a screen,
            poster, presentation, campaign, event, or physical space.
          </p>
        </div>

        <div className="practice-map__stage" aria-hidden="true">
          <div className="practice-object practice-object--window">
            <span className="practice-window__bar"><i /><i /><i /></span>
            <div className="practice-window__body"><b>UI</b><span /><span /><span /></div>
            <small>PRODUCT / INTERFACE</small>
          </div>
          <div className="practice-object practice-object--poster">
            <small>CAMPAIGN / 03</small>
            <strong>MAKE<br />THE<br />MESSAGE<br /><em>MOVE.</em></strong>
          </div>
          <div className="practice-object practice-object--print">
            <span>A4</span>
            <b>PRINT<br />READY</b>
            <small>CMYK / 300 DPI</small>
          </div>
          <div className="practice-object practice-object--space">
            <small>ENVIRONMENT / WAYFINDING</small>
            <strong>IDEAS<br />BELONG<br />EVERYWHERE.</strong>
          </div>
          <div className="practice-map__center">
            <span>Visual communication<br />with product thinking</span>
            <strong>SCREEN<br /><em>TO</em> SPACE.</strong>
            <a href="#work" data-cursor="OPEN">Explore selected work <span>↗</span></a>
          </div>
        </div>

        <div className="discipline-ribbon discipline-ribbon--top" aria-hidden="true">
          <div>
            <span>BRAND SYSTEMS</span><i>✦</i><span>CAMPAIGN DESIGN</span><i>✦</i><span>VISUAL COMMUNICATION</span><i>✦</i>
            <span>BRAND SYSTEMS</span><i>✦</i><span>CAMPAIGN DESIGN</span><i>✦</i><span>VISUAL COMMUNICATION</span><i>✦</i>
          </div>
        </div>
        <div className="discipline-ribbon discipline-ribbon--bottom" aria-hidden="true">
          <div>
            <span>UI/UX DESIGN</span><i>✦</i><span>PRINT &amp; PRODUCTION</span><i>✦</i><span>ENVIRONMENTAL GRAPHICS</span><i>✦</i><span>EVENT BRANDING</span><i>✦</i>
            <span>UI/UX DESIGN</span><i>✦</i><span>PRINT &amp; PRODUCTION</span><i>✦</i><span>ENVIRONMENTAL GRAPHICS</span><i>✦</i><span>EVENT BRANDING</span><i>✦</i>
          </div>
        </div>

        <div className="practice-map__legend">
          <span>8 disciplines</span><span>1 visual point of view</span><span>Scroll responsibly ↓</span>
        </div>
      </section>

      <section className="proof" aria-label="Experience highlights">
        <div className="proof__item">
          <strong>100+</strong>
          <span>digital and print creatives delivered</span>
        </div>
        <div className="proof__item">
          <strong>5</strong>
          <span>cross-functional teams collaborated with</span>
        </div>
        <div className="proof__item proof__item--wide">
          <span>Currently shaping brand communication at</span>
          <strong>Ascent Business Solutions</strong>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="work-heading">
          <div className="work-heading__meta">
            <span className="eyebrow">01 / Selected work</span>
            <span>08 projects · Product + visual design</span>
          </div>
          <h2>Work that moves<br />between <em>screens &amp; stories.</em></h2>
          <div className="work-heading__foot">
            <p>One curated library of interface case studies, visual systems, campaigns, carousels, and print communication.</p>
            <span>Choose a title to begin ↓</span>
          </div>
        </div>
        <div className="work-ticker" aria-hidden="true">
          <div>
            <span>UI/UX CASE STUDIES</span><i>✦</i><span>CAMPAIGN SYSTEMS</span><i>✦</i><span>CAROUSEL DESIGN</span><i>✦</i><span>PRINT &amp; EVENTS</span><i>✦</i>
            <span>UI/UX CASE STUDIES</span><i>✦</i><span>CAMPAIGN SYSTEMS</span><i>✦</i><span>CAROUSEL DESIGN</span><i>✦</i><span>PRINT &amp; EVENTS</span><i>✦</i>
          </div>
        </div>
        <WorkLibrary onOpenCaseStudy={setActiveProject} />
      </section>

      <section className="practice section" aria-label="Design practice">
        <div className="practice__headline">
          <span className="eyebrow">02 / Practice</span>
          <h2>From first sketch to final production file.</h2>
        </div>
        <div className="practice__grid">
          <article>
            <span>01</span>
            <h3>Find the signal</h3>
            <p>Understand the audience, the context, and what the design truly needs to communicate.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Shape the system</h3>
            <p>Build hierarchy, typography, color, components, and visual rules that can grow together.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Make it real</h3>
            <p>Prototype, refine, prepare production-ready assets, and collaborate through handoff.</p>
          </article>
        </div>
      </section>

      <section className="tools-orbit" id="tools" aria-label="Preferred design tools">
        <div className="tools-orbit__heading">
          <span className="eyebrow">03 / Preferred tools</span>
          <h2>My creative<br /><em>constellation.</em></h2>
          <p>Tools are chosen for the job—not the other way around. Hover to see where each one fits in Ananya’s workflow.</p>
        </div>
        <div className="tools-orbit__stage">
          <div className="tools-orbit__rings" aria-hidden="true"><span /><span /><span /></div>
          <div className="tools-orbit__center">
            <span>It’s not magic.</span>
            <strong>It’s curiosity,<br />craft <em>&amp; iteration.</em></strong>
          </div>
          <ul className="tools-orbit__list">
            {preferredTools.map((tool, index) => (
              <li
                key={tool.name}
                className="tool-chip"
                style={{
                  "--tool-x": `${tool.x}%`,
                  "--tool-y": `${tool.y}%`,
                  "--tool-rotate": `${tool.rotate}deg`,
                  "--tool-color": tool.color,
                  "--tool-delay": `${index * -0.32}s`,
                } as CSSProperties}
                data-cursor="INSPECT"
                tabIndex={0}
              >
                <span className={`tool-chip__mark${tool.fullColor ? " tool-chip__mark--color" : ""}`}>
                  {tool.fullColor ? (
                    <img src={tool.icon} alt="" />
                  ) : (
                    <i className="tool-chip__glyph" style={{ "--tool-icon": `url(${tool.icon})` } as CSSProperties} />
                  )}
                </span>
                <span className="tool-chip__tooltip">
                  <strong>{tool.name}</strong>
                  <small>{tool.use}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="tools-orbit__footnote">Including AI as a thinking partner—not a substitute for design judgment.</p>
      </section>

      <section className="experience section" id="experience" aria-label="Professional experience">
        <div className="experience__heading">
          <span className="eyebrow">04 / Experience</span>
          <h2>Design that moves across <em>screens, spaces,</em> and teams.</h2>
          <p>
            Her professional practice combines high-volume visual communication
            with product thinking, brand consistency, and production detail.
          </p>
        </div>

        <article className="experience-card experience-card--current">
          <span className="experience-card__chapter" aria-hidden="true">01</span>
          <div className="experience-card__meta">
            <span>July 2025 — Present</span>
            <span>Nagpur</span>
          </div>
          <div className="experience-card__title">
            <div>
              <span className="eyebrow">Current role</span>
              <h3>Ascent Business Solutions</h3>
            </div>
            <strong>Visual Communication<br />& Graphic Designer</strong>
            <div className="experience-card__stamp">
              <strong>100+</strong>
              <span>assets across digital, print &amp; space</span>
            </div>
          </div>
          <div className="experience-card__body">
            <p className="experience-card__lead">
              Creates internal communication, employer-branding, campaign,
              event, presentation, print, and environmental graphics for a
              fast-moving corporate environment.
            </p>
            <div className="experience-card__columns">
              <div>
                <span className="eyebrow">Communication</span>
                <p>Employee milestones · Hiring · Onboarding · L&amp;D initiatives · Compliance awareness · Indian and US festivals</p>
              </div>
              <div>
                <span className="eyebrow">Brand in space</span>
                <p>Office rebranding · Elevator vinyls · Wall murals · Cafeteria graphics · Pillars · Glass graphics · Event environments</p>
              </div>
              <div>
                <span className="eyebrow">Collaboration</span>
                <p>HR · Compliance · Learning &amp; Development · Administration · Leadership</p>
              </div>
            </div>
          </div>
          <div className="experience-card__note">
            <span>Confidentiality respected</span>
            <p>Professional scope is described here without publishing internal company artwork or restricted materials.</p>
          </div>
        </article>

        <article className="experience-card experience-card--previous">
          <span className="experience-card__chapter" aria-hidden="true">02</span>
          <div className="experience-card__meta">
            <span>September 2022 — March 2023</span>
            <span>Nagpur</span>
          </div>
          <div className="experience-card__title">
            <div>
              <span className="eyebrow">Previous role</span>
              <h3>AT Creation</h3>
            </div>
            <strong>UI/UX Designer</strong>
            <div className="experience-card__stamp">
              <strong>UI</strong>
              <span>flows · testing · handoff</span>
            </div>
          </div>
          <div className="experience-card__body experience-card__body--previous">
            <p className="experience-card__lead">
              Designed user flows and interfaces, tested usability, and turned
              feedback into clearer product experiences while supporting brand
              and marketing needs for startups and small businesses.
            </p>
            <div className="experience-card__previous-story">
              <div className="experience-card__tags" aria-label="AT Creation responsibilities">
                <span>Wireframing</span><span>Prototyping</span><span>Usability testing</span>
                <span>Brand identity</span><span>Campaign design</span><span>Developer handoff</span>
              </div>
              <div className="experience-process" aria-label="UI UX workflow at AT Creation">
                <span><b>01</b><strong>Understand</strong><small>brief + user need</small></span>
                <span><b>02</b><strong>Map</strong><small>flows + structure</small></span>
                <span><b>03</b><strong>Prototype</strong><small>interfaces + states</small></span>
                <span><b>04</b><strong>Refine</strong><small>feedback + handoff</small></span>
              </div>
              <div className="experience-card__handoff">
                <span>Messy brief</span><i aria-hidden="true">→</i><strong>Clearer product decision</strong>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="about-board" id="about" aria-label="About Ananya">
        <div className="about-board__heading">
          <span className="eyebrow">05 / A little more human</span>
          <h2>Hello, I’m <em>Ananya!</em></h2>
          <p>I read the room, notice the little things, and turn complicated messages into visual experiences that feel clear.</p>
        </div>

        <div className="about-board__canvas">
          <div className="about-board__portrait" data-cursor="HELLO">
            <img src="/images/ananya-profile.png" alt="Ananya Saini" />
            <span>Hi!</span>
          </div>

          <div className="about-scrap about-scrap--intro">
            <strong>Designer.<br />Observer.<br /><em>Detail person.</em></strong>
            <p>Based in Nagpur, designing across screens, stories, and spaces.</p>
          </div>
          <div className="about-scrap about-scrap--manifesto">
            <span>MY DESIGN COMPASS</span>
            <strong>CLARITY<br />&gt; CLUTTER</strong>
            <i>always.</i>
          </div>
          <div className="about-scrap about-scrap--song" data-cursor="PLAY">
            <span>♫ CURRENTLY ON REPEAT</span>
            <strong>All the Stars</strong>
            <small>Kendrick Lamar &amp; SZA · 03:52</small>
            <a
              className="about-scrap__song-link"
              href="https://open.spotify.com/track/3GCdLUSnKSMJhs4Tj6CV3s"
              target="_blank"
              rel="noreferrer"
              aria-label="Play All the Stars by Kendrick Lamar and SZA on Spotify"
            >
              <span>Play on Spotify</span><b aria-hidden="true">↗</b>
            </a>
            <i aria-hidden="true"><b /><b /><b /><b /><b /><b /></i>
          </div>
          <div className="about-scrap about-scrap--note">
            <span>A NOTE TO SELF</span>
            <p>Good design gets attention.<br /><strong>Clear design earns trust.</strong></p>
          </div>
          <div className="about-scrap about-scrap--photo-one">
            <div><img src="/images/ananya-mirror.jpg" alt="Ananya taking a mirror portrait" /><span>PHOTO DROP / 01</span></div>
            <small>an everyday Ananya moment</small>
          </div>
          <div className="about-scrap about-scrap--photo-two">
            <div><img src="/images/ananya-office.jpg" alt="Ananya’s decorated office workspace" /><span>PHOTO DROP / 02</span></div>
            <small>a little life at the office</small>
          </div>
          <div className="about-scrap about-scrap--coordinates">
            <strong>21.1458° N<br />79.0882° E</strong>
            <span>Nagpur, India</span>
          </div>
          <div className="about-board__spark about-board__spark--one">✦</div>
          <div className="about-board__spark about-board__spark--two">✳</div>
          <div className="about-board__arrow">scroll for the serious stuff ↓</div>
        </div>

        <div className="about-board__bio">
          <p>
            I’m a visual communication and UI/UX designer whose work moves between digital products, internal communications, brand systems, campaigns, print, and environmental graphics. Whatever the format, I care about hierarchy, usefulness, and a strong visual point of view.
          </p>
          <div>
            <span className="eyebrow">Core strengths</span>
            <p>UI/UX design · Visual communication · Brand systems · Campaign design · Environmental graphics · Production workflows</p>
          </div>
        </div>
      </section>

      <section className="education" aria-label="Education">
        <span className="eyebrow">Education</span>
        <strong>B.Tech · Computer Science Engineering</strong>
        <span>Dr. Babasaheb Ambedkar Technological University · 2020—2024</span>
      </section>

      <section className="contact section" id="contact">
        <span className="eyebrow">06 / Contact</span>
        <h2>Have a thoughtful problem?<br /><em>Let’s make it clear.</em></h2>
        <div className="contact__links">
          <a href="mailto:saini.ananya2003@gmail.com">Email Ananya <span>↗</span></a>
          <a href="https://www.behance.net/sainiananya" target="_blank" rel="noreferrer">Behance <span>↗</span></a>
          <a href="https://www.linkedin.com/in/ananyasaini2003/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
        </div>
        <footer>
          <span>© 2026 Ananya Saini</span>
          <span>Designed with intent, built with care.</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>

      {activeProject && <ProjectPanel project={activeProject} onClose={() => setActiveProject(null)} />}
    </main>
  );
}

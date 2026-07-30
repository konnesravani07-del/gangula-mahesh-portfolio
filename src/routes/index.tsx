import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Download,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  MessageCircle,
  Send,
  ExternalLink,
  FileText,
  HardHat,
  Ruler,
  Hammer,
  ClipboardList,
  ShieldCheck,
  Users,
  Wrench,
  Building2,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPinned,
  Cpu,
  Layers,
  Boxes,
  Compass,
  Sparkles,
  Eye,
} from "lucide-react";
import { SITE, ASSETS, waLink, telLink, mailLink } from "@/lib/site";
import { BlueprintBg } from "@/components/BlueprintBg";
import { CertificateModal } from "@/components/CertificateModal";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gangula Mahesh — Civil Site Engineer Portfolio" },
      {
        name: "description",
        content:
          "Civil Site Engineer with site execution, drawing analysis, quantity surveying, ETABS, STAAD Pro, and AutoCAD experience. View projects, certificates and resume.",
      },
      { property: "og:title", content: "Gangula Mahesh — Civil Site Engineer" },
      {
        property: "og:description",
        content:
          "Portfolio of a Civil Site Engineer specializing in construction, execution and quality engineering.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  useReveal();
  const [cert, setCert] = useState<{ url: string; title: string } | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero onView={() => scrollTo("projects")} onHire={() => scrollTo("contact")} />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Certificates onOpen={(c) => setCert(c)} />
      <Achievements />
      <ResumeSection />
      <Contact />
      <CertificateModal
        open={!!cert}
        onClose={() => setCert(null)}
        url={cert?.url}
        title={cert?.title}
      />
    </>
  );
}

/* ---------- HERO ---------- */
function Hero({ onView, onHire }: { onView: () => void; onHire: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 md:pt-28 pb-16 overflow-hidden bg-gradient-to-b from-blue-soft/50 via-background to-background"
    >
      <BlueprintBg />
      <div
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-40"
        style={{ background: "radial-gradient(closest-side, oklch(0.71 0.18 45 / 0.25), transparent)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full opacity-40"
        style={{ background: "radial-gradient(closest-side, oklch(0.63 0.18 258 / 0.22), transparent)" }}
      />

      <div className="container-x relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-12 animate-slide-left text-center flex flex-col items-center">
          <div className="eyebrow mb-5">Civil Site Engineer · Nalgonda</div>
          <h1 className="font-display text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem] font-bold text-primary">
            Building with{" "}
            <span className="relative inline-block">
              <span className="relative z-10">precision.</span>
              <span className="absolute left-0 right-0 bottom-1.5 h-3 bg-accent/25 -z-0 rounded-sm" />
            </span>
            <br />
            <span className="text-ink">Engineering with</span>{" "}
            <span className="text-secondary">purpose.</span>
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-mono text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <HardHat className="w-4 h-4 text-accent" /> {SITE.name}
            </span>
            <span className="text-hairline">/</span>
            <span>{SITE.role}</span>
          </div>
          <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">
            {SITE.tagline} Focused on site execution, drawing analysis, quantity
            surveying and quality control on live construction projects.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={ASSETS.resume}
              download={ASSETS.resumeFilename}
              className="btn-primary"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
            <button onClick={onHire} className="btn-accent">
              <Send className="w-4 h-4" /> Hire Me
            </button>
            <button onClick={onView} className="btn-ghost">
              View Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-md">
            <Counter value={8} suffix="+" label="Months on-site" />
            <Counter value={2} suffix="" label="Live projects" />
            <Counter value={3} suffix="" label="Certifications" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatCard({
  className = "",
  icon,
  title,
  sub,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div
      className={`absolute z-10 items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-hairline shadow-lift flex ${className}`}
    >
      <div className="w-8 h-8 rounded-lg bg-blue-soft grid place-items-center">{icon}</div>
      <div className="text-left">
        <div className="text-[11px] font-mono uppercase tracking-widest text-ink-soft">{sub}</div>
        <div className="text-sm font-semibold text-primary leading-tight">{title}</div>
      </div>
    </div>
  );
}

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const duration = 1200;
            const start = performance.now();
            const step = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div ref={ref}>
      <div className="font-display text-2xl sm:text-3xl font-bold text-primary">
        {n}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-[11px] sm:text-xs text-ink-soft mt-0.5 uppercase tracking-wider font-mono">
        {label}
      </div>
    </div>
  );
}

/* ---------- SECTION HEADER ---------- */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`reveal ${align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}`}>
      <div className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-ink-soft text-base sm:text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const pillars = [
    { icon: HardHat, title: "Site Execution", desc: "Turning drawings into structures on active job sites." },
    { icon: Ruler, title: "Drawing Analysis", desc: "Reading & interpreting structural and architectural plans." },
    { icon: ClipboardList, title: "Material Planning", desc: "BOQ-based procurement, tracking and reconciliation." },
    { icon: ShieldCheck, title: "Quality & Safety", desc: "Cube tests, checklists and PPE enforcement." },
    { icon: Users, title: "Team Coordination", desc: "Aligning contractors, vendors and labour to daily targets." },
    { icon: FileText, title: "Reports & Approvals", desc: "Daily/monthly reports; drawing & material approvals." },
  ];
  return (
    <section id="about" className="section-pad">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="About Me"
            title="Civil Engineering graduate turning drawings into buildings."
            subtitle="I studied Civil Engineering at Vignan Institute of Technology & Science (JNTU Hyderabad, 2023) and stepped straight onto the site. My focus is disciplined execution — where every column, beam and pour is checked against the drawing, the BOQ and the safety plan."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {["Construction", "Site Execution", "Quality Control", "Drawing Analysis"].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-soft text-primary border border-hairline"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal card-base card-hover p-5"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/5 text-primary grid place-items-center border border-hairline">
                <p.icon className="w-5 h-5" />
              </div>
              <div className="mt-4 font-display text-lg text-primary">{p.title}</div>
              <div className="mt-1.5 text-sm text-ink-soft leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- EXPERIENCE ---------- */
function Experience() {
  const jobs = [
    {
      current: true,
      company: "AK Constructions",
      role: "Site Engineer",
      period: "Present",
      location: "Telangana, India",
      points: [
        "Execute daily site activities as per approved drawings and specifications.",
        "Coordinate with sub-contractors, vendors and site labour to meet daily targets.",
        "Enforce quality & safety standards at every stage of construction.",
      ],
    },
    {
      current: false,
      company: "RKGS Construction India LLP",
      role: "Site Engineer",
      period: "8 months",
      location: "Telangana, India",
      points: [
        "Studied and analysed drawings to plan and execute the work on site.",
        "Prepared material requirement lists and tracked procurement as per BOQ.",
        "Maintained daily & monthly progress reports for the project team.",
        "Used DGPS and electronic surveying equipment for accurate site measurements.",
      ],
    },
  ];

  return (
    <section id="experience" className="section-pad bg-white border-y border-hairline">
      <div className="container-x">
        <SectionHeader
          eyebrow="Experience"
          title="On-site, hands-on execution."
          subtitle="A timeline of the projects and roles that shaped my approach to construction."
        />

        <div className="mt-12 relative">
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-secondary via-hairline to-transparent md:-translate-x-1/2" />
          <div className="space-y-10">
            {jobs.map((job, i) => (
              <div
                key={job.company}
                className={`reveal relative md:grid md:grid-cols-2 md:gap-10 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                }`}
              >
                <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className="card-base card-hover p-6 md:p-7 inline-block w-full text-left">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue">
                      <Calendar className="w-3.5 h-3.5" /> {job.period}
                      {job.current && (
                        <span className="ml-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-xl text-primary">{job.role}</h3>
                    <div className="text-sm text-ink font-semibold">{job.company}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
                      <MapPinned className="w-3.5 h-3.5" /> {job.location}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-2 text-sm text-ink-soft leading-relaxed">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block" />
                <div className="absolute left-4 md:left-1/2 top-6 md:-translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-secondary shadow-brand">
                  <div className="absolute inset-1 rounded-full bg-secondary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- EDUCATION ---------- */
function Education() {
  const items = [
    {
      degree: "B.Tech in Civil Engineering",
      inst: "Vignan Institute of Technology & Science",
      board: "JNTU Hyderabad",
      year: "2023",
      score: "65%",
    },
    {
      degree: "Intermediate (M.P.C)",
      inst: "MJPTBCWR Junior College",
      board: "Telangana State Board of Intermediate Education",
      year: "2019",
      score: "69%",
    },
    {
      degree: "SSC",
      inst: "Z.P.H.S Appajipeta, Nalgonda",
      board: "Board of Secondary Education Telangana",
      year: "2016",
      score: "6.8 GPA",
    },
  ];
  return (
    <section id="education" className="section-pad">
      <div className="container-x">
        <SectionHeader eyebrow="Education" title="Academic foundation." />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div
              key={it.degree}
              className="reveal card-base card-hover p-6 relative overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 -translate-y-8 translate-x-8 rounded-full bg-blue-soft" />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-primary text-white grid place-items-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="mt-4 font-display text-primary text-lg leading-snug">
                  {it.degree}
                </div>
                <div className="mt-1 text-sm text-ink font-medium">{it.inst}</div>
                <div className="text-xs text-ink-soft mt-1">{it.board}</div>
                <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
                  <span className="text-xs uppercase tracking-widest font-mono text-ink-soft">
                    {it.year}
                  </span>
                  <span className="text-sm font-semibold text-accent">{it.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROJECTS ---------- */
function Projects() {
  const list = [
    {
      tag: "Major Project",
      title:
        "Durability Performance of Concrete using Sugarcane Bagasse Ash & Recron Fibre",
      desc: "Experimental study on replacing part of the cement with sugarcane bagasse ash and reinforcing the mix with Recron fibre to evaluate long-term durability, water absorption and compressive strength.",
      chips: ["Concrete Mix Design", "Durability Testing", "Sustainable Materials"],
      illustration: <ConcreteIllustration />,
    },
    {
      tag: "Mini Project",
      title: "Analysis of G+5 Residential Building using STAAD Pro",
      desc: "Complete structural analysis and design of a G+5 residential building — modelling, load combinations, and design checks for beams, columns and slabs using STAAD Pro.",
      chips: ["STAAD Pro", "Structural Analysis", "G+5 Building"],
      illustration: <BuildingIllustration />,
    },
  ];

  return (
    <section id="projects" className="section-pad bg-white border-y border-hairline">
      <div className="container-x">
        <SectionHeader
          eyebrow="Projects"
          title="Selected engineering work."
          subtitle="Academic and applied projects where I explored materials, structural design and site-ready workflows."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {list.map((p, i) => (
            <article
              key={p.title}
              className="reveal card-base card-hover overflow-hidden group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[16/9] bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
                <div className="absolute inset-0 opacity-30 grid-blueprint" />
                <div className="absolute inset-0 grid place-items-center text-white/90">
                  {p.illustration}
                </div>
                <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent text-white font-semibold">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-primary leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.chips.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted text-ink border border-hairline"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildingIllustration() {
  return (
    <svg viewBox="0 0 260 180" className="w-3/5 h-3/5" fill="none" stroke="currentColor" strokeWidth="1.5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="70" y={30 + i * 22} width="120" height="22" />
          <rect x="80" y={35 + i * 22} width="12" height="12" fill="currentColor" opacity="0.25" />
          <rect x="98" y={35 + i * 22} width="12" height="12" fill="currentColor" opacity="0.25" />
          <rect x="116" y={35 + i * 22} width="12" height="12" fill="currentColor" opacity="0.25" />
          <rect x="134" y={35 + i * 22} width="12" height="12" fill="currentColor" opacity="0.25" />
          <rect x="152" y={35 + i * 22} width="12" height="12" fill="currentColor" opacity="0.25" />
          <rect x="170" y={35 + i * 22} width="12" height="12" fill="currentColor" opacity="0.25" />
        </g>
      ))}
      <line x1="55" y1="162" x2="205" y2="162" strokeWidth="2" />
      <line x1="55" y1="162" x2="55" y2="168" />
      <line x1="205" y1="162" x2="205" y2="168" />
    </svg>
  );
}

function ConcreteIllustration() {
  return (
    <svg viewBox="0 0 260 180" className="w-3/5 h-3/5" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="130" cy="90" r="60" />
      <circle cx="130" cy="90" r="42" opacity="0.6" />
      <circle cx="130" cy="90" r="24" opacity="0.4" />
      <line x1="70" y1="90" x2="190" y2="90" strokeDasharray="4 4" />
      <line x1="130" y1="30" x2="130" y2="150" strokeDasharray="4 4" />
      <circle cx="110" cy="72" r="3" fill="currentColor" />
      <circle cx="150" cy="82" r="4" fill="currentColor" />
      <circle cx="122" cy="108" r="3.5" fill="currentColor" />
      <circle cx="148" cy="118" r="2.5" fill="currentColor" />
    </svg>
  );
}

/* ---------- SKILLS ---------- */
function Skills() {
  const skills = [
    { name: "AutoCAD", icon: Ruler, level: 85 },
    { name: "ETABS", icon: Layers, level: 75 },
    { name: "STAAD Pro", icon: Building2, level: 78 },
    { name: "Quantity Surveying", icon: ClipboardList, level: 80 },
    { name: "MS Office", icon: FileText, level: 90 },
    { name: "DGPS Machine", icon: Compass, level: 72 },
    { name: "Site Execution", icon: HardHat, level: 88 },
    { name: "Material Planning", icon: Boxes, level: 82 },
    { name: "Team Coordination", icon: Users, level: 86 },
    { name: "Safety Management", icon: ShieldCheck, level: 84 },
  ];

  return (
    <section id="skills" className="section-pad">
      <div className="container-x">
        <SectionHeader
          eyebrow="Skills"
          title="Software, site & soft skills."
          subtitle="A working toolkit that spans structural software, surveying equipment and day-to-day site coordination."
        />

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.map((s, i) => (
            <div
              key={s.name}
              className="reveal card-base card-hover p-5 group"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-primary text-white grid place-items-center shadow-brand group-hover:scale-110 transition-transform">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="mt-4 font-semibold text-primary">{s.name}</div>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <SkillBar level={s.level} />
              </div>
              <div className="mt-1.5 text-[11px] font-mono text-ink-soft">{s.level}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setW(level), 100);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [level]);
  return (
    <div
      ref={ref}
      className="h-full rounded-full bg-gradient-to-r from-secondary to-accent transition-[width] duration-[1200ms] ease-out"
      style={{ width: `${w}%` }}
    />
  );
}

/* ---------- CERTIFICATES ---------- */
function Certificates({
  onOpen,
}: {
  onOpen: (c: { url: string; title: string }) => void;
}) {
  return (
    <section id="certificates" className="section-pad bg-white border-y border-hairline">
      <div className="container-x">
        <SectionHeader
          eyebrow="Certificates"
          title="Verified credentials."
          subtitle="Click any certificate to view it in full screen."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ASSETS.certificates.map((c, i) => (
            <button
              key={c.id}
              onClick={() => onOpen({ url: c.url, title: c.title })}
              className="reveal group text-left card-base card-hover overflow-hidden relative"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                <img
                  src={c.url}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/95 text-primary text-xs font-semibold">
                    <Eye className="w-3.5 h-3.5" /> View Certificate
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 backdrop-blur text-[10px] font-mono uppercase tracking-widest text-blue border border-white/50">
                    <Award className="w-3 h-3" /> {c.date}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-ink-soft">{c.issuer}</div>
                <div className="mt-1 font-display text-primary leading-snug">{c.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ACHIEVEMENTS ---------- */
function Achievements() {
  const items = [
    {
      icon: Cpu,
      title: "Internship in ETABS & Quantity Surveying",
      desc: "35-day intensive training at CIVIL Edu covering structural modelling and BOQ estimation.",
    },
    {
      icon: BookOpen,
      title: "Civil Engineering Conference — NCICE 2K23",
      desc: "Participated at Karpagam Academy of Higher Education, presenting the STAAD Pro analysis project.",
    },
    {
      icon: Wrench,
      title: "AutoCAD 2D Workshop",
      desc: "Graded 'A' by Learn Delta after completing the AutoCAD 2D final examination.",
    },
  ];
  return (
    <section id="achievements" className="section-pad">
      <div className="container-x">
        <SectionHeader eyebrow="Achievements" title="Milestones along the way." />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="reveal card-base card-hover p-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent grid place-items-center">
                <it.icon className="w-5 h-5" />
              </div>
              <div className="mt-4 font-display text-primary text-lg leading-snug">
                {it.title}
              </div>
              <div className="mt-2 text-sm text-ink-soft leading-relaxed">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- RESUME ---------- */
function ResumeSection() {
  return (
    <section id="resume" className="section-pad bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] grid-blueprint" />
      <div
        className="absolute -top-40 -right-20 w-[420px] h-[420px] rounded-full"
        style={{ background: "radial-gradient(closest-side, oklch(0.71 0.18 45 / 0.35), transparent)" }}
      />
      <div className="container-x relative grid lg:grid-cols-2 gap-10 items-center">
        <div className="reveal">
          <div className="eyebrow !text-accent">Resume</div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            The full story, on one page.
          </h2>
          <p className="mt-4 text-white/75 max-w-lg leading-relaxed">
            Download or preview my resume for the complete overview of my education,
            internships, projects and technical skills.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={ASSETS.resume} download={ASSETS.resumeFilename} className="btn-accent">
              <Download className="w-4 h-4" /> Download Resume
            </a>
            <a
              href={ASSETS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !bg-white/5 !border-white/20 !text-white hover:!bg-white hover:!text-primary"
            >
              <ExternalLink className="w-4 h-4" /> Preview Resume
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            <ResumeStat icon={Sparkles} label="Fresh Graduate" value="2023" />
            <ResumeStat icon={Hammer} label="Site Experience" value="8+ months" />
          </div>
        </div>

        <div className="reveal">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-3 bg-white/5 rounded-3xl blur-xl" />
            <div className="relative rounded-2xl bg-white text-ink overflow-hidden shadow-lift border border-white/10">
              <div className="px-6 py-5 border-b border-hairline flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary text-white grid place-items-center font-bold">
                  {SITE.initials}
                </div>
                <div>
                  <div className="font-display font-bold text-primary">{SITE.name}</div>
                  <div className="text-xs text-ink-soft">{SITE.role}</div>
                </div>
                <FileText className="ml-auto w-5 h-5 text-blue" />
              </div>
              <div className="p-6 space-y-3.5">
                {[
                  { label: "Degree", value: "B.Tech Civil Engineering, JNTUH" },
                  { label: "Current", value: "Site Engineer, AK Constructions" },
                  { label: "Previous", value: "Site Engineer, RKGS Construction (8 mo)" },
                  { label: "Tools", value: "AutoCAD · ETABS · STAAD Pro · DGPS" },
                  { label: "Location", value: `${SITE.location.city}, ${SITE.location.state}` },
                ].map((r) => (
                  <div key={r.label} className="flex items-start gap-3 text-sm">
                    <div className="w-20 shrink-0 text-[11px] uppercase font-mono tracking-widest text-ink-soft pt-0.5">
                      {r.label}
                    </div>
                    <div className="text-ink font-medium">{r.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur">
      <Icon className="w-4 h-4 text-accent" />
      <div className="mt-2 text-lg font-display font-bold text-white">{value}</div>
      <div className="text-[11px] uppercase tracking-widest font-mono text-white/60">
        {label}
      </div>
    </div>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const text = `Hi Mahesh, I'm ${name} (${email}). ${message}`;
    window.open(waLink(text), "_blank");
    setSent(true);
    form.reset();
  };

  const info = [
    { icon: Phone, label: "Phone", value: SITE.phone, href: telLink },
    { icon: Mail, label: "Email", value: SITE.email, href: mailLink },
    {
      icon: MapPin,
      label: "Location",
      value: `${SITE.location.city}, ${SITE.location.state}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${SITE.location.line}, ${SITE.location.city}, ${SITE.location.state}`,
      )}`,
      external: true,
    },
  ];

  return (
    <section id="contact" className="section-pad bg-white border-t border-hairline">
      <div className="container-x">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something together."
          subtitle="Have a project, a role, or a question? Drop a message — I usually respond within a day."
          align="center"
        />

        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {info.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target={it.external ? "_blank" : undefined}
                rel={it.external ? "noopener noreferrer" : undefined}
                className="reveal card-base card-hover p-5 flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-soft text-secondary grid place-items-center group-hover:bg-secondary group-hover:text-white transition-colors">
                  <it.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] uppercase tracking-widest font-mono text-ink-soft">
                    {it.label}
                  </div>
                  <div className="text-sm font-semibold text-primary truncate">{it.value}</div>
                </div>
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal card-base p-5 flex items-center gap-4 bg-gradient-to-br from-[#25D366] to-[#128C7E] !border-transparent text-white hover:-translate-y-1 transition-transform"
            >
              <div className="w-11 h-11 rounded-xl bg-white/15 grid place-items-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] uppercase tracking-widest font-mono text-white/80">
                  WhatsApp
                </div>
                <div className="text-sm font-semibold">Chat with me instantly</div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="reveal card-base p-6 md:p-8 grid gap-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field name="name" label="Your name" placeholder="Full name" required />
                <Field name="email" label="Email" type="email" placeholder="you@company.com" required />
              </div>
              <Field name="subject" label="Subject" placeholder="Project inquiry / Job opportunity" />
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-ink-soft">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project..."
                  className="mt-1.5 w-full rounded-lg border border-hairline bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition"
                />
              </div>
              <button type="submit" className="btn-primary w-full md:w-auto">
                <Send className="w-4 h-4" /> Send Message via WhatsApp
              </button>
              {sent && (
                <p className="text-sm text-secondary font-medium">
                  ✓ Opening WhatsApp with your message…
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-mono uppercase tracking-widest text-ink-soft">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-hairline bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition"
      />
    </div>
  );
}

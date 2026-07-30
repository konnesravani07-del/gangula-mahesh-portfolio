import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { ASSETS, SITE } from "@/lib/site";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-hairline shadow-[0_1px_0_rgba(30,58,95,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label={SITE.name}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-accent">
  <img
    src={ASSETS.profile}
    alt={SITE.name}
    className="w-full h-full object-cover"
  />
          </div>
          <div className="hidden sm:block leading-tight text-left">
            <div className="font-display text-primary text-[15px] font-bold">{SITE.name}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-soft font-mono">
              Civil Engineer
            </div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                active === l.id ? "text-primary" : "text-ink-soft hover:text-primary"
              }`}
            >
              {l.label}
              <span
                className={`absolute left-3 right-3 -bottom-0.5 h-0.5 bg-accent rounded-full transition-transform origin-left ${
                  active === l.id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
          <a
            href={ASSETS.resume}
            download={ASSETS.resumeFilename}
            className="btn-primary ml-3 !py-2 !px-4 text-sm"
          >
            <Download className="w-4 h-4" /> Resume
          </a>
        </nav>

        <button
          className="lg:hidden p-2 text-primary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-hairline animate-fade-up">
          <nav className="container-x py-3 flex flex-col">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  active === l.id
                    ? "bg-blue-soft text-primary"
                    : "text-ink hover:bg-muted"
                }`}
              >
                {l.label}
              </button>
            ))}
            <a
              href={ASSETS.resume}
              download={ASSETS.resumeFilename}
              className="btn-primary mt-3"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

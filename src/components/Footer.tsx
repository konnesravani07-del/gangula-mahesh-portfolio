import { Mail, Phone, MapPin, Linkedin, MessageCircle } from "lucide-react";
import { SITE, mailLink, telLink, waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-primary text-white/90 mt-20">
      <div className="container-x pt-14 pb-8 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/15 grid place-items-center">
              <span className="font-display text-white font-bold">{SITE.initials}</span>
            </div>
            <div>
              <div className="font-display text-white text-lg font-bold">{SITE.name}</div>
              <div className="text-xs uppercase tracking-widest text-white/50 font-mono">
                {SITE.role}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70 max-w-sm leading-relaxed">
            {SITE.tagline}
          </p>
        </div>

        <div>
          <h4 className="text-white font-display text-base mb-4">Get in touch</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <a href={telLink} className="hover:text-white text-white/80 transition-colors">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <a
                href={mailLink}
                className="hover:text-white text-white/80 transition-colors break-all"
              >
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <span className="text-white/80">
                {SITE.location.line}, {SITE.location.state} {SITE.location.pincode}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display text-base mb-4">Connect</h4>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-sm text-white/85 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-sm text-white/85 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-secondary" /> LinkedIn
            </a>
            <a
              href={mailLink}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-sm text-white/85 transition-colors"
            >
              <Mail className="w-4 h-4 text-accent" /> Email
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/55">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div>
            Designed by <span className="text-accent font-semibold">LM Digital</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

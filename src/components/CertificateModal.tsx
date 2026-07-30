import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";

export function CertificateModal({
  open,
  onClose,
  url,
  title,
}: {
  open: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !url) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-primary/90 backdrop-blur-sm p-4 md:p-8 grid place-items-center animate-fade-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-white">
          <div className="min-w-0">
            <div className="text-xs font-mono uppercase tracking-widest text-blue">
              Certificate
            </div>
            <div className="text-sm md:text-base font-semibold text-primary truncate">
              {title}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted text-ink-soft hover:text-primary"
              aria-label="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted text-ink-soft hover:text-primary"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="bg-muted grid place-items-center overflow-auto max-h-[80vh]">
          <img
            src={url}
            alt={title || "Certificate"}
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { waLink, telLink } from "@/lib/site";

export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex flex-col gap-3">
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 w-[52px] h-[52px] rounded-full grid place-items-center bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.55)] hover:scale-110 transition-transform animate-float"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href={telLink}
        aria-label="Call now"
        className="w-[52px] h-[52px] rounded-full grid place-items-center bg-secondary text-white shadow-[0_10px_28px_-8px_rgba(47,128,237,0.55)] hover:scale-110 transition-transform"
      >
        <Phone className="w-5 h-5" />
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="w-[48px] h-[48px] rounded-full grid place-items-center bg-primary text-white shadow-lift hover:scale-110 transition-transform animate-fade-up"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

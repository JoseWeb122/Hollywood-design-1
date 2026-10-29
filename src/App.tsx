import { useCallback, useEffect, useState } from "react";
import { X, CalendarCheck, ShieldCheck, ArrowUp } from "lucide-react";
import { Navbar, Footer, CrownMark } from "./components/chrome";
import { Hero, Services, Story, Difference, Gallery, InteriorStrip } from "./components/sections";
import { Booking } from "./components/booking";
import { WalkinContact, Reviews, Faq, FinalCta } from "./components/closing";
import { scrollToId } from "./data";

function LegalModal({ doc, onClose }: { doc: "privacy" | "terms"; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isPrivacy = doc === "privacy";
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={isPrivacy ? "Privacy Policy draft" : "Terms of Service draft"}
    >
      <div
        className="lightbox-anim max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#D4AF66]/25 bg-[#0e0e0e] p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <CrownMark className="h-8 w-8" />
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#D4AF66] uppercase">Draft placeholder</p>
              <h3 className="font-serif text-3xl text-[#F6F1E8]">{isPrivacy ? "Privacy Policy" : "Terms of Service"}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-[#A8A29A] transition hover:border-[#D4AF66] hover:text-[#D4AF66]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="gold-hairline my-6 opacity-60" />
        <div className="space-y-4 text-sm leading-relaxed text-[#c9c2b6]">
          {isPrivacy ? (
            <>
              <p><strong className="text-[#F6F1E8]">Draft notice:</strong> this is placeholder content for the Hollywdd Groom’n website demo. It will be replaced with a final policy reviewed by the business before launch.</p>
              <p>We respect your privacy. Information you enter in the demonstration booking form stays in your browser for this session and is never sent to a server, shared, or sold.</p>
              <p>When a live booking, analytics, or contact system is connected, this policy will describe exactly what is collected, why, how long it is kept, and how to request deletion.</p>
              <p>Questions about privacy? Please contact the shop directly once contact details are published.</p>
              <p className="text-[#A8A29A]">Last updated: demo draft — {new Date().getFullYear()}.</p>
            </>
          ) : (
            <>
              <p><strong className="text-[#F6F1E8]">Draft notice:</strong> these are placeholder terms for the Hollywdd Groom’n website demo, to be finalized with the business before launch.</p>
              <p>All booking requests made through this site are demonstrations only. They do not create a confirmed appointment, hold a time slot, or process payment until a live scheduling system is connected.</p>
              <p>Service descriptions and sample photography are illustrative. Pricing, hours, and availability should be confirmed directly with the shop.</p>
              <p>By using this demo you agree not to rely on unconfirmed times, and to contact the shop to finalize any visit.</p>
              <p className="text-[#A8A29A]">Last updated: demo draft — {new Date().getFullYear()}.</p>
            </>
          )}
        </div>
        <button onClick={onClose} className="btn-gold mt-8 w-full rounded-full py-3.5 text-[12px] font-extrabold tracking-[0.18em] uppercase">
          Got It
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [preselected, setPreselected] = useState<string | null>(null);
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  const [showTop, setShowTop] = useState(false);

  const goBook = useCallback(() => {
    scrollToId("book");
  }, []);

  const bookService = useCallback((id: string) => {
    setPreselected(id);
  }, []);

  const consumePreselect = useCallback(() => setPreselected(null), []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#F6F1E8]">
      <Navbar onBook={goBook} />

      <main>
        <Hero onBook={goBook} />
        <Services onBookService={bookService} />
        <Story onBook={goBook} />
        <Difference />
        <Gallery onBook={goBook} />
        <InteriorStrip />
        <Booking preselected={preselected} onConsumePreselect={consumePreselect} />
        <WalkinContact onBook={goBook} />
        <Reviews onBook={goBook} />
        <Faq />
        <FinalCta onBook={goBook} />
      </main>

      <Footer onBook={goBook} onLegal={setLegal} />

      {legal && <LegalModal doc={legal} onClose={() => setLegal(null)} />}

      {/* Mobile sticky book bar */}
      <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
        <button
          onClick={goBook}
          className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-4 text-[13px] font-extrabold tracking-[0.18em] uppercase shadow-2xl"
          aria-label="Book appointment"
        >
          <CalendarCheck className="h-4 w-4" /> Book Appointment
        </button>
        <p className="mt-1.5 flex items-center justify-center gap-1 text-[10px] tracking-[0.14em] text-[#A8A29A]/80 uppercase">
          <ShieldCheck className="h-3 w-3 text-[#D4AF66]/70" /> Walk-ins welcome • Demo booking
        </p>
      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed right-5 bottom-24 z-40 grid h-11 w-11 place-items-center rounded-full border border-[#D4AF66]/40 bg-[#0e0e0e]/90 text-[#D4AF66] backdrop-blur-md transition-all duration-500 hover:bg-[#D4AF66] hover:text-[#080808] lg:bottom-8 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}

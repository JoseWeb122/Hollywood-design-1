import { useEffect, useRef, useState } from "react";
import { Menu, X, Crown, MapPin, Phone, Clock, Camera, AtSign, Share2, ArrowRight, ShieldCheck } from "lucide-react";
import { BUSINESS, NAV_LINKS, scrollToId } from "../data";

/* ---------- LOGO ---------- */
export function CrownMark({ className = "h-8 w-8", variant = "gold" }: { className?: string; variant?: "gold" | "ivory" }) {
  const stroke = variant === "gold" ? "#D4AF66" : "#F6F1E8";
  return (
    <svg viewBox="0 0 64 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 36 L11 12 L21 24 L32 6 L43 24 L53 12 L58 36 Z"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="11" cy="9" r="2.6" fill={stroke} />
      <circle cx="32" cy="3.5" r="2.6" fill={stroke} />
      <circle cx="53" cy="9" r="2.6" fill={stroke} />
      <circle cx="32" cy="22" r="2.2" fill={stroke} opacity=".9" />
      <rect x="6" y="39" width="52" height="3.2" rx="1.6" fill={stroke} />
    </svg>
  );
}

export function Logo({ compact = false, variant = "gold" }: { compact?: boolean; variant?: "gold" | "ivory" }) {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        scrollToId("home");
      }}
      className="group flex items-center gap-3"
      aria-label="Hollywdd Groom'n — home"
    >
      <span className="relative grid h-11 w-11 place-items-center rounded-full border border-[#D4AF66]/40 bg-[#0e0e0e] shadow-[0_0_24px_-6px_rgba(212,175,102,.5)] transition-all duration-500 group-hover:border-[#D4AF66]/80 group-hover:shadow-[0_0_32px_-6px_rgba(212,175,102,.7)]">
        <CrownMark className="h-6 w-6" variant={variant} />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-serif text-[21px] font-semibold tracking-[0.18em] text-[#F6F1E8]">
            HOLLYWDD
          </span>
          <span className="mt-1 flex items-center gap-2">
            <span className="h-px w-6 bg-[#D4AF66]/70" />
            <span className="text-[11px] font-semibold tracking-[0.42em] text-[#D4AF66]">
              GROOM’N
            </span>
          </span>
        </span>
      )}
    </a>
  );
}

/* ---------- REVEAL ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as any}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ---------- SECTION HEADING ---------- */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-[#D4AF66]/80" />
      <span className="text-[11px] font-bold tracking-[0.32em] text-[#D4AF66] uppercase">{children}</span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      {align === "center" ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#D4AF66]/80" />
            <span className="text-[11px] font-bold tracking-[0.32em] text-[#D4AF66] uppercase">{eyebrow}</span>
            <span className="h-px w-10 bg-[#D4AF66]/80" />
          </div>
          <h2 className="font-serif text-4xl leading-[1.05] font-medium text-[#F6F1E8] sm:text-5xl lg:text-6xl">{title}</h2>
          {copy && <p className="max-w-2xl text-[15px] leading-relaxed text-[#A8A29A] sm:text-base">{copy}</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-serif text-4xl leading-[1.05] font-medium text-[#F6F1E8] sm:text-5xl lg:text-6xl">{title}</h2>
          {copy && <p className="max-w-2xl text-[15px] leading-relaxed text-[#A8A29A] sm:text-base">{copy}</p>}
        </div>
      )}
    </Reveal>
  );
}

/* ---------- NAVBAR ---------- */
export function Navbar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "services", "story", "work", "reviews", "faq", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(href.replace("#", "")), open ? 200 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#080808]/92 shadow-[0_12px_40px_-12px_rgba(0,0,0,.8)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${scrolled ? "py-3" : "py-5"}`}>
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`relative text-[12.5px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${
                  active === l.href.replace("#", "") ? "text-[#D4AF66]" : "text-[#F6F1E8]/80 hover:text-[#F6F1E8]"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-[#D4AF66] transition-all duration-300 ${
                    active === l.href.replace("#", "") ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={onBook} className="btn-gold rounded-full px-6 py-3 text-[12px] font-extrabold tracking-[0.18em] uppercase">
              Book Appointment
            </button>
          </div>
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-[#F6F1E8] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <div className={`gold-hairline transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 flex h-full w-[86%] max-w-sm flex-col bg-[#0e0e0e] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Menu"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-2.5">
              <CrownMark className="h-7 w-7" />
              <span className="font-serif text-lg tracking-[0.18em]">HOLLYWDD</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile">
            <ul className="space-y-1">
              {[...NAV_LINKS, { label: "Book Appointment", href: "#book" }].map((l, i) => (
                <li
                  key={l.href + l.label}
                  className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
                  style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                >
                  <button
                    onClick={() => {
                      if (l.href === "#book") {
                        setOpen(false);
                        setTimeout(onBook, 250);
                      } else go(l.href);
                    }}
                    className={`flex w-full items-center justify-between border-b border-white/8 py-4 text-left font-serif text-2xl text-[#F6F1E8] transition-colors hover:text-[#D4AF66] ${
                      l.label === "Book Appointment" ? "text-[#D4AF66]" : ""
                    }`}
                  >
                    {l.label}
                    <ArrowRight className="h-4 w-4 text-[#D4AF66]/60" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-[#D4AF66]/20 bg-[#151515] p-5">
              <p className="font-script text-2xl text-[#D4AF66]">Where Everybody Is a Star.</p>
              <p className="mt-2 text-sm text-[#A8A29A]">Walk-ins welcome. Book ahead for the smoothest visit.</p>
            </div>
          </nav>
          <div className="border-t border-white/10 p-6">
            <button onClick={() => { setOpen(false); setTimeout(onBook, 250); }} className="btn-gold w-full rounded-full py-4 text-[13px] font-extrabold tracking-[0.2em] uppercase">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- FOOTER ---------- */
export function Footer({ onBook, onLegal }: { onBook: () => void; onLegal: (doc: "privacy" | "terms") => void }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[#D4AF66]/15 bg-[#060606]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_.8fr_.8fr_1fr]">
          <div>
            <Logo />
            <p className="font-script mt-5 text-[28px] leading-none text-[#D4AF66]">Where Everybody Is a Star.</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A8A29A]">
              Precision barbering, elevated grooming, and a welcoming chair — crafted by Elvis Matthews, known as Hollywdd.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Camera, label: "Instagram (coming soon)" },
                { icon: AtSign, label: "Facebook (coming soon)" },
                { icon: Share2, label: "TikTok (coming soon)" },
              ].map((s, i) => (
                <span
                  key={i}
                  title={s.label}
                  aria-label={s.label}
                  className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-full border border-white/12 text-[#A8A29A] opacity-60"
                >
                  <s.icon className="h-4 w-4" />
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] tracking-wide text-[#A8A29A]/70 uppercase">Social profiles coming soon</p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.3em] text-[#D4AF66] uppercase">Explore</h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button onClick={() => scrollToId(l.href.replace("#", ""))} className="text-sm text-[#F6F1E8]/75 transition-colors hover:text-[#D4AF66]">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.3em] text-[#D4AF66] uppercase">Services</h4>
            <ul className="mt-5 space-y-3">
              {["Clean Fades", "Signature Haircuts", "Beard Grooming", "Hot Towel Shaves", "Facial Cleansing", "Face Steaming"].map((s) => (
                <li key={s}>
                  <button onClick={() => scrollToId("services")} className="text-sm text-[#F6F1E8]/75 transition-colors hover:text-[#D4AF66]">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.3em] text-[#D4AF66] uppercase">Visit Us</h4>
            <ul className="mt-5 space-y-4 text-sm text-[#F6F1E8]/75">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF66]" />
                <span>{BUSINESS.phone ? BUSINESS.phone : BUSINESS.phoneDisplay}</span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF66]" />
                <span>{BUSINESS.address ? BUSINESS.address : "Address coming soon"}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF66]" />
                <span>Hours coming soon — contact the shop for details.</span>
              </li>
            </ul>
            <button onClick={onBook} className="btn-gold mt-6 w-full rounded-full py-3.5 text-[12px] font-extrabold tracking-[0.18em] uppercase">
              Book Appointment
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#A8A29A]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF66]/70" /> Front-end demo — no payment taken
            </p>
          </div>
        </div>

        <div className="gold-hairline mt-14 opacity-60" />
        <div className="mt-8 flex flex-col items-center justify-between gap-5 text-[13px] text-[#A8A29A] sm:flex-row">
          <p>© {year} {BUSINESS.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onLegal("privacy")} className="transition-colors hover:text-[#D4AF66]">Privacy Policy</button>
            <span className="h-3 w-px bg-white/15" />
            <button onClick={() => onLegal("terms")} className="transition-colors hover:text-[#D4AF66]">Terms of Service</button>
          </div>
          <p className="flex items-center gap-1.5">
            <Crown className="h-3.5 w-3.5 text-[#D4AF66]" /> Crafted with star treatment
          </p>
        </div>
      </div>
    </footer>
  );
}

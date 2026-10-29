import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Scissors, Sparkles, Crown, ChevronLeft, ChevronRight, X, ArrowRight,
  BadgeCheck, Armchair, Wand2, Star, CalendarCheck, Footprints,
} from "lucide-react";
import { SERVICES, GALLERY, IMAGES, scrollToId } from "../data";
import { Reveal, Eyebrow } from "./chrome";

/* ================= HERO ================= */
export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#080808]">
      {/* BG image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroBg}
          alt="Master barber creating a precise fade with clippers"
          className="animate-hero-img h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/84 to-[#080808]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(212,175,102,.14),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 pt-32 pb-16 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:pt-36">
        <div>
          <div className="animate-rise flex items-center gap-3" style={{ animationDelay: "100ms" }}>
            <span className="h-px w-12 bg-[#D4AF66]" />
            <span className="text-[11px] font-bold tracking-[0.34em] text-[#D4AF66] uppercase sm:text-xs">
              The Art of Premium Grooming
            </span>
          </div>

          <h1
            className="animate-rise mt-6 font-serif text-[13.5vw] leading-[0.95] font-semibold tracking-tight text-[#F6F1E8] sm:text-7xl lg:text-[86px]"
            style={{ animationDelay: "220ms" }}
          >
            EVERY DETAIL.
            <br />
            EVERY CUT.
            <br />
            <span className="gold-text italic">STAR QUALITY.</span>
          </h1>

          <div className="animate-rise mt-6 space-y-2" style={{ animationDelay: "340ms" }}>
            <p className="text-lg font-medium text-[#F6F1E8] sm:text-xl">Welcome to Hollywdd Groom’n.</p>
            <p className="font-script text-3xl text-[#D4AF66] sm:text-4xl">“Where Everybody Is a Star.”</p>
            <p className="max-w-xl pt-2 text-[15px] leading-relaxed text-[#A8A29A] sm:text-base">
              Experience precision barbering, elevated grooming, and a welcoming atmosphere designed to help you look
              sharp, feel confident, and leave feeling like a star.
            </p>
          </div>

          <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "460ms" }}>
            <button
              onClick={onBook}
              className="btn-gold group flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[13px] font-extrabold tracking-[0.18em] uppercase"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Your Appointment
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId("services")}
              className="btn-outline flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[13px] font-bold tracking-[0.18em] uppercase"
            >
              <Scissors className="h-4 w-4" />
              Explore Our Services
            </button>
          </div>

          <button
            onClick={() => scrollToId("contact")}
            className="animate-rise group mt-5 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.14em] text-[#A8A29A] uppercase transition-colors hover:text-[#D4AF66]"
            style={{ animationDelay: "540ms" }}
          >
            <Footprints className="h-4 w-4 text-[#D4AF66]/80" />
            <span className="underline decoration-[#D4AF66]/40 underline-offset-4 group-hover:decoration-[#D4AF66]">Walk-ins Welcome</span>
          </button>

          <div className="animate-rise mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6" style={{ animationDelay: "620ms" }}>
            {[
              { icon: Scissors, label: "Precision Craftsmanship" },
              { icon: Sparkles, label: "Premium Grooming" },
              { icon: Crown, label: "Star-Level Service" },
            ].map((h) => (
              <div key={h.label} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D4AF66]/30 bg-[#D4AF66]/8">
                  <h.icon className="h-4 w-4 text-[#D4AF66]" />
                </span>
                <span className="text-[11px] leading-tight font-bold tracking-[0.12em] text-[#F6F1E8]/85 uppercase sm:text-xs">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right editorial collage */}
        <div className="animate-rise relative hidden lg:block" style={{ animationDelay: "500ms" }}>
          <div className="relative ml-auto w-[380px]">
            <div className="img-zoom relative overflow-hidden rounded-[28px] border border-[#D4AF66]/25 shadow-[0_40px_80px_-24px_rgba(0,0,0,.9)]">
              <img src={IMAGES.heroCard} alt="Client with a fresh haircut and beard trim" className="aspect-[3/4] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.28em] text-[#D4AF66] uppercase">Now in the chair</p>
                  <p className="font-serif text-lg text-[#F6F1E8] italic">The Hollywdd Finish</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#D4AF66] text-[#080808]">
                  <Star className="h-4 w-4 fill-current" />
                </span>
              </div>
            </div>
            <div className="animate-float-slow absolute -bottom-8 -left-24 w-52 overflow-hidden rounded-2xl border border-[#D4AF66]/30 shadow-2xl">
              <img src={IMAGES.heroDetail} alt="Detail of a sharp haircut and beard line" className="aspect-square w-full object-cover" />
            </div>
            <div className="absolute -top-6 -right-4 rounded-2xl border border-[#D4AF66]/30 bg-[#0e0e0e]/90 px-5 py-4 backdrop-blur-md">
              <p className="font-serif text-3xl font-semibold text-[#D4AF66]">100%</p>
              <p className="text-[10px] font-bold tracking-[0.22em] text-[#F6F1E8]/80 uppercase">Star treatment</p>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#A8A29A] uppercase">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-white/15">
          <span className="block h-4 w-px animate-bounce bg-[#D4AF66]" />
        </span>
      </div>

      {/* marquee */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/8 bg-black/45 backdrop-blur-md">
        <div className="flex overflow-hidden py-3">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap">
            {[0, 1].map((n) => (
              <div key={n} className="flex items-center gap-8">
                {["Clean Fades", "Hot Towel Shaves", "Beard Sculpting", "Facial Rituals", "Star Treatment", "Walk-ins Welcome"].map((t) => (
                  <span key={t + n} className="flex items-center gap-8 text-[11px] font-bold tracking-[0.28em] text-[#F6F1E8]/60 uppercase">
                    {t} <Star className="h-3 w-3 fill-[#D4AF66] text-[#D4AF66]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SERVICES ================= */
export function Services({ onBookService }: { onBookService: (id: string) => void }) {
  return (
    <section id="services" className="grain relative bg-[#080808] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Our Services</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl leading-[1.02] font-medium text-[#F6F1E8] sm:text-5xl lg:text-6xl">
                YOUR LOOK. <span className="gold-text italic">ELEVATED.</span>
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#A8A29A]">
                From precision cuts to complete grooming rituals, every service is designed around your comfort,
                confidence, and personal style.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="flex items-center gap-3 rounded-full border border-[#D4AF66]/25 bg-[#D4AF66]/5 px-5 py-3">
              <BadgeCheck className="h-4 w-4 text-[#D4AF66]" />
              <span className="text-xs font-semibold tracking-[0.14em] text-[#F6F1E8]/80 uppercase">Contact for pricing • Details when booking</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 100}>
              <article className="card-luxe group flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="img-zoom relative h-52 overflow-hidden">
                  <img src={s.image} alt={s.alt} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full border border-[#D4AF66]/40 bg-black/60 px-3 py-1 text-[10px] font-bold tracking-[0.22em] text-[#D4AF66] uppercase backdrop-blur-md">
                    {s.short}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-[26px] leading-tight text-[#F6F1E8]">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#A8A29A]">{s.description}</p>
                  <p className="mt-3 text-[11px] font-bold tracking-[0.2em] text-[#A8A29A]/80 uppercase">Contact for pricing</p>
                  <div className="gold-hairline my-4 opacity-50" />
                  <button
                    onClick={() => onBookService(s.id)}
                    className="btn-outline flex w-full items-center justify-center gap-2 rounded-full py-3 text-[11px] font-extrabold tracking-[0.18em] uppercase group-hover:border-[#D4AF66] group-hover:bg-[#D4AF66] group-hover:text-[#080808]"
                  >
                    Book This Service <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#D4AF66]/25 bg-gradient-to-r from-[#151515] via-[#101010] to-[#151515] p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_0%,rgba(212,175,102,.12),transparent)]" />
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <p className="text-[11px] font-bold tracking-[0.32em] text-[#D4AF66] uppercase">Not sure what you need?</p>
                <h3 className="mt-2 font-serif text-3xl text-[#F6F1E8] sm:text-4xl">Let us help you find the right service for your style.</h3>
              </div>
              <button
                onClick={() => onBookService("additional-grooming")}
                className="btn-gold shrink-0 rounded-full px-8 py-4 text-[12px] font-extrabold tracking-[0.18em] uppercase"
              >
                Book a Grooming Session
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= STORY ================= */
export function Story({ onBook }: { onBook: () => void }) {
  return (
    <section id="story" className="relative overflow-hidden bg-[#0e0e0e] py-24 sm:py-32">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#D4AF66]/6 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="img-zoom overflow-hidden rounded-[28px] border border-white/10">
              <img src={IMAGES.storyMain} alt="Barber providing attentive service in an upscale barbershop" className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="absolute -right-4 -bottom-8 hidden w-56 overflow-hidden rounded-2xl border border-[#D4AF66]/30 shadow-2xl sm:block lg:-right-8">
              <img src={IMAGES.storySecondary} alt="Barber standing confidently beside a classic chair" className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="absolute -top-5 -left-3 rounded-2xl border border-[#D4AF66]/30 bg-[#080808]/90 px-5 py-4 backdrop-blur-md sm:-left-6">
              <p className="font-script text-2xl leading-none text-[#D4AF66]">Elvis Matthews</p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.28em] text-[#F6F1E8]/70 uppercase">aka Hollywdd • Master Barber</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-[1.02] font-medium sm:text-5xl lg:text-[56px]">
              MORE THAN A BARBERSHOP.
              <br />
              <span className="gold-text italic">IT’S AN EXPERIENCE.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#c9c2b6]">
              <p>At Hollywdd Groom’n, we believe everyone deserves to feel confident, comfortable, and valued.</p>
              <p>
                Founded around a simple idea — <em className="font-serif text-lg text-[#F6F1E8]">everybody is a star</em> — our
                approach combines professional barbering, thoughtful attention to detail, and a welcoming atmosphere where
                you can relax and focus on yourself.
              </p>
              <p>From the moment you sit in the chair to the final look in the mirror, every detail matters.</p>
              <p>Our goal is simple: help you look your best, feel your best, and leave with confidence.</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Scissors, title: "Craftsmanship", sub: "in Every Cut" },
                { icon: Armchair, title: "Comfort", sub: "in Every Visit" },
                { icon: Crown, title: "Star Treatment", sub: "for Every Client" },
              ].map((p) => (
                <div key={p.title} className="rounded-2xl border border-[#D4AF66]/18 bg-white/[0.02] p-5 text-center">
                  <p.icon className="mx-auto h-5 w-5 text-[#D4AF66]" />
                  <p className="mt-3 font-serif text-lg leading-tight text-[#F6F1E8]">{p.title}</p>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#A8A29A] uppercase">{p.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 border-l-2 border-[#D4AF66] pl-5 font-serif text-xl text-[#F6F1E8] italic sm:text-2xl">
              “Your style is personal. Your experience should be exceptional.”
            </p>
            <button onClick={onBook} className="btn-gold mt-8 rounded-full px-8 py-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
              Discover the Hollywdd Experience
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= DIFFERENCE ================= */
export function Difference() {
  const feats = [
    { n: "01", title: "PRECISION", copy: "Thoughtful attention to every blend, line, and finishing detail." },
    { n: "02", title: "COMFORT", copy: "A relaxing environment where you can take a moment for yourself." },
    { n: "03", title: "PERSONAL STYLE", copy: "Grooming tailored to your individual preferences and look." },
    { n: "04", title: "STAR TREATMENT", copy: "A welcoming experience built around respect, care, and confidence." },
  ];
  return (
    <section className="relative overflow-hidden bg-[#080808] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <Reveal>
              <Eyebrow>The Hollywdd Difference</Eyebrow>
              <h2 className="mt-4 font-serif text-5xl leading-[0.98] font-medium sm:text-6xl lg:text-7xl">
                STEP IN.
                <br />
                UNWIND.
                <br />
                <span className="gold-text italic">SHINE.</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#A8A29A]">
                This isn’t a rushed cut — it’s a ritual. Settle into the chair, breathe easy, and let every detail be handled with care.
              </p>
            </Reveal>
            <div className="mt-10">
              {feats.map((f, i) => (
                <Reveal key={f.n} delay={i * 90}>
                  <div className="group flex gap-6 border-t border-white/10 py-6 transition-colors last:border-b hover:border-[#D4AF66]/30">
                    <span className="font-serif text-sm tracking-[0.2em] text-[#D4AF66]/70">{f.n}</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-extrabold tracking-[0.28em] text-[#F6F1E8]">{f.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#A8A29A]">{f.copy}</p>
                    </div>
                    <Wand2 className="h-4 w-4 shrink-0 text-[#D4AF66]/40 transition-all duration-500 group-hover:text-[#D4AF66]" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={150}>
            <div className="relative">
              <div className="img-zoom overflow-hidden rounded-[28px] border border-[#D4AF66]/20">
                <img src={IMAGES.difference} alt="Barber performing a detailed straight-razor finish" className="aspect-[3/4] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/75 via-transparent to-[#080808]/10" />
              </div>
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#D4AF66] text-[#D4AF66]" />
                  ))}
                </div>
                <p className="mt-3 font-serif text-xl leading-snug text-[#F6F1E8] italic">
                  “Every blend, every line, every finish — handled like it matters. Because it does.”
                </p>
                <p className="mt-2 text-[11px] font-bold tracking-[0.24em] text-[#D4AF66] uppercase">The Hollywdd Standard</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= GALLERY ================= */
const FILTERS = ["All", "Fades", "Haircuts", "Beard Grooming", "Transformations"] as const;

export function Gallery({ onBook }: { onBook: () => void }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(() => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)), [filter]);

  const openAt = (globalIdx: number) => setLightbox(globalIdx);
  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (lightbox === null) return;
      setLightbox((lightbox + dir + items.length) % items.length);
    },
    [lightbox, items.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  // map filtered index -> item
  const current = lightbox !== null ? items[lightbox] : null;

  return (
    <section id="work" className="relative bg-[#0e0e0e] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <Eyebrow>Our Work</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-[1.02] font-medium sm:text-5xl lg:text-6xl">
              THE ART SPEAKS <br />
              <span className="gold-text italic">FOR ITSELF.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-[#A8A29A]">Explore the details, precision, and personal style behind every look.</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => {
                    setFilter(f);
                    setLightbox(null);
                  }}
                  className={`rounded-full px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] uppercase transition-all duration-300 ${
                    filter === f
                      ? "bg-[#D4AF66] text-[#080808] shadow-[0_8px_24px_-8px_rgba(212,175,102,.6)]"
                      : "border border-white/15 text-[#F6F1E8]/70 hover:border-[#D4AF66]/60 hover:text-[#F6F1E8]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {items.map((g, i) => (
            <Reveal key={g.src + i} delay={(i % 3) * 80}>
              <button
                onClick={() => openAt(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/8 text-left"
                aria-label={`Open image: ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] ${
                    i % 4 === 0 ? "aspect-[3/4]" : i % 4 === 1 ? "aspect-square" : "aspect-[3/4]"
                  }`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[10px] font-bold tracking-[0.26em] text-[#D4AF66] uppercase">{g.category}</span>
                  <span className="mt-1 block font-serif text-xl text-white">{g.label}</span>
                  <span className="mt-1 block text-[11px] text-white/60">Sample image — actual work coming soon</span>
                </span>
                <span className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                  <Sparkles className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-relaxed text-[#A8A29A]/80">
            Sample portfolio photography shown for design purposes — these are placeholders for Elvis’s actual work and are
            not represented as verified client transformations. Images are easy to swap when real portfolio photos arrive.
          </p>
          <div className="mt-6 text-center">
            <button onClick={onBook} className="btn-gold rounded-full px-10 py-4 text-[12px] font-extrabold tracking-[0.2em] uppercase">
              Book Your Next Look
            </button>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image: ${current.alt}`}
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-[#D4AF66] hover:text-[#D4AF66]"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-[#D4AF66] hover:text-[#D4AF66] sm:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-[#D4AF66] hover:text-[#D4AF66] sm:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <figure className="lightbox-anim max-h-[86vh] max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e]" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} className="max-h-[68vh] w-full object-contain bg-black" />
            <figcaption className="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.26em] text-[#D4AF66] uppercase">{current.category} • Sample</p>
                <p className="font-serif text-xl text-white">{current.label}</p>
              </div>
              <p className="text-xs text-white/50">
                {(lightbox ?? 0) + 1} / {items.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

/* Interior strip */
export function InteriorStrip() {
  return (
    <section className="relative overflow-hidden border-y border-white/8">
      <img src={IMAGES.interior} alt="Upscale barbershop interior with leather chairs and mirrors" className="h-[320px] w-full object-cover sm:h-[420px]" />
      <div className="absolute inset-0 bg-[#080808]/55" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <Reveal>
          <p className="font-script text-4xl text-[#D4AF66] sm:text-5xl">“Everybody is a star.”</p>
          <p className="mx-auto mt-3 max-w-xl text-sm tracking-[0.18em] text-[#F6F1E8]/85 uppercase">A chair with your name on it — precision, comfort & care</p>
        </Reveal>
      </div>
    </section>
  );
}

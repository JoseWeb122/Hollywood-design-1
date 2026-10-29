import { useState } from "react";
import {
  Footprints, Phone, MapPin, Clock3, Navigation, Star, Quote,
  Plus, Minus, Send, Check, CalendarCheck, Scissors, Info,
} from "lucide-react";
import { BUSINESS, FAQS, TESTIMONIALS, IMAGES, scrollToId } from "../data";
import { Reveal, Eyebrow } from "./chrome";

/* ============ WALK-INS + CONTACT ============ */
export function WalkinContact({ onBook }: { onBook: () => void }) {
  const hasPhone = Boolean(BUSINESS.phone);
  return (
    <section id="contact" className="relative overflow-hidden bg-[#080808] py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(212,175,102,.1),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Walk-ins banner */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-[#D4AF66]/25 bg-gradient-to-br from-[#151515] to-[#0a0a0a] px-8 py-12 text-center sm:px-12 sm:py-16">
            <Footprints className="mx-auto h-8 w-8 text-[#D4AF66]" />
            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight font-medium sm:text-5xl">
              DROP IN. CLEAN UP. <span className="gold-text italic">STEP OUT IN STYLE.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[#A8A29A]">
              Prefer to stop by? Walk-ins are welcome at Hollywdd Groom’n. For the smoothest experience, contact the shop
              to check current availability.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={onBook} className="btn-gold rounded-full px-8 py-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
                Book an Appointment
              </button>
              {hasPhone ? (
                <a href={`tel:${BUSINESS.phone}`} className="btn-outline flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[12px] font-bold tracking-[0.18em] uppercase">
                  <Phone className="h-4 w-4" /> Call the Shop
                </a>
              ) : (
                <span
                  className="flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/12 px-8 py-4 text-[12px] font-bold tracking-[0.18em] text-[#A8A29A]/60 uppercase"
                  title="Shop phone coming soon"
                  aria-disabled="true"
                >
                  <Phone className="h-4 w-4" /> {BUSINESS.phoneDisplay}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* Contact grid */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="card-luxe h-full rounded-3xl p-8">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#D4AF66]/30 bg-[#D4AF66]/8">
                <Phone className="h-5 w-5 text-[#D4AF66]" />
              </span>
              <h3 className="mt-4 font-serif text-2xl">Call or Message</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A8A29A]">
                {hasPhone ? (
                  <a href={`tel:${BUSINESS.phone}`} className="font-semibold text-[#D4AF66] hover:underline">{BUSINESS.phone}</a>
                ) : (
                  <>Shop phone coming soon. Use the booking request form and we’ll guide you on next steps.</>
                )}
              </p>
              <div className="gold-hairline my-5 opacity-50" />
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#A8A29A]/70 uppercase">Response during shop hours</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card-luxe h-full rounded-3xl p-8">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#D4AF66]/30 bg-[#D4AF66]/8">
                <MapPin className="h-5 w-5 text-[#D4AF66]" />
              </span>
              <h3 className="mt-4 font-serif text-2xl">Find the Chair</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A8A29A]">
                {BUSINESS.address ? BUSINESS.address : "Business address coming soon."}
                <br />
                {BUSINESS.city}
              </p>
              <div className="gold-hairline my-5 opacity-50" />
              {BUSINESS.address ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] text-[#D4AF66] uppercase hover:underline"
                >
                  <Navigation className="h-3.5 w-3.5" /> Get Directions
                </a>
              ) : (
                <p className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] text-[#A8A29A]/60 uppercase">
                  <Navigation className="h-3.5 w-3.5" /> Directions coming soon
                </p>
              )}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="card-luxe h-full rounded-3xl p-8">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-[#D4AF66]/30 bg-[#D4AF66]/8">
                <Clock3 className="h-5 w-5 text-[#D4AF66]" />
              </span>
              <h3 className="mt-4 font-serif text-2xl">Shop Hours</h3>
              {BUSINESS.hours.length > 0 ? (
                <ul className="mt-2 space-y-2 text-sm text-[#A8A29A]">
                  {BUSINESS.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span>{h.day}</span>
                      <span className="text-[#F6F1E8]">{h.time}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-[#A8A29A]">{BUSINESS.hoursNote}</p>
              )}
              <div className="gold-hairline my-5 opacity-50" />
              <button onClick={onBook} className="text-[12px] font-bold tracking-[0.16em] text-[#D4AF66] uppercase hover:underline">
                Request a time that suits you
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ REVIEWS ============ */
export function Reviews({ onBook }: { onBook: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", service: "Clean Fades", message: "" });

  return (
    <section id="reviews" className="relative bg-[#0e0e0e] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF66]/80" />
              <span className="text-[11px] font-bold tracking-[0.32em] text-[#D4AF66] uppercase">Client Reviews</span>
              <span className="h-px w-10 bg-[#D4AF66]/80" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">THE HOLLYWDD <span className="gold-text italic">STANDARD.</span></h2>
            <p className="max-w-xl text-[15px] text-[#A8A29A]">The best part of the experience is how you feel when you leave.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="card-luxe relative flex h-full flex-col rounded-3xl p-8">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-[#D4AF66]/20" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-[#D4AF66] text-[#D4AF66]" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-serif text-[21px] leading-snug text-[#F6F1E8] italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-sm font-bold text-[#F6F1E8]">{t.name}</p>
                  <p className="mt-0.5 text-xs text-[#D4AF66]">{t.service}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF66]/25 bg-[#D4AF66]/6 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#A8A29A] uppercase">
                    <Info className="h-3 w-3" /> {t.detail}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-white/10 bg-black/30 p-8 sm:p-10">
            <h3 className="font-serif text-2xl text-center sm:text-3xl">Had the Hollywdd experience?</h3>
            <p className="mt-2 text-center text-sm text-[#A8A29A]">
              Share a few words below — this is a <strong className="text-[#F6F1E8]">front-end demo</strong>. Submissions are not published or stored in a live system.
            </p>
            {sent ? (
              <p className="lightbox-anim mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-2xl border border-[#D4AF66]/30 bg-[#D4AF66]/10 px-5 py-4 text-sm font-semibold text-[#D4AF66]" role="status">
                <Check className="h-4 w-4" /> Thanks, star — demo received. Nothing was published.
              </p>
            ) : (
              <form
                className="mt-6 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (form.name.trim() && form.message.trim()) setSent(true);
                }}
              >
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="rounded-2xl border border-white/12 bg-black/40 px-4 py-3.5 text-sm placeholder:text-[#A8A29A]/50 focus:border-[#D4AF66]"
                  aria-label="Your name"
                />
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="rounded-2xl border border-white/12 bg-black/40 px-4 py-3.5 text-sm text-[#F6F1E8] focus:border-[#D4AF66]"
                  aria-label="Service received"
                >
                  {["Clean Fades", "Signature Haircuts", "Beard Grooming", "Hot Towel Shaves", "Facial Rituals"].map((s) => (
                    <option key={s} className="bg-[#0e0e0e]">{s}</option>
                  ))}
                </select>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How did you leave feeling?"
                  required
                  rows={3}
                  className="resize-none rounded-2xl border border-white/12 bg-black/40 px-4 py-3.5 text-sm placeholder:text-[#A8A29A]/50 focus:border-[#D4AF66] sm:col-span-2"
                  aria-label="Your review"
                />
                <button type="submit" className="btn-outline flex items-center justify-center gap-2 rounded-full py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase sm:col-span-2">
                  <Send className="h-4 w-4" /> Submit Demo Review
                </button>
              </form>
            )}
            <div className="mt-6 text-center">
              <button onClick={onBook} className="text-[12px] font-bold tracking-[0.18em] text-[#D4AF66] uppercase hover:underline">
                Ready for your moment? Book now
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
export function Faq() {
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) => setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  return (
    <section id="faq" className="relative bg-[#080808] py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <Reveal>
            <Eyebrow>Good to Know</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              QUESTIONS, <br />
              <span className="gold-text italic">ANSWERED.</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#A8A29A]">
              Everything you need before you take the chair. Still curious? Contact the shop — we’re happy to help.
            </p>
            <div className="mt-8 rounded-3xl border border-[#D4AF66]/20 bg-[#0e0e0e] p-6">
              <p className="font-script text-3xl text-[#D4AF66]">Walk-ins welcome.</p>
              <p className="mt-2 text-sm text-[#A8A29A]">Booking ahead means zero waiting and the full ritual, uninterrupted.</p>
              <button onClick={() => scrollToId("book")} className="btn-gold mt-5 flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-extrabold tracking-[0.18em] uppercase">
                <CalendarCheck className="h-4 w-4" /> Book Appointment
              </button>
            </div>
          </Reveal>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open.includes(i);
            return (
              <Reveal key={i} delay={Math.min(i * 60, 300)}>
                <div className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${isOpen ? "border-[#D4AF66]/40 bg-[#101010]" : "border-white/10 bg-white/[0.015] hover:border-[#D4AF66]/30"}`}>
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`font-serif text-lg sm:text-xl ${isOpen ? "text-[#D4AF66]" : "text-[#F6F1E8]"}`}>{f.q}</span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${isOpen ? "rotate-180 border-[#D4AF66] bg-[#D4AF66] text-[#080808]" : "border-white/15 text-[#A8A29A]"}`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div id={`faq-panel-${i}`} className={`faq-panel ${isOpen ? "open" : ""}`} role="region">
                    <div className="faq-inner">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-[#c9c2b6]">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ FINAL CTA ============ */
export function FinalCta({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <img src={IMAGES.finalCta} alt="Master barber standing proudly beside a vintage chair" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#080808]/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]" />
      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-40">
        <Reveal>
          <div className="mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#D4AF66]/80" />
            <Scissors className="h-4 w-4 text-[#D4AF66]" />
            <span className="h-px w-12 bg-[#D4AF66]/80" />
          </div>
          <h2 className="mt-6 font-serif text-5xl leading-[0.98] font-medium sm:text-7xl">
            YOUR CHAIR <br />
            <span className="gold-text italic">IS WAITING.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#F6F1E8]/80 sm:text-base">
            Your next great look starts here. Step into Hollywdd Groom’n and experience grooming designed to help you feel
            like the star you are.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={onBook} className="btn-gold rounded-full px-10 py-4 text-[13px] font-extrabold tracking-[0.18em] uppercase">
              Book Your Appointment
            </button>
            <button onClick={() => scrollToId("services")} className="btn-outline rounded-full px-10 py-4 text-[13px] font-bold tracking-[0.18em] uppercase backdrop-blur-md">
              Explore Our Services
            </button>
          </div>
          <div className="gold-hairline mx-auto mt-12 max-w-md opacity-70" />
          <p className="mt-6 text-[12px] font-bold tracking-[0.4em] text-[#F6F1E8] uppercase">Hollywdd Groom’n</p>
          <p className="font-script mt-2 text-3xl text-[#D4AF66] sm:text-4xl">Where Everybody Is a Star.</p>
        </Reveal>
      </div>
    </section>
  );
}

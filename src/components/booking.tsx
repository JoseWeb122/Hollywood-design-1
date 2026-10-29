import { useEffect, useMemo, useState } from "react";
import {
  Check, ChevronLeft, ChevronRight, CalendarDays, Clock3, User, Phone, Mail,
  Scissors, Crown, Sparkles, ShieldCheck, Pencil, Loader2, PartyPopper, Info,
} from "lucide-react";
import { SERVICES, TIME_SLOTS, BUSINESS } from "../data";
import { Reveal } from "./chrome";

type Details = { name: string; phone: string; email: string; notes: string };
type Errors = Partial<Record<keyof Details | "service" | "date" | "time", string>>;

const STEPS = ["Service", "Barber", "Date", "Time", "Details", "Review"];

function monthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return cells;
}
function fmtDate(d: Date | null) {
  if (!d) return "—";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
}
function makeRef() {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `HGN-${s}`;
}

export function Booking({ preselected, onConsumePreselect }: { preselected: string | null; onConsumePreselect: () => void }) {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>({ name: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [reference, setReference] = useState("");

  useEffect(() => {
    if (preselected) {
      setServiceId(preselected);
      setStep(0);
      onConsumePreselect();
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [preselected, onConsumePreselect]);

  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId) ?? null, [serviceId]);

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const cells = useMemo(() => monthMatrix(viewYear, viewMonth), [viewYear, viewMonth]);
  const monthLabel = useMemo(
    () => new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    [viewYear, viewMonth]
  );

  const moveMonth = (dir: 1 | -1) => {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setViewMonth(m);
    setViewYear(y);
  };

  const canPrevMonth = !(viewYear === today.getFullYear() && viewMonth === today.getMonth());

  const validateDetails = (): boolean => {
    const e: Errors = {};
    if (!details.name.trim() || details.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!details.phone.trim() || details.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) e.email = "Please enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !serviceId) { setErrors({ service: "Please select a service to continue." }); return; }
    if (step === 2 && !date) { setErrors({ date: "Please choose a future date." }); return; }
    if (step === 3 && !time) { setErrors({ time: "Please choose a time slot." }); return; }
    if (step === 4 && !validateDetails()) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => { setErrors({}); setStep((s) => Math.max(s - 1, 0)); };

  const confirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      setReference(makeRef());
      setSubmitting(false);
      setConfirmed(true);
      window.scrollTo({ top: document.getElementById("book")?.offsetTop ?? 0, behavior: "smooth" });
    }, 1400);
  };

  const reset = () => {
    setStep(0); setServiceId(null); setDate(null); setTime(null);
    setDetails({ name: "", phone: "", email: "", notes: "" });
    setErrors({}); setConfirmed(false); setReference("");
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  if (confirmed) {
    return (
      <section id="book" className="relative bg-[#080808] py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="lightbox-anim overflow-hidden rounded-[28px] border border-[#D4AF66]/30 bg-[#0e0e0e] text-center shadow-[0_40px_100px_-30px_rgba(212,175,102,.35)]">
            <div className="bg-gradient-to-b from-[#D4AF66]/15 to-transparent px-8 pt-12 pb-8">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#D4AF66] text-[#080808]">
                <PartyPopper className="h-7 w-7" />
              </span>
              <p className="mt-5 text-[11px] font-bold tracking-[0.32em] text-[#D4AF66] uppercase">Request received — demo</p>
              <h3 className="mt-2 font-serif text-4xl text-[#F6F1E8] sm:text-5xl">You’re on the list, star.</h3>
              <p className="font-script mt-3 text-3xl text-[#D4AF66]">Where Everybody Is a Star.</p>
            </div>
            <div className="px-8 pb-10">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-[0.24em] text-[#A8A29A] uppercase">Demo reference</span>
                  <span className="rounded-full bg-[#D4AF66]/15 px-4 py-1 font-mono text-sm font-bold tracking-[0.12em] text-[#D4AF66]">{reference}</span>
                </div>
                <div className="gold-hairline my-5 opacity-60" />
                <dl className="grid gap-4 text-sm sm:grid-cols-2">
                  <div><dt className="text-[11px] font-bold tracking-[0.2em] text-[#A8A29A] uppercase">Service</dt><dd className="mt-1 font-semibold text-[#F6F1E8]">{service?.name}</dd></div>
                  <div><dt className="text-[11px] font-bold tracking-[0.2em] text-[#A8A29A] uppercase">Barber</dt><dd className="mt-1 font-semibold text-[#F6F1E8]">{BUSINESS.owner} / {BUSINESS.aka}</dd></div>
                  <div><dt className="text-[11px] font-bold tracking-[0.2em] text-[#A8A29A] uppercase">Date</dt><dd className="mt-1 font-semibold text-[#F6F1E8]">{fmtDate(date)}</dd></div>
                  <div><dt className="text-[11px] font-bold tracking-[0.2em] text-[#A8A29A] uppercase">Time</dt><dd className="mt-1 font-semibold text-[#F6F1E8]">{time}</dd></div>
                  <div><dt className="text-[11px] font-bold tracking-[0.2em] text-[#A8A29A] uppercase">Name</dt><dd className="mt-1 font-semibold text-[#F6F1E8]">{details.name}</dd></div>
                  <div><dt className="text-[11px] font-bold tracking-[0.2em] text-[#A8A29A] uppercase">Contact</dt><dd className="mt-1 font-semibold text-[#F6F1E8]">{details.phone} • {details.email}</dd></div>
                </dl>
                {details.notes && (
                  <div className="mt-4 rounded-xl bg-white/[0.03] p-4">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-[#A8A29A] uppercase">Preferred style / notes</p>
                    <p className="mt-1 text-sm text-[#F6F1E8]/85">{details.notes}</p>
                  </div>
                )}
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#D4AF66]/25 bg-[#D4AF66]/6 p-4 text-left">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF66]" />
                <p className="text-[13px] leading-relaxed text-[#c9c2b6]">
                  This is a <strong className="text-[#F6F1E8]">front-end demonstration only</strong>. Your request has not been sent to the barber or added to a live calendar. To confirm a real appointment, please contact the shop directly once phone details are published.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button onClick={reset} className="btn-outline flex-1 rounded-full py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase">
                  Make Another Request
                </button>
                <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })} className="btn-gold flex-1 rounded-full py-3.5 text-[12px] font-extrabold tracking-[0.18em] uppercase">
                  Explore Our Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="grain relative overflow-hidden bg-[#0b0b0b] py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#D4AF66]/8 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF66]/80" />
              <span className="text-[11px] font-bold tracking-[0.32em] text-[#D4AF66] uppercase">Book Appointment</span>
              <span className="h-px w-10 bg-[#D4AF66]/80" />
            </div>
            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-[1.02] font-medium sm:text-5xl lg:text-6xl">
              RESERVE YOUR <span className="gold-text italic">STAR MOMENT.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] text-[#A8A29A]">
              A premium reservation experience — select your ritual in a few elegant steps. No payment, no pressure.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 overflow-hidden rounded-[28px] border border-[#D4AF66]/20 bg-[#0e0e0e]/90 shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)] backdrop-blur-xl">
            {/* progress */}
            <div className="border-b border-white/8 px-6 py-5 sm:px-10">
              <div className="flex items-center justify-between gap-2 overflow-x-auto">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex min-w-0 items-center gap-2">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold transition-all duration-500 ${
                        i < step ? "bg-[#D4AF66] text-[#080808]" : i === step ? "border border-[#D4AF66] bg-[#D4AF66]/15 text-[#D4AF66]" : "border border-white/15 text-[#A8A29A]"
                      }`}
                    >
                      {i < step ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    <span className={`hidden text-[11px] font-bold tracking-[0.16em] uppercase sm:block ${i === step ? "text-[#F6F1E8]" : "text-[#A8A29A]"}`}>{s}</span>
                    {i < STEPS.length - 1 && <span className="mx-1 hidden h-px w-6 bg-white/10 md:block" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/8">
                <div className="h-full rounded-full bg-gradient-to-r from-[#A97C37] to-[#D4AF66] transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr]">
              {/* summary rail */}
              <aside className="hidden border-r border-white/8 bg-black/30 p-8 lg:block">
                <p className="text-[11px] font-bold tracking-[0.28em] text-[#D4AF66] uppercase">Your selection</p>
                <div className="mt-5 space-y-5">
                  {[
                    { icon: Scissors, label: "Service", value: service?.name ?? "Not selected" },
                    { icon: Crown, label: "Barber", value: `${BUSINESS.owner}` },
                    { icon: CalendarDays, label: "Date", value: date ? fmtDate(date) : "Not selected" },
                    { icon: Clock3, label: "Time", value: time ?? "Not selected" },
                    { icon: User, label: "Guest", value: details.name || "Not entered" },
                  ].map((r) => (
                    <div key={r.label} className="flex gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D4AF66]/25 bg-[#D4AF66]/6">
                        <r.icon className="h-4 w-4 text-[#D4AF66]" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold tracking-[0.24em] text-[#A8A29A] uppercase">{r.label}</p>
                        <p className="truncate text-sm font-semibold text-[#F6F1E8]">{r.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="gold-hairline my-6 opacity-50" />
                <p className="flex items-start gap-2 text-[12px] leading-relaxed text-[#A8A29A]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF66]/70" />
                  Demo only — actual availability must be confirmed when a live scheduling system is connected.
                </p>
              </aside>

              {/* main panel */}
              <div className="p-6 sm:p-10">
                {step === 0 && (
                  <div>
                    <h3 className="font-serif text-3xl text-[#F6F1E8]">Select your service</h3>
                    <p className="mt-1 text-sm text-[#A8A29A]">Every ritual includes star-level finishing. Contact for pricing.</p>
                    {errors.service && <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200" role="alert">{errors.service}</p>}
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { setServiceId(s.id); setErrors({}); }}
                          aria-pressed={serviceId === s.id}
                          className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                            serviceId === s.id
                              ? "border-[#D4AF66] bg-[#D4AF66]/10 shadow-[0_12px_36px_-12px_rgba(212,175,102,.5)]"
                              : "border-white/10 bg-white/[0.02] hover:border-[#D4AF66]/50"
                          }`}
                        >
                          <img src={s.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-bold text-[#F6F1E8]">{s.name}</span>
                            <span className="mt-0.5 block text-xs leading-snug text-[#A8A29A]">{s.description}</span>
                          </span>
                          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${serviceId === s.id ? "border-[#D4AF66] bg-[#D4AF66] text-[#080808]" : "border-white/20 text-transparent"}`}>
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h3 className="font-serif text-3xl text-[#F6F1E8]">Choose your barber</h3>
                    <p className="mt-1 text-sm text-[#A8A29A]">One chair. One master. Every client gets the star treatment.</p>
                    <div className="mt-6 rounded-3xl border border-[#D4AF66]/50 bg-gradient-to-br from-[#D4AF66]/12 to-transparent p-6 sm:p-8">
                      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                        <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#D4AF66]/50 bg-[#080808] font-serif text-3xl text-[#D4AF66]">EM</span>
                        <div className="flex-1">
                          <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] text-[#D4AF66] uppercase">
                            <Sparkles className="h-3.5 w-3.5" /> Master Barber • Default
                          </p>
                          <h4 className="mt-1 font-serif text-2xl text-[#F6F1E8]">Elvis Matthews <span className="text-[#D4AF66]">/ Hollywdd</span></h4>
                          <p className="mt-1 text-sm text-[#A8A29A]">Precision fades • Beard sculpting • Hot-towel rituals • Personal style.</p>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full bg-[#D4AF66] px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#080808] uppercase">
                          <Check className="h-3.5 w-3.5" /> Selected
                        </span>
                      </div>
                    </div>
                    <p className="mt-4 text-[13px] text-[#A8A29A]">Additional team members will appear here if the shop expands — no staff invented for this demo.</p>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="font-serif text-3xl text-[#F6F1E8]">Select a date</h3>
                    <p className="mt-1 text-sm text-[#A8A29A]">Past dates are unavailable. Pick any upcoming day.</p>
                    {errors.date && <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200" role="alert">{errors.date}</p>}
                    <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-6">
                      <div className="flex items-center justify-between">
                        <button onClick={() => moveMonth(-1)} disabled={!canPrevMonth} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-[#D4AF66] disabled:opacity-30" aria-label="Previous month">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <p className="font-serif text-xl text-[#F6F1E8]">{monthLabel}</p>
                        <button onClick={() => moveMonth(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-[#D4AF66]" aria-label="Next month">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-5 grid grid-cols-7 gap-1.5 text-center text-[11px] font-bold tracking-[0.14em] text-[#A8A29A] uppercase">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <span key={d} className="py-2">{d}</span>)}
                      </div>
                      <div className="grid grid-cols-7 gap-1.5">
                        {cells.map((d, i) => {
                          if (d === null) return <span key={i} />;
                          const dt = new Date(viewYear, viewMonth, d);
                          dt.setHours(0, 0, 0, 0);
                          const disabled = dt < today;
                          const selected = date && dt.getTime() === date.getTime();
                          return (
                            <button
                              key={i}
                              disabled={disabled}
                              onClick={() => { setDate(dt); setErrors({}); }}
                              className={`cal-day aspect-square rounded-xl text-sm font-semibold transition-all duration-300 ${
                                selected ? "bg-[#D4AF66] text-[#080808] shadow-[0_8px_24px_-8px_rgba(212,175,102,.7)]" : disabled ? "text-[#A8A29A]" : "text-[#F6F1E8] hover:bg-[#D4AF66]/15 hover:text-[#D4AF66]"
                              }`}
                              aria-label={dt.toDateString()}
                              aria-pressed={!!selected}
                            >
                              {d}
                            </button>
                          );
                        })}
                      </div>
                      {date && <p className="mt-4 text-center text-sm text-[#D4AF66]">Selected: <strong>{fmtDate(date)}</strong></p>}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="font-serif text-3xl text-[#F6F1E8]">Choose a time</h3>
                    <p className="mt-1 text-sm text-[#A8A29A]">Illustrative slots — actual availability must be confirmed.</p>
                    {errors.time && <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200" role="alert">{errors.time}</p>}
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => { setTime(t); setErrors({}); }}
                          aria-pressed={time === t}
                          className={`flex items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-bold transition-all duration-300 ${
                            time === t ? "border-[#D4AF66] bg-[#D4AF66] text-[#080808] shadow-[0_12px_32px_-10px_rgba(212,175,102,.6)]" : "border-white/10 bg-white/[0.02] text-[#F6F1E8]/85 hover:border-[#D4AF66]/60"
                          }`}
                        >
                          <Clock3 className="h-4 w-4 opacity-70" /> {t}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-[#D4AF66]/20 bg-[#D4AF66]/5 p-4">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF66]" />
                      <p className="text-[13px] text-[#c9c2b6]">Times shown are for demonstration. Final confirmation happens when a real scheduling system is connected — we’ll hold your preference.</p>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h3 className="font-serif text-3xl text-[#F6F1E8]">Your details</h3>
                    <p className="mt-1 text-sm text-[#A8A29A]">So we know who’s taking the chair. Fields marked * are required.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] text-[#F6F1E8]/80 uppercase"><User className="h-3.5 w-3.5 text-[#D4AF66]" /> Full name *</span>
                        <input
                          value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })}
                          placeholder="Jordan Carter"
                          className={`w-full rounded-2xl border bg-black/40 px-4 py-3.5 text-sm text-[#F6F1E8] placeholder:text-[#A8A29A]/50 focus:border-[#D4AF66] ${errors.name ? "border-red-400/60" : "border-white/12"}`}
                        />
                        {errors.name && <span className="mt-1 block text-xs text-red-300" role="alert">{errors.name}</span>}
                      </label>
                      <label className="block">
                        <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] text-[#F6F1E8]/80 uppercase"><Phone className="h-3.5 w-3.5 text-[#D4AF66]" /> Phone *</span>
                        <input
                          value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                          placeholder="(555) 123-4567" inputMode="tel"
                          className={`w-full rounded-2xl border bg-black/40 px-4 py-3.5 text-sm text-[#F6F1E8] placeholder:text-[#A8A29A]/50 focus:border-[#D4AF66] ${errors.phone ? "border-red-400/60" : "border-white/12"}`}
                        />
                        {errors.phone && <span className="mt-1 block text-xs text-red-300" role="alert">{errors.phone}</span>}
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] text-[#F6F1E8]/80 uppercase"><Mail className="h-3.5 w-3.5 text-[#D4AF66]" /> Email *</span>
                        <input
                          value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })}
                          placeholder="you@example.com" inputMode="email"
                          className={`w-full rounded-2xl border bg-black/40 px-4 py-3.5 text-sm text-[#F6F1E8] placeholder:text-[#A8A29A]/50 focus:border-[#D4AF66] ${errors.email ? "border-red-400/60" : "border-white/12"}`}
                        />
                        {errors.email && <span className="mt-1 block text-xs text-red-300" role="alert">{errors.email}</span>}
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] text-[#F6F1E8]/80 uppercase"><Sparkles className="h-3.5 w-3.5 text-[#D4AF66]" /> Notes / preferred style <span className="font-medium normal-case text-[#A8A29A]">(optional)</span></span>
                        <textarea
                          value={details.notes} onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                          placeholder="e.g. Mid skin fade, beard lineup, reference photo on arrival…"
                          rows={3}
                          className="w-full resize-none rounded-2xl border border-white/12 bg-black/40 px-4 py-3.5 text-sm text-[#F6F1E8] placeholder:text-[#A8A29A]/50 focus:border-[#D4AF66]"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-3xl text-[#F6F1E8]">Review & confirm</h3>
                      <button onClick={() => setStep(0)} className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold tracking-[0.16em] text-[#A8A29A] uppercase transition hover:border-[#D4AF66] hover:text-[#D4AF66]">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                    </div>
                    <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
                      {service && (
                        <div className="flex items-center gap-4 bg-white/[0.03] p-5">
                          <img src={service.image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                          <div>
                            <p className="text-[10px] font-bold tracking-[0.24em] text-[#D4AF66] uppercase">Service</p>
                            <p className="font-serif text-xl text-[#F6F1E8]">{service.name}</p>
                            <p className="text-xs text-[#A8A29A]">Contact for pricing • Details available when booking</p>
                          </div>
                        </div>
                      )}
                      <dl className="grid gap-px bg-white/8 sm:grid-cols-2">
                        {[
                          ["Barber", `${BUSINESS.owner} / ${BUSINESS.aka}`],
                          ["Date", fmtDate(date)],
                          ["Time", time ?? "—"],
                          ["Name", details.name || "—"],
                          ["Phone", details.phone || "—"],
                          ["Email", details.email || "—"],
                        ].map(([k, v]) => (
                          <div key={k} className="bg-[#0e0e0e] px-5 py-4">
                            <dt className="text-[10px] font-bold tracking-[0.24em] text-[#A8A29A] uppercase">{k}</dt>
                            <dd className="mt-1 text-sm font-semibold text-[#F6F1E8]">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      {details.notes && (
                        <div className="bg-[#0e0e0e] px-5 py-4">
                          <p className="text-[10px] font-bold tracking-[0.24em] text-[#A8A29A] uppercase">Notes</p>
                          <p className="mt-1 text-sm text-[#F6F1E8]/85">{details.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-[#D4AF66]/25 bg-[#D4AF66]/6 p-4">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF66]" />
                      <p className="text-[13px] leading-relaxed text-[#c9c2b6]">
                        By requesting, you agree this is a <strong className="text-[#F6F1E8]">demo — no appointment is sent or confirmed</strong> until the shop connects a live scheduler. No payment is collected.
                      </p>
                    </div>
                  </div>
                )}

                {/* nav */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    onClick={back}
                    disabled={step === 0}
                    className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[12px] font-bold tracking-[0.16em] text-[#F6F1E8]/80 uppercase transition hover:border-[#D4AF66]/60 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  {step < STEPS.length - 1 ? (
                    <button onClick={next} className="btn-gold flex items-center gap-2 rounded-full px-8 py-3.5 text-[12px] font-extrabold tracking-[0.16em] uppercase">
                      Continue <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={confirm}
                      disabled={submitting}
                      className="btn-gold flex min-w-[220px] items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[12px] font-extrabold tracking-[0.16em] uppercase disabled:opacity-70"
                    >
                      {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending request…</>) : (<><Check className="h-4 w-4" /> Request Appointment</>)}
                    </button>
                  )}
                </div>
                <p className="mt-4 text-center text-[11px] tracking-[0.14em] text-[#A8A29A]/70 uppercase">
                  Step {step + 1} of {STEPS.length} — {STEPS[step]}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

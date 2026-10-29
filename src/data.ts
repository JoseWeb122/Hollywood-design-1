export const BUSINESS = {
  name: "Hollywdd Groom'n",
  shortName: "Hollywdd",
  tagline: "Where Everybody Is a Star.",
  owner: "Elvis Matthews",
  aka: "Hollywdd",
  phone: "", // configurable — leave empty until provided
  phoneDisplay: "Shop phone coming soon",
  address: "", // configurable
  city: "Service area coming soon",
  hours: [] as { day: string; time: string }[],
  hoursNote: "Opening hours coming soon — please contact the shop for details.",
  instagram: "",
  facebook: "",
  tiktok: "",
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Story", href: "#story" },
  { label: "Our Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    id: "clean-fades",
    name: "Clean Fades",
    short: "Seamless blends",
    description: "Precision fades, seamless blends, and sharp finishing details.",
    image:
      "https://images.pexels.com/photos/39559262/pexels-photo-39559262.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Barber using trimmers to sculpt a clean skin fade",
  },
  {
    id: "signature-haircuts",
    name: "Signature Haircuts",
    short: "Tailored to you",
    description: "Personalized cuts tailored to your style, features, and preferred finish.",
    image:
      "https://images.pexels.com/photos/34702982/pexels-photo-34702982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Barber giving a classic precision haircut in a modern shop",
  },
  {
    id: "beard-grooming",
    name: "Beard Grooming",
    short: "Shape & define",
    description: "Professional beard shaping, clean lines, and detailed finishing.",
    image:
      "https://images.pexels.com/photos/12302335/pexels-photo-12302335.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Barber shaping a client's beard with a straight razor",
  },
  {
    id: "hot-towel-shaves",
    name: "Hot Towel Shaves",
    short: "Traditional ritual",
    description: "A relaxing traditional shaving experience with a refined, comfortable finish.",
    image:
      "https://images.pexels.com/photos/10024232/pexels-photo-10024232.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Close-up of a hot towel straight-razor shave",
  },
  {
    id: "facial-cleansing",
    name: "Facial Cleansing",
    short: "Refresh & revive",
    description: "A refreshing facial cleansing experience to help you feel clean and revitalized.",
    image:
      "https://images.pexels.com/photos/7447143/pexels-photo-7447143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Barber wiping a client's face with a warm towel during facial cleansing",
  },
  {
    id: "face-steaming",
    name: "Face Steaming",
    short: "Relax & unwind",
    description: "A relaxing facial steaming service as part of a premium grooming experience.",
    image:
      "https://images.pexels.com/photos/35029555/pexels-photo-35029555.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Relaxing facial steam treatment for rejuvenated skin",
  },
  {
    id: "color-retouch",
    name: "Color Retouch",
    short: "Polished finish",
    description: "Professional color touch-ups to maintain a polished, consistent appearance.",
    image:
      "https://images.pexels.com/photos/12706272/pexels-photo-12706272.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Finished haircut and beard with polished detail",
  },
  {
    id: "additional-grooming",
    name: "Additional Grooming",
    short: "Just ask",
    description: "Additional services and personalized grooming options available at the shop.",
    image:
      "https://images.pexels.com/photos/31840003/pexels-photo-31840003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Professional barber tools arranged on a wooden table",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Fades" | "Haircuts" | "Beard Grooming" | "Transformations";
  label: string;
  span?: boolean;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "https://images.pexels.com/photos/39559325/pexels-photo-39559325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Profile of a finished buzz cut with sculpted beard — sample portfolio image",
    category: "Fades",
    label: "Skin Fade + Beard Sculpt",
    span: true,
  },
  {
    src: "https://images.pexels.com/photos/7447127/pexels-photo-7447127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Side view of a fresh haircut and beard trim — sample portfolio image",
    category: "Haircuts",
    label: "Textured Crop Finish",
  },
  {
    src: "https://images.pexels.com/photos/4625621/pexels-photo-4625621.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Barber detailing a beard in a modern barbershop — sample portfolio image",
    category: "Beard Grooming",
    label: "Beard Detail Work",
  },
  {
    src: "https://images.pexels.com/photos/39559261/pexels-photo-39559261.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Barber using clippers for a stylish cut — sample portfolio image",
    category: "Transformations",
    label: "Precision in Progress",
    span: true,
  },
  {
    src: "https://images.pexels.com/photos/19140177/pexels-photo-19140177.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Precise beard trim showcasing grooming detail — sample portfolio image",
    category: "Beard Grooming",
    label: "Line-Up & Shape",
  },
  {
    src: "https://images.pexels.com/photos/12464840/pexels-photo-12464840.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Close-up of temple blend with electric razor — sample portfolio image",
    category: "Fades",
    label: "Temple Taper Detail",
  },
  {
    src: "https://images.pexels.com/photos/11333875/pexels-photo-11333875.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Black and white detail of clipper work — sample portfolio image",
    category: "Haircuts",
    label: "Clipper Craft",
  },
  {
    src: "https://images.pexels.com/photos/12302333/pexels-photo-12302333.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Barber expertly shaving with straight razor — sample portfolio image",
    category: "Transformations",
    label: "Razor Finish Ritual",
  },
  {
    src: "https://images.pexels.com/photos/7697386/pexels-photo-7697386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Client relaxing in the barber chair — sample portfolio image",
    category: "Transformations",
    label: "The Chair Experience",
  },
];

export const FAQS = [
  {
    q: "What services does Hollywdd Groom'n offer?",
    a: "We offer clean fades, signature haircuts, beard grooming, hot towel shaves, facial cleansing, face steaming, color retouching, and additional personalized grooming options available at the shop. Explore the Services section for details — and contact the shop for pricing.",
  },
  {
    q: "Can I book an appointment online?",
    a: "This website includes a demonstration booking request form. Choose your service, date, and time to send a request. Until a live scheduling system is connected, all requests are demos only — please contact the shop to confirm your appointment.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Yes — walk-ins are welcome at Hollywdd Groom'n. For the smoothest experience, we recommend contacting the shop to check current availability before you stop by.",
  },
  {
    q: "How can I contact the shop?",
    a: "Use the contact section below. Shop phone, address, and hours will be listed there once verified. Until then, please use the booking request form and we'll guide you on next steps.",
  },
  {
    q: "Should I arrive early for my appointment?",
    a: "We recommend arriving a few minutes early so you can settle in, discuss your preferred style, and enjoy a relaxed start. Please contact the shop for any specific arrival guidance.",
  },
  {
    q: "Can I request a particular haircut or style?",
    a: "Absolutely. Bring reference photos or describe the look you want — every cut is tailored to your style, features, and preferred finish. Add notes about your preferred style when you request your appointment.",
  },
  {
    q: "How do I ask about service pricing?",
    a: "Please contact the shop for current pricing details. Pricing is listed as 'Contact for pricing' throughout this demo until verified business information is provided.",
  },
  {
    q: "What should I do if I need to reschedule?",
    a: "Life happens — please contact the shop as soon as you can to reschedule. Include your demo reference number if you booked through the request form, and we'll help you find a new time.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The attention to detail is unreal — the blend, the lineup, the finish. I walked out feeling like a star.",
    name: "Sample Guest",
    detail: "Sample placeholder — replace with authentic client review",
    service: "Clean Fade",
  },
  {
    quote:
      "Relaxing from the moment I sat down. Hot towel, sharp conversation, sharper cut. Best chair in town.",
    name: "Sample Guest",
    detail: "Sample placeholder — replace with authentic client review",
    service: "Hot Towel Shave",
  },
  {
    quote:
      "He listened, shaped my beard exactly how I wanted, and the whole experience felt premium without feeling stiff.",
    name: "Sample Guest",
    detail: "Sample placeholder — replace with authentic client review",
    service: "Beard Grooming",
  },
];

export const TIME_SLOTS = [
  "9:00 AM",
  "9:45 AM",
  "10:30 AM",
  "11:15 AM",
  "12:00 PM",
  "1:00 PM",
  "1:45 PM",
  "2:30 PM",
  "3:15 PM",
  "4:00 PM",
  "4:45 PM",
  "5:30 PM",
];

export const IMAGES = {
  heroBg:
    "https://images.pexels.com/photos/18503633/pexels-photo-18503633.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  heroCard:
    "https://images.pexels.com/photos/7447127/pexels-photo-7447127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  heroDetail:
    "https://images.pexels.com/photos/12706272/pexels-photo-12706272.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  storyMain:
    "https://images.pexels.com/photos/19664876/pexels-photo-19664876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  storySecondary:
    "https://images.pexels.com/photos/7697480/pexels-photo-7697480.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  difference:
    "https://images.pexels.com/photos/12302333/pexels-photo-12302333.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  interior:
    "https://images.pexels.com/photos/13138476/pexels-photo-13138476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  finalCta:
    "https://images.pexels.com/photos/7697395/pexels-photo-7697395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
};

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

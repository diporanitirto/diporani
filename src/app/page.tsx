"use client";

import { useState, useEffect, useRef, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";

import StrukturSection from "@/components/StrukturSection";
import MateriSection from "@/components/MateriSection";
import DokumentasiSection from "@/components/DokumentasiSection";
import AgendaSection from "@/components/AgendaSection";

// Custom hook for scroll animation using Intersection Observer (with reverse)
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = ref.current?.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements
      elements?.forEach((el) => el.classList.add('no-js'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add class when entering, remove when leaving (reverse animation)
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px 0px -20px 0px' }
    );

    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

const navLinks = [
  { label: "Profil", href: "#profil" },
  { label: "Pembina", href: "#pembina" },
  { label: "Struktur", href: "#struktur" },
  { label: "Materi", href: "#materi" },
  { label: "Dokumentasi", href: "#dokumentasi" },
  { label: "Agenda", href: "#agenda" },
  { label: "Kontak", href: "#kontak" },
];

type Pembina = {
  name: string;
  role: string;
  note: string;
  instagram: string;
};

const pembina: Pembina[] = [
  {
    name: "Kak Pembina Putra",
    role: "Pembina Penegak Putra",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    instagram: "@loremipsum",
  },
  {
    name: "Kak Pembina Putri",
    role: "Pembina Penegak Putri",
    note: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    instagram: "@loremipsum",
  },
];

const stats = [
  { label: "Anggota Aktif", value: "--", icon: "users" },
  { label: "Kegiatan", value: "--", icon: "calendar" },
  { label: "Tahun Berdiri", value: "--", icon: "flag" },
];

const containerClass = "w-full max-w-full px-4 sm:px-6 lg:px-12 xl:px-16 box-border";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

// Pramuka Lily Icon
const LilyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <path d="M50 5L55 20L65 15L58 28L70 25L60 35L75 35L62 42L80 45L62 50L80 55L62 58L75 65L60 65L70 75L58 72L65 85L55 80L50 95L45 80L35 85L42 72L30 75L40 65L25 65L38 58L20 55L38 50L20 45L38 42L25 35L40 35L30 25L42 28L35 15L45 20Z" />
  </svg>
);

// Tunas Kelapa - Simbol Pramuka Indonesia
const TunasKelapaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 120" fill="currentColor" {...props}>
    {/* Batang */}
    <path d="M48 60 L48 115 Q50 118 52 115 L52 60 Z" />
    {/* Daun Tengah */}
    <path d="M50 10 Q50 30 50 45 Q48 30 45 20 Q50 25 50 10 M50 10 Q50 30 50 45 Q52 30 55 20 Q50 25 50 10" />
    {/* Daun Kiri */}
    <path d="M50 45 Q35 35 20 40 Q35 45 45 50 Q35 42 25 45 Q40 48 50 45" />
    <path d="M50 50 Q30 45 15 55 Q32 52 48 55 Q30 50 20 55 Q38 55 50 50" />
    {/* Daun Kanan */}
    <path d="M50 45 Q65 35 80 40 Q65 45 55 50 Q65 42 75 45 Q60 48 50 45" />
    <path d="M50 50 Q70 45 85 55 Q68 52 52 55 Q70 50 80 55 Q62 55 50 50" />
    {/* Biji Kelapa */}
    <ellipse cx="50" cy="62" rx="8" ry="6" />
  </svg>
);

// Kompas Icon
const KompasIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="50" cy="50" r="45" />
    <circle cx="50" cy="50" r="40" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
    {/* Arah mata angin */}
    <path d="M50 10 L53 25 L50 20 L47 25 Z" fill="currentColor" />
    <path d="M90 50 L75 53 L80 50 L75 47 Z" fill="currentColor" />
    <path d="M50 90 L47 75 L50 80 L53 75 Z" fill="currentColor" />
    <path d="M10 50 L25 47 L20 50 L25 53 Z" fill="currentColor" />
    <text x="50" y="18" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">U</text>
    <text x="50" y="95" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">S</text>
    <text x="7" y="53" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">B</text>
    <text x="93" y="53" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none" fontWeight="bold">T</text>
  </svg>
);

// Tenda Pramuka
const TendaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 80" fill="currentColor" {...props}>
    <path d="M50 5 L95 75 L5 75 Z" opacity="0.8" />
    <path d="M50 5 L50 75" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M35 75 L50 45 L65 75" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3" />
    <rect x="42" y="55" width="16" height="20" rx="2" opacity="0.4" />
  </svg>
);

// Api Unggun
const ApiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    {/* Kayu */}
    <path d="M20 95 L45 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    <path d="M80 95 L55 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    <path d="M30 90 L70 90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
    {/* Api */}
    <path d="M50 20 Q65 35 60 50 Q70 45 65 60 Q75 55 65 75 L50 70 L35 75 Q25 55 35 60 Q30 45 40 50 Q35 35 50 20" />
    <path d="M50 35 Q58 45 55 55 Q60 52 55 65 L50 62 L45 65 Q40 52 45 55 Q42 45 50 35" opacity="0.7" />
  </svg>
);

// Simpul/Tali
const SimpulIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" {...props}>
    <path d="M5 30 Q20 10 35 30 Q50 50 65 30 Q80 10 95 30" />
    <path d="M5 35 Q20 55 35 35 Q50 15 65 35 Q80 55 95 35" />
  </svg>
);

// Pohon Pinus
const PohonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 80 100" fill="currentColor" {...props}>
    <rect x="35" y="75" width="10" height="25" />
    <path d="M40 0 L70 35 L55 35 L75 55 L55 55 L80 80 L0 80 L25 55 L5 55 L25 35 L10 35 Z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x={4} y={4} width={16} height={16} rx={4} ry={4} />
    <circle cx={12} cy={12} r={3.5} />
    <circle cx={17.5} cy={6.5} r={0.8} fill="currentColor" stroke="none" />
  </svg>
);

const UsersIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const FlagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
  </svg>
);

const StatIcon = ({ icon, className }: { icon: string; className?: string }) => {
  switch (icon) {
    case "users": return <UsersIcon className={className} />;
    case "calendar": return <CalendarIcon className={className} />;
    case "flag": return <FlagIcon className={className} />;
    default: return null;
  }
};

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef} className="min-h-screen bg-amber-50/30 text-stone-900 overflow-x-clip w-screen max-w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-amber-200/50 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-lg">
        <div className={`${containerClass} flex items-center justify-between gap-4 py-3 sm:py-4`}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Image
              src="/assets/logo-diporani.png"
              alt="Logo DIPORANI"
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-amber-100 truncate">
                <span className="sm:hidden">DIPORANI</span>
                <span className="hidden sm:inline">DIPORANI</span>
              </p>
              <p className="hidden sm:block text-[10px] text-amber-300/80 tracking-wide">
                SMA Negeri 1 Kasihan
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-amber-100/90 transition-all hover:bg-amber-700/50 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-amber-600 text-amber-100 transition hover:bg-amber-700 md:hidden"
            aria-expanded={mobileNavOpen}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12" />
                <path d="M18 6l-12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>
        {/* Mobile Nav */}
        {mobileNavOpen && (
          <div className={`${containerClass} flex flex-col gap-1 pb-4 md:hidden`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg bg-amber-800/50 px-4 py-2.5 text-center text-sm font-semibold text-amber-100 transition hover:bg-amber-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 min-h-[90vh]">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
          
          {/* Decorative Elements with CSS Animation */}
          <div className="absolute top-[5%] left-[5%] opacity-[0.2] hidden lg:block animate-float-slow">
            <TunasKelapaIcon className="h-40 w-40 text-amber-300" />
          </div>
          <div className="absolute top-[10%] right-[8%] opacity-[0.18] hidden lg:block animate-float" style={{ animationDelay: '0.5s' }}>
            <KompasIcon className="h-32 w-32 text-amber-300" />
          </div>
          <div className="absolute bottom-[25%] left-[8%] opacity-[0.15] hidden lg:block animate-sway">
            <TendaIcon className="h-28 w-28 text-amber-300" />
          </div>
          <div className="absolute bottom-[30%] right-[5%] opacity-[0.18] hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
            <PohonIcon className="h-36 w-36 text-green-400/70" />
          </div>
          <div className="absolute top-[45%] left-[3%] opacity-[0.25] hidden lg:block animate-flicker">
            <ApiIcon className="h-24 w-24 text-orange-400" />
          </div>
          <div className="absolute top-[35%] right-[25%] opacity-[0.12] hidden lg:block animate-sway" style={{ animationDelay: '0.3s' }}>
            <SimpulIcon className="h-20 w-40 text-amber-200" />
          </div>
          
          <div className={`${containerClass} relative py-16 sm:py-24 lg:py-32`}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Left Content */}
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left scroll-animate-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-900/50 px-4 py-2 backdrop-blur">
                  <LilyIcon className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
                    Pramuka Penegak
                  </span>
                </div>
                
                <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                  <span className="text-amber-400">DIPORANI</span>
                  <br />
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-amber-100/90">
                    SMA Negeri 1 Kasihan
                  </span>
                </h1>
                
                <p className="max-w-xl text-base leading-relaxed text-amber-100/80 sm:text-lg mx-auto lg:mx-0">
                  Dewan Ambalan Pramuka Penegak yang berkomitmen membentuk generasi muda berkarakter, 
                  berlandaskan Satya dan Darma Pramuka.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
                  <Link
                    href="#materi"
                    className="group flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-amber-950 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 hover:shadow-amber-400/30"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    Eksplor Materi
                  </Link>
                  <Link
                    href="#struktur"
                    className="flex items-center gap-2 rounded-xl border-2 border-amber-400/50 px-6 py-3 text-sm font-bold text-amber-100 transition hover:border-amber-400 hover:bg-amber-400/10"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    Lihat Struktur
                  </Link>
                </div>
              </div>

              {/* Right Content - Stats Cards */}
              <div className="grid gap-4 sm:gap-5 scroll-animate-right">
                {/* Logo Display */}
                <div className="flex items-center justify-center gap-6 sm:gap-10 py-4">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-amber-400/20 blur-xl" />
                    <Image
                      src="/assets/logo-diporani.png"
                      alt="Logo DIPORANI"
                      width={120}
                      height={120}
                      className="relative h-24 w-24 sm:h-32 sm:w-32 object-contain drop-shadow-lg"
                    />
                  </div>
                  <div className="h-20 w-px bg-amber-400/30" />
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-amber-400/20 blur-xl" />
                    <Image
                      src="/assets/logo-sma.png"
                      alt="Logo SMA Negeri 1 Kasihan"
                      width={120}
                      height={120}
                      className="relative h-24 w-24 sm:h-32 sm:w-32 object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-800/80 to-amber-900/80 p-3 sm:p-5 text-center backdrop-blur border border-amber-600/30 transition hover:border-amber-500/50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                      <StatIcon icon={item.icon} className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-amber-400 mb-2" />
                      <p className="text-xl sm:text-3xl font-extrabold text-white">{item.value}</p>
                      <p className="text-[9px] sm:text-xs font-medium uppercase tracking-wider text-amber-300/80 mt-1">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Motto */}
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-stone-900/80 to-amber-900/60 p-4 sm:p-6 backdrop-blur border border-amber-700/30 text-center">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 mb-2">
                    Semboyan
                  </p>
                  <p className="text-base sm:text-xl font-bold text-amber-100 italic">
                    &ldquo;Satyaku Kudarmakan, Darmaku Kubaktikan&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fef3c7" fillOpacity="0.5"/>
              <path d="M0 120L60 115C120 110 240 100 360 95C480 90 600 90 720 92C840 94 960 98 1080 100C1200 102 1320 102 1380 102L1440 102V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fef3c7"/>
            </svg>
          </div>
        </section>

        {/* Profil Section */}
        <section id="profil" className="relative bg-gradient-to-b from-amber-100 via-amber-50 to-white overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 opacity-[0.1] animate-float-slow">
            <TunasKelapaIcon className="h-80 w-80 text-amber-700" />
          </div>
          <div className="absolute bottom-10 -left-10 opacity-[0.1] animate-sway">
            <SimpulIcon className="h-56 w-56 text-amber-600" />
          </div>
          <div className="absolute top-1/2 right-20 opacity-[0.06] hidden lg:block animate-float">
            <LilyIcon className="h-32 w-32 text-amber-600" />
          </div>
          
          <div className={`${containerClass} relative grid grid-cols-1 gap-10 py-16 sm:py-20 md:grid-cols-2`}>
            <div className="space-y-5 scroll-animate">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-800 px-4 py-1.5">
                <LilyIcon className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-100">Tentang Kami</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-amber-950 sm:text-3xl lg:text-4xl">
                Mengenal Lebih Dekat <span className="text-amber-700">DIPORANI</span>
              </h2>
              <p className="text-sm leading-relaxed text-stone-700 sm:text-base">
                DIPORANI merupakan Dewan Ambalan Pramuka Penegak di SMA Negeri 1 Kasihan yang berdedikasi 
                dalam membentuk karakter pemuda melalui kegiatan kepramukaan yang edukatif dan menyenangkan.
              </p>
              <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
                Dengan semangat Satya dan Darma Pramuka, kami berkomitmen untuk mengembangkan potensi 
                setiap anggota agar menjadi generasi yang tangguh, mandiri, dan berkarakter.
              </p>
            </div>
            <div className="space-y-4 scroll-animate delay-200">
              <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-700 text-amber-100">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider text-amber-800">
                    Fokus Pembinaan
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-stone-700">
                  {["Pendidikan Karakter & Kepemimpinan", "Keterampilan Survival & Outdoor", "Pengabdian Masyarakat", "Kreativitas & Inovasi"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pembina Section */}
        <section id="pembina" className="relative bg-gradient-to-b from-white via-amber-50/30 to-amber-50/50">
          <div className={`${containerClass} space-y-8 py-16 sm:space-y-10 sm:py-20`}>
            <div className="space-y-3 text-center scroll-animate">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-800 px-4 py-1.5 mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-100">Pembina</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-amber-950 sm:text-3xl lg:text-4xl">
                Pembina <span className="text-amber-700">DIPORANI</span>
              </h2>
              <p className="text-sm text-stone-600 sm:text-base max-w-2xl mx-auto">
                Para pembina yang membimbing dan mengarahkan kegiatan kepramukaan di DIPORANI.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 max-w-3xl mx-auto">
              {pembina.map((person, idx) => (
                <div
                  key={person.name}
                  className={`group relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-white p-5 shadow-sm transition hover:border-amber-400 hover:shadow-lg scroll-animate ${idx === 1 ? 'delay-200' : ''}`}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-transparent rounded-bl-full" />
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-amber-700 to-amber-900 text-lg font-bold text-amber-100 shadow-lg">
                      {getInitials(person.name)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-base font-bold text-amber-950 truncate">{person.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">{person.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-stone-600 line-clamp-2">{person.note}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <InstagramIcon className="h-4 w-4 text-amber-600" />
                    <span className="text-xs font-medium text-amber-700">{person.instagram}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StrukturSection />

        <MateriSection />

        <DokumentasiSection />

        <AgendaSection />

        {/* Wave Divider before Kontak */}
        <div className="bg-amber-50">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 0L60 8C120 16 240 32 360 38C480 44 600 40 720 36C840 32 960 28 1080 30C1200 32 1320 40 1380 44L1440 48V80H0V0Z" fill="#92400e" fillOpacity="0.3"/>
            <path d="M0 20L60 26C120 32 240 44 360 48C480 52 600 48 720 44C840 40 960 36 1080 38C1200 40 1320 48 1380 52L1440 56V80H0V20Z" fill="#78350f"/>
          </svg>
        </div>

        {/* Kontak Section */}
        <section id="kontak" className="relative overflow-hidden bg-gradient-to-b from-amber-900 via-amber-900 to-stone-900">
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 opacity-[0.15] hidden md:block animate-flicker">
            <ApiIcon className="h-24 w-24 text-orange-400" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-[0.12] hidden md:block animate-float">
            <TendaIcon className="h-28 w-28 text-amber-300" />
          </div>
          <div className="absolute top-1/2 right-1/4 opacity-[0.08] hidden lg:block animate-float-slow">
            <TunasKelapaIcon className="h-48 w-48 text-amber-200" />
          </div>
          <div className="absolute bottom-1/3 left-1/4 opacity-[0.06] hidden lg:block animate-sway">
            <PohonIcon className="h-36 w-36 text-green-400/50" />
          </div>
          
          <div className={`${containerClass} relative flex flex-col gap-8 py-16 text-white sm:gap-10 sm:py-20 md:flex-row md:items-center md:justify-between`}>
            <div className="space-y-4 text-center md:max-w-lg md:text-left scroll-animate-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-700/50 px-4 py-1.5 backdrop-blur">
                <LilyIcon className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-200">Hubungi Kami</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Ada Pertanyaan?
              </h2>
              <p className="text-sm leading-relaxed text-amber-100/80 sm:text-base">
                Jangan ragu untuk menghubungi kami. Kami siap membantu dan menjawab pertanyaan seputar kegiatan DIPORANI.
              </p>
            </div>
            <div className="grid gap-4 text-center md:text-left scroll-animate-right">
              <div className="rounded-2xl bg-amber-800/50 p-5 backdrop-blur border border-amber-600/30">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">Email</p>
                <p className="text-amber-100">email@contoh.com</p>
              </div>
              <div className="rounded-2xl bg-amber-800/50 p-5 backdrop-blur border border-amber-600/30">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">Instagram</p>
                <p className="text-amber-100">@diporani.tirto</p>
              </div>
              <div className="rounded-2xl bg-amber-800/50 p-5 backdrop-blur border border-amber-600/30">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">Alamat</p>
                <p className="text-amber-100 text-sm">Alamat Sekolah</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Scout Camp Scene */}
      <footer className="relative border-t border-amber-200 bg-gradient-to-b from-amber-100 via-amber-50 to-green-50 overflow-hidden">
        {/* Camp Scene Illustration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 pointer-events-none">
          {/* Ground/Grass */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-600/20 to-transparent" />
          
          {/* Trees - Left Side */}
          <div className="absolute bottom-0 left-[5%] opacity-20">
            <PohonIcon className="h-28 sm:h-36 w-auto text-green-700" />
          </div>
          <div className="absolute bottom-0 left-[12%] opacity-15 hidden sm:block">
            <PohonIcon className="h-20 w-auto text-green-600" />
          </div>
          
          {/* Campfire - Center */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-30">
            <ApiIcon className="h-16 sm:h-20 w-auto text-amber-600" />
          </div>
          
          {/* Tent - Right of center */}
          <div className="absolute bottom-0 right-[30%] opacity-20 hidden sm:block">
            <TendaIcon className="h-20 w-auto text-amber-700" />
          </div>
          
          {/* Trees - Right Side */}
          <div className="absolute bottom-0 right-[8%] opacity-20">
            <PohonIcon className="h-32 sm:h-40 w-auto text-green-700" />
          </div>
          <div className="absolute bottom-0 right-[15%] opacity-15 hidden sm:block">
            <PohonIcon className="h-24 w-auto text-green-600" />
          </div>
          
          {/* Small decorative elements */}
          <div className="absolute bottom-4 left-[25%] opacity-10 hidden md:block">
            <KompasIcon className="h-10 w-10 text-amber-700" />
          </div>
          <div className="absolute bottom-6 right-[45%] opacity-10 hidden md:block">
            <SimpulIcon className="h-8 w-16 text-amber-600" />
          </div>
        </div>

        {/* Main Footer Content */}
        <div className={`${containerClass} relative py-12 sm:py-16`}>
          {/* Scout Motto Banner */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-amber-800/90 px-6 py-3 shadow-lg">
              <TunasKelapaIcon className="h-6 w-6 text-amber-300" />
              <span className="text-sm font-bold text-amber-100 tracking-wide">
                Satyaku Kudarmakan, Darmaku Kubaktikan
              </span>
              <TunasKelapaIcon className="h-6 w-6 text-amber-300" />
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-amber-400/30 blur" />
                <Image
                  src="/assets/logo-diporani.png"
                  alt="Logo DIPORANI"
                  width={48}
                  height={48}
                  className="relative h-12 w-12 rounded-full border-2 border-amber-400 object-contain p-0.5 bg-white"
                />
              </div>
              <div>
                <p className="text-base font-bold text-amber-900">DIPORANI</p>
                <p className="text-xs text-amber-700">Dewan Ambalan SMA Negeri 1 Kasihan</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 sm:items-end">
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/diporani.tirto/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-900 transition">
                  <InstagramIcon className="h-4 w-4" />
                  @diporani.tirto
                </a>
              </div>
              <p className="text-xs text-amber-600">
                &copy; {new Date().getFullYear()} DIPORANI - Pramuka Penegak
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Border */}
        <div className="h-2 bg-gradient-to-r from-amber-600 via-amber-500 to-green-600" />
      </footer>
    </div>
  );
}

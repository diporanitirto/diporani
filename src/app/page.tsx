"use client";

import { useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";

import StrukturSection from "@/components/StrukturSection";
import MateriSection from "@/components/MateriSection";
import DokumentasiSection from "@/components/DokumentasiSection";
import AgendaSection from "@/components/AgendaSection";

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
  { label: "Lorem Ipsum", value: "000+" },
  { label: "Dolor Sit", value: "000" },
  { label: "Amet", value: "000" },
];

const containerClass = "w-full max-w-full px-4 sm:px-6 lg:px-12 xl:px-16 box-border";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

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

const InstagramTag = ({ handle }: { handle?: string }) => {
  if (!handle) return null;

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
      <InstagramIcon className="h-3.5 w-3.5" />
      <span>{handle}</span>
    </div>
  );
};

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-clip w-screen max-w-full">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className={`${containerClass} flex items-center justify-between gap-4 py-4 sm:gap-6`}>
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo-diporani.png"
              alt="Logo DIPORANI"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full border border-slate-200 object-contain p-1"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Pramuka Penegak
              </p>
              <p className="text-base font-semibold text-slate-900">
                Diporani SMA Negeri 1 Kasihan
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-900 hover:text-slate-900 md:hidden"
            aria-expanded={mobileNavOpen}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 6l12 12" />
                <path d="M18 6l-12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>
        {mobileNavOpen ? (
          <div className={`${containerClass} flex flex-col gap-2 pb-4 md:hidden`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <main>
        <section className="border-b border-slate-200 bg-slate-50/60">
          <div className={`${containerClass} grid grid-cols-1 gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:items-center`}>
            <div className="space-y-6 sm:space-y-8 min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:px-4 sm:text-xs">
                Profil DIPORANI
              </span>
              <h1 className="text-balance text-2xl font-bold leading-snug text-slate-900 sm:text-4xl lg:text-5xl">
                Diporani SMA Negeri 1 Kasihan
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget urna ut libero aliquet commodo sit amet vel mauris.
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#materi"
                  className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Eksplor Materi
                </Link>
                <Link
                  href="#struktur"
                  className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                >
                  Lihat Struktur
                </Link>
              </div>
            </div>
            <div className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:gap-6 sm:p-8">
              <div className="flex items-center justify-between">
                <Image
                  src="/assets/logo-diporani.png"
                  alt="Logo DIPORANI"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full border border-slate-200 object-contain p-2"
                />
                <Image
                  src="/assets/logo-sma.png"
                  alt="Logo SMA Negeri 1 Kasihan"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full border border-slate-200 object-contain p-2"
                />
              </div>
              <div className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Nilai Inti
                </p>
                <p className="text-base font-semibold text-slate-900 sm:text-lg">
                  Lorem | Ipsum | Dolor
                </p>
                <p className="text-sm text-slate-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center sm:gap-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center shadow-sm sm:px-4 sm:py-5"
                  >
                    <p className="text-xl font-semibold text-slate-900 sm:text-2xl">{item.value}</p>
                    <p className="text-[0.6rem] uppercase tracking-[0.25em] text-slate-500 sm:text-xs">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="profil" className="border-b border-slate-200">
          <div className={`${containerClass} grid grid-cols-1 gap-10 py-16 sm:py-20 md:grid-cols-2`}>
            <div className="space-y-5">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Tentang DIPORANI
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non dui sit amet arcu
                pulvinar dictum. Nulla facilisi. Phasellus interdum ligula vel magna aliquet, sed malesuada
                leo aliquam.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Integer lacinia metus vitae tempus luctus. Donec viverra eros a mauris ullamcorper, vitae
                efficitur tortor pellentesque. Cras nec mi ac sapien ultricies suscipit ut sed justo.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Fokus Pembinaan
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700 list-disc list-inside">
                  <li>Lorem ipsum dolor sit amet</li>
                  <li>Consectetur adipiscing elit sed</li>
                  <li>Do eiusmod tempor incididunt</li>
                  <li>Ut labore et dolore magna aliqua</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="pembina" className="border-b border-slate-200 bg-slate-50/60">
          <div className={`${containerClass} space-y-8 py-16 sm:space-y-10 sm:py-20`}>
            <div className="space-y-3 text-center">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Pembina DIPORANI
              </h2>
              <p className="text-sm text-slate-600 sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 max-[420px]:grid-cols-1">
              {pembina.map((person) => (
                <div
                  key={person.name}
                  className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-base font-semibold text-white">
                      {getInitials(person.name)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900 sm:text-base">{person.name}</p>
                        <div className="shrink-0">
                          <InstagramTag handle={person.instagram} />
                        </div>
                      </div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 sm:text-sm">{person.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 sm:text-base">{person.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StrukturSection />

        <MateriSection />

        <DokumentasiSection />

        <AgendaSection />

        <section id="kontak" className="bg-slate-900">
          <div className={`${containerClass} flex flex-col gap-8 py-16 text-white sm:gap-10 sm:py-20 md:flex-row md:items-center md:justify-between`}>
            <div className="space-y-3 text-center md:max-w-lg md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                Hubungi Kami
              </p>
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Informasi Kontak DIPORANI
              </h2>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-center text-sm text-slate-200 md:text-left">
              <p className="font-semibold text-white">Email resmi</p>
              <p>loremipsum@example.com</p>
              <p className="font-semibold text-white">Instagram</p>
              <p>@loremipsum</p>
              <p className="font-semibold text-white">Alamat Sekretariat</p>
              <p>Lorem ipsum dolor sit amet, Bantul</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className={`${containerClass} flex flex-col gap-3 py-8 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between`}>
          <p>&copy; {new Date().getFullYear()} DIPORANI - SMA Negeri 1 Kasihan.</p>
          <p>Pramuka DIPORANI siap berkarya untuk sekolah dan masyarakat.</p>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";

import { dokumentasiList } from "@/data/dokumentasi";
import { SimpleHeader } from "@/components/SimpleHeader";

const containerClass = "w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16";

export default function DokumentasiPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SimpleHeader containerClass={containerClass} />
      <main className={`${containerClass} space-y-10 py-16 sm:space-y-12 sm:py-20`}>
        <div className="space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Dokumentasi DIPORANI
          </span>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Arsip Kegiatan Ambalan Diporani
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semua data dokumentasi menggunakan gambar dan penjelasan placeholder untuk kebutuhan presentasi awal.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dokumentasiList.map((item) => (
            <Link
              key={item.slug}
              href={`/dokumentasi/${item.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative overflow-hidden bg-slate-900 px-6 py-10 text-white">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                  Dokumentasi
                </span>
                <p className="mt-4 text-lg font-semibold text-white sm:text-xl">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-slate-200">{item.date}</p>
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/10 blur-2xl" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 px-6 py-5">
                <p className="text-sm leading-relaxed text-slate-600">{item.summary}</p>
                <div className="mt-auto flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 transition group-hover:text-slate-600">
                  <span>Galeri Kegiatan</span>
                  <span>Detail dokumentasi →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

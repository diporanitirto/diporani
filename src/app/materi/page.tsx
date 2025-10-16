import Link from "next/link";

import { materiList } from "@/data/materi";

const containerClass = "w-full max-w-5xl mx-auto px-6";

export default function MateriIndexPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className={`${containerClass} space-y-12 py-16`}>
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Materi DIPORANI</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Kumpulan Materi Latihan Pramuka DIPORANI
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Materi berikut dapat digunakan sebagai referensi latihan dan penguatan karakter penegak.
          </p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2">
          {materiList.map((item) => (
            <Link
              key={item.slug}
              href={`/materi/${item.slug}`}
              className="group flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                {item.title}
              </p>
              <p className="text-sm leading-relaxed text-slate-600">{item.shortDescription}</p>
              <span className="mt-auto text-sm font-semibold text-slate-900 group-hover:text-slate-600">
                Baca selengkapnya
              </span>
            </Link>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p>DIPORANI Pramuka - SMA Negeri 1 Kasihan</p>
        </div>
      </div>
    </div>
  );
}

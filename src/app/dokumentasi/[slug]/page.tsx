import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { dokumentasiList } from "@/data/dokumentasi";
import { SimpleHeader } from "@/components/SimpleHeader";

const containerClass = "w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-16";

const getDokumentasiBySlug = (slug: string) =>
  dokumentasiList.find((item) => item.slug === slug);

export async function generateStaticParams() {
  return dokumentasiList.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = getDokumentasiBySlug(params.slug);

  if (!item) {
    return {
      title: "Dokumentasi tidak ditemukan",
    };
  }

  return {
    title: `${item.title} | Dokumentasi Diporani`,
    description: item.summary,
  };
}

export default function DokumentasiDetail({
  params,
}: {
  params: { slug: string };
}) {
  const item = getDokumentasiBySlug(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SimpleHeader containerClass={containerClass} />
      <main className={`${containerClass} space-y-12 py-16 sm:space-y-16 sm:py-20`}>
        <Link
          href="/dokumentasi"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
        >
          ← Dokumentasi lain
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
              Dokumentasi
            </span>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {item.title}
            </h1>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              {item.date}
            </p>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {item.summary}
            </p>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Highlight Kegiatan
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc list-inside">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5 text-sm leading-relaxed text-slate-600 sm:text-base">
            {item.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Galeri Kegiatan
            </h2>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Diporani
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {item.gallery.map((photo) => (
              <div
                key={photo.title}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div
                  className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${photo.gradient}`}
                >
                  <span className="text-base font-semibold uppercase tracking-[0.3em] text-white">
                    Placeholder
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                  <p className="text-sm font-semibold text-slate-900">{photo.title}</p>
                  <p className="text-sm text-slate-600">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

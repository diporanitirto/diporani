import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { materiList } from "@/data/materi";

type MateriPageProps = {
  params: {
    slug: string;
  };
};

const containerClass = "w-full max-w-3xl mx-auto px-6";

export function generateStaticParams() {
  return materiList.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: MateriPageProps): Metadata {
  const materi = materiList.find((item) => item.slug === params.slug);

  if (!materi) {
    return {
      title: "Materi DIPORANI",
      description: "Materi latihan Pramuka DIPORANI SMA Negeri 1 Kasihan.",
    };
  }

  return {
    title: `${materi.title} | Materi DIPORANI`,
    description: materi.shortDescription,
  };
}

export default function MateriDetailPage({ params }: MateriPageProps) {
  const materi = materiList.find((item) => item.slug === params.slug);

  if (!materi) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className={`${containerClass} space-y-10 py-16`}>
        <Link
          href="/materi"
          className="inline-flex items-center text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          Kembali ke daftar materi
        </Link>
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Materi DIPORANI</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            {materi.title}
          </h1>
          <p className="text-base leading-relaxed text-slate-600">
            {materi.shortDescription}
          </p>
        </header>
        <section className="space-y-4 text-base leading-relaxed text-slate-700">
          {materi.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Tujuan Pembelajaran
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc list-inside">
            {materi.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>DIPORANI Pramuka - SMA Negeri 1 Kasihan</p>
          <Link
            href="/materi"
            className="font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Telusuri materi lain
          </Link>
        </div>
      </div>
    </div>
  );
}

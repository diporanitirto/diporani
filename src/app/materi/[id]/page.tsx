import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMateriById, formatFileSize, formatDate } from "@/lib/materi";
import { SimpleHeader } from "@/components/SimpleHeader";

type MateriPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const containerClass = "w-full max-w-full px-4 sm:px-6 lg:px-12 xl:px-16 box-border";

export const revalidate = 60;

export async function generateMetadata({ params }: MateriPageProps): Promise<Metadata> {
  const { id } = await params;
  const materi = await getMateriById(id);

  if (!materi) {
    return {
      title: "Materi DIPORANI",
      description: "Materi latihan Pramuka DIPORANI SMA Negeri 1 Kasihan.",
    };
  }

  return {
    title: `${materi.title} | Materi DIPORANI`,
    description: materi.description ?? "Materi latihan Pramuka DIPORANI",
  };
}

export default async function MateriDetailPage({ params }: MateriPageProps) {
  const { id } = await params;
  const materi = await getMateriById(id);

  if (!materi) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SimpleHeader containerClass={containerClass} />
      <div className={`${containerClass} space-y-6 py-6 sm:space-y-8 sm:py-8`}>
        <Link
          href="/materi"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke daftar materi
        </Link>
        
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>📖</span>
            <span className="uppercase tracking-[0.2em]">Artikel Materi</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            {materi.title}
          </h1>
          {materi.description && (
            <p className="text-lg text-slate-600">
              {materi.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>Diunggah: {formatDate(materi.created_at)}</span>
          </div>
        </header>

        {/* Article Content */}
        {materi.content && (
          <article className="prose prose-slate prose-lg max-w-none">
            <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {materi.content}
            </div>
          </article>
        )}

        {/* File Attachment */}
        {materi.file_url && (
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
              📎 File Lampiran
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {materi.file_name || 'File Lampiran'}
                  </p>
                  {materi.file_size && (
                    <p className="text-xs text-slate-500">{formatFileSize(materi.file_size)}</p>
                  )}
                </div>
              </div>
              <a
                href={materi.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Unduh File
              </a>
            </div>
          </section>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>DIPORANI - SMA Negeri 1 Kasihan</p>
          <Link
            href="/materi"
            className="font-semibold text-slate-600 transition hover:text-slate-900"
          >
            Telusuri materi lain →
          </Link>
        </div>
      </div>
    </div>
  );
}

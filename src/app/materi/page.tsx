import Link from "next/link";
import { getMateriList, formatDate } from "@/lib/materi";
import { SimpleHeader } from "@/components/SimpleHeader";

const containerClass = "w-full px-4 sm:px-6 lg:px-12 xl:px-16";

export const revalidate = 60; // Revalidate setiap 60 detik

// Truncate content for preview
function truncateContent(content: string | null, maxLength: number = 150): string {
  if (!content) return '';
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
}

export default async function MateriIndexPage() {
  const materials = await getMateriList();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SimpleHeader containerClass={containerClass} />
      <div className={`${containerClass} space-y-12 py-16`}>
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Materi DIPORANI</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Kumpulan Materi Latihan Pramuka
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600">
            Materi-materi berikut dapat digunakan sebagai referensi latihan dan penguatan karakter penegak.
            Klik untuk membaca detail materi.
          </p>
        </header>

        {materials.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-slate-600">Belum ada materi yang tersedia.</p>
            <p className="text-sm text-slate-500 mt-2">
              Materi akan ditampilkan di sini setelah diunggah oleh tim.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {materials.map((item) => (
              <Link
                key={item.id}
                href={`/materi/${item.id}`}
                className="group flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-slate-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-2">
                      📖 Artikel Materi
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 group-hover:text-slate-700 transition">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                {item.description && (
                  <p className="text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {item.description}
                  </p>
                )}
                
                {item.content && (
                  <p className="text-sm text-slate-500 line-clamp-3">
                    {truncateContent(item.content)}
                  </p>
                )}
                
                <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs text-slate-500">{formatDate(item.created_at)}</span>
                  <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition flex items-center gap-1">
                    Baca Selengkapnya
                    <svg className="h-3 w-3 transform group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
                
                {item.file_url && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span>Tersedia file lampiran</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p>DIPORANI - SMA Negeri 1 Kasihan</p>
        </div>
      </div>
    </div>
  );
}

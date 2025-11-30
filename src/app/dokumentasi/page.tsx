"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SimpleHeader } from "@/components/SimpleHeader";
import { supabase } from "@/lib/supabase";

type Dokumentasi = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  file_url: string;
  file_type: string | null;
  created_at: string;
};

const containerClass = "w-full px-4 sm:px-6 lg:px-12 xl:px-16";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="h-72 animate-pulse rounded-3xl bg-slate-100" />
    ))}
  </div>
);

export default function DokumentasiPage() {
  const [dokumentasiList, setDokumentasiList] = useState<Dokumentasi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDokumentasi() {
      const { data, error } = await supabase
        .from('documentation_assets')
        .select('id, title, description, category, file_url, file_type, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching dokumentasi:', error);
      } else {
        setDokumentasiList(data || []);
      }
      setLoading(false);
    }

    fetchDokumentasi();
  }, []);

  const isImage = (fileType: string | null) => fileType?.startsWith('image/');
  const isVideo = (fileType: string | null) => fileType?.startsWith('video/');

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
            Galeri foto dan video kegiatan DIPORANI SMA Negeri 1 Kasihan.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : dokumentasiList.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dokumentasiList.map((item) => (
              <Link
                key={item.id}
                href={`/dokumentasi/${item.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {isImage(item.file_type) ? (
                    <Image
                      src={item.file_url}
                      alt={item.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  ) : isVideo(item.file_type) ? (
                    <video
                      src={item.file_url}
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-900 text-white">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
                      {item.category || 'Foto'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-lg font-semibold text-slate-900 line-clamp-1">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <p className="mt-auto text-xs text-slate-400">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200">
              <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-slate-700">Belum ada dokumentasi</p>
            <p className="mt-1 text-sm text-slate-500">Dokumentasi kegiatan akan ditampilkan di sini</p>
          </div>
        )}
      </main>
    </div>
  );
}

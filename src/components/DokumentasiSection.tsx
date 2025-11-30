"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

const containerClass = "w-full max-w-full px-4 sm:px-6 lg:px-12 xl:px-16 box-border";

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
      <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100" />
    ))}
  </div>
);

export default function DokumentasiSection() {
  const [dokumentasiList, setDokumentasiList] = useState<Dokumentasi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDokumentasi() {
      console.log('Fetching dokumentasi...');
      const { data, error } = await supabase
        .from('documentation_assets')
        .select('id, title, description, category, file_url, file_type, created_at')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching dokumentasi:', error);
      } else {
        console.log('Fetched dokumentasi:', data);
        setDokumentasiList(data || []);
      }
      setLoading(false);
    }

    fetchDokumentasi();
  }, []);

  const isImage = (fileType: string | null) => fileType === 'image' || fileType?.startsWith('image/');

  return (
    <section id="dokumentasi" className="border-b border-slate-200 overflow-hidden">
      <div className={`${containerClass} space-y-8 py-16 sm:py-20 overflow-hidden`}>
        <div className="space-y-3 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Dokumentasi Kegiatan
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">
            Galeri foto dan video kegiatan DIPORANI SMA Negeri 1 Kasihan.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : dokumentasiList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dokumentasiList.map((item) => (
              <Link
                key={item.id}
                href={`/dokumentasi/${item.id}`}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:rounded-3xl"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  {isImage(item.file_type) ? (
                    <Image
                      src={item.file_url}
                      alt={item.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-900 text-white">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
                      {item.category || 'Foto'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                  <p className="text-base font-semibold text-slate-900 line-clamp-1 sm:text-lg">
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
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-500">Belum ada dokumentasi</p>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/dokumentasi"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            Lihat semua dokumentasi
          </Link>
        </div>
      </div>
    </section>
  );
}

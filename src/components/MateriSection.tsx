"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Materi = {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  created_at: string;
};

const containerClass = "w-full max-w-full px-4 sm:px-6 lg:px-12 xl:px-16 box-border";

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-40 animate-pulse rounded-3xl bg-slate-100" />
    ))}
  </div>
);

export default function MateriSection() {
  const [materiList, setMateriList] = useState<Materi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMateri() {
      console.log('Fetching materi...');
      const { data, error } = await supabase
        .from('materials')
        .select('id, title, description, content, created_at')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Error fetching materi:', error);
      } else {
        console.log('Fetched materi:', data);
        setMateriList(data || []);
      }
      setLoading(false);
    }

    fetchMateri();
  }, []);

  return (
    <section id="materi" className="border-b border-slate-200 bg-slate-50/60 overflow-hidden">
      <div className={`${containerClass} space-y-8 py-16 sm:py-20 overflow-hidden`}>
        <div className="space-y-3 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Materi Latihan DIPORANI
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">
            Kumpulan materi dan artikel untuk menunjang kegiatan kepramukaan.
          </p>
        </div>
        
        {loading ? (
          <LoadingSkeleton />
        ) : materiList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            {materiList.map((item) => (
              <Link
                key={item.id}
                href={`/materi/${item.id}`}
                className="group flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 truncate">
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed text-slate-600 line-clamp-2">
                  {item.description || item.content?.substring(0, 150) || 'Materi latihan pramuka'}
                </p>
                <span className="mt-auto text-sm font-semibold text-slate-900 group-hover:text-slate-600">
                  Baca selengkapnya →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-500">Belum ada materi</p>
          </div>
        )}
        
        <div className="text-center">
          <Link
            href="/materi"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            Lihat semua materi
          </Link>
        </div>
      </div>
    </section>
  );
}

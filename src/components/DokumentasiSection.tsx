"use client";

import { useState, useEffect, useRef, type SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

// Decorative Icons
const TendaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 80" fill="currentColor" {...props}>
    <path d="M50 5 L95 75 L5 75 Z" opacity="0.8" />
    <path d="M50 5 L50 75" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M35 75 L50 45 L65 75" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3" />
    <rect x="42" y="55" width="16" height="20" rx="2" opacity="0.4" />
  </svg>
);

const ApiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <path d="M20 95 L45 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    <path d="M80 95 L55 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    <path d="M30 90 L70 90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
    <path d="M50 20 Q65 35 60 50 Q70 45 65 60 Q75 55 65 75 L50 70 L35 75 Q25 55 35 60 Q30 45 40 50 Q35 35 50 20" />
    <path d="M50 35 Q58 45 55 55 Q60 52 55 65 L50 62 L45 65 Q40 52 45 55 Q42 45 50 35" opacity="0.7" />
  </svg>
);

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
      <div key={i} className="h-64 animate-pulse rounded-3xl bg-amber-100" />
    ))}
  </div>
);

export default function DokumentasiSection() {
  const [dokumentasiList, setDokumentasiList] = useState<Dokumentasi[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Setup scroll animation after data is loaded
  useEffect(() => {
    if (loading) return;
    
    const elements = sectionRef.current?.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    if (!('IntersectionObserver' in window)) {
      elements?.forEach((el) => el.classList.add('no-js'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px 0px -20px 0px' }
    );

    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  const isImage = (fileType: string | null) => fileType === 'image' || fileType?.startsWith('image/');

  return (
    <section ref={sectionRef} id="dokumentasi" className="relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30">
      {/* Decorative Elements with Animation */}
      <div className="absolute top-10 -right-10 opacity-[0.15] hidden lg:block animate-float">
        <TendaIcon className="h-48 w-48 text-amber-700" />
      </div>
      <div className="absolute bottom-10 -left-10 opacity-[0.2] hidden lg:block animate-flicker">
        <ApiIcon className="h-44 w-44 text-orange-600" />
      </div>
      <div className="absolute top-1/2 right-24 opacity-[0.1] hidden lg:block animate-float-slow">
        <TendaIcon className="h-32 w-32 text-amber-600 -rotate-6" />
      </div>
      <div className="absolute bottom-1/3 left-20 opacity-[0.12] hidden lg:block animate-flicker" style={{ animationDelay: '0.5s' }}>
        <ApiIcon className="h-28 w-28 text-orange-500" />
      </div>
      
      <div className={`${containerClass} relative space-y-8 py-16 sm:py-20 overflow-hidden`}>
        <div className="space-y-3 text-center scroll-animate">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
            Galeri
          </span>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
            Dokumentasi Kegiatan
          </h2>
          <p className="text-sm text-stone-600 sm:text-base">
            Galeri foto dan video kegiatan DIPORANI SMA Negeri 1 Kasihan.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : dokumentasiList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dokumentasiList.map((item, idx) => (
              <Link
                key={item.id}
                href={`/dokumentasi/${item.id}`}
                className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:shadow-amber-100 sm:rounded-3xl scroll-animate ${idx % 3 === 1 ? 'delay-100' : idx % 3 === 2 ? 'delay-200' : ''}`}
              >
                <div className="relative aspect-video overflow-hidden bg-amber-100">
                  {isImage(item.file_type) ? (
                    <Image
                      src={item.file_url}
                      alt={item.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-amber-900 text-amber-100">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
                      {item.category || 'Foto'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                  <p className="text-base font-semibold text-stone-800 line-clamp-1 sm:text-lg">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-sm text-stone-600 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <p className="mt-auto text-xs text-stone-400">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
            <p className="text-stone-500">Belum ada dokumentasi</p>
          </div>
        )}

        <div className="text-center scroll-animate">
          <Link
            href="/dokumentasi"
            className="inline-flex items-center gap-2 rounded-full border-2 border-amber-600 px-5 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-600 hover:text-white"
          >
            Lihat semua dokumentasi
          </Link>
        </div>
      </div>
    </section>
  );
}

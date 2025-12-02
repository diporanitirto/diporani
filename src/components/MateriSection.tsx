"use client";

import { useState, useEffect, useRef, type SVGProps } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Decorative Icons
const PohonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 80 100" fill="currentColor" {...props}>
    <rect x="35" y="75" width="10" height="25" />
    <path d="M40 0 L70 35 L55 35 L75 55 L55 55 L80 80 L0 80 L25 55 L5 55 L25 35 L10 35 Z" />
  </svg>
);

const KompasIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="50" cy="50" r="45" />
    <circle cx="50" cy="50" r="40" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
    <path d="M50 10 L53 25 L50 20 L47 25 Z" fill="currentColor" />
    <path d="M90 50 L75 53 L80 50 L75 47 Z" fill="currentColor" />
    <path d="M50 90 L47 75 L50 80 L53 75 Z" fill="currentColor" />
    <path d="M10 50 L25 47 L20 50 L25 53 Z" fill="currentColor" />
  </svg>
);

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
      <div key={i} className="h-40 animate-pulse rounded-3xl bg-amber-100" />
    ))}
  </div>
);

export default function MateriSection() {
  const [materiList, setMateriList] = useState<Materi[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} id="materi" className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/30 to-amber-50/50">
      {/* Decorative Elements with Animation */}
      <div className="absolute -top-5 -right-10 opacity-[0.15] hidden lg:block animate-sway">
        <PohonIcon className="h-56 w-56 text-green-700" />
      </div>
      <div className="absolute bottom-10 -left-10 opacity-[0.15] hidden lg:block animate-sway" style={{ animationDelay: '2s' }}>
        <PohonIcon className="h-40 w-40 text-green-600" />
      </div>
      <div className="absolute top-1/4 left-16 opacity-[0.12] hidden lg:block animate-float-slow">
        <KompasIcon className="h-32 w-32 text-amber-600" />
      </div>
      <div className="absolute bottom-1/3 right-16 opacity-[0.06] hidden lg:block">
        <PohonIcon className="h-32 w-32 text-green-500" />
      </div>
      
      <div className={`${containerClass} relative space-y-8 py-16 sm:py-20 overflow-hidden`}>
        <div className="space-y-3 text-center scroll-animate">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-green-700">
            Pendidikan
          </span>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
            Materi Latihan DIPORANI
          </h2>
          <p className="text-sm text-stone-600 sm:text-base">
            Kumpulan materi dan artikel untuk menunjang kegiatan kepramukaan.
          </p>
        </div>
        
        {loading ? (
          <LoadingSkeleton />
        ) : materiList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            {materiList.map((item, idx) => (
              <Link
                key={item.id}
                href={`/materi/${item.id}`}
                className={`group flex h-full min-w-0 flex-col gap-4 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:shadow-amber-100 sm:rounded-3xl sm:p-6 scroll-animate ${idx % 2 === 1 ? 'delay-200' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-stone-800 line-clamp-2 sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-stone-600 line-clamp-2">
                  {item.description || item.content?.substring(0, 150) || 'Materi latihan pramuka'}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-amber-700 group-hover:text-amber-900">
                  Baca selengkapnya 
                  <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
            <p className="text-stone-500">Belum ada materi</p>
          </div>
        )}
        
        <div className="text-center scroll-animate">
          <Link
            href="/materi"
            className="inline-flex items-center gap-2 rounded-full border-2 border-amber-600 px-5 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-600 hover:text-white"
          >
            Lihat semua materi
          </Link>
        </div>
      </div>
    </section>
  );
}

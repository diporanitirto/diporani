"use client";

import { useState, useEffect, useRef, type SVGProps } from "react";
import { supabase } from "@/lib/supabase";

// Decorative Icons
const LilyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <path d="M50 5L55 20L65 15L58 28L70 25L60 35L75 35L62 42L80 45L62 50L80 55L62 58L75 65L60 65L70 75L58 72L65 85L55 80L50 95L45 80L35 85L42 72L30 75L40 65L25 65L38 58L20 55L38 50L20 45L38 42L25 35L40 35L30 25L42 28L35 15L45 20Z" />
  </svg>
);

const PohonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 80 100" fill="currentColor" {...props}>
    <rect x="35" y="75" width="10" height="25" />
    <path d="M40 0 L70 35 L55 35 L75 55 L55 55 L80 80 L0 80 L25 55 L5 55 L25 35 L10 35 Z" />
  </svg>
);

const SimpulIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" {...props}>
    <path d="M5 30 Q20 10 35 30 Q50 50 65 30 Q80 10 95 30" />
    <path d="M5 35 Q20 55 35 35 Q50 15 65 35 Q80 55 95 35" />
  </svg>
);

type Agenda = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  starts_at: string;
  ends_at: string | null;
  created_at: string;
};

const containerClass = "w-full max-w-full px-4 sm:px-6 lg:px-12 xl:px-16 box-border";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return {
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase(),
    year: date.getFullYear(),
    full: date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-40 animate-pulse rounded-3xl bg-amber-100" />
    ))}
  </div>
);

export default function AgendaSection() {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchAgenda() {
      console.log('Fetching agenda...');
      // Get upcoming agendas (starts_at >= now)
      const { data, error } = await supabase
        .from('agendas')
        .select('id, title, description, location, starts_at, ends_at, created_at')
        .gte('starts_at', new Date().toISOString())
        .order('starts_at', { ascending: true })
        .limit(3);

      if (error) {
        console.error('Error fetching agenda:', error);
      } else {
        console.log('Fetched agenda:', data);
        setAgendaList(data || []);
      }
      setLoading(false);
    }

    fetchAgenda();
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
    <section ref={sectionRef} id="agenda" className="relative overflow-hidden bg-gradient-to-b from-amber-50/30 via-amber-50 to-amber-50">
      {/* Decorative Elements with Animation */}
      <div className="absolute -top-5 -left-10 opacity-[0.15] hidden lg:block animate-sway">
        <PohonIcon className="h-52 w-52 text-green-700" />
      </div>
      <div className="absolute top-1/4 -right-5 opacity-[0.15] hidden lg:block animate-pulse-glow">
        <LilyIcon className="h-44 w-44 text-amber-600" />
      </div>
      <div className="absolute bottom-10 right-24 opacity-[0.12] hidden lg:block animate-sway" style={{ animationDelay: '1s' }}>
        <SimpulIcon className="h-20 w-40 text-amber-500 -rotate-12" />
      </div>
      <div className="absolute bottom-16 left-16 opacity-[0.12] hidden lg:block animate-sway" style={{ animationDelay: '2s' }}>
        <PohonIcon className="h-40 w-40 text-green-600" />
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-[0.1] hidden lg:block animate-float">
        <LilyIcon className="h-28 w-28 text-amber-500" />
      </div>
      
      <div className={`${containerClass} relative space-y-8 py-16 sm:py-20 overflow-hidden`}>
        <div className="space-y-3 text-center scroll-animate">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-green-700">
            Jadwal
          </span>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
            Agenda Kegiatan
          </h2>
          <p className="text-sm text-stone-600 sm:text-base">
            Jadwal kegiatan DIPORANI yang akan datang.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : agendaList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agendaList.map((item, idx) => {
              const date = formatDate(item.starts_at);
              return (
                <div
                  key={item.id}
                  className={`flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm sm:gap-4 sm:rounded-3xl sm:p-5 scroll-animate ${idx % 3 === 1 ? 'delay-100' : idx % 3 === 2 ? 'delay-200' : ''}`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex shrink-0 flex-col items-center rounded-xl bg-gradient-to-b from-amber-700 to-amber-800 px-3 py-2 text-white shadow-md sm:rounded-2xl sm:px-4 sm:py-3">
                      <span className="text-xl font-bold sm:text-2xl">{date.day}</span>
                      <span className="text-[10px] font-semibold tracking-wider sm:text-xs">{date.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-stone-800 truncate sm:text-lg">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-amber-700 font-medium">
                        {date.time} WIB
                      </p>
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-sm text-stone-600 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.location && (
                    <div className="mt-auto flex items-center gap-2 text-xs text-stone-500">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
            <p className="text-stone-500">Belum ada agenda yang akan datang</p>
          </div>
        )}
      </div>
    </section>
  );
}

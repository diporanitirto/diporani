"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
      <div key={i} className="h-40 animate-pulse rounded-3xl bg-slate-100" />
    ))}
  </div>
);

export default function AgendaSection() {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="agenda" className="border-b border-slate-200 overflow-hidden">
      <div className={`${containerClass} space-y-8 py-16 sm:py-20 overflow-hidden`}>
        <div className="space-y-3 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Agenda Kegiatan
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">
            Jadwal kegiatan DIPORANI yang akan datang.
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : agendaList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agendaList.map((item) => {
              const date = formatDate(item.starts_at);
              return (
                <div
                  key={item.id}
                  className="flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-4 sm:rounded-3xl sm:p-5"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex shrink-0 flex-col items-center rounded-xl bg-slate-900 px-3 py-2 text-white sm:rounded-2xl sm:px-4 sm:py-3">
                      <span className="text-xl font-bold sm:text-2xl">{date.day}</span>
                      <span className="text-[10px] font-semibold tracking-wider sm:text-xs">{date.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-slate-900 truncate sm:text-lg">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {date.time} WIB
                      </p>
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.location && (
                    <div className="mt-auto flex items-center gap-2 text-xs text-slate-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-500">Belum ada agenda yang akan datang</p>
          </div>
        )}
      </div>
    </section>
  );
}

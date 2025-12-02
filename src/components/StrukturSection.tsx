"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type DashboardRole = 'admin' | 'bph' | 'materi' | 'media' | 'anggota';

type Member = {
  id: string;
  email: string;
  full_name: string | null;
  role: DashboardRole;
  tingkatan: string | null;
  jabatan: string | null;
  instagram: string | null;
  motto: string | null;
  avatar_url: string | null;
  created_at: string;
};

type GroupedMembers = {
  role: DashboardRole;
  label: string;
  members: Member[];
};

const containerClass = "w-full max-w-full px-4 sm:px-6 lg:px-12 xl:px-16 box-border";

const roleOrder: DashboardRole[] = ['admin', 'bph', 'materi', 'media', 'anggota'];

const roleLabels: Record<DashboardRole, string> = {
  admin: 'Admin',
  bph: 'Badan Pengurus Harian (BPH)',
  materi: 'Sie. Materi',
  media: 'Sie. Media',
  anggota: 'Anggota Dewan Ambalan',
};

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join('');
}

type SVGProps = React.SVGProps<SVGSVGElement>;

// Decorative Icons
const TunasKelapaIcon = (props: SVGProps) => (
  <svg viewBox="0 0 100 120" fill="currentColor" {...props}>
    <path d="M48 60 L48 115 Q50 118 52 115 L52 60 Z" />
    <path d="M50 10 Q50 30 50 45 Q48 30 45 20 Q50 25 50 10 M50 10 Q50 30 50 45 Q52 30 55 20 Q50 25 50 10" />
    <path d="M50 45 Q35 35 20 40 Q35 45 45 50 Q35 42 25 45 Q40 48 50 45" />
    <path d="M50 50 Q30 45 15 55 Q32 52 48 55 Q30 50 20 55 Q38 55 50 50" />
    <path d="M50 45 Q65 35 80 40 Q65 45 55 50 Q65 42 75 45 Q60 48 50 45" />
    <path d="M50 50 Q70 45 85 55 Q68 52 52 55 Q70 50 80 55 Q62 55 50 50" />
    <ellipse cx="50" cy="62" rx="8" ry="6" />
  </svg>
);

const SimpulIcon = (props: SVGProps) => (
  <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" {...props}>
    <path d="M5 30 Q20 10 35 30 Q50 50 65 30 Q80 10 95 30" />
    <path d="M5 35 Q20 55 35 35 Q50 15 65 35 Q80 55 95 35" />
  </svg>
);

const InstagramIcon = (props: SVGProps) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x={4} y={4} width={16} height={16} rx={4} ry={4} />
    <circle cx={12} cy={12} r={3.5} />
    <circle cx={17.5} cy={6.5} r={0.8} fill="currentColor" stroke="none" />
  </svg>
);

const InstagramTag = ({ handle }: { handle?: string | null }) => {
  if (!handle) return null;

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 sm:px-3 sm:py-1 sm:text-xs">
      <InstagramIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      <span className="truncate max-w-[80px] sm:max-w-none">{handle}</span>
    </div>
  );
};

const MemberCard = ({ member, showRole = false }: { member: Member; showRole?: boolean }) => (
  <Link 
    href={`/profil/${member.id}`}
    className="flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-amber-200 bg-white p-3 shadow-sm transition hover:border-amber-400 hover:shadow-md hover:shadow-amber-100 sm:rounded-3xl sm:p-4"
  >
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-amber-300 bg-amber-50 sm:h-16 sm:w-16">
        {member.avatar_url ? (
          <Image
            src={member.avatar_url}
            alt={`Foto ${member.full_name}`}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-amber-600 sm:text-base">
            {getInitials(member.full_name)}
          </span>
        )}
      </div>
      <div className="flex flex-1 min-w-0 flex-col justify-center gap-1">
        <p className="text-sm font-semibold text-stone-800 truncate sm:text-base">
          {member.full_name || 'Tanpa Nama'}
        </p>
        {showRole && member.jabatan && (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 truncate sm:text-xs sm:tracking-[0.2em]">
            {member.jabatan}
          </p>
        )}
        {member.tingkatan && (
          <p className="text-[10px] text-stone-500 truncate sm:text-xs">{member.tingkatan}</p>
        )}
      </div>
    </div>
    <div className="flex items-center">
      <InstagramTag handle={member.instagram} />
    </div>
    {member.motto && (
      <p className="text-xs text-stone-600 line-clamp-2 italic sm:text-sm">&ldquo;{member.motto}&rdquo;</p>
    )}
  </Link>
);

const LoadingSkeleton = () => (
  <div className="space-y-10 sm:space-y-12">
    <div className="space-y-6">
      <div className="mx-auto h-4 w-48 animate-pulse rounded bg-amber-200" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-[420px]:grid-cols-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-3xl bg-amber-100" />
        ))}
      </div>
    </div>
  </div>
);

export default function StrukturSection() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchMembers() {
      console.log('Fetching members from Supabase...');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name', { ascending: true });

      if (error) {
        console.error('Error fetching members:', error);
        setError(error.message);
      } else {
        console.log('Fetched members:', data);
        setMembers(data || []);
      }
      setLoading(false);
    }

    fetchMembers();
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

  const groupedMembers = useMemo<GroupedMembers[]>(() => {
    const grouped: GroupedMembers[] = [];
    
    for (const role of roleOrder) {
      const roleMembers = members.filter((m) => m.role === role);
      if (roleMembers.length > 0) {
        grouped.push({
          role,
          label: roleLabels[role],
          members: roleMembers,
        });
      }
    }
    
    return grouped;
  }, [members]);

  // Pisahkan BPH dari yang lain untuk styling berbeda
  const bphGroup = groupedMembers.find((g) => g.role === 'bph');
  const adminGroup = groupedMembers.find((g) => g.role === 'admin');
  const otherGroups = groupedMembers.filter((g) => g.role !== 'bph' && g.role !== 'admin');

  return (
    <section ref={sectionRef} id="struktur" className="relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-amber-50/30 to-white">
      {/* Decorative Elements with Animation */}
      <div className="absolute top-10 -left-10 opacity-[0.12] hidden lg:block animate-float-slow">
        <TunasKelapaIcon className="h-56 w-56 text-amber-700" />
      </div>
      <div className="absolute bottom-20 -right-10 opacity-[0.12] hidden lg:block animate-float">
        <TunasKelapaIcon className="h-48 w-48 text-amber-600" />
      </div>
      <div className="absolute top-1/3 right-20 opacity-[0.1] hidden lg:block animate-sway">
        <SimpulIcon className="h-24 w-48 text-amber-600 rotate-12" />
      </div>
      <div className="absolute bottom-1/4 left-20 opacity-[0.1] hidden lg:block animate-sway" style={{ animationDelay: '1s' }}>
        <SimpulIcon className="h-20 w-40 text-amber-500 -rotate-6" />
      </div>
      
      <div className={`${containerClass} relative space-y-8 py-16 sm:py-20 overflow-hidden`}>
        <div className="space-y-3 text-center scroll-animate">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
            Dewan Ambalan
          </span>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
            Struktur Keanggotaan
          </h2>
          <p className="text-sm text-stone-600 sm:text-base">
            Anggota Dewan Ambalan DIPORANI SMA Negeri 1 Kasihan
          </p>
        </div>
        
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-600">Error: {error}</p>
            <p className="mt-2 text-sm text-red-500">Pastikan RLS policy sudah dijalankan</p>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-12">
            {/* Admin Section */}
            {adminGroup && adminGroup.members.length > 0 && (
              <div className="space-y-6 scroll-animate">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                  {adminGroup.label}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-[420px]:grid-cols-1">
                  {adminGroup.members.map((member) => (
                    <MemberCard key={member.id} member={member} showRole />
                  ))}
                </div>
              </div>
            )}

            {/* BPH Section */}
            {bphGroup && bphGroup.members.length > 0 && (
              <div className="space-y-6 scroll-animate">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                  {bphGroup.label}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-[420px]:grid-cols-1">
                  {bphGroup.members.map((member) => (
                    <MemberCard key={member.id} member={member} showRole />
                  ))}
                </div>
              </div>
            )}

            {/* Other groups (Sie. Materi, Sie. Media, Anggota) */}
            {otherGroups.map((group) => (
              <div key={group.role} className="space-y-6 scroll-animate">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                  {group.label}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 max-[420px]:grid-cols-1">
                  {group.members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            ))}

            {/* Empty state */}
            {groupedMembers.length === 0 && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
                <p className="text-stone-500">Belum ada data anggota</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

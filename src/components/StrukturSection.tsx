"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
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
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
      <InstagramIcon className="h-3.5 w-3.5" />
      <span>{handle}</span>
    </div>
  );
};

const MemberCard = ({ member, showRole = false }: { member: Member; showRole?: boolean }) => (
  <div className="flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-3xl sm:p-4">
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50 sm:h-16 sm:w-16">
        {member.avatar_url ? (
          <Image
            src={member.avatar_url}
            alt={`Foto ${member.full_name}`}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-slate-500 sm:text-base">
            {getInitials(member.full_name)}
          </span>
        )}
      </div>
      <div className="flex flex-1 min-w-0 flex-col justify-center gap-1">
        <p className="text-sm font-semibold text-slate-900 truncate sm:text-base">
          {member.full_name || 'Tanpa Nama'}
        </p>
        {showRole && member.jabatan && (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 truncate sm:text-xs sm:tracking-[0.2em]">
            {member.jabatan}
          </p>
        )}
        {member.tingkatan && (
          <p className="text-[10px] text-slate-400 truncate sm:text-xs">{member.tingkatan}</p>
        )}
      </div>
    </div>
    <div className="flex items-center">
      <InstagramTag handle={member.instagram} />
    </div>
    {member.motto && (
      <p className="text-xs text-slate-600 line-clamp-2 sm:text-sm">{member.motto}</p>
    )}
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-10 sm:space-y-12">
    <div className="space-y-6">
      <div className="mx-auto h-4 w-48 animate-pulse rounded bg-slate-200" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-[420px]:grid-cols-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-3xl bg-slate-100" />
        ))}
      </div>
    </div>
  </div>
);

export default function StrukturSection() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <section id="struktur" className="border-b border-slate-200 overflow-hidden">
      <div className={`${containerClass} space-y-8 py-16 sm:py-20 overflow-hidden`}>
        <div className="space-y-3 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Struktur Keanggotaan
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">
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
              <div className="space-y-6">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
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
              <div className="space-y-6">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
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
              <div key={group.role} className="space-y-6">
                <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
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
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-slate-500">Belum ada data anggota</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

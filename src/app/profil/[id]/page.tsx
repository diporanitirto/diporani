"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { SimpleHeader } from "@/components/SimpleHeader";

type Profile = {
  id: string;
  full_name: string | null;
  role: string;
  tingkatan: string | null;
  jabatan: string | null;
  bio: string | null;
  instagram: string | null;
  motto: string | null;
  avatar_url: string | null;
  created_at: string;
};

type Post = {
  id: string;
  caption: string | null;
  image_url: string;
  created_at: string;
};

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  bph: 'BPH',
  materi: 'Sie. Materi',
  media: 'Sie. Media',
  anggota: 'Anggota',
};

const tingkatanLabels: Record<string, string> = {
  bantara: 'Penegak Bantara',
  laksana: 'Penegak Laksana',
};

const jabatanLabels: Record<string, string> = {
  anggota: 'Anggota',
  pradana: 'Pradana',
  kerani: 'Kerani',
  hartoko: 'Hartoko',
  judat: 'Judat',
};

const containerClass = "w-full max-w-full px-4 sm:px-6 lg:px-12 xl:px-16 box-border";

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name.split(' ').filter(Boolean).map((w) => w[0]?.toUpperCase()).slice(0, 2).join('');
}

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) {
        setError('Profil tidak ditemukan');
        setLoading(false);
        return;
      }

      setProfile(profileData);

      const { data: postsData } = await supabase
        .from('posts')
        .select('id, caption, image_url, created_at')
        .eq('user_id', id)
        .order('created_at', { ascending: false });

      if (postsData) setPosts(postsData);
      setLoading(false);
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-800" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-white">
        <SimpleHeader containerClass={containerClass} />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-4 h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
            <svg className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <p className="text-slate-900 font-semibold">Halaman tidak tersedia</p>
          <p className="text-sm text-slate-500 mt-1">Profil mungkin telah dihapus.</p>
          <Link href="/" className="mt-6 text-sm font-semibold text-blue-500">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const joinDate = new Date(profile.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-white">
      <SimpleHeader containerClass={containerClass} />
      
      <main className="mx-auto max-w-[935px] px-4 sm:px-5">
        {/* Profile Header */}
        <div className="py-8 sm:py-12">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-12">
            {/* Avatar */}
            <div className="h-24 w-24 sm:h-36 sm:w-36 flex-shrink-0">
              {profile.avatar_url ? (
                <div className="relative h-full w-full">
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name || ''}
                    fill
                    className="rounded-full object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl sm:text-4xl font-light text-white">
                  {getInitials(profile.full_name)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              {/* Name & Instagram */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h1 className="text-lg sm:text-xl font-normal text-slate-900">
                  {profile.full_name || 'Tanpa Nama'}
                </h1>
                {profile.instagram && (
                  <a
                    href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold text-slate-800 transition hover:bg-slate-200 w-fit mx-auto sm:mx-0"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                )}
              </div>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
                  {roleLabels[profile.role] || profile.role}
                </span>
                {profile.jabatan && profile.jabatan !== 'anggota' && (
                  <span className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white">
                    {jabatanLabels[profile.jabatan] || profile.jabatan}
                  </span>
                )}
                {profile.tingkatan && (
                  <span className="rounded-md bg-amber-500 px-2.5 py-1 text-xs font-medium text-white">
                    {tingkatanLabels[profile.tingkatan] || profile.tingkatan}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="mt-5 flex items-center justify-center gap-8 sm:justify-start">
                <div>
                  <span className="font-semibold text-slate-900">{posts.length}</span>
                  <span className="ml-1 text-slate-600">postingan</span>
                </div>
              </div>

              {/* Bio */}
              {(profile.motto || profile.bio) && (
                <div className="mt-5 text-sm">
                  {profile.motto && (
                    <p className="text-slate-600 italic">&ldquo;{profile.motto}&rdquo;</p>
                  )}
                  {profile.bio && (
                    <p className="mt-1 text-slate-700 whitespace-pre-wrap">{profile.bio}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-slate-200">
          <div className="flex justify-center">
            <button className="flex items-center gap-1.5 border-t border-slate-900 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-900">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Postingan
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 pb-12">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-square bg-slate-100"
              >
                <Image
                  src={post.image_url}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </button>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto mb-3 h-16 w-16 rounded-full border border-slate-200 flex items-center justify-center">
              <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
            </div>
            <p className="font-semibold text-slate-900">Belum Ada Postingan</p>
          </div>
        )}
      </main>

      {/* Post Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4"
          onClick={() => setSelectedPost(null)}
        >
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute right-2 top-2 sm:right-4 sm:top-4 text-white/80 hover:text-white z-10"
          >
            <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="flex max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg sm:rounded-sm bg-white flex-col sm:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-square w-full sm:w-[60%] flex-shrink-0 bg-black max-h-[50vh] sm:max-h-none">
              <Image
                src={selectedPost.image_url}
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            
            {/* Info */}
            <div className="flex w-full sm:w-[40%] flex-col max-h-[40vh] sm:max-h-none">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-slate-100 p-3 sm:p-4">
                {profile.avatar_url ? (
                  <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-full overflow-hidden">
                    <Image src={profile.avatar_url} alt="" fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xs font-semibold text-white">
                    {getInitials(profile.full_name)}
                  </div>
                )}
                <span className="text-xs sm:text-sm font-semibold text-slate-900">{profile.full_name}</span>
              </div>
              
              {/* Caption */}
              <div className="flex-1 overflow-auto p-3 sm:p-4">
                {selectedPost.caption && (
                  <p className="text-xs sm:text-sm text-slate-800">
                    <span className="font-semibold">{profile.full_name}</span>{' '}
                    {selectedPost.caption}
                  </p>
                )}
              </div>
              
              {/* Date */}
              <div className="border-t border-slate-100 px-3 py-2 sm:px-4 sm:py-3">
                <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase">
                  {new Date(selectedPost.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

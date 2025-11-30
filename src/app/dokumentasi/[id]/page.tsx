"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SimpleHeader } from "@/components/SimpleHeader";

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
  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DokumentasiDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [dokumentasi, setDokumentasi] = useState<Dokumentasi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDokumentasi() {
      const { data, error } = await supabase
        .from("documentation_assets")
        .select("id, title, description, category, file_url, file_type, created_at")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching dokumentasi:", error);
        setError("Dokumentasi tidak ditemukan");
      } else {
        setDokumentasi(data);
      }
      setLoading(false);
    }

    if (id) {
      fetchDokumentasi();
    }
  }, [id]);

  const isImage = (fileType: string | null) =>
    fileType === "image" || fileType?.startsWith("image/");
  const isVideo = (fileType: string | null) =>
    fileType === "video" || fileType?.startsWith("video/");

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <SimpleHeader containerClass={containerClass} />
        <div className={`${containerClass} py-16`}>
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-slate-200 rounded" />
            <div className="h-12 w-96 bg-slate-200 rounded" />
            <div className="aspect-video bg-slate-200 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !dokumentasi) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <SimpleHeader containerClass={containerClass} />
        <div className={`${containerClass} py-16`}>
          <div className="text-center space-y-4">
            <div className="text-6xl">📷</div>
            <h1 className="text-2xl font-bold text-slate-900">
              Dokumentasi Tidak Ditemukan
            </h1>
            <p className="text-slate-600">
              Dokumentasi yang kamu cari tidak tersedia atau sudah dihapus.
            </p>
            <Link
              href="/dokumentasi"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Kembali ke Dokumentasi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SimpleHeader containerClass={containerClass} />
      <div className={`${containerClass} space-y-6 py-6 sm:space-y-8 sm:py-8`}>
        {/* Back Button */}
        <Link
          href="/dokumentasi"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Dokumentasi
        </Link>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
              {dokumentasi.category || "Foto"}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {dokumentasi.title}
          </h1>
          {dokumentasi.description && (
            <p className="text-base text-slate-600 sm:text-lg">
              {dokumentasi.description}
            </p>
          )}
          <p className="text-sm text-slate-500">
            Diunggah pada {formatDate(dokumentasi.created_at)}
          </p>
        </header>

        {/* Media Content */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:rounded-3xl">
          {isImage(dokumentasi.file_type) ? (
            <div className="relative aspect-video sm:aspect-[16/10]">
              <Image
                src={dokumentasi.file_url}
                alt={dokumentasi.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          ) : isVideo(dokumentasi.file_type) ? (
            <div className="aspect-video">
              <video
                src={dokumentasi.file_url}
                controls
                className="h-full w-full"
                poster=""
              >
                Browser kamu tidak mendukung video.
              </video>
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-slate-900 text-white">
              <div className="text-center">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-2 text-sm">File Media</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <a
            href={dokumentasi.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Buka di Tab Baru
          </a>
          <Link
            href="/dokumentasi"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
          >
            Lihat Dokumentasi Lainnya
          </Link>
        </div>
      </div>
    </div>
  );
}

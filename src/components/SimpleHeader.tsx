import Image from "next/image";
import Link from "next/link";

type SimpleHeaderProps = {
  containerClass: string;
};

export function SimpleHeader({ containerClass }: SimpleHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className={`${containerClass} flex items-center justify-between gap-4 py-4 sm:gap-6`}>
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo-diporani.png"
            alt="Logo Diporani"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border border-slate-200 object-contain p-1"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pramuka Penegak</p>
            <p className="text-base font-semibold text-slate-900">Diporani SMA Negeri 1 Kasihan</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 transition hover:text-slate-900"
          >
            Home
          </Link>
          <Image
            src="/assets/logo-sma.png"
            alt="Logo SMA Negeri 1 Kasihan"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border border-slate-200 object-contain p-1"
          />
        </div>
      </div>
    </header>
  );
}

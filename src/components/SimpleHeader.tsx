import Image from "next/image";
import Link from "next/link";

type SimpleHeaderProps = {
  containerClass: string;
};

export function SimpleHeader({ containerClass }: SimpleHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className={`${containerClass} flex h-16 items-center justify-between`}>
        {/* Logo & Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-400/20 to-red-500/20 opacity-0 blur transition group-hover:opacity-100" />
            <Image
              src="/assets/logo-diporani.png"
              alt="Logo Diporani"
              width={40}
              height={40}
              className="relative h-10 w-10 rounded-full object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-900">DIPORANI</p>
            <p className="text-[10px] text-slate-500">SMA Negeri 1 Kasihan</p>
          </div>
          <span className="text-sm font-bold text-slate-900 sm:hidden">DIPORANI</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="hidden xs:inline">Beranda</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

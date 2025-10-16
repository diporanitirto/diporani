export type DokumentasiPhoto = {
  title: string;
  caption: string;
  gradient: string;
};

export type DokumentasiItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  description: string[];
  highlights: string[];
  gallery: DokumentasiPhoto[];
};

export const dokumentasiList: DokumentasiItem[] = [
  {
    slug: "latihan-rutin",
    title: "Dokumentasi Latihan Rutin",
    date: "Lorem 2025",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget urna ut libero aliquet commodo sit amet vel mauris.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer eget urna ut libero aliquet commodo sit amet vel mauris.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
    gallery: [
      {
        title: "Formasi Lingkaran",
        caption: "Simulasi diskusi kelompok kecil kajian materi penegak.",
        gradient: "from-slate-900/80 via-slate-700/80 to-slate-500/80",
      },
      {
        title: "Latihan Pionering",
        caption: "Penyusunan simpul dasar secara kolaboratif dalam tim.",
        gradient: "from-amber-500/80 via-orange-500/80 to-rose-500/80",
      },
      {
        title: "Refleksi Sesi",
        caption: "Penutup latihan dengan evaluasi dan pembagian tindak lanjut.",
        gradient: "from-emerald-500/80 via-teal-500/80 to-cyan-500/80",
      },
    ],
  },
  {
    slug: "simulasi-pioneering",
    title: "Simulasi Pioneering",
    date: "Ipsum 2025",
    summary:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut libero ut arcu ornare dapibus non vitae arcu.",
      "Nunc viverra, magna in facilisis ultricies, lorem augue ornare enim, sed malesuada eros lorem at purus.",
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
    gallery: [
      {
        title: "Briefing Lapangan",
        caption: "Instruksi teknis sebelum simulasi dimulai.",
        gradient: "from-sky-500/80 via-blue-500/80 to-indigo-500/80",
      },
      {
        title: "Tahap Perakitan",
        caption: "Tim bekerja menyusun tiang utama pioneering.",
        gradient: "from-purple-500/80 via-fuchsia-500/80 to-pink-500/80",
      },
      {
        title: "Uji Struktur",
        caption: "Pengujian kekuatan simpul oleh pembina.",
        gradient: "from-lime-500/80 via-emerald-500/80 to-green-500/80",
      },
    ],
  },
  {
    slug: "lomba-tingkat",
    title: "Lomba Tingkat Ambalan",
    date: "Dolor 2025",
    summary:
      "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lorem ipsum.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac justo lacus.",
      "Integer porttitor nibh a erat tempus, sit amet ornare mauris eleifend.",
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
    gallery: [
      {
        title: "Upacara Pembukaan",
        caption: "Regu diporani memasuki arena lomba tingkat.",
        gradient: "from-rose-600/80 via-amber-500/80 to-yellow-400/80",
      },
      {
        title: "Bidang Ketangkasan",
        caption: "Peserta menyelesaikan rintangan dengan strategi regu.",
        gradient: "from-blue-900/80 via-blue-700/80 to-blue-500/80",
      },
      {
        title: "Penghargaan",
        caption: "Pengumuman hasil dan pembagian apresiasi.",
        gradient: "from-slate-800/80 via-slate-600/80 to-slate-400/80",
      },
    ],
  },
  {
    slug: "pengabdian-masyarakat",
    title: "Pengabdian Masyarakat",
    date: "Sit 2025",
    summary:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non lorem eu ipsum cursus ornare.",
      "Sed bibendum, nulla sit amet lobortis faucibus, orci eros efficitur nisi, a pretium lacus neque id sapien.",
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
    gallery: [
      {
        title: "Briefing Tugas",
        caption: "Koordinasi pembagian area layanan.",
        gradient: "from-emerald-600/80 via-emerald-500/80 to-lime-400/80",
      },
      {
        title: "Aksi Lapangan",
        caption: "Anggota bertugas membersihkan fasilitas umum.",
        gradient: "from-orange-600/80 via-amber-500/80 to-yellow-400/80",
      },
      {
        title: "Sesi Edukasi",
        caption: "Penyampaian materi singkat kepada warga.",
        gradient: "from-cyan-600/80 via-blue-500/80 to-indigo-500/80",
      },
    ],
  },
  {
    slug: "perkemahan-akhir-tahun",
    title: "Perkemahan Akhir Tahun",
    date: "Amet 2025",
    summary:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam condimentum lacus vel semper porttitor.",
      "Curabitur vulputate, lorem sed malesuada ultricies, libero justo dignissim libero, vitae hendrerit libero turpis nec dui.",
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
    gallery: [
      {
        title: "Mendirikan Tenda",
        caption: "Koordinasi regu memasang bivak di area perkemahan.",
        gradient: "from-slate-900/80 via-amber-700/80 to-emerald-500/80",
      },
      {
        title: "Api Unggun",
        caption: "Malam keakraban dengan penampilan seni ambalan.",
        gradient: "from-orange-700/80 via-rose-600/80 to-purple-600/80",
      },
      {
        title: "Refleksi Penutupan",
        caption: "Sesi evaluasi bersama sebelum pulang.",
        gradient: "from-blue-800/80 via-blue-600/80 to-cyan-500/80",
      },
    ],
  },
  {
    slug: "pelatihan-kepemimpinan",
    title: "Pelatihan Kepemimpinan",
    date: "Consectetur 2025",
    summary:
      "Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc varius interdum libero et aliquet.",
      "Suspendisse potenti. Curabitur consequat felis sed ligula posuere, vitae mattis lacus pretium.",
    ],
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    ],
    gallery: [
      {
        title: "Pembukaan Sesi",
        caption: "Sambutan dan orientasi program pelatihan.",
        gradient: "from-indigo-700/80 via-indigo-500/80 to-indigo-300/80",
      },
      {
        title: "Workshop Studi Kasus",
        caption: "Diskusi kelompok memecahkan skenario kepemimpinan.",
        gradient: "from-slate-800/80 via-emerald-600/80 to-emerald-400/80",
      },
      {
        title: "Presentasi Akhir",
        caption: "Pemaparan hasil simulasi di depan mentor.",
        gradient: "from-fuchsia-600/80 via-violet-500/80 to-sky-400/80",
      },
    ],
  },
];

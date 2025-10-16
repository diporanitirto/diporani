export type MateriItem = {
  slug: string;
  title: string;
  shortDescription: string;
  body: string[];
  objectives: string[];
};

export const materiList: MateriItem[] = [
  {
    slug: "orientasi-penegak",
    title: "Orientasi Penegak",
    shortDescription:
      "Gambaran umum tentang sejarah DIPORANI, kode kehormatan, dan etika Pramuka penegak.",
    body: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi erat sed nisl tempor, at bibendum libero iaculis.",
      "Morbi interdum neque vel lectus hendrerit, id faucibus turpis tempus. Maecenas suscipit, sapien in elementum laoreet, erat nisl viverra erat, in tristique leo sapien at erat.",
      "Suspendisse potenti. Integer luctus, ante non hendrerit rhoncus, ligula nunc porttitor sem, in fermentum tellus quam eu magna.",
    ],
    objectives: [
      "Memahami identitas dan sejarah Ambalan DIPORANI.",
      "Menjelaskan kembali isi Trisatya dan Dasa Darma penegak.",
      "Menerapkan tata upacara bendera dan adat ambalan yang berlaku.",
    ],
  },
  {
    slug: "keterampilan-lapangan",
    title: "Keterampilan Lapangan",
    shortDescription:
      "Latihan teknik pioneering, tali-temali, navigasi, dan simulasi survival lapangan.",
    body: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    ],
    objectives: [
      "Menguasai simpul dan ikatan dasar untuk pioneering.",
      "Melatih navigasi kompas dan peta di lingkungan sekitar.",
      "Menyiapkan rencana survival sederhana untuk kegiatan perkemahan.",
    ],
  },
  {
    slug: "pengembangan-karakter",
    title: "Pengembangan Karakter",
    shortDescription:
      "Materi kepemimpinan, kerja sama tim, dan komunikasi efektif bagi penegak.",
    body: [
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
      "Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    ],
    objectives: [
      "Mengenali gaya kepemimpinan pribadi dan peran dalam tim.",
      "Mengelola komunikasi dua arah saat memimpin kegiatan.",
      "Membangun budaya apresiasi dan evaluasi konstruktif.",
    ],
  },
  {
    slug: "pengetahuan-umum",
    title: "Pengetahuan Umum",
    shortDescription:
      "Penguatan wawasan kebangsaan, pengetahuan kepramukaan, dan isu sosial di lingkungan siswa.",
    body: [
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    ],
    objectives: [
      "Menganalisis isu sosial di lingkungan sekolah dan masyarakat.",
      "Menghubungkan nilai kebangsaan dengan kegiatan kepramukaan.",
      "Mempresentasikan materi wawasan kebangsaan dengan kreatif.",
    ],
  },
];

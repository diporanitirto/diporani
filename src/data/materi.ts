export type MateriItem = {
  slug: string;
  title: string;
  shortDescription: string;
  body: string[];
  objectives: string[];
};

const loremBody = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sollicitudin mi, vel cursus lorem.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer porta, risus vel egestas vulputate, nunc nibh tempus sem, vitae tempus leo risus at elit.",
  "Suspendisse potenti. Morbi id ligula at dui viverra convallis quis eget sapien.",
];

const loremObjectives = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  "Suspendisse potenti. Morbi id ligula at dui viverra convallis.",
];

export const materiList: MateriItem[] = [
  {
    slug: "orientasi-penegak",
    title: "Orientasi Penegak",
    shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: loremBody,
    objectives: loremObjectives,
  },
  {
    slug: "keterampilan-lapangan",
    title: "Keterampilan Lapangan",
    shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: loremBody,
    objectives: loremObjectives,
  },
  {
    slug: "pengembangan-karakter",
    title: "Pengembangan Karakter",
    shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: loremBody,
    objectives: loremObjectives,
  },
  {
    slug: "pengetahuan-umum",
    title: "Pengetahuan Umum",
    shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: loremBody,
    objectives: loremObjectives,
  },
];

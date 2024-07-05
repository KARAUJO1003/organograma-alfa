import { OrgChart } from "../../components/org-list";

const data = [
  {
    id: "DIRETORIA",
    name: "DIRETORIA",
    cargo: "Diretor",
    subordinates: [1, 2],
  },
  {
    id: 1,
    name: "João Silva",
    email: "lnewland@yoyodyne.com",
    cargo: "Diretor",
    status: "travel",
    subordinates: [
      12,
      13,
      14,
      "SUPERINTENDENCIA ACIARIA",
      "SUPERINTENDENCIA LAMINACAO",
      "SUPERINTENDENCIA TREFILA",
    ],
  },
  {
    id: 2,
    name: "Silvia Amaro",
    email: "lnewland@yoyodyne.com",
    cargo: "Diretor",
    status: "travel",
    subordinates: [],
  },
  {
    id: 3,
    position: "Junior Executive Assistant",
    name: "Linda Newland",
    email: "lnewland@yoyodyne.com",
    cargo: "Superintendente",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
    subordinates: [45, 46],
  },
  {
    id: 12,
    position: "Junior Executive Assistant",
    name: "Linda Newland",
    email: "lnewland@yoyodyne.com",
    cargo: "Gerente",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 13,
    position: "Junior Executive Assistant",
    name: "Linda Newland",
    email: "lnewland@yoyodyne.com",
    cargo: "Gerente",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 14,
    position: "Junior Executive Assistant",
    name: "Kaesyo",
    email: "lnewland@yoyodyne.com",
    cargo: "Gerente",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
    subordinates: [47, 48],
  },
  {
    id: "SUPERINTENDENCIA ACIARIA",
    name: "SUPERINTENDENCIA ACIARIA",
    subordinates: [3],
  },
  {
    id: "SUPERINTENDENCIA LAMINACAO",
    name: "SUPERINTENDENCIA LAMINACAO",
  },
  {
    id: "SUPERINTENDENCIA TREFILA",
    name: "SUPERINTENDENCIA TREFILA",
  },
  {
    id: 45,
    position: "Junior",
    name: "Juniord",
    email: "lnewland@yoyodyne.com",
    cargo: "Coordenador",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 46,
    position: "Executive Assistant",
    name: "Executive Assistant",
    email: "lnewland@yoyodyne.com",
    cargo: "Coordenador",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 47,
    position: "Analista",
    name: "Analista",
    email: "lnewland@yoyodyne.com",
    cargo: "Analista",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 48,
    position: "Técnico",
    name: "Técnico",
    email: "lnewland@yoyodyne.com",
    cargo: "Técnico",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
];

export default function Org() {
  return (
    <main className="p-8 flex flex-col items-center gap-2">
      <OrgChart data={data} />
    </main>
  );
}

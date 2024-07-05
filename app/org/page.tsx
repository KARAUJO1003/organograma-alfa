import { OrgChart } from "../components/org-list";

const data = [
  {
    id: "DIRETORIA",
    name: "DIRETORIA",
    subordinates: [1, 2],
  },
  {
    id: 1,
    name: "DIRETOR 1",
    subordinates: [
      12,
      13,
      14,
      "SUPERINTENDENTE1",
      "SUPERINTENDENTE2",
      "SUPERINTENDENTE3",
    ],
  },
  {
    id: 2,
    name: "DIRETOR 2",
    subordinates: [],
  },
  {
    id: 3,
    position: "Junior Executive Assistant",
    name: "Linda Newland",
    email: "lnewland@yoyodyne.com",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 12,
    position: "Junior Executive Assistant",
    name: "Linda Newland",
    email: "lnewland@yoyodyne.com",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 13,
    position: "Junior Executive Assistant",
    name: "Linda Newland",
    email: "lnewland@yoyodyne.com",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 14,
    position: "Junior Executive Assistant",
    name: "Kaesyo",
    email: "lnewland@yoyodyne.com",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
    subordinates: [45, 46],
  },
  {
    id: "SUPERINTENDENTE1",
    name: "SUPERINTENDENTE1",
    subordinates: [3],
  },
  {
    id: "SUPERINTENDENTE2",
    name: "SUPERINTENDENTE2",
  },
  {
    id: "SUPERINTENDENTE3",
    name: "SUPERINTENDENTE3",
  },
  {
    id: 45,
    position: "Junior",
    name: "Juniord",
    email: "lnewland@yoyodyne.com",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 46,
    position: "Executive Assistant",
    name: "Executive Assistant",
    email: "lnewland@yoyodyne.com",
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

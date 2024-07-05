// pages/index.tsx
// components/OrgChart.tsx
"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

// types.ts
interface OrgNode {
  id: string | number;
  name: string;
  subordinates?: (string | number)[];
  position?: string;
  email?: string;
  status?: string;
  icon?: string;
}

interface OrgChartProps {
  data: OrgNode[];
}

const OrgChart: React.FC<OrgChartProps> = ({ data }) => {
  const [orgData, setOrgData] = useState(data);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Handling reordering within the same level
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(orgData);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
      setOrgData(items);
      return;
    }

    // Handling moving between different levels
    const sourceParent = orgData.find(
      (node) => node.id.toString() === source.droppableId
    );
    const destinationParent = orgData.find(
      (node) => node.id.toString() === destination.droppableId
    );

    if (sourceParent && destinationParent) {
      const sourceItems = Array.from(sourceParent.subordinates || []);
      const [movedItem] = sourceItems.splice(source.index, 1);
      sourceParent.subordinates = sourceItems;

      const destinationItems = Array.from(destinationParent.subordinates || []);
      destinationItems.splice(destination.index, 0, movedItem);
      destinationParent.subordinates = destinationItems;

      setOrgData([...orgData]);
    }
  };

  const renderNode = (node: OrgNode, index: number) => (
    <Draggable key={node.id} draggableId={node.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-4 gap-2  rounded shadow-md flex flex-col justify-center items-center"
        >
          <div className="flex flex-col w-full border p-6">
            <div className="font-bold text-start">{node.name}</div>
            {node.position && <div>{node.position}</div>}
            {node.email && <div>{node.email}</div>}
            {node.status && <div>{node.status}</div>}
            {node.icon && (
              <img src={node.icon} alt={node.name} className="w-10 h-10" />
            )}
          </div>
          {node.subordinates && node.subordinates.length > 0 && (
            <Droppable droppableId={node.id.toString()}>
              {(provided) => (
                <div
                  className="pl-4 mt-4 flex"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {node.subordinates.map((subId, subIndex) => {
                    const subNode = orgData.find((d) => d.id === subId);
                    return subNode ? renderNode(subNode, subIndex) : null;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      )}
    </Draggable>
  );

  const rootNode = orgData.find((d) => d.id === "DIRETORIA");

  return rootNode ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="root" type="ROOT">
        {(provided) => (
          <div
            className="flex flex-col items-center"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {renderNode(rootNode, 0)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
};

const data: OrgNode[] = [
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
    name: "Linda Newland",
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
    position: "Junior Executive Assistant",
    name: "Linda Newland",
    email: "lnewland@yoyodyne.com",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
  {
    id: 46,
    position: "Junior Executive Assistant",
    name: "Linda Newland",
    email: "lnewland@yoyodyne.com",
    status: "travel",
    icon: "../assets/usericon_female1.svg",
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Link href="/org" className="text-2xl font-bold mb-4">
        Organograma
      </Link>
      <OrgChart data={data} />
    </div>
  );
};

export default HomePage;

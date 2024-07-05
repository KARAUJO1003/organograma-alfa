'use client'
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop, DragPreviewImage } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface OrgNode {
  id: string | number;
  name: string;
  position?: string;
  email?: string;
  status?: string;
  icon?: string;
  subordinates?: (string | number)[];
}

interface OrgListProps {
  data: OrgNode[];
  subordinates: (string | number)[];
  moveNode: (draggedId: string | number, targetId: string | number) => void;
}

const ItemType = 'ORG_NODE';

const OrgList: React.FC<OrgListProps> = ({ data, subordinates, moveNode }) => {
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string | number, boolean>>({});

  const toggleCollapse = (id: string | number) => {
    setCollapsedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ul className="flex w-full justify-center gap-4">
      {subordinates.map((subId) => {
        const element = data.find((item) => item.id === subId);
        if (element) {
          const isCollapsed = collapsedNodes[element.id];
          return (
            <OrgNodeComponent
              key={element.id}
              element={element}
              data={data}
              isCollapsed={isCollapsed}
              toggleCollapse={toggleCollapse}
              moveNode={moveNode}
            />
          );
        }
        return null;
      })}
    </ul>
  );
};

interface OrgNodeComponentProps {
  element: OrgNode;
  data: OrgNode[];
  isCollapsed: boolean;
  toggleCollapse: (id: string | number) => void;
  moveNode: (draggedId: string | number, targetId: string | number) => void;
}

const OrgNodeComponent: React.FC<OrgNodeComponentProps> = ({ element, data, isCollapsed, toggleCollapse, moveNode }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemType,
    item: { id: element.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (draggedItem: { id: string | number }) => {
      if (draggedItem.id !== element.id) {
        moveNode(draggedItem.id, element.id);
      }
    },
  }));

  return (
    <li ref={drop} className={` border border-zinc-600/50 gap-4 rounded-lg p-4 h-fit flex flex-col items-center ${
      isDragging 
      ? 'opacity-50' 
      : ''}
      
    `}>
      <div
        ref={drag}
        className={`relative w-fit min-w-64 font-bold justify-center flex ${typeof element.id === "string" ? "h-fit bg-green-500" : "min-h-32"} p-6 rounded-lg border bg-zinc-800 text-white cursor-pointer before:content-[''] before:absolute before:w-1 before:h-5 before:bg-zinc-600/50 before:-top-5  before:left-1/2 before:transform-[-50%,-50%] before:z-50 before:rounded-full before:shadow-lg before:transition-transform before:duration-300 before:ease-in-out `}
        onClick={() => toggleCollapse(element.id)}
      >
        {element.name}
      </div>
      <DragPreviewImage connect={preview} src="/path-to-your-image" />
      {!isCollapsed && element.subordinates && element.subordinates.length > 0 && (
        <OrgList data={data} subordinates={element.subordinates} moveNode={moveNode} />
      )}
    </li>
  );
};

interface OrgChartProps {
  data: OrgNode[];
}

export const OrgChart: React.FC<OrgChartProps> = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const rootNode = data.find((node) => node.id === "DIRETORIA");

  const moveNode = (draggedId: string | number, targetId: string | number) => {
    setData((prevData) => {
      const draggedNode = prevData.find((node) => node.id === draggedId);
      if (!draggedNode) return prevData;

      const newData = prevData.map((node) => {
        if (node.subordinates?.includes(draggedId)) {
          return {
            ...node,
            subordinates: node.subordinates.filter((subId) => subId !== draggedId),
          };
        }
        return node;
      });

      if (targetId !== 'DIRETORIA') {
        const targetNode = newData.find((node) => node.id === targetId);
        if (targetNode) {
          targetNode.subordinates = targetNode.subordinates ? [...targetNode.subordinates, draggedId] : [draggedId];
        }
      } else {
        newData.push({ ...draggedNode, subordinates: [] });
      }

      return newData;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="w-full flex flex-col items-center gap-4">
        {rootNode && (
          <>
            <p className="w-fit min-w-64 font-bold justify-center flex p-6 rounded-lg border h-fit bg-green-500 text-white">
              {rootNode.name}
            </p>
            {console.log('data', data)}
            {rootNode.subordinates && (
              <OrgList data={data} subordinates={rootNode.subordinates} moveNode={moveNode} />
            )}
          </>
        )}
      </main>
    </DndProvider>
  );
};

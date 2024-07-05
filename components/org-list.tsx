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
  cargo?: string; // Add the 'cargo' property
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
    <ul className="flex w-full justify-center">
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
    <li ref={drop} className={` border-t border-zinc-600/50 bg-zinc-800/10 backdrop-blur-sm rounded-lg b-4 p-4 h-fit flex flex-col items-center ${
      isDragging 
      ? 'opacity-50' 
      : ''}
      
    `}>
      <div
        ref={drag}
        className={`relative w-fit min-w-64 font-bold justify-center flex flex-col mb-4 p-6 rounded-lg border border-zinc-500/50 bg-zinc-800 text-white cursor-pointer before:content-[''] before:absolute before:w-1 before:h-5 before:bg-zinc-600/50 before:-top-5 ${element.subordinates?.length && 'after:content-[""] after:absolute after:w-1 after:h-5 after:bg-zinc-600/50 after:-bottom-5 after:left-1/2 after:transform-[-50%,-50%] after:z-50 after:rounded-full'} before:left-1/2 before:transform-[-50%,-50%] before:z-50 before:rounded-full before:shadow-lg before:transition-transform before:duration-300 before:ease-in-out  ${typeof element.id === "string" ? "!h-fit !bg-blue-500/50 backdrop-blur-md text-blue-200 py-2 rounded-full" : "min-h-32"} `}
        onClick={() => toggleCollapse(element.id)}
      >

        <span className={`text-xs absolute ${typeof element.id === 'string' ? '-top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-200 bg-blue-950' : 'top-2 right-2 bg-zinc-500'}  rounded-full  w-6 flex items-center justify-center aspect-square`}>{element.subordinates?.length ? element.subordinates?.length : 0}</span>
        <span className="text-lg text-zinc-200">{element.name}</span>
        <span className="text-sm text-zinc-400 font-normal">{element.email}</span>
        <span className="text-sm text-zinc-400 font-normal">{element.status}</span> 
        <span className="text-sm text-zinc-400 font-normal">{element.cargo}</span> 
        
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
            <p className="w-fit min-w-64 font-bold justify-center flex p-6 rounded-lg border h-fit bg-green-500 text-white relative before:content-[''] before:absolute before:w-1 before:h-5 before:bg-zinc-600/50 before:-bottom-5  before:left-1/2 before:transform-[-50%,-50%] before:z-50 before:rounded-full before:shadow-lg before:transition-transform before:duration-300 before:ease-in-out ">
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

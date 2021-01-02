import { useMemo, useState } from "react";
import { Card } from "./Card";
import NewCard from "../NewCard";
import { Droppable } from "react-beautiful-dnd";

  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-red-100 text-red-800",
    "bg-yellow-100 text-yellow-800",
    "bg-green-100 text-green-800",
  ];

export default function List({ list }) {
  const [isCreating, setIsCreating] = useState(false);
  const titleClass = useMemo(() => colors[Math.floor(Math.random() * colors.length)], []) 

  return (
    <Droppable isCombineEnabled droppableId={list._id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="md:w-80"
        >
          <h3 className={`shadow-md px-8 py-2 inline-block text-lg rounded-md font-bold ${titleClass}`}>
            {list.name} <span className="text-sm">({list.cards.length})</span>
          </h3>
          <ul className="mt-5 space-y-4">
            {list.cards.map((card, i) => (
              <li key={card._id}>
                <Card position={i} card={card} />
              </li>
            ))}
            {provided.placeholder}
          </ul>
          <div className='mt-4 rounded-md bg-white'>
            {isCreating ? (
              <NewCard listId={list._id} done={() => setIsCreating(false)} />
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="flex justify-center w-full p-3 border-gray-300 rounded-b-md focus:bg-blueGray-200 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>

            )}
          </div>
        </div>
      )}
    </Droppable>
  );
}

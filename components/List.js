import { useState } from "react";
import NewCard from "./NewCard";

export default function List({ list }) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <div className="h-full rounded-md shadow-md md:w-60">
        <h3 className="p-3 text-lg text-white bg-blue-400 rounded-t-md">
          {list.name} <span className="text-sm">({list.cards.length})</span>
        </h3>
        <ul className="px-5 py-2 space-y-3 bg-gray-50 ">
          {list.cards.map((card, i) => (
            <li
              className="flex flex-col px-4 py-2 bg-white rounded-md shadow "
              key={card._id}
            >
              <span className="text-sm font-bold">{card.name}</span>
              {card.description && (
                <span className="text-gray-700">{card.description}</span>
              )}
            </li>
          ))}
        </ul>
        <span>
          {isCreating ? (
            <NewCard listId={list._id} done={() => setIsCreating(false)} />
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="flex justify-center w-full p-3 border-t-2 border-gray-300 bg-gray-50 rounded-b-md focus:bg-blueGray-200 focus:outline-none"
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
        </span>
      </div>
    </>
  );
}

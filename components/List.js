import { useState } from "react";
import { useProject } from "../lib/store/project";
import NewCard from "./NewCard";

export default function List({ list }) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <div className="border border-gray-400 rounded-md shadow-md">
        <h3 className="p-3 text-lg bg-gray-100">
          {list.name} <span className="text-sm">({list.cards.length})</span>
        </h3>
        <ul>
          {list.cards.map((card) => (
            <li key={card._id}>{card.name}</li>
          ))}
          <li>
            {isCreating ? (
              <NewCard listId={list._id} done={() => setIsCreating(false)} />
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="flex justify-center w-full p-3 focus:bg-gray-300 focus:outline-none"
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
          </li>
        </ul>
      </div>
    </>
  );
}

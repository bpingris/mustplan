import axios from "axios";
import { useState } from "react";
import { useProject } from "../lib/store/project";
import EditCard from "./EditCard";
import Button from "./UI/Button";

export function Card({ card }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { project, getProject } = useProject();

  const deleteCard = async () => {
    setLoading(true);
    await axios.delete(`/api/project/${project._id}/card/${card._id}`);
    await getProject(project._id);
    setLoading(false);
  };

  return (
    <div className="flex flex-col px-4 py-2 bg-white rounded-md shadow ">
      {isEditing ? (
        <EditCard done={() => setIsEditing(false)} card={card} />
      ) : (
        <>
          <span className="text-sm font-bold">{card.name}</span>
          {card.description && (
            <span className="text-gray-700">{card.description}</span>
          )}
          <div className="flex my-3 space-x-4 transition-opacity duration-100 opacity-70 hover:opacity-100 focus:opacity-100">
            <Button size="small" onClick={deleteCard} kind="danger">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
            <Button onClick={() => setIsEditing(true)} size="small">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </Button>
          </div>
          {/* <button onClick={() => setIsEditing(true)}>edit</button> */}
        </>
      )}
    </div>
  );
}

import axios from "axios";
import { useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useClickOutside } from "../../lib/hooks";
import { useProject } from "../../lib/store/project";
import EditCard from "../EditCard";
import Button from "../UI/Button";

export function Card({ card, isDragging, position }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { project, getProject } = useProject();
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => setOpen(false));

  const deleteCard = async () => {
    setLoading(true);
    await axios.delete(`/api/project/${project._id}/card/${card._id}`);
    await getProject(project._id);
    setLoading(false);
  };

  return (
    <Draggable
      isDragDisabled={isEditing}
      draggableId={card._id}
      index={position}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className="relative flex flex-col p-4 bg-white rounded-md shadow"
        >
          {isEditing ? (
            <EditCard done={() => setIsEditing(false)} card={card} />
          ) : (
            <>
              <span className="text-sm font-bold">{card.name}</span>
              {card.description && (
                <span className="text-gray-700">{card.description}</span>
              )}
              <button
                ref={dropdownRef}
                onClick={() => setOpen(!open)}
                className="absolute top-0 right-0 inline-block p-1 mt-2 mr-2 text-gray-400 border border-gray-400 rounded-full hover:text-gray-600 hover:border-gray-500"
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
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                {open && (
                  <div
                    className="absolute right-0 z-20 w-48 py-1 mt-4 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <button
                      className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsEditing(true)}
                    >
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
                      <span>Modifier</span>
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={deleteCard}
                    >
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
                      <span>Supprimer</span>
                    </button>
                  </div>
                )}
              </button>
              {/*<div className="flex mt-3 space-x-4 transition-opacity duration-100 opacity-50 hover:opacity-100 focus:opacity-100">
                <Button
                  loading={loading}
                  size="small"
                  onClick={deleteCard}
                  kind="danger"
                >
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
              </div>*/}
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

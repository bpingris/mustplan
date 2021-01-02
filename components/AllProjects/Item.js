import { useRef, useState } from "react";
import Link from "next/link";
import { formatDate } from "../../lib/format";
import { useClickOutside } from "../../lib/hooks";
import axios from "axios";

export default function Item({ project, fetchProjects }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  useClickOutside(dropdownRef, () => setOpen(false));

  const deleteProject = async (e) => {
    e.preventDefault();
    await axios.delete(`/api/project/${project._id}`);
    fetchProjects();
  };

  return (
    <Link href={`/project/${project._id}`}>
      <a className="relative flex p-4 bg-white border border-gray-400 rounded-md shadow cursor-pointer select-none">
        <div className="flex flex-col justify-between">
          <div className="font-medium dark:text-white">{project.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-200">
            Créé le {formatDate(project.createdAt)}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between ml-auto space-y-2 text-xs text-gray-600 dark:text-gray-200">
          <div>
            <button
              ref={dropdownRef}
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
              className="p-1 mt-2 mr-2 text-gray-400 border border-gray-400 rounded-full "
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
                    onClick={deleteProject}
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
          </div>
          <span>Mis à jour le {formatDate(project.updatedAt)}</span>
        </div>
      </a>
    </Link>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { withDefautLayout } from "../layouts/Default";
import { requiresAuth } from "../lib/auth";
import { formatDate } from "../lib/format";
import { useHttp } from "../lib/http";

function AllProjects() {
  const { loading, data: projects } = useHttp("/api/projects");

  return (
    <div>
      <h1 className="text-2xl">Tous les projets</h1>

      {loading ? (
        ""
      ) : (
        <ul className="mt-4 space-y-2">
          {projects.map((p) => (
            <li key={p._id}>
              <Link href={`/project/${p._id}`}>
                <a className="flex p-4 bg-white border border-gray-400 rounded-md shadow cursor-pointer select-none">
                  <div>
                    <div className="font-medium dark:text-white">{p.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-200">
                      Créé le {formatDate(p.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center ml-auto text-xs text-gray-600 dark:text-gray-200">
                    Mis à jour le {formatDate(p.updatedAt)}
                  </div>
                  <button className="ml-auto">
                    <svg
                      width="12"
                      fill="currentColor"
                      height="12"
                      className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default withDefautLayout(AllProjects);

export const getServerSideProps = requiresAuth;

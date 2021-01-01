import { useHttp } from "../../lib/http";
import ActiveLink from "../ActiveLink";

export default function Projects() {
  const { error, data, loading } = useHttp("/api/projects");
  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div className="flex my-5 space-x-2">
          <div>
            Vous avez <span className="font-bold">{data.length}</span> projets
            en cours.
          </div>
          <ActiveLink className="italic text-blue-600" href="/all-projects">
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </ActiveLink>
        </div>
      )}
    </div>
  );
}

import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import ActiveLink from "./ActiveLink";

export default function Navbar({ open, setOpen }) {
  const [session] = useSession();
  const links = [
    {
      name: "Tous les projets",
      href: "/all-projects",
      paths: [
        "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
      ],
    },
    {
      name: "Creer",
      href: "/new-project",
      paths: ["M12 6v6m0 0v6m0-6h6m-6 0H6"],
    },
    {
      name: "Profil",
      href: "/profile",
      paths: [
        "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z",
      ],
    },
  ];

  return (
    <>
      <div
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } shadow transform z-10 min-h-screen md:static w-64 fixed md:translate-x-0 inset-y-0 left-0 h-full bg-white transition-all px-8 py-3 ease-in-out duration-300`}
      >
        <h1 className="text-3xl font-light text-center">MustPlan</h1>
        <svg
          onClick={() => setOpen(false)}
          className="absolute top-0 right-0 w-6 h-6 mt-4 mr-3 cursor-pointer md:hidden"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <ul className="flex flex-col mt-10 space-y-2">
          {links.map((link) => (
            <li onClick={() => setOpen(false)} key={link.href}>
              <ActiveLink
                className="flex px-2 py-1 space-x-2 text-gray-600 rounded focus:bg-blue-100 hover:bg-blue-100 bg-blue-50"
                href={link.href}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {link.paths.map((path, i) => (
                    <path
                      key={i}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={path}
                    />
                  ))}
                </svg>
                <span>{link.name}</span>
              </ActiveLink>
            </li>
          ))}
          <li>
            {session ? (
              <button
                className="flex w-full px-2 py-1 mt-4 space-x-2 text-gray-600 bg-red-100 rounded focus:bg-red-200 hover:bg-red-200"
                onClick={signOut}
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Deconnexion</span>
              </button>
            ) : (
              <Link href="/login">
                <a className="flex w-full px-2 py-1 mt-4 space-x-2 text-gray-600 bg-green-100 rounded focus:bg-green-200 hover:bg-green-200">
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Connexion</span>
                </a>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

import { withDefautLayout } from "../layouts/Default";
import { requiresAuth } from "../lib/auth";
import { useHttp } from "../lib/http";
import Head from "next/head";
import Item from "../components/AllProjects/Item";

function AllProjects() {
  const { loading, data: projects, fetchData } = useHttp("/api/projects");

  return (
    <>
      <Head>
        <title>Mustplan - Tous les projets</title>
      </Head>
      <div>
        <h1 className="text-2xl">Tous les projets</h1>

        {loading && !projects ? (
          "Chargement..."
        ) : (
          <ul className="grid gap-4 mt-4 md:grid-cols-2">
            {projects.map((p) => (
              <li key={p._id}>
                <Item fetchProjects={fetchData} project={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default withDefautLayout(AllProjects);

export const getServerSideProps = requiresAuth;

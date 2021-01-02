import { DragDropContext } from "react-beautiful-dnd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { ProjectProvider, useProject } from "../../lib/store/project";
import { withDefautLayout } from "../../layouts/Default";
import List from "../../components/Project/List";
import { requiresAuth } from "../../lib/auth";
import { formatDate } from "../../lib/format";
import { useSession } from "next-auth/client";

function Project() {
  const { project, getProject, setProject } = useProject();
  const [session] = useSession();

  const onDragEnd = async (e) => {
    if (!e.destination) {
      return;
    }
    const { destination, source, draggableId } = e;
    const p = { ...project };
    const card = p.lists
      .find((l) => l._id === source.droppableId)
      .cards.find((c) => c._id === draggableId);
    let sourceLists = p.lists.find((l) => l._id === source.droppableId);
    sourceLists.cards = sourceLists.cards.filter((o) => o._id !== card._id);
    let destList = p.lists.find((l) => l._id === destination.droppableId);
    destList.cards = [...destList.cards, card];
    setProject(p);
    await axios.put(`/api/project/${project._id}/card/${e.draggableId}`, {
      listId: e.destination.droppableId,
    });
    await getProject(project._id);
  };
  const { id } = useRouter().query;
  useEffect(() => {
    getProject(id);
  }, []);

  return (
    <>
      <Head>
        <title>Mustplan - {project ? project.name : "Chargement..."}</title>
      </Head>
      <Link href="/all-projects">
        <a className="flex items-center mb-5 space-x-2 text-gray-600">
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Retourner aux projets</span>
        </a>
      </Link>
      {project && (
        <>
          <div className="flex">
            <div className="flex flex-col">
              <span className="text-4xl font-medium">{project.name}</span>
              <span className="text-gray-600">
                Mis a jour le {formatDate(project.updatedAt)}
              </span>
            </div>
            {session && (
              <div className="flex ml-4">
                <img
                  className="w-10 h-10 rounded-full shadow-md "
                  src={session.user.image}
                />
                <div
                  title="Inviter un nouveau membre"
                  className="flex items-center justify-center w-10 h-10 -ml-4 text-yellow-800 bg-yellow-600 rounded-full shadow-md"
                >
                  <svg
                    className="w-6 h-6 cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <ul className="flex flex-col pb-4 mt-5 space-y-4 overflow-x-auto md:flex-row md:space-x-4 md:space-y-0">
              {project.lists.map((list) => (
                <li key={list._id} className="h-full md:w-80">
                  <List projectId={id} list={list} />
                </li>
              ))}
            </ul>
          </DragDropContext>
        </>
      )}
    </>
  );
}

const _Project = () => {
  return (
    <ProjectProvider>
      <Project />
    </ProjectProvider>
  );
};

export default withDefautLayout(_Project);

export const getServerSideProps = requiresAuth;

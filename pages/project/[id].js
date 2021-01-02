import { useRouter } from "next/router";
import { useEffect } from "react";
import List from "../../components/Project/List";
import { withDefautLayout } from "../../layouts/Default";
import { requiresAuth } from "../../lib/auth";
import { formatDate } from "../../lib/format";
import { ProjectProvider, useProject } from "../../lib/store/project";
import Head from "next/head";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";

function Project() {
  const { project, getProject, setProject } = useProject();
  console.log({ project });

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
      {project && (
        <>
          <div className="flex items-center justify-between w-full p-3 bg-white rounded">
            <div className="flex flex-col ">
              <h1 className="text-2xl">{project.name}</h1>
              <span className="text-sm text-gray-700">
                Créé le {formatDate(project.createdAt)}
              </span>
            </div>
            <span className="text-sm text-gray-700">
              Mis à jour le {formatDate(project.updatedAt)}
            </span>
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

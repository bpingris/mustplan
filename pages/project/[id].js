import { useRouter } from "next/router";
import { useEffect } from "react";
import List from "../../components/List";
import { withDefautLayout } from "../../layouts/Default";
import { requiresAuth } from "../../lib/auth";
import { formatDate } from "../../lib/format";
import { ProjectProvider, useProject } from "../../lib/store/project";

function Project() {
  const { project, getProject } = useProject();
  console.log({ project });

  const { id } = useRouter().query;
  useEffect(() => {
    getProject(id);
  }, []);

  return (
    <>
      {project && (
        <>
          <div className="flex items-center justify-between w-full p-3 bg-white rounded">
            <div className="flex flex-col ">
              <h1 className="text-2xl">{project.name}</h1>
              <span className="text-sm text-gray-700">
                Cree le {formatDate(project.createdAt)}
              </span>
            </div>
            <span className="text-sm text-gray-700">
              Mis a jour le {formatDate(project.updatedAt)}
            </span>
          </div>
          {/* <div className="flex flex-col mt-5 space-y-4"> */}
          <div className="flex flex-col mt-5 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            {project.lists.map((list) => (
              <List key={list._id} projectId={id} list={list} />
            ))}
          </div>
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

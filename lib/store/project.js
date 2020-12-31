import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(null);

  const getProject = async (id) => {
    const result = await (await fetch(`/api/project/${id}`)).json();
    setProject(result);
  };

  return (
    <ProjectContext.Provider value={{ project, setProject, getProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

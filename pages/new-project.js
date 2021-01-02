import axios from "axios";
import { useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { withDefautLayout } from "../layouts/Default";
import { requiresAuth } from "../lib/auth";

function NewProject() {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState(["To-do", "Doing", "Done"]);
  const [loading, setLoading] = useState(false);

  const editColumn = (e, i) => {
    let newCols = [...columns];
    newCols[i] = e.target.value;
    setColumns(newCols);
  };

  const addColumn = (e) => {
    e.preventDefault();
    setColumns([...columns, "Nouvelle colonne"]);
  };

  const deleteColumn = (e, i) => {
    e.preventDefault();
    let newCols = [...columns];
    newCols.splice(i, 1);
    setColumns(newCols);
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (name.trim() === "" || columns.length === 0) {
      return window.alert(
        "Vous devez remplir le nom et avoir au moins 1 colonne !"
      );
    }
    setLoading(true);
    await axios.post("/api/projects", { name, columns });
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={createProject}>
        <div className="px-4 py-5 space-y-6 bg-white rounded shadow sm:p-6">
          <Input
            label="Nom"
            required
            name="project-name"
            value={name}
            onInput={(e) => setName(e.target.value)}
            placeholder="Mon super projet!"
          />
          <label className="flex flex-col">
            <span>Colonnes</span>
            <div className="mt-2 space-y-2">
              {columns.map((o, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Input key={i} value={o} onInput={(e) => editColumn(e, i)} />

                  <button
                    className="text-red-600 hover:text-red-800 focus:text-red-800 focus:outline-none focus:shadow-lg"
                    onClick={(e) => deleteColumn(e, i)}
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <div className="w-36">
                <Button
                  className="flex items-center justify-center space-x-2"
                  size="small"
                  kind="secondary"
                  onClick={addColumn}
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
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Ajouter</span>
                </Button>
              </div>
            </div>
          </label>
          <Button loading={loading} type="submit">
            Creer mon projet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withDefautLayout(NewProject);

export const getServerSideProps = requiresAuth;

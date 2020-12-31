import axios from "axios";
import { useState } from "react";
import { useProject } from "../lib/store/project";
import Button from "./UI/Button";
import Input from "./UI/Input";

export default function NewCard({ listId, done }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { project, getProject } = useProject();

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/api/project/${project._id}/card`, {
      name,
      description,
      listId,
    });
    await getProject(project._id);
    done();
  };
  return (
    <form onSubmit={onSubmit} className="p-4 bg-white">
      <div className="flex flex-col space-y-2">
        <Input
          value={name}
          placeholder="Faire la tache #420"
          label="Nom"
          required
          onInput={(e) => setName(e.target.value)}
        />

        <label>
          Description
          <textarea
            value={description}
            onInput={(e) => setDescription(e.target.value)}
            placeholder="Description de la tache #420..."
            className="flex-1 w-full px-4 py-1 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
            rows="4"
          ></textarea>
        </label>
      </div>
      <div className="flex mt-2 space-x-4">
        <Button kind="secondary" size="small" onClick={done}>
          Annuler
        </Button>
        <Button type="submit" size="small">
          Creer
        </Button>
      </div>
    </form>
  );
}

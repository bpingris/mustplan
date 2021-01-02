import axios from "axios";
import { useState } from "react";
import { useProject } from "../lib/store/project";
import Button from "./UI/Button";
import Input from "./UI/Input";

export default function EditCard({ card, done }) {
  const [name, setName] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [loading, setLoading] = useState(false);
  const { project, getProject } = useProject();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const r = await axios.put(`/api/project/${project._id}/card/${card._id}`, {
      name,
      description,
    });

    await getProject(project._id);
    setLoading(false);
    done();
  };
  return (
    <form onSubmit={onSubmit} className="p-4 bg-gray-50 rounded-b-md">
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
        <Button loading={loading} type="submit" size="small">
          Mettre à jour
        </Button>
      </div>
    </form>
  );
}

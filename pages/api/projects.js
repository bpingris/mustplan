import { getSession } from "next-auth/client";
import { dbConnect } from "../../lib/db";
import List from "../../models/List";
import Project from "../../models/Project";

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401);
  }
  await dbConnect();
  switch (req.method) {
    case "GET":
      const projects = await Project.find({ member: session.id });
      res.json(projects);
      break;
    case "POST":
      if (req.body.name.trim() === "" || req.body.columns.length === 0) {
        return res.status(401);
      }
      try {
        const p = await Project.create({
          name: req.body.name,
          member: session.id,
        });
        await List.create(
          req.body.columns.map((o) => ({ name: o, projectId: p._id }))
        );
        res.json("success");
      } catch (e) {
        res.status(500).json(e);
      }
      break;
    default:
      res.status(405).end("Method not allowed.");
      break;
  }
};

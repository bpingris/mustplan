import { getSession } from "next-auth/client";
import { dbConnect } from "../../../lib/db";
import Project from "../../../models/Project";
import List from "../../../models/List";
import Card from "../../../models/Card";
import { Types } from "mongoose";

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401);
    return res.end();
  }

  await dbConnect();

  switch (req.method) {
    case "GET":
      const {
        query: { id },
      } = req;
      try {
        const project = await Project.aggregate([
          {
            $match: {
              _id: Types.ObjectId(id),
              member: session.id,
            },
          },
          {
            $lookup: {
              from: List.collection.name,
              let: { projectId: "$_id" },
              pipeline: [
                {
                  $match: { $expr: { $eq: ["$projectId", "$$projectId"] } },
                },
                {
                  $lookup: {
                    from: Card.collection.name,
                    let: { listId: "$_id" },
                    pipeline: [
                      { $match: { $expr: { $eq: ["$listId", "$$listId"] } } },
                    ],
                    as: "cards",
                  },
                },
              ],
              as: "lists",
            },
          },
        ]);
        res.json(project[0]);
      } catch (e) {
        res.status(500).json(e);
      }
      break;
    default:
      res.status(405).send("Method not allowed");
  }
};

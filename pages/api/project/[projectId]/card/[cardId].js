import { getSession } from "next-auth/client";
import { dbConnect } from "../../../../../lib/db";
import Card from "../../../../../models/Card";

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401);
    return res.end();
  }

  await dbConnect();
  const {
    query: { cardId },
    body,
  } = req;

  switch (req.method) {
    case "DELETE":
      try {
        await Card.findByIdAndDelete(cardId);
        res.status(200);
        return res.end();
      } catch (e) {
        res.status(500).json(e);
      }
      break;
    case "PUT":
      await Card.findOneAndUpdate({ _id: cardId }, body);
      res.status(200);
      return res.end();
    default:
      res.status(405).send("Method not allowed");
      break;
  }
};

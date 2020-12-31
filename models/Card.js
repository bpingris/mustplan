import mongoose, { Schema } from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    listId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "list",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Card || mongoose.model("Card", CardSchema);

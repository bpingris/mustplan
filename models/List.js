import mongoose, { Schema } from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "project",
    },
  },
  { timestamps: true }
);

export default mongoose.models.List || mongoose.model("List", ListSchema);

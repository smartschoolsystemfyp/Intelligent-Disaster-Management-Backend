import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Allocated", "Unavailable"],
    default: "Available",
  },
  assignedDisaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disaster",
  },
});

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;

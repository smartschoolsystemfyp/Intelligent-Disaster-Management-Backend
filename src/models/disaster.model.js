import mongoose from "mongoose";

const disasterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Resolved", "Monitoring"],
    default: "Active",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
  description: String,
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }],
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
});

const Disaster = mongoose.model("Disaster", disasterSchema);
export default Disaster;

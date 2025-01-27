import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  skills: [String],
  availability: {
    type: String,
    enum: ["Full-time", "Part-time"],
    default: "Part-time",
  },
  location: {
    type: String,
    required: true,
  },
  assignedDisaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disaster",
  },
  tasks: [
    {
      description: String,
      status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",
      },
    },
  ],
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;

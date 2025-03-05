import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
  },
  donorContact: String,
  donationType: {
    type: String,
    enum: ["Monetary", "In-Kind"],
    required: true,
  },
  amount: {
    type: Number,
    required: function () {
      return this.donationType === "Monetary";
    },
  },
  items: [
    {
      itemName: String,
      quantity: Number,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
  },
  assignedDisaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disaster",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
});

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;

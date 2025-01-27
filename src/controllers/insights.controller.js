import moment from "moment";
import Volunteer from "../models/volunteer.model.js";
import Disaster from "../models/disaster.model.js";
import Donation from "../models/donation.model.js";

const getInsights = async (req, res) => {
  const totalVolunteers = await Volunteer.countDocuments();
  const totalDisasters = await Disaster.countDocuments();
  const ongoingDisasters = await Disaster.countDocuments({ status: "Active" });

  const totalDonations = await Donation.countDocuments();

  const totalDonationAmount = await Donation.aggregate([
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
  ]);

  const totalAmount = totalDonationAmount[0]?.totalAmount || 0;

  return res.json({
    success: true,
    message: "Insights fetched successfully",
    insights: {
      totalVolunteers,
      totalDisasters,
      ongoingDisasters,
      totalDonations,
      totalAmount,
    },
  });
};

export default getInsights;

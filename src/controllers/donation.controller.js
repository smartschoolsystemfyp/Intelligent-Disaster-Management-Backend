import Donation from "../models/donation.model.js";
import Disaster from "../models/disaster.model.js";

class DonationController {
  // Record a new donation (monetary or in-kind)
  async createDonation(req, res) {
    const id = req.user;

    const { donorName, donorContact, donationType, amount, items, status } =
      req.body;

    if (!donorName || !amount || !items || !donationType) {
      throw new Error("All fields are required");
    }

    const donation = await Donation.create({
      donorName,
      donorContact,
      amount,
      items,
      donationType,
      createdBy: id,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Donation recorded successfully",
      donation,
    });
  }

  // Retrieve all donations
  async getAllDonations(req, res) {
    const donations = await Donation.find().populate({
      path: "assignedDisaster",
      select: "name",
    });

    return res.status(200).json({
      success: true,
      message: "Donations retrieved successfully",
      donations,
    });
  }

  // Fetch details of a specific donation by ID
  async getDonationById(req, res) {
    const { id } = req.params;

    const donation = await Donation.findById(id).populate(
      "assignedDisaster",
      "name"
    );

    if (!donation) {
      throw new Error("Donation not found");
    }

    return res.status(200).json({
      success: true,
      message: "Donation retrieved successfully",
      donation,
    });
  }

  // Update donation details (e.g., status or items)
  async updateDonation(req, res) {
    const { id } = req.params;
    const updatedDonation = await Donation.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDonation) {
      throw new Error("Donation not found");
    }

    return res.status(200).json({
      success: true,
      message: "Donation updated successfully",
      updatedDonation,
    });
  }

  // Delete a donation record
  async deleteDonation(req, res) {
    const { id } = req.params;
    const deletedDonation = await Donation.findByIdAndDelete(id);

    if (!deletedDonation) {
      throw new Error("Donation not found");
    }

    return res.status(200).json({
      success: true,
      message: "Donation deleted successfully",
      deletedDonation,
    });
  }

  // Link a donation to a specific disaster
  async assignDonationToDisaster(req, res) {
    const { disasterId, donationId } = req.params;
    const disaster = await Disaster.findById(disasterId);
    const donation = await Donation.findById(donationId);

    if (!disaster) {
      return res.status(404).json({
        success: false,
        message: "Disaster not found",
      });
    }

    if (!donation) {
      throw new Error("Donation not found");
    }

    if (donation.status.toLowerCase() !== "received") {
      throw new Error("Donation is currently unavalaible");
    }

    disaster.donations.push(donationId);
    donation.status = "Assigned";
    await disaster.save();
    await donation.save();

    return res.status(200).json({
      success: true,
      message: "Donation linked to disaster successfully",
      donation,
    });
  }
}

export default new DonationController();

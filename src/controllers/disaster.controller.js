import Disaster from "../models/disaster.model.js";
import Volunteer from "../models/volunteer.model.js";
import Donation from "../models/donation.model.js";

class DisasterController {
  // Add a new disaster event to the system
  async createDisaster(req, res) {
    const { name, description, location, startDate, status, type } = req.body;

    if (!name || !description || !location || !startDate || !status || !type) {
      throw new Error("All fields are required");
    }

    const disaster = await Disaster.create({
      name,
      description,
      location,
      startDate,
      status,
      type
    });

    return res.status(201).json({
      success: true,
      message: "Disaster created successfully",
      disaster,
    });
  }

  // Retrieve a list of all disaster events
  async getAllDisasters(req, res) {
    const disasters = await Disaster.find();
    return res.status(200).json({
      success: true,
      message: "Disasters retrieved successfully",
      disasters,
    });
  }

  // Fetch details of a specific disaster by ID
  async getDisasterById(req, res) {
    const { id } = req.params;
    const disaster = await Disaster.findById(id);

    if (!disaster) {
      throw new Error("Disaster not found");
    }

    return res.status(200).json({
      success: true,
      message: "Disaster retrieved successfully",
      disaster,
    });
  }

  // Update disaster details (e.g., status or end date)
  async updateDisaster(req, res) {
    const { id } = req.params;
    const updatedDisaster = await Disaster.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedDisaster) {
      throw new Error("Disaster not found");
    }

    return res.status(200).json({
      success: true,
      message: "Disaster updated successfully",
      updatedDisaster,
    });
  }

  // Remove a disaster record from the system
  async deleteDisaster(req, res) {
    const { id } = req.params;
    const deletedDisaster = await Disaster.findByIdAndDelete(id);

    if (!deletedDisaster) {
      throw new Error("Disaster not found");
    }

    return res.status(200).json({
      success: true,
      message: "Disaster deleted successfully",
    });
  }

  // Retrieve all volunteers assigned to a specific disaster
  async getDisasterVolunteers(req, res) {
    const { disasterId } = req.params;
    const disaster = await Disaster.findById(disasterId);

    if (!disaster) {
      throw new Error("Disaster not found");
    }

    const volunteers = await Volunteer.find({ assignedDisaster: disasterId });

    return res.status(200).json({
      success: true,
      message: "Volunteers for disaster retrieved successfully",
      volunteers,
    });
  }

  // Retrieve all donations linked to a specific disaster
  async getDisasterDonations(req, res) {
    const { disasterId } = req.params;
    const disaster = await Disaster.findById(disasterId);

    if (!disaster) {
      throw new Error("Disaster not found");
    }

    const donations = await Donation.find({ disaster: disasterId });

    return res.status(200).json({
      success: true,
      message: "Donations for disaster retrieved successfully",
      donations,
    });
  }
}

export default new DisasterController();

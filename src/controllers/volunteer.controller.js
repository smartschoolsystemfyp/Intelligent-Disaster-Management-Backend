import Volunteer from "../models/volunteer.model.js";
import Disaster from "../models/disaster.model.js";

class VolunteerController {
  // Add a new volunteer to the system
  async createVolunteer(req, res, next) {
    const { name, email, phone, skills, availability, location } = req.body;

    if (!name || !email || !phone || !skills || !availability || !location) {
      throw new Error("All fields are required");
    }

    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      skills,
      availability,
      location,
    });

    return res.status(201).json({
      success: true,
      message: "Volunteer created successfully",
      volunteer,
    });
  }

  // Retrieve a list of all volunteers
  async getAllVolunteers(req, res, next) {
    const volunteers = await Volunteer.find();

    return res.status(200).json({
      success: true,
      message: "Volunteers retrieved successfully",
      volunteers,
    });
  }

  // Fetch details of a specific volunteer by ID
  async getVolunteerById(req, res, next) {
    const { id } = req.params;
    const volunteer = await Volunteer.findById(id);

    if (!volunteer) {
      throw new Error("Volunteer not found");
    }

    return res.status(200).json({
      success: true,
      message: "Volunteer retrieved successfully",
      volunteer,
    });
  }

  // Update volunteer information
  async updateVolunteer(req, res, next) {
    const { id } = req.params;
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedVolunteer) {
      throw new Error("Volunteer not found");
    }

    return res.status(200).json({
      success: true,
      message: "Volunteer updated successfully",
      updatedVolunteer,
    });
  }

  // Remove a volunteer from the system
  async deleteVolunteer(req, res, next) {
    const { id } = req.params;
    const deletedVolunteer = await Volunteer.findByIdAndDelete(id);

    if (!deletedVolunteer) {
      throw new Error("Volunteer not found");
    }

    return res.status(200).json({
      success: true,
      message: "Volunteer deleted successfully",
    });
  }

  // Assign a volunteer to a specific disaster
  async assignVolunteerToDisaster(req, res, next) {
    const { volunteerId, disasterId } = req.params;

    const disaster = await Disaster.findById(disasterId);
    if (!disaster) {
      return res.status(404).json({
        success: false,
        message: "Disaster not found",
      });
    }

    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      volunteerId,
      { assignedDisaster: disasterId },
      { new: true }
    );

    if (!updatedVolunteer) {
      throw new Error("Volunteer not found");
    }

    return res.status(200).json({
      success: true,
      message: "Volunteer assigned to disaster successfully",
      updatedVolunteer,
    });
  }
}

export default new VolunteerController();

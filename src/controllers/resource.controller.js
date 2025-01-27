import Resource from "../models/resource.model.js";
import Disaster from "../models/disaster.model.js";

class ResourceController {
  // Add a new resource
  async createResource(req, res) {
    const { name, type, quantity, description, status } = req.body;

    if (!name || !type || !quantity || !description) {
      throw new Error("All fields are required");
    }

    const resource = await Resource.create({
      name,
      type,
      quantity,
      description,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Resource created successfully",
      resource,
    });
  }

  // Retrieve all available resources
  async getAllResources(req, res) {
    const resources = await Resource.find();

    return res.status(200).json({
      success: true,
      message: "Resources retrieved successfully",
      resources,
    });
  }

  // Fetch details of a specific resource by ID
  async getResourceById(req, res) {
    const { id } = req.params;
    const resource = await Resource.findById(id);

    if (!resource) {
      throw new Error("Resource not found");
    }

    return res.status(200).json({
      success: true,
      message: "Resource retrieved successfully",
      resource,
    });
  }

  // Update resource details (e.g., quantity or status)
  async updateResource(req, res) {
    const { id } = req.params;
    const updatedResource = await Resource.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedResource) {
      throw new Error("Resource not found");
    }

    return res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      updatedResource,
    });
  }

  // Delete a resource record
  async deleteResource(req, res) {
    const { id } = req.params;
    const deletedResource = await Resource.findByIdAndDelete(id);

    if (!deletedResource) {
      throw new Error("Resource not found");
    }

    return res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  }

  // Allocate resources to a specific disaster
  async assignResourceToDisaster(req, res) {
    const { disasterId, resourceId } = req.params;
    const disaster = await Disaster.findById(disasterId);
    const resource = await Resource.findById(resourceId);

    if (!disaster) {
      throw new Error("Disaster not found");
    }

    if (!resource) {
      throw new Error("Resource not found");
    }

    if (resource.status == "Allocated") {
      throw new Error("Resource already allocated");
    }

    disaster.resources.push(resourceId);
    resource.status = "Allocated";
    await disaster.save();
    await resource.save();

    return res.status(200).json({
      success: true,
      message: "Resource allocated to disaster successfully",
    });
  }
}

export default new ResourceController();

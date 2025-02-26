import express from "express";
import catchErrors from "../utils/index.js";
import verifyToken from "../middleware/index.js";
import getInsights from "../controllers/insights.controller.js";
import VolunteerController from "../controllers/volunteer.controller.js";
import DisasterController from "../controllers/disaster.controller.js";
import ResourceController from "../controllers/resource.controller.js";
import DonationController from "../controllers/donation.controller.js";
import AuthController from "../controllers/authentication.controller.js";

const router = express.Router();

// _____________________Authentication Routes______________________
router.post("/auth/register", catchErrors(AuthController.register));
router.post("/auth/login", catchErrors(AuthController.login));
router.get("/auth/logout", verifyToken, catchErrors(AuthController.logout));

// _____________________Insight Route______________________
router.get("/insights", catchErrors(getInsights));

// _____________________Volunteers Routes______________________
router.post(
  "/volunteer",
  verifyToken,
  catchErrors(VolunteerController.createVolunteer)
);
router.get(
  "/volunteer",
  // verifyToken,
  catchErrors(VolunteerController.getAllVolunteers)
);
router.get(
  "/volunteer/:id",
  verifyToken,
  catchErrors(VolunteerController.getVolunteerById)
);
router.patch(
  "/volunteer/:id",
  verifyToken,
  catchErrors(VolunteerController.updateVolunteer)
);
router.delete(
  "/volunteer/:id",
  verifyToken,
  catchErrors(VolunteerController.deleteVolunteer)
);
router.patch(
  "/disaster/:disasterId/volunteer/:volunteerId",
  // verifyToken,
  catchErrors(VolunteerController.assignVolunteerToDisaster)
);

// _____________________Disasters Routes______________________
router.post(
  "/disaster",
  verifyToken,
  catchErrors(DisasterController.createDisaster)
);
router.get(
  "/disaster",
  // verifyToken,
  catchErrors(DisasterController.getAllDisasters)
);
router.get(
  "/disaster/:id",
  verifyToken,
  catchErrors(DisasterController.getDisasterById)
);
router.patch(
  "/disaster/:id",
  verifyToken,
  catchErrors(DisasterController.updateDisaster)
);
router.delete(
  "/disaster/:id",
  verifyToken,
  catchErrors(DisasterController.deleteDisaster)
);
router.get(
  "/disaster/:disasterId/volunteers",
  verifyToken,
  catchErrors(DisasterController.getDisasterVolunteers)
);
router.get(
  "/disaster/:disasterId/donations",
  verifyToken,
  catchErrors(DisasterController.getDisasterDonations)
);

// _____________________Resources Routes______________________
router.post(
  "/resource",
  verifyToken,
  catchErrors(ResourceController.createResource)
);
router.get(
  "/resource",
  // verifyToken,
  catchErrors(ResourceController.getAllResources)
);
router.get(
  "/resource/:id",
  verifyToken,
  catchErrors(ResourceController.getResourceById)
);
router.patch(
  "/resource/:id",
  verifyToken,
  catchErrors(ResourceController.updateResource)
);
router.delete(
  "/resource/:id",
  verifyToken,
  catchErrors(ResourceController.deleteResource)
);
router.patch(
  "/disaster/:disasterId/resource/:resourceId",
  // verifyToken,
  catchErrors(ResourceController.assignResourceToDisaster)
);

// _____________________Donations Routes______________________
router.post(
  "/donation",
  verifyToken,
  catchErrors(DonationController.createDonation)
);
router.get(
  "/donation",
  // verifyToken,
  catchErrors(DonationController.getAllDonations)
);
router.get(
  "/donation/:id",
  verifyToken,
  catchErrors(DonationController.getDonationById)
);
router.patch(
  "/donation/:id",
  verifyToken,
  catchErrors(DonationController.updateDonation)
);
router.delete(
  "/donation/:id",
  verifyToken,
  catchErrors(DonationController.deleteDonation)
);
router.patch(
  "/disaster/:disasterId/donation/:donationId",
  // verifyToken,
  catchErrors(DonationController.assignDonationToDisaster)
);

export default router;

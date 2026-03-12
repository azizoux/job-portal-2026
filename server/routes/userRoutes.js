import express from "express";
import {
  applyForJob,
  checkAndAddUser,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";

const router = express.Router();

// Check and add user
router.post("/check-user", checkAndAddUser);

// Get user Data
router.get("/user", getUserData);

// Apply for a job
router.post("/apply", applyForJob);

// Get applied jobs data
router.get("/applications", getUserJobApplications);

// Update user profile (resume)
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;

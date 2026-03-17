import express from "express";
import {
  applyForJob,
  checkAndAddUser,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/uploadResume.js";
import protectUser from "../middlewares/protectUser.js";

const router = express.Router();

// Check and add user
router.post("/check-user", checkAndAddUser);

// Get user Data
router.get("/user", protectUser, getUserData);

// Apply for a job
router.post("/apply", protectUser, applyForJob);

// Get applied jobs data
router.get("/applications", protectUser, getUserJobApplications);

// Update user profile (resume)
router.post(
  "/update-resume",
  protectUser,
  upload.single("resume"),
  updateUserResume,
);

export default router;

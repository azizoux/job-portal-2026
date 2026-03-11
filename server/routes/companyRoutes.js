import express from "express";
import {
  changeJobApplicationsStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompay,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a Company
router.post("/register", upload.single("image"), registerCompany);

// Company Login Company
router.post("/login", loginCompay);

// Get Company data
router.get("/company", protectCompany, getCompanyData);

// Post a Job
router.post("/post-job", protectCompany, postJob);

// Get Applicants Data of Company
router.get("/applicants", protectCompany, getCompanyJobApplicants);

// Get Company Job List
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

// Change Applications Status
router.post("/change-status", protectCompany, changeJobApplicationsStatus);

// Change Applications Visibility
router.post("/change-visibility", protectCompany, changeVisibility);

export default router;

import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Check and Add User
export const checkAndAddUser = async (req, res) => {
  const { email, name, image } = req.body;

  try {
    const userExisting = await User.find({ email });

    if (userExisting.length === 0) {
      const newUser = await User.create({
        email,
        name,
        image: image,
      });
      res.json({
        success: true,
        message: "User in DB",
        token: generateToken(newUser._id),
      });
    } else {
      const user = userExisting[0];
      const token = generateToken(user._id);

      res.json({
        success: true,
        message: "User in DB",
        token,
      });
    }
  } catch (error) {
    console.error("Erreur in CheckAndAdd Function:", error.message);
  }
};

// Get user data
export const getUserData = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.error(error.message);
  }
};

// Apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const { userId } = req;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "Already Applied" });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: " No job applications found",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update user profile (Resume)
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await User.findById(userId);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No resume uploaded" });
    }
    const resumeUrl = `${req.protocol}://${req.get("host")}/resumes/${
      req.file.filename
    }`;

    userData.resume = resumeUrl;

    await userData.save();
    return res.json({ success: true, message: "Resume updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

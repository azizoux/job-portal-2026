import jwt from "jsonwebtoken";
import Company from "../models/Company.js";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not Authorired, Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.companyId = decoded.id;
    next();
  } catch (error) {
    console.log("Error in protectCompany Middleware...", error);
    res.json({ success: false, message: error.message });
  }
};

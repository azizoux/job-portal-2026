import jwt from "jsonwebtoken";

const protectUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log("Error in protectUser middleware:", error.message);
    res.status(401).json({ success: false, message: "Not authorized" });
  }
};

export default protectUser;

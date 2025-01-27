import jwt from "jsonwebtoken";
import catchErrors from "../utils/index.js";

const verifyToken = catchErrors((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized Access");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Invalid or expired token");
    }

    req.user = decoded.userId;
    next();
  });
});

export default verifyToken;

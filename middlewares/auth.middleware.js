import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check if there's no token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user ID to req.user as _id
    req.user = { _id: decoded.userId };

    next();  // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const admin = (req, res, next) => {
  // Hardcoded admin check by userId
  const isAdmin = req.user._id === "66e58b62ad883ac8a7e17e62";

  if (!isAdmin) return res.status(403).json({ msg: "Access Denied" });
  next();
};

export { auth, admin };

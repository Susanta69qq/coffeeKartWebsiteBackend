import jwt from "jsonwebtoken";

// Auth middleware to validate token and store user in req
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);        
    req.user = { id: decoded.userId }; // Store decoded userId in req.user
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Admin middleware to check if the user is an admin
const admin = (req, res, next) => {
  const isAdmin = req.user.id === "66e58b62ad883ac8a7e17e62";

  if (!isAdmin) return res.status(403).json({ msg: "Access Denied" });
  next();
};

export { auth, admin };

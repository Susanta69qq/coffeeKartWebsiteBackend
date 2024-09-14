import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const admin = (req, res, next) => {
  const isAdmin = req.userId === "66e58b62ad883ac8a7e17e62";

  if (!isAdmin) return res.status(403).json({ msg: "Access Denied" });
  next();
};

export { auth, admin };

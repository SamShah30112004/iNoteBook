const jwt = require("jsonwebtoken");

JWT_SECRET = "HelloIAmHarshShahandIamAStudentAtVITVellore";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please Authenticate with valid token" });
  }

  const data = jwt.verify(token, JWT_SECRET);
  req.user = data;
  next();
};

module.exports = fetchuser;

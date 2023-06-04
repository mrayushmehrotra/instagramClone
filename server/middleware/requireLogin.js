const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      success: false,
      error: "You are not logged in",
    });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      
      return res.status(401).json({
        success: false,
        error: "You must be logged in",
      });
    }

    const { _id } = payload;
    User.findById(_id)
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({
            success: false,
            error: "User not found",
          });
        }

        req.user = userData;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          success: false,
          error: "Server error",
        });
      });
  });
};

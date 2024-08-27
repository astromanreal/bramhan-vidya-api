const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  verifySignUpOtp,
  forgetPassword,
  resetPassword,
  verifyResetPasswordOtp,
} = require("../controllers/users/users");
const {
  getProfileDocumentsByUserId,
  getProfileFeed,
} = require("../controllers/users/ProfileDoc");
const {
  getPlaceDocumentsByUserId,
  getPlaceFeed,
} = require("../controllers/users/PlaceDoc");

const router = express.Router();

router.get("/alluser", getAllUsers);
router.post("/adduser", createUser);
router.post("/verify-otp", verifySignUpOtp);
router.post("/reset-password-otp", verifyResetPasswordOtp);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.post("/loginuser", loginUser);

router.get("/user/:id", getUserById);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

// user doc
router.get("/allprofiledoc/:id", getProfileDocumentsByUserId);
router.get("/allplacedoc/:id", getPlaceDocumentsByUserId);

// feeds
router.get("/profilefeed", getProfileFeed);
router.get("/placefeed", getPlaceFeed);

module.exports = router;

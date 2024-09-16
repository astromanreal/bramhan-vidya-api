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
  searchProfiles,
} = require("../controllers/users/ProfileDoc");
const {
  getPlaceDocumentsByUserId,
  getPlaceFeed,
} = require("../controllers/users/PlaceDoc");
const {
  getTopicDocuments,
  getBlogDocuments,
  getEventDocuments,
  getTechDocuments,
  getBookDocuments,
} = require("../controllers/users/AllUserDocs");

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
router.get("/search-profiles", searchProfiles);
router.get("/allplacedoc/:id", getPlaceDocumentsByUserId);

// all docs
router.get("/alltopicdoc/:id", getTopicDocuments);
router.get("/allblogdoc/:id", getBlogDocuments);
router.get("/alleventdoc/:id", getEventDocuments);
router.get("/alltechdoc/:id", getTechDocuments);
router.get("/allbookdoc/:id", getBookDocuments);

// feeds
router.get("/profilefeed", getProfileFeed);
router.get("/placefeed", getPlaceFeed);

module.exports = router;

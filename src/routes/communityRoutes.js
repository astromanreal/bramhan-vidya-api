const express = require("express");
const {
  getAllCommunities,
  createCommunity,
  getCommunityById,
  updateCommunity,
  deleteCommunity,
  joinCommunity,
  myCommunities,
  checkMembership,
} = require("../controllers/community/community");
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/community/communityPosts");

const router = express.Router();

router.get("/Allcommunities", getAllCommunities);
router.post("/Addcommunity", createCommunity);
router.get("/community/:id", getCommunityById);
router.put("/community/:id", updateCommunity);
router.delete("/community/:id", deleteCommunity);

// post releted
router.get("/Allposts/:id", getAllPosts);
router.post("/Addpost/:id", createPost);
router.get("/post/:id", getPostById);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

// member
router.post("/community/:id/join", joinCommunity);
router.get("/my-communities", myCommunities);
router.get("/community/:id/check-membership", checkMembership);

module.exports = router;

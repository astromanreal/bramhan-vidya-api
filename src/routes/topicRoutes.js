const express = require("express");
const {
  getAllTopics,
  createTopic,
  getTopicById,
  updateTopic,
  deleteTopic,
  likeTopic,
  dislikeTopic,
  addTopicComment,
  deleteTopicComment,
} = require("../controllers/topics/Topics");
const router = express.Router();

router.get("/alltopics", getAllTopics);
router.post("/addtopics", createTopic);
router.get("/topic/:id", getTopicById);
router.put("/topic/:id", updateTopic);
router.delete("/topic/:id", deleteTopic);

// like & dislike
router.put("/like/:id", likeTopic);
router.put("/dislike/:id", dislikeTopic);

// comments
router.post("/:topicId/comment", addTopicComment);
router.delete("/:topicId/comment/:commentId", deleteTopicComment);
module.exports = router;

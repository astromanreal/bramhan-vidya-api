const express = require("express");
const {
  getAllTechnologies,
  createTechnology,
  updateTechnology,
  getTechnologyById,
  deleteTechnology,
  likeTechnology,
  dislikeTechnology,
  addTechnologyComment,
  deleteTechnologyComment,
} = require("../controllers/tech/tech");

const router = express.Router();

router.get("/alltech", getAllTechnologies);
router.post("/addtech", createTechnology);
router.get("/tech/:id", getTechnologyById);
router.put("/tech/:id", updateTechnology);
router.delete("/tech/:id", deleteTechnology);

// like comment
router.put("/like/:id", likeTechnology);
router.put("/dislike/:id", dislikeTechnology);
router.post("/:id/comment", addTechnologyComment);
router.delete("/:id/comment/:commentId", deleteTechnologyComment);

module.exports = router;

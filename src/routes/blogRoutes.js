const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs/blogs");

const router = express.Router();

router.get("/allblogs", getAllBlogs);
router.post("/addblog", createBlog);
router.get("/blog/:id", getBlogById);
router.put("/blog/:id", updateBlog);
router.delete("/blog/:id", deleteBlog);

module.exports = router;

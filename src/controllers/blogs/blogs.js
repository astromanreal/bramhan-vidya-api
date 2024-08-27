const Blog = require("../../models/blogs/blogModel");

// Create a new blog article
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all blog articles
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a single blog article by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    blog.views += 1;
    await blog.updateOne(
      { $set: { views: blog.views } },
      { timestamps: false }
    );
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a blog article by ID
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    if (blog.userId.toString() !== req.body.userId) {
      return res
        .status(401)
        .send({ message: "Unauthorized to update this blog" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updatedBlog);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a blog article by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

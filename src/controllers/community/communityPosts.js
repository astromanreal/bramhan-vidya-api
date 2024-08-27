const Post = require("../../models/community/communityPostModel");

exports.createPost = async (req, res) => {
  try {
    const communityId = req.params.id;
    const { title, content } = req.body;
    const userId = req.body.userId;
    const post = new Post({ title, content, communityId, userId });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const communityId = req.params.id;
    const posts = await Post.find({ communityId });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    post.views += 1;
    await post.updateOne(
      { $set: { views: post.views } },
      { timestamps: false }
    );
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);
    res.status(204).send({ success: true, message: "Post deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
};

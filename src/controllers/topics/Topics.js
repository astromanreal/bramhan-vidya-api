const Topic = require("../../models/topics/topicModel");

// Get all topics
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: "Error fetching topics" });
  }
};

// Get topic by ID
exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    topic.views += 1;
    await topic.updateOne(
      { $set: { views: topic.views } },
      { timestamps: false }
    );
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: "Error fetching topic" });
  }
};

// Create new topic
exports.createTopic = async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: "Error creating topic" });
  }
};

// Update topic by ID
exports.updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    if (topic.userId.toString() !== req.body.userId) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to edit this data",
      });
    }

    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedTopic);
  } catch (err) {
    res.status(500).json({ message: "Error updating topic" });
  }
};

// Delete topic by ID
exports.deleteTopic = async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Topic deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting topic" });
  }
};

exports.likeTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const { userId } = req.body;

    const topic = await Topic.findById(topicId);

    if (!topic.likes || !topic.likes.users) {
      topic.likes = { count: 0, users: [] };
    }

    if (topic.likes.users.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this topic" });
    }

    topic.likes.users.push(userId);
    topic.likes.count += 1;

    await topic.save({ timestamps: false });

    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error liking topic" });
  }
};

exports.dislikeTopic = async (req, res) => {
  try {
    const topicId = req.params.id;
    const { userId } = req.body;

    const topic = await Topic.findById(topicId);

    if (!topic.likes || !topic.likes.users) {
      topic.likes = { count: 0, users: [] };
    }

    if (!topic.likes.users.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You haven't liked this topic yet" });
    }

    topic.likes.users.pull(userId);
    topic.likes.count = Math.max(0, topic.likes.count - 1);

    await topic.save({ timestamps: false });

    res.json(topic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error disliking topic" });
  }
};

exports.addTopicComment = async (req, res) => {
  try {
    const topicId = req.params.topicId;
    const { comment, userId } = req.body;

    const topic = await Topic.findById(topicId);
    topic.comments.comments.push({ comment, userId });
    topic.comments.count++;
    await topic.save({ timestamps: false });
    return res.json(topic);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add comment" });
  }
};

exports.deleteTopicComment = async (req, res) => {
  try {
    const topicId = req.params.topicId;
    const commentId = req.params.commentId;

    const topic = await Topic.findById(topicId);
    topic.comments.comments.pull(commentId);
    topic.comments.count--;
    await topic.save({ timestamps: false });
    return res.json(topic);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete comment" });
  }
};

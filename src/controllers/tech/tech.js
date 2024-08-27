const Technology = require("../../models/tech/techModel");

exports.getAllTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.send({
      success: true,
      count: technologies.length,
      data: technologies,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching technologies" });
  }
};

exports.createTechnology = async (req, res) => {
  try {
    const { name } = req.body;
    const existingTechnology = await Technology.findOne({ name });
    if (existingTechnology) {
      return res.status(400).json({
        success: false,
        message: `Technology with name '${name}' already exists.`,
      });
    }

    const technology = new Technology(req.body);
    await technology.save();
    res.status(200).send({
      success: true,
      data: technology,
      message: "Technology created successfully.",
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        errors: err.errors,
      });
    } else {
      res.status(500).json({ message: "Error creating technology" });
    }
  }
};

exports.getTechnologyById = async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);
    if (!technology) {
      return res.status(404).json({ message: "Technology not found" });
    }
    technology.views += 1;
    await technology.updateOne(
      { $set: { views: technology.views } },
      { timestamps: false }
    );
    res.json(technology);
  } catch (err) {
    res.status(500).json({ message: "Error fetching technology" });
  }
};

exports.updateTechnology = async (req, res) => {
  try {
    const technology = await Technology.findById(req.params.id);
    if (!technology) {
      return res.status(404).json({ message: "Technology not found" });
    }
    if (req.body.userId !== technology.userId) {
      return res.status(403).json({ message: "Unauthorized to update" });
    }

    const existingTechnology = await Technology.findOne({
      name: req.body.name,
    });
    if (existingTechnology) {
      return res.status(400).json({
        success: false,
        message: `Technology with name '${req.body.name}' already exists.`,
      });
    }

    const updatedTechnology = await Technology.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedTechnology);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating technology" });
  }
};

exports.deleteTechnology = async (req, res) => {
  try {
    await Technology.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Technology deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting technology" });
  }
};

exports.likeTechnology = async (req, res) => {
  try {
    const technologyId = req.params.id;
    const { userId } = req.body;

    const technology = await Technology.findById(technologyId);

    if (!technology.likes || !technology.likes.users) {
      technology.likes = { count: 0, users: [] };
    }

    if (technology.likes.users.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this technology" });
    }

    technology.likes.users.push(userId);
    technology.likes.count += 1;

    await technology.save({ timestamps: false });

    res.json(technology);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error liking technology" });
  }
};

exports.dislikeTechnology = async (req, res) => {
  try {
    const technologyId = req.params.id;
    const { userId } = req.body;

    const technology = await Technology.findById(technologyId);

    if (!technology.likes || !technology.likes.users) {
      technology.likes = { count: 0, users: [] };
    }

    if (!technology.likes.users.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You haven't liked this technology yet" });
    }

    technology.likes.users.pull(userId);
    technology.likes.count = Math.max(0, technology.likes.count - 1);

    await technology.save({ timestamps: false });

    res.json(technology);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error disliking technology" });
  }
};

exports.addTechnologyComment = async (req, res) => {
  try {
    const technologyId = req.params.id;
    const { comment, userId } = req.body;

    const technology = await Technology.findById(technologyId);
    technology.comments.comments.push({ comment, userId });
    technology.comments.count++;
    await technology.save({ timestamps: false });
    return res.json(technology);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add comment" });
  }
};

exports.deleteTechnologyComment = async (req, res) => {
  try {
    const technologyId = req.params.id;
    const commentId = req.params.commentId;

    const technology = await Technology.findById(technologyId);
    technology.comments.comments.pull(commentId);
    technology.comments.count--;
    await technology.save({ timestamps: false });
    return res.json(technology);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete comment" });
  }
};

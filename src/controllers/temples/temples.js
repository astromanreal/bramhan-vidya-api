const HinduTemple = require("../../models/temples/templeModel");

exports.getAllTemples = async (req, res) => {
  try {
    const temples = await HinduTemple.find();
    res.send({
      success: true,
      count: temples.length,
      data: temples,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching temples" });
  }
};

exports.createTemple = async (req, res) => {
  try {
    const { name } = req.body;
    const existingTemple = await HinduTemple.findOne({ name });
    if (existingTemple) {
      return res.status(400).json({
        success: false,
        message: `Temple with name '${name}' already exists.`,
      });
    }

    const temple = new HinduTemple(req.body);
    await temple.save();
    res.status(200).send({
      success: true,
      data: temple,
      message: "Temple created successfully.",
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
      res.status(500).json({ message: "Error creating temple" });
    }
  }
};

exports.getTempleById = async (req, res) => {
  try {
    const temple = await HinduTemple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }
    temple.views += 1;
    await temple.updateOne(
      { $set: { views: temple.views } },
      { timestamps: false }
    );
    res.json(temple);
  } catch (err) {
    res.status(500).json({ message: "Error fetching temple" });
  }
};

exports.updateTemple = async (req, res) => {
  try {
    const temple = await HinduTemple.findById(req.params.id);
    if (!temple) {
      return res.status(404).json({ message: "Temple not found" });
    }
    if (req.body.userId !== temple.userId) {
      return res.status(403).json({ message: "Unauthorized to update" });
    }

    const updatedTemple = await HinduTemple.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedTemple);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating temple" });
  }
};

exports.deleteTemple = async (req, res) => {
  try {
    await HinduTemple.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Temple deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting temple" });
  }
};

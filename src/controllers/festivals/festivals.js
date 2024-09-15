const HinduFestival = require("../../models/festivals/festivalModel");

exports.getAllFestivals = async (req, res) => {
  try {
    const festivals = await HinduFestival.find();
    res.send({
      success: true,
      count: festivals.length,
      data: festivals,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching festivals" });
  }
};

exports.createFestival = async (req, res) => {
  try {
    const { name } = req.body;
    const existingFestival = await HinduFestival.findOne({ name });
    if (existingFestival) {
      return res.status(400).json({
        success: false,
        message: `Festival with name '${name}' already exists.`,
      });
    }

    const festival = new HinduFestival(req.body);
    await festival.save();
    res.status(200).send({
      success: true,
      data: festival,
      message: "Festival created successfully.",
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
      res.status(500).json({ message: "Error creating festival" });
    }
  }
};

exports.getFestivalById = async (req, res) => {
  try {
    const festival = await HinduFestival.findById(req.params.id);
    if (!festival) {
      return res.status(404).json({ message: "Festival not found" });
    }
    festival.views += 1;
    await festival.updateOne(
      { $set: { views: festival.views } },
      { timestamps: false }
    );
    res.json(festival);
  } catch (err) {
    res.status(500).json({ message: "Error fetching festival" });
  }
};

exports.updateFestival = async (req, res) => {
  try {
    const festival = await HinduFestival.findById(req.params.id);
    if (!festival) {
      return res.status(404).json({ message: "Festival not found" });
    }
    if (req.body.userId !== festival.userId) {
      return res.status(403).json({ message: "Unauthorized to update" });
    }

    const updatedFestival = await HinduFestival.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedFestival);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating festival" });
  }
};

exports.deleteFestival = async (req, res) => {
  try {
    await HinduFestival.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Festival deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting festival" });
  }
};

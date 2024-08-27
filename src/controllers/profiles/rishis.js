const { default: mongoose } = require("mongoose");
const Rishi = require("../../models/profiles/rishiModel");

exports.addRishiProfile = async (req, res) => {
  try {
    const rishiData = req.body;

    if (!rishiData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newRishi = new Rishi(rishiData);
    await newRishi.save();

    res.send({
      success: true,
      message: "Rishi profile created successfully!",
      data: newRishi,
    });
  } catch (error) {
    console.error("Error creating Rishi profile:", error.message);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Rishi profile!",
    });
  }
};

exports.getAllRishis = async (req, res) => {
  try {
    const rishis = await Rishi.find();
    res.send({
      success: true,
      count: rishis.length,
      data: rishis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Rishis",
    });
  }
};

exports.getRishiById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const rishi = await Rishi.findById(id);
    if (!rishi) {
      return res.status(404).send({
        success: false,
        message: "No Rishi found with this id!",
      });
    }
    rishi.views += 1;
    await rishi.updateOne(
      { $set: { views: rishi.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: rishi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Rishi profile!",
    });
  }
};

exports.updateRishiProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData.name) {
      res.status(503).send({
        success: false,
      });
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedRishi = await Rishi.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRishi) {
      return res.status(404).send({
        success: false,
        message: "No Rishi found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Rishi profile updated successfully!",
      data: updatedRishi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Rishi profile!",
    });
  }
};

exports.deleteRishiProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedRishi = await Rishi.findByIdAndDelete(id);

    if (!deletedRishi) {
      return res.status(404).send({
        success: false,
        message: "No Rishi found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Rishi profile deleted successfully!",
      data: deletedRishi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Rishi profile!",
    });
  }
};

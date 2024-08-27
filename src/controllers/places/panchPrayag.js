const PanchPrayag = require("../../models/places/panchPrayagModel");
const mongoose = require("mongoose");

exports.addPanchPrayag = async (req, res) => {
  try {
    const prayagData = req.body;
    const newPrayag = new PanchPrayag(prayagData);
    await newPrayag.save();
    res.send({
      success: true,
      message: "Panch Prayag created successfully",
      data: newPrayag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Panch Prayag",
    });
  }
};

exports.getAllPanchPrayags = async (req, res) => {
  try {
    const prayags = await PanchPrayag.find();
    res.send({
      success: true,
      count: prayags.length,
      data: prayags,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Panch Prayags",
    });
  }
};

exports.getPanchPrayagById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const prayag = await PanchPrayag.findById(id);
    if (!prayag) {
      return res.status(404).send({
        success: false,
        message: "No Panch Prayag found with this id",
      });
    }
    prayag.views += 1;
    await prayag.updateOne(
      { $set: { views: prayag.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: prayag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Panch Prayag profile",
    });
  }
};

exports.updatePanchPrayag = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedPrayag = await PanchPrayag.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedPrayag) {
      return res.status(404).send({
        success: false,
        message: "No Panch Prayag found with this id",
      });
    }
    res.send({
      success: true,
      message: "Panch Prayag updated successfully",
      data: updatedPrayag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Panch Prayag",
    });
  }
};

exports.deletePanchPrayag = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedPrayag = await PanchPrayag.findByIdAndDelete(id);
    if (!deletedPrayag) {
      return res.status(404).send({
        success: false,
        message: "No Panch Prayag found with this id",
      });
    }
    res.send({
      success: true,
      message: "Panch Prayag deleted successfully",
      data: deletedPrayag,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Panch Prayag",
    });
  }
};

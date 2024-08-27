const PanchKedar = require("../../models/places/panchKedarModel");
const mongoose = require("mongoose");

exports.addPanchKedar = async (req, res) => {
  try {
    const kedarData = req.body;
    const newKedar = new PanchKedar(kedarData);
    await newKedar.save();
    res.send({
      success: true,
      message: "Panch Kedar created successfully",
      data: newKedar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Panch Kedar",
    });
  }
};

exports.getAllPanchKedars = async (req, res) => {
  try {
    const kedars = await PanchKedar.find();
    res.send({
      success: true,
      count: kedars.length,
      data: kedars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Panch Kedars",
    });
  }
};

exports.getPanchKedarById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const kedar = await PanchKedar.findById(id);
    if (!kedar) {
      return res.status(404).send({
        success: false,
        message: "No Panch Kedar found with this id",
      });
    }
    kedar.views += 1;
    await kedar.updateOne(
      { $set: { views: kedar.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: kedar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Panch Kedar profile",
    });
  }
};

exports.updatePanchKedar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedKedar = await PanchKedar.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedKedar) {
      return res.status(404).send({
        success: false,
        message: "No Panch Kedar found with this id",
      });
    }
    res.send({
      success: true,
      message: "Panch Kedar updated successfully",
      data: updatedKedar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Panch Kedar",
    });
  }
};

exports.deletePanchKedar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedKedar = await PanchKedar.findByIdAndDelete(id);
    if (!deletedKedar) {
      return res.status(404).send({
        success: false,
        message: "No Panch Kedar found with this id",
      });
    }
    res.send({
      success: true,
      message: "Panch Kedar deleted successfully",
      data: deletedKedar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Panch Kedar",
    });
  }
};

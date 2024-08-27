const Saptpuri = require("../../models/places/saptpuriModel");
const mongoose = require("mongoose");

exports.addSaptpuri = async (req, res) => {
  try {
    const saptpuriData = req.body;
    const newSaptpuri = new Saptpuri(saptpuriData);
    await newSaptpuri.save();
    res.send({
      success: true,
      message: "Saptpuri created successfully",
      data: newSaptpuri,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Saptpuri",
    });
  }
};

exports.getAllSaptpuris = async (req, res) => {
  try {
    const saptpuris = await Saptpuri.find();
    res.send({
      success: true,
      count: saptpuris.length,
      data: saptpuris,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Saptpuris",
    });
  }
};

exports.getSaptpuriById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const saptpuri = await Saptpuri.findById(id);
    if (!saptpuri) {
      return res.status(404).send({
        success: false,
        message: "No Saptpuri found with this id",
      });
    }
    saptpuri.views += 1;
    await saptpuri.updateOne(
      { $set: { views: saptpuri.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: saptpuri,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Saptpuri profile",
    });
  }
};

exports.updateSaptpuri = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedSaptpuri = await Saptpuri.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedSaptpuri) {
      return res.status(404).send({
        success: false,
        message: "No Saptpuri found with this id",
      });
    }
    res.send({
      success: true,
      message: "Saptpuri updated successfully",
      data: updatedSaptpuri,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Saptpuri",
    });
  }
};

exports.deleteSaptpuri = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedSaptpuri = await Saptpuri.findByIdAndDelete(id);
    if (!deletedSaptpuri) {
      return res.status(404).send({
        success: false,
        message: "No Saptpuri found with this id",
      });
    }
    res.send({
      success: true,
      message: "Saptpuri deleted successfully",
      data: deletedSaptpuri,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Saptpuri",
    });
  }
};

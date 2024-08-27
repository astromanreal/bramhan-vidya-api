const mongoose = require("mongoose");
const DivyaDesam = require("../../models/places/divyaDesamModel");

exports.addDivyaDesam = async (req, res) => {
  try {
    const desamData = req.body;
    const newDesam = new DivyaDesam(desamData);
    await newDesam.save();
    res.send({
      success: true,
      message: "Divya Desam created successfully",
      data: newDesam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Divya Desam",
    });
  }
};

exports.getAllDivyaDesams = async (req, res) => {
  try {
    const desams = await DivyaDesam.find();
    res.send({
      success: true,
      count: desams.length,
      data: desams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Divya Desams",
    });
  }
};

exports.getDivyaDesamById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const desam = await DivyaDesam.findById(id);
    if (!desam) {
      return res.status(404).send({
        success: false,
        message: "No Divya Desam found with this id",
      });
    }
    desam.views += 1;
    await desam.updateOne(
      { $set: { views: desam.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: desam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Divya Desam profile",
    });
  }
};

exports.updateDivyaDesam = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedDesam = await DivyaDesam.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedDesam) {
      return res.status(404).send({
        success: false,
        message: "No Divya Desam found with this id",
      });
    }
    res.send({
      success: true,
      message: "Divya Desam updated successfully",
      data: updatedDesam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Divya Desam",
    });
  }
};

exports.deleteDivyaDesam = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedDesam = await DivyaDesam.findByIdAndDelete(id);
    if (!deletedDesam) {
      return res.status(404).send({
        success: false,
        message: "No Divya Desam found with this id",
      });
    }
    res.send({
      success: true,
      message: "Divya Desam deleted successfully",
      data: deletedDesam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Divya Desam",
    });
  }
};

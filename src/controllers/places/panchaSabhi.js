const PanchaSabhai = require("../../models/places/panchaSabhiModel");
const mongoose = require("mongoose");

exports.addPanchaSabhai = async (req, res) => {
  try {
    const sabhaiData = req.body;
    const newSabhai = new PanchaSabhai(sabhaiData);
    await newSabhai.save();
    res.send({
      success: true,
      message: "Pancha Sabhai created successfully",
      data: newSabhai,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Pancha Sabhai",
    });
  }
};

exports.getAllPanchaSabhai = async (req, res) => {
  try {
    const sabhais = await PanchaSabhai.find();
    res.send({
      success: true,
      count: sabhais.length,
      data: sabhais,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Pancha Sabhai",
    });
  }
};

exports.getPanchaSabhaiById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const sabhai = await PanchaSabhai.findById(id);
    if (!sabhai) {
      return res.status(404).send({
        success: false,
        message: "No Pancha Sabhai found with this id",
      });
    }
    sabhai.views += 1;
    await sabhai.updateOne(
      { $set: { views: sabhai.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: sabhai,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Pancha Sabhai profile",
    });
  }
};

exports.updatePanchaSabhai = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedSabhai = await PanchaSabhai.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedSabhai) {
      return res.status(404).send({
        success: false,
        message: "No Pancha Sabhai found with this id",
      });
    }
    res.send({
      success: true,
      message: "Pancha Sabhai updated successfully",
      data: updatedSabhai,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Pancha Sabhai",
    });
  }
};

exports.deletePanchaSabhai = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedSabhai = await PanchaSabhai.findByIdAndDelete(id);
    if (!deletedSabhai) {
      return res.status(404).send({
        success: false,
        message: "No Pancha Sabhai found with this id",
      });
    }
    res.send({
      success: true,
      message: "Pancha Sabhai deleted successfully",
      data: deletedSabhai,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Pancha Sabhai",
    });
  }
};

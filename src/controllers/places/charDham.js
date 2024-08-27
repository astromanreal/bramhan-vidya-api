const mongoose = require("mongoose");
const CharDham = require("../../models/places/charDhamModel");

exports.addCharDham = async (req, res) => {
  try {
    const charDhamData = req.body;
    const newCharDham = new CharDham(charDhamData);
    await newCharDham.save();
    res.send({
      success: true,
      message: "Char Dham created successfully",
      data: newCharDham,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Char Dham",
    });
  }
};

exports.getAllCharDhams = async (req, res) => {
  try {
    const charDhams = await CharDham.find();
    res.send({
      success: true,
      count: charDhams.length,
      data: charDhams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Char Dhams",
    });
  }
};

exports.getCharDhamById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const charDham = await CharDham.findById(id);
    if (!charDham) {
      return res.status(404).send({
        success: false,
        message: "No Char Dham found with this id",
      });
    }
    charDham.views += 1;
    await charDham.updateOne(
      { $set: { views: charDham.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: charDham,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Char Dham profile",
    });
  }
};

exports.updateCharDham = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedCharDham = await CharDham.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedCharDham) {
      return res.status(404).send({
        success: false,
        message: "No Char Dham found with this id",
      });
    }
    res.send({
      success: true,
      message: "Char Dham updated successfully",
      data: updatedCharDham,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Char Dham",
    });
  }
};

exports.deleteCharDham = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedCharDham = await CharDham.findByIdAndDelete(id);
    if (!deletedCharDham) {
      return res.status(404).send({
        success: false,
        message: "No Char Dham found with this id",
      });
    }
    res.send({
      success: true,
      message: "Char Dham deleted successfully",
      data: deletedCharDham,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Char Dham",
    });
  }
};

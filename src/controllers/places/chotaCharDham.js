const mongoose = require("mongoose");
const ChotaCharDham = require("../../models/places/chotaCharDhamModel");

exports.addChotaCharDham = async (req, res) => {
  try {
    const dhamData = req.body;
    const newDham = new ChotaCharDham(dhamData);
    await newDham.save();
    res.send({
      success: true,
      message: "Chota Char Dham created successfully",
      data: newDham,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Chota Char Dham",
    });
  }
};

exports.getAllChotaCharDhams = async (req, res) => {
  try {
    const dhams = await ChotaCharDham.find();
    res.send({
      success: true,
      count: dhams.length,
      data: dhams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Chota Char Dhams",
    });
  }
};

exports.getChotaCharDhamById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const dham = await ChotaCharDham.findById(id);
    if (!dham) {
      return res.status(404).send({
        success: false,
        message: "No Chota Char Dham found with this id",
      });
    }
    dham.views += 1;
    await dham.updateOne(
      { $set: { views: dham.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: dham,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Chota Char Dham profile",
    });
  }
};

exports.updateChotaCharDham = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedDham = await ChotaCharDham.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedDham) {
      return res.status(404).send({
        success: false,
        message: "No Chota Char Dham found with this id",
      });
    }
    res.send({
      success: true,
      message: "Chota Char Dham updated successfully",
      data: updatedDham,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Chota Char Dham",
    });
  }
};

exports.deleteChotaCharDham = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedDham = await ChotaCharDham.findByIdAndDelete(id);
    if (!deletedDham) {
      return res.status(404).send({
        success: false,
        message: "No Chota Char Dham found with this id",
      });
    }
    res.send({
      success: true,
      message: "Chota Char Dham deleted successfully",
      data: deletedDham,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Chota Char Dham",
    });
  }
};

const ShaktiPeeth = require("../../models/places/shaktiPeethModel");
const mongoose = require("mongoose");

exports.addShaktiPeeth = async (req, res) => {
  try {
    const shaktiPeethData = req.body;
    const newShaktiPeeth = new ShaktiPeeth(shaktiPeethData);
    await newShaktiPeeth.save();
    res.send({
      success: true,
      message: "Shakti Peeth created successfully",
      data: newShaktiPeeth,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Shakti Peeth",
    });
  }
};

exports.getAllShaktiPeeths = async (req, res) => {
  try {
    const shaktiPeeths = await ShaktiPeeth.find();
    res.send({
      success: true,
      count: shaktiPeeths.length,
      data: shaktiPeeths,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Shakti Peeths",
    });
  }
};

exports.getShaktiPeethById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const shaktiPeeth = await ShaktiPeeth.findById(id);
    if (!shaktiPeeth) {
      return res.status(404).send({
        success: false,
        message: "No Shakti Peeth found with this id",
      });
    }
    shaktiPeeth.views += 1;
    await shaktiPeeth.updateOne(
      { $set: { views: shaktiPeeth.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: shaktiPeeth,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Shakti Peeth profile",
    });
  }
};

exports.updateShaktiPeeth = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedShaktiPeeth = await ShaktiPeeth.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedShaktiPeeth) {
      return res.status(404).send({
        success: false,
        message: "No Shakti Peeth found with this id",
      });
    }
    res.send({
      success: true,
      message: "Shakti Peeth updated successfully",
      data: updatedShaktiPeeth,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Shakti Peeth",
    });
  }
};

exports.deleteShaktiPeeth = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedShaktiPeeth = await ShaktiPeeth.findByIdAndDelete(id);
    if (!deletedShaktiPeeth) {
      return res.status(404).send({
        success: false,
        message: "No Shakti Peeth found with this id",
      });
    }
    res.send({
      success: true,
      message: "Shakti Peeth deleted successfully",
      data: deletedShaktiPeeth,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Shakti Peeth",
    });
  }
};

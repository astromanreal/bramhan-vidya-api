const mongoose = require("mongoose");
const MahaShaktiPitha = require("../../models/places/mahaShaktiPithaModel");
const Jyotirlinga = require("../../models/places/jyotrilingaModel");

exports.addMahaShaktiPitha = async (req, res) => {
  try {
    const pithaData = req.body;
    const newPitha = new MahaShaktiPitha(pithaData);
    await newPitha.save();
    res.send({
      success: true,
      message: "Maha Shakti Pitha created successfully",
      data: newPitha,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Maha Shakti Pitha",
    });
  }
};

exports.getAllMahaShaktiPithas = async (req, res) => {
  try {
    const pithas = await MahaShaktiPitha.find();
    res.send({
      success: true,
      count: pithas.length,
      data: pithas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Maha Shakti Pithas",
    });
  }
};

exports.getMahaShaktiPithaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const pitha = await MahaShaktiPitha.findById(id);
    if (!pitha) {
      return res.status(404).send({
        success: false,
        message: "No Maha Shakti Pitha found with this id",
      });
    }
    Jyotirlinga.views += 1;
    await Jyotirlinga.updateOne(
      { $set: { views: Jyotirlinga.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: pitha,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Maha Shakti Pitha profile",
    });
  }
};

exports.updateMahaShaktiPitha = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedPitha = await MahaShaktiPitha.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPitha) {
      return res.status(404).send({
        success: false,
        message: "No Maha Shakti Pitha found with this id",
      });
    }
    res.send({
      success: true,
      message: "Maha Shakti Pitha updated successfully",
      data: updatedPitha,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Maha Shakti Pitha",
    });
  }
};

exports.deleteMahaShaktiPitha = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedPitha = await MahaShaktiPitha.findByIdAndDelete(id);
    if (!deletedPitha) {
      return res.status(404).send({
        success: false,
        message: "No Maha Shakti Pitha found with this id",
      });
    }
    res.send({
      success: true,
      message: "Maha Shakti Pitha deleted successfully",
      data: deletedPitha,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Maha Shakti Pitha",
    });
  }
};

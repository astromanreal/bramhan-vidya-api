const mongoose = require("mongoose");
const Jyotirlinga = require("../../models/places/jyotrilingaModel");

exports.addJyotirlinga = async (req, res) => {
  try {
    const jyotirlingaData = req.body;
    const newJyotirlinga = new Jyotirlinga(jyotirlingaData);
    await newJyotirlinga.save();
    res.send({
      success: true,
      message: "Jyotirlinga created successfully",
      data: newJyotirlinga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Jyotirlinga",
    });
  }
};

exports.getAllJyotirlingas = async (req, res) => {
  try {
    const jyotirlingas = await Jyotirlinga.find();
    res.send({
      success: true,
      count: jyotirlingas.length,
      data: jyotirlingas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Jyotirlingas",
    });
  }
};

exports.getJyotirlingaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const jyotirlinga = await Jyotirlinga.findById(id);
    if (!jyotirlinga) {
      return res.status(404).send({
        success: false,
        message: "No Jyotirlinga found with this id",
      });
    }
    jyotirlinga.views += 1;
    await jyotirlinga.updateOne(
      { $set: { views: jyotirlinga.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: jyotirlinga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Jyotirlinga profile",
    });
  }
};

exports.updateJyotirlinga = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedJyotirlinga = await Jyotirlinga.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedJyotirlinga) {
      return res.status(404).send({
        success: false,
        message: "No Jyotirlinga found with this id",
      });
    }
    res.send({
      success: true,
      message: "Jyotirlinga updated successfully",
      data: updatedJyotirlinga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Jyotirlinga",
    });
  }
};

exports.deleteJyotirlinga = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedJyotirlinga = await Jyotirlinga.findByIdAndDelete(id);
    if (!deletedJyotirlinga) {
      return res.status(404).send({
        success: false,
        message: "No Jyotirlinga found with this id",
      });
    }
    res.send({
      success: true,
      message: "Jyotirlinga deleted successfully",
      data: deletedJyotirlinga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Jyotirlinga",
    });
  }
};

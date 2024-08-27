const mongoose = require("mongoose");
const Ashtavinayaka = require("../../models/places/ashtavinayakaModel");

exports.addAshtavinayaka = async (req, res) => {
  try {
    const vinayakaData = req.body;
    const newVinayaka = new Ashtavinayaka(vinayakaData);
    await newVinayaka.save();
    res.send({
      success: true,
      message: "Ashtavinayaka created successfully",
      data: newVinayaka,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Ashtavinayaka",
    });
  }
};

exports.getAllAshtavinayakas = async (req, res) => {
  try {
    const vinayakas = await Ashtavinayaka.find();
    res.send({
      success: true,
      count: vinayakas.length,
      data: vinayakas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Ashtavinayakas",
    });
  }
};

exports.getAshtavinayakaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const vinayaka = await Ashtavinayaka.findById(id);
    if (!vinayaka) {
      return res.status(404).send({
        success: false,
        message: "No Ashtavinayaka found with this id",
      });
    }

    vinayaka.views += 1;
    await vinayaka.updateOne(
      { $set: { views: vinayaka.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: vinayaka,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Ashtavinayaka profile",
    });
  }
};

exports.updateAshtavinayaka = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedVinayaka = await Ashtavinayaka.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedVinayaka) {
      return res.status(404).send({
        success: false,
        message: "No Ashtavinayaka found with this id",
      });
    }
    res.send({
      success: true,
      message: "Ashtavinayaka updated successfully",
      data: updatedVinayaka,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Ashtavinayaka",
    });
  }
};

exports.deleteAshtavinayaka = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedVinayaka = await Ashtavinayaka.findByIdAndDelete(id);
    if (!deletedVinayaka) {
      return res.status(404).send({
        success: false,
        message: "No Ashtavinayaka found with this id",
      });
    }
    res.send({
      success: true,
      message: "Ashtavinayaka deleted successfully",
      data: deletedVinayaka,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Ashtavinayaka",
    });
  }
};

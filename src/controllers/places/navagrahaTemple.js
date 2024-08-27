const NavagrahaTemple = require("../../models/places/navagrahaTempleModel");
const mongoose = require("mongoose");

exports.addNavagrahaTemple = async (req, res) => {
  try {
    const templeData = req.body;
    const newTemple = new NavagrahaTemple(templeData);
    await newTemple.save();
    res.send({
      success: true,
      message: "Navagraha Temple created successfully",
      data: newTemple,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Navagraha Temple",
    });
  }
};

exports.getAllNavagrahaTemples = async (req, res) => {
  try {
    const temples = await NavagrahaTemple.find();
    res.send({
      success: true,
      count: temples.length,
      data: temples,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Navagraha Temples",
    });
  }
};

exports.getNavagrahaTempleById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const temple = await NavagrahaTemple.findById(id);
    if (!temple) {
      return res.status(404).send({
        success: false,
        message: "No Navagraha Temple found with this id",
      });
    }
    temple.views += 1;
    await temple.updateOne(
      { $set: { views: temple.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: temple,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Navagraha Temple profile",
    });
  }
};

exports.updateNavagrahaTemple = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedTemple = await NavagrahaTemple.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTemple) {
      return res.status(404).send({
        success: false,
        message: "No Navagraha Temple found with this id",
      });
    }
    res.send({
      success: true,
      message: "Navagraha Temple updated successfully",
      data: updatedTemple,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Navagraha Temple",
    });
  }
};

exports.deleteNavagrahaTemple = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedTemple = await NavagrahaTemple.findByIdAndDelete(id);
    if (!deletedTemple) {
      return res.status(404).send({
        success: false,
        message: "No Navagraha Temple found with this id",
      });
    }
    res.send({
      success: true,
      message: "Navagraha Temple deleted successfully",
      data: deletedTemple,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Navagraha Temple",
    });
  }
};

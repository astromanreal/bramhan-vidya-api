const ParasuramaShiva = require("../../models/places/parasuramaShivaModel");
const mongoose = require("mongoose");

exports.addParasuramaShiva = async (req, res) => {
  try {
    const shivaData = req.body;
    const newShiva = new ParasuramaShiva(shivaData);
    await newShiva.save();
    res.send({
      success: true,
      message: "Parasurama Shiva temple created successfully",
      data: newShiva,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Parasurama Shiva temple",
    });
  }
};

exports.getAllParasuramaShivas = async (req, res) => {
  try {
    const shivas = await ParasuramaShiva.find();
    res.send({
      success: true,
      count: shivas.length,
      data: shivas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Parasurama Shiva temples",
    });
  }
};

exports.getParasuramaShivaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const shiva = await ParasuramaShiva.findById(id);
    if (!shiva) {
      return res.status(404).send({
        success: false,
        message: "No Parasurama Shiva temple found with this id",
      });
    }
    shiva.views += 1;
    await shiva.updateOne(
      { $set: { views: shiva.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: shiva,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Parasurama Shiva temple profile",
    });
  }
};

exports.updateParasuramaShiva = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedShiva = await ParasuramaShiva.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedShiva) {
      return res.status(404).send({
        success: false,
        message: "No Parasurama Shiva temple found with this id",
      });
    }
    res.send({
      success: true,
      message: "Parasurama Shiva temple updated successfully",
      data: updatedShiva,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Parasurama Shiva temple",
    });
  }
};

exports.deleteParasuramaShiva = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedShiva = await ParasuramaShiva.findByIdAndDelete(id);
    if (!deletedShiva) {
      return res.status(404).send({
        success: false,
        message: "No Parasurama Shiva temple found with this id",
      });
    }
    res.send({
      success: true,
      message: "Parasurama Shiva temple deleted successfully",
      data: deletedShiva,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Parasurama Shiva temple",
    });
  }
};

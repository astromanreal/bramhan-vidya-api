const mongoose = require("mongoose");
const Demon = require("../../models/profiles/demonModel");

exports.addDemonProfile = async (req, res) => {
  try {
    const demonData = req.body;

    if (!demonData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newDemon = new Demon(demonData);
    await newDemon.save();

    res.send({
      success: true,
      message: "Demon profile created successfully!",
      data: newDemon,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while creating Demon profile!",
    });
  }
};

exports.getAllDemons = async (req, res) => {
  try {
    const demons = await Demon.find();
    res.send({
      success: true,
      count: demons.length,
      data: demons,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Demons",
    });
  }
};

exports.getDemonById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const demon = await Demon.findById(id);
    if (!demon) {
      return res.status(404).send({
        success: false,
        message: "No Demon found with this id!",
      });
    }
    demon.views += 1;
    await demon.updateOne(
      { $set: { views: demon.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: demon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Demon profile!",
    });
  }
};

exports.updateDemonProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedDemon = await Demon.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDemon) {
      return res.status(404).send({
        success: false,
        message: "No Demon found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Demon profile updated successfully!",
      data: updatedDemon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Demon profile!",
    });
  }
};

exports.deleteDemonProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedDemon = await Demon.findByIdAndDelete(id);

    if (!deletedDemon) {
      return res.status(404).send({
        success: false,
        message: "No Demon found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Demon profile deleted successfully!",
      data: deletedDemon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Demon profile!",
    });
  }
};

const mongoose = require("mongoose");
const SwayambhuVishnu = require("../../models/places/swayambhuVishnuModel");

exports.addSwayambhuVishnu = async (req, res) => {
  try {
    const swayambhuVishnuData = req.body;
    const newSwayambhuVishnu = new SwayambhuVishnu(swayambhuVishnuData);
    await newSwayambhuVishnu.save();
    res.send({
      success: true,
      message: "Swayambhu Vishnu temple created successfully",
      data: newSwayambhuVishnu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating Swayambhu Vishnu temple",
    });
  }
};

exports.getAllSwayambhuVishnus = async (req, res) => {
  try {
    const swayambhuVishnus = await SwayambhuVishnu.find();
    res.send({
      success: true,
      count: swayambhuVishnus.length,
      data: swayambhuVishnus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Swayambhu Vishnu temples",
    });
  }
};

exports.getSwayambhuVishnuById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const swayambhuVishnu = await SwayambhuVishnu.findById(id);
    if (!swayambhuVishnu) {
      return res.status(404).send({
        success: false,
        message: "No Swayambhu Vishnu temple found with this id",
      });
    }
    swayambhuVishnu.views += 1;
    await swayambhuVishnu.updateOne(
      { $set: { views: swayambhuVishnu.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: swayambhuVishnu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Swayambhu Vishnu temple profile",
    });
  }
};

exports.updateSwayambhuVishnu = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const updatedSwayambhuVishnu = await SwayambhuVishnu.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedSwayambhuVishnu) {
      return res.status(404).send({
        success: false,
        message: "No Swayambhu Vishnu temple found with this id",
      });
    }
    res.send({
      success: true,
      message: "Swayambhu Vishnu temple updated successfully",
      data: updatedSwayambhuVishnu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Swayambhu Vishnu temple",
    });
  }
};

exports.deleteSwayambhuVishnu = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format",
      });
    }
    const deletedSwayambhuVishnu = await SwayambhuVishnu.findByIdAndDelete(id);
    if (!deletedSwayambhuVishnu) {
      return res.status(404).send({
        success: false,
        message: "No Swayambhu Vishnu temple found with this id",
      });
    }
    res.send({
      success: true,
      message: "Swayambhu Vishnu temple deleted successfully",
      data: deletedSwayambhuVishnu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Swayambhu Vishnu temple",
    });
  }
};

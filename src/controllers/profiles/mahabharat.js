const mongoose = require("mongoose");
const MahabharataCharacter = require("../../models/profiles/mahabharatModel"); // Assuming this is the path to your MahabharataCharacter model

exports.addMahabharataCharacter = async (req, res) => {
  try {
    const mahabharataData = req.body;

    if (!mahabharataData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newMahabharataCharacter = new MahabharataCharacter(mahabharataData);
    await newMahabharataCharacter.save();

    res.send({
      success: true,
      message: "Mahabharata character created successfully!",
      data: newMahabharataCharacter,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Mahabharata character!",
    });
  }
};

exports.getAllMahabharataCharacters = async (req, res) => {
  try {
    const mahabharataCharacters = await MahabharataCharacter.find();
    res.send({
      success: true,
      count: mahabharataCharacters.length,
      data: mahabharataCharacters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Mahabharata characters",
    });
  }
};

exports.getMahabharataCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const mahabharataCharacter = await MahabharataCharacter.findById(id);
    if (!mahabharataCharacter) {
      return res.status(404).send({
        success: false,
        message: "No Mahabharata character found with this id!",
      });
    }
    mahabharataCharacter.views += 1;
    await mahabharataCharacter.updateOne(
      { $set: { views: mahabharataCharacter.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: mahabharataCharacter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Mahabharata character profile!",
    });
  }
};

exports.updateMahabharataCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedMahabharataCharacter =
      await MahabharataCharacter.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

    if (!updatedMahabharataCharacter) {
      return res.status(404).send({
        success: false,
        message: "No Mahabharata character found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Mahabharata character updated successfully!",
      data: updatedMahabharataCharacter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Mahabharata character!",
    });
  }
};

exports.deleteMahabharataCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedMahabharataCharacter =
      await MahabharataCharacter.findByIdAndDelete(id);

    if (!deletedMahabharataCharacter) {
      return res.status(404).send({
        success: false,
        message: "No Mahabharata character found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Mahabharata character deleted successfully!",
      data: deletedMahabharataCharacter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Mahabharata character!",
    });
  }
};

const mongoose = require("mongoose");
const RamayanaCharacter = require("../../models/profiles/ramayanaModel"); // Assuming this is the path to your RamayanaCharacter model

exports.addRamayanaCharacter = async (req, res) => {
  try {
    const ramayanaData = req.body;

    if (!ramayanaData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newRamayanaCharacter = new RamayanaCharacter(ramayanaData);
    await newRamayanaCharacter.save();

    res.send({
      success: true,
      message: "Ramayana character created successfully!",
      data: newRamayanaCharacter,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Ramayana character!",
    });
  }
};

exports.getAllRamayanaCharacters = async (req, res) => {
  try {
    const ramayanaCharacters = await RamayanaCharacter.find();
    res.send({
      success: true,
      count: ramayanaCharacters.length,
      data: ramayanaCharacters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Ramayana characters",
    });
  }
};

exports.getRamayanaCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const ramayanaCharacter = await RamayanaCharacter.findById(id);
    if (!ramayanaCharacter) {
      return res.status(404).send({
        success: false,
        message: "No Ramayana character found with this id!",
      });
    }
    ramayanaCharacter.views += 1;
    await ramayanaCharacter.updateOne(
      { $set: { views: ramayanaCharacter.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: ramayanaCharacter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Ramayana character profile!",
    });
  }
};

exports.updateRamayanaCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedRamayanaCharacter = await RamayanaCharacter.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRamayanaCharacter) {
      return res.status(404).send({
        success: false,
        message: "No Ramayana character found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Ramayana character updated successfully!",
      data: updatedRamayanaCharacter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Ramayana character!",
    });
  }
};

exports.deleteRamayanaCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedRamayanaCharacter = await RamayanaCharacter.findByIdAndDelete(
      id
    );

    if (!deletedRamayanaCharacter) {
      return res.status(404).send({
        success: false,
        message: "No Ramayana character found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Ramayana character deleted successfully!",
      data: deletedRamayanaCharacter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Ramayana character!",
    });
  }
};

const { default: mongoose } = require("mongoose");
const ModernHinduCharacter = require("../../models/profiles/modernModel");

exports.addModernHinduCharacter = async (req, res) => {
  try {
    const characterData = req.body;

    if (!characterData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newCharacter = new ModernHinduCharacter(characterData);
    await newCharacter.save();

    res.send({
      success: true,
      message: "Modern Hindu character profile created successfully!",
      data: newCharacter,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating modern Hindu character profile!",
    });
  }
};

exports.getAllModernHinduCharacters = async (req, res) => {
  try {
    const characters = await ModernHinduCharacter.find();
    res.send({
      success: true,
      count: characters.length,
      data: characters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching modern Hindu characters",
    });
  }
};

exports.getModernHinduCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const character = await ModernHinduCharacter.findById(id);
    if (!character) {
      return res.status(404).send({
        success: false,
        message: "No modern Hindu character found with this id!",
      });
    }
    character.views += 1;
    await character.updateOne(
      { $set: { views: character.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: character,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving modern Hindu character profile!",
    });
  }
};

exports.updateModernHinduCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedCharacter = await ModernHinduCharacter.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCharacter) {
      return res.status(404).send({
        success: false,
        message: "No modern Hindu character found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Modern Hindu character profile updated successfully!",
      data: updatedCharacter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating modern Hindu character profile!",
    });
  }
};

exports.deleteModernHinduCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedCharacter = await ModernHinduCharacter.findByIdAndDelete(id);

    if (!deletedCharacter) {
      return res.status(404).send({
        success: false,
        message: "No modern Hindu character found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Modern Hindu character profile deleted successfully!",
      data: deletedCharacter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting modern Hindu character profile!",
    });
  }
};

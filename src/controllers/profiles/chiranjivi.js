const { default: mongoose } = require("mongoose");
const Chiranjivi = require("../../models/profiles/chiranjiviModel"); // Adjust the path as necessary

exports.addChiranjiviProfile = async (req, res) => {
  try {
    const chiranjiviData = req.body;

    if (!chiranjiviData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newChiranjivi = new Chiranjivi(chiranjiviData);
    await newChiranjivi.save();

    res.send({
      success: true,
      message: "Chiranjivi profile created successfully!",
      data: newChiranjivi,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Chiranjivi profile!",
    });
  }
};

exports.getAllChiranjivis = async (req, res) => {
  try {
    const chiranjivis = await Chiranjivi.find();
    res.send({
      success: true,
      count: chiranjivis.length,
      data: chiranjivis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Chiranjivis",
    });
  }
};

exports.getChiranjiviById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const chiranjivi = await Chiranjivi.findById(id);
    if (!chiranjivi) {
      return res.status(404).send({
        success: false,
        message: "No Chiranjivi found with this id!",
      });
    }
    chiranjivi.views += 1;
    await chiranjivi.updateOne(
      { $set: { views: chiranjivi.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: chiranjivi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Chiranjivi profile!",
    });
  }
};

exports.updateChiranjiviProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedChiranjivi = await Chiranjivi.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedChiranjivi) {
      return res.status(404).send({
        success: false,
        message: "No Chiranjivi found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Chiranjivi profile updated successfully!",
      data: updatedChiranjivi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Chiranjivi profile!",
    });
  }
};

exports.deleteChiranjiviProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedChiranjivi = await Chiranjivi.findByIdAndDelete(id);

    if (!deletedChiranjivi) {
      return res.status(404).send({
        success: false,
        message: "No Chiranjivi found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Chiranjivi profile deleted successfully!",
      data: deletedChiranjivi,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Chiranjivi profile!",
    });
  }
};

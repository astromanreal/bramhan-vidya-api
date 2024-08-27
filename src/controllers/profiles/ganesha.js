const mongoose = require("mongoose");
const GaneshaAvatar = require("../../models/profiles/ganeshaModel"); // Assuming this is the path to your GaneshaAvatar model

exports.addGaneshaAvatar = async (req, res) => {
  try {
    const ganeshaData = req.body;

    if (!ganeshaData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newGaneshaAvatar = new GaneshaAvatar(ganeshaData);
    await newGaneshaAvatar.save();

    res.send({
      success: true,
      message: "Ganesha avatar created successfully!",
      data: newGaneshaAvatar,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Ganesha avatar!",
    });
  }
};

exports.getAllGaneshaAvatars = async (req, res) => {
  try {
    const ganeshaAvatars = await GaneshaAvatar.find();
    res.send({
      success: true,
      count: ganeshaAvatars.length,
      data: ganeshaAvatars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Ganesha avatars",
    });
  }
};

exports.getGaneshaAvatarById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const ganeshaAvatar = await GaneshaAvatar.findById(id);
    if (!ganeshaAvatar) {
      return res.status(404).send({
        success: false,
        message: "No Ganesha avatar found with this id!",
      });
    }
    ganeshaAvatar.views += 1;
    await ganeshaAvatar.updateOne(
      { $set: { views: ganeshaAvatar.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: ganeshaAvatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Ganesha avatar profile!",
    });
  }
};

exports.updateGaneshaAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedGaneshaAvatar = await GaneshaAvatar.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedGaneshaAvatar) {
      return res.status(404).send({
        success: false,
        message: "No Ganesha avatar found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Ganesha avatar updated successfully!",
      data: updatedGaneshaAvatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Ganesha avatar!",
    });
  }
};

exports.deleteGaneshaAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedGaneshaAvatar = await GaneshaAvatar.findByIdAndDelete(id);

    if (!deletedGaneshaAvatar) {
      return res.status(404).send({
        success: false,
        message: "No Ganesha avatar found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Ganesha avatar deleted successfully!",
      data: deletedGaneshaAvatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Ganesha avatar!",
    });
  }
};

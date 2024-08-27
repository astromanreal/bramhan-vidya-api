const { default: mongoose } = require("mongoose");
const ShivaAvatar = require("../../models/profiles/shivAvatarModel"); // Adjust the path as necessary

exports.addShivaAvatar = async (req, res) => {
  try {
    const avatarData = req.body;

    if (!avatarData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newAvatar = new ShivaAvatar(avatarData);
    await newAvatar.save();

    res.send({
      success: true,
      message: "Shiva Avatar profile created successfully!",
      data: newAvatar,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Shiva Avatar profile!",
    });
  }
};

exports.getAllShivaAvatars = async (req, res) => {
  try {
    const avatars = await ShivaAvatar.find();
    res.send({
      success: true,
      count: avatars.length,
      data: avatars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Shiva Avatars",
    });
  }
};

exports.getShivaAvatarById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const avatar = await ShivaAvatar.findById(id);
    if (!avatar) {
      return res.status(404).send({
        success: false,
        message: "No Shiva Avatar found with this id!",
      });
    }
    avatar.views += 1;
    await avatar.updateOne(
      { $set: { views: avatar.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Shiva Avatar profile!",
    });
  }
};

exports.updateShivaAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedAvatar = await ShivaAvatar.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAvatar) {
      return res.status(404).send({
        success: false,
        message: "No Shiva Avatar found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Shiva Avatar profile updated successfully!",
      data: updatedAvatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Shiva Avatar profile!",
    });
  }
};

exports.deleteShivaAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedAvatar = await ShivaAvatar.findByIdAndDelete(id);

    if (!deletedAvatar) {
      return res.status(404).send({
        success: false,
        message: "No Shiva Avatar found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Shiva Avatar profile deleted successfully!",
      data: deletedAvatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Shiva Avatar profile!",
    });
  }
};

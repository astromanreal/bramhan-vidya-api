const { default: mongoose } = require("mongoose");
const VishnuAvatar = require("../../models/profiles/vishnuAvatarModel"); // Adjust the path as necessary

exports.addVishnuAvatar = async (req, res) => {
  try {
    const avatarData = req.body;

    if (!avatarData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newAvatar = new VishnuAvatar(avatarData);
    await newAvatar.save();

    res.send({
      success: true,
      message: "Vishnu Avatar profile created successfully!",
      data: newAvatar,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Vishnu Avatar profile!",
    });
  }
};

exports.getAllVishnuAvatars = async (req, res) => {
  try {
    const avatars = await VishnuAvatar.find();
    res.send({
      success: true,
      count: avatars.length,
      data: avatars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Vishnu Avatars",
    });
  }
};

exports.getVishnuAvatarById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const avatar = await VishnuAvatar.findById(id);
    if (!avatar) {
      return res.status(404).send({
        success: false,
        message: "No Vishnu Avatar found with this id!",
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
      message: "Error while retrieving Vishnu Avatar profile!",
    });
  }
};

exports.updateVishnuAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedAvatar = await VishnuAvatar.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAvatar) {
      return res.status(404).send({
        success: false,
        message: "No Vishnu Avatar found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Vishnu Avatar profile updated successfully!",
      data: updatedAvatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Vishnu Avatar profile!",
    });
  }
};

exports.deleteVishnuAvatar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedAvatar = await VishnuAvatar.findByIdAndDelete(id);

    if (!deletedAvatar) {
      return res.status(404).send({
        success: false,
        message: "No Vishnu Avatar found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Vishnu Avatar profile deleted successfully!",
      data: deletedAvatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Vishnu Avatar profile!",
    });
  }
};

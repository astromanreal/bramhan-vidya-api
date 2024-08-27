const { default: mongoose } = require("mongoose");
const God = require("../../models/profiles/godModel"); // Adjust the path as necessary

exports.addGodProfile = async (req, res) => {
  try {
    const godData = req.body;

    if (!godData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newGod = new God(godData);
    await newGod.save();

    res.send({
      success: true,
      message: "God profile created successfully!",
      data: newGod,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating God profile!",
    });
  }
};

exports.getAllGods = async (req, res) => {
  try {
    const gods = await God.find();
    res.send({
      success: true,
      count: gods.length,
      data: gods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Gods",
    });
  }
};

exports.getGodById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const god = await God.findById(id);
    if (!god) {
      return res.status(404).send({
        success: false,
        message: "No God found with this id!",
      });
    }
    god.views += 1;
    await god.updateOne({ $set: { views: god.views } }, { timestamps: false });
    res.send({
      success: true,
      data: god,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving God profile!",
    });
  }
};

exports.updateGodProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedGod = await God.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedGod) {
      return res.status(404).send({
        success: false,
        message: "No God found with this id!",
      });
    }

    res.send({
      success: true,
      message: "God profile updated successfully!",
      data: updatedGod,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating God profile!",
    });
  }
};

exports.deleteGodProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedGod = await God.findByIdAndDelete(id);

    if (!deletedGod) {
      return res.status(404).send({
        success: false,
        message: "No God found with this id!",
      });
    }

    res.send({
      success: true,
      message: "God profile deleted successfully!",
      data: deletedGod,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting God profile!",
    });
  }
};

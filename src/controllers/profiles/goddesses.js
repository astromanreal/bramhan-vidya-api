const { default: mongoose } = require("mongoose");
const Goddess = require("../../models/profiles/goddessModel");

exports.addGoddessProfile = async (req, res) => {
  try {
    const goddessData = req.body;

    if (!goddessData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newGoddess = new Goddess(goddessData);
    await newGoddess.save();

    res.send({
      success: true,
      message: "Goddess profile created successfully!",
      data: newGoddess,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Goddess profile!",
    });
  }
};

exports.getAllGoddesses = async (req, res) => {
  try {
    const goddesses = await Goddess.find();
    res.send({
      success: true,
      count: goddesses.length,
      data: goddesses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Goddesses",
    });
  }
};

exports.getGoddessById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const goddess = await Goddess.findById(id);
    if (!goddess) {
      return res.status(404).send({
        success: false,
        message: "No Goddess found with this id!",
      });
    }
    goddess.views += 1;
    await goddess.updateOne(
      { $set: { views: goddess.views } },
      { timestamps: false }
    );
    res.send({
      success: true,
      data: goddess,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Goddess profile!",
    });
  }
};

exports.updateGoddessProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedGoddess = await Goddess.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedGoddess) {
      return res.status(404).send({
        success: false,
        message: "No Goddess found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Goddess profile updated successfully!",
      data: updatedGoddess,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Goddess profile!",
    });
  }
};

exports.deleteGoddessProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedGoddess = await Goddess.findByIdAndDelete(id);

    if (!deletedGoddess) {
      return res.status(404).send({
        success: false,
        message: "No Goddess found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Goddess profile deleted successfully!",
      data: deletedGoddess,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Goddess profile!",
    });
  }
};

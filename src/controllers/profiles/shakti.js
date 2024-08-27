const { default: mongoose } = require("mongoose");
const Shakti = require("../../models/profiles/shaktiModel"); // Adjust the path as necessary

exports.addShaktiProfile = async (req, res) => {
  try {
    const shaktiData = req.body;

    if (!shaktiData.name) {
      return res.status(400).send({
        success: false,
        message: "Name is required!",
      });
    }

    const newShakti = new Shakti(shaktiData);
    await newShakti.save();

    res.send({
      success: true,
      message: "Shakti profile created successfully!",
      data: newShakti,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      Error: error,
      message: "Error while creating Shakti profile!",
    });
  }
};

exports.getAllShakti = async (req, res) => {
  try {
    const shaktis = await Shakti.find();
    res.send({
      success: true,
      count: shaktis.length,
      data: shaktis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Shakti profiles",
    });
  }
};

exports.getShaktiById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const shakti = await Shakti.findById(id);
    if (!shakti) {
      return res.status(404).send({
        success: false,
        message: "No Shakti found with this id!",
      });
    }
    shakti.views += 1;
    await shakti.updateOne(
      { $set: { views: shakti.views } },
      { timestamps: false }
    );

    res.send({
      success: true,
      data: shakti,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving Shakti profile!",
    });
  }
};

exports.updateShaktiProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const updatedShakti = await Shakti.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedShakti) {
      return res.status(404).send({
        success: false,
        message: "No Shakti found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Shakti profile updated successfully!",
      data: updatedShakti,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Shakti profile!",
    });
  }
};

exports.deleteShaktiProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID format!",
      });
    }

    const deletedShakti = await Shakti.findByIdAndDelete(id);

    if (!deletedShakti) {
      return res.status(404).send({
        success: false,
        message: "No Shakti found with this id!",
      });
    }

    res.send({
      success: true,
      message: "Shakti profile deleted successfully!",
      data: deletedShakti,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Shakti profile!",
    });
  }
};
